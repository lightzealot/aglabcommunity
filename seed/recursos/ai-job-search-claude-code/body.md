AI Job Search es un framework **gratis y de código abierto** que convierte Claude Code en tu asistente de búsqueda de empleo: arma tu perfil desde tu currículum, busca ofertas, te las ordena según cuánto encajas, escribe un CV y una carta a medida, los hace revisar por un segundo agente que actúa como reclutador y te prepara para la entrevista. Aquí tienes cómo instalarlo y usarlo paso a paso.

**Antes de empezar:** el framework es gratis (licencia MIT), pero **Claude Code no tiene plan gratuito**. Necesitas una suscripción Claude Pro, Max o Team, o créditos de la API de Anthropic. Es un proyecto independiente: no es de Anthropic ni está afiliado a ella.

## Qué es y por qué funciona

Lo creó un geofísico cuando eliminaron su puesto a finales de 2025. Lo usó cada semana en su propia búsqueda y, según cuenta en el README, hizo **69 postulaciones a medida, consiguió 20 primeras entrevistas y firmó un contrato**. Empezó como ingeniero de IA en junio de 2026.

| Dato | Valor (al 19 de nov. de 2026) |
|---|---|
| Estrellas en GitHub | 72.6k |
| Forks | 23.3k |
| Licencia | MIT |
| Versión actual | v2.0.0 |
| Dónde corre | En tu computadora, con tus archivos |

=> [Abrir el repositorio en GitHub](https://github.com/ai-job-search-dev/ai-job-search)

## Paso 0. Lo que necesitas

- **Claude Code:** la herramienta de línea de comandos, con plan Pro, Max o Team, o créditos de la API.
- **Python 3.10 o superior:** para las herramientas de la carpeta `tools/`.
- **LaTeX** con `lualatex` y `xelatex` (TeX Live, MacTeX, TinyTeX o MiKTeX): es lo que compila tu CV y tu carta en PDF.
- **Bun:** solo si vas a usar portales de empleo de la comunidad.
- **pypdf (opcional):** `pip install pypdf`, para revisar que tu CV se lea bien en los sistemas ATS.

## Paso 1. Haz tu copia privada

Tu perfil va a guardar datos personales (nombre, contacto, historial, expectativas de sueldo). Por eso **no hagas un fork**: los forks de repos públicos siempre son públicos. Haz una copia privada:

```
gh repo clone ai-job-search-dev/ai-job-search
cd ai-job-search
git remote rename origin upstream
gh repo create ai-job-search --private --source=. --remote=origin --push
```

Si no usas la herramienta `gh` de GitHub, descarga el código como `.zip` y trabaja en esa carpeta sin subirla a ningún repo público.

## Paso 2. Arma tu perfil con /setup

Abre Claude Code dentro de la carpeta y ejecuta el comando:

```
claude
/setup
```

Tienes tres caminos y el comando detecta cuál te sirve:

- **Carpeta `documents/`:** pon ahí tu CV en PDF, tu exportación de LinkedIn, diplomas, cartas de referencia o postulaciones antiguas. Puedes volver a correrlo cuando agregues más.
- **Pegar tu CV** directamente en el chat.
- **Entrevista:** te hace preguntas y arma el perfil con tus respuestas.

**Consejo clave:** cuanto más detalle des, mejor salen las postulaciones. No pongas solo cargos: cuenta proyectos, herramientas, logros con números y qué te gustó o te agotó de cada trabajo.

## Paso 3. Busca ofertas con /scrape y /rank

```
/scrape
```

Busca en portales de empleo ofertas que encajen con tu perfil, quita duplicados y te las presenta ordenadas por encaje. Si no instalaste ningún portal, busca con la búsqueda web de Claude.

- Si salen muchas, usa `/rank` para puntuarlas todas y quedarte con una lista corta.
- Para tu país, busca tu portal en el repo [community-portals](https://github.com/ai-job-search-dev/community-portals) o crea uno con `/add-portal`. **Lee el código** de cualquier portal antes de usarlo: corre en tu máquina con tus datos.
- Para cambiar qué buscas (cargos, ciudades, habilidades) sin rehacer todo: `/setup --section search`.

## Paso 4. Postula con /apply

Pásale el link de la oferta, o pega la descripción si el portal bloquea el acceso:

```
/apply https://link-de-la-oferta
```

Esto es lo que hace, en orden:

1. Lee la oferta y la pasa por un **filtro de seguridad** (texto oculto, caracteres invisibles, instrucciones escondidas).
2. **Evalúa el encaje** con tu perfil: habilidades, experiencia, cultura, ubicación y rumbo profesional.
3. Escribe un **CV y una carta a medida** en LaTeX.
4. Lanza un **segundo agente revisor** que investiga la empresa y critica los borradores, como haría un reclutador.
5. **Corrige** según esa crítica.
6. Compila los PDF y los revisa: el CV en **2 páginas exactas** y la carta en **1 página**.
7. Comprueba que el CV se lea bien en un **sistema ATS** y mide qué palabras clave de la oferta cubre.

Todo lo que pone en el CV se contrasta con tu perfil real: **no inventa habilidades ni experiencia**.

## Paso 5. Prepara la entrevista con /interview

```
/interview
```

Arma un paquete de preparación para la etapa de la entrevista en la que estés y te hace un **simulacro de entrevista**. Llévale tus ejemplos reales en formato STAR para que las respuestas suenen a ti.

## Más comandos útiles

| Comando | Qué hace |
|---|---|
| `/outcome` | Registra resultados, archiva lo que mandaste y redacta seguimientos |
| `/gmail-sync` | Propone actualizar el estado de tus postulaciones desde Gmail |
| `/notion-sync` | Publica una vista de solo lectura de tu búsqueda en Notion |
| `/html-report` | Genera un panel sin conexión con tus postulaciones |
| `/upskill` | Detecta tus brechas de habilidades y arma un plan de aprendizaje |
| `/add-template` | Usa tu propia plantilla de CV o de carta |
| `/reset` | Borra tu perfil o tus documentos (pide escribir RESET para confirmar) |

## El prompt para empezar con buen pie

Cuando termines `/setup`, pídele esto a Claude Code para afinar tu perfil antes de postular:

```
Revisa mi perfil completo y dime: 1) qué experiencias describí sin logros medibles, 2) qué habilidades menciono sin contexto de dónde las usé y 3) tres tipos de puesto que encajan con mi historial y que quizá no estoy considerando. Hazme preguntas para completar lo que falte, una por una.
```

## Antes de mandar tu primera postulación

- **Revisa todo antes de enviar:** el agente puede equivocarse. Lee el CV y la carta como si los hubiera escrito otra persona.
- **Ofertas como texto no confiable:** el framework no sigue instrucciones escondidas en las ofertas, pero en portales que no conoces, mira lo que descargó antes de enviar.
- **Tus datos se quedan en tu máquina:** mantén tu copia privada.
- **Sé transparente si te preguntan:** el autor contó en cada entrevista que usaba este sistema y, según dice, eso abrió conversaciones técnicas en vez de restarle.

**¿Te ayudo a adaptarlo a tu búsqueda? Escríbeme TRABAJO a @andresgomez.ia.**
