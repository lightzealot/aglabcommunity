# Checklist de instalación y comprobación: 4 MCP

Complemento de la guía «4 MCP para ampliar tu agente de programación». Fecha de verificación de la documentación: 20 de octubre de 2026. Marca cada punto con una prueba real (un comando que devolvió lo esperado), no con una suposición.

**Antes de empezar**

- [ ] Tengo Claude Code o Codex instalado y sé en qué carpeta voy a trabajar.
- [ ] Tengo Node.js (versión LTS; Context7 con el asistente `ctx7` pide 22.13 o superior) y npm.
- [ ] Tengo Chrome estable y actualizado.
- [ ] Tengo cuenta de Supabase y de Vercel, de preferencia con proyectos de pruebas.
- [ ] Sé dónde ejecutar cada comando: terminal, dentro de Claude Code o dentro de Codex.

**Context7**

- [ ] Registré el servidor y aparece en `claude mcp list` o `codex mcp list`.
- [ ] La clave de API no está escrita en archivos del proyecto ni en el repositorio.
- [ ] La prueba cita la versión correcta de la librería.

**Chrome DevTools MCP**

- [ ] Registré el servidor y aparece en `/mcp`.
- [ ] La prueba abre una página y devuelve una captura o mensajes de consola.
- [ ] No abrí páginas con sesiones personales abiertas.

**Supabase MCP**

- [ ] Usé un proyecto de pruebas, con `project_ref` y `read_only=true`.
- [ ] Autentiqué desde el navegador y la lista de tablas se muestra.
- [ ] Mantengo la aprobación manual y no puse claves en `.mcp.json`.

**Vercel MCP**

- [ ] Autentiqué y concedí acceso solo al equipo necesario.
- [ ] La prueba lista mis equipos y proyectos.
- [ ] Sé qué herramientas solo consultan y cuáles pueden crear o cambiar cosas.

**Al terminar**

- [ ] Revisé el código y las pruebas antes de publicar nada real.
- [ ] Retiré los servidores y los proyectos de prueba que ya no necesito.
