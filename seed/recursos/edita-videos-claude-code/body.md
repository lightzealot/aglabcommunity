Una guía para organizar tu proyecto de video, convertir referencias en reglas concretas y preparar tu primera edición con **Claude Code**. Incluye 3 prompts para copiar, una plantilla `STYLE.md` con un ejemplo rellenado y una lista de revisión para el teléfono. Abajo descargas el PDF, la guía editable, la plantilla y los prompts.

**Qué se comprobó y qué no:** los requisitos, planes y comandos de instalación salen de la documentación oficial, consultada el **26 de octubre de 2026**. **No se instaló ni se ejecutó ninguna herramienta y los prompts no se probaron en un equipo**: el resultado depende de tu sistema y tu video. No promete una edición automática perfecta, y el flujo **no es gratis**: Claude Code pide un plan de pago de Claude (Pro, Max, Team o Enterprise) o una cuenta de Console con créditos.

## Tu carpeta de trabajo

```text
AI Video Editor/
  Raw footage/
  References/
  Exports/
  STYLE.md
```

**Raw footage:** tus videos originales, intactos. **References:** referencias y fotogramas extraídos. **Exports:** transcripciones, pruebas y versiones (v1, v2…). **STYLE.md:** tu guía de estilo. Empieza con una prueba de **10 a 15 segundos**.

## Las seis secciones

1. **Prepara tu proyecto:** requisitos, Claude Code frente al chat de Claude y la estructura de carpetas.
2. **Prompt 1, preparar el entorno:** revisa tu equipo, consulta los requisitos oficiales y propone solo lo necesario, pidiendo tu aprobación antes de instalar.
3. **Prompt 2, referencias a guía de estilo:** analiza de 3 a 5 referencias (ritmo, subtítulos, colores, apoyos visuales, música) y las convierte en reglas con valor, ejemplo y excepción.
4. **Plantilla `STYLE.md`:** lista para completar, con un ejemplo de Reel educativo de IA para pequeños negocios. Los valores son de ejemplo, no reglas universales.
5. **Prompt 3, primera edición:** transcribe, propone cortes, presenta un storyboard, genera una prueba de 10 a 15 segundos y exporta el completo solo cuando lo apruebas.
6. **Revisión y problemas:** soluciones a resultados genéricos, subtítulos mal ubicados, cortes que quitan palabras y desincronización, más la lista de revisión en el teléfono.

## Herramientas que menciona la guía

| Herramienta | Para qué | Condiciones (según su documentación) |
|---|---|---|
| **FFmpeg** | Cortar, convertir y extraer fotogramas | Solo ofrece código fuente; los binarios son de terceros |
| **whisper.cpp** | Transcribir con marcas de tiempo | Licencia MIT; lee WAV de 16 bits |
| **yt-dlp** | Descargar un tramo de referencia | Respeta los términos del sitio y los derechos |
| **Remotion** | Video con código React | Gratis para personas, sin ánimo de lucro y empresas de hasta 3 empleados; el resto, licencia de empresa |
| **HyperFrames** | HTML a video para agentes | Apache 2.0; Node.js 22+ y FFmpeg |

No necesitas instalarlas todas: el Prompt 1 te ayuda a elegir el mínimo.

**Documentación:** [Claude Code](https://code.claude.com/docs/en/setup) · [Remotion](https://github.com/remotion-dev/remotion) · [HyperFrames](https://hyperframes.heygen.com/introduction) · [FFmpeg](https://ffmpeg.org/download.html) · [whisper.cpp](https://github.com/ggml-org/whisper.cpp) · [yt-dlp](https://github.com/yt-dlp/yt-dlp).
