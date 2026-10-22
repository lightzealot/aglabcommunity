Cinco recursos de skills para llevar Claude más allá del chat. Una skill reúne instrucciones y recursos para una tarea concreta; su uso depende de tu asistente y entorno, y algunas necesitan herramientas o servicios extra. Los enlaces permiten **consultar** los recursos: no todos se instalan igual.

**Cómo usarlos:** elige según tu objetivo, abre la documentación, comprueba los requisitos y adapta el prompt.

## 5 · Encontrar prospectos: `lead-research-assistant`

**Necesitas:** un asistente con skills y búsqueda web. Aporta tu oferta, ubicación y criterios. [Recurso](https://github.com/ComposioHQ/awesome-claude-skills/blob/master/lead-research-assistant/SKILL.md)

```text
Ofrezco [servicio] a [tipo de empresa] en [país]. Busca 10 empresas que encajen. Para cada una: sitio oficial, una señal verificable de necesidad, su fuente y una propuesta de primer contacto. Marca como no confirmado lo que no puedas verificar.
```

**Revisa:** abre las fuentes de tres empresas y comprueba que la señal les corresponde. Un cargo objetivo no es una persona ni un correo verificados.

## 4 · Organizar la venta: `cold-email` + `sales-enablement` + `revops`

**Necesitas:** contexto de tu producto, cliente ideal, oferta y etapas. Enviar mensajes o escribir en un CRM requiere conexiones adicionales.
[Mensajes](https://github.com/coreyhaines31/marketingskills/tree/main/skills/cold-email) · [Propuestas](https://github.com/coreyhaines31/marketingskills/tree/main/skills/sales-enablement) · [Proceso comercial](https://github.com/coreyhaines31/marketingskills/tree/main/skills/revops)

```text
Vendo [servicio] a [cliente]. Diseña un proceso de cinco etapas, un mensaje inicial, dos seguimientos y una propuesta de una página. Usa solo los beneficios y pruebas que te adjunto. Prepara borradores sin enviarlos.
```

**Revisa:** cada mensaje propone un siguiente paso claro, la propuesta refleja tu oferta real y los seguimientos automáticos se detienen cuando alguien responde.

## 3 · Crear una primera web: `frontend-design`

**Necesitas:** un entorno que cree y previsualice HTML/CSS o tu framework. Publicación y backend se configuran aparte. [Recurso](https://github.com/anthropics/skills/tree/main/skills/frontend-design)

```text
Crea una landing para [servicio] dirigida a [público]. Incluye problema, propuesta, cómo funciona y un botón para [acción]. Usa estos textos y datos reales: [adjuntos]. Hazla adaptable a móvil y deja una vista previa local.
```

**Revisa:** móvil y escritorio, enlaces y botones. Un formulario dibujado no implica que envíe datos.

## 2 · Diseñar miniaturas: `higgsfield-youtube-thumbnail`

**Necesitas:** CLI de Higgsfield, sesión autenticada y créditos. Si quieres aparecer, una foto tuya y la promesa real del video. [Recurso](https://github.com/higgsfield-ai/skills/tree/main/higgsfield-youtube-thumbnail)

```text
Prepara dos conceptos de miniatura 16:9 para un video sobre [tema]. La promesa real es [promesa]. Usa mi foto adjunta y el texto [máximo cuatro palabras]. Describe primero ambos conceptos y el coste antes de generar.
```

**Revisa:** mírala a tamaño pequeño; identidad y legibilidad. El diseño no garantiza clics.

## 1 · Agentes con n8n: `n8n-skills`

**Necesitas:** una instancia de n8n. Para crear workflows desde el asistente, configura n8n-mcp; los modelos y servicios externos piden sus credenciales. [Paquete](https://github.com/czlonkowski/n8n-skills) · [Patrones](https://github.com/czlonkowski/n8n-skills/tree/main/skills/n8n-workflow-patterns)

```text
Diseña un agente en n8n que reciba una pregunta y consulte una base de conocimiento. Describe nodos, herramientas y credenciales. Valida el workflow y prepara tres casos de prueba. Déjalo sin activar hasta revisar los resultados.
```

**Revisa:** prueba una pregunta válida, una sin respuesta y una con datos vacíos. Validar la estructura no demuestra que la lógica funcione.

## ¿Cuál elijo?

| Necesito… | Uso |
|---|---|
| Prospectos | `lead-research-assistant` |
| Organizar ventas | `cold-email` + `sales-enablement` + `revops` |
| Una interfaz web | `frontend-design` |
| Miniaturas | `higgsfield-youtube-thumbnail` |
| Agentes y workflows | `n8n-skills` |

**Ojo:** son cinco recursos (algunos agrupan varias skills), dependen de tu entorno, pueden requerir servicios o créditos, y los prompts no ejecutan nada solos: envíos y activaciones requieren tu autorización.

=> [Seguir a @andresgomez.ia](https://www.instagram.com/andresgomez.ia/)
