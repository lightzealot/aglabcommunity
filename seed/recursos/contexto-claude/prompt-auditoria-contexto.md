# Prompt de auditoría de contexto (modo lectura)

Complemento de la guía «CONTEXTO: organiza tus instrucciones para trabajar mejor con Claude». Fecha de consulta de las fuentes: 19 de octubre de 2026.

## Prompt de auditoría en modo lectura

Este prompt está escrito para no modificar nada: solo lee, informa y propone. Sustituye los campos entre corchetes.

```text
Actúa como auditor de instrucciones. Trabaja en MODO LECTURA: no modifiques, crees, muevas ni borres ningún archivo, no ejecutes comandos que cambien algo y no instales nada. Si necesitas ejecutar algo, dímelo y espera.

Carpeta a auditar: [RUTA DEL PROYECTO]
Archivos de instrucciones: CLAUDE.md, CLAUDE.local.md, AGENTS.md, .claude/rules/, .claude/skills/, .claude/agents/ y los que yo indique: [OTROS ARCHIVOS].
Modelo y versión que uso: [MODELO Y VERSIÓN].

Tarea:
1. Haz un inventario: lista cada archivo con su número de líneas y cuándo se carga (siempre, por ruta o al usarlo).
2. Revisa cada instrucción y clasifícala en una de estas categorías:
   - Duplicada (dónde está repetida).
   - Contradictoria (con qué otra instrucción choca).
   - Obsoleta (menciona archivos, comandos o conductas que ya no existen o fueron pensadas para modelos anteriores; verifica leyendo, no supongas).
   - Innecesaria (puede deducirse leyendo el proyecto, es genérica o está explicada en una herramienta).
   - Necesaria (la quita y el trabajo falla) o De seguridad/privacidad/permisos (se conserva siempre).
3. Para cada hallazgo entrega: archivo y línea, cita corta, categoría, evidencia (qué leíste para afirmarlo) y propuesta: conservar, reescribir como estándar de trabajo, mover a skill o regla por ruta, convertir en permiso o hook, o eliminar.
4. No propongas quitar ninguna restricción de seguridad, privacidad o permisos. Si una instrucción importante solo existe como frase, propón reforzarla con un permiso o un hook.
5. Entrega un informe con: resumen (conteos por categoría), tabla de hallazgos ordenada por impacto, propuesta de nueva estructura de carpetas y 3 cambios para empezar.
6. Si no puedes comprobar algo, escribe «no verificado» y explica qué te falta. No inventes archivos, líneas ni resultados.
7. No apliques ningún cambio. Termina preguntándome qué cambios aprobar, de uno en uno.
```

Si tu versión de Claude Code lo admite, la documentación oficial también describe `/doctor prompt-audit [ruta]` (requiere v2.1.283 o posterior), que genera un informe con ediciones propuestas y no cambia nada hasta que lo pidas. Este prompt es una alternativa que puedes usar con cualquier asistente.
