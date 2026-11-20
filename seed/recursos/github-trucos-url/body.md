Abres un repositorio de GitHub, ves cien archivos y no entiendes nada. Aquí tienes **7 trucos para entender cualquier repositorio sin leer el código archivo por archivo**. En los cuatro primeros solo cambias una palabra de la URL. Funcionan con repositorios públicos, y en los ejemplos **tu/repo** es el usuario y el nombre del repositorio que quieres entender.

> Son herramientas de terceros: no son de GitHub ni de Anthropic. Pueden cambiar, ir lentas o dejar de funcionar.

## Truco 1. Cambia «github.com» por «gitreverse.com»

GitReverse lee el repositorio y te devuelve **un prompt para pedirle a una IA que arme ese mismo proyecto desde cero**.

```
github.com/tu/repo
gitreverse.com/tu/repo
```

- Copia el prompt y pégalo en Claude para crear tu propia versión.
- Ajústalo: quita lo que no necesitas antes de pegarlo.

## Truco 2. Cambia «github.com» por «gitdiagram.com»

GitDiagram dibuja un **diagrama interactivo** de cómo está armado el repositorio: sus partes y cómo se conectan.

```
github.com/tu/repo
gitdiagram.com/tu/repo
```

- Haz clic en cada caja del diagrama para ir a esa parte del código.
- Úsalo antes de tocar un proyecto ajeno: ves el mapa completo en un minuto.

## Truco 3. Cambia «github.com» por «gitingest.com»

Gitingest junta todo el repositorio **en un solo texto**: un resumen, el árbol de carpetas y el contenido de cada archivo. Listo para pegar en Claude.

```
github.com/tu/repo
gitingest.com/tu/repo
```

- Si el repo es muy grande, usa los filtros para incluir solo las carpetas que te importan.
- Pega el texto en Claude junto con este prompt (cambia lo que está entre corchetes):

```
Te pego un repositorio completo en un solo texto. Explícame, en este orden:
1) Qué hace el proyecto, en 3 líneas y sin tecnicismos.
2) Cómo está organizado: las carpetas importantes y para qué sirve cada una.
3) Cómo lo instalo y lo corro en mi computador, paso a paso.
4) Qué archivo tendría que tocar para cambiar [lo que quieres cambiar].
No inventes nada: si algo no está en el texto, dímelo.
```

## Truco 4. Cambia «github.com» por «gitmcp.io»

GitMCP convierte el repositorio en un **servidor MCP**. Lo conectas a Claude y Claude puede consultar su documentación cuando le preguntas.

```
github.com/tu/repo
gitmcp.io/tu/repo
```

- **En Claude:** agrega un conector personalizado y pega la URL `https://gitmcp.io/tu/repo`.
- **En Claude Code:** `claude mcp add --transport http repo https://gitmcp.io/tu/repo`
- Después pregúntale a Claude sobre ese proyecto: usará el repositorio como fuente.

## Los 3 trucos extra

**Truco 5. DeepWiki.** Cambia `github.com` por `deepwiki.com`: arma una wiki del repositorio, con explicaciones por sección y un chat para hacerle preguntas. Ideal para proyectos grandes con poca documentación.

**Truco 6. La tecla punto.** Dentro de cualquier repositorio en GitHub, presiona la tecla **.** (punto). Se abre el proyecto en un editor de código en el navegador (github.dev), con buscador y todas las carpetas. No instalas nada.

**Truco 7. «.patch» al final de un commit.** Agrega `.patch` (o `.diff`) al final de la URL de un commit o de un pull request y ves el cambio completo en texto plano, listo para pegarlo en Claude y pedirle que te lo explique.

```
github.com/tu/repo/commit/abc123
github.com/tu/repo/commit/abc123.patch
```

## Límites que debes conocer

- **Repos públicos:** funcionan con repositorios públicos. Gitingest acepta repos privados con un token de GitHub; no compartas ese token con nadie.
- **Repos muy grandes:** el texto de Gitingest puede no caber en un chat. Filtra carpetas o pregunta por partes.
- **Revisa la licencia** antes de copiar o rearmar un proyecto ajeno.
- **Claude puede equivocarse:** si te explica un archivo, ábrelo y comprueba lo importante.

| Quieres | Usa |
|---|---|
| Entender | Diagram y DeepWiki |
| Preguntar | Ingest o GitMCP con Claude |
| Construir | Reverse para armar tu versión |
| Revisar | Tecla punto y .patch |

Prueba los trucos con un repositorio que ya conozcas y compara. **¿Quieres que te ayude con tu caso? Escríbeme REPO a @andresgomez.ia.**
