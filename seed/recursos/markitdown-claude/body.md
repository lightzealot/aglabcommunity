La guía para configurar MarkItDown en Claude paso a paso, hecha para personas sin experiencia técnica. Fecha de consulta de las fuentes: **21 de octubre de 2026**. Abajo puedes descargar el PDF, el archivo editable y el documento de prueba con su conversión.

## Cómo usar esta guía

Vas a hacer tres cosas: **instalar MarkItDown**, **convertir un documento a Markdown** y **trabajar con el resultado en Claude**. Si sigues los pasos en orden, tardas entre 20 y 30 minutos.

Esta guía distingue siempre dos cosas:

- **Verificado:** comprobado ejecutando el comando en un equipo con Windows 10, Python 3.13.5 y MarkItDown 0.1.9, con documentos de prueba inventados.
- **Documentado:** descrito en la documentación oficial, pero no probado aquí. Por ejemplo, **no se probó en macOS**: los pasos para Mac vienen de la documentación oficial.

Verás las etiquetas **[Verificado]** y **[Documentado]** donde importa. Todos los documentos de ejemplo son ficticios y no contienen datos personales.

## 1. Qué es MarkItDown y para qué sirve

**Markdown** es una forma de escribir texto con marcas muy simples: `#` para un título, `*` para una lista, `|` para una tabla. Es texto plano: cualquier programa lo abre y una IA lo lee con facilidad.

**MarkItDown** es una herramienta de código abierto de Microsoft que convierte archivos a Markdown. Según su documentación oficial, está pensada para preparar contenido para modelos de lenguaje y herramientas de análisis de texto, y busca conservar la estructura: títulos, listas, tablas y enlaces.

Formatos que admite (según su documentación): PDF, PowerPoint, Word, Excel, imágenes (con datos EXIF y OCR), audio (con transcripción), HTML, formatos de texto (CSV, JSON, XML), archivos ZIP, direcciones de YouTube y EPub.

Para qué te sirve con Claude:

- Pasas un documento largo a texto limpio y ordenado.
- Puedes revisar el resultado antes de usarlo.
- Dejas listo el texto para resumirlo, extraer tareas o compararlo.

**Importante:** la propia documentación aclara que la salida está pensada para herramientas de análisis de texto y puede no servir para una conversión de alta fidelidad destinada a leerse como el original. No es un sustituto del documento original.

## 2. Qué necesitas antes de empezar

**Requisitos (según la documentación oficial)**

- **Python 3.10 hasta 3.14.** Python es el lenguaje con el que funciona MarkItDown.
- Se recomienda un **entorno virtual**: una carpeta aislada donde se instala la herramienta sin tocar el resto de tu equipo.
- Windows o macOS. Esta guía probó solo Windows.

**Qué necesitas de Claude**

- Para **usar el resultado** (apartado 5) basta Claude en el navegador o en la aplicación de escritorio, en la sección de chat.
- Para que **Claude Code te ayude a instalar** (apartado 4) necesitas Claude Code. Según su documentación, requiere una suscripción de Claude (Pro, Max, Team o Enterprise) o una cuenta de la Consola de Claude. La aplicación de escritorio incluye Claude Code en su pestaña **Code**, y no necesitas instalar la línea de comandos por separado.

**Claude Chat y Claude Code no son lo mismo**

| | Claude Chat | Claude Code |
|---|---|---|
| Qué es | Conversación con Claude | Agente que trabaja con archivos y comandos de tu equipo |
| ¿Ejecuta comandos en tu equipo? | No | Sí, con tu permiso |
| Dónde se usa | Navegador, app de escritorio (sección de chat), móvil | Terminal, pestaña **Code** de la app de escritorio, editores |
| Para qué lo usamos aquí | Trabajar con el documento ya convertido | Instalar y convertir con ayuda |

**Dónde se ejecutan los comandos y dónde se guardan los archivos**

- Los comandos de esta guía se escriben en la **terminal**: una ventana de texto donde das órdenes al equipo. En Windows busca «PowerShell» en el menú Inicio; en Mac, abre «Terminal». **No se escriben en el chat de Claude.**
- Todo se guarda en una carpeta de tu equipo. En esta guía usaremos una carpeta llamada `MarkItDown` dentro de Documentos, con esta estructura:

```text
MarkItDown/
├── .venv/                 (la herramienta instalada; no la toques)
├── originales/            (tus documentos; no se modifican)
└── salida/                (aquí quedan los archivos .md)
```

## 3. Instalación paso a paso

### Paso 1. Comprueba si tienes Python

En la terminal escribe:

- **Windows:** `python --version`
- **macOS:** `python3 --version`

**Resultado esperado:** algo como `Python 3.13.5`. Debe estar entre 3.10 y 3.14. **[Verificado]** en Windows con Python 3.13.5.

Si el comando no existe o la versión es menor que 3.10, instala Python desde [python.org/downloads](https://www.python.org/downloads/) y vuelve a abrir la terminal. **[Documentado]**: esta guía no probó la instalación de Python.

### Paso 2. Crea la carpeta de trabajo y el entorno aislado

**Windows (PowerShell):**

```powershell
cd $HOME\Documents
mkdir MarkItDown
cd MarkItDown
mkdir originales
mkdir salida
python -m venv .venv
```

**macOS (Terminal):**

```bash
cd ~/Documents
mkdir MarkItDown
cd MarkItDown
mkdir originales salida
python3 -m venv .venv
```

La documentación oficial de MarkItDown propone `python -m venv .venv` seguido de la activación. **[Verificado]** en Windows que el comando crea el entorno.

### Paso 3. Activa el entorno

- **Windows (PowerShell):** `.venv\Scripts\Activate.ps1` **[Verificado]**
- **macOS:** `source .venv/bin/activate` **[Documentado]**

**Resultado esperado:** al inicio de la línea de la terminal aparece `(.venv)`.

Si en Windows aparece un error de «ejecución de scripts deshabilitada», no sigas con la activación: usa la alternativa del apartado 8 (llamar a la herramienta por su ruta). **[Documentado en general por Windows; no ocurrió en la prueba.]**

### Paso 4. Instala MarkItDown

Con el entorno activado:

```bash
pip install "markitdown[all]"
```

Esta es la instalación completa que indica la documentación oficial. En el README aparece con comillas simples; en Windows usa comillas dobles, como arriba. **[Verificado]** en Windows (terminó sin errores). Puede tardar unos minutos.

### Paso 5. Comprueba la instalación

```bash
markitdown --version
```

**Resultado esperado:** `markitdown 0.1.9` (o una versión posterior). **[Verificado]**

### Paso 6. Convierte tu primer documento

1. Copia un documento a la carpeta `originales`. Para practicar, usa el documento de prueba que acompaña esta guía (`acta-de-ejemplo.docx`).
2. Desde la carpeta `MarkItDown`, ejecuta:

```bash
markitdown "originales/acta-de-ejemplo.docx" -o "salida/acta-de-ejemplo.md"
```

**Resultado esperado:** no aparece ningún mensaje y se crea el archivo `salida/acta-de-ejemplo.md`. **[Verificado]**

Otras formas documentadas de guardar el resultado: `markitdown archivo.pdf > documento.md` (redirección; **[Verificado]**) o simplemente `markitdown archivo.pdf` para verlo en pantalla.

**Cuidado:** si el archivo de salida ya existe, MarkItDown **lo sobrescribe sin avisar**. **[Verificado]** Usa un nombre distinto cada vez o guarda una copia antes.

### Paso 7. Abre el resultado

Abre `salida/acta-de-ejemplo.md` con el Bloc de notas, TextEdit o cualquier editor. Verás títulos con `#`, listas con `*` y una tabla con `|`. En la prueba, el contenido principal se conservó y hubo dos detalles para revisar (los verás en el apartado 6).

### Cada vez que vuelvas a usarlo

Abre la terminal, entra en la carpeta (`cd $HOME\Documents\MarkItDown` en Windows, `cd ~/Documents/MarkItDown` en Mac), activa el entorno (Paso 3) y convierte (Paso 6). No hace falta volver a instalar.

## 4. Haz que Claude Code te ayude

Si prefieres que Claude Code haga la instalación y la conversión mientras tú apruebas cada paso, abre Claude Code en tu carpeta de trabajo y pega este prompt.

**Cómo abrir Claude Code en tu carpeta**

- **Terminal:** entra en la carpeta (`cd` + ruta) y escribe `claude`. La primera vez te pedirá iniciar sesión. Si aún no lo tienes, la documentación oficial indica cómo instalarlo (enlace al final).
- **Aplicación de escritorio:** abre la pestaña **Code**, elige el entorno **Local**, pulsa «Open folder…» y selecciona tu carpeta `MarkItDown`.

**Prompt listo para copiar**

```text
Quiero instalar MarkItDown desde el repositorio oficial https://github.com/microsoft/markitdown.

Antes de hacer nada:
1. Comprueba mi sistema operativo, mi versión de Python (debe estar entre 3.10 y 3.14) y qué comandos necesitas ejecutar.
2. Explícame los cambios que vas a hacer y espera mi confirmación. Ejecuta solo un comando a la vez y dime qué hace cada uno.

Después, con mi confirmación:
3. Crea un entorno virtual aislado en esta carpeta (.venv). No instales nada fuera de él ni uses permisos de administrador.
4. Instala MarkItDown con sus dependencias en ese entorno.
5. Convierte este documento de prueba: [RUTA DEL DOCUMENTO] y guarda el resultado en la carpeta salida/ con la extensión .md.
6. Comprueba que el resultado conserva el contenido textual principal (títulos, párrafos, listas y tablas) y dime qué cosas faltan o se ven raras.

Reglas: no borres ni sobrescribas mis archivos originales ni ningún archivo existente (si un archivo de salida ya existe, usa otro nombre). No envíes mis documentos a ningún servicio externo. Si algo falla, explica el error con palabras sencillas antes de reintentar.

Al terminar, dime: qué instalaste, dónde quedó el archivo convertido y el comando exacto para repetir la conversión.
```

**Qué cambié respecto a una versión básica:** añadí la confirmación antes de cada comando, un solo comando a la vez, la regla de no usar permisos de administrador ni servicios externos y la comprobación de Python.

**Importante:** este prompt es una instrucción. Hasta que lo envíes y apruebes cada paso, **no se ha instalado nada**. Claude Code pide tu permiso antes de ejecutar comandos (según su documentación, el modo **Manual** pide aprobación antes de editar archivos o ejecutar comandos): lee cada propuesta antes de aceptarla.

## 5. Usa el resultado en Claude

### Cómo adjuntar o usar el archivo Markdown

**En Claude Chat (navegador o aplicación de escritorio).** Según el centro de ayuda de Claude, el chat admite archivos PDF, DOCX, CSV, TXT, HTML, ODT, RTF, EPUB, JSON y XLSX (hasta 500 MB por archivo y 20 archivos por chat; los PDF, hasta 1.000 páginas). **El artículo consultado no menciona `.md` en esa lista.** Por eso, tienes dos opciones seguras:

1. **Pegar el texto:** abre el `.md` en tu editor, copia todo y pégalo en el mensaje.
2. **Adjuntar una copia en `.txt`:** guarda una copia del archivo con extensión `.txt` (el formato TXT sí figura como compatible) y adjúntala con el botón «+» o arrastrándola a la ventana del chat.

**Pendiente de verificar:** si tu cuenta admite adjuntar `.md` directamente. Pruébalo con el archivo de ejemplo; si el chat lo rechaza, usa una de las dos opciones anteriores.

**En Claude Code.** Trabaja con los archivos de tu carpeta. Escribe `@` seguido del nombre del archivo (por ejemplo, `@salida/acta-de-ejemplo.md`) para incluirlo en la conversación; la documentación de la aplicación de escritorio lo describe así. **[Documentado]**

### Prompt 1: resumir con referencias a las secciones

```text
Te paso un documento en Markdown. Resúmelo en 5 a 8 puntos para una persona que no lo ha leído.

Reglas:
- Después de cada punto, indica entre paréntesis la sección del documento de la que sale (usa el título exacto de la sección).
- Usa solo lo que dice el documento. No añadas información externa ni datos que no aparezcan.
- Si una parte del documento no se entiende o parece incompleta (por ejemplo, una tabla rota), dímelo en una sección final llamada «Dudas».

Documento:
[PEGAR EL TEXTO AQUÍ O ADJUNTAR EL ARCHIVO]
```

### Prompt 2: extraer tareas, responsables y fechas sin inventar datos

```text
Del siguiente documento extrae todas las tareas en una tabla con estas columnas: Tarea | Responsable | Fecha límite | Sección donde aparece.

Reglas:
- Usa solo lo que está escrito. Si falta el responsable o la fecha, escribe «No indicado». No deduzcas ni inventes nombres ni fechas.
- Copia las fechas tal como aparecen.
- Después de la tabla, lista las tareas ambiguas y explica por qué.

Documento:
[PEGAR EL TEXTO AQUÍ O ADJUNTAR EL ARCHIVO]
```

### Prompt 3: comparar dos documentos

```text
Compara estos dos documentos: el DOCUMENTO A y el DOCUMENTO B.

Entrégame:
1. Una tabla con las diferencias: Tema | Qué dice A | Qué dice B.
2. Lo que aparece solo en A y lo que aparece solo en B.
3. Lo que coincide.
4. Cualquier contradicción que veas entre ambos.

Reglas: cita la sección de cada documento. No inventes información. Si algo no se puede comparar porque falta en uno de los documentos, indícalo.

DOCUMENTO A:
[PEGAR TEXTO O ADJUNTAR]

DOCUMENTO B:
[PEGAR TEXTO O ADJUNTAR]
```

## 6. Comprueba que la conversión quedó bien

Antes de trabajar con el resultado, revísalo. Abre el `.md` junto al original y marca:

- [ ] **Títulos:** los títulos principales y los apartados están marcados con `#`. (En la prueba, el título principal de Word, con estilo «Título», salió como una línea normal sin `#`.)
- [ ] **Párrafos:** el texto no está partido en medio de las frases. (En la prueba con un PDF, cada línea del PDF salió como un párrafo separado.)
- [ ] **Listas:** los puntos de las listas están todos.
- [ ] **Tablas:** tienen el número correcto de columnas y filas, y los encabezados están en su sitio. (En la prueba, la tabla de Word salió con una fila de encabezado vacía y los títulos de columna como primera fila de datos.)
- [ ] **Enlaces:** las direcciones web siguen ahí y están completas.
- [ ] **Cifras y fechas:** coinciden con el original.
- [ ] **Omisiones:** no falta ninguna página, sección o nota al pie.

**Cuándo consultar también el archivo original**

- Si el documento tiene **gráficos, imágenes o diagramas**: el resultado contiene el texto, no lo que muestran las imágenes.
- Si es un **PDF escaneado** (una foto o escaneo de una página): en la prueba, un PDF escaneado produjo un archivo **vacío, sin ningún aviso de error**. **[Verificado]**
- Si hay **tablas complejas, columnas múltiples o fórmulas**: compáralas con el original.
- Si el documento es importante (legal, financiero, médico): usa el original como fuente final.

## 7. Tokens: qué puedes esperar

Un **token** es la unidad en que un modelo cuenta el texto; cuanto más texto, más tokens, y el uso de Claude depende de ellos.

**Qué se puede decir con honestidad**

- **El resultado depende del documento y del método de procesamiento.** Un PDF con mucho texto, uno con muchas imágenes y uno escaneado se comportan de forma muy distinta. Convertir a Markdown no garantiza un ahorro fijo de tokens, y esta guía no promete ninguna cifra de reducción.
- **Dato oficial sobre PDF en la API de Claude.** La documentación de Anthropic sobre el procesamiento de PDF indica que, al enviar un PDF mediante su API, cada página usa **típicamente entre 1.500 y 3.000 tokens de texto, según la densidad del contenido**, y que, como cada página también se convierte en imagen, se aplican además los costos de imagen. Es una estimación para ese método (PDF por API), no una medición de MarkItDown ni de otros métodos.
- **El procesamiento visual puede añadir consumo.** Si envías el PDF original y Claude analiza también las páginas como imágenes, el consumo puede ser mayor que el del texto solo.
- **Cómo saber tu número real.** La documentación de Anthropic ofrece un contador de tokens para estimar el costo de documentos concretos en la API. En el uso normal de Claude, el consumo se refleja en los límites de tu plan.

**Qué hacer:** si quieres comparar, mide tu propio caso: usa el mismo documento en formato original y en Markdown y compara cuánto consume cada uno en tu cuenta. Anota los dos resultados; son los únicos números que valen para ti.

## 8. Soluciones rápidas

**«markitdown» no se reconoce o «command not found»**

- Significa que el entorno no está activado. En PowerShell el mensaje es «El término 'markitdown' no se reconoce…»; en macOS y Linux, `command not found`. **[Verificado]**
- Solución: activa el entorno (Paso 3) y repite.
- Alternativa que no necesita activar: llama a la herramienta por su ruta. En Windows: `.venv\Scripts\markitdown.exe archivo.docx -o salida\archivo.md`. **[Verificado]** También funciona `python -m markitdown --version`. **[Verificado]**

**Error de ejecución de scripts al activar (Windows)**

- Si PowerShell rechaza `Activate.ps1`, usa la alternativa de arriba (llamar a `markitdown.exe` por su ruta). **[Documentado en general; no ocurrió en la prueba.]**

**Dependencias faltantes (`MissingDependencyException`)**

- Si instalaste solo `pip install markitdown`, al convertir un Word aparece: «DocxConverter … the dependencies needed to read .docx files have not been installed» y te sugiere instalar `markitdown[docx]` o `markitdown[all]`. **[Verificado]**
- Solución: `pip install "markitdown[all]"`, o solo los grupos que necesites, por ejemplo `pip install "markitdown[pdf,docx,pptx]"` (la documentación lista también `[xlsx]`, `[xls]`, `[outlook]`, `[audio-transcription]` y `[youtube-transcription]`).

**Rutas con espacios**

- Si la carpeta o el archivo tiene espacios, pon la ruta **entre comillas dobles**. Sin comillas, el comando falla con «unrecognized arguments». **[Verificado]**
- Ejemplo: `markitdown "Documentos de prueba/acta-de-ejemplo.docx" -o "salida/acta-de-ejemplo.md"`.

**`FileNotFoundError` (no encuentra el archivo)**

- Revisa el nombre, la extensión y que estés en la carpeta correcta (`dir` en Windows, `ls` en Mac). **[Verificado]**: con un nombre inexistente MarkItDown muestra `No such file or directory`.

**La conversión sale vacía o incompleta**

- Un PDF **escaneado** (sin texto seleccionable) puede dar un archivo vacío y sin error. **[Verificado]** Comprueba abriendo el PDF y tratando de seleccionar texto: si no puedes, es una imagen.
- Para esos casos la documentación describe **servicios opcionales**: la extensión de OCR `markitdown-ocr` (usa visión de un modelo de lenguaje sobre imágenes incrustadas y necesita un cliente de modelo configurado; sin él, el OCR se omite) y Azure Document Intelligence o Azure Content Understanding (cada conversión enviada a Azure es una llamada de pago). **[Documentado; no probado.]**

**Conversión local frente a servicios opcionales**

- La conversión de esta guía (`markitdown archivo -o salida.md`) **se hace en tu equipo**, sin credenciales ni costo de MarkItDown. **[Verificado]** en el sentido de que no pidió ninguna clave.
- Los servicios de la lista anterior son **opcionales**: requieren credenciales y pueden tener costo. No los uses con documentos confidenciales sin saber qué hacen con ellos.

**Seguridad.** Según la documentación, MarkItDown se ejecuta con los permisos de tu usuario sobre archivos y red. No conviertas archivos que no conozcas ni que no confíes.

## 9. Checklist final

- [ ] Tengo Python entre 3.10 y 3.14 (`python --version`).
- [ ] Creé la carpeta `MarkItDown` con `originales` y `salida`.
- [ ] Creé y activé el entorno (`(.venv)` aparece en la terminal).
- [ ] Instalé con `pip install "markitdown[all]"`.
- [ ] `markitdown --version` muestra una versión.
- [ ] Convertí mi primer documento y existe un archivo `.md` en `salida`.
- [ ] Lo abrí y revisé títulos, tablas, enlaces y omisiones.
- [ ] Guardé mis originales sin cambios.
- [ ] Usé el resultado en Claude (pegado, copia `.txt` o `@` en Claude Code) con uno de los tres prompts.
- [ ] Si el documento tenía imágenes o era escaneado, consulté también el original.

## Documento de prueba para descargar

Abajo encontrarás `acta-de-ejemplo.docx` (un acta de reunión ficticia con título, lista y tabla) y su conversión `acta-de-ejemplo.md`, hecha con MarkItDown 0.1.9 en Windows. Todo el contenido es inventado. En las pruebas de la guía también se usó un PDF de texto y un PDF escaneado (que se convierte en un archivo vacío) que no se incluyen en esta descarga.

## Fuentes de consulta

Fecha de consulta: **21 de octubre de 2026**.

- MarkItDown (repositorio oficial): [github.com/microsoft/markitdown](https://github.com/microsoft/markitdown)
- Claude Code, primeros pasos: [code.claude.com/docs/en/quickstart](https://code.claude.com/docs/en/quickstart)
- Claude Code en la aplicación de escritorio: [code.claude.com/docs/en/desktop-quickstart](https://code.claude.com/docs/en/desktop-quickstart)
- Centro de ayuda de Claude, subir archivos: [support.claude.com: Uploading files to Claude](https://support.claude.com/en/articles/8241126-uploading-files-to-claude)
- Anthropic, soporte de PDF y estimación de tokens: [platform.claude.com: PDF support](https://platform.claude.com/docs/en/build-with-claude/pdf-support)
- Python: [python.org/downloads](https://www.python.org/downloads/)

### Qué quedó pendiente de verificar

- Los pasos en **macOS** (no se probó).
- La instalación de Python y el error de scripts de PowerShell en equipos con la política de ejecución restringida.
- Si Claude Chat admite adjuntar archivos `.md` directamente en tu cuenta.
- Los servicios opcionales (extensión de OCR y servicios de Azure): solo están documentados, no se probaron.
- Que Claude Code ejecute el prompt del apartado 4 tal como está escrito: no se ejecutó.
