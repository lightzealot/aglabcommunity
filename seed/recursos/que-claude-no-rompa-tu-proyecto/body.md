¿Le pediste a Claude un cambio y se te cayó la app? Pasa más de lo que crees: un despliegue que no tocaba, un archivo borrado o una carpeta de respaldo que en realidad estaba vacía. Aquí tienes las 6 capas para que Claude Code **nunca te rompa el proyecto**, y qué hacer si ya pasó.

**Datos al 26 de noviembre de 2026**, según la documentación oficial de Claude Code ([checkpoints](https://code.claude.com/docs/es/checkpointing)).

## 1. Los checkpoints de Claude Code (tu botón de deshacer)

Claude Code **guarda solo el estado de tu código antes de cada mensaje** que le mandas. Si algo sale mal, vuelves atrás.

| Qué | Cómo funciona |
|---|---|
| Cuándo se guarda | Antes de cada mensaje tuyo que inicia un turno |
| Cuántos guarda | Los 100 más recientes de la sesión |
| Cuánto duran | Unos 30 días desde la última vez que la sesión guardó uno |
| Cómo vuelves | Con **`/rewind`**: restaura código y conversación, solo la conversación o solo el código |

**Ojo, no reemplaza a Git:**
- solo guarda lo que Claude editó con sus herramientas de archivos,
- no guarda los cambios hechos con comandos de terminal ni fuera de la sesión,
- casi nunca guarda lo que editan los subagentes,
- y no deshace lo que pasó afuera: un despliegue, un correo enviado o una base de datos borrada.

## 2. Git: un commit antes de cada cambio grande

```
Antes de tocar cualquier archivo, haz un commit con el estado actual y crea una rama nueva para este cambio. Al terminar, muéstrame el diff y no hagas merge sin preguntarme.
```

## 3. Pruebas y producción, separados

- Ten un entorno de **pruebas** con un nombre claro (no «pruebas-final-v2»).
- Dile a Claude que **nunca despliegue a producción** sin tu confirmación.
- Si algo funciona en pruebas, lo subes tú.

## 4. Permisos: que pregunte antes de lo peligroso

- En el **modo por defecto**, Claude Code te pide permiso antes de editar archivos o correr comandos. Úsalo con proyectos reales.
- Usa el **modo plan** para que primero proponga y después ejecute.
- Bloquea los comandos destructivos en `.claude/settings.json`:

```
{
  "permissions": {
    "deny": ["Bash(rm -rf:*)", "Bash(git push --force:*)", "Bash(npm run deploy:*)"]
  }
}
```

Cambia `npm run deploy` por el comando con el que despliegas tu proyecto.

## 5. Respaldos que sí sirven

Un respaldo que nunca probaste no es un respaldo.

| Revisa | Cada cuánto |
|---|---|
| Que la carpeta de respaldo **tenga archivos** y pese algo | Cada semana |
| Que puedas **restaurar** una copia en un entorno de pruebas | Cada mes |
| Que la base de datos tenga copia automática en tu proveedor | Una vez, y cuando cambies de plan |

## 6. Las reglas en tu CLAUDE.md

Pega esto en el archivo `CLAUDE.md` de tu proyecto para que Claude lo lea en cada sesión:

```
## Reglas de seguridad
- Nunca despliegues a producción sin preguntarme.
- Antes de un cambio grande, haz un commit y trabaja en una rama nueva.
- Nunca borres archivos, carpetas ni bases de datos sin mi confirmación.
- Si vas a correr un comando que no se puede deshacer, explícame qué hace y espera mi sí.
- Si algo falla, detente y avísame antes de intentar arreglarlo.
```

## Si ya se rompió

1. **No sigas pidiendo cambios**: cada mensaje nuevo agrega cambios encima.
2. Escribe **`/rewind`** y vuelve al checkpoint anterior al problema.
3. Si el cambio salió de la sesión (despliegue, base de datos), vuelve al último commit con Git o restaura tu respaldo.
4. Pídele a Claude que te explique qué pasó, **sin tocar nada**:

```
Explícame paso a paso qué cambiaste en la última hora y qué pudo romper la app. No modifiques ningún archivo: solo diagnostica.
```
