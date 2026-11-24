# raea · prompts y comandos listos para copiar

Repositorio: https://github.com/shinyobjectz/raea (licencia FSL-1.1). Gratis, sin cuenta. Necesita una tarjeta gráfica con DirectX 12 o Vulkan.

## Instalar

Windows (PowerShell):

```
irm https://raea.io/install.ps1 | iex
```

Mac o Linux (terminal):

```
curl -fsSL https://raea.io/install | sh
```

## Que Claude te guíe la primera vez

```
Quiero usar raea (https://github.com/shinyobjectz/raea) para hacer videos con código. Soy principiante.
1. Revisa si raea está instalado (raea --version). Si no, instálalo con el instalador oficial para mi sistema.
2. Crea un proyecto con raea init y explícame en palabras simples qué archivo es el video.
3. Haz un video vertical de 10 segundos para Instagram sobre [tu tema], con títulos que aparezcan al ritmo y mis colores [tus colores].
4. Antes del video completo, renderiza 3 fotos (raea render edit.tsx -o fotos --at 30,150,270) y muéstramelas.
5. Cuando lo apruebe, renderiza el video, corre raea check sobre él y dime qué arreglar.
```

## Pasar un video que ya tienes a raea

```
Tengo este video hecho en [HTML / Remotion / otra herramienta]: [ruta]. Pásalo a una composición de raea en React con los mismos tiempos, textos y animaciones. Renderiza primero unas fotos de cada escena para comparar con el original y después el video completo. Al final mide cuánto tardó.
```

## Comandos

```
raea render video.tsx -o video.mp4
raea render video.tsx -o fotos --at 30,150,270
raea check video.mp4 --platform reels
raea play juego.tsx
```

## Audio para Instagram (raea entrega Opus)

```
ffmpeg -i video.mp4 -c:v copy -c:a aac -b:a 192k -movflags +faststart final.mp4
```
