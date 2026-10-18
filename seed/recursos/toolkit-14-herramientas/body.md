Guía práctica para la comunidad AG LAB. Fecha de consulta de las fuentes: **17 de octubre de 2026**. Abajo puedes descargar el PDF, el calendario de contenido (CSV para Notion) y los prompts.

## Cómo usar esta guía

Esta guía recorre catorce herramientas en el orden de un flujo de contenido: capturar una idea, registrarla, investigarla, redactarla, crear los visuales, grabar, distribuir y atender las consultas. Cada ficha te dice qué hace la herramienta, qué entra y qué sale, cómo empezar, un ejemplo para copiar y sus límites.

Tres reglas para leerla bien:

- **No necesitas las catorce.** Hay un recorrido mínimo con tres o cuatro herramientas en el apartado «Ruta mínima». Algunas herramientas son alternativas entre sí (Perplexity o Grok; GPT Image 2 o Gemini).
- **Las herramientas no se conectan solas.** Cuando una ficha habla de pasar información de una herramienta a otra, hay una conexión que debes configurar tú (un conector, una API, un archivo CSV o simplemente copiar y pegar). Cada ficha indica cuál es.
- **Los precios y planes cambian.** Esta guía no fija precios. Cuando una herramienta puede requerir plan de pago, te lo indica y te manda a su página oficial para consultarlo.

### Cómo se verificó

Para cada herramienta se consultaron páginas oficiales del propio producto (sitio, documentación o centro de ayuda) el 17 de octubre de 2026. Esto no es una prueba de funcionamiento: no se probaron las herramientas ni se conectaron a cuentas reales. Donde una página oficial no se pudo abrir o no confirmaba un dato, la ficha lo dice con claridad en el apartado «Límites y verificación». Las capturas y funciones de cada producto pueden cambiar; ante cualquier diferencia, manda la documentación oficial.

### Nombres que se confunden

- **Hermes Agent** (Nous Research) es un agente que corre en tu propio equipo o servidor. No es lo mismo que los modelos de lenguaje de la familia Hermes, ni que otros productos que usen la palabra «Hermes».
- **HyperFrames** (HeyGen) es un marco de código abierto para crear video a partir de HTML. **HyperFrames Studio** es la superficie de navegador del mismo proyecto para previsualizar y editar composiciones. No lo confundas con sitios de nombre parecido: el punto de partida verificado es el repositorio `heygen-com/hyperframes`.
- **Claude** es el asistente de uso general (web, escritorio y móvil). **Claude Code** es la herramienta para construir y ejecutar trabajo sobre archivos y código. Son productos distintos del mismo desarrollador.
- **GPT Image 2** es el nombre de un modelo de imágenes de OpenAI en su API. En ChatGPT, la ayuda oficial usa otros nombres de producto (véase la ficha 8).

## El ejemplo que recorre toda la guía

Para que las fichas no sean teoría suelta, usamos un mismo caso en todas. **Todos los datos del caso son ficticios.**

> Caso: guardas un enlace a un artículo sobre cómo un negocio local puede automatizar las consultas de sus clientes. Quieres convertirlo en contenido educativo para tu comunidad: una investigación breve, un carrusel, un video corto y una guía descargable que se entrega cuando alguien comenta la palabra TOOLKIT.

- Enlace ficticio de partida: `https://www.example.com/automatizar-consultas-negocio-local`
- Negocio de ejemplo (ficticio): «Clínica Dental Sonrisa Norte», que recibe mensajes por Instagram y correo.
- Idea central de ejemplo: «Responder en menos de un minuto no exige un equipo grande, exige un proceso».

El recorrido completo sería este:

1. **Slack:** pegas el enlace en un canal o mensaje privado y lo guardas.
2. **Hermes:** un agente registra el enlace (opcional, requiere configurar).
3. **Notion:** el enlace queda como una fila del calendario de contenido.
4. **Perplexity o Grok** (uno de los dos, o ambos): investigas y compruebas fuentes.
5. **Claude:** redactas el carrusel, el caption y un boletín, y pasas la revisión de calidad.
6. **Claude Code** (opcional): armas un sistema que repita parte del proceso.
7. **GPT Image 2 o Gemini** (uno de los dos): creas las imágenes.
8. **Higgsfield o HyperFrames:** das movimiento a una imagen o creas un gráfico animado con código.
9. **Tella:** grabas pantalla y rostro para un video explicativo.
10. **ManyChat:** quien comente TOOLKIT recibe el recurso por mensaje directo.
11. **Gmail:** organizas las consultas que lleguen por correo.

## Ruta mínima: tres o cuatro herramientas

Si empiezas hoy, no contrates catorce servicios. Esta ruta resuelve el caso con lo mínimo:

| Paso | Herramienta | Qué haces |
|---|---|---|
| 1 | Notion | Una tabla con calendario y una fila por idea (usa el CSV de esta guía). |
| 2 | Claude o Perplexity | Investigas la idea y redactas el borrador con revisión. |
| 3 | Gemini o GPT Image 2 | Una imagen simple para la publicación. |
| 4 | ManyChat (si ya tienes la guía alojada) | Entregas el recurso al comentar la palabra clave. |

Lo demás (Slack, Hermes, Claude Code, Higgsfield, HyperFrames, Tella y Gmail) lo añades cuando el proceso te lo pida.

## Ficha 1. Slack: capturar enlaces e ideas en mensajes

**Enlace oficial:** [slack.com](https://slack.com) · Guardar mensajes: [centro de ayuda de Slack](https://slack.com/help/articles/360042650274-Save-messages-and-files)

**Función concreta.** Slack es un espacio de trabajo organizado en canales y mensajes. Aquí lo usamos como bandeja de entrada de ideas: pegas un enlace con una nota y lo guardas para volver a él.

**Entrada y salida.** Entra un enlace o una idea escrita en un mensaje. Sale un mensaje guardado, visible solo para ti, en tu sección de guardados.

**Función nativa o automatización.** Guardar un mensaje es una función nativa. Que ese mensaje llegue a otra herramienta (Hermes, Notion) es una automatización que debes configurar.

**Plan, autorización o código.** Slack ofrece registro gratuito según su página, pero lo que incluye cada plan debe consultarse en su página de precios. No requiere código para guardar mensajes.

**Caso práctico.** Creas un canal privado «ideas-contenido» y pegas: «Artículo sobre automatizar consultas en un negocio local: https://www.example.com/automatizar-consultas-negocio-local. Ángulo: responder rápido con un proceso».

**Pasos de inicio**

1. Crea una cuenta y un espacio de trabajo en Slack (o usa el tuyo).
2. Crea un canal privado llamado `ideas-contenido`.
3. Pega el enlace y una línea con el ángulo.
4. En escritorio, pasa el cursor por el mensaje, pulsa «Más acciones» y elige «Añadir a guardados» (en inglés: *Add to saved*). En móvil: mantén pulsado el mensaje y elige «Guardar para después».

**Ejemplo listo para usar**

```text
IDEA | Enlace: [URL] | Ángulo: [en una frase] | Formato: [carrusel/video/boletín] | Prioridad: [alta/media/baja]
```

**Resultado esperado.** Cada idea queda en una sola línea con los campos que luego necesitará tu calendario.

**Error habitual y cómo evitarlo.** Pegar el enlace sin contexto: a la semana no recuerdas por qué lo guardaste. Escribe siempre el ángulo en la misma línea.

**Límites y verificación.** La ayuda oficial indica que los elementos guardados son privados y que, en un despliegue gradual, «Later» pasa a llamarse «To-dos» (puede que veas nombres distintos según tu cuenta). Guardar un mensaje no lo copia a ninguna otra herramienta.

## Ficha 2. Hermes: registrar esos enlaces mediante un agente

**Enlace oficial:** [Hermes Agent, documentación](https://hermes-agent.nousresearch.com/docs/) · [Código y licencia](https://github.com/NousResearch/hermes-agent) · [Slack con Hermes](https://hermes-agent.nousresearch.com/docs/user-guide/messaging/slack)

**Función concreta.** Hermes Agent es un agente de Nous Research que tú ejecutas en tu equipo o en un servidor. Según su documentación, recuerda información entre sesiones, puede crear habilidades, tiene programador de tareas y se conecta a plataformas de mensajería (entre ellas Slack) mediante una puerta de enlace propia. Puede usar servidores MCP (un estándar para conectar herramientas).

**Entrada y salida.** Entra un mensaje (por ejemplo, el enlace que escribes en Slack). Sale una acción del agente: leer el enlace, resumirlo y, si lo configuras, registrar el dato donde le indiques.

**Función nativa o automatización.** La conexión con Slack y las herramientas del agente son funciones documentadas. Que Hermes escriba en tu base de Notion es una automatización que debes configurar tú: esta guía no verificó un conector oficial entre Hermes y Notion. Una vía posible es un servidor MCP o una API de Notion, que habría que comprobar y configurar.

**Plan, autorización o código.** Es software de código abierto (licencia MIT, según su repositorio). Necesitas acceso a un proveedor de modelos (con su propia cuenta o crédito) y, para Slack, crear una app con permisos. Requiere comodidad con la terminal.

**Caso práctico.** Hermes lee el enlace del canal `ideas-contenido`, lo resume en tres líneas y deja el resumen listo para que lo pegues en tu calendario.

**Pasos de inicio**

1. Instala. En Linux, macOS o WSL2: `curl -fsSL https://hermes-agent.nousresearch.com/install.sh | bash`. En Windows (PowerShell): `iex (irm https://hermes-agent.nousresearch.com/install.ps1)`.
2. Abre una terminal nueva y escribe `hermes setup --portal` (según la documentación, un solo inicio de sesión configura un modelo y herramientas) o configura tu propio proveedor con `hermes model`.
3. Para Slack, sigue la guía oficial: crea la app (la documentación indica `hermes slack manifest --agent-view --write`), activa Socket Mode, guarda los tokens `SLACK_BOT_TOKEN` y `SLACK_APP_TOKEN` en `~/.hermes/.env` y define `SLACK_ALLOWED_USERS` con tu identificador de miembro (si no, el agente ignora todos los mensajes).
4. Inicia la puerta de enlace con `hermes gateway` e invita al bot al canal con `/invite @Hermes Agent`.

**Ejemplo listo para usar** (mensaje al agente)

```text
Lee este enlace: [URL]. Devuélveme: 1) título, 2) resumen en tres líneas, 3) la idea principal en una frase, 4) una lista de los datos que habría que verificar. No guardes nada ni envíes mensajes a nadie.
```

**Resultado esperado.** Una respuesta en el hilo con el resumen y los datos por verificar.

**Error habitual y cómo evitarlo.** Dejar el agente con permisos amplios. La puerta de enlace niega por defecto a quien no esté en la lista de permitidos: mantén esa lista corta y revisa qué herramientas tiene activas antes de pedirle tareas.

**Límites y verificación.** La documentación oficial describe la instalación y la puerta de enlace; no se probó el flujo completo ni se verificó una integración oficial con Notion. En entorno Slack el agente puede tener acceso a la terminal según su conjunto de herramientas, por lo que debes tratarlo con cuidado.

## Ficha 3. Notion: organizar una fila por idea en un calendario de contenido

**Enlace oficial:** [notion.com](https://www.notion.com) · [Bases de datos](https://www.notion.com/help/intro-to-databases) · [Vista de calendario](https://www.notion.com/help/views-filters-and-sorts) · [Importar CSV](https://www.notion.com/help/import-data-into-notion)

**Función concreta.** En Notion, una base de datos es una colección de páginas; cada fila es una página con propiedades (fecha, estado, enlace…). Una vista de calendario muestra esas filas según su propiedad de fecha.

**Entrada y salida.** Entran tus ideas (a mano, pegadas o importadas desde un CSV). Sale una tabla y un calendario donde cada idea tiene fecha, estado y formato.

**Función nativa o automatización.** Las bases de datos, la vista de calendario y la importación de CSV son funciones nativas. Que las filas lleguen desde Slack u otra herramienta es una automatización que debes configurar.

**Plan, autorización o código.** Según la ayuda oficial, la importación de CSV admite hasta 5 MB por archivo en el plan gratuito y 50 MB en planes de pago. Para otras funciones y planes, consulta la página de precios de Notion.

**Caso práctico.** Importas el archivo `calendario-contenido.csv` de esta guía, abres la vista de calendario y arrastras la idea del negocio local a la semana de publicación.

**Pasos de inicio**

1. Ve a Ajustes → Importar → CSV (o escribe `/csv` en una página) y sube `calendario-contenido.csv`.
2. Elige crear una base de datos nueva y asigna cada columna a su propiedad (la columna «Fecha de publicación» debe ser de tipo Fecha).
3. Pulsa `+` junto al nombre de la base de datos, elige «Calendar» como diseño y ponle nombre.
4. Comprueba que cada fila aparece en el día de su fecha.

**Ejemplo listo para usar** (fila de ejemplo, ficticia)

```text
Título: Cómo responder en menos de un minuto sin un equipo grande
Estado: Idea
Fecha de publicación: 11/03/2026
Formato: Carrusel
Palabra clave: TOOLKIT
```

**Resultado esperado.** Una vista de calendario con una tarjeta por idea.

**Error habitual y cómo evitarlo.** Fechas que no se reconocen. La ayuda oficial indica que las fechas se importan en formato MM/DD/YYYY: escribe `11/03/2026` para el 3 de noviembre de 2026, no `03/11/2026`.

**Límites y verificación.** La importación nueva no crea propiedades de tipo relación, fórmula ni rollup (hay que crearlas después). Las importaciones solo añaden filas y no actualizan las existentes. Si hay caracteres rotos, exporta el CSV como UTF-8.

## Ficha 4. Perplexity: investigar y encontrar fuentes

**Enlace oficial:** [perplexity.ai](https://www.perplexity.ai) · [¿Qué es Perplexity?](https://www.perplexity.ai/help-center/en/articles/10352155-what-is-perplexity) · [API](https://docs.perplexity.ai)

**Función concreta.** Perplexity es un buscador con IA: respondes una pregunta y te devuelve una respuesta conversacional con citas y enlaces a las fuentes. La ayuda oficial menciona modos como Search, Pro Search y Deep Research.

**Entrada y salida.** Entra una pregunta de investigación. Sale una respuesta con enlaces a las fuentes que usó.

**Función nativa o automatización.** La búsqueda con citas es nativa. Guardar los resultados en Notion o pasarlos a Claude es manual o requiere una automatización que configures (también hay una API documentada).

**Plan, autorización o código.** Algunos modos o límites dependen del plan; consulta la sección de planes de su centro de ayuda. La API usa claves de su consola.

**Caso práctico.** Preguntas qué tareas de atención al cliente suelen automatizar los negocios locales y qué errores comunes aparecen, y abres las fuentes citadas.

**Pasos de inicio**

1. Entra en perplexity.ai.
2. Escribe una pregunta concreta (usa el prompt de investigación de esta guía).
3. Abre al menos tres fuentes citadas y comprueba que dicen lo que la respuesta afirma.
4. Copia al calendario solo los datos que confirmaste.

**Ejemplo listo para usar**

```text
Investiga: ¿qué consultas repetitivas de clientes puede automatizar un negocio local (por ejemplo, una clínica) y cuáles conviene que siga atendiendo una persona? Dame: 1) cinco hallazgos, cada uno con su fuente, 2) lo que las fuentes no confirman, 3) dos cifras solo si aparecen en una fuente enlazada.
```

**Resultado esperado.** Una lista de hallazgos con enlaces que puedes abrir y revisar.

**Error habitual y cómo evitarlo.** Confiar en una cifra solo porque tiene una cita. Abre la fuente: a veces la cita apoya otra cosa. Descarta lo que no puedas verificar.

**Límites y verificación.** La página consultada describe los modos Search, Pro Search, Deep Research y «Create files and apps». No se verificaron límites de uso por plan. Perplexity es alternativa o complemento de Grok, no un paso obligatorio.

## Ficha 5. Grok: ampliar la investigación

**Enlace oficial:** [grok.com](https://grok.com) · [Herramienta de búsqueda web (API)](https://docs.x.ai/docs/guides/tools/search-tools)

**Función concreta.** Grok es el asistente de xAI. Según la documentación oficial para desarrolladores, a través de la API puede usar una herramienta de búsqueda web que busca en tiempo real, navega páginas y extrae información, y admite filtros de dominios permitidos o excluidos.

**Entrada y salida.** Entra una pregunta o una lista de afirmaciones por contrastar. Sale una respuesta con información actual y, en la API, citas.

**Función nativa o automatización.** En la API, la búsqueda web se activa añadiendo la herramienta a la solicitud (requiere código y clave de API). Para uso en la aplicación, esta guía solo pudo confirmar que existe grok.com con un cuadro de mensajes; no pudo confirmar qué funciones de investigación incluye hoy cada plan.

**Plan, autorización o código.** La API requiere cuenta, clave y código. Los precios y planes deben consultarse en las páginas oficiales de xAI; no se verificaron aquí.

**Caso práctico.** Usas Grok como segunda opinión: le pasas los cinco hallazgos de Perplexity y le pides contrastarlos y buscar lo que falta.

**Pasos de inicio**

1. Entra en grok.com y crea cuenta o inicia sesión.
2. Pega los hallazgos y pide una verificación independiente (ejemplo siguiente).
3. Compara con lo de Perplexity y marca las diferencias.

**Ejemplo listo para usar**

```text
Estos son cinco hallazgos sobre automatización de consultas en negocios locales: [PEGAR]. Para cada uno: dime si encuentras apoyo en fuentes actuales (con enlace), si lo contradicen, o si no puedes confirmarlo. Añade dos hallazgos que falten y su fuente.
```

**Resultado esperado.** Una lista con cada hallazgo marcado como confirmado, contradicho o sin confirmar.

**Error habitual y cómo evitarlo.** Tomar la respuesta de una segunda IA como verificación definitiva. Sigue siendo necesario abrir las fuentes.

**Límites y verificación.** La página de la aplicación no describía sus funciones de investigación, y no se pudo confirmar una función de investigación profunda vigente en la aplicación. La documentación de API sí describe la búsqueda web. Es una alternativa a Perplexity o un complemento.

## Ficha 6. Claude: redactar publicaciones, captions y boletines, con revisión de calidad

**Enlace oficial:** [claude.com/product/overview](https://claude.com/product/overview)

**Función concreta.** Claude es un asistente de uso general (web, escritorio y móvil). Según su página de producto, permite subir archivos (Word, PDF, Excel, CSV, imágenes y más), buscar en la web, organizar el trabajo en Projects con instrucciones y archivos, y conectar aplicaciones mediante conectores.

**Entrada y salida.** Entra tu investigación, tu calendario y las reglas de estilo. Sale un borrador de carrusel, caption o boletín y una revisión contra una rúbrica.

**Función nativa o automatización.** Redactar y revisar es nativo. Traer datos de Notion o enviar el resultado a otra herramienta requiere un conector o copiar y pegar.

**Plan, autorización o código.** La página lista planes (Pro, Max, Team, Enterprise) con uso y costo variables; consulta la página de precios. No requiere código.

**Caso práctico.** Pegas la investigación verificada y pides un carrusel de siete diapositivas, un caption y un boletín corto, y luego aplicas la rúbrica de cinco revisores de esta guía.

**Pasos de inicio**

1. Crea un Project llamado «TOOLKIT» y pega en sus instrucciones las reglas de estilo (usa el prompt de redacción de esta guía).
2. Sube la investigación y las fuentes que verificaste.
3. Pide el borrador con el prompt de redacción.
4. Pasa la rúbrica: si el total es menor de 95, pide una segunda versión.

**Ejemplo listo para usar:** el **prompt de redacción** al final de esta guía.

**Resultado esperado.** Un borrador en español neutro, con un enlace a fuente por cada dato y una nota de revisión.

**Error habitual y cómo evitarlo.** Pedir texto sin darle los datos: el modelo rellenará huecos. Entrega siempre la investigación y di «no inventes datos».

**Límites y verificación.** Claude puede equivocarse: revisa datos, nombres y cifras. La página oficial no fija precios y anuncia cambios de producto en curso, así que confirma en tu cuenta qué funciones tienes.

## Ficha 7. Claude Code: construir y ejecutar sistemas de trabajo

**Enlace oficial:** [Claude Code, documentación](https://code.claude.com/docs/en/overview)

**Función concreta.** Claude Code es una herramienta agéntica que lee tu proyecto, edita archivos, ejecuta comandos y se integra con tus herramientas. Funciona en terminal, IDE, aplicación de escritorio y navegador. Permite instrucciones persistentes (`CLAUDE.md`), skills, hooks, conexión con MCP, tareas programadas y agentes en paralelo.

**Entrada y salida.** Entra una carpeta de trabajo y una instrucción. Sale una carpeta con archivos creados o modificados y, si lo pides, scripts que ejecutan un proceso.

**Función nativa o automatización.** Editar archivos y ejecutar comandos es nativo. Programar el proceso o conectarlo a Slack, Notion o Gmail exige que configures cada conexión (por ejemplo, MCP) y autorices los permisos.

**Plan, autorización o código.** Según la documentación, la mayoría de las superficies requieren una suscripción de Claude o una cuenta de la consola de Anthropic. Trabaja con código y permisos: revisa lo que pide autorizar.

**Caso práctico.** Pides un script que tome el CSV del calendario y genere un borrador de caption por cada fila con estado «Idea», sin publicar nada.

**Pasos de inicio**

1. Instala (macOS, Linux o WSL): `curl -fsSL https://claude.ai/install.sh | bash`. En PowerShell de Windows: `irm https://claude.ai/install.ps1 | iex`.
2. Abre una terminal nueva y ejecuta `claude --version` para comprobar la instalación.
3. Entra en una carpeta de prueba (`cd mi-proyecto`) y escribe `claude`; inicia sesión cuando lo pida.
4. Pega el ejemplo de abajo.

**Ejemplo listo para usar**

```text
En esta carpeta hay calendario-contenido.csv. Crea un script que lea el archivo y, por cada fila con Estado = Idea, genere un archivo de texto con un borrador de caption usando la columna Título y la columna Brief visual. No envíes, publiques ni conectes nada. Explícame cómo ejecutarlo y qué verificaste.
```

**Resultado esperado.** Un script y una carpeta de borradores que puedes abrir y revisar.

**Error habitual y cómo evitarlo.** Aprobar permisos sin leerlos. Revisa cada acción propuesta y empieza en una carpeta de prueba, no en tu proyecto real.

**Límites y verificación.** No se probaron en esta guía los comandos de instalación; proceden de la documentación oficial consultada el 17 de octubre de 2026. No es un paso obligatorio del flujo.

## Ficha 8. GPT Image 2: crear imágenes fijas

**Enlace oficial:** [Modelo gpt-image-2 en la API de OpenAI](https://developers.openai.com/api/docs/models/gpt-image-2) · [Imágenes en ChatGPT](https://help.openai.com/en/articles/11084440-images-in-chatgpt)

**Verificación de la denominación.** La página oficial del modelo confirma el identificador `gpt-image-2` (instantánea `gpt-image-2-2026-04-21`) como modelo de generación y edición de imágenes con entrada de texto e imagen y salida de imagen. En ChatGPT, los resultados de búsqueda sobre el centro de ayuda oficial muestran «ChatGPT Images» con versiones propias (la ayuda menciona «Images 2.5»). **No se pudo confirmar con una fuente oficial abierta directamente si el generador de ChatGPT es exactamente el modelo `gpt-image-2` ni cómo se relaciona con «Images 2.5»**, así que esta ficha no afirma esa equivalencia. La página de ayuda de ChatGPT devolvió un error al abrirla directamente; los datos de ChatGPT proceden de los resultados de búsqueda sobre esa página.

**Función concreta.** Generar y editar imágenes a partir de texto e imágenes de referencia.

**Entrada y salida.** Entra una descripción (y, si quieres, una imagen). Sale una imagen.

**Función nativa o automatización.** En ChatGPT, crear imágenes es una función del producto (consulta su ayuda). En la API, el modelo ofrece los puntos de acceso de generación (`v1/images/generations`), edición (`v1/images/edits`) y por lotes (`v1/batch`); usarlo así requiere código y una clave.

**Plan, autorización o código.** La API tiene precios y límites propios (consúltalos en la página oficial de precios). La ayuda de ChatGPT indica que sus imágenes están disponibles en todos los planes y que el modo con razonamiento se limita a planes de pago; verifícalo en tu cuenta.

**Caso práctico.** Creas la imagen de portada del carrusel: una ilustración simple de un teléfono con tres burbujas de mensaje respondidas.

**Pasos de inicio**

1. Elige: ChatGPT (sin código) o la API (con código).
2. Escribe el brief visual (usa el prompt de brief visual de esta guía).
3. Genera, revisa y pide solo un cambio por iteración.
4. Descarga y guarda en tu carpeta de visuales.

**Ejemplo listo para usar**

```text
Ilustración vertical 4:5, estilo plano y limpio, fondo claro, acentos naranja y negro. Un teléfono con tres burbujas de mensaje respondidas. Sin texto legible, sin logotipos, sin personas. Deja espacio libre en el tercio superior para un título.
```

**Resultado esperado.** Una imagen utilizable como fondo de la diapositiva de portada.

**Error habitual y cómo evitarlo.** Pedir texto largo dentro de la imagen: puede salir con errores. Añade los textos después, en tu editor.

**Límites y verificación.** La página del modelo no detalla tamaños concretos («tamaños flexibles») ni precios. Es alternativa a Gemini.

## Ficha 9. Higgsfield: convertir imágenes fijas en movimiento

**Enlace oficial:** [higgsfield.ai](https://higgsfield.ai)

**Función concreta.** Higgsfield es una plataforma de creación de video con IA. Su página lista modelos de video (entre ellos Seedance, Wan, Kling, Veo y Sora, según la página) y aplicaciones como Genjutsu, Cinema Studio y un asistente. Para animar una imagen, el punto de partida más cercano en la página es su herramienta de video a partir de texto, imagen, video o audio.

**Entrada y salida.** Entra una imagen fija y una descripción del movimiento. Sale un clip corto de video.

**Función nativa o automatización.** Animar una imagen en la plataforma es nativo. Higgsfield ofrece también una API y una integración MCP para Claude según su página; usarlas requiere configuración y credenciales.

**Plan, autorización o código.** Funciona con cuenta y créditos o planes: la página enlaza a una sección de precios, que debes consultar. No se verificaron aquí precios ni créditos gratuitos.

**Caso práctico.** Animas la imagen de portada para que las burbujas de mensaje aparezcan una a una en un clip corto para Reels o Historias.

**Pasos de inicio**

1. Crea tu cuenta en higgsfield.ai y revisa los planes antes de generar.
2. Abre la herramienta de video a partir de imagen (el nombre y la ubicación en el menú pueden cambiar: busca en su catálogo de aplicaciones).
3. Sube la imagen y describe el movimiento (ejemplo siguiente).
4. Genera, revisa y descarta si la imagen se deforma.

**Ejemplo listo para usar**

```text
Anima esta ilustración: las tres burbujas de mensaje aparecen una tras otra de abajo hacia arriba, con un movimiento suave de cámara hacia delante. Mantén la composición, los colores y la forma del teléfono sin cambios. Duración corta, sin texto nuevo.
```

**Resultado esperado.** Un clip breve en el que se mueve lo que pediste y el resto queda estable.

**Error habitual y cómo evitarlo.** Pedir demasiados movimientos a la vez: la imagen se deforma. Pide uno o dos movimientos por clip.

**Límites y verificación.** La página principal no detalla pasos ni límites de duración por herramienta, y no se pudo confirmar una función con el nombre exacto «imagen a video». Consulta el catálogo de la plataforma. Alternativa de movimiento: HyperFrames (ficha 11) para gráficos hechos con código.

## Ficha 10. Gemini: generar imágenes para infografías

**Enlace oficial:** [gemini.google.com](https://gemini.google.com) · [Ayuda: crear imágenes](https://support.google.com/gemini/answer/14286560)

**Función concreta.** Con Gemini puedes generar imágenes desde la aplicación. La ayuda oficial indica que usa modelos de la familia «Nano Banana» (Nano Banana 2, y Nano Banana Pro con un plan de Google AI) y recomienda describir estilo, sujeto y escenario.

**Entrada y salida.** Entra una descripción (y, con Nano Banana 2, varias imágenes de referencia). Sale una imagen.

**Función nativa o automatización.** Generar imágenes en la aplicación es nativo. Llevarlas a tu editor o a Notion es manual.

**Plan, autorización o código.** Debes iniciar sesión en Gemini y cumplir requisitos de edad y país; la ayuda indica descarga en 2K con un plan de Google AI y en 1K sin él, y límites diarios. Consulta tu plan.

**Caso práctico.** Creas los elementos gráficos de una infografía de tres pasos (recibir, clasificar, responder), sin textos, para añadirlos después en tu editor.

**Pasos de inicio**

1. Entra en gemini.google.com y abre la barra lateral.
2. Elige «Imágenes».
3. Escribe el prompt o elige una plantilla.
4. Descarga con la opción de tamaño completo que aparece al pasar el cursor sobre la imagen.

**Ejemplo listo para usar**

```text
Crea tres íconos ilustrados en estilo plano, uno al lado del otro, sobre fondo claro: un buzón de mensajes, una etiqueta de clasificación y una burbuja de respuesta. Colores: naranja y negro. Sin texto, sin logotipos, sin personas.
```

**Resultado esperado.** Tres íconos limpios que combinas en tu infografía.

**Error habitual y cómo evitarlo.** Esperar texto perfecto dentro de una infografía. Genera las imágenes sin texto y escribe los textos en tu editor.

**Límites y verificación.** La ayuda aclara que las imágenes generadas están sujetas a las condiciones de Google y que debes usar criterio antes de publicarlas. Es alternativa a GPT Image 2.

## Ficha 11. HyperFrames: crear gráficos animados mediante código

**Enlace oficial:** [github.com/heygen-com/hyperframes](https://github.com/heygen-com/hyperframes) · [hyperframes.heygen.com](https://hyperframes.heygen.com)

**Función concreta.** HyperFrames es un marco de código abierto de HeyGen que convierte HTML, CSS, medios y animaciones en videos MP4, pensado para usarse desde la línea de comandos, con agentes de código o como motor de renderizado. HyperFrames Studio es la superficie de navegador para previsualizar y editar composiciones (según el repositorio, «disponible, en evolución», con descarga para macOS y Linux en el sitio).

**Entrada y salida.** Entra una composición escrita en HTML y CSS. Sale un video MP4.

**Función nativa o automatización.** Renderizar a MP4 con el comando `render` es nativo del proyecto. Que un agente escriba la composición por ti es una integración que debes configurar (hay un plugin para Claude Code descrito en el repositorio).

**Plan, autorización o código.** Licencia Apache 2.0, según el repositorio. Requiere Node.js 22 o superior y FFmpeg, y conocimientos básicos de terminal. El repositorio indica que no cobra por renderizado; el renderizado en la nube de HeyGen es un servicio aparte del que debes consultar condiciones.

**Caso práctico.** Creas un gráfico animado de cinco segundos con el título «3 pasos para responder rápido» y tres números que entran en secuencia.

**Pasos de inicio**

1. Comprueba que tienes Node.js 22+ y FFmpeg.
2. Ejecuta `npx hyperframes init mi-video` y entra con `cd mi-video`.
3. Abre la vista previa con `npx hyperframes preview`.
4. Cuando te guste, genera el MP4 con `npx hyperframes render`.

**Ejemplo listo para usar** (instrucción para un agente de código)

```text
Crea en este proyecto de HyperFrames una composición vertical de 5 segundos: fondo claro, título «3 pasos para responder rápido» en negro y tres números (1, 2, 3) en naranja que entran uno tras otro. Sin audio. Déjala lista para ver con la vista previa; no hagas render en la nube.
```

**Resultado esperado.** Una vista previa en el navegador y un MP4 corto.

**Error habitual y cómo evitarlo.** Usar un sitio de nombre parecido en lugar del oficial. Empieza siempre por el repositorio `heygen-com/hyperframes`.

**Límites y verificación.** El repositorio menciona un playground de la comunidad en otro dominio que no es la documentación oficial. No se probaron los comandos. Alternativa de movimiento a Higgsfield cuando prefieres control por código.

## Ficha 12. Tella: grabar pantalla y rostro para videos

**Enlace oficial:** [tella.com](https://www.tella.com)

**Función concreta.** Tella es una grabadora de pantalla para Mac, Windows y Chrome que graba pantalla y cámara y permite editar y compartir. Según su página, guarda pantalla y cámara como pistas separadas, añade diseños y subtítulos, y permite editar borrando palabras o silencios desde la transcripción.

**Entrada y salida.** Entran tu pantalla, tu cámara y tu micrófono. Sale un video editado que puedes compartir como enlace o exportar.

**Función nativa o automatización.** Todo lo anterior es nativo. Subir el video a redes o incrustarlo en una guía es manual.

**Plan, autorización o código.** La página indicaba, a la fecha de consulta, una prueba de 7 días del plan Pro sin tarjeta y planes de pago; consulta la página de precios vigente antes de contratar. Requiere permisos de pantalla, cámara y micrófono en tu equipo.

**Caso práctico.** Grabas un video de tres minutos mostrando tu calendario de Notion y explicando el flujo, con tu rostro en una esquina.

**Pasos de inicio**

1. Crea tu cuenta en el sitio de Tella.
2. Elige grabar desde el navegador, la aplicación o la extensión de Chrome y concede los permisos.
3. Graba con un guion corto (ejemplo siguiente).
4. Quita silencios, revisa los subtítulos y exporta o comparte el enlace.

**Ejemplo listo para usar** (guion de 90 segundos)

```text
[0:00] Hook: «Responder en menos de un minuto no exige un equipo grande: exige un proceso.»
[0:10] Muestro el calendario: una fila por idea.
[0:30] Muestro cómo se investiga y se verifica una fuente.
[1:00] Muestro el carrusel terminado.
[1:20] Cierro: «Comenta TOOLKIT y te envío la guía.»
```

**Resultado esperado.** Un video corto con pantalla y rostro, con subtítulos que revisas.

**Error habitual y cómo evitarlo.** Mostrar datos privados en pantalla (correos, nombres de clientes). Cierra pestañas y usa datos de ejemplo.

**Límites y verificación.** Los subtítulos automáticos pueden fallar con nombres propios: revísalos. Esta ficha no verificó duración máxima ni límites por plan más allá de lo que indicaba su página.

## Ficha 13. ManyChat: conectar una palabra clave en comentarios con la entrega por mensaje directo

**Enlace oficial:** [manychat.com](https://manychat.com) · [Centro de ayuda: activador de comentarios de publicaciones y reels de Instagram](https://help.manychat.com/hc/en-us/articles/14281316989724-Instagram-Post-and-Reel-Comments-trigger)

**Verificación.** El centro de ayuda de ManyChat devolvió un error al abrirlo directamente desde la herramienta de consulta. Lo descrito aquí procede de resúmenes de resultados de búsqueda sobre esos artículos oficiales; confirma cada detalle en tu cuenta de ManyChat.

**Función concreta.** ManyChat permite crear una automatización en la que un comentario con una palabra clave en una publicación o reel de Instagram dispara un mensaje directo.

**Entrada y salida.** Entra un comentario con la palabra clave. Sale un mensaje directo al autor del comentario con el enlace que definas.

**Función nativa o automatización.** Es una automatización que debes configurar tú: cuenta de ManyChat, cuenta de Instagram conectada, disparador, mensaje y pruebas.

**Plan, autorización o código.** Requiere cuenta de ManyChat y conectar una cuenta de Instagram (autorizaciones que concedes tú). No se verificaron aquí planes ni precios: consúltalos en su página oficial. No requiere código.

**Configuración de ejemplo (para quien implemente)**

| Campo | Valor |
|---|---|
| Disparador | Alguien comenta en una publicación o reel de Instagram |
| Publicación | `PUBLICACIÓN_A_COMPLETAR` (la que tiene el carrusel) |
| Palabra clave | `TOOLKIT` |
| Mensaje | «¡Hola! Aquí tienes la guía TOOLKIT: URL_DEL_RECURSO» |
| Enlace del recurso | `URL_DEL_RECURSO` (a completar por quien implemente; esta guía no incluye ninguna URL de descarga) |
| Botón opcional | «Abrir la guía» → `URL_DEL_RECURSO` |

**Pasos de inicio**

1. Crea una cuenta en ManyChat y conecta tu cuenta de Instagram (autorizas tú).
2. En la pestaña de automatizaciones, crea una nueva desde cero.
3. Añade el disparador «el usuario comenta en tu publicación o reel» y elige la publicación.
4. Configura la palabra clave `TOOLKIT` y revisa qué tipos de coincidencia ofrece tu cuenta.
5. Añade el nodo de mensaje de Instagram con el texto y el enlace (la automatización no puede publicarse sin al menos un nodo de mensaje).
6. Prueba antes de publicar.

**Pruebas necesarias**

- Comenta `TOOLKIT` desde otra cuenta: llega el mensaje con el enlace correcto.
- Comenta `toolkit` y `Toolkit`: comprueba si también se activa y decide si es lo que quieres.
- Comenta otra palabra: no debe activarse.
- Comenta dos veces con la misma cuenta: según la ayuda, el activador solo funciona con el primer comentario de cada persona.
- Abre el enlace del mensaje desde un móvil y desde un computador.

**Resultado esperado.** Quien comenta la palabra recibe el enlace por mensaje directo.

**Error habitual y cómo evitarlo.** Publicar sin probar o dejar el marcador del enlace sin completar. Prueba con una cuenta de prueba y sustituye `URL_DEL_RECURSO` antes de publicar.

**Límites y verificación.** Esta guía no afirma que exista una automatización activa, una guía alojada, conexiones a cuentas reales ni resultados comerciales. Las reglas de Meta e Instagram y las de ManyChat pueden cambiar: léelas antes de activar.

## Ficha 14. Gmail: organizar los correos y las respuestas pendientes

**Enlace oficial:** [Crear etiquetas](https://support.google.com/mail/answer/118708) · [Crear reglas (filtros)](https://support.google.com/mail/answer/6579)

**Función concreta.** Gmail permite organizar el correo con etiquetas y filtros. Según la ayuda oficial, puedes crear hasta 5.000 etiquetas (solo tú las ves) y un filtro puede enviar los mensajes que coincidan a una etiqueta, archivarlos, borrarlos, destacarlos o reenviarlos.

**Entrada y salida.** Entran los correos que reciben consultas. Salen correos etiquetados y ordenados para saber qué responder.

**Función nativa o automatización.** Etiquetas y filtros son funciones nativas. Redactar respuestas con IA o conectar Gmail a otras herramientas requiere una integración que debes configurar; esta ficha no verificó ninguna.

**Plan, autorización o código.** Usa tu cuenta de Google. No requiere código.

**Caso práctico.** Las consultas por correo sobre la guía TOOLKIT llegan con la etiqueta «TOOLKIT-consultas» y destacadas, para responderlas en un bloque diario.

**Pasos de inicio**

1. Crea la etiqueta: junto a «Etiquetas» elige «Crear etiqueta nueva», escribe `TOOLKIT-consultas` y pulsa Crear.
2. Abre un correo de ejemplo, elige Más → «Filtrar mensajes como este» (o usa las opciones de búsqueda y «Crear filtro»).
3. Define el criterio (por ejemplo, que el asunto contenga «TOOLKIT») y elige la acción: aplicar la etiqueta y destacarlo.
4. Pulsa Crear filtro.

**Ejemplo listo para usar** (plantilla de respuesta para redactar tú)

```text
Hola [NOMBRE]: gracias por escribir. Sobre tu pregunta («[RESUMEN DE LA CONSULTA]»): [RESPUESTA EN DOS FRASES]. Si quieres revisar la guía, está aquí: URL_DEL_RECURSO. Un saludo.
```

**Resultado esperado.** Una etiqueta con todas las consultas pendientes, visible de un vistazo.

**Error habitual y cómo evitarlo.** Crear un filtro que archive o borre sin revisar lo que coincide. Usa «Buscar» para previsualizar los resultados antes de crear el filtro.

**Límites y verificación.** Un filtro de reenvío solo afecta a los mensajes nuevos. Según la ayuda, borrar un correo lo quita de todas las etiquetas.

## Tabla final: las 14 herramientas en orden

| # | Herramienta | Entrada | Salida | Paso del flujo |
|---|---|---|---|---|
| 1 | Slack | Enlace e idea en un mensaje | Mensaje guardado | Capturar |
| 2 | Hermes Agent | Mensaje con el enlace | Resumen y registro (si lo configuras) | Registrar |
| 3 | Notion | Ideas o CSV | Calendario con una fila por idea | Organizar |
| 4 | Perplexity | Pregunta de investigación | Respuesta con fuentes | Investigar |
| 5 | Grok | Hallazgos por contrastar | Verificación y huecos | Ampliar la investigación |
| 6 | Claude | Investigación y reglas de estilo | Carrusel, caption y boletín revisados | Redactar y revisar |
| 7 | Claude Code | Carpeta y encargo | Scripts y archivos del sistema | Construir sistemas |
| 8 | GPT Image 2 | Brief visual | Imagen fija | Crear imágenes |
| 9 | Higgsfield | Imagen y movimiento deseado | Clip corto | Dar movimiento |
| 10 | Gemini | Brief visual | Imagen para infografía | Crear imágenes (alternativa) |
| 11 | HyperFrames | Composición HTML y CSS | Video MP4 | Gráficos animados |
| 12 | Tella | Pantalla, cámara y voz | Video editado | Grabar |
| 13 | ManyChat | Comentario con la palabra | Mensaje directo con el enlace | Distribuir |
| 14 | Gmail | Correos de consultas | Etiquetas y respuestas pendientes | Atender consultas |

Alternativas: Perplexity o Grok (4 y 5), GPT Image 2 o Gemini (8 y 10), Higgsfield o HyperFrames (9 y 11).

## Plantilla de calendario de contenido

Importa el archivo `calendario-contenido.csv` en Notion (Ajustes → Importar → CSV). Las fechas van en formato MM/DD/YYYY, como indica la ayuda oficial de Notion. Los dos ejemplos son ficticios.

| Columna | Para qué sirve |
|---|---|
| Título | Nombre de la pieza |
| Estado | Idea, Investigación, Redacción, Diseño, Programado, Publicado |
| Fecha de publicación | Fecha en MM/DD/YYYY |
| Formato | Carrusel, Video, Boletín |
| Pilar | Tema editorial |
| Enlace fuente | URL de la idea original |
| Palabra clave | Palabra que se comentará (por ejemplo, TOOLKIT) |
| Herramienta de investigación | Perplexity, Grok u otra |
| Brief visual | Descripción de la imagen o gráfico |
| Texto o caption | Borrador del texto |
| Responsable | Quién la prepara |
| Notas | Observaciones |

## Prompts listos para copiar

Los campos entre corchetes son los que debes completar. El archivo `prompts-toolkit.md` contiene estos mismos prompts.

### Prompt de investigación

```text
Actúa como investigador. Tema: [TEMA]. Público: [PÚBLICO]. Enlace de partida: [URL].

Entrega:
1. Cinco hallazgos, cada uno con su fuente (enlace) y una frase sobre qué dice exactamente la fuente.
2. Lo que las fuentes no confirman o se contradice entre ellas.
3. Una lista de afirmaciones que yo debo verificar antes de publicar.
4. Dos preguntas que el público probablemente haría.

Reglas: no inventes datos, cifras ni enlaces. Si no puedes verificar algo, escribe «no confirmado». Responde en español neutro.
```

### Prompt de redacción

```text
Redacta tres piezas a partir de esta investigación verificada: [PEGAR INVESTIGACIÓN Y FUENTES].

Piezas: 1) carrusel de [NÚMERO] diapositivas con título y texto de cada una; 2) caption de máximo [NÚMERO] palabras con una llamada a la acción que pida comentar la palabra [PALABRA CLAVE]; 3) boletín de [NÚMERO] palabras.

Estilo: español neutro, tuteo, sin voseo; frases cortas; explica cada término técnico la primera vez que aparezca; evita anglicismos innecesarios y, si usas uno (por ejemplo «prompt» o «workflow»), explícalo; sin promesas de resultados; no inventes datos, nombres ni cifras. Cada dato debe tener su fuente al final.

Al terminar, evalúa tu propio borrador con la rúbrica de cinco criterios y dime la puntuación.
```

### Prompt de brief visual

```text
Escribe un brief visual para [TIPO DE PIEZA: portada, infografía, gráfico animado].

Contexto: [IDEA CENTRAL EN UNA FRASE]. Formato: [4:5, 9:16 o 16:9]. Paleta: [COLORES]. Estilo: [PLANO, ILUSTRADO, MINIMALISTA]. Espacio reservado para texto: [DÓNDE]. Elementos obligatorios: [LISTA]. Prohibido: texto largo dentro de la imagen, logotipos de marcas, personas reconocibles.

Entrega: 1) una descripción de la imagen en un párrafo, 2) una lista de elementos por capa, 3) el prompt final para la herramienta [GPT Image 2 / Gemini / Higgsfield], 4) tres comprobaciones para revisar el resultado.
```

## Rúbrica de cinco revisores (método propuesto)

Es un método propuesto, no un estándar: puede usarse con una sola IA haciendo cinco pasadas, con cinco conversaciones distintas o con una persona. Cada criterio vale 20 puntos; el total es 100. **Si el total es menor de 95, la pieza vuelve a revisión.**

| Revisor | Criterio | 20 puntos si… |
|---|---|---|
| 1. Precisión | Datos y fuentes | Cada dato tiene fuente abierta y verificada; no hay cifras sin respaldo. |
| 2. Claridad | Estructura | Una idea por diapositiva o párrafo; se entiende sin contexto previo. |
| 3. Utilidad | Aplicación | El lector puede ejecutar al menos un paso concreto tras leer. |
| 4. Voz y español | Lenguaje | Español neutro con tuteo, términos técnicos explicados y sin muletillas. |
| 5. Honestidad | Promesas y límites | Sin promesas de resultados; límites, costos y requisitos mencionados. |

**Prompt para aplicar la rúbrica**

```text
Evalúa este borrador: [PEGAR BORRADOR]. Actúa como cinco revisores independientes: Precisión, Claridad, Utilidad, Voz y español, Honestidad. Para cada uno: puntuación sobre 20, la razón en dos frases y los cambios concretos para llegar a 20. Suma el total sobre 100. Si el total es menor de 95, reescribe el borrador aplicando los cambios y vuelve a puntuar. No inventes datos.
```

## Primeros pasos y verificación de funcionamiento

Primeros pasos (45 minutos):

1. Importa `calendario-contenido.csv` en Notion y abre la vista de calendario.
2. Cambia las dos filas de ejemplo por una idea tuya real.
3. Investiga la idea con Perplexity o Grok usando el prompt de investigación; abre tres fuentes.
4. Redacta con Claude (o tu asistente) con el prompt de redacción y aplica la rúbrica.
5. Crea una imagen con GPT Image 2 o Gemini usando el prompt de brief visual.
6. Solo cuando tengas la guía alojada, configura ManyChat con `URL_DEL_RECURSO` y haz las pruebas.

Cómo comprobar que funciona:

- [ ] Tu calendario muestra cada fila en su fecha.
- [ ] Abriste las fuentes y los datos coinciden con lo que afirma el texto.
- [ ] La rúbrica da 95 o más; si no, hiciste una segunda versión.
- [ ] La imagen no tiene texto roto ni logotipos ajenos.
- [ ] Probaste ManyChat con una cuenta de prueba y llegó el enlace correcto.
- [ ] Ninguna herramienta publica, envía ni responde sin que tú lo apruebes.

## Datos de la consulta

Fecha de consulta: 17 de octubre de 2026. Páginas oficiales abiertas directamente: Hermes Agent (documentación, repositorio y guía de Slack), HyperFrames (repositorio y sitio), OpenAI (página del modelo gpt-image-2), Higgsfield (página principal), Slack (guardar mensajes y qué es Slack), Notion (bases de datos, vistas, importar CSV), Perplexity (qué es Perplexity y documentación de API), xAI (documentación de búsqueda web), Claude y Claude Code (páginas de producto y documentación), Tella (página principal), Google (ayuda de Gemini y de Gmail). No se pudieron abrir directamente: el centro de ayuda de ManyChat, la ayuda de ChatGPT Images y la página de grok.com con funciones detalladas; los datos sobre ellas proceden de resultados de búsqueda sobre las páginas oficiales y se señalan en cada ficha. Esta guía no es una prueba de funcionamiento de las herramientas.
