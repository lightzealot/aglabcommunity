¿Pasas horas editando cada video? **MoneyPrinterTurbo** es una herramienta gratis y de código abierto (licencia MIT) que, a partir de **un solo tema**, escribe el guion, busca los clips, genera la voz, sincroniza los subtítulos, le pone música y te entrega el video terminado. Tiene más de 140.000 estrellas en GitHub (144.845 el 21 de noviembre de 2026).

=> [Ver MoneyPrinterTurbo en GitHub](https://github.com/harry0703/MoneyPrinterTurbo)

## Qué hace

| Paso | Qué hace la herramienta |
|---|---|
| Guion | Lo escribe un modelo de IA a partir de tu tema |
| Clips | Busca videos de stock en Pexels o Pixabay (gratis), o usa los tuyos |
| Voz | Edge TTS gratis (sin clave), o ElevenLabs, Azure, Gemini y otras |
| Subtítulos | Los sincroniza con la voz |
| Música | De fondo, aleatoria o la que subas |
| Formato | Vertical 9:16, horizontal 16:9 o cuadrado 1:1 |
| Publicar | Directo en TikTok, Instagram y YouTube Shorts, con título y hashtags |

Para el guion funciona con ChatGPT, Claude, Gemini, DeepSeek, Kimi, Qwen, Ollama (local) y muchos más.

## La forma más fácil: que tu agente lo instale

Si usas **Claude Code** (u otro agente que pueda usar la terminal), pégale esto. El agente instala y configura MoneyPrinterTurbo, genera el video y te dice dónde quedó. Solo te pedirá las claves que falten. Funciona en Mac y Windows.

```
Usa esta Skill: https://raw.githubusercontent.com/harry0703/MoneyPrinterTurbo/main/docs/skill/SKILL.md
Crea un video con el tema "Cómo la IA está cambiando la vida diaria", en español y en formato vertical.
```

## Instalarlo en Windows (paquete de un clic)

1. Entra a la [última versión en GitHub](https://github.com/harry0703/MoneyPrinterTurbo/releases/latest) y descarga el archivo **.7z** de la sección **Assets** (no el «Source code»).
2. Descomprímelo en una carpeta sin espacios ni tildes en la ruta.
3. Haz doble clic en `update.bat` para traer la última versión.
4. Haz doble clic en `start.bat`: se abre la interfaz en tu navegador (si sale en blanco, usa Chrome o Edge).

## Instalarlo con Python (Mac, Linux o Windows)

Necesitas Python 3.11 o superior.

```
python3 -m venv .venv
source .venv/bin/activate
python -m pip install mpt
mpt webui
```

En Windows PowerShell, activa el entorno con `.venv\Scripts\Activate.ps1`. El paquete oficial se llama **mpt** (el llamado «MoneyPrinterTurbo» en PyPI es de un tercero).

## Configurarlo la primera vez

1. En la interfaz, abre los **ajustes básicos**.
2. Elige el modelo para el guion y pega su clave. Si quieres algo gratis, Ollama corre en tu compu.
3. Para los clips, crea una clave gratis en [Pexels](https://www.pexels.com/api/) o [Pixabay](https://pixabay.com/api/docs/).
4. Para la voz, Edge TTS funciona sin clave.
5. Escribe el tema, elige formato y voz, y pulsa **Generar video**.

## Qué necesita tu computadora

| | Mínimo | Recomendado |
|---|---|---|
| Procesador | 4 núcleos | 6 a 8 núcleos |
| Memoria | 4 GB | 8 GB |
| Tarjeta gráfica | No hace falta | 4 GB o más para ir más rápido |

## Ten en cuenta

- La herramienta es gratis, pero **el modelo del guion puede costar** si usas uno de pago (ChatGPT, Claude, Gemini). Hay opciones gratis, como Ollama en local.
- Los clips de stock son genéricos: para tu marca, sube tus propios videos e imágenes.
- Revisa cada video antes de publicarlo; la publicación automática necesita que conectes tus cuentas.
- Es un proyecto de terceros y cambia seguido: si un paso no coincide, revisa el README.

**¿Qué tema le darías primero? Cuéntamelo en @andresgomez.ia.**
