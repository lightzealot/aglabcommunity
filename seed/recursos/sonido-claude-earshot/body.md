Claude edita videos muy bien, pero no puede oír: elige efectos y música sin escucharlos, y por eso el audio queda mal. Este es el flujo que uso en todos mis reels para arreglarlo. Son tres piezas: **earshot** para que Claude escuche, un **banco de efectos** que pone un sonido en cada corte y **música de ElevenLabs** que baja sola cuando hablas.

**Antes de empezar:** necesitas Claude Code, Python 3.10 o más nuevo y ffmpeg. earshot es gratis y de código abierto (licencia MIT). La música de ElevenLabs gasta créditos de tu cuenta.

=> [earshot en GitHub](https://github.com/Leonxlnx/earshot)

## Las 3 piezas

| Pieza | Qué hace | Costo |
|---|---|---|
| earshot (oídos) | Escucha el audio, lo mide (volumen, picos) y le dice a Claude si un sonido encaja o no | Gratis |
| Banco de efectos | 252 efectos hechos con código; Claude pone un whoosh en cada corte y un golpe en cada entrada | Gratis |
| Música de ElevenLabs | Música de fondo hecha con IA, mezclada bajo la voz con ducking | Créditos de ElevenLabs |

## Paso 1. Instala earshot

En la terminal (el nombre `earshot` en PyPI es de otro proyecto, por eso se instala desde GitHub):

```
pip install torch --index-url https://download.pytorch.org/whl/cpu
pip install "earshot[listen,mcp] @ git+https://github.com/Leonxlnx/earshot"
earshot doctor --fetch
```

El último comando baja los modelos para escuchar (alrededor de 1,1 GB). Después, dentro de Claude Code:

```
/plugin marketplace add Leonxlnx/earshot
/plugin install earshot@earshot
```

Con eso Claude tiene las skills de earshot y su servidor MCP.

## Paso 2. Que Claude escuche antes de decidir

Estos son los comandos que más uso. Claude los corre solo cuando tiene la skill:

| Comando | Para qué |
|---|---|
| `earshot measure audio.wav` | Volumen (LUFS), pico y rango |
| `earshot describe musica.mp3` | Qué tipo de sonido o música es y su ánimo |
| `earshot timeline reel.mp4` | Qué suena en cada segundo del video |
| `earshot rank "un whoosh suave" carpeta/` | Elige el mejor sonido de una carpeta |

**Regla de oro:** que Claude nunca te diga «suena bien» sin una medida de earshot detrás.

## Paso 3. Efectos en cada corte

El banco de earshot trae 252 efectos guardados como código (no son grabaciones). Se arma un kit para tu video y se renderiza:

```
earshot kit init --preset crisp -o audio/kit.json
earshot kit render audio/kit.json --out audio/kit
```

Presets: `calm`, `crisp`, `minimal` y `launch`. Yo uso `crisp`: whoosh en los cortes, golpe (land) cuando entra algo, tick al teclear y pop en lo que aparece. En SonidoClaude fueron 75 efectos colocados en sus fotogramas.

## Paso 4. Música de ElevenLabs con ducking

1. Genera la música en ElevenLabs Music. El prompt que usé:

```
Instrumental background bed for a tech explainer reel, 55 seconds. Dark, modern, minimal electronic with a soft pulsing sub bass, warm analog synth pad and light crisp percussion, steady 100 BPM, confident and curious mood, no vocals, no big drops, no lead melody that competes with a voice; gentle build in the last 10 seconds and a clean ending.
```

2. Haz dos tomas y pídele a Claude que las compare con `earshot describe`: quédate con la que no compite con la voz.
3. Mézclala bajo la voz con ducking (la música baja sola cuando hablas). Esta es la mezcla que uso con ffmpeg:

```
ffmpeg -i voz.wav -i efectos.wav -i musica.mp3 -filter_complex "[0:a]asplit=2[v][sc];[2:a]volume=-10dB[m0];[m0][sc]sidechaincompress=threshold=0.03:ratio=2:attack=40:release=450[m];[v][1:a][m]amix=inputs=3:normalize=0,loudnorm=I=-14:TP=-1.5[a]" -map "[a]" mezcla.wav
```

Con eso la música queda a -10 dB y, cuando hablas, baja unos 6 dB más (medido en mi reel). Si la sientes alta, prueba con `volume=-13dB`.

## Paso 5. Revisa el volumen antes de entregar

```
earshot measure mezcla.wav
```

Busca alrededor de **-14 LUFS** y un pico por debajo de **-1 dBFS**. Mi último reel quedó en -14,2 LUFS con pico -1,8 dBFS.

## El prompt para Claude Code

Pega esto en Claude Code, con tu video y tu voz en la carpeta del proyecto:

```
Tengo un video y su voz en esta carpeta. Ponle sonido con earshot:
1. Haz una lista de cada corte, cada elemento que entra y cada texto que se teclea, con su segundo.
2. Arma un kit de earshot con el preset crisp y coloca un whoosh en cada corte, un land en cada entrada y ticks al teclear.
3. Mezcla la voz, los efectos y la música de fondo (musica.mp3) a -10 dB con ducking por sidechain bajo la voz.
4. Normaliza a -14 LUFS con pico por debajo de -1 dBFS.
5. Antes de decirme que está listo, mide la mezcla con earshot measure y earshot timeline y dime los números.
```

## Lo que debes saber

- Los efectos del banco **se generan con código**, no son grabaciones reales. Si necesitas grabaciones, busca bancos con licencia y revisa cada licencia.
- earshot mide y describe, pero no reemplaza tus oídos: **escucha el resultado final** antes de publicar.
- Cifras al 28-11-2026: earshot tenía 5.954 estrellas en GitHub y su versión 1.0.0 salió el 20-11-2026.
