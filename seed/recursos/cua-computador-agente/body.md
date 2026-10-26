Cómo conectar tu agente de programación (Claude Code, Codex, Cursor y otros) a un escritorio que pueda ver y manejar, con **CUA**. Verificado contra la documentación oficial el **26 de octubre de 2026**; **no se instaló ni se ejecutó nada**, así que los comandos coinciden con la documentación pero no se afirma que se probaran. Abajo puedes descargar el PDF, la guía editable y un checklist.

**Dos rutas:** **CUA Spaces** conecta tu agente a un escritorio (empiezas con tu equipo y luego puedes añadir un entorno separado). **CUA Driver** maneja las aplicaciones del equipo donde se instala, en segundo plano. Para tu primera prueba basta Spaces.

## Requisitos

| | Requisito |
|---|---|
| **macOS** | macOS 26 o posterior |
| **Windows** | Windows 11 (vista previa); Home sirve y no necesita Hyper-V |
| **Linux** | Ubuntu 24.04 |
| **Agente** | Uno compatible: Claude Code, Codex, Cursor… |
| **Cuenta** | No hace falta para usarlo en tu equipo; la gratuita sirve para entrar desde otros equipos |

Un espacio adicional en Linux necesita un motor de contenedores (Docker); en macOS, un Mac con Apple silicon y unos 50 GB libres. Los precios no aparecen en la guía de inicio, así que no los incluyo.

## Instala

Descarga el instalador desde cua.ai/download o usa la terminal:

```bash
curl -fsSL https://cua.ai/install.sh | sh
```

```powershell
irm https://cua.ai/install.ps1 | iex
```

El primero es para macOS y Linux; el segundo, para Windows. **Descargan y ejecutan un instalador: revísalo antes si lo prefieres.** Luego abre CUA Spaces, elige tu agente (**Connect**), concede los dos permisos que pide el sistema y reinicia el agente.

## Comprueba la conexión

```bash
cua agents detect
cua agents status
```

Si falta tu agente: **Settings → AI agents → Configure**, o `cua agents setup --agents claude,codex --yes`. A mano: `claude mcp add cua -- cua daemon mcp` o `codex mcp add cua -- cua daemon mcp`. La configuración es **de cada equipo**.

## Primera prueba

```text
Lista los computadores o Spaces disponibles. Dime a cuál te vas a conectar antes de actuar. En ese escritorio, abre la calculadora, calcula 6 × 7 y comprueba visualmente que muestra 42. Al terminar, dime qué verificaste.
```

Si no ve herramientas, reinicia el agente y revisa `cua agents status`. Si ve el escritorio pero no actúa, revisa los permisos del sistema. Si elige otro escritorio, detén la tarea.

## Seguridad y alternativa con Driver

- El agente actúa con **tus permisos**: prueba primero con tareas sin datos sensibles.
- El modo por defecto de Driver permite enviar entrada a **todas** las aplicaciones, y una lista de permisos vacía **concede todo**.
- Para deshacer: `cua agents remove --dry-run` y luego `cua agents remove`.
- **Hermes:** `hermes tools enable computer_use --platform cli`, sin añadir un segundo servidor MCP. **OpenClaw:** `cua-driver mcp-config --client openclaw`, ejecutar lo que imprime y reiniciar.

**Pendiente de verificar:** la ruta exacta de los permisos en macOS, si Pi necesita la CLI y los precios. **Documentación:** [Inicio rápido](https://cua.ai/docs/spaces/quickstart) · [Conectar tu agente](https://cua.ai/docs/spaces/guides/connect-your-agent) · [CLI y MCP](https://cua.ai/docs/cua-cli/guides/mcp-server) · [Driver](https://cua.ai/docs/cua-driver/guides/connect-your-agent).
