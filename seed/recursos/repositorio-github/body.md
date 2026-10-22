Un repositorio es **una carpeta de tu proyecto que recuerda todo su historial**: cada cambio, quién lo hizo y cuándo. Así puedes volver atrás, probar ideas sin miedo y trabajar con otras personas (o con una IA). **GitHub** es la web donde guardas esa carpeta en línea.

| Palabra | Qué es |
|---|---|
| **Git** | El programa que lleva el historial, en tu computador |
| **Repositorio** | La carpeta del proyecto con su historial |
| **Commit** | Una "foto" del proyecto con un mensaje de qué cambió |
| **Rama** | Copia paralela para probar sin tocar la versión principal |
| **Clonar** | Descargar una copia de un repositorio |
| **Push / Pull** | Subir cambios a GitHub / bajar los nuevos |

## Para qué te sirve

Deshacer errores, probar en una rama, tener respaldo, colaborar, mostrar tu trabajo y usar herramientas como Claude Code, que dejan sus cambios como commits que puedes revisar o deshacer. Sirve para prompts, webs, skills, notas, cursos…

```text
mi-proyecto/
├── README.md     ← portada: qué es, para qué sirve, cómo se usa
├── prompts/
├── .gitignore    ← archivos que Git debe ignorar (p. ej. .env)
└── .git/         ← el historial (no lo toques)
```

## El ciclo básico

Con Git instalado, en la carpeta de tu proyecto:

```bash
git init                       # convertir la carpeta en repositorio
git add .                      # marcar los archivos a guardar
git commit -m "Agrego mis primeros prompts"
git log --oneline              # ver el historial
```

Para conectarlo con GitHub, crea un repositorio vacío en la web y:

```bash
git remote add origin https://github.com/TU-USUARIO/mi-proyecto.git
git branch -M main
git push -u origin main
```

Desde ahí: **cambias → `git add .` → `git commit -m "..."` → `git push`**. Un buen mensaje dice qué hiciste ("Corrijo el enlace roto del README"), no "cambios".

## Ejercicios

1. **Tu primer repositorio (10 min):** en github.com crea `mis-prompts`, público, con README.
2. **Edita desde la web (5 min):** edita el README, haz commit y mira la pestaña **Commits**.
3. **Sube un archivo (5 min):** **Add file → Create new file** → `prompts/ideas.md`.
4. **Desde tu computador (20 min):** `git clone https://github.com/TU-USUARIO/mis-prompts.git`, crea `prompts/correos.md`, y `git add .` → `git commit -m "..."` → `git push`.
5. **Rama y error (20 min):** `git switch -c prueba-readme`, borra el README, haz commit, vuelve con `git switch main` (sigue intacto) y elimina la rama con `git branch -D prueba-readme`.
6. **Explora (10 min):** abre un repositorio de otros, lee su README y mira cuándo fue su último commit.

**Reto final:** `mi-sistema-ia` con un README, una carpeta `prompts/` con 3 prompts y un commit por cada uno. Compártelo en la comunidad.

## Cuidado con lo privado

- **Nunca subas contraseñas, claves de API ni datos de clientes.** Lo borrado sigue en el historial.
- Si no quieres que nadie lo vea, créalo como **Private**.
- Pon `.env` en `.gitignore`.

**Después:** aprende ramas y pull requests. Si usas Claude Code, pídele que te explique cada comando antes de ejecutarlo.
