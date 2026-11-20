# find-skills con Claude Code: comandos y prompts

Ficha oficial: https://skills.sh/vercel-labs/skills/find-skills
Datos al 20 de noviembre de 2026: 4.5 M instalaciones, puesto 1 del ranking de skills.sh.

## 1. Instala find-skills

```
npx skills add https://github.com/vercel-labs/skills --skill find-skills
```

## 2. Prompt para buscar una skill

```
Busca una skill para [lo que quieres hacer]. Dame las 3 mejores con sus instalaciones, quién las publica y el comando para instalarlas. No instales nada todavía.
```

## 3. Prompt para revisarla antes de instalar

```
Antes de instalar [nombre de la skill], lee su SKILL.md y dime qué archivos toca, qué comandos ejecuta y si necesita claves o acceso a internet. Dame tu recomendación en tres líneas.
```

## 4. Comandos útiles

```
npx skills find [lo que buscas]   # busca tú mismo en el directorio
npx skills update                 # actualiza tus skills
```

Guía completa: comunidad.andresgomez.store · @andresgomez.ia
