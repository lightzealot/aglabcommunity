PhotoCraft es un editor de fotos **gratis y de código abierto** que reescribe Photoshop desde cero. Abre tus PSD, no pide cuenta ni suscripción y trae un servidor MCP para que Claude lo maneje por ti. Aquí tienes los links directos, cómo instalarlo y cómo conectarlo a Claude.

**Antes de empezar:** es un proyecto muy nuevo (el repositorio se creó el 30 de septiembre de 2026). Úsalo primero con copias de tus archivos y compáralo con tu flujo de trabajo real antes de soltar Adobe. No es de Adobe ni está afiliado a ella: es un proyecto independiente.

## Qué es y por qué importa

| Dato | Valor (al 19 de nov. de 2026) |
|---|---|
| Estrellas en GitHub | 80.4k |
| Forks | 14.2k |
| Licencia | MIT o Apache-2.0 |
| Versión actual | v0.23.1 |
| Funciona sin cuenta ni conexión | Sí |

## Paso 1. Descárgalo gratis

La forma más fácil es el instalador oficial. Si quieres un formato concreto, tienes todos en GitHub.

=> [Descargar desde la página oficial](https://getartcraft.com/apps/photocraft)

- **Windows:** instalador `.msi` (x64, ARM o 32 bits) o versión portable `.zip`.
- **Mac:** app universal `.dmg` (Apple Silicon e Intel), firmada.
- **Linux:** AppImage, `.deb`, `.rpm`, Flatpak o tarball.
- **Web:** también corre en el navegador (WebAssembly).

Todas las versiones: [github.com/storytold/photocraft/releases/latest](https://github.com/storytold/photocraft/releases/latest). El código: [github.com/storytold/photocraft](https://github.com/storytold/photocraft).

## Paso 2. Abre y guarda tus PSD

Abres el PSD que tienes a medias y conserva capas, máscaras, textos editables, estilos de capa y capas de ajuste. Después lo vuelves a guardar como PSD.

- **27 modos de fusión** de Photoshop y 69 herramientas, con los mismos atajos.
- **Prueba pública:** al abrir y volver a guardar, 307 de los 309 archivos del set de prueba psd-tools se ven igual.
- **Ojo:** el archivo guardado no es idéntico byte a byte. Se ve igual, pero PhotoCraft reescribe partes internas.
- También abre PSB, TIFF con capas, archivos de GIMP, Krita y Affinity (estos últimos solo en lectura).

## Paso 3. Sus apps hermanas

PhotoCraft es parte de las Crafting Apps del equipo ArtCraft: todas gratis, de código abierto y escritas desde cero.

- **LightCraft:** tipo Lightroom, biblioteca de fotos y revelado RAW. [github.com/storytold/lightcraft](https://github.com/storytold/lightcraft)
- **FilmCraft:** tipo Premiere, edición de video, color y sonido. [github.com/storytold/filmcraft](https://github.com/storytold/filmcraft)
- **Y más:** VectorCraft, PdfCraft, EffectCraft, DesignCraft y otras en [getartcraft.com](https://getartcraft.com).

## Paso 4. Conéctalo a Claude por MCP

Cada botón y cada herramienta de PhotoCraft es un comando, así que Claude puede usarlos igual que tú. Hay dos caminos.

### Camino A. Sin terminal (ArtCraft Launcher)

1. Abre el ArtCraft Launcher: Settings, AI agents, y activa **Let AI agents use Craft apps**.
2. Pulsa **Add** junto a Claude Desktop o Claude Code y reinicia Claude.
3. Según su documentación, esta función va detrás de un interruptor experimental llamado AI-MCP. Si no ves la opción, revisa `docs/mcp.md` en el repositorio.

### Camino B. Claude Code con la herramienta de línea de comandos

Registra el MCP (cambia la carpeta por la tuya):

```
claude mcp add photocraft -- photocraft-cli mcp --automation-read-root /ruta/a/tus/fotos --automation-write-root /ruta/a/tus/fotos
```

- `photocraft-cli` viene en un `.zip` aparte para Mac. En Linux, el AppImage lo trae con `--cli`. También se instala desde el código con cargo.
- Las dos carpetas limitan dónde puede leer y guardar Claude. Usa una carpeta de prueba.

### Pídeselo así

Cuando esté conectado, prueba con algo concreto en una carpeta de pruebas:

```
Abre foto.psd de mi carpeta de pruebas, recorta al formato 4:5, sube un poco el contraste con una capa de Curvas y expórtala como PNG con el nombre foto-final.png. Dime cada paso que hiciste.
```

## Límites antes de soltar Adobe

- **Es muy nuevo:** tiene menos de dos meses y miles de issues abiertos. Espera fallos.
- **Trabaja con copias** de tus PSD hasta que confíes en el resultado.
- **Claude puede equivocarse:** revisa lo que exporta antes de mandárselo a un cliente.
- **No canceles todavía:** pruébalo una o dos semanas en paralelo con tu trabajo real.

**¿Quieres que lo adaptemos a tu caso? Escríbeme ADOBE a @andresgomez.ia.**
