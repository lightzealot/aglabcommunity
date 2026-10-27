# DISEÑO: guía para mejorar tus webs con Claude

Guía práctica + BRIEF + prompts. Por Andrés Gómez, @andresgomez.ia.

Esta guía responde una pregunta: **¿qué skill instalo primero y cómo la configuro para mi proyecto?** La respuesta corta: no instales todo. Empieza con una sola herramienta según lo que necesites (sección 2), llena el BRIEF (sección 6) y usa los prompts (sección 7).

**Qué se comprobó y qué no.** Las instrucciones salen de las fuentes oficiales, consultadas el **27 de octubre de 2026**. Comprobé en mi computador (Windows 10, Node 22.17, Claude Code 2.1.278) que: el comando de Playwright MCP se agrega y el servidor aparece como conectado; `npx skills@latest` existe y lista las 15 skills de Emil Kowalski; `npx impeccable` existe y muestra sus comandos. **No instalé** Emil Kowalski, Impeccable, Taste ni Figma MCP en mi proyecto, y **no probé** cómo se ven los resultados. Lo que no pude verificar está marcado como "no verificado". Los resultados dependen de tu proyecto, tu equipo y las versiones actuales de cada herramienta; si algo cambió, manda la documentación oficial (sección 10).

## 1. Qué es una skill y qué es un servidor MCP

**Una skill** es una carpeta con instrucciones (un archivo `SKILL.md`) que Claude lee para hacer mejor una tarea concreta. Piensa en un manual de estilo: no agrega botones nuevos a Claude, le da criterio. Ejemplo: una skill de animaciones le enseña cuándo animar y con qué duración.

**Un servidor MCP** es un conector que le da a Claude una capacidad nueva: abrir un navegador, leer un diseño de Figma. Piensa en un enchufe: sin él, Claude no puede hacer esa acción.

| | Skill | Servidor MCP |
|---|---|---|
| Qué aporta | Criterio e instrucciones | Una capacidad (acciones reales) |
| Ejemplo en esta guía | Emil Kowalski, Impeccable, Taste | Figma MCP, Playwright MCP |
| Cómo se instala | Con un comando o desde un menú de plugins | Con `claude mcp add` o un plugin |
| Qué pasa si falta | Claude trabaja con su criterio general | Claude no puede hacer esa acción y debe decírtelo |

**Qué es Claude Code.** No es el chat de Claude. Es un programa que abres en una terminal, dentro de la carpeta de tu proyecto. Lee tus archivos, los edita y ejecuta comandos, y te pide aprobación antes de cambiar algo. Esta guía usa Claude Code para casi todo.

## 2. Por dónde empezar

No tienes que instalar las cinco. Elige según tu situación.

| Herramienta | Tipo | Úsala cuando... | Obligatoria? |
|---|---|---|---|
| **Taste** | Skill | Vas a crear una web desde cero y no tienes dirección visual (colores, tipografía, estilo) | No. Recomendada si empiezas de cero |
| **Impeccable** | Skill + comandos | Ya tienes una web y quieres revisar composición, tipografía, colores y consistencia | No. Recomendada si ya tienes web |
| **Emil Kowalski** | Skills | La web ya se ve bien y quieres cuidar animaciones, transiciones e interacciones | No. Déjala para el final |
| **Figma MCP** | MCP | Alguien ya hizo el diseño en Figma y quieres que Claude lo lea para implementarlo | No. Solo si usas Figma |
| **Playwright MCP** | MCP | Quieres que Claude abra tu web en un navegador, haga clic y revise cómo se ve | No. Muy útil para revisar, pero opcional |

**Regla para decidir en 30 segundos**

1. No tengo web ni diseño: empieza con **Taste**.
2. Tengo una web que se ve genérica o desordenada: empieza con **Impeccable**.
3. Tengo un diseño en Figma: empieza con **Figma MCP**.
4. Mi web está bien pero se siente "dura": añade **Emil Kowalski**.
5. En cualquier caso, **Playwright MCP** te ayuda a comprobar el resultado.

**Mi recomendación para un principiante sin diseño:** Taste para la dirección, Playwright MCP para revisar. Con eso ya completas el flujo de la sección 5. Si ya tienes web: Impeccable y Playwright MCP.

Y si no quieres instalar nada, puedes seguir la guía igual: los prompts de la sección 7 le piden a Claude que avise si falta una herramienta y trabaje con lo que sí tiene.

## 3. Instalación paso a paso

### Antes de empezar

1. **Cuenta de Claude con Claude Code.** Necesitas un plan que lo incluya (Pro, Max, Team, Enterprise) o una cuenta de Console con créditos. Los precios cambian: míralos en claude.com/pricing.
2. **Node.js.** Todos los comandos de esta sección usan `npx`, que viene con Node.js. Taste pide Node 22 o superior. La herramienta `skills` (usada por Emil Kowalski) pide Node 22.20 o superior: con Node 22.17 funcionó en mi prueba, pero mostró una advertencia de versión. Comprueba la tuya:

```bash
node -v
npx -v
```

Si ambos muestran un número, sigue. Si dice "no se reconoce el comando", instala Node.js desde nodejs.org y abre una terminal nueva.

3. **Claude Code instalado.** Si no lo tienes, el comando oficial en Windows (PowerShell) es `irm https://claude.ai/install.ps1 | iex` y en Mac, Linux y WSL es `curl -fsSL https://claude.ai/install.sh | bash`. Comprueba con:

```bash
claude --version
```

4. **Dónde ejecutar cada cosa.** Hay dos tipos de comandos:
   - **Comandos de terminal** (empiezan por `npx` o `claude`): se escriben en una terminal, dentro de la carpeta de tu proyecto.
   - **Comandos con barra** (empiezan por `/`, como `/plugin`): se escriben dentro de Claude Code, después de ejecutar `claude`.

Para abrir Claude Code en tu proyecto: abre la terminal, entra a la carpeta (`cd ruta/de/tu-proyecto`) y escribe `claude`.

### Opción A. Taste (dirección visual inicial)

Dentro de Claude Code:

```text
/plugin marketplace add Leonxlnx/taste-skill
/plugin install taste-skill@taste-skill
```

Alternativa desde la terminal (cualquier agente):

```bash
npx skills add https://github.com/Leonxlnx/taste-skill --skill "design-taste-frontend"
```

**Requisitos según su repositorio:** Node 22 o superior y Chrome, Edge o Chromium. Sin claves de API. La página dice que necesita red solo para buscar imágenes.

**Cómo comprobar:** reinicia Claude Code y escribe `/plugin`. Taste debe aparecer en la pestaña de plugins instalados. Con la alternativa de `npx`, la skill queda en las carpetas de skills de tu proyecto. Si Claude no la reconoce, reinicia la sesión.

**Cómo usarla:** el repositorio no documenta un comando propio. Dale a Claude el BRIEF y pídele usar la skill `design-taste-frontend` (en Claude Code puede aparecer como `taste-skill:`). El prompt 1 de la sección 7 ya lo hace.

**Importante:** el repositorio describe un proceso largo que construye la página completa. Eso no garantiza un resultado ni un tiempo. Por eso el prompt 1 le pide a Claude que solo **proponga** la dirección y se detenga.

### Opción B. Impeccable (revisión de diseño)

Dentro de Claude Code:

```text
/plugin marketplace add pbakaus/impeccable
```

Luego escribe `/plugin`, entra a **Discover** e instala **Impeccable**.

Alternativa desde la terminal, en la carpeta del proyecto (seguir las preguntas que aparecen):

```bash
npx impeccable install
```

Después de instalar, reinicia Claude Code y configura el proyecto:

```text
/impeccable init
/impeccable hooks on
```

`hooks on` activa revisiones automáticas. Tu herramienta te pedirá aprobar los hooks: léelo antes de aceptar. Si no quieres revisiones automáticas, omite ese paso.

**Cómo usarlo:** los comandos son `/impeccable <comando>`. Según su página, incluyen `critique` y `audit` (evaluar), y `typeset`, `layout`, `colorize`, `adapt`, `polish` (refinar). La página tiene una lista más larga; la agrupación exacta no pude verificarla. Ejemplo:

```text
/impeccable critique
```

**Cómo comprobar:** escribe `/impeccable` en Claude Code; deben aparecer sus comandos. Desde la terminal, `npx impeccable help` lista las skills y comandos disponibles (lo comprobé).

**Opcional sin instalar skills:** el CLI tiene `npx impeccable detect [carpeta]`, que escanea problemas de diseño en el código. Lo vi en su ayuda, pero no lo ejecuté sobre un proyecto real, así que no sé qué tan útil es en el tuyo.

### Opción C. Emil Kowalski (animaciones e interacciones)

En la terminal, dentro del proyecto:

```bash
npx skills@latest add emilkowalski/skills
```

La herramienta te preguntará en qué agentes instalar. Elige Claude Code. Para ver qué incluye antes de instalar:

```bash
npx skills@latest add emilkowalski/skills --list
```

Lo ejecuté y encontró **15 skills**. Las más útiles para una web:

| Skill | Para qué |
|---|---|
| `animate` | Crear una animación desde cero y decidir curva y duración |
| `review-animations` | Revisar animaciones que ya tienes |
| `find-animation-opportunities` | Encontrar dónde sí conviene animar y dónde no |
| `animation-performance` | Arreglar animaciones que se traban |
| `break-ui` | Probar tu interfaz con datos extremos (nombres muy largos, listas vacías) |
| `mobile-native` | Hacer que una web se sienta nativa en el teléfono |

No necesitas las 15. Algunas son para stacks concretos (`animate-expo` para Expo, `write-swift` para Swift, `ask-sonner` para la librería Sonner).

**Cómo comprobar:** `npx skills list` muestra las skills instaladas. Reinicia Claude Code y pídele: "¿Qué skills de animación tienes disponibles?".

**Cómo usarla:** el repositorio no documenta un comando de invocación. Pídele a Claude por el nombre: "Usa la skill review-animations para revisar `app/page.tsx`".

### Opción D. Figma MCP (leer un diseño existente)

**Requisitos:** un archivo de Figma al que tengas acceso. Figma indica que escribir en el lienzo fuera de tus borradores requiere un asiento Full; para leer un diseño no verifiqué qué plan o asiento se necesita, así que revísalo en la página oficial.

Recomendado por Figma (en la terminal):

```bash
claude plugin install figma@claude-plugins-official
```

Reinicia Claude Code, escribe `/plugin`, ve a **Installed**, selecciona `figma` y pulsa Enter para iniciar sesión. Se abre una página del navegador: pulsa **Allow access**.

Alternativa manual (no instala las skills de Figma):

```bash
claude mcp add --transport http figma https://mcp.figma.com/mcp
```

Inicia una sesión nueva, escribe `/mcp`, selecciona **figma** y **Authenticate**. Para tenerlo en todos tus proyectos agrega `--scope user`.

**Cómo comprobar:** debe aparecer "Authentication successful. Connected to figma", y `/mcp` debe mostrarlo conectado.

**Cómo usarlo:** copia el enlace de un marco (frame) de Figma y pídele a Claude que implemente ese diseño. Según Figma, también puedes seleccionar el marco y pedir el código; esa opción es del servidor de escritorio y no la comprobé.

**Sobre el servidor de escritorio:** Figma lo describe para necesidades específicas de organizaciones. Para empezar usa el remoto.

### Opción E. Playwright MCP (revisar la web en un navegador)

**Requisito:** Node.js 18 o superior, según su repositorio.

```bash
claude mcp add playwright npx @playwright/mcp@latest
```

Lo ejecuté en una carpeta de prueba: se agregó y, al listar, `claude mcp list` mostró `playwright ... ✔ Connected`. Después lo eliminé. **No probé abrir una página con él.**

**Cómo comprobar:**

```bash
claude mcp list
```

Dentro de Claude Code, `/mcp` también lo muestra. Una prueba sencilla: "Abre https://example.com con Playwright y dime el título de la página".

**Opciones útiles (de su repositorio):** `--headless` ejecuta sin ventana visible; `--browser` elige entre chrome, firefox, webkit y msedge; `--isolated` no guarda el perfil en disco. Para usarlas, añade al comando después de `@playwright/mcp@latest`.

**Seguridad:** el propio repositorio dice que Playwright MCP no es un límite de seguridad. No lo uses para iniciar sesión en tus cuentas personales ni para abrir sitios que no conoces.

### Dónde funciona cada integración

| Herramienta | Claude Code | Claude en el navegador (claude.ai) |
|---|---|---|
| Taste, Impeccable, Emil Kowalski | Sí: se instalan con los comandos de arriba | No se instalan con `npx`. Las skills personalizadas se suben como ZIP desde Customize > Skills (planes Free, Pro, Max, Team, Enterprise, con "Code execution and file creation" activado). No probé subir estas skills |
| Figma MCP | Sí: documentado por Figma | No verificado. La página de Figma que revisé solo documenta Claude Code para esta instalación |
| Playwright MCP | Sí: documentado | No verificado. Funciona como proceso local que lanza tu cliente; no confirmé soporte en claude.ai |

**Qué significa esto en la práctica:** si trabajas solo en el chat de claude.ai, puedes usar el BRIEF y los prompts 1 y 3 (pegando código o capturas), pero no los comandos de instalación ni el prompt 4. Para el flujo completo, usa Claude Code.

### Soluciones a errores comunes

| Error o síntoma | Qué hacer |
|---|---|
| `npx` o `node` "no se reconoce" | Instala Node.js desde nodejs.org y abre una terminal nueva |
| Advertencia `EBADENGINE` con `npx skills` | Tu Node es anterior al que pide la herramienta. Si funciona, puedes continuar; si falla, actualiza Node |
| `claude` "no se reconoce" | Cierra y abre la terminal. Si sigue, reinstala Claude Code con el comando oficial |
| `/plugin` no muestra la herramienta | Reinicia Claude Code. Si tu organización bloquea plugins, pide ayuda a quien la administra o usa la instalación manual |
| El servidor MCP no aparece en `/mcp` | Ejecuta `claude mcp list`. Si no está, repite el comando de `claude mcp add` desde la carpeta correcta |
| Figma pide autenticación y no pasa nada | En `/mcp`, selecciona figma y elige Authenticate. Revisa que tu navegador no bloquee la ventana emergente |
| Claude dice que no tiene la skill | Reinicia la sesión de Claude Code. Pídele "lista las skills disponibles" |
| Playwright dice que falta el navegador | Copia el error completo en Claude y pídele que lo explique. Yo no verifiqué el comando de instalación de navegadores |
| En Windows un servidor `npx` no conecta | Pídele a Claude el error exacto. La guía de Claude Code menciona anteponer `cmd /c` en algunos equipos; no lo necesité en mi prueba |

Si ninguna fila resuelve tu caso: copia el mensaje completo en Claude Code y pídele que lo explique y proponga una solución. No repitas el mismo comando.

## 4. Prepara tu proyecto

Antes del flujo, deja esto listo:

1. Una carpeta de proyecto con tu web (aunque sea un solo `index.html`).
2. Tus imágenes y logo dentro de la carpeta (por ejemplo `public/images/`).
3. El archivo `BRIEF.md` en la raíz del proyecto (sección 6).
4. Si usas Playwright MCP, la web corriendo en tu computador. Ejemplo para un proyecto con Node: `npm run dev`. Anota la dirección que muestra (por ejemplo `http://localhost:3000`).
5. Un respaldo. Si usas Git, haz un commit antes de empezar para poder volver atrás.

Abre la terminal en esa carpeta y escribe `claude`.

## 5. Flujo completo con un ejemplo

**Ejemplo ficticio:** "La Espiga", una panadería artesanal de barrio que quiere recibir pedidos por WhatsApp. No es un cliente real; los datos son solo para mostrar el proceso.

**Paso 1. Completar el brief.** Copia `BRIEF.md` y llénalo. Para La Espiga:

- Negocio: panadería artesanal de barrio.
- Público: vecinos que compran pan fresco y encargos para fiestas.
- Objetivo: que escriban un pedido por WhatsApp.
- CTA: botón "Pedir por WhatsApp".
- Imágenes: 6 fotos propias de panes y del local.
- Referencias: 2 webs de panaderías que le gustan, con lo que le gusta de cada una.
- Tecnología: Next.js, se ejecuta con `npm run dev`.

**Paso 2. Elegir la dirección visual.** Pega el prompt 1. Claude propone tres direcciones y recomienda una. Tú eliges. Ejemplo de decisión: "Dirección 2, pero con el café más oscuro".

**Paso 3. Implementar.** Pega el prompt 2 con tu elección. Claude te muestra primero qué archivos tocará. Revisa y aprueba.

**Paso 4. Ajustar detalles.** Pega el prompt 3 para el diagnóstico: Claude lista problemas con archivo y línea, tú apruebas y él corrige. Si instalaste Emil Kowalski, aquí le pides revisar los botones y transiciones.

**Paso 5. Revisar en computador y móvil.** Pega el prompt 4. Con Playwright MCP, Claude abre la web en 375, 768 y 1280 px, toma capturas y corrige. Sin Playwright, te dirá qué no pudo comprobar y lo revisas tú con la checklist (sección 8) en tu teléfono real.

**Regla de oro:** después de cada paso, mira tú el resultado. Claude puede equivocarse; la revisión final siempre es tuya.

## 6. Plantilla BRIEF.md

Guarda esto como `BRIEF.md` en la raíz de tu proyecto y complétalo. También va como archivo editable aparte.

```text
# BRIEF · [NOMBRE DEL PROYECTO]

> Completa cada campo con datos reales. Si no lo sabes, escribe "por definir": no lo inventes. Guarda este archivo en la raíz de tu proyecto.

## 1. Negocio
- Nombre:
- Qué vende o qué hace (una frase):
- Ciudad o zona donde trabaja:
- Tres palabras que describen su personalidad (ej.: cálido, artesanal, directo):

## 2. Público
- Quién es la persona que entra a la web:
- Qué quiere resolver cuando llega:
- Desde qué dispositivo entra más (móvil, computador, no sé):
- Qué la haría desconfiar:

## 3. Objetivo de la web
- Qué debe pasar después de visitarla (una sola cosa):

## 4. CTA (llamado a la acción)
- Texto exacto del botón principal:
- A dónde lleva (WhatsApp, formulario, teléfono, compra):
- Botón secundario (opcional):

## 5. Contenido
Escribe el texto real o marca "por escribir". Claude no debe inventar precios, cifras, testimonios ni datos de contacto.

| Sección | Texto o contenido disponible |
|---|---|
| Título principal | |
| Subtítulo | |
| Productos o servicios | |
| Precios (solo si son reales) | |
| Sobre el negocio | |
| Contacto y horarios | |
| Preguntas frecuentes | |

## 6. Imágenes disponibles
| Archivo | Qué muestra | Se puede usar? (sí / no / no sé) |
|---|---|---|
| public/images/[archivo] | | |

- Si no tienes imágenes: indica si prefieres espacios reservados, ilustraciones simples o solo tipografía y color.
- Logo: [archivo o "no tengo"]
- Colores de marca: [valores hexadecimales o "no tengo"]
- Tipografías de marca: [nombres o "no tengo"]

## 7. Referencias visuales
Máximo 3. Di qué te gusta de cada una y qué NO quieres copiar.

| Enlace o archivo | Qué me gusta | Qué no quiero copiar |
|---|---|---|
| | | |

- Cosas que no quiero ver en mi web (ej.: fondo oscuro, demasiado texto, íconos genéricos):

## 8. Tecnología del proyecto
- Tipo de proyecto: [HTML y CSS simple / React / Next.js / WordPress / otro / no sé]
- Carpeta del proyecto:
- Archivo donde está la página principal:
- Cómo se ejecuta en tu computador (comando): [ej.: npm run dev / abrir index.html]
- Dirección local donde se ve (ej.: http://localhost:3000):
- Librerías de estilos que ya usa: [Tailwind / CSS propio / no sé]
- Qué NO se debe tocar:

## 9. Herramientas disponibles
Marca solo las que instalaste y comprobaste.
- [ ] Skill de Emil Kowalski
- [ ] Impeccable
- [ ] Taste
- [ ] Figma MCP (enlace del diseño: )
- [ ] Playwright MCP

## 10. Requisitos de revisión
- Anchos a revisar: móvil 375 px, tablet 768 px, computador 1280 px
- Debe leerse bien: [ej.: texto de 16 px o más en móvil]
- Botones: fáciles de tocar con el dedo y con texto claro
- Formularios: [campos que pide el negocio]
- Qué debe comprobar Claude antes de decir que terminó: [lista]
- Entrega: resumen de cambios, archivos modificados y lo que no pudo comprobar
```

**Tu acción:** llena todos los campos que puedas. Lo que no sepas, déjalo en "por definir"; Claude no debe inventarlo.

## 7. Los cuatro prompts

Pégalos en Claude Code, dentro de la carpeta del proyecto, en este orden. Completa lo que está entre corchetes. Los prompts van también en el archivo `Prompts-DISENO.txt`.

### Prompt 1. Proponer una dirección visual antes de programar

```text
Quiero que propongas una dirección visual ANTES de programar. No modifiques ningún archivo del proyecto en este paso.

DATOS QUE COMPLETO
- Negocio y objetivo: ver BRIEF.md
- Tema de la dirección visual (opcional): [ej.: cálida y artesanal / limpia y moderna / no tengo preferencia]
- Cosas que no quiero: [ej.: fondo oscuro, demasiados colores]

ARCHIVOS QUE DEBES CONSULTAR
1. BRIEF.md (léelo completo).
2. Las imágenes y el logo que menciona el brief, si existen en el proyecto.
3. El archivo de la página principal y el de estilos, solo para entender la tecnología. No los cambies.

HERRAMIENTAS
- Si tienes disponible la skill de Taste (design-taste-frontend), úsala para esta propuesta. Si no está instalada, dímelo en una línea y haz la propuesta con tu criterio, sin fingir que la usaste.
- Si el brief trae un enlace de Figma y tienes el MCP de Figma conectado, consulta ese diseño. Si no lo tienes, dímelo y continúa sin él.

QUÉ DEBES ENTREGAR
Tres direcciones visuales distintas entre sí. Para cada una:
1. Nombre corto y una frase que la describa.
2. Paleta: 5 colores con su valor hexadecimal y para qué se usa cada uno.
3. Tipografías: una para títulos y otra para texto, con su fuente (Google Fonts u otra gratuita) y tamaños base para móvil y computador.
4. Estructura de la página, sección por sección, y qué va en cada una.
5. Cómo se ven el botón principal, las tarjetas y los formularios.
6. Un riesgo o debilidad de esa dirección.
Al final, recomienda UNA y explica por qué en tres frases, con base en mi público y mi objetivo. No uses estadísticas ni afirmaciones sin respaldo.

CÓMO COMPROBARLO
- Verifica el contraste del texto sobre cada fondo de la paleta recomendada (ratio mínimo 4.5:1 para texto normal) y escribe el resultado. Si no puedes calcularlo, dímelo.
- Confirma que usas solo contenido e imágenes que existen en el brief; lo que falte, márcalo como "por definir".

Detente al terminar y espera mi elección. No programes todavía.
```

### Prompt 2. Implementar la dirección elegida

```text
Implementa la dirección visual que elegí.

DATOS QUE COMPLETO
- Dirección elegida: [nombre de la dirección, ej.: "Dirección 2"]
- Cambios que pido sobre ella: [ej.: usar el verde más oscuro / ninguno]
- Páginas o secciones a construir: [ej.: inicio con 5 secciones]

ARCHIVOS QUE DEBES CONSULTAR
1. BRIEF.md (contenido, CTA, imágenes, tecnología, qué no tocar).
2. La propuesta de dirección visual que acabas de hacer.
3. Los archivos de la página y de estilos que indica el brief, antes de editar.

REGLAS
- Usa la tecnología que indica el brief. No añadas librerías nuevas sin preguntarme.
- Usa solo el texto e imágenes del brief. No inventes precios, testimonios, cifras ni datos de contacto; deja un texto marcado como [POR COMPLETAR] donde falte.
- Define colores, tamaños y espacios en un solo lugar (variables CSS o el sistema que ya use el proyecto), no repartidos por todo el código.
- Diseña primero para móvil (375 px) y luego amplía a tablet y computador.
- Los botones y enlaces deben tener estados visibles al pasar el cursor, al enfocarlos con teclado y al estar desactivados.
- Si tienes disponible Impeccable, úsalo al terminar para revisar. Si no, dilo.
- Antes de editar, dime en una lista qué archivos vas a crear o modificar.

QUÉ DEBES ENTREGAR
1. Los archivos modificados o creados.
2. Un resumen de los cambios en máximo 10 líneas.
3. Una lista de lo que quedó como [POR COMPLETAR].
4. Cómo ejecutar el proyecto y en qué dirección verlo.

CÓMO COMPROBARLO
- Ejecuta el comando de compilación o de lint del proyecto, si existe, y muéstrame el resultado.
- Si no puedes ejecutarlo, dímelo; no digas que funciona sin haberlo comprobado.
- Dime qué NO pudiste comprobar (por ejemplo, cómo se ve en un navegador real).
```

### Prompt 3. Revisar y corregir el diseño existente

```text
Revisa y corrige el diseño de la web que ya existe. Trabaja por fases y no rehagas lo que ya funciona.

DATOS QUE COMPLETO
- Qué me preocupa: [ej.: se ve genérica, el texto cuesta leerse en el móvil, los botones no destacan]
- Páginas o archivos a revisar: [ej.: app/page.tsx y app/globals.css]
- Qué NO se puede cambiar: [ej.: textos, logo, estructura de menú]

ARCHIVOS QUE DEBES CONSULTAR
1. BRIEF.md.
2. Los archivos de página y de estilos indicados arriba.
3. Cualquier archivo de variables, tema o componentes de botones que use el proyecto.

HERRAMIENTAS
- Si tienes disponible Impeccable, usa sus comandos de evaluación y refinamiento (por ejemplo critique, audit, typeset, layout, colorize, adapt, polish) según corresponda.
- Si tienes la skill de Emil Kowalski, úsala solo para revisar animaciones y transiciones.
- Si alguna no está instalada, dime cuál falta y haz la revisión manual, indicando qué parte no pudiste cubrir.

PROCESO
Fase 1. Diagnóstico: lista los problemas encontrados, agrupados en composición, tipografía, color, consistencia, móvil y detalles de interacción. Para cada uno indica el archivo y la línea. Ordénalos de mayor a menor impacto. Espera mi aprobación antes de cambiar nada.
Fase 2. Correcciones: aplica solo las que aprobé, empezando por las de mayor impacto. Cambios pequeños y reversibles.
Fase 3. Verificación: vuelve a revisar y confirma qué quedó resuelto y qué no.

QUÉ DEBES ENTREGAR
- Tabla: problema, archivo, corrección aplicada, estado (resuelto / pendiente / no pude comprobar).
- Los archivos modificados.

CÓMO COMPROBARLO
- Revisa contraste de texto (mínimo 4.5:1), tamaño de texto en móvil, desbordamientos horizontales y consistencia de espacios, colores y botones.
- No inventes mediciones. Si no puedes medir algo, escribe "no medido".
```

### Prompt 4. Probar la web en navegador y corregir problemas

```text
Prueba la web en un navegador, encuentra problemas y corrígelos.

DATOS QUE COMPLETO
- Dirección donde corre la web: [ej.: http://localhost:3000]
- Comando para iniciarla si no está corriendo: [ej.: npm run dev]
- Páginas a probar: [ej.: / y /contacto]
- Acciones a probar: [ej.: abrir el menú, tocar el botón de WhatsApp, enviar el formulario con datos de prueba]

ARCHIVOS QUE DEBES CONSULTAR
1. BRIEF.md (sección de requisitos de revisión).
2. Los archivos de la página y de estilos que vayas a corregir.

HERRAMIENTAS
- Usa el MCP de Playwright para abrir la web, navegar, hacer clic y tomar capturas. Si no está conectado, dímelo ya, no continúes fingiendo. En ese caso, revisa solo el código y dime exactamente qué NO pudiste comprobar en un navegador.
- No escribas datos personales reales ni contraseñas en ningún formulario. Usa datos de prueba.

PROCESO
1. Abre la web en tres anchos: 375 px (móvil), 768 px (tablet) y 1280 px (computador). Toma una captura de cada uno.
2. En cada ancho revisa: texto legible, jerarquía clara, botones y enlaces visibles y tocables, formularios completos, imágenes que cargan, y que no haya desplazamiento horizontal ni elementos cortados.
3. Prueba las acciones indicadas arriba y anota lo que ocurre.
4. Lista los problemas con ancho, elemento y archivo probable. No corrijas todavía.
5. Pídeme confirmación y luego corrige, empezando por los más graves.
6. Vuelve a abrir la web en los tres anchos y confirma cada corrección con una captura nueva.

QUÉ DEBES ENTREGAR
- Tabla: problema, ancho donde ocurre, corrección, resultado de la nueva prueba.
- Lista de lo que no pudiste probar y por qué.

CÓMO COMPROBARLO
- Una corrección cuenta como resuelta solo si la volviste a probar en el navegador. Si no la probaste, márcala como "sin comprobar".
```

**Si falta una integración:** los cuatro prompts le piden a Claude que lo diga y explique qué sí pudo revisar. Si no lo dice, pregúntale: "¿Qué herramientas usaste realmente y qué no pudiste comprobar?".

## 8. Checklist final

Revísala en tu computador **y en tu teléfono real**. Marca cada punto solo si lo viste.

**Legibilidad**

- [ ] El texto normal se lee sin esfuerzo en el teléfono, sin acercar con los dedos.
- [ ] Los párrafos no son larguísimos ni están pegados al borde.
- [ ] Ningún texto queda sobre una imagen que lo vuelva difícil de leer.

**Contraste**

- [ ] El texto contrasta con su fondo (mínimo 4.5:1 para texto normal, según las pautas de accesibilidad WCAG).
- [ ] Los botones y los enlaces se distinguen del texto que los rodea.

**Jerarquía**

- [ ] Se entiende en 5 segundos qué ofrece el negocio.
- [ ] Hay un solo botón principal por pantalla y se ve primero.
- [ ] Los títulos son claramente más grandes que el texto.

**Adaptación móvil**

- [ ] Se ve bien en 375 px, 768 px y 1280 px.
- [ ] El menú funciona en móvil.
- [ ] No hay que desplazarse hacia los lados.

**Botones**

- [ ] Se pueden tocar con el dedo sin pulsar otro por error.
- [ ] El texto dice qué pasará ("Pedir por WhatsApp", no "Enviar").
- [ ] Tienen estado visible al pasar el cursor y al enfocarlos con teclado.

**Enlaces**

- [ ] Todos llevan al lugar correcto (los probé uno por uno).
- [ ] El teléfono y el WhatsApp abren la aplicación esperada.

**Formularios**

- [ ] Cada campo tiene una etiqueta visible.
- [ ] Se puede enviar con datos de prueba y se ve un mensaje de confirmación.
- [ ] Los errores se explican con claridad.

**Imágenes**

- [ ] Todas cargan y no se ven deformadas.
- [ ] Tienen un texto alternativo descriptivo.
- [ ] No pesan tanto que la página tarde en abrir.

**Desbordamientos**

- [ ] Nombres o textos largos no se salen de su caja.
- [ ] Las tablas y las imágenes no ensanchan la página en móvil.

## 9. Problemas frecuentes

| Problema | Qué hacer |
|---|---|
| El resultado es genérico | Tu BRIEF es vago. Añade personalidad (tres palabras), referencias y lo que NO quieres |
| Claude inventó textos, precios o testimonios | Pídele que los marque como [POR COMPLETAR] y que use solo el BRIEF |
| Claude cambió cosas que no pedí | Revisa con `git diff` si usas Git. Pide que revierta y repite con "qué NO se debe tocar" |
| Dice que probó en el navegador y no tienes Playwright | Pregunta: "¿Qué herramientas usaste realmente?". Revisa tú con la checklist |
| El diseño se ve bien en computador y mal en móvil | Usa el prompt 4 en 375 px; pide una corrección por problema |
| Las animaciones se sienten pesadas | Usa Emil Kowalski (`review-animations`) y pide menos movimiento, no más |

## 10. Fuentes oficiales (consultadas el 27 de octubre de 2026)

- Emil Kowalski, skills: https://github.com/emilkowalski/skills
- Impeccable: https://impeccable.style/
- Taste: https://github.com/Leonxlnx/taste-skill
- Figma MCP Server: https://developers.figma.com/docs/figma-mcp-server/
- Figma MCP, instalación del servidor remoto (Claude Code): https://developers.figma.com/docs/figma-mcp-server/remote-server-installation/
- Playwright MCP: https://github.com/microsoft/playwright-mcp
- Claude Code, servidores MCP: https://code.claude.com/docs/en/mcp
- Claude Code, instalación: https://code.claude.com/docs/en/setup
- Skills en claude.ai: https://support.claude.com/en/articles/12512180-use-skills-in-claude
