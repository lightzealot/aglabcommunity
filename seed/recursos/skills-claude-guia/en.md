---
title: 5 skill resources to take Claude beyond the chat
summary: Links, requirements and prompts to explore prospects, sales, web design, thumbnails and agents with Claude.
---
Five skill resources to take Claude beyond the chat. A skill bundles instructions and resources for a specific task; how you use it depends on your assistant and environment, and some need extra tools or services. The links let you **look at** the resources: not all of them install the same way.

**How to use them:** pick by goal, open the documentation, check the requirements and adapt the prompt.

## 5 · Find prospects: `lead-research-assistant`

**You need:** an assistant with skills and web search. Provide your offer, location and criteria. [Resource](https://github.com/ComposioHQ/awesome-claude-skills/blob/master/lead-research-assistant/SKILL.md)

```text
I offer [service] to [type of company] in [country]. Find 10 companies that fit. For each one: official website, one verifiable sign of need, its source and a first-contact proposal. Mark anything you can't verify as unconfirmed.
```

**Check:** open the sources for three companies and make sure the sign really applies to them. A target job title is not a verified person or email.

## 4 · Organize sales: `cold-email` + `sales-enablement` + `revops`

**You need:** context about your product, ideal client, offer and stages. Sending messages or writing to a CRM needs extra connections.
[Messages](https://github.com/coreyhaines31/marketingskills/tree/main/skills/cold-email) · [Proposals](https://github.com/coreyhaines31/marketingskills/tree/main/skills/sales-enablement) · [Sales process](https://github.com/coreyhaines31/marketingskills/tree/main/skills/revops)

```text
I sell [service] to [client]. Design a five-stage process, an opening message, two follow-ups and a one-page proposal. Use only the benefits and proof I attach. Prepare drafts without sending them.
```

**Check:** every message proposes a clear next step, the proposal reflects your real offer and automatic follow-ups stop when someone replies.

## 3 · Build a first website: `frontend-design`

**You need:** an environment that creates and previews HTML/CSS or your framework. Publishing and backend are set up separately. [Resource](https://github.com/anthropics/skills/tree/main/skills/frontend-design)

```text
Create a landing page for [service] aimed at [audience]. Include the problem, the offer, how it works and a button to [action]. Use these real texts and data: [attached]. Make it mobile-friendly and leave a local preview.
```

**Check:** mobile and desktop, links and buttons. A form that's drawn on the page doesn't mean it sends data.

## 2 · Design thumbnails: `higgsfield-youtube-thumbnail`

**You need:** the Higgsfield CLI, a signed-in session and credits. If you want to appear, a photo of yourself and the video's real promise. [Resource](https://github.com/higgsfield-ai/skills/tree/main/higgsfield-youtube-thumbnail)

```text
Prepare two 16:9 thumbnail concepts for a video about [topic]. The real promise is [promise]. Use my attached photo and the text [four words max]. Describe both concepts and the cost first, before generating.
```

**Check:** look at it at a small size; identity and readability. Design doesn't guarantee clicks.

## 1 · Agents with n8n: `n8n-skills`

**You need:** an n8n instance. To create workflows from the assistant, set up n8n-mcp; external models and services ask for their own credentials. [Package](https://github.com/czlonkowski/n8n-skills) · [Patterns](https://github.com/czlonkowski/n8n-skills/tree/main/skills/n8n-workflow-patterns)

```text
Design an n8n agent that receives a question and queries a knowledge base. Describe the nodes, tools and credentials. Validate the workflow and prepare three test cases. Leave it inactive until the results are reviewed.
```

**Check:** try a valid question, one with no answer and one with empty data. Validating the structure doesn't prove the logic works.

## Which one should I pick?

| I need… | Use |
|---|---|
| Prospects | `lead-research-assistant` |
| Organized sales | `cold-email` + `sales-enablement` + `revops` |
| A web interface | `frontend-design` |
| Thumbnails | `higgsfield-youtube-thumbnail` |
| Agents and workflows | `n8n-skills` |

**Heads-up:** these are five resources (some group several skills), they depend on your environment, may require services or credits, and the prompts don't run anything on their own: sends and activations need your authorization.

=> [Follow @andresgomez.ia](https://www.instagram.com/andresgomez.ia/)
