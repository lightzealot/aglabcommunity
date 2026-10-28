Una guía para configurar **Harvey**, el agente de ventas de código abierto de ethanplusai, para tu negocio, y para revisar tus primeros borradores de correo **antes de que salga ninguno**. Incluye un `Brief-HARVEY.md` editable, cuatro prompts para copiar y una checklist de tres borradores. Abajo descargas el PDF, la guía editable, el brief y los prompts.

**Qué se comprobó y qué no:** la guía se escribió leyendo el repositorio oficial ([ethanplusai/harvey](https://github.com/ethanplusai/harvey)) el **28 de octubre de 2026**: versión **0.3.0**, commit **4237f07**. **No se instaló Harvey, no se ejecutó ningún comando, no se conectó ninguna cuenta y no se envió ningún mensaje.** Los pasos específicos de Windows no vienen en el README y están marcados como no verificados. No es el Harvey de los asistentes jurídicos: es el proyecto de código abierto de ventas.

**Qué no promete:** respuestas, reuniones, ventas ni que los correos lleguen a la bandeja de entrada. Las capturas del repositorio son demos con datos ficticios. Tiene costes externos (buzón, calentamiento, verificador) y usa los límites de tu suscripción de Claude.

## Qué incluye la guía

1. **Qué hace Harvey** y qué resultados no garantiza.
2. **Requisitos y costes:** Python 3.11+, Claude Pro o Max, buzón en dominio dedicado, verificador de correos.
3. **Claude Code frente al chat de Claude.**
4. **Qué comandos solo consultan y cuáles pueden activar envíos**, con la aprobación manual siempre activada (`channels.email.require_approval: true`).
5. **Descargar el repositorio y abrirlo en Claude Code**, con pasos para Windows, macOS y Linux.
6. **Producto, cliente objetivo y ubicación**, con un ejemplo ficticio de sistemas de reservas para negocios pequeños.
7. **Configurar el correo** con el flujo oficial y comprobar el calentamiento.
8. **Fuentes y señales** para encontrar empresas, empezando por lo gratuito.
9. **Borradores:** revisar, editar, rechazar y aprobar uno a uno.
10. **Pausar envíos y revisar respuestas** en el panel.

## Los cuatro prompts

1. **Diagnóstico e instalación:** solo lectura; nada se instala sin tu "sí".
2. **Configuración del negocio:** traslada tu brief a la configuración sin inventar datos.
3. **Revisión de tres borradores:** destinatario, evidencia, oferta, personalización y tono.
4. **Evaluación del seguimiento:** conteos reales, sin inventar tasas de respuesta.

Todos prohíben arrancar Harvey, conectar cuentas, abrir tu `.env` o aprobar correos por ti.

**Fuentes oficiales:** [Repositorio](https://github.com/ethanplusai/harvey) · [README](https://github.com/ethanplusai/harvey/blob/main/README.md) · [CLAUDE.md](https://github.com/ethanplusai/harvey/blob/main/CLAUDE.md) · [pyproject.toml](https://github.com/ethanplusai/harvey/blob/main/pyproject.toml) · [harvey.yaml](https://github.com/ethanplusai/harvey/blob/main/harvey.yaml) · [Claude Code](https://code.claude.com/docs/en/setup).
