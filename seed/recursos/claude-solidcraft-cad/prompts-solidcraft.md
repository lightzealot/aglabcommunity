# SolidCraft + Claude Code — configuración y 3 prompts

## Conectar Claude Code (una sola vez)

    claude mcp add solidcraft -- solidcraft-cli mcp

Windows, si no encuentra solidcraft-cli:

    claude mcp add solidcraft -- "C:\Program Files\SolidCraft\solidcraft-cli.exe" mcp

Para verlo en vivo: SolidCraft > Preferences > Assistant > Agents through MCP > "Let AI agents connect".

## Prompt 1 · Soporte para el celular

Usa SolidCraft para diseñar un soporte de escritorio para el celular, inclinado a 60 grados. Base de 80 x 90 mm y 10 mm de grosor, respaldo de 90 mm de alto y un labio delantero de 14 mm para que el celular no se resbale. La ranura debe medir 11 mm (el grosor de mi celular con funda). Redondea los bordes exteriores con 5 mm. Deja el ángulo, el ancho y la ranura como parámetros. Revisa el modelo y mide la ranura antes de terminar, y exporta un STL llamado soporte.stl.

## Prompt 2 · Caja con tapa a presión

Usa SolidCraft para diseñar una caja con tapa a presión de 60 x 40 x 30 mm por dentro, paredes de 2 mm y esquinas redondeadas de 3 mm. La tapa encaja con una holgura de 0,2 mm para impresión FDM. Deja largo, ancho, alto y holgura como parámetros. Mide la holgura entre caja y tapa y exporta dos STL: caja.stl y tapa.stl.

## Prompt 3 · Gancho para la pared

Usa SolidCraft para diseñar un gancho de pared en forma de J para colgar audífonos: 25 mm de ancho, 5 mm de grosor, 70 mm de alto y una curva de 30 mm de radio, con dos agujeros avellanados para tornillos de 4 mm. Redondea todos los bordes con 1,5 mm. Deja el ancho y el radio como parámetros y exporta gancho.stl.

## Para cambiar la pieza

"Cambia el ángulo a 70 grados y vuelve a exportar el STL."

@andresgomez.ia · comunidad.andresgomez.store
