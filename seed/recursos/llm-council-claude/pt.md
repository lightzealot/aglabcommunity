---
title: "Claude concorda com você em tudo? LLM Council: 5 conselheiros e um veredito"
summary: Como instalar e usar LLM Council, a skill gratuita que submete sua decisão a 5 conselheiros de IA que revisam uns aos outros e entregam um veredito com um passo claro. Guia completo para ler aqui; os arquivos podem ser baixados com sua conta gratuita.
---
Claude concorda com você em tudo? Pergunte se sua ideia é genial e ele monta um argumento impecável. Pergunte por que ela é péssima e ele monta outro igualmente convincente. **LLM Council** muda isso: é uma skill gratuita, criada por Ole Lehmann e baseada no método LLM Council de Andrej Karpathy, que submete sua pergunta a **cinco conselheiros com perspectivas diferentes**, faz com que revisem uns aos outros sem saber quem escreveu o quê e termina com **um veredito e um único passo claro**.

=> [Veja a skill no GitHub](https://github.com/aiwithremy/claude-skills-llm-council)

**Funciona em:** Claude Code e Claude Cowork (claude.ai). Tem mais de 3.000 estrelas no GitHub (3.192 em 21 de novembro de 2026).

## Como instalar (sem terminal)

**Opção 1. Deixe o Claude instalar para você.** Abra um novo chat no Claude e cole isto:

```
Instale esta skill do Claude para mim. O arquivo SKILL.md está neste repositório do GitHub: https://github.com/aiwithremy/claude-skills-llm-council

Deixe pronta para eu usar e me oriente no que precisar de mim.
```

**Opção 2. Baixe o arquivo e peça para configurar.**

1. Entre no repositório e abra o arquivo `SKILL.md`.
2. Baixe pelo botão de download à direita.
3. Abra o Claude e cole isto:

```
Acabei de baixar um arquivo chamado SKILL.md da skill LLM Council. Pode me ajudar a instalar? Diga onde preciso colocar.
```

## Como usar

A skill responde a frases em inglês. Em qualquer conversa, escreva uma destas, seguida da sua pergunta:

| Frase | Para quê |
|---|---|
| `council this` | Submeter sua pergunta ao conselho |
| `run the council on [sua pergunta]` | O mesmo, com a pergunta na mesma linha |
| `pressure-test this` / `stress-test this` | Colocar uma ideia ou plano à prova |
| `war room this` | Decisões urgentes com muito em jogo |

Você pode escrever sua pergunta em português: os conselheiros respondem sobre o que você pedir.

## Os cinco conselheiros

| Conselheiro | O que faz |
|---|---|
| **1. O que discorda** | Busca o que vai matar sua ideia. Parte do princípio de que há uma falha fatal e vai atrás dela. |
| **2. O dos primeiros princípios** | Ignora sua pergunta e pergunta o que você realmente tenta resolver. às vezes diz que você está fazendo a pergunta errada. |
| **3. O expansionista** | Busca o potencial que você não vê: o que acontece se der ainda mais certo do que o esperado. |
| **4. O de fora** | Não recebe nada do seu contexto. Vê o óbvio que você já deixou de notar. |
| **5. O executor** | Só se importa com o que você vai fazer na segunda-feira de manhã. Se não houver um primeiro passo claro, ele avisa. |

Eles são escolhidos para discordar: o que discorda contra o expansionista (risco contra potencial), primeiros princípios contra o executor (repensar tudo contra fazer agora) e o de fora no meio, vendo o que alguém novo vê.

## O que acontece por dentro

1. **Enquadra sua pergunta.** Revisa seus arquivos de contexto (por exemplo `CLAUDE.md` ou uma pasta `memory/`) e reescreve a pergunta de forma neutra, com o que está em jogo.
2. **Convoca o conselho.** Aciona os cinco conselheiros ao mesmo tempo como subagentes; cada um responde em 150 a 300 palavras a partir da sua perspectiva, sem suavizar.
3. **Revisão anônima.** Mistura as respostas como A, B, C, D e E. Cinco revisores dizem qual é a mais forte, qual tem o maior ponto cego e o que passou despercebido por todas.
4. **O presidente.** Reúne tudo em um veredito com cinco partes: onde concordam, onde discordam, os pontos cegos que surgiram na revisão, a recomendação e **a primeira coisa que você precisa fazer**.

## Perguntas que valem a pena

- “Lanço um workshop de 97 dólares ou um curso de 497?”
- “Qual destas três abordagens para minha marca é a mais forte?”
- “Estou pensando em passar de X para Y. Estou maluco?”
- “Esta é a página da minha oferta. O que está fraco?”
- “Contrato um assistente ou automatizo primeiro?”

E as que não valem: perguntas com uma única resposta (“qual é a capital da França?”), tarefas de criação (“escreva um post”) ou de processamento (“resuma este artigo”). O conselho serve quando há dúvida de verdade e errar custa caro.

## Modelo para sua primeira consulta

```
council this: [sua decisão em uma frase].

Contexto: [com o que você trabalha, em que etapa está, números relevantes].
Opções que estou considerando: [A], [B].
O que está em jogo: [o que acontece se eu errar].
O que já tentei: [se for o caso].
```

## Leve em conta

- Cada consulta aciona cerca de onze subagentes (cinco conselheiros, cinco revisores e o presidente), então **consome mais uso do que uma pergunta normal**. Guarde para as decisões importantes.
- Se você já sabe a resposta e só quer que concordem, o conselho provavelmente vai dizer o que você não quer ouvir. Essa é a ideia.
- É um projeto de terceiros: o repositório pode mudar. Revise o `SKILL.md` antes de instalar.

**Que decisão você levaria ao conselho? Conte em @andresgomez.ia.**
