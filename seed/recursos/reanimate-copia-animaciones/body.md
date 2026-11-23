¿Ves una animación increíble en otra web y no sabes cómo la hicieron? **Reanimate** es una skill gratis y de código abierto (licencia MIT) para Claude Code que graba la animación, la reconstruye en tu código y la compara con el original fotograma por fotograma hasta que se mueve igual. Aquí tienes qué hace, cómo instalarla y los prompts para usarla.

**Antes de empezar:** funciona en Mac y Linux; en Windows todavía no está probada. Copia animaciones para estudiarlas o como punto de partida: las fuentes, imágenes y el código de otra web siguen siendo de sus dueños.

## Qué es y por qué importa

| Dato | Valor (al 23 de nov. de 2026) |
|---|---|
| Estrellas en GitHub | 2,4k |
| Forks | 209 |
| Licencia | MIT |
| Publicado | 29 de octubre de 2026 |
| Claves de API | No necesita |

=> [Ver el repositorio en GitHub](https://github.com/NiazMorshed2007/reanimate)

## Qué le puedes dar

- El **link** de una web en vivo.
- Una **grabación de pantalla**.
- Un **MP4** o un **GIF**.
- Un archivo **Lottie**.

## Cómo funciona (en 5 pasos)

1. **Graba:** filma la animación original en un navegador, fotograma por fotograma.
2. **La separa en detalles:** arma una tabla con cada elemento: cuándo empieza, cuánto dura, de dónde a dónde va y con qué aceleración (easing).
3. **La reconstruye** con lo que ya usa tu proyecto: CSS, Framer Motion, GSAP o three.js.
4. **Compara:** graba su copia igual que el original y mide tiempos, aceleración y píxeles.
5. **Repite:** corrige la mayor diferencia y vuelve a grabar, normalmente de 2 a 5 rondas. Lo que no logre igualar te lo dice en su informe.

**La prueba:** el autor clonó la barra de herramientas de Vercel y los **417 de 417 fotogramas** salieron idénticos. En el cubo de resend.com solo el 0,11 % de los píxeles es distinto.

## Paso 1. Instálala

Necesitas [Bun](https://bun.sh) 1.1 o superior. En la terminal:

```
npx skills add NiazMorshed2007/reanimate -g
```

Te pregunta en qué agentes instalarla; añade `-a claude-code` para saltarte la pregunta. La primera vez descarga unos 250 MB (ffmpeg y el Chromium de Playwright).

## Paso 2. Pídele la animación

En Claude Code di **qué** quieres, **dónde** está y **a dónde** va:

```
/reanimate the hero entrance on https://example.com, into components/Hero.tsx
```

```
/reanimate this loader, 0:03 to 0:05 of ~/Downloads/loader.mov
```

```
/reanimate the card hover in this gif, match it exactly
```

```
/reanimate the logo marquee from https://example.com, with our logos and pause on hover
```

## Paso 3. Elige qué tan igual la quieres

| Si dices | Qué iguala |
|---|---|
| «clone this animation» (por defecto) | Que se mueva igual: orden, tiempos (±80 ms), tipo de aceleración y distancia |
| «match it exactly» o «pixel-perfect» | Que se vea igual: además fuentes, tamaños, colores y espacios (≤ 2 % de píxeles distintos) |
| «clone X and add Y» | La copia más lo tuyo encima, por separado |

## Prompt para que Claude te guíe la primera vez

```
Quiero usar la skill reanimate (https://github.com/NiazMorshed2007/reanimate). Soy principiante.
1. Revisa si tengo Bun 1.1 o superior y si mi sistema es Mac o Linux.
2. Instálala con npx skills add NiazMorshed2007/reanimate -g -a claude-code.
3. Clona esta animación: [pega el link o la ruta del video] y ponla en [archivo de tu proyecto].
4. Al final explícame en palabras simples qué rondas hizo y qué quedó distinto.
```

## Límites

- Las páginas con inicio de sesión, YouTube y Loom no se graban directo: dale una grabación de pantalla.
- Los efectos con física (resortes) se aproximan midiendo cómo rebotan.
- No es una herramienta oficial de Anthropic ni de las webs que clona.
