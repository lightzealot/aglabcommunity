---
title: "AI Job Search: o framework gratuito que transforma Claude Code no seu assistente para conseguir emprego"
summary: Como instalar AI Job Search e usar /setup, /scrape, /apply e /interview para se candidatar com currículo e carta personalizados, revisados por um segundo agente. Guia completo para ler aqui; os arquivos podem ser baixados com sua conta gratuita.
---
AI Job Search é um framework **gratuito e de código aberto** que transforma Claude Code no seu assistente de busca de emprego: monta seu perfil a partir do currículo, busca vagas, ordena pelo quanto combinam com você, escreve um currículo e uma carta de apresentação personalizados, pede a um segundo agente que atue como recrutador para revisá-los e prepara você para a entrevista. Aqui você aprende a instalar e usar, passo a passo.

**Antes de começar:** o framework é gratuito (licença MIT), mas **Claude Code não tem plano gratuito**. Você precisa de uma assinatura Claude Pro, Max ou Team, ou créditos da API da Anthropic. É um projeto independente: não pertence à Anthropic nem tem vínculo com ela.

## O que é e por que funciona

Foi criado por um geofísico quando seu cargo foi extinto no fim de 2025. Ele usou o sistema toda semana na própria busca e, segundo conta no README, fez **69 candidaturas personalizadas, conseguiu 20 entrevistas iniciais e assinou um contrato**. Começou como engenheiro de IA em junho de 2026.

| Dado | Valor (em 19 de nov. de 2026) |
|---|---|
| Estrelas no GitHub | 72.6k |
| Forks | 23.3k |
| Licença | MIT |
| Versão atual | v2.0.0 |
| Onde roda | No seu computador, com seus arquivos |

=> [Abra o repositório no GitHub](https://github.com/ai-job-search-dev/ai-job-search)

## Passo 0. Do que você precisa

- **Claude Code:** a ferramenta de linha de comando, com plano Pro, Max ou Team, ou créditos da API.
- **Python 3.10 ou superior:** para as ferramentas da pasta `tools/`.
- **LaTeX** com `lualatex` e `xelatex` (TeX Live, MacTeX, TinyTeX ou MiKTeX): é o que compila seu currículo e sua carta em PDF.
- **Bun:** só se você for usar portais de emprego da comunidade.
- **pypdf (opcional):** `pip install pypdf`, para conferir se seu currículo é lido corretamente por sistemas ATS.

## Passo 1. Faça sua cópia privada

Seu perfil vai guardar dados pessoais (nome, contato, histórico, pretensão salarial). Por isso, **não faça um fork**: forks de repositórios públicos são sempre públicos. Faça uma cópia privada:

```
gh repo clone ai-job-search-dev/ai-job-search
cd ai-job-search
git remote rename origin upstream
gh repo create ai-job-search --private --source=. --remote=origin --push
```

Se não usa a ferramenta `gh` do GitHub, baixe o código como `.zip` e trabalhe nessa pasta sem enviá-la a nenhum repositório público.

## Passo 2. Monte seu perfil com /setup

Abra Claude Code dentro da pasta e execute o comando:

```
claude
/setup
```

Você tem três caminhos, e o comando identifica qual serve para você:

- **Pasta `documents/`:** coloque ali seu currículo em PDF, sua exportação do LinkedIn, diplomas, cartas de referência ou candidaturas antigas. Você pode executar de novo quando adicionar mais documentos.
- **Cole seu currículo** diretamente no chat.
- **Entrevista:** faz perguntas e monta o perfil com suas respostas.

**Dica essencial:** quanto mais detalhes você fornecer, melhores ficam as candidaturas. Não liste apenas cargos: conte sobre projetos, ferramentas, conquistas com números e o que você gostava ou achava desgastante em cada trabalho.

## Passo 3. Busque vagas com /scrape e /rank

```
/scrape
```

Busca em portais de emprego vagas que combinam com seu perfil, remove duplicatas e apresenta os resultados em ordem de compatibilidade. Se você não instalou nenhum portal, usa a busca na web do Claude.

- Se aparecerem muitas vagas, use `/rank` para pontuar todas e ficar com uma lista curta.
- Para seu país, procure o portal no repositório [community-portals](https://github.com/ai-job-search-dev/community-portals) ou crie um com `/add-portal`. **Leia o código** de qualquer portal antes de usá-lo: ele roda na sua máquina com seus dados.
- Para mudar o que você busca (cargos, cidades, habilidades) sem refazer tudo: `/setup --section search`.

## Passo 4. Candidate-se com /apply

Passe o link da vaga ou cole a descrição se o portal bloquear o acesso:

```
/apply https://link-de-la-oferta
```

Veja o que ele faz, em ordem:

1. Lê a vaga e passa por um **filtro de segurança** (texto oculto, caracteres invisíveis, instruções escondidas).
2. **Avalia a compatibilidade** com seu perfil: habilidades, experiência, cultura, localização e rumo profissional.
3. Escreve um **currículo e uma carta personalizados** em LaTeX.
4. Aciona um **segundo agente revisor** que pesquisa a empresa e critica os rascunhos, como faria um recrutador.
5. **Corrige** de acordo com essa análise.
6. Compila os PDFs e confere: currículo com **exatamente 2 páginas** e carta com **1 página**.
7. Verifica se o currículo é lido corretamente por um **sistema ATS** e mede quais palavras-chave da vaga ele cobre.

Tudo o que coloca no currículo é conferido com seu perfil real: **não inventa habilidades nem experiência**.

## Passo 5. Prepare a entrevista com /interview

```
/interview
```

Monta um pacote de preparação para a etapa da entrevista em que você está e faz uma **simulação de entrevista**. Leve seus exemplos reais no formato STAR para que as respostas tenham a sua cara.

## Mais comandos úteis

| Comando | O que faz |
|---|---|
| `/outcome` | Registra resultados, arquiva o que você enviou e redige mensagens de acompanhamento |
| `/gmail-sync` | Propõe atualizar o status das suas candidaturas a partir do Gmail |
| `/notion-sync` | Publica uma visão somente leitura da sua busca no Notion |
| `/html-report` | Gera um painel offline com suas candidaturas |
| `/upskill` | Identifica lacunas nas suas habilidades e monta um plano de aprendizado |
| `/add-template` | Usa seu próprio modelo de currículo ou carta |
| `/reset` | Apaga seu perfil ou seus documentos (pede para digitar RESET para confirmar) |

## O prompt para começar com o pé direito

Quando terminar `/setup`, peça isto ao Claude Code para aprimorar seu perfil antes de se candidatar:

```
Revise meu perfil completo e me diga: 1) quais experiências descrevi sem conquistas mensuráveis, 2) quais habilidades menciono sem contexto de onde as usei e 3) três tipos de cargo que combinam com meu histórico e que talvez eu não esteja considerando. Faça perguntas para completar o que faltar, uma por vez.
```

## Antes de enviar sua primeira candidatura

- **Revise tudo antes de enviar:** o agente pode errar. Leia o currículo e a carta como se outra pessoa os tivesse escrito.
- **Vagas como texto não confiável:** o framework não segue instruções escondidas nas vagas, mas, em portais que você não conhece, confira o que ele baixou antes de enviar.
- **Seus dados ficam na sua máquina:** mantenha sua cópia privada.
- **Seja transparente se perguntarem:** o autor contou em todas as entrevistas que usava este sistema e, segundo ele, isso abriu conversas técnicas em vez de prejudicá-lo.

**Quer ajuda para adaptar à sua busca? Envie TRABAJO para @andresgomez.ia.**
