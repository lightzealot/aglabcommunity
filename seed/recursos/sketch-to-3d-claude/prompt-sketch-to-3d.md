# Sketch to 3D · prompts listos para copiar

Repositorio: https://github.com/dannystuart/sketch-to-3d (licencia MIT). Necesita Claude Code, Node 18+, git y ffmpeg.

## Instalar (una línea a la vez)

```
git clone https://github.com/dannystuart/sketch-to-3d.git ~/.claude/skills/sketch-to-3d
cd ~/.claude/skills/sketch-to-3d
npm install
npx playwright install chromium
```

## Que Claude te guíe la primera vez

```
Quiero usar la skill sketch-to-3d (https://github.com/dannystuart/sketch-to-3d). Soy principiante.
1. Revisa si tengo Node 18 o superior, git y ffmpeg, y dime cómo instalar lo que falte.
2. Instálala siguiendo su README y comprueba que funciona con la prueba de la lámpara.
3. Haz un video de boceto de [ruta de tu modelo 3D], [vertical / cuadrado / panorámico], en papel [blanco / rojo / lápiz / plano azul].
4. Muéstrame las fotos de cada etapa antes del video y explícame en palabras simples qué puedo ajustar.
```

## Pedidos de ejemplo

```
Haz un video de boceto con marcador de silla.glb, cuadrado, para Instagram.
Haz un boceto en papel rojo de radio.glb. Sáltate el color y pasa directo del boceto al render real.
Tengo una tetera en OBJ. Ponla en la página de mi producto para que se dibuje con el scroll y al final la puedan girar.
Solo el boceto de mi silla, sin render, en papel de lápiz.
```

## Si usas Windows

```
Al correr la skill sketch-to-3d me sale este error: [pega el error]. Corrígelo en la copia instalada y, si las fotos salen en blanco, haz que use el Chrome que tengo instalado.
```
