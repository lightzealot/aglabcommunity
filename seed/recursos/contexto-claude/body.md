Ordena lo que le das a Claude antes de pedirle algo: instrucciones, archivos, herramientas, memoria y ejemplos del resultado. Fecha de consulta de las fuentes: **19 de octubre de 2026**. Abajo puedes descargar el PDF completo, el checklist y el prompt de auditoría. Los ejemplos usan un proyecto ficticio (Café Brisa Norte).

**Artículo base:** [The new rules of context engineering for Claude 5 generation models](https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models) (publicado el 24 de julio de 2026; el enlace redirige a una dirección de `claude.dev`, y esta guía se apoya en la documentación de [code.claude.com](https://code.claude.com/docs/en/memory)).

## El «80 %»: qué significa y qué no

Según el artículo, Anthropic quitó **más del 80 % de la instrucción del sistema de Claude Code** para modelos como Opus 5 y Fable 5, sin pérdida medible en sus evaluaciones internas. Es una afirmación de la empresa, sin definir la medida ni replicada aquí.

**No implica borrar el 80 % de tus instrucciones:** es otra capa (tus convenciones, trampas y restricciones) y un porcentaje no distingue lo obsoleto de una restricción de seguridad. La pregunta útil, de la documentación: *«¿quitar esta línea haría que Claude cometa errores?»* Si no, sobra.

## Los 5 cambios

**1. Menos órdenes, más autonomía.** Cambia prohibiciones absolutas de estilo por la forma de trabajar que esperas.
- Antes: `NUNCA escribas comentarios. NUNCA hagas funciones de más de 20 líneas.`
- Después: `Escribe código que siga el estilo del código que lo rodea. Comenta solo lo que no se entiende leyendo.`
- Ojo: **las restricciones de seguridad se conservan**.

**2. Herramientas e interfaces útiles.** Mejor una herramienta bien diseñada que diez ejemplos.
- Antes: 10 ejemplos de cómo llamar a un script. Después: `python registrar.py --ayuda` y estados cerrados (`pendiente | en_preparacion | entregado`).

**3. Contexto en archivos que se consultan cuando hacen falta.** `CLAUDE.md` corto (menos de 200 líneas); procedimientos en skills; reglas por ruta para ciertos archivos.
- Ojo: **importar con `@` no ahorra contexto**, lo importado también se carga al empezar.

**4. Memoria.** Claude guarda notas por su cuenta (sobre ti, correcciones, decisiones y referencias); en `CLAUDE.md` deja lo estable.
- Se ve y se activa con `/memory`; ajuste `autoMemoryEnabled`; variable `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1`.
- Límites: solo se cargan las **primeras 200 líneas o 25 KB** de `MEMORY.md`; es **local a tu equipo**; no se comparte.

**5. Referencias concretas.** Un mockup, una prueba o una rúbrica valen más que una descripción.
- Antes: «hazme una página de pedidos bonita». Después: `Referencia: @mockups/pedidos.html. Debe pasar: @pruebas/pedido-completo.test.js. Revisa con @docs/rubrica-pagina.md.`

## Dónde va cada cosa

| ¿Qué es? | Va en |
|---|---|
| Debe cumplirse sí o sí | Permiso o hook |
| Aplica a todo | `CLAUDE.md` (corto) |
| Solo a ciertos archivos | Regla por ruta (`.claude/rules/`) |
| Un procedimiento | Skill con referencias aparte |
| Material de consulta | `docs/`, `referencias/` (con `@`) |
| Se aprende trabajando | Memoria automática |

`CLAUDE.md` es contexto, **no** configuración que se hace cumplir: lo crítico va como permiso o hook.

## `/doctor`: lo verificado

| Comando | Qué hace según la documentación | Cambia archivos |
|---|---|---|
| `/doctor` | Chequeo de configuración (instalación, extensiones, `CLAUDE.md`, permisos) | Informa y pide confirmación |
| `claude doctor` | Diagnóstico de instalación en la terminal | No (solo lectura) |
| `/doctor prompt-audit [ruta]` | Audita instrucciones; informe con ediciones propuestas | No hasta que lo pidas. Requiere **v2.1.283+** |

El artículo lo presenta como simplificación automática y mezcla los nombres; la documentación habla de **informe y confirmación**. No hay limpieza automática universal. No se ejecutó ningún comando.

## Plantilla breve de CLAUDE.md

```markdown
# Café Brisa Norte: web de pedidos
## Qué es
Web para pedir y recoger. Un solo local. Datos de ejemplo ficticios.
## Comandos
- `npm run dev` · `npm test` (antes de dar algo por terminado) · `npm run lint`
## Forma de trabajar
- Sigue el estilo del código que lo rodea.
- En cambios de varios archivos, resume el plan y espera mi confirmación.
- Al terminar, muestra la salida de las pruebas.
## Trampas
- Los precios viven en `src/precios.ts`; solo se cambian con aprobación del dueño.
- La hora de recogida usa la zona horaria del local.
## Seguridad (se conserva siempre)
- Nunca escribas claves; se leen de variables de entorno.
- No leas ni modifiques `.env` ni datos de clientes.
- Nada de borrados masivos ni `git push` sin que lo pida.
## Detalle (se consulta cuando hace falta)
- Revisión de entregas: skill `revisar-entrega` · Reglas de pedidos: `.claude/rules/pedidos.md`
```

## Checklist: qué recortar

- **Duplicadas:** ¿la misma regla en `CLAUDE.md`, una skill y una regla por ruta?
- **Contradictorias:** ¿dos instrucciones incompatibles («siempre pregunta» / «nunca interrumpas»)?
- **Obsoletas:** ¿archivos o comandos que ya no existen, o reglas pensadas para modelos antiguos?
- **Innecesarias:** ¿lo que Claude deduce leyendo el proyecto, o frases como «escribe código limpio»?
- **Se conservan:** seguridad, privacidad, permisos y lo que no se deduce del código.

## Prompt de auditoría (modo lectura)

```text
Actúa como auditor de instrucciones en MODO LECTURA: no modifiques, crees ni borres nada ni instales nada.
Carpeta: [RUTA]. Revisa CLAUDE.md, CLAUDE.local.md, AGENTS.md, .claude/rules/, .claude/skills/.
1) Inventario: archivo, líneas y cuándo se carga. 2) Clasifica cada instrucción: duplicada, contradictoria, obsoleta (verifica leyendo), innecesaria, necesaria o de seguridad.
3) Por hallazgo: archivo y línea, evidencia y propuesta (conservar, reescribir como estándar de trabajo, mover a skill o regla, convertir en permiso/hook, eliminar).
4) Nunca propongas quitar restricciones de seguridad. 5) Si no puedes comprobar algo, escribe «no verificado». No apliques cambios: pregúntame cuáles aprobar.
```

## Comparar antes y después

Guarda una copia de tus instrucciones; elige 5–8 tareas reales y repetibles; define requisitos de aceptación; ejecútalas 2–3 veces antes y después de **un solo** cambio, anotando requisitos cumplidos, correcciones que hiciste y el tamaño de contexto (`/context`). Si no hay mejora, también es un resultado. No inventes pruebas ni testimonios.
