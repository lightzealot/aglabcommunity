# AI Job Search con Claude Code: prompts para empezar

Repositorio: https://github.com/ai-job-search-dev/ai-job-search (licencia MIT)
Requiere Claude Code con plan Pro, Max o Team, o créditos de la API de Anthropic.

## 1. Copia privada (no hagas fork: sería público)

```
gh repo clone ai-job-search-dev/ai-job-search
cd ai-job-search
git remote rename origin upstream
gh repo create ai-job-search --private --source=. --remote=origin --push
```

## 2. Flujo de comandos

```
/setup        # arma tu perfil desde tu CV, tu carpeta documents/ o una entrevista
/scrape       # busca ofertas y las ordena por encaje
/rank         # puntúa todas y te deja una lista corta
/apply <link> # CV + carta a medida, revisados por un segundo agente
/interview    # paquete de preparación y simulacro de entrevista
/outcome      # registra el resultado y redacta seguimientos
```

## 3. Prompt para afinar tu perfil (después de /setup)

```
Revisa mi perfil completo y dime: 1) qué experiencias describí sin logros medibles, 2) qué habilidades menciono sin contexto de dónde las usé y 3) tres tipos de puesto que encajan con mi historial y que quizá no estoy considerando. Hazme preguntas para completar lo que falte, una por una.
```

## 4. Prompt para revisar una postulación antes de enviarla

```
Antes de que envíe esta postulación, léela como si fueras el reclutador de esta empresa. Señala cualquier frase que suene genérica, cualquier dato que no esté en mi perfil y las tres palabras clave de la oferta que más faltan. No cambies nada todavía: solo dame la lista.
```

Guía completa: comunidad.andresgomez.store · @andresgomez.ia
