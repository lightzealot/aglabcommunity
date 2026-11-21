¿Quieres imprimir en 3D pero el CAD te frena? Con **SolidCraft** (app de CAD gratis y de código abierto) y **Claude Code**, tú describes la pieza y Claude la dibuja, la mide y te la deja lista para el slicer. Aquí tienes la configuración paso a paso y **3 prompts para tu primera pieza**. Abajo descargas el PDF y los prompts en un archivo editable.

## Lo que necesitas

| | |
|---|---|
| **SolidCraft** | Gratis, para Windows, macOS y Linux (también funciona en el navegador). Versión actual: 0.45.0. |
| **Claude Code** | El asistente de Claude en la terminal. Necesitas una cuenta de Claude con acceso a Claude Code. |
| **Un slicer** | El programa que ya usas para imprimir (Cura, PrusaSlicer, Bambu Studio, Orca…). |

=> [Descargar SolidCraft](https://solidcraft.io/download)

## Paso 1 · Instala SolidCraft

- **Windows:** baja el instalador. El archivo aún no está firmado, así que Windows puede avisarte: pulsa **Más información** y luego **Ejecutar de todas formas**.
- **Mac:** baja la imagen de disco (sirve para Apple Silicon e Intel). Está firmada y notarizada por Apple, se abre como cualquier app.
- **Linux:** AppImage, o `sudo snap install solidcraft`.

Al instalarlo también queda instalado `solidcraft-cli`, el programa que usa Claude para hablar con la app.

## Paso 2 · Conecta Claude Code con un solo comando

Abre la terminal y pega:

```
claude mcp add solidcraft -- solidcraft-cli mcp
```

Si la terminal dice que no encuentra `solidcraft-cli` (pasa con instaladores viejos de Windows), usa la ruta completa:

```
claude mcp add solidcraft -- "C:\Program Files\SolidCraft\solidcraft-cli.exe" mcp
```

Otra forma: en la app, **Help > Connect AI assistants…** lo configura solo.

## Paso 3 · Para ver a Claude modelar en vivo

Sin este paso, Claude trabaja «a ciegas» (sin ventana) y igual te entrega el archivo. Si quieres ver cómo dibuja la pieza en la app:

1. Abre SolidCraft.
2. Ve a **Preferences > Assistant > Agents through MCP** y activa **«Let AI agents connect»**.
3. Abre Claude Code (`claude` en la terminal). Se conecta solo a la app abierta.

## Paso 4 · Tu primera pieza: 3 prompts

Pégalos tal cual en Claude Code. Cambia las medidas por las tuyas.

### 1. Soporte para el celular

```
Usa SolidCraft para diseñar un soporte de escritorio para el celular, inclinado a 60 grados. Base de 80 x 90 mm y 10 mm de grosor, respaldo de 90 mm de alto y un labio delantero de 14 mm para que el celular no se resbale. La ranura debe medir 11 mm (el grosor de mi celular con funda). Redondea los bordes exteriores con 5 mm. Deja el ángulo, el ancho y la ranura como parámetros. Revisa el modelo y mide la ranura antes de terminar, y exporta un STL llamado soporte.stl.
```

### 2. Caja con tapa a presión

```
Usa SolidCraft para diseñar una caja con tapa a presión de 60 x 40 x 30 mm por dentro, paredes de 2 mm y esquinas redondeadas de 3 mm. La tapa encaja con una holgura de 0,2 mm para impresión FDM. Deja largo, ancho, alto y holgura como parámetros. Mide la holgura entre caja y tapa y exporta dos STL: caja.stl y tapa.stl.
```

### 3. Gancho para la pared

```
Usa SolidCraft para diseñar un gancho de pared en forma de J para colgar audífonos: 25 mm de ancho, 5 mm de grosor, 70 mm de alto y una curva de 30 mm de radio, con dos agujeros avellanados para tornillos de 4 mm. Redondea todos los bordes con 1,5 mm. Deja el ancho y el radio como parámetros y exporta gancho.stl.
```

## Paso 5 · Cambia un número y vuelve a exportar

La gracia de SolidCraft es que es **paramétrico**: le pides a Claude «cambia el ángulo a 70 grados» o «la ranura a 13 mm» y la pieza entera se rehace. Después pide de nuevo el STL (o 3MF) y ábrelo en tu slicer.

## Antes de imprimir

- Es un proyecto nuevo (salió en octubre de 2026): empieza con piezas simples como estas.
- Revisa medidas y holguras en el slicer y, si la pieza es grande, imprime primero una prueba pequeña antes de una impresión larga.
- Según su propio repositorio, 75 de 76 piezas de referencia coinciden en volumen, área y centro de masa con las de un CAD establecido.

## Datos del proyecto

- Repositorio: [tangency-labs/solidcraft](https://github.com/tangency-labs/solidcraft), licencia Apache-2.0 / MIT.
- 17.578 estrellas en GitHub y 748 commits co-escritos por Claude (de 10.510), datos del 21 de noviembre de 2026.

Guárdala para cuando quieras imprimir tu primera pieza. @andresgomez.ia
