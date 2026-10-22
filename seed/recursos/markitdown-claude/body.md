La guía para configurar MarkItDown en Claude paso a paso, para personas sin experiencia técnica. Fecha de consulta: **21 de octubre de 2026**. Abajo puedes descargar el PDF completo, la guía editable y un documento de prueba con su conversión.

**Verificado** = ejecutado en Windows 10 con Python 3.13.5 y MarkItDown 0.1.9, con documentos inventados. **Documentado** = según la documentación oficial, sin probar (**macOS no se probó**).

**Markdown** es texto plano con marcas simples (`#` título, `*` lista, `|` tabla). **MarkItDown**, de Microsoft, convierte PDF, Word, PowerPoint, Excel, imágenes, audio, HTML, CSV/JSON/XML, ZIP, YouTube y EPub a Markdown, conservando títulos, listas, tablas y enlaces. Está pensado para análisis de texto: no es una copia fiel del original.

```text
Documento  →  MarkItDown (en tu equipo)  →  archivo .md  →  Claude
```

## Antes de empezar

- **Python 3.10 a 3.14** y un entorno virtual (carpeta aislada).
- Los comandos se escriben en la **terminal** (PowerShell en Windows, Terminal en Mac), **no en el chat de Claude**.
- **Claude Chat** solo trabaja con el documento ya convertido. **Claude Code** puede ejecutar comandos en tu equipo, con tu permiso (requiere suscripción de Claude o cuenta de la Consola; la app de escritorio lo incluye en la pestaña **Code**).

## Instalación

**1. Comprueba Python.** Windows: `python --version`; Mac: `python3 --version` → debe ser 3.10–3.14 (Verificado: 3.13.5). Si falta, [python.org/downloads](https://www.python.org/downloads/).

**2. Carpeta y entorno** (Windows / PowerShell):

```powershell
cd $HOME\Documents
mkdir MarkItDown, MarkItDown\originales, MarkItDown\salida
cd MarkItDown
python -m venv .venv
.venv\Scripts\Activate.ps1
```

Mac: `cd ~/Documents && mkdir -p MarkItDown/originales MarkItDown/salida && cd MarkItDown && python3 -m venv .venv && source .venv/bin/activate` (Documentado). Verás `(.venv)` al inicio de la línea.

**3. Instala:**

```bash
pip install "markitdown[all]"
markitdown --version
```

Debe mostrar `markitdown 0.1.9` o posterior. En Windows usa comillas dobles.

**4. Convierte:**

```bash
markitdown "originales/acta-de-ejemplo.docx" -o "salida/acta-de-ejemplo.md"
```

No muestra mensaje y crea el archivo. **Si el archivo de salida existe, lo sobrescribe sin avisar** (Verificado). Otra forma: `markitdown archivo.pdf > documento.md`.

La próxima vez: entra a la carpeta, activa el entorno y convierte; no hace falta reinstalar.

## Que Claude Code lo haga contigo

Abre Claude Code en la carpeta (`claude` en la terminal, o la pestaña **Code** → *Local* → *Open folder…*) y pega este prompt. **Hasta que lo envíes y apruebes, no se ha instalado nada.**

```text
Quiero instalar MarkItDown desde el repositorio oficial https://github.com/microsoft/markitdown.

Antes de hacer nada: comprueba mi sistema operativo y mi Python (debe estar entre 3.10 y 3.14), explícame los cambios y espera mi confirmación. Ejecuta un comando a la vez y dime qué hace.

Con mi confirmación: 1) crea un entorno virtual (.venv) en esta carpeta, sin permisos de administrador ni instalar nada fuera; 2) instala MarkItDown con sus dependencias; 3) convierte este documento de prueba: [RUTA] y guarda el resultado en salida/ como .md; 4) comprueba que conserva títulos, párrafos, listas y tablas y dime qué falta o se ve raro.

No borres ni sobrescribas mis originales ni archivos existentes (si el de salida ya existe, usa otro nombre). No envíes mis documentos a servicios externos.
Al terminar: qué instalaste, dónde quedó el archivo y el comando para repetirlo.
```

## Usa el resultado en Claude

- **Chat:** el centro de ayuda lista PDF, DOCX, CSV, TXT, HTML, ODT, RTF, EPUB, JSON y XLSX (hasta 500 MB y 20 archivos por chat) y **no menciona `.md`**. Opciones seguras: **pegar el texto** o **adjuntar una copia `.txt`**. *Pendiente:* si tu cuenta admite `.md` directo.
- **Claude Code:** escribe `@salida/archivo.md` para incluirlo.

```text
Resume este documento en 5–8 puntos. Tras cada punto indica entre paréntesis la sección de la que sale (título exacto). Usa solo lo que dice el documento. Si algo parece incompleto (p. ej. una tabla rota), dilo en «Dudas».
[PEGAR O ADJUNTAR]
```

```text
Extrae las tareas en una tabla: Tarea | Responsable | Fecha límite | Sección. Si falta responsable o fecha, escribe «No indicado»: no deduzcas ni inventes. Copia las fechas tal cual. Después lista las tareas ambiguas y por qué.
[PEGAR O ADJUNTAR]
```

```text
Compara el DOCUMENTO A y el DOCUMENTO B: tabla Tema | Qué dice A | Qué dice B; lo que solo está en cada uno; lo que coincide; contradicciones. Cita la sección de cada uno y no inventes. Si algo no se puede comparar, indícalo.
[A] … [B] …
```

## Revisa la conversión

- [ ] **Títulos** con `#` (en la prueba, el título de Word con estilo «Título» salió sin `#`).
- [ ] **Párrafos** sin partir (en un PDF de prueba, cada línea salió como párrafo).
- [ ] **Tablas** con columnas y encabezados correctos (en la prueba, la fila de encabezado salió vacía).
- [ ] **Enlaces, cifras y fechas** completos; sin omisiones.

**Consulta también el original** si hay gráficos o imágenes, tablas complejas o documentos importantes. Un **PDF escaneado** dio un archivo **vacío y sin error** (Verificado).

## Tokens: qué esperar

Depende del documento y del método. **No hay ahorro fijo garantizado.** Dato oficial de Anthropic para PDF **por API**: típicamente **1.500–3.000 tokens de texto por página**, según la densidad, más el costo de imagen porque cada página también se convierte en imagen. No es una medición de MarkItDown. Para saber tu caso, compara el mismo documento en original y en Markdown en tu cuenta.

## Soluciones rápidas

- **«markitdown» no se reconoce / `command not found`:** el entorno no está activado. Actívalo o llama por ruta: `.venv\Scripts\markitdown.exe archivo.docx -o salida\archivo.md` (Verificado). Si PowerShell bloquea `Activate.ps1`, usa esa alternativa.
- **`MissingDependencyException`:** instalaste solo `markitdown`. Usa `pip install "markitdown[all]"` o grupos, p. ej. `"markitdown[pdf,docx,pptx]"` (Verificado).
- **Rutas con espacios:** entre comillas dobles; sin ellas falla con «unrecognized arguments» (Verificado).
- **`FileNotFoundError`:** revisa nombre, extensión y carpeta.
- **Salida vacía:** probablemente un PDF escaneado. Hay servicios opcionales (OCR `markitdown-ocr`, Azure Document Intelligence/Content Understanding) que requieren credenciales y pueden costar: Documentado, no probado. La conversión de esta guía es **local**, sin claves.
- **Seguridad:** MarkItDown usa tus permisos de archivos y red; no conviertas archivos que no conozcas.

## Checklist final

- [ ] Python 3.10–3.14 · [ ] carpeta, entorno activado y `pip install "markitdown[all]"` · [ ] `markitdown --version` · [ ] primer `.md` en `salida` · [ ] revisado contra el original · [ ] usado en Claude con un prompt.

**Fuentes:** [MarkItDown](https://github.com/microsoft/markitdown) · [Claude Code](https://code.claude.com/docs/en/quickstart) · [Claude Code en escritorio](https://code.claude.com/docs/en/desktop-quickstart) · [Subir archivos a Claude](https://support.claude.com/en/articles/8241126-uploading-files-to-claude) · [PDF y tokens](https://platform.claude.com/docs/en/build-with-claude/pdf-support).
