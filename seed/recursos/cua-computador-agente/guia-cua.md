# Dale un computador a tu agente con CUA

Guía de instalación para conectar tu agente de programación (Claude Code, Codex, Cursor y otros) a un escritorio que pueda ver y manejar. Verificada contra la documentación oficial de CUA el 26 de octubre de 2026. **No se instaló ni se ejecutó nada**: los comandos coinciden con la documentación, pero no se afirma que se probaran.

## 1. Elige cómo empezar

- **CUA Spaces:** conecta tu agente a un escritorio. Empiezas con tu propio equipo y, si quieres, añades después un entorno separado. Es la ruta de esta guía.
- **CUA Driver:** permite manejar las aplicaciones del equipo donde se instala, en segundo plano. Es la alternativa para Hermes y OpenClaw (sección 6).

Para tu primera prueba no necesitas las dos.

## 2. Revisa los requisitos

| | Requisito |
|---|---|
| **macOS** | macOS 26 o posterior |
| **Windows** | Windows 11 (en vista previa); Windows 11 Home sirve y no necesita Hyper-V |
| **Linux** | Ubuntu 24.04 |
| **Agente** | Uno compatible: Claude Code, Codex, Cursor… |
| **Cuenta** | No hace falta para usarlo en este equipo; la cuenta gratuita solo sirve para entrar desde tus otros equipos |

**Espacio adicional (opcional):** en Linux necesita un motor de contenedores como Docker; en macOS, un Mac con Apple silicon y unos 50 GB libres. Si tu sistema no cumple, no asumas compatibilidad: revisa la instalación oficial de tu plataforma. Los precios no aparecen en la guía de inicio, así que no los incluyo.

## 3. Instala Spaces

Lo más sencillo: descarga el instalador desde cua.ai/download y sigue el asistente. Por terminal, la documentación ofrece:

```bash
curl -fsSL https://cua.ai/install.sh | sh
```

```powershell
irm https://cua.ai/install.ps1 | iex
```

El primero es para macOS y Linux; el segundo, para Windows (PowerShell). Ambos descargan y ejecutan un instalador: **revisa su contenido antes si lo prefieres**. Instalan el comando `cua` y la aplicación. En Windows, SmartScreen puede mostrar un aviso la primera vez ("More info" → "Run anyway").

Abre CUA Spaces y elige tu agente en el asistente (**Connect**). macOS pedirá una sola vez dos permisos para que el agente controle el equipo. Cierra y vuelve a abrir el agente para que cargue las herramientas. No pegues claves en chats ni capturas.

## 4. Comprueba la conexión

```bash
cua agents detect
cua agents status
```

`detect` (solo lectura) lista los agentes compatibles que encuentra; `status` muestra qué configuró CUA en cada uno. Si falta el tuyo: **Settings → AI agents → Configure**, o por terminal `cua agents setup --agents claude,codex --yes` (cambia los nombres por tus agentes). A mano:

```bash
claude mcp add cua -- cua daemon mcp
codex mcp add cua -- cua daemon mcp
```

La configuración es **solo de cada equipo**: en otro computador repites la instalación. Casi todos los agentes se conectan por MCP; **Pi** no usa MCP y solo recibe las skills de CUA.

## 5. Haz una primera prueba verificable

```text
Lista los computadores o Spaces disponibles. Dime a cuál te vas a conectar antes de actuar. En ese escritorio, abre la calculadora, calcula 6 × 7 y comprueba visualmente que muestra 42. Al terminar, dime qué verificaste.
```

- **No ve herramientas:** reinicia el agente y revisa `cua agents status`.
- **Ve el escritorio pero no actúa:** revisa los permisos del sistema en el equipo que controla.
- **Elige otro escritorio:** detén la tarea y elige el correcto.

## 6. Entorno separado y alternativa con Driver

**Espacio adicional:** en Spaces, añade un espacio y sigue el asistente (Linux o macOS según tu equipo). Cuando aparezca disponible, pide al agente que lo identifique y prueba una tarea sin datos sensibles, como crear un archivo de texto. Comprueba el archivo y su contenido antes de delegar tareas largas: tener herramientas no garantiza que cada acción sea correcta.

**Driver con Hermes:**

```bash
hermes tools enable computer_use --platform cli
hermes -t computer_use chat
```

No añadas un segundo servidor MCP para esta integración. **Driver con OpenClaw:** después de instalar Driver, `cua-driver mcp-config --client openclaw` imprime una línea `openclaw mcp set …`; ejecútala y reinicia el cliente. En macOS, Driver pide permisos de **Accesibilidad** y **Grabación de pantalla**, y un servidor iniciado por OpenClaw **no hereda** los de OpenClaw.app (la ruta exacta en los ajustes de macOS no quedó verificada).

## 7. Seguridad

- Un agente con acceso al escritorio actúa con **tus permisos**: usa primero tareas sin datos sensibles y vigílalo.
- El modo de permisos por defecto de Driver (`standard`) permite enviar entrada a **todas** las aplicaciones.
- Si limitas permisos con `--permissions`, **una lista vacía concede todo**. Los permisos `computer:shell` y `computer:file` ejecutan comandos y modifican archivos.
- Para deshacer: `cua agents remove --dry-run` muestra qué quitaría y `cua agents remove` elimina solo lo que añadió CUA Spaces.

## Pendiente de verificar

Nada se instaló ni se probó. No se confirmó la ruta exacta de los permisos en macOS, ni si Pi necesita la CLI, ni los precios de los planes.

## Dónde comprobar cambios

- Inicio rápido de Spaces: https://cua.ai/docs/spaces/quickstart
- Conectar tu agente: https://cua.ai/docs/spaces/guides/connect-your-agent
- CLI y servidor MCP: https://cua.ai/docs/cua-cli/guides/mcp-server
- Driver: https://cua.ai/docs/cua-driver/guides/connect-your-agent
