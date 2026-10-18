# Prompts de TOOLKIT: investigación, redacción y brief visual

Complementa la guía «TOOLKIT: 14 herramientas de IA y la función de cada una». Fecha de consulta de la guía: 17 de octubre de 2026.

## Prompts

Los campos entre corchetes son los que debes completar antes de usar cada prompt.

### Prompt de investigación

```text
Actúa como investigador. Tema: [TEMA]. Público: [PÚBLICO]. Enlace de partida: [URL].

Entrega:
1. Cinco hallazgos, cada uno con su fuente (enlace) y una frase sobre qué dice exactamente la fuente.
2. Lo que las fuentes no confirman o se contradice entre ellas.
3. Una lista de afirmaciones que yo debo verificar antes de publicar.
4. Dos preguntas que el público probablemente haría.

Reglas: no inventes datos, cifras ni enlaces. Si no puedes verificar algo, escribe «no confirmado». Responde en español neutro.
```

### Prompt de redacción

```text
Redacta tres piezas a partir de esta investigación verificada: [PEGAR INVESTIGACIÓN Y FUENTES].

Piezas: 1) carrusel de [NÚMERO] diapositivas con título y texto de cada una; 2) caption de máximo [NÚMERO] palabras con una llamada a la acción que pida comentar la palabra [PALABRA CLAVE]; 3) boletín de [NÚMERO] palabras.

Estilo: español neutro, tuteo, sin voseo; frases cortas; explica cada término técnico la primera vez que aparezca; evita anglicismos innecesarios y, si usas uno (por ejemplo «prompt» o «workflow»), explícalo; sin promesas de resultados; no inventes datos, nombres ni cifras. Cada dato debe tener su fuente al final.

Al terminar, evalúa tu propio borrador con la rúbrica de cinco criterios y dime la puntuación.
```

### Prompt de brief visual

```text
Escribe un brief visual para [TIPO DE PIEZA: portada, infografía, gráfico animado].

Contexto: [IDEA CENTRAL EN UNA FRASE]. Formato: [4:5, 9:16 o 16:9]. Paleta: [COLORES]. Estilo: [PLANO, ILUSTRADO, MINIMALISTA]. Espacio reservado para texto: [DÓNDE]. Elementos obligatorios: [LISTA]. Prohibido: texto largo dentro de la imagen, logotipos de marcas, personas reconocibles.

Entrega: 1) una descripción de la imagen en un párrafo, 2) una lista de elementos por capa, 3) el prompt final para la herramienta [GPT Image 2 / Gemini / Higgsfield], 4) tres comprobaciones para revisar el resultado.
```

---

## Rúbrica de cinco revisores (método propuesto)

Es un método propuesto, no un estándar: puede usarse con una sola IA haciendo cinco pasadas, con cinco conversaciones distintas o con una persona. Cada criterio vale 20 puntos; el total es 100. **Si el total es menor de 95, la pieza vuelve a revisión.**

| Revisor | Criterio | 20 puntos si… |
|---|---|---|
| 1. Precisión | Datos y fuentes | Cada dato tiene fuente abierta y verificada; no hay cifras sin respaldo. |
| 2. Claridad | Estructura | Una idea por diapositiva o párrafo; se entiende sin contexto previo. |
| 3. Utilidad | Aplicación | El lector puede ejecutar al menos un paso concreto tras leer. |
| 4. Voz y español | Lenguaje | Español neutro con tuteo, términos técnicos explicados y sin muletillas. |
| 5. Honestidad | Promesas y límites | Sin promesas de resultados; límites, costos y requisitos mencionados. |

**Prompt para aplicar la rúbrica**

```text
Evalúa este borrador: [PEGAR BORRADOR]. Actúa como cinco revisores independientes: Precisión, Claridad, Utilidad, Voz y español, Honestidad. Para cada uno: puntuación sobre 20, la razón en dos frases y los cambios concretos para llegar a 20. Suma el total sobre 100. Si el total es menor de 95, reescribe el borrador aplicando los cambios y vuelve a puntuar. No inventes datos.
```
