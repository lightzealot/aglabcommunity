Un repositorio es **una carpeta de tu proyecto que recuerda todo su historial**. Guarda tus archivos y cada cambio que les haces, quién lo hizo y cuándo, para que puedas volver atrás, probar ideas sin miedo y trabajar con otras personas (o con una IA) sin pisarse. GitHub es la web donde guardas esa carpeta en línea.

## Qué es, en simple

Piensa en un documento con "historial de versiones", pero para un proyecto entero: código, textos, imágenes, prompts, lo que sea.

| Palabra | Qué significa |
|---|---|
| **Git** | El programa que lleva el historial de tus archivos. Funciona en tu computador. |
| **Repositorio (repo)** | La carpeta del proyecto con todo su historial. |
| **GitHub** | El sitio web donde subes tus repositorios para guardarlos, compartirlos y colaborar. |
| **Commit** | Una "foto" del proyecto en un momento, con un mensaje que explica qué cambió. |
| **Rama (branch)** | Una copia paralela para probar algo sin tocar la versión principal. |
| **Clonar** | Descargar a tu computador una copia de un repositorio. |
| **Push / Pull** | Subir tus cambios a GitHub / bajar los cambios nuevos de GitHub. |
| **Pull request (PR)** | Una propuesta para unir los cambios de una rama a la principal, con revisión. |

## Para qué te sirve

- **Deshacer errores:** si algo se rompe, vuelves a una versión que funcionaba.
- **Probar sin miedo:** creas una rama, experimentas y solo la unes si te gusta.
- **Respaldo:** tu proyecto vive en GitHub aunque se dañe tu computador.
- **Colaborar:** varias personas trabajan en lo mismo y ven quién cambió qué.
- **Mostrar tu trabajo:** tu perfil de GitHub es un portafolio público.
- **Trabajar con IA:** herramientas como Claude Code leen tu repositorio, hacen cambios y los dejan como commits que puedes revisar o deshacer.

## Cómo se ve por dentro

Un repositorio es una carpeta normal más una carpeta oculta llamada `.git`, donde Git guarda el historial. Ejemplo de un proyecto pequeño:

```text
mi-proyecto/
├── README.md        ← la portada: qué es y cómo usarlo
├── prompts/
│   ├── ideas.md
│   └── correos.md
├── .gitignore       ← lista de archivos que Git debe ignorar
└── .git/            ← el historial (no lo toques)
```

### El README

Es el archivo que GitHub muestra como portada del repositorio. Debería responder tres preguntas: **qué es**, **para qué sirve** y **cómo se usa**.

## Ejemplos de repositorios

- **Tus prompts:** una carpeta por tema (contenido, correos, estudio) con tus mejores instrucciones y su historial de mejoras.
- **Un sitio web o landing:** el código de la página; cada cambio queda registrado.
- **Un proyecto de IA:** los skills, instrucciones y automatizaciones que usas con Claude, ordenados y versionados.
- **Notas o un curso:** apuntes en Markdown que puedes editar desde cualquier lugar.
- **Código de otros que puedes usar:** miles de herramientas gratis están en repositorios públicos; las clonas y las usas.

## Los comandos básicos

Con Git instalado, abre una terminal dentro de la carpeta de tu proyecto:

```bash
# 1. Convertir la carpeta en un repositorio
git init

# 2. Ver qué cambió
git status

# 3. Marcar los archivos que quieres guardar
git add .

# 4. Guardar la foto (commit) con un mensaje claro
git commit -m "Agrego mis primeros prompts"

# 5. Ver el historial
git log --oneline
```

Para conectarlo con GitHub, crea un repositorio vacío en la web y copia su dirección:

```bash
git remote add origin https://github.com/TU-USUARIO/mi-proyecto.git
git branch -M main
git push -u origin main
```

Desde entonces, tu ciclo diario es siempre el mismo: **cambias → `git add .` → `git commit -m "..."` → `git push`**.

### Un buen mensaje de commit

- Mal: `cambios`, `arreglo`, `asdf`
- Bien: `Agrego prompt para correos de seguimiento`, `Corrijo el enlace roto del README`

Un mensaje claro es lo que te permite encontrar después "el momento en que cambié eso".

## Ejercicios

### Ejercicio 1: crea tu cuenta y tu primer repositorio (10 min)

1. Entra a github.com y crea tu cuenta gratis.
2. Pulsa **New repository**.
3. Ponle de nombre `mis-prompts`, márcalo **Public** y activa **Add a README file**.
4. Pulsa **Create repository**.

**Listo cuando:** ves tu repositorio con el README como portada.

### Ejercicio 2: edita tu README desde la web (5 min)

1. Abre `README.md` y pulsa el lápiz para editar.
2. Escribe una línea: qué guardarás aquí.
3. Pulsa **Commit changes** y escribe un mensaje claro.
4. Abre la pestaña **Commits** y mira tu cambio en el historial.

**Listo cuando:** ves tu commit con tu mensaje y la fecha.

### Ejercicio 3: sube un archivo (5 min)

1. En tu repositorio pulsa **Add file → Create new file**.
2. Llámalo `prompts/ideas.md` (al escribir la `/` se crea la carpeta).
3. Pega dentro uno de tus mejores prompts.
4. Haz commit.

**Listo cuando:** ves la carpeta `prompts` con tu archivo.

### Ejercicio 4: trabaja desde tu computador (20 min)

**Paso 1.** Instala Git (git-scm.com) y verifica con `git --version`.

**Paso 2.** En tu repositorio pulsa **Code** y copia la dirección HTTPS. Luego clona y entra a la carpeta:

```bash
git clone https://github.com/TU-USUARIO/mis-prompts.git
cd mis-prompts
```

**Paso 3.** Crea un archivo nuevo `prompts/correos.md` con un prompt dentro.

**Paso 4.** Guárdalo con los tres comandos del ciclo:

```bash
git add .
git commit -m "Agrego prompt de correos"
git push
```

**Listo cuando:** recargas GitHub y el archivo aparece.

### Ejercicio 5: prueba una rama y deshaz un error (20 min)

**Paso 1.** Crea una rama de prueba y cámbiate a ella:

```bash
git switch -c prueba-readme
```

**Paso 2.** Borra por completo el contenido de `README.md` y guarda el cambio:

```bash
git add .
git commit -m "Pruebo borrar el README"
```

**Paso 3.** Vuelve a la versión principal. Tu README sigue intacto:

```bash
git switch main
```

**Paso 4.** Elimina la rama de prueba:

```bash
git branch -D prueba-readme
```

**Listo cuando:** entiendes que lo que hiciste en la rama nunca tocó `main`.

### Ejercicio 6: explora un repositorio de otros (10 min)

1. Busca en GitHub un proyecto que te interese (por ejemplo, escribe "prompts" o "Claude skills" en el buscador).
2. Lee su README: ¿qué es, para qué sirve y cómo se usa?
3. Mira la pestaña **Commits**: ¿cuándo fue su último cambio? Un proyecto con cambios recientes está vivo.
4. Pulsa **Star** si te sirvió; así lo encuentras después.

**Listo cuando:** puedes explicar en una frase de qué trata ese repositorio.

### Reto final: tu repositorio de IA

Crea un repositorio llamado `mi-sistema-ia` con:

- Un README que explique qué contiene.
- Una carpeta `prompts/` con al menos 3 prompts.
- Un commit por cada prompt, cada uno con un mensaje claro.

Cuando lo tengas, compártelo en la comunidad y cuéntanos qué guardaste.

## Cuidado con lo privado

- **Nunca subas contraseñas, claves de API ni datos de clientes.** Un repositorio público lo puede ver cualquiera, y lo borrado sigue en el historial.
- Si no quieres que nadie más lo vea, créalo como **Private**.
- Usa el archivo `.gitignore` para que Git ignore archivos como `.env` (donde suelen vivir las claves).

## Errores comunes

- **"No sé qué subir":** empieza con una carpeta de prompts. No necesitas saber programar.
- **Commits gigantes con mensaje "cambios":** commitea seguido y explica el porqué.
- **Miedo a romper algo:** esa es justo la razón de Git. Casi todo se puede deshacer.
- **Confundir Git con GitHub:** Git lleva el historial en tu computador; GitHub es el sitio donde lo guardas en línea.

## Siguiente paso

Cuando dominar este ciclo te resulte natural, aprende **ramas y pull requests**: son la forma estándar de proponer cambios y revisarlos antes de unirlos. Y si trabajas con Claude Code, pídele que te explique cada comando antes de ejecutarlo.
