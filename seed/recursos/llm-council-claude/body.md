¿Claude te da la razón en todo? Pregúntale si tu idea es genial y te arma un argumento impecable. Pregúntale por qué es malísima y te arma otro igual de convincente. **LLM Council** cambia eso: es una skill gratis, creada por Ole Lehmann y basada en el método LLM Council de Andrej Karpathy, que pasa tu pregunta por **cinco asesores con miradas distintas**, hace que se revisen entre sí sin saber quién escribió qué y termina con **un veredicto y un solo paso claro**.

=> [Ver la skill en GitHub](https://github.com/aiwithremy/claude-skills-llm-council)

**Funciona en:** Claude Code y Claude Cowork (claude.ai). Tiene más de 3.000 estrellas en GitHub (3.192 el 21 de noviembre de 2026).

## Cómo instalarla (sin terminal)

**Opción 1. Que Claude la instale por ti.** Abre un chat nuevo en Claude y pega esto:

```
Instálame esta skill de Claude. El archivo SKILL.md está en este repositorio de GitHub: https://github.com/aiwithremy/claude-skills-llm-council

Déjala lista para que pueda usarla y guíame en lo que necesites de mí.
```

**Opción 2. Descarga el archivo y pídele que la configure.**

1. Entra al repositorio y abre el archivo `SKILL.md`.
2. Descárgalo con el botón de descarga de la derecha.
3. Abre Claude y pega esto:

```
Acabo de descargar un archivo llamado SKILL.md de la skill LLM Council. ¿Me ayudas a instalarla? Dime dónde tengo que ponerla.
```

## Cómo usarla

La skill responde a frases en inglés. En cualquier conversación escribe una de estas, seguida de tu pregunta:

| Frase | Para qué |
|---|---|
| `council this` | Pasar tu pregunta por el consejo |
| `run the council on [tu pregunta]` | Lo mismo, con la pregunta en la misma línea |
| `pressure-test this` / `stress-test this` | Poner a prueba una idea o un plan |
| `war room this` | Decisiones urgentes con mucho en juego |

Puedes escribir tu pregunta en español: los asesores te responden sobre lo que les pidas.

## Los cinco asesores

| Asesor | Qué hace |
|---|---|
| **1. El que lleva la contra** | Busca lo que va a matar tu idea. Da por hecho que hay un fallo fatal y lo persigue. |
| **2. El de primeros principios** | Ignora tu pregunta y te pregunta qué intentas resolver de verdad. A veces te dice que estás preguntando lo equivocado. |
| **3. El expansionista** | Busca el potencial que tú no ves: qué pasa si sale todavía mejor de lo esperado. |
| **4. El de afuera** | No recibe nada de tu contexto. Ve lo obvio que tú ya dejaste de notar. |
| **5. El ejecutor** | Solo le importa qué vas a hacer el lunes por la mañana. Si no hay un primer paso claro, te lo dice. |

Están elegidos para chocar: la contra contra el expansionista (riesgo contra potencial), primeros principios contra el ejecutor (repensarlo todo contra hacerlo ya) y el de afuera en medio, viendo lo que ve alguien nuevo.

## Qué pasa por dentro

1. **Encuadra tu pregunta.** Revisa tus archivos de contexto (por ejemplo `CLAUDE.md` o una carpeta `memory/`) y reescribe la pregunta de forma neutral, con lo que está en juego.
2. **Convoca al consejo.** Lanza los cinco asesores a la vez como subagentes; cada uno responde en 150 a 300 palabras desde su ángulo, sin suavizar.
3. **Revisión anónima.** Mezcla las respuestas como A, B, C, D y E. Cinco revisores dicen cuál es la más fuerte, cuál tiene el mayor punto ciego y qué se les pasó a todas.
4. **El presidente.** Junta todo en un veredicto con cinco partes: en qué coinciden, en qué chocan, los puntos ciegos que salieron en la revisión, la recomendación y **lo primero que tienes que hacer**.

## Preguntas que sí valen la pena

- «¿Lanzo un taller de 97 dólares o un curso de 497?»
- «¿Cuál de estos tres enfoques para mi marca es el más fuerte?»
- «Estoy pensando en pasar de X a Y. ¿Estoy loco?»
- «Esta es la página de mi oferta. ¿Qué está flojo?»
- «¿Contrato a un asistente o primero automatizo?»

Y las que no: preguntas con una sola respuesta («¿cuál es la capital de Francia?»), tareas de crear («escríbeme un post») o de procesar («resume este artículo»). El consejo sirve cuando hay duda de verdad y equivocarte sale caro.

## Plantilla para tu primera consulta

```
council this: [tu decisión en una frase].

Contexto: [a qué te dedicas, en qué etapa estás, números que importan].
Opciones que estoy considerando: [A], [B].
Lo que está en juego: [qué pasa si me equivoco].
Lo que ya intenté: [si aplica].
```

## Ten en cuenta

- Cada consulta lanza unos once subagentes (cinco asesores, cinco revisores y el presidente), así que **gasta más uso que una pregunta normal**. Guárdala para las decisiones que importan.
- Si ya sabes la respuesta y solo quieres que te den la razón, el consejo probablemente te diga lo que no quieres oír. Esa es la idea.
- Es un proyecto de terceros: el repositorio puede cambiar. Revisa el `SKILL.md` antes de instalarlo.

**¿Qué decisión le pasarías al consejo? Cuéntamela en @andresgomez.ia.**
