¿Cada cambio en tu video con IA te cuesta minutos de render? **raea** (Render Anything Engine) es un motor gratis que dibuja tus videos en tu propia tarjeta gráfica, sin navegador. Escribes el video en React y TypeScript, el código que Claude ya sabe escribir, y raea renderiza cada fotograma. Antes de recomendártelo lo probé en mi PC: aquí tienes lo que medí, cómo instalarlo y el prompt para tu primer video.

## Lo que medí en mi PC

Todo en la misma computadora (Windows 10, RTX 5060 Ti, Ryzen 5 7600X), video vertical 1080×1920 a 30 fps, mediana de 3 pasadas, el 23 de noviembre de 2026.

| Prueba | Con navegador (mi motor de siempre) | Con raea | Diferencia |
|---|---|---|---|
| La misma escena, 300 fotogramas | 13,5 s | 7,1 s | 1,9× |
| La misma escena, 1.200 fotogramas | 47,0 s | 12,5 s | 3,8× |
| Mi último reel completo (1.167 fotogramas, con videos y sonido) | 127,1 s | 17,3 s | **7,3×** |
| Este reel sobre raea (1.866 fotogramas) | no lo medí | 53,9 s | — |

- **Imagen:** puse los dos videos lado a lado y se ven iguales.
- **Audio:** la voz quedó a 8 ms del original (menos de un fotograma) y raea lo deja a −14 LUFS, el volumen estándar de las redes.
- **Cuanto más largo el video, más gana:** raea tarda unos 5 segundos en arrancar, pero después dibuja cada fotograma en 6 a 11 milisegundos.

## Qué es y por qué importa

| Dato | Valor (al 23 de nov. de 2026) |
|---|---|
| Estrellas en GitHub | 4.702 |
| Forks | 373 |
| Versión | 0.1.9 (22 de noviembre de 2026) |
| Ritmo | 10 versiones estables entre el 9 y el 22 de noviembre |
| Licencia | FSL-1.1 (cada versión pasa a Apache-2.0 dos años después) |
| Precio | Gratis, sin cuenta para el motor |
| Sistemas | Mac (Apple Silicon), Linux y Windows 10/11 |

Lo creó **Shane Murphy** (@shinyobjectz), que fue editor y diseñador de motion en agencias.

=> [Ver raea en GitHub](https://github.com/shinyobjectz/raea)

=> [Ver la web oficial](https://raea.io)

=> [Ver películas hechas en raea](https://media.raea.io)

## Qué hace además de video

- **Juegos:** el mismo archivo se juega en vivo con `raea play` (input, física, sonido y 3D).
- **3D:** escenas con luces, materiales y modelos glTF, dibujadas con el motor Bevy.
- **Sonido:** efectos y notas de instrumentos con modelos que corren en tu computador (`raea sao`).
- **Revisión automática:** `raea check` avisa de textos cortados, poco contraste, zonas seguras de redes y volumen.
- **Para agentes:** trae una skill para Claude Code; tu agente renderiza un fotograma, lo mira y lo corrige solo.

## Paso 1. Instálalo

Necesitas una tarjeta gráfica con controlador DirectX 12 o Vulkan (casi cualquier PC de los últimos años) y unos 350 MB libres.

**En Windows**, abre PowerShell y pega:

```
irm https://raea.io/install.ps1 | iex
```

**En Mac o Linux**, en la terminal:

```
curl -fsSL https://raea.io/install | sh
```

El instalador deja raea en tu carpeta de usuario (`.raea`), lo agrega a tu PATH y copia su skill a `~/.claude/skills` para que Claude Code sepa usarlo. Abre una terminal nueva cuando termine y comprueba:

```
raea --version
```

## Paso 2. Tu primer video

Así se ve un video en raea: un componente de React que dibuja el fotograma que le pidan.

```
import { AbsoluteFill, Composition, interpolate, registerRoot, useCurrentFrame } from "raea";

function Hola() {
  const f = useCurrentFrame();
  return <AbsoluteFill style={{ background: "#000", color: "#fff", fontSize: 120, opacity: interpolate(f, [0, 20], [0, 1]) }}>Hola</AbsoluteFill>;
}

registerRoot(() => <Composition id="hola" component={Hola} width={1080} height={1920} fps={30} durationInFrames={90} />);
```

Guárdalo como `hola.tsx` y renderízalo:

```
raea render hola.tsx -o hola.mp4
```

En mi PC esos 90 fotogramas salieron en unos 6 segundos contando el arranque.

## Prompt para que Claude te guíe

```
Quiero usar raea (https://github.com/shinyobjectz/raea) para hacer videos con código. Soy principiante.
1. Revisa si raea está instalado (raea --version). Si no, instálalo con el instalador oficial para mi sistema.
2. Crea un proyecto con raea init y explícame en palabras simples qué archivo es el video.
3. Haz un video vertical de 10 segundos para Instagram sobre [tu tema], con títulos que aparezcan al ritmo y mis colores [tus colores].
4. Antes del video completo, renderiza 3 fotos (raea render edit.tsx -o fotos --at 30,150,270) y muéstramelas.
5. Cuando lo apruebe, renderiza el video, corre raea check sobre él y dime qué arreglar.
```

## Comandos que más vas a usar

| Comando | Para qué |
|---|---|
| `raea render video.tsx -o video.mp4` | Renderiza el video completo |
| `raea render video.tsx -o fotos --at 30,150,270` | Fotos de esos fotogramas para revisar (números de fotograma, no segundos) |
| `raea check video.mp4 --platform reels` | Revisa texto cortado, contraste, zonas seguras y volumen |
| `raea play juego.tsx` | Juega el archivo en vivo |
| `raea guide` | Guías de diseño que trae el motor |

## Lo que debes saber

- **Es una versión canary:** sale una versión casi cada día, así que algo puede cambiar de una semana a otra. Windows es la plataforma más nueva y la menos probada.
- **Tu video tiene que estar en React.** En mi prueba, un video HTML hecho para otro motor no se renderizó bien tal cual: tuve que pasarlo a React (Claude lo hizo por mí).
- **Para Instagram, cambia el audio a AAC:** raea entrega el audio en Opus. Con ffmpeg, sin tocar la imagen:

```
ffmpeg -i video.mp4 -c:v copy -c:a aac -b:a 192k -movflags +faststart final.mp4
```

- **Algunas funciones bajan modelos grandes** (sonido local, movimiento de personajes): pueden ocupar varios GB.
- La licencia es FSL: puedes usarlo gratis para tus videos y clientes, pero no para montar un producto que compita con raea.
- No es una herramienta de Anthropic.
