Colibri es un motor **gratis y de código abierto**, escrito en C, para probar modelos de IA muy grandes en el computador que ya tienes. Deja en la RAM la parte del modelo que siempre trabaja y lee el resto desde tu SSD. Aquí tienes el repo, cómo instalarlo y la tabla de qué modelo le cabe a tu RAM.

**Antes de empezar:** que un modelo **arranque** no significa que responda rápido. Con los modelos más grandes puedes esperar varios segundos por cada token y necesitas cientos de gigas libres. Las cifras de abajo salen del README del proyecto, leído el 27 de noviembre de 2026.

=> [Ir al repositorio en GitHub](https://github.com/JustVugg/colibri)

## Qué es

| Dato | Valor (al 27 de nov. de 2026) |
|---|---|
| Estrellas en GitHub | 53.7k |
| Forks | 6.5k |
| Licencia del motor | Apache-2.0 (cada modelo tiene la suya) |
| Versión actual | v2.2.0 |
| Sistemas | Windows, macOS y Linux |
| Tarjeta gráfica | Opcional |

## Cómo funciona

Los modelos grandes de este tipo se llaman **mezcla de expertos** (MoE): están hechos de muchas partes y para cada token solo trabajan unas pocas. Según el README, GLM-5.2 tiene 744 mil millones de parámetros y usa unos 40 mil millones por token.

- **RAM:** guarda la parte que siempre trabaja y, en caché, los expertos que más usas.
- **SSD:** guarda los demás expertos y los entrega cuando el modelo los pide.
- **Tarjeta gráfica:** si la tienes, guarda los expertos más usados y las capas densas.
- **Lo importante:** el lugar donde está cada experto cambia la velocidad, no la respuesta.

## Qué modelo le cabe a tu RAM

La columna **RAM** tiene dos números: con menos del primero el modelo no arranca; desde el segundo funciona como en las mediciones del autor. La velocidad se mide en tokens por segundo (un token es más o menos un trozo de palabra).

| Tu RAM | Modelo | RAM (arranca / recomendada) | Descarga | Velocidad medida por el autor |
|---|---|---|---|---|
| 8 GB | Inkling-2-Mini IQ2_XXS | 4 / 12 GB | 9 GB | 8.4 tok/s en CPU |
| 8 GB | Qwen3-Coder-30B (código) | 8 / 18 GB | 19 GB | 8.5 a 9.6 tok/s con todos los expertos en RAM; 5.1 con solo una parte |
| 16 GB | Qwen3.6-35B (chat) | 10 / 20 GB | 23 GB | 6.0 en CPU; 30.0 con una RTX 3070 |
| 16 GB | DeepSeek V4 Flash (284B) | 16 / 32 GB | 167 GB | 0.93 con 32 GB solo CPU; 1.5 a 1.6 con RTX 5080 |
| 16 GB | GLM-5.2 (744B) | 16 / 24 GB | 429 GB | 0.05 a 0.1 en un portátil de 25 GB; 1.83 en un equipo de 128 GB |
| 32 GB | Qwen3.8-Flash-Next | 24 / 32 GB | 186 GB | 1.91 a 2.56 en CPU |
| 32 GB | Kimi K3 (2.8T) | 32 / 64 GB | 1.56 TB | unos 9.4 segundos **por token** |

Las velocidades dependen del equipo de cada prueba y del SSD. En tu PC pueden ser distintas.

**Por dónde empezar:** con 8 a 16 GB de RAM, prueba primero un modelo pequeño (Qwen3-Coder o Qwen3.6). Los gigantes sirven para experimentar, no para conversar con fluidez.

## Lo que necesitas

- Un computador con **8 GB de RAM** como mínimo (16 GB o más es mejor, según el proyecto).
- **22 GB libres** en el disco para el modelo más pequeño del asistente de instalación. Para los modelos grandes, un SSD NVMe rápido.
- Internet para descargar el modelo. Si cortas la descarga, continúa donde iba.

## Instalación en Windows

1. Entra al repositorio, toca **Code** y luego **Download ZIP**.
2. Descomprime el ZIP.
3. Haz doble clic en **START-HERE.bat**. Si te falta Python, te ofrece instalarlo.

## Instalación en Linux (Ubuntu y Debian)

```
sudo apt install git python3 build-essential
git clone https://github.com/JustVugg/colibri
cd colibri
./start-here.sh
```

## Instalación en Mac (con Homebrew)

```
xcode-select --install
brew install libomp git python
git clone https://github.com/JustVugg/colibri
cd colibri
./start-here.sh
```

## Qué hace el asistente

1. **Revisa tu PC:** RAM, disco libre, procesador y tarjetas gráficas.
2. **Te recomienda un modelo.** Respondes una sola pregunta y con Enter aceptas la recomendación.
3. **Prepara el motor:** lo compila o descarga la versión lista.
4. **Descarga el modelo** con barra de progreso.
5. **Abre el chat** en tu navegador, en `http://127.0.0.1:8000/`.

Para ver todos los modelos frente a tu equipo antes de descargar, agrega `--list`:

```
./start-here.sh --list
```

En Windows es `START-HERE.bat --list`. Para guardar los modelos en otro disco usa `--dir`.

## Si prefieres que lo instale tu asistente de IA

El proyecto trae instrucciones para asistentes de código. Revisa lo que te vaya a instalar antes de aceptar.

```
Set up colibri on this machine following docs/AI_SETUP.md from https://github.com/JustVugg/colibri
```

## Límites que debes conocer

- **Velocidad:** los modelos gigantes responden muy despacio en un PC de casa.
- **Disco:** hay modelos de 167 GB, 429 GB y hasta 1.56 TB.
- **Licencias:** el motor es Apache-2.0, pero cada modelo tiene su propia licencia. Revísala antes de usarlo en un trabajo.
- **Proyecto en movimiento:** se actualiza seguido; las cifras y los modelos pueden cambiar.
