# Checklist CUA

- [ ] Mi sistema cumple el requisito (macOS 26+, Windows 11 en vista previa o Ubuntu 24.04).
- [ ] Tengo un agente compatible instalado.
- [ ] Revisé el instalador antes de ejecutarlo.
- [ ] `cua agents detect` muestra mi agente.
- [ ] Concedí los permisos que pidió el sistema.
- [ ] Reinicié el agente y `cua agents status` lo muestra configurado.
- [ ] La prueba de la calculadora mostró 42 y el agente dijo a qué escritorio se conectó.
- [ ] Probé solo con tareas sin datos sensibles.
- [ ] Sé cómo deshacerlo: `cua agents remove --dry-run`.

## Prompt de prueba

Lista los computadores o Spaces disponibles. Dime a cuál te vas a conectar antes de actuar. En ese escritorio, abre la calculadora, calcula 6 × 7 y comprueba visualmente que muestra 42. Al terminar, dime qué verificaste.
