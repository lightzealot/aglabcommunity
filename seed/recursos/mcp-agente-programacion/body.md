Conecta documentación, navegador, base de datos y despliegues a **Claude Code** y **Codex**. Verificado contra la documentación oficial el **20 de octubre de 2026**; **no se ejecutó nada**, así que los comandos coinciden con la documentación pero no se afirma que se probaran. Lo no verificado está marcado como *pendiente*. Abajo puedes descargar el PDF completo, el checklist y los 8 prompts.

**MCP** (Model Context Protocol) es un estándar para que un agente use herramientas externas. **Remoto** = el servidor está en internet (URL, suele usar OAuth, inicio de sesión en el navegador). **Local** = un programa de tu equipo (aquí, con `npx`). Instalar los cuatro **no garantiza código correcto ni apps listas para producción**. Un servidor MCP actúa con tus permisos: conéctalo solo si confías, deja la **aprobación manual** activada y desconfía del contenido externo (inyección de instrucciones).

## Las cuatro

| | Para qué | Tipo | Requisitos |
|---|---|---|---|
| **Context7** | Documentación actual de tu versión de una librería | Remoto o local | Clave de API recomendada (gratis en su panel) |
| **Chrome DevTools** | Controlar e inspeccionar un Chrome real | Local | Node LTS y Chrome estable |
| **Supabase** | Tablas, consultas y registros de tu proyecto | Remoto | Cuenta de Supabase |
| **Vercel** | Proyectos, despliegues y registros | Remoto | Cuenta de Vercel y permisos del equipo |

**Dónde se ejecuta cada cosa:** los comandos `claude mcp …`, `codex mcp …` y `npx …` van en la **terminal**; `/mcp` y los prompts, **dentro** de Claude Code o de Codex (`claude` o `codex` en la carpeta del proyecto). Claude Code guarda la configuración por alcance (`--scope local|project|user`; el de proyecto va en `.mcp.json`); Codex, en `~/.codex/config.toml`.

## 1. Context7

**Claude Code** (terminal; sustituye `TU_CLAVE_API`):

```bash
claude mcp add --scope user --transport http context7 https://mcp.context7.com/mcp --header "Authorization: Bearer TU_CLAVE_API"
```

**Codex** (terminal):

```bash
codex mcp add context7 -- npx -y @upstash/context7-mcp
```

Con clave: añade `--api-key TU_CLAVE_API` al final. Remoto en `config.toml`: `url = "https://mcp.context7.com/mcp"` y `http_headers = { "Authorization" = "Bearer TU_CLAVE_API" }`.

**Comprueba:** `claude mcp list` o `codex mcp list`, y `/mcp` dentro del agente. **Prueba:** «Usa Context7 para explicar cómo definir una ruta con la versión de [LIBRERÍA] de este proyecto. Cita la versión.»

**Errores:** dejar `TU_CLAVE_API` sin sustituir; no indicar la versión. *Pendiente:* si funciona sin clave y sus límites.

## 2. Chrome DevTools MCP

**Claude Code:** `claude mcp add chrome-devtools --scope user npx chrome-devtools-mcp@latest`

**Codex:** `codex mcp add chrome-devtools -- npx chrome-devtools-mcp@latest`

**Prueba:** «Abre http://localhost:3000, toma una captura y dime si hay errores en la consola.» (con tu servidor local en marcha). Abre una ventana de Chrome controlada por el agente; con `--headless` corre sin ventana.

**Privacidad:** expone el contenido del navegador al agente: **no abras sesiones personales** ni compartas datos sensibles. Las estadísticas de uso vienen activadas (`--no-usage-statistics` las desactiva). Soporte oficial: Chrome y Chrome for Testing.

*Pendiente:* el proyecto usa `startup_timeout_ms` en el `config.toml` de Windows y Codex documenta `startup_timeout_sec`; usa el que documente tu versión.

## 3. Supabase MCP

Usa un **proyecto de pruebas**, con alcance y solo lectura en la URL: `https://mcp.supabase.com/mcp?project_ref=ID_DE_TU_PROYECTO&read_only=true`.

**Claude Code:**

```bash
claude mcp add --scope project --transport http supabase "https://mcp.supabase.com/mcp?project_ref=ID_DE_TU_PROYECTO&read_only=true"
```

Luego `/mcp` → `supabase` → *Authenticate* (inicio de sesión en el navegador). No pongas claves en `.mcp.json`: se comparte con tu equipo.

**Codex:**

```bash
codex mcp add supabase --url "https://mcp.supabase.com/mcp?project_ref=ID_DE_TU_PROYECTO&read_only=true"
codex mcp login supabase
```

**Prueba:** «Lista las tablas de mi proyecto y cuántas filas tiene cada una. No modifiques nada.»

**Riesgos (según su documentación):** inyección de instrucciones desde datos no confiables; mantén la aprobación manual, evita datos de producción y usa `project_ref`, `read_only` y datos de ejemplo. No des este servidor a clientes: corre con tus permisos.

## 4. Vercel MCP

**Claude Code:** `claude mcp add --transport http vercel https://mcp.vercel.com` y luego `/mcp` → autenticar.

**Codex:** `codex mcp add vercel --url https://mcp.vercel.com` (abre el navegador para autorizar; si no, `codex mcp login vercel`).

**Consultar no es crear.** Para **consultar**: `list_deployments`, `get_deployment`, `get_runtime_logs`, `get_runtime_errors`, `list_projects`. Para **crear o cambiar**: según un anuncio del 23 de julio de 2026, existe `deploy_to_vercel`, además de herramientas que modifican recursos. *Pendiente:* sus requisitos de Git o CLI y si despliega vista previa o producción.

**Permisos:** añadir el servidor no autoriza: inicia sesión y concede acceso solo al equipo necesario. **MCP y la CLI de Vercel usan autenticaciones separadas.** Mantén la confirmación humana en cada acción.

**Prueba:** «Lista mis equipos y proyectos de Vercel. No hagas ningún cambio.»

## 8 prompts (2 por herramienta)

```text
Context7 · Usa Context7 con la versión de [LIBRERÍA] de este proyecto (mira package.json) para explicarme cómo [TAREA]. Cita la versión; si no la tiene, dímelo.
```

```text
Context7 · Revisa [ARCHIVO] con la documentación actual de [LIBRERÍA] y lista patrones obsoletos: línea, qué dice la documentación y propuesta. No modifiques nada.
```

```text
DevTools · Abre [URL LOCAL], toma una captura y revisa consola y red. Dame un informe: errores, solicitudes lentas y archivo probable. No inicies sesión en ninguna cuenta.
```

```text
DevTools · Prueba este flujo en [URL]: [PASOS]. Tras cada paso di qué viste y captura si falla. No envíes formularios con datos reales.
```

```text
Supabase · En modo solo lectura, lista las tablas de mi proyecto de pruebas con columnas y relaciones y propón mejoras. No ejecutes nada que cambie datos.
```

```text
Supabase · En mi proyecto de pruebas crea la tabla [NOMBRE] con [COLUMNAS] y [N] filas ficticias. Muéstrame el SQL y espera mi aprobación. No toques otras tablas.
```

```text
Vercel · Busca el último despliegue de [PROYECTO] del equipo [EQUIPO]; si falló, revisa registros y errores y explica la causa. Solo consulta.
```

```text
Vercel · Quiero una vista previa de [PROYECTO]. Dime las opciones (Git, CLI de Vercel o Vercel MCP) y qué requiere cada una. No despliegues hasta que yo elija.
```

## Ejercicio: mini app de recursos

Carpeta nueva, proyectos de **prueba** y datos **ficticios**. 1) Conecta las cuatro y haz cada prueba. 2) Con Context7 elige framework y versión. 3) En Supabase crea `recursos` (`titulo`, `enlace`, `etiqueta`) con 5 filas de ejemplo; revisa el SQL antes. 4) Pide una página que lea la tabla con claves en variables de entorno (sin pegarlas en el chat). 5) Pruébala con DevTools y corrige los errores de consola. 6) Decide con Vercel cómo desplegar una vista previa (consulta su documentación; pendiente de verificar aquí). 7) Revisa y **limpia**: borra los proyectos de prueba y `claude mcp remove <nombre>`.

Esto no demuestra que el código sea seguro ni esté listo para producción.

## Checklist

- [ ] Sé dónde ejecutar cada comando (terminal / dentro del agente).
- [ ] Cada servidor aparece en `list` y en `/mcp`.
- [ ] Claves fuera de archivos y del repositorio.
- [ ] Supabase: proyecto de pruebas, `project_ref` y `read_only=true`.
- [ ] Vercel: acceso solo al equipo necesario.
- [ ] Aprobación manual activada; revisé el código antes de publicar.

**Documentación oficial:** [Context7](https://github.com/upstash/context7) · [Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp) · [Supabase MCP](https://supabase.com/docs/guides/ai-tools/mcp) · [Vercel MCP](https://vercel.com/docs/agent-resources/vercel-mcp) · [Claude Code MCP](https://code.claude.com/docs/en/mcp) · [Codex MCP](https://developers.openai.com/codex/mcp) (redirige a una página de OpenAI en `learn.chatgpt.com`).
