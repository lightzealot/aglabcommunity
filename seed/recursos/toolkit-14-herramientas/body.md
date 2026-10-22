Catorce herramientas, en el orden de un flujo de contenido: **capturar → registrar → investigar → redactar → crear visuales → grabar → distribuir → atender consultas**. Fecha de consulta de las fuentes oficiales: **17 de octubre de 2026**. Abajo puedes descargar el PDF con una ficha completa por herramienta (pasos, ejemplo, errores y límites), el calendario para Notion y los prompts.

**No necesitas las catorce.** Algunas son alternativas (Perplexity o Grok; GPT Image 2 o Gemini; Higgsfield o HyperFrames) y **ninguna se conecta sola**: cada paso entre herramientas es copiar y pegar o una conexión que configuras tú. Los precios cambian: consúltalos en cada página oficial.

## Las 14 en orden

| # | Herramienta | Qué haces con ella | Entrada → salida | Ojo |
|---|---|---|---|---|
| 1 | [Slack](https://slack.com/help/articles/360042650274-Save-messages-and-files) | Capturar enlaces e ideas | Enlace + nota → mensaje guardado | Guardar es nativo; enviar a otra app se configura |
| 2 | [Hermes Agent](https://hermes-agent.nousresearch.com/docs/) | Un agente registra los enlaces | Mensaje → resumen y registro | Código abierto; requiere terminal, modelo y app de Slack. Conexión con Notion: no verificada |
| 3 | [Notion](https://www.notion.com/help/intro-to-databases) | Una fila por idea en un calendario | Ideas o CSV → calendario | Importar CSV: 5 MB en gratis, 50 MB en pago; fechas en MM/DD/YYYY |
| 4 | [Perplexity](https://www.perplexity.ai/help-center/en/articles/10352155-what-is-perplexity) | Investigar con fuentes | Pregunta → respuesta con citas | Abre las fuentes: una cita no prueba la cifra |
| 5 | [Grok](https://grok.com) | Contrastar y ampliar | Hallazgos → verificación | Búsqueda web documentada en su [API](https://docs.x.ai/docs/guides/tools/search-tools); funciones de la app sin confirmar |
| 6 | [Claude](https://claude.com/product/overview) | Redactar y revisar | Investigación + estilo → carrusel, caption, boletín | Dale los datos: si no, rellena huecos |
| 7 | [Claude Code](https://code.claude.com/docs/en/overview) | Construir sistemas de trabajo | Carpeta + encargo → scripts y archivos | Requiere suscripción o cuenta de consola; revisa los permisos |
| 8 | [GPT Image 2](https://developers.openai.com/api/docs/models/gpt-image-2) | Imágenes fijas | Brief → imagen | Es el modelo `gpt-image-2` de la API; la relación exacta con ChatGPT Images no está confirmada |
| 9 | [Higgsfield](https://higgsfield.ai) | Dar movimiento a una imagen | Imagen + movimiento → clip | Cuenta y créditos; pide uno o dos movimientos por clip |
| 10 | [Gemini](https://support.google.com/gemini/answer/14286560) | Imágenes para infografías | Brief → imagen | 2K con plan de Google AI, 1K sin él; textos largos en la imagen fallan: añádelos aparte |
| 11 | [HyperFrames](https://github.com/heygen-com/hyperframes) | Gráficos animados con código | HTML/CSS → MP4 | Node 22+ y FFmpeg; Apache 2.0. Distinto de HyperFrames Studio, su editor |
| 12 | [Tella](https://www.tella.com) | Grabar pantalla y rostro | Pantalla + cámara → video editado | Prueba de 7 días del plan Pro al consultar; revisa los subtítulos |
| 13 | [ManyChat](https://help.manychat.com/hc/en-us/articles/14281316989724-Instagram-Post-and-Reel-Comments-trigger) | Palabra clave en comentarios → mensaje directo | Comentario → mensaje con enlace | Cuenta y Instagram conectada; su ayuda no se pudo abrir directamente: confirma en tu cuenta |
| 14 | [Gmail](https://support.google.com/mail/answer/6579) | Etiquetas y filtros para consultas | Correos → bandeja ordenada | Un filtro de reenvío solo afecta a mensajes nuevos |

**Nombres que se confunden:** Hermes **Agent** no es el modelo Hermes; **HyperFrames** no es HyperFrames **Studio**; **Claude** no es **Claude Code**.

## Ruta mínima (3 o 4 herramientas)

1. **Notion:** importa el calendario y pon una idea real.
2. **Claude o Perplexity:** investiga y redacta con revisión.
3. **Gemini o GPT Image 2:** una imagen simple.
4. **ManyChat:** solo cuando ya tengas el recurso alojado.

## Ejemplo ficticio que recorre el flujo

Guardas un enlace sobre cómo un negocio local (la "Clínica Dental Sonrisa Norte", inventada) automatiza consultas: lo anotas en Slack, lo pasas a Notion, lo investigas, redactas un carrusel, creas la imagen, grabas un video corto y entregas la guía a quien comente **TOOLKIT**. Todos los datos son inventados.

## Entrega por ManyChat: configuración de ejemplo

| Campo | Valor |
|---|---|
| Disparador | Comentario en una publicación o reel de Instagram |
| Palabra clave | `TOOLKIT` |
| Mensaje | «¡Hola! Aquí tienes la guía TOOLKIT: URL_DEL_RECURSO» |
| `URL_DEL_RECURSO` | La completa quien implemente; esta guía no incluye ninguna descarga |

**Pruebas antes de publicar:** comenta `TOOLKIT` desde otra cuenta (llega el enlace correcto); prueba `toolkit` y otra palabra; comenta dos veces (según la ayuda, solo el primer comentario activa); abre el enlace en móvil y computador. Esta guía no afirma que exista una automatización activa ni resultados.

## Plantilla de calendario (Notion)

Importa `calendario-contenido.csv` en **Ajustes → Importar → CSV**. Columnas: Título, Estado, Fecha de publicación, Formato, Pilar, Enlace fuente, Palabra clave, Herramienta de investigación, Brief visual, Texto o caption, Responsable, Notas. Las dos filas de ejemplo son ficticias.

## Prompts

```text
Actúa como investigador. Tema: [TEMA]. Público: [PÚBLICO]. Enlace: [URL].
Entrega: 1) cinco hallazgos, cada uno con su fuente y lo que dice exactamente; 2) lo que las fuentes no confirman; 3) afirmaciones que debo verificar; 4) dos preguntas del público.
No inventes datos ni enlaces; si no puedes verificar algo, escribe «no confirmado».
```

```text
Redacta desde esta investigación verificada: [PEGAR]. Piezas: carrusel de [N] diapositivas, caption de máximo [N] palabras con CTA para comentar [PALABRA CLAVE] y boletín de [N] palabras.
Español neutro con tuteo, frases cortas, términos técnicos explicados, sin promesas de resultados ni datos sin fuente. Al final, puntúa tu borrador con la rúbrica.
```

```text
Escribe un brief visual para [pieza]. Idea: [frase]. Formato: [4:5 / 9:16 / 16:9]. Paleta: [colores]. Espacio para texto: [dónde]. Prohibido: texto largo en la imagen, logotipos, personas reconocibles.
Entrega: descripción en un párrafo, elementos por capa, prompt final para [herramienta] y tres comprobaciones.
```

## Rúbrica de cinco revisores (método propuesto)

Cada criterio vale 20 puntos; **si el total es menor de 95, la pieza vuelve a revisión**.

| Revisor | 20 puntos si… |
|---|---|
| Precisión | Cada dato tiene fuente abierta y verificada |
| Claridad | Una idea por diapositiva o párrafo |
| Utilidad | El lector puede ejecutar un paso concreto |
| Voz y español | Neutro, con tuteo y términos explicados |
| Honestidad | Sin promesas; límites, costos y requisitos mencionados |

## Primeros pasos (45 min)

Importa el CSV → cambia las filas de ejemplo por una idea real → investiga y abre tres fuentes → redacta y aplica la rúbrica → crea una imagen → configura ManyChat solo con la guía ya alojada.
