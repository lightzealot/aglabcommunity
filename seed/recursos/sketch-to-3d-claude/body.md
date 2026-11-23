¿Tienes un producto en 3D y quieres mostrarlo de una forma que llame la atención? **Sketch to 3D** es una skill gratis y de código abierto (licencia MIT) para Claude que convierte cualquier modelo 3D en un boceto de marcador que se dibuja solo, como lo haría un diseñador, y luego lo convierte en el render real. Te da un video del tamaño que quieras o una versión para tu web. Aquí tienes qué hace, cómo instalarla y los prompts para usarla.

**Antes de empezar:** la skill no diseña el producto desde cero: necesitas un modelo 3D (un archivo como GLB u OBJ) o un objeto hecho en código con three.js. Funciona mejor con objetos modelados; los escaneos 3D salen como garabato.

## Qué es y por qué importa

| Dato | Valor (al 23 de nov. de 2026) |
|---|---|
| Estrellas en GitHub | 83 |
| Forks | 4 |
| Licencia | MIT (sirve también para trabajos de clientes) |
| Publicado | 5 de noviembre de 2026 |
| Duración del dibujo | Unos 7 segundos |

=> [Ver el repositorio en GitHub](https://github.com/dannystuart/sketch-to-3d)

=> [Ver la demo en vivo](https://dannystuart.github.io/sketch-to-3d/)

## Qué le puedes dar

- Un modelo 3D en **GLB, GLTF, OBJ, FBX, STL, PLY, USDZ, 3MF o DAE**.
- Un objeto hecho en **código three.js**.
- Una escena de three.js que ya tengas.

## Cómo dibuja (en el orden de un diseñador)

1. **Círculos** guía en las partes redondas.
2. **Una caja** de construcción.
3. **Los contornos** exteriores.
4. **El trazo**: una pasada suave de lápiz y luego otra más oscura.
5. **El marcador**: relleno con sombra rayada.
6. **El color**, y al final una cortinilla al render real.

## Qué te entrega

- **Video** del tamaño que quieras: vertical (1080×1920), cuadrado (1080×1080), panorámico (1920×1080) o 4K.
- **Una foto por etapa** para revisar antes de hacer el video.
- **Versión web** que se dibuja al cargar, al aparecer en pantalla, mientras la gente hace scroll o al pasar el mouse, y al final se puede girar arrastrando.
- **Cuatro papeles**: blanco, rojo, lápiz o plano azul.
- Opcional: un video con **fondo transparente** para ponerlo encima de otro video.

## Paso 1. Instálala

Necesitas [Claude Code](https://claude.com/claude-code), [Node 18 o superior](https://nodejs.org), [git](https://git-scm.com) y [ffmpeg](https://ffmpeg.org/download.html). Pega estas líneas en la terminal, una por una:

```
git clone https://github.com/dannystuart/sketch-to-3d.git ~/.claude/skills/sketch-to-3d
```

```
cd ~/.claude/skills/sketch-to-3d
```

```
npm install
```

```
npx playwright install chromium
```

La última descarga el navegador donde dibuja la skill (unos 500 MB, una sola vez). Luego abre una sesión nueva de Claude Code para que la reconozca.

**Si usas Windows:** al probarla nosotros tuvimos que hacer dos ajustes pequeños (un error `ERR_UNSUPPORTED_ESM_URL_SCHEME` al arrancar y fotos que salían en blanco). Si te pasa, pégale el error a Claude y pídele que lo corrija y que use el Chrome que ya tienes instalado.

## Paso 2. Pídeselo en palabras simples

Claude elige el tamaño, el papel y el encuadre, te muestra una foto de cada etapa y luego hace el video:

```
Haz un video de boceto con marcador de silla.glb, cuadrado, para Instagram.
```

```
Haz un boceto en papel rojo de radio.glb. Sáltate el color y pasa directo del boceto al render real. Encuádralo un poco más cerca.
```

```
Tengo una tetera en OBJ. Ponla en la página de mi producto para que se dibuje mientras la gente hace scroll y al final la puedan girar.
```

```
Solo el boceto de mi silla, sin render, en papel de lápiz.
```

## Prompt para que Claude te guíe la primera vez

```
Quiero usar la skill sketch-to-3d (https://github.com/dannystuart/sketch-to-3d). Soy principiante.
1. Revisa si tengo Node 18 o superior, git y ffmpeg, y dime cómo instalar lo que falte.
2. Instálala siguiendo su README y comprueba que funciona con la prueba de la lámpara.
3. Haz un video de boceto de [ruta de tu modelo 3D], [vertical / cuadrado / panorámico], en papel [blanco / rojo / lápiz / plano azul].
4. Muéstrame las fotos de cada etapa antes del video y explícame en palabras simples qué puedo ajustar.
```

## Bueno saber

- Un video de 7 segundos tarda unos 30 segundos en un portátil reciente.
- Las bases, pisos y fondos del modelo se dibujan como parte del objeto, salvo que le pidas quitarlos.
- El vidrio transparente tapa lo que hay debajo en el boceto; pídele que lo oculte.
- Los modelos blancos o sin color terminan casi invisibles sobre papel claro: pide un fondo más oscuro.
- No es una herramienta oficial de Anthropic.
