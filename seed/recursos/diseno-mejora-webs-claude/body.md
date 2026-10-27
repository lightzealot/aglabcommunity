Una guía para elegir qué herramienta de diseño instalar primero con **Claude Code**, configurarla y aplicarla a un proyecto real. Incluye un `BRIEF.md` editable, cuatro prompts para copiar y una checklist final. Abajo descargas el PDF, la guía editable, el brief y los prompts.

**Qué se comprobó y qué no:** las instrucciones salen de las fuentes oficiales, consultadas el **27 de octubre de 2026**. Se comprobó en un computador con Windows que el comando de Playwright MCP se agrega y queda conectado, y que los comandos `npx` de Emil Kowalski e Impeccable existen. **No se instalaron** las skills ni Figma MCP en un proyecto, **no se probaron los resultados** y no se promete una web profesional ni un tiempo. Lo no verificado está marcado en cada paso.

## ¿Qué instalo primero?

No necesitas instalar todo. Elige según tu situación:

| Herramienta | Tipo | Empieza aquí si... | Obligatoria |
|---|---|---|---|
| **Taste** | Skill | Creas una web desde cero y no tienes dirección visual | No |
| **Impeccable** | Skill | Ya tienes web y quieres revisar composición, tipografía, color y consistencia | No |
| **Emil Kowalski** | Skills | Quieres cuidar animaciones, transiciones e interacciones | No |
| **Figma MCP** | MCP | Ya tienes un diseño en Figma para implementar | No |
| **Playwright MCP** | MCP | Quieres que Claude abra tu web en un navegador y la revise | No |

Una **skill** le da criterio a Claude (instrucciones). Un **servidor MCP** le da una capacidad (abrir un navegador, leer Figma).

## El flujo de la guía

1. **Completa el brief:** negocio, público, objetivo, CTA, contenido, imágenes, referencias, tecnología y requisitos de revisión.
2. **Elige la dirección visual:** el prompt 1 propone tres y se detiene antes de programar.
3. **Implementa:** el prompt 2 construye la dirección elegida usando solo tu contenido.
4. **Ajusta detalles:** el prompt 3 diagnostica primero y corrige solo lo que apruebas.
5. **Revisa en computador y móvil:** el prompt 4 prueba la web en 375, 768 y 1280 px.

Cada prompt indica qué completar, qué archivos consultar, qué entregar y cómo comprobarlo, y le pide a Claude que avise si le falta una integración.

## Claude Code o Claude en el navegador

Los comandos de instalación son para **Claude Code** (se ejecuta en una terminal dentro de tu proyecto). En claude.ai solo puedes subir skills como ZIP; el soporte de Figma MCP y Playwright MCP en claude.ai **no se verificó**. La guía explica las diferencias paso a paso.

**Fuentes oficiales:** [Emil Kowalski](https://github.com/emilkowalski/skills) · [Impeccable](https://impeccable.style/) · [Taste](https://github.com/Leonxlnx/taste-skill) · [Figma MCP](https://developers.figma.com/docs/figma-mcp-server/) · [Playwright MCP](https://github.com/microsoft/playwright-mcp).
