El skill **video-pizarra** convierte una idea en un MP4 vertical animado, con Claude Code. El video no se "genera": se **programa**. Cada escena es código que dibuja y anima gráficos; un navegador sin pantalla captura los cuadros y ffmpeg los une. El render corre en tu equipo; el uso del modelo puede tener costo.

Repositorio: https://github.com/santmun/video-pizarra · La descarga incluye la guía completa.

## Qué necesitas

| Qué | Para qué | Comprobar |
|---|---|---|
| Node.js 18+ | motor y render | `node -v` |
| Python 3 con `numpy` y `Pillow` | sonido y hojas de contacto | `python3 -c "import numpy, PIL"` |
| ffmpeg | arma el MP4 | `ffmpeg -version` |
| Chromium de Playwright | captura los cuadros | `npx playwright install chromium` |

En Mac, lo que falte: `brew install node python ffmpeg` y `python3 -m pip install --user numpy Pillow`.

## Instalar el skill

```bash
git clone https://github.com/santmun/video-pizarra ~/.claude/skills/video-pizarra
```

Reinicia Claude Code y pide: "hazme un video animado sobre X".

## Flujo en 7 pasos

1. **Entrevista.** Define la **una** idea, el formato (9:16 o 16:9), la duración (60–75 s explica mejor), el tono, tu marca y el CTA.
2. **Verifica datos.** Solo va a pantalla lo que aparece en una fuente.
3. **Storyboard.** Una tabla por escena (fondo, texto, acción, transición). Se aprueba antes de tocar código.
4. **Monta el proyecto:**

```bash
PROJ=~/Documents/mi-video
mkdir -p "$PROJ/audio" && cp -R ~/.claude/skills/video-pizarra/template/. "$PROJ/"
cd "$PROJ" && npm install && npx playwright install chromium
cp scenes.example.js scenes.js
```

5. **Revisión visual (obligatoria):**

```bash
node render.mjs --every 1.2 && python3 contact.py 10
```

Abre `contact.jpg` y busca texto cortado, escenas vacías o cosas fuera de cuadro.

6. **Música y beats (opcional):** `python3 -m venv .venv && .venv/bin/pip install librosa` y luego `.venv/bin/python beats.py audio/music.mp3`.
7. **Render final:** `./build.sh mi-video` saca `mi-video.mp4` (master) y `mi-video-movil.mp4` (ligero). Tarda unos 3–5 min por minuto de video.

## Dos motores

- **`template/`**: pizarrón y dibujo a mano; para explicar y contar noticias.
- **`template-estilos/`**: acuarela, cuaderno o minimal; más limpio y editorial. Mira `catalogo-estilos/` antes de elegir.

## Estructura que funciona (8–10 escenas)

Hook → revelación → problema → giro → pruebas (una por escena) → remate → CTA. **Una idea por escena** y máximo ~12 palabras en pantalla. La primera frase aparece en 0,2 s: sin intros ni logos.

## Errores que ya se cometieron

- **Se siente como presentación:** usa un personaje continuo y cámara que lo siga.
- **Escenas sobrecargadas:** 1 texto grande + 1 elemento + el personaje.
- **Cifras inventadas o nombres de terceros en pantalla:** usa solo datos con fuente y di "un cliente".
- **"100 % código" con imágenes de IA:** si lo dices, no metas imágenes generadas.
- **Todo sale en negro:** usa `immediateRender: false`.
- **Archivo de 150–200 MB:** es normal; comparte la copia `-movil`.

Regla técnica: el render busca cada instante, no reproduce. Todo debe ser función del tiempo: nada de `setTimeout` ni números aleatorios.

## Resumen en 5 líneas

```bash
git clone https://github.com/santmun/video-pizarra ~/.claude/skills/video-pizarra   # una vez
mkdir -p ~/Documents/mi-video/audio && cp -R ~/.claude/skills/video-pizarra/template/. ~/Documents/mi-video/
cd ~/Documents/mi-video && npm install && npx playwright install chromium
cp scenes.example.js scenes.js   # escribe aquí tu video
node render.mjs --every 1.2 && python3 contact.py 10 && ./build.sh mi-video
```

[Documento original](https://docs.google.com/document/d/1ePjdt_CNMhL4pkUszWEeBpn-sU4dolYRlV9tehYy_jA/edit) · Skill: [santmun/video-pizarra](https://github.com/santmun/video-pizarra) · Recurso compartido por @andresgomez.ia.
