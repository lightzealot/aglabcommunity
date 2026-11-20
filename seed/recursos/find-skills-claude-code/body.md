¿Le pides algo a Claude Code y te lo hace a medias? Muchas veces no es Claude: **le falta la skill correcta**. find-skills es la skill que busca por ti en skills.sh, el directorio abierto de skills de Vercel, te propone las que encajan con lo que quieres hacer y, si le dices que sí, te las instala. Aquí tienes cómo usarla paso a paso y las 10 skills más instaladas del directorio.

## Por qué esta skill

| Dato | Valor (al 20 de nov. de 2026) |
|---|---|
| Instalaciones | 4.5 M (puesto 1 de todo el ranking) |
| Skills en el directorio | 1,477,970 |
| Repositorio | vercel-labs/skills (40.1K estrellas) |
| En skills.sh desde | 26 de enero de 2026 |

Según su SKILL.md, recomienda skills por **número de instalaciones** (prefiere más de 1K), por la **reputación de quien la publica** (fuentes oficiales como Vercel o Anthropic) y por las estrellas en GitHub. Antes de buscar con comandos, mira el ranking de skills.sh.

=> [Ver find-skills en skills.sh](https://skills.sh/vercel-labs/skills/find-skills)

## Lo que necesitas

- **Claude Code** instalado (también funciona con otros agentes: Cursor, Codex, GitHub Copilot, Gemini y más).
- **Node.js**, para usar `npx`.
- Una carpeta de proyecto donde quieras tener tus skills.

## Paso 1. Instala find-skills

Abre la terminal en tu proyecto y pega el comando oficial:

```
npx skills add https://github.com/vercel-labs/skills --skill find-skills
```

## Paso 2. Dile qué quieres hacer

Abre Claude Code y pídelo con tus palabras. Por ejemplo:

```
Busca una skill para editar videos para mis redes. Dame las 3 mejores con sus instalaciones, quién las publica y el comando para instalarlas. No instales nada todavía.
```

También puedes buscar tú mismo con `npx skills find [lo que buscas]`.

## Paso 3. Revisa lo que te propone

- **Instalaciones:** más de 1K es buena señal.
- **Quién la publica:** mejor fuentes oficiales o conocidas.
- **Auditorías:** en la ficha de cada skill en skills.sh revisa las auditorías de seguridad (Gen Agent Trust Hub, Socket, Snyk). Hasta find-skills tiene una advertencia de Snyk: léela antes de instalar.
- **Lee el SKILL.md:** una skill corre en tu máquina, con tus archivos.

```
Antes de instalar [nombre de la skill], lee su SKILL.md y dime qué archivos toca, qué comandos ejecuta y si necesita claves o acceso a internet. Dame tu recomendación en tres líneas.
```

## Paso 4. Instala la que elijas

Dile que sí a la que te convence, o copia su comando. Ejemplo real:

```
npx skills add https://github.com/heygen-com/hyperframes --skill hyperframes
```

Para tener todas al día: `npx skills update`.

## Las 10 skills más instaladas (20 de nov. de 2026)

| # | Skill | Quién la publica | Instalaciones | Para qué sirve |
|---|---|---|---|---|
| 1 | find-skills | vercel-labs | 4.5M | Busca e instala skills |
| 2 | hyperframes-cli | heygen-com | 1.6M | Crea, revisa y renderiza videos de HyperFrames |
| 3 | agent-browser | vercel-labs | 1.6M | Maneja el navegador: navegar, llenar formularios, hacer clic |
| 4 | hyperframes | heygen-com | 1.6M | Videos hechos con HTML: explicativos, lanzamientos, gráficos |
| 5 | grill-me | mattpocock | 1.6M | Te interroga a fondo para afinar un plan o un diseño |
| 6 | design-mobile-apps | designed-by-ai | 1.5M | Diseña pantallas de apps y las pasa a React Native o HTML |
| 7 | media-use | heygen-com | 1.5M | Música, efectos, imágenes, voz y logos para tus videos |
| 8 | reddit-automation | flowkit-labs | 1.5M | Encuentra hilos de Reddit donde piden lo que ofreces y redacta respuestas |
| 9 | hyperframes-registry | heygen-com | 1.4M | Unos 450 bloques listos: transiciones, títulos, subtítulos |
| 10 | grill-with-docs | mattpocock | 1.4M | Como grill-me, pero va documentando las decisiones |

El ranking cambia cada día: revísalo en skills.sh antes de instalar.

=> [Abrir el ranking de skills.sh](https://skills.sh/)

**¿Quieres que te diga qué skill te sirve? Escríbeme SKILLS a @andresgomez.ia.**
