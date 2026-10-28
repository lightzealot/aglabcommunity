# HARVEY: configura tu agente y revisa los primeros correos

Guía práctica + Brief + prompts. Por Andrés Gómez, @andresgomez.ia.

Esta guía te lleva de cero a tener Harvey configurado para tu negocio y a revisar tus primeros borradores de correo **antes de que salga ninguno**. No necesitas saber programar, pero sí seguir los pasos con calma y leer cada borrador.

**Qué se comprobó y qué no.** Leí el repositorio oficial el **28 de octubre de 2026**: `README.md`, `CLAUDE.md`, `pyproject.toml`, `harvey.yaml`, `.env.example`, `CHANGELOG.md` y el código de los comandos (`harvey/cli.py`). La versión indicada en `pyproject.toml` es **0.3.0**. La última publicación (release) es **v0.3.0**, del 13 de octubre de 2026, y el commit más reciente que leí es **4237f07**, del 27 de octubre de 2026 (la rama principal avanzó después de la release; si usas otra versión, manda la documentación de tu copia). **No instalé Harvey, no ejecuté ningún comando, no conecté cuentas y no envié mensajes.** Todos los comandos salen de la documentación y del código del repositorio; los pasos específicos de Windows no vienen en el README y son los equivalentes habituales de Python: están marcados como no verificados.

**No lo confundas.** Esta guía trata del proyecto **ethanplusai/harvey** ("Autonomous AI sales agent", licencia MIT). Existen otros productos llamados Harvey (por ejemplo, asistentes de IA para despachos jurídicos) que no tienen relación.

## 1. Qué hace Harvey y qué no garantiza

**Qué hace.** Según su README, Harvey busca empresas que encajan con tu cliente ideal, lee su sitio web para aprender algo concreto de cada una, redacta correos que usan ese dato, los envía, lee las respuestas y trabaja la conversación hacia una reunión. Corre en tu computador, en un ciclo, cada 15 minutos por defecto.

**Cómo funciona en cinco piezas:**

| Pieza | Qué hace |
|---|---|
| **Scout** | Califica y personaliza lo que encontraron los recolectores |
| **Writer** | Redacta secuencias de 3 correos (el primero y el segundo de menos de 75 palabras, el tercero de menos de 40) |
| **Sender** | Prepara cada correo en una bandeja de salida (Outbox) y lo envía solo cuando está aprobado |
| **Handler** | Lee respuestas, clasifica la intención y prepara una respuesta |
| **Analyst** | Genera estadísticas del embudo cuando no hay otra tarea |

**Lo que Harvey no garantiza.** Esto lo digo yo, no el repositorio:

- **No garantiza respuestas, reuniones ni ventas.** Su documentación no promete resultados, y esta guía tampoco.
- **No garantiza que el correo llegue a la bandeja de entrada.** Depende de tu dominio, de que lo hayas calentado y de la calidad de las direcciones.
- **No garantiza que un dato sea correcto.** Lee páginas web públicas con reglas automáticas: puede equivocarse al identificar a la persona, el cargo o lo que hace la empresa. Por eso existe la revisión manual.
- **No sustituye tu criterio ni asesoría legal.** El propio README dice que nada de lo que incluye es asesoría legal.
- **No está probado en tu negocio.** Todo lo que verás en las capturas del repositorio es demo.

**Sobre las capturas del repositorio.** Las imágenes y el GIF del panel que aparecen en el README son **demos con datos ficticios**: el README lo indica ("Bookwell" vendiendo reservas en línea, con dominios `.test`). No muestran clientes ni resultados reales, y esta guía no los usa como prueba de nada.

## 2. Requisitos, suscripción y costes

**Requisitos que dice el README**

1. **Python 3.11 o superior.**
2. **Una suscripción de Claude Pro o Max**, con la CLI de Claude Code iniciada (`claude login`). Harvey también admite, como opción adicional, un plan de ChatGPT con la herramienta Codex; en esta guía uso solo Claude. Codex no se admite en Windows.
3. **Un buzón de correo desde el que enviar.** Recomiendan Gmail o Google Workspace, en un **dominio secundario dedicado** (nunca el principal). También sirven Microsoft 365 y cualquier cuenta SMTP+IMAP.
4. **Un servicio de calentamiento** de ese buzón. Recomiendan TrulyInbox; no es obligatorio usar ese.
5. **Un verificador de correos**, recomendado: sin él, las direcciones quedan marcadas como `guess` (suposición) y Harvey **nunca les envía**.

**Costes posibles.** Esta tabla separa lo que cuesta de lo que no. Los precios salen del README y de `.env.example` y pueden cambiar: confírmalos en cada sitio.

| Concepto | Qué dice el repositorio |
|---|---|
| Modelo (redactar, leer respuestas) | Usa tu suscripción de Claude. No hay factura por token, pero tiene los límites de uso de tu plan |
| Buzón | Unos 7 USD al mes por un Google Workspace, según el README |
| Calentamiento | TrulyInbox: conectar Harvey requiere acceso por API, que empieza en el plan Starter (22 USD al mes facturado anualmente, según `CLAUDE.md`) |
| Verificador de correos | Reoon, ZeroBounce y Hunter ofrecen cupos gratuitos mensuales según `.env.example`; pasados esos cupos, pueden cobrar |
| Buscar empresas | La fuente por defecto (OpenStreetMap) es gratuita. Otras fuentes cobran por búsqueda y Harvey muestra una estimación antes de gastar |
| Dominio dedicado | Lo pagas tú al registrarlo |

**Importante:** no uses la expresión "todo gratis". Hay costes externos, y aunque el modelo use tu suscripción, esa suscripción tiene un precio y límites. El README recomienda revisar los términos y límites de uso de tu plan antes de dejar un agente trabajando solo.

## 3. Claude Code y el chat de Claude

| | Chat de Claude (claude.ai o la app) | Claude Code |
|---|---|---|
| Dónde corre | En el navegador o la aplicación | En una terminal, dentro de una carpeta de tu computador |
| Qué puede hacer | Conversar y revisar lo que le pegues o adjuntes | Leer archivos de esa carpeta, editarlos y ejecutar comandos (con tu aprobación) |
| Para esta guía | Sirve para pedir ayuda a redactar tu brief | Es la herramienta que abre el repositorio de Harvey |

**Harvey además usa tu sesión de Claude Code por dentro.** Cuando Harvey trabaja, llama a la CLI de Claude sin herramientas, sin tus archivos de configuración y en una carpeta temporal vacía, según el README. Es independiente de la sesión de Claude Code que tú abras para configurarlo.

**Instalar Claude Code.** Si no lo tienes, el comando oficial en Windows (PowerShell) es `irm https://claude.ai/install.ps1 | iex` y en macOS, Linux y WSL es `curl -fsSL https://claude.ai/install.sh | bash`. Comprueba con:

```bash
claude --version
```

La primera vez que escribas `claude`, inicia sesión desde el navegador.

## 4. Qué comandos solo consultan y cuáles pueden activar envíos

Antes de ejecutar nada, aprende esta tabla. **Cada comando de esta guía está marcado con una de tres etiquetas.**

| Etiqueta | Qué significa | Comandos |
|---|---|---|
| **CONSULTA** | Solo muestra información. No envía nada | `harvey status`, `harvey signals` (sin opciones), `harvey discover --providers`, `harvey discover --estimate`, `harvey outbox` (sin opciones), `harvey sending status`, `harvey warmup`, `harvey usage`, `harvey dashboard --url` |
| **CONFIGURACIÓN** | Cambia archivos, instala o conecta algo, pero no envía correos | `pip install -e .`, `harvey setup`, `harvey train`, `harvey signals --confirm ...`, `harvey gmail auth`, `harvey trulyinbox connect`, editar `.env` y `harvey.local.yaml`, `harvey discover` (puede gastar si eliges una fuente de pago) |
| **PUEDE ACTIVAR ENVÍOS** | Pone a Harvey a trabajar o autoriza salidas | `harvey run`, el botón **Start** del panel, `harvey outbox --approve`, `harvey outbox --approve-all`, aprobar con la tecla A en el panel, `harvey sending resume`, cambiar `require_approval` a `false` (piloto automático) |

**Mantén siempre activada la aprobación manual:**

```text
channels.email.require_approval: true
```

Con esa línea en `true`, el README dice que **todo correo saliente espera tu aprobación**: primeros correos, seguimientos y respuestas. Harvey incluye además un filtro automático antes de cada envío (sin modelo de IA) que rechaza etiquetas sin rellenar, frases prohibidas, correos demasiado largos, demasiados enlaces y direcciones no entregables.

**Dos avisos:**

1. `harvey run` **no envía sin aprobación** con esa línea en `true`, pero sí hace trabajo: usa tu suscripción de Claude, visita los sitios web de las empresas, lee tu buzón para ver respuestas y envía lo que ya hayas aprobado. Úsalo solo cuando hayas revisado la configuración.
2. `harvey outbox --approve-all` aprueba **todos** los pendientes de una vez. El README dice que la bandeja del panel se diseñó para evitar ese reflejo. **No lo uses en tus primeros lotes.**

## 5. Descargar el repositorio y abrirlo en Claude Code

Necesitas **Git** (para descargar) o puedes bajar un archivo ZIP desde la página de GitHub (botón Code > Download ZIP; no lo verifiqué, es la función estándar de GitHub). Los comandos siguientes son de **CONSULTA y CONFIGURACIÓN**.

**Windows (PowerShell)**

```powershell
python --version
git clone https://github.com/ethanplusai/harvey.git
cd harvey
claude
```

**macOS y Linux (Terminal)**

```bash
python3 --version
git clone https://github.com/ethanplusai/harvey.git
cd harvey
claude
```

- `python --version` debe mostrar 3.11 o superior. En macOS, el `python3` del sistema suele ser 3.9: el README indica que debes instalar una versión más nueva (por ejemplo `brew install python@3.13`).
- `claude` abre Claude Code **dentro de la carpeta `harvey`**. Esa carpeta es tu proyecto.

**El repositorio incluye un `CLAUDE.md` que convierte a Claude Code en un asistente de instalación**, y el README sugiere decirle "set up Harvey for me". **No uses esa frase.** Ese archivo le indica a Claude que instale dependencias y, al final, que arranque Harvey. Usa mejor el **prompt 1** de esta guía: primero un diagnóstico y nada se instala sin tu "sí".

**Instalación manual (CONFIGURACIÓN).** Si la prefieres, esto es lo que dice el README:

```bash
python3.13 -m venv .venv && source .venv/bin/activate && pip install -e .
```

En **Windows**, el equivalente habitual de Python es lo siguiente. **No verificado:** el README documenta solo macOS y Linux para este paso.

```powershell
py -3.13 -m venv .venv
.venv\Scripts\Activate.ps1
pip install -e .
```

Si PowerShell bloquea la activación por una política de ejecución, pídele a Claude que te explique el error antes de cambiar nada del sistema.

**Cómo comprobar la instalación (CONSULTA):**

```bash
harvey status
```

Si dice que no encuentra `harvey`, activa antes el entorno virtual (`source .venv/bin/activate` o `.venv\Scripts\Activate.ps1`), según el README.

## 6. Define tu producto, tu cliente objetivo y tu ubicación

Harvey lee dos archivos: `harvey.yaml` (una plantilla) y, si existe, **`harvey.local.yaml`**, que es el que **gana** y no se publica. Si entrenas a Harvey, escribe ahí.

**Un ejemplo ficticio para seguir la guía.** "Agenda Norte" es un nombre inventado: alguien que desarrolla sistemas de reservas para negocios pequeños (peluquerías, consultorios odontológicos, estudios de masajes). No es un cliente real y los datos son solo para ilustrar.

| Campo del brief | Ejemplo ficticio |
|---|---|
| Quién envía | Marta Ríos, fundadora de Agenda Norte (ficticio) |
| Producto | Sistema de reservas en línea para negocios de servicios pequeños |
| Precio | Por definir (no inventar) |
| Oferta de entrada | Llamada de 15 minutos para ver si encaja |
| Cliente objetivo | Peluquerías y consultorios odontológicos de 1 a 10 personas |
| Cargos | Dueño, Gerente |
| Ubicación | Medellín, Colombia |
| Señal que importa | No tiene reservas en línea |
| Qué no prometer | Más clientes, ventas ni resultados |

**Camino A: entrenar desde tu sitio web (CONFIGURACIÓN).**

```bash
harvey train https://tu-negocio.com
```

Según el README, Harvey lee tu sitio, genera `harvey.local.yaml` y archivos de conocimiento del producto. Si repites el comando, actualiza producto, objetivo y empresa y conserva el resto de tus ajustes. **Revisa todo lo que escribió:** puede interpretar mal tu sitio.

**Camino B: a mano.** Completa el brief (sección 13) y pídele a Claude que lo traslade a `harvey.local.yaml` con el prompt 2. Las claves principales, según `harvey.yaml`:

```yaml
persona:
  name: "Marta Ríos"
  company: "Agenda Norte"          # ejemplo ficticio
  role: "Fundadora"
  email: "marta@correo-de-ejemplo.test"
  tone: "directo, cercano, sin presión"

product:
  name: "Reservas Agenda Norte"
  description: "Sistema de reservas en línea para negocios pequeños"
  pricing: "por definir"           # no inventes precios
  offer:
    goal: "book_call"              # book_call, start_trial o get_reply
    entry: "llamada de 15 minutos"
    meeting_duration: "15 minutes"

icp:
  industries:
    - "peluquería"
    - "consultorio odontológico"
  company_size: "1-10 employees"
  titles:
    - "Dueño"
    - "Gerente"
  geography:
    - "Medellín, Colombia"

channels:
  email:
    provider: "gmail"
    max_daily_sends: 10            # empieza bajo; el 50 por defecto es un tope
    require_approval: true         # NO lo cambies
```

Los valores del ejemplo son ficticios. `max_daily_sends` del repositorio es 50 y el README dice que es "un techo, no un objetivo": para empezar suele ser prudente un número mucho menor, pero cuál usar depende de tu dominio y es decisión tuya.

**Sobre la ubicación.** Las ciudades se localizan automáticamente. La fuente gratuita (OpenStreetMap) tiene cobertura **limitada** para negocios sin local visible, y para ciudades o rubros concretos puede devolver pocas empresas. Si pasa, el repositorio sugiere revisar otras fuentes con `harvey discover --providers`.

**Sobre el idioma. No verificado.** La documentación, los prompts y la lista de frases prohibidas de Harvey están escritos en inglés, y el repositorio no documenta el uso en español. La línea de baja por defecto es en inglés (`Not interested? Reply "no thanks"...`) y el README dice que reconoce ciertas palabras como baja ("no thanks", "unsubscribe", "STOP"). No comprobé si reconoce "no gracias" u otras palabras en español. Si escribes a clientes hispanohablantes, **revisa cada borrador con especial cuidado** (idioma, tono y baja) y prueba el flujo de baja con una dirección tuya antes de ampliar.

## 7. Configura el correo con el flujo oficial

**Reglas del repositorio antes de enviar nada:**

1. Usa un **dominio dedicado**, no tu dominio principal.
2. Configura **SPF, DKIM y DMARC** en ese dominio. Sin los tres, el README dice que Gmail marca como spam.
3. **Calienta el buzón de 2 a 4 semanas** antes de enviar con volumen, y mantén el calentamiento.
4. Pon una **dirección postal** en `compliance.postal_address` (el README dice que EE. UU. la exige en correos fríos).
5. Llena la **lista de no contactar** (`compliance.do_not_contact`).

**Paso a paso con Gmail o Google Workspace (el recomendado).** Según `.env.example`:

1. Crea un proyecto en Google Cloud Console y habilita la Gmail API.
2. En Credenciales, crea un ID de cliente OAuth de tipo "Aplicación de escritorio".
3. Copia el ID y el secreto en tu archivo `.env`, en `GMAIL_CLIENT_ID` y `GMAIL_CLIENT_SECRET`. **Hazlo tú, en tu editor. No pegues esos valores en el chat de Claude.**
4. En `harvey.local.yaml`, deja `channels.email.provider: "gmail"`.
5. Conecta tu cuenta (CONFIGURACIÓN, abre una ventana de inicio de sesión):

```bash
harvey gmail auth
harvey gmail test
```

Las opciones de Microsoft 365 (`harvey microsoft auth` y `harvey microsoft test`, con guía en `docs/microsoft365.md` del repositorio) y de SMTP también existen. No verifiqué los pasos de la consola de Google más allá de lo que dice `.env.example`.

**Verificador de correos.** Pon al menos una clave (por ejemplo Reoon o ZeroBounce) en `.env`. Sin ella, Harvey marca las direcciones como `guess` y no les envía.

**Calentamiento.** Si usas TrulyInbox, `harvey trulyinbox connect` guarda la clave en `.env` tras comprobarla (el README indica que la clave necesita permisos de lectura). Aunque no lo uses, define `channels.email.warmup.start_date` con el día en que empezó tu calentamiento: hasta pasados `min_days` (14 por defecto) Harvey no envía correo frío. Comprueba cuando quieras (CONSULTA):

```bash
harvey warmup
```

Termina en **READY** o **NOT READY**. Solo lee DNS público y los registros de Harvey. **No apruebes correos mientras diga NOT READY.**

## 8. Elige fuentes y señales para encontrar empresas

**Señales.** Harvey sabe recolectar 29 datos sobre un negocio (por ejemplo, si tiene reservas en línea, si invierte en anuncios, si su ficha de Google está reclamada). **No recolecta ninguno hasta que tú lo confirmas.** Para ver el catálogo (CONSULTA):

```bash
harvey signals
```

Cada señal muestra qué es, **cuánto cuesta** y cuántas empresas la tienen. Para confirmar las gratuitas (CONFIGURACIÓN):

```bash
harvey signals --confirm free
```

El README indica que 26 son gratuitas y solo `SERP_RANK`, `MAPS_RANK` y `EMAIL_STATUS` consumen créditos. **Una regla práctica:** confirma solo las señales que podrías explicar en una frase de un correo. Para el ejemplo de Agenda Norte, la señal central es `NO_ONLINE_BOOKING` (no tiene reservas en línea). No uses una señal si no puedes comprobarla tú en el sitio de la empresa.

**Fuentes.** Mira el menú de fuentes con precios (CONSULTA) y la estimación antes de gastar:

```bash
harvey discover --providers
harvey discover --estimate
```

- **OpenStreetMap** (por defecto): gratis, sin cuenta, cobertura limitada.
- **TinyFish**: gratis, busca por frase.
- **DataForSEO, Serper y Scavio**: de pago o con cupo gratis inicial.

`harvey discover` ejecuta la búsqueda (CONFIGURACIÓN; en una fuente de pago, gasta). El README dice que **siempre estima primero** y respeta un tope con `--max-spend` (por defecto 1 USD). Empieza con la fuente gratuita. **Harvey no lee** ycombinator.com, Crunchbase, PitchBook ni LinkedIn por sus términos; y LinkedIn está desactivado por defecto (usarlo viola sus condiciones y puede restringir tu cuenta).

**Un detalle importante:** `harvey discover` y `harvey profile` solo encuentran y leen empresas; **no envían nada**. Mientras tanto, `harvey export` puede darte una lista de contactos en CSV si solo quieres eso.

## 9. Borradores: revisar, editar, rechazar y aprobar

Los borradores aparecen en la **bandeja de salida (Outbox)** cuando Harvey está trabajando (`harvey run`) y tiene empresas con contacto verificado. Con aprobación manual activada, ninguno sale sin ti.

**Paso a paso**

1. **Abre el panel** (CONSULTA; abre una página local):

   ```bash
   harvey dashboard
   ```

   Imprime un enlace privado como `http://127.0.0.1:5555/#token=...`. Ábrelo. **El token da control sobre el panel: no lo compartas, no lo pegues en un chat ni en una captura.** Si ves "locked", ejecuta `harvey dashboard --url` para imprimir el enlace de nuevo.
2. **Entra a Outbox.** Cada correo aparece junto a lo que Harvey sabía: la empresa, cómo se encontró y verificó la dirección, y las señales usadas.
3. **Revisa tres borradores con la checklist** de la sección 14. Si falla cualquier punto, no lo apruebes.
4. **Elige una acción.** En el panel: `A` aprobar, `E` editar, `R` rechazar, `J` y `K` para moverte. Aprobar un correo **lo programa para enviar** (CONFIGURACIÓN que ACTIVA ENVÍOS).
5. **Editar:** corrige el texto en el panel y revisa de nuevo antes de aprobar.
6. **Rechazar:** úsalo cuando el destinatario, el dato o la oferta son incorrectos. Anota el motivo para ajustar el brief.

**Desde la terminal** (alternativa): `harvey outbox` lista los pendientes (CONSULTA). `harvey outbox --reject ID` rechaza uno. `harvey outbox --approve ID` aprueba uno. El README no documenta edición desde la terminal: edita en el panel.

**Cuidado con "Held" (retenido).** Algunos correos quedan marcados "Held" si enlazan a un dominio que no es tuyo o citan instrucciones internas de Harvey. "Approve all" los deja fuera para que cada uno se lea.

**Calidad:** si los correos suenan demasiado insistentes o genéricos, el README dice que los textos se ajustan editando `skills/email_frameworks.md` (reglas de redacción) y `prompts/writer.md`, que son archivos de texto plano.

## 10. Pausar envíos y revisar respuestas en el panel

**Pausar todo (el interruptor de emergencia).**

```bash
harvey sending pause
```

Según el código, detiene todo lo que salga de la bandeja ("Nothing will leave the outbox"). Para comprobar si está pausado (CONSULTA):

```bash
harvey sending status
```

Para reanudar (PUEDE ACTIVAR ENVÍOS, y reinicia el contador de rebotes):

```bash
harvey sending resume
```

El panel tiene la misma función en **Controls**. `Ctrl+C` en la terminal detiene el ciclo completo. El estado queda guardado y se reanuda sin problemas.

**Pausa automática por rebotes.** Harvey se pausa solo si los rebotes superan `channels.email.max_bounce_rate` (0,05 por defecto). El README recomienda parar y corregir la calidad de la lista si superas aproximadamente el 3 %.

**Revisar respuestas.** En el panel, abre **Conversations**: cada respuesta aparece con los correos que la originaron. Las conversaciones que Harvey **te entregó** (por ejemplo, alguien pide un contrato o Harvey no tiene una respuesta segura) aparecen primero, con los botones **Hand back to Harvey**, **Close** y **Reopen**. Las respuestas que Harvey prepara también esperan tu aprobación en Outbox.

**Bajas.** Cuando alguien escribe una palabra de baja, Harvey la trata como inmediata y permanente y no vuelve a escribirle. En la pestaña Contacts, **Why?** muestra por qué se registró y **Undo opt-out** lo deshace.

**Evaluar el seguimiento.** Usa el **prompt 4**. No saques conclusiones con pocos datos: no hay ninguna tasa de respuesta o de conversión en esta guía porque nadie puede darte una sin medir tu caso.

## 11. Problemas frecuentes

| Problema | Qué hacer |
|---|---|
| `command not found: harvey` | Activa el entorno virtual (`source .venv/bin/activate` o `.venv\Scripts\Activate.ps1`) |
| `externally-managed-environment` | Usa un entorno virtual, no el Python del sistema (README) |
| Errores raros tras instalar en macOS | Tu entorno puede usar Python 3.9: revisa con `.venv/bin/python -V` y reconstruye con Python 3.13 (README) |
| Claude "headless" falla | Ejecuta `claude login`, comprueba que tu suscripción esté activa y prueba `claude -p "say hi"`. Si dice que falta `--safe-mode`, ejecuta `claude update` |
| El panel dice "locked" | Abre el enlace que imprimió `harvey dashboard` o ejecuta `harvey dashboard --url`. Entra como `127.0.0.1` o `localhost` |
| El descubrimiento no encuentra nada | Confirma señales primero (`harvey signals --confirm free`); la fuente gratuita tiene cobertura limitada |
| No hay borradores en Outbox | Harvey solo escribe cuando está en marcha y tiene empresas con correo verificado. Revisa `harvey status` |
| Los correos van a spam | Casi siempre es el dominio: revisa SPF, DKIM, DMARC y el calentamiento con `harvey warmup`, y reduce el volumen |
| Harvey "no hace nada" de día | Revisa las horas de silencio (`quiet_hours`) y el tope de uso (`max_daily_claude_percent`) con `harvey status` |

Si ninguna fila resuelve tu caso, copia el mensaje completo en Claude Code y pídele que lo explique y proponga una solución. No repitas el mismo comando.

## 12. Orden recomendado para tu primera sesión

1. Descarga el repositorio y abre Claude Code en esa carpeta (sección 5).
2. Pega el **prompt 1** (diagnóstico). Aprueba solo lo que entiendas.
3. Completa el **brief** (sección 13) a mano, sin claves.
4. Pega el **prompt 2** (configuración del negocio).
5. Configura el correo y el calentamiento (sección 7). Espera a que `harvey warmup` diga READY.
6. Confirma señales y busca empresas con la fuente gratuita (sección 8).
7. Arranca Harvey **solo con `require_approval: true`** y revisa tres borradores con el **prompt 3** y la checklist.
8. Aprueba uno a uno, nunca todos a la vez. Revisa respuestas y evalúa con el **prompt 4**.

## 13. Plantilla Brief-HARVEY.md

Guarda esto como `Brief-HARVEY.md` en la carpeta de Harvey y complétalo. También va como archivo editable aparte. **No escribas claves ni contraseñas en él.**

```text
# Brief-HARVEY · [NOMBRE DE TU NEGOCIO]

> Completa cada campo con datos reales. Si no lo sabes, escribe "por definir". Harvey y Claude no deben inventar precios, clientes, resultados ni datos de contacto. No pegues contraseñas, claves ni tokens en este archivo.

## 1. Quién envía
- Nombre de la persona que firma los correos:
- Cargo o rol:
- Nombre del negocio:
- Sitio web del negocio (Harvey lo lee para aprender el producto):
- Correo desde el que se enviará (dominio dedicado, NO el principal):
- País donde está el negocio:
- Dirección postal donde recibes correo (la ley de EE. UU. la exige en los correos fríos):

## 2. Qué vendes
- Producto o servicio en una frase:
- Precio real (o "por definir"):
- 3 beneficios que puedas demostrar:
  1.
  2.
  3.
- Objeciones que escuchas y cómo respondes:

| Objeción | Tu respuesta real |
|---|---|
| | |

## 3. Oferta y objetivo
- Objetivo del primer contacto (book_call = agendar llamada, get_reply = obtener respuesta, start_trial = iniciar prueba):
- Oferta de entrada de bajo compromiso (ej.: llamada de 15 minutos, revisión gratuita):
- Cómo se agenda (enlace de calendario, proponer horarios, preguntar preferencia):
- Enlace de calendario (si aplica):
- Quién atiende la llamada:
- Duración de la llamada:

## 4. Cliente objetivo
- Sectores o tipos de negocio (ej.: peluquerías, clínicas dentales pequeñas):
- Tamaño de empresa (ej.: 1 a 15 personas):
- Cargos a quien escribir (ej.: Dueño, Gerente):
- Debe cumplir (3 como máximo):
- Descarta si (3 como máximo):

## 5. Ubicación
- Ciudades o zonas donde buscas clientes (escríbelas como las reconoce un mapa, ej.: "Medellín, Colombia"):
- Zona horaria del remitente:
- Horario en que SÍ pueden salir correos (ej.: lunes a viernes, 08:00 a 17:00 en la zona del destinatario):

## 6. Cómo encontrar empresas
- Fuente inicial: [OpenStreetMap gratuita / otra: nombre, costo y límite máximo de gasto]
- Señales que quiero confirmar (marca solo las que puedas explicar en un correo):
  - [ ] NO_ONLINE_BOOKING (no tiene reservas en línea)
  - [ ] NO_WEBSITE (tiene ficha pero no sitio)
  - [ ] UNCLAIMED_LISTING (ficha de Google sin reclamar)
  - [ ] REVIEW_RATING / REVIEW_COUNT (reseñas)
  - [ ] RUNNING_GOOGLE_ADS (invierte en anuncios)
  - [ ] Otras: 
- Señal que NO quiero usar y por qué:

## 7. Límites y cumplimiento
- Envíos máximos por día (empieza bajo): 
- Aprobación manual: DEBE quedar `channels.email.require_approval: true`
- Línea de baja (texto exacto): Not interested? Reply "no thanks" and I won't email again.
- Idioma de los correos: [por definir; ver sección de idioma de la guía]
- Lista de no contactar (direcciones o dominios: competidores, clientes actuales, quien ya te dijo que no):
- Comprobación Precleared: [sí / no / no aplica]

## 8. Correo y calentamiento
- Proveedor de correo: [Gmail o Google Workspace / Microsoft 365 / SMTP]
- Dominio dedicado ya comprado: [sí / no]
- SPF, DKIM y DMARC configurados: [sí / no / no sé]
- Servicio de calentamiento: [nombre o "ninguno aún"]
- Fecha de inicio del calentamiento (AAAA-MM-DD):

## 9. Criterios para revisar los borradores
Antes de aprobar cada correo, debo poder responder SÍ a todo:
- [ ] El destinatario es una persona o dirección correcta de ese negocio.
- [ ] La evidencia que cita el correo es real y puedo comprobarla.
- [ ] La oferta es la mía y no promete resultados que no puedo garantizar.
- [ ] La personalización es específica, no una frase que sirve para cualquiera.
- [ ] El tono es el mío, breve y sin presión.

## 10. Notas
- Cosas que Harvey nunca debe decir o prometer:
- Cosas que debo revisar yo antes de empezar:
```

## 14. Checklist para revisar tres borradores

Revisa cada borrador por separado. Si un punto falla, rechaza o edita el correo. **No apruebes por cansancio.**

| Punto | Pregunta | Borrador 1 | Borrador 2 | Borrador 3 |
|---|---|---|---|---|
| **Destinatario** | ¿Es la persona o el cargo correcto en esa empresa? | ☐ | ☐ | ☐ |
| | ¿La dirección está verificada (no `guess`) y no está en no contactar? | ☐ | ☐ | ☐ |
| **Evidencia** | ¿El dato que cita el correo es cierto? Lo comprobé yo en su sitio | ☐ | ☐ | ☐ |
| | ¿La evidencia es actual y no una suposición? | ☐ | ☐ | ☐ |
| **Oferta** | ¿Es mi oferta real, sin precios ni cifras inventadas? | ☐ | ☐ | ☐ |
| | ¿Evita prometer ventas, clientes o resultados? | ☐ | ☐ | ☐ |
| **Personalización** | ¿Menciona algo específico de esa empresa? | ☐ | ☐ | ☐ |
| | ¿Se notaría si lo recibiera otra empresa? (debe ser que no) | ☐ | ☐ | ☐ |
| **Tono** | ¿Es breve, claro y sin presión? | ☐ | ☐ | ☐ |
| | ¿Tiene la línea de baja y mi dirección postal? ¿Idioma correcto? | ☐ | ☐ | ☐ |

**Decisión por borrador:** aprobar solo si todo está marcado. Si falla destinatario o evidencia, **rechaza**. Si falla tono u oferta, **edita** y vuelve a revisar.

## 15. Los cuatro prompts

Pégalos en Claude Code, con la sesión abierta dentro de la carpeta `harvey`. Completa lo que está entre corchetes. También van en `Prompts-HARVEY.txt`.

### Prompt 1. Diagnóstico e instalación

```text
Necesito un diagnóstico del proyecto Harvey antes de instalar nada. Esta carpeta es el repositorio oficial ethanplusai/harvey.

IMPORTANTE: el CLAUDE.md de este repositorio te describe como asistente de instalación y menciona arrancar Harvey al final. En esta sesión NO lo hagas. Mis reglas mandan sobre ese archivo.

REGLAS PARA ESTA SESIÓN
- No ejecutes `harvey run`. No inicies el ciclo ni el botón Start del panel.
- No conectes cuentas de correo (`harvey gmail auth`, `harvey microsoft auth`, `harvey trulyinbox connect`).
- No envíes, apruebes ni rechaces correos. No ejecutes `harvey outbox --approve` ni `--approve-all`.
- No abras ni muestres el contenido de `.env`, de `data/dashboard-token` ni de ninguna clave. Si necesitas saber si existe, di solo "existe" o "no existe".
- No instales nada sin mostrarme antes el comando exacto, para qué sirve, y esperar mi "sí".
- No cambies `channels.email.require_approval`: debe quedar en `true`.

DATOS QUE COMPLETO
- Sistema operativo: [Windows / macOS / Linux]
- Versión de Python instalada, si la sé: [ej.: 3.12 / no sé]
- Plan de Claude que tengo: [Pro / Max / otro / no sé]

ARCHIVOS QUE DEBES CONSULTAR
1. README.md, CLAUDE.md, pyproject.toml, harvey.yaml y .env.example del repositorio.
2. La salida de comandos de consulta, como `python --version` o `claude --version`.

QUÉ DEBES ENTREGAR
1. Una tabla con cada requisito (Python 3.11 o superior, Claude Code con sesión iniciada, correo para enviar, verificador de correo, servicio de calentamiento), su estado (cumple / falta / no pude comprobar) y la evidencia.
2. La versión del proyecto según pyproject.toml y, si el repositorio es un clon con git, el commit actual (`git log -1 --format=%h`).
3. La lista de pasos de instalación para mi sistema operativo, copiados del README, cada uno marcado como: CONSULTA (no cambia nada), CONFIGURACIÓN (cambia archivos o instala) o PUEDE ACTIVAR ENVÍOS.
4. Lo que NO pudiste comprobar, dicho con claridad.

CÓMO COMPROBARLO
- Cada afirmación debe citar el archivo o el comando de donde sale.
- Si un paso para mi sistema no está en el README, dímelo y márcalo "no verificado".
- Detente al terminar y espera mi aprobación antes de instalar.
```

### Prompt 2. Configuración del negocio

```text
Vamos a configurar Harvey para mi negocio usando el brief. Trabaja solo con la configuración; no inicies Harvey.

REGLAS PARA ESTA SESIÓN
- No ejecutes `harvey run` ni inicies el ciclo desde el panel.
- No conectes cuentas ni abras `.env`. Si hace falta una clave, dime qué variable es y yo la escribo en mi propio editor.
- No envíes, apruebes ni rechaces correos.
- Mantén `channels.email.require_approval: true`. Si encuentras `false`, avísame y corrígelo solo con mi permiso.
- No inventes precios, clientes, resultados, cifras ni datos de contacto. Lo que falte en el brief, déjalo como "por definir" y pregúntame.
- Antes de modificar un archivo, muéstrame el cambio exacto y espera mi "sí". Haz una copia de respaldo de los archivos que cambies.

DATOS QUE COMPLETO
- Brief: Brief-HARVEY.md en esta carpeta (ya completado).
- Sistema operativo: [Windows / macOS / Linux]
- ¿Entrenar Harvey desde mi sitio web? [sí, con esta dirección: ... / no, configurar a mano]

ARCHIVOS QUE DEBES CONSULTAR
1. Brief-HARVEY.md.
2. harvey.yaml (es la plantilla) y, si existe, harvey.local.yaml (es el que Harvey lee primero).
3. README.md, secciones "Configuration", "You confirm what it looks for" y "Legal and deliverability".
4. skills/email_frameworks.md, solo para entender las reglas de redacción.

QUÉ DEBES HACER
1. Compara el brief con las claves de harvey.yaml: persona, product, icp, channels.email, usage y compliance.
2. Propón los valores de cada clave. Para cada valor indica de qué línea del brief sale. Si no sale del brief, déjalo vacío.
3. Si elegí entrenar desde mi sitio, dime el comando exacto (`harvey train <dirección>`), qué archivos escribe y espera mi "sí" antes de ejecutarlo.
4. Revisa cuántas señales son gratuitas y cuáles cuestan. Propón confirmar solo las que mi brief puede explicar en un correo. No confirmes ninguna de pago sin mi permiso.
5. Propón un límite de envíos diarios bajo y el horario de envío de mi brief.

QUÉ DEBES ENTREGAR
- Una tabla: clave de configuración, valor propuesto, línea del brief de donde sale, estado (completo / por definir).
- El diff de cambios para harvey.local.yaml.
- Una lista de lo que debo hacer yo en mi equipo (claves, correo, dominio).

CÓMO COMPROBARLO
- Muestra el valor final de `channels.email.require_approval` y confirma que es `true`.
- Ejecuta solo comandos de consulta, como `harvey signals` o `harvey discover --providers`, y muéstrame la salida.
- Dime qué no pudiste comprobar.
```

### Prompt 3. Revisión de tres borradores

```text
Revisa tres borradores de correo que Harvey dejó en la bandeja de salida. No envíes ni apruebes ninguno.

REGLAS PARA ESTA SESIÓN
- Solo lectura. Usa `harvey outbox` (sin opciones) para listar. NO ejecutes `harvey outbox --approve`, `--approve-all` ni `--reject`.
- No ejecutes `harvey run`, no cambies la configuración y no abras `.env`.
- No inventes datos de la empresa. Todo lo que afirmes sobre una empresa debe salir de lo que muestra Harvey (evidencia en el panel o en la base de datos) o de su sitio público.
- Si no puedes comprobar algo, escribe "no comprobado".

DATOS QUE COMPLETO
- Identificadores de los tres borradores a revisar: [id 1, id 2, id 3] (si no los sé, elige los tres primeros de la lista)
- Mi oferta real, en una frase: [ej.: sistema de reservas en línea para negocios pequeños; precio por definir]
- Qué NO se puede prometer: [ej.: más clientes, ventas o resultados concretos]

ARCHIVOS Y DATOS QUE DEBES CONSULTAR
1. Brief-HARVEY.md (oferta, cliente objetivo, tono, lista de no contactar).
2. La salida de `harvey outbox` para los tres borradores.
3. Si hace falta más contexto, consulta en solo lectura la base data/harvey.db (empresa, contacto, verificación del correo y señales usadas). No escribas en ella.

QUÉ DEBES ENTREGAR
Para cada borrador, una ficha con estas cinco comprobaciones, cada una con SÍ / NO / NO COMPROBADO y una línea de evidencia:
1. Destinatario: la persona y el cargo son plausibles para esa empresa, la dirección está verificada (no "guess") y no está en la lista de no contactar.
2. Evidencia: el hecho que cita el correo (por ejemplo "no tiene reservas en línea") existe y puedo comprobarlo yo en su sitio. Indica el enlace o dónde mirarlo.
3. Oferta: coincide con mi oferta real y no promete resultados, cifras ni plazos.
4. Personalización: menciona algo específico de esa empresa y no sirve para cualquiera.
5. Tono: breve, claro, sin presión ni frases genéricas, con la línea de baja.
Luego, para cada borrador, una recomendación: APROBAR, EDITAR (con el texto exacto propuesto) o RECHAZAR (con el motivo), y una sugerencia de ajuste para el siguiente lote.

CÓMO COMPROBARLO
- Si un borrador falla la evidencia o el destinatario, la recomendación nunca es aprobar.
- No decidas por mí: yo apruebo o rechazo desde el panel.
- Termina con lo que no pudiste verificar.
```

### Prompt 4. Evaluación del seguimiento

```text
Evalúa el seguimiento de lo que Harvey ha hecho hasta ahora y dime si conviene continuar, ajustar o pausar. No envíes nada ni cambies la configuración.

REGLAS PARA ESTA SESIÓN
- Solo lectura. Puedes usar `harvey status`, `harvey outbox` (sin opciones), `harvey sending status`, `harvey warmup` y `harvey usage`.
- NO ejecutes `harvey run`, `harvey sending resume`, `harvey outbox --approve`, `--approve-all` ni `--reject`.
- Si recomiendas pausar, dime el comando (`harvey sending pause`) y espera mi "sí". No lo ejecutes por tu cuenta.
- No abras `.env` ni muestres tokens.
- No inventes tasas de respuesta, de conversión ni resultados. Usa solo los conteos reales que muestre Harvey y di cuántos datos hay. Con pocos datos, dilo.

DATOS QUE COMPLETO
- Desde qué fecha empezamos: [AAAA-MM-DD]
- Cuántos correos aprobé hasta ahora: [número o "no sé"]
- Qué decidí al empezar sobre cuándo pausar: [ej.: pausar si hay un rebote o una queja]

ARCHIVOS Y DATOS QUE DEBES CONSULTAR
1. Brief-HARVEY.md (objetivo, límites y criterios de revisión).
2. La salida de los comandos de consulta indicados arriba.
3. En solo lectura, data/harvey.db: correos enviados, respuestas, rebotes, bajas y estado de cada conversación.
4. El panel de Harvey (pestañas Outbox, Conversations y Today), si te copio lo que veo.

QUÉ DEBES ENTREGAR
1. Un resumen con conteos reales: correos enviados, rebotes, respuestas, bajas (opt-out), conversaciones entregadas a mí y borradores pendientes. Para cada número indica de dónde sale.
2. Una lista de las respuestas que requieren acción mía, con el motivo y la prioridad.
3. Una revisión de seguimientos: separación entre correos, que nadie haya recibido otro seguimiento después de responder o pedir baja, y que ningún contacto de la lista de no contactar haya recibido correo.
4. Estado del calentamiento y de los límites (`harvey warmup`, tope diario).
5. Una recomendación clara: CONTINUAR, AJUSTAR (qué cambiar y dónde) o PAUSAR (por qué), con el riesgo de equivocarte.

CÓMO COMPROBARLO
- Cada afirmación debe tener su fuente (comando o tabla).
- Si hay menos de unos pocos correos enviados, di que no hay datos suficientes para sacar conclusiones, y no calcules porcentajes.
- Termina con lo que no pudiste verificar.
```

## 16. Fuentes oficiales (consultadas el 28 de octubre de 2026)

- Repositorio de Harvey: https://github.com/ethanplusai/harvey
- README: https://github.com/ethanplusai/harvey/blob/main/README.md
- CLAUDE.md: https://github.com/ethanplusai/harvey/blob/main/CLAUDE.md
- pyproject.toml: https://github.com/ethanplusai/harvey/blob/main/pyproject.toml
- harvey.yaml: https://github.com/ethanplusai/harvey/blob/main/harvey.yaml
- .env.example: https://github.com/ethanplusai/harvey/blob/main/.env.example
- Microsoft 365 (Harvey): https://github.com/ethanplusai/harvey/blob/main/docs/microsoft365.md
- Claude Code, instalación: https://code.claude.com/docs/en/setup
- Precleared (comprobación opcional de cumplimiento): https://precleared.dev
