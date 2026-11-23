---
title: "AG Finance: controle suas finanças pessoais com Claude, Gmail e Google Sheets"
summary: Um prompt que monta sua planilha de gastos a partir do Gmail e um painel com vencimentos, cobranças fixas e um ícone para ocultar valores. Prompt e guia em PDF com sua conta.
---
Um único prompt que você passa para o Claude e ele monta o **AG Finance**: uma planilha no Google Sheets com seus gastos lidos do Gmail, um painel que responde a três perguntas (para onde vai cada peso?, quais contas vencem e quando?, quanto pago de despesas fixas por mês?) e um ícone de olho para ocultar os valores. Abaixo, você baixa o prompt pronto para colar e um guia em PDF.

**Antes de começar:** funciona com Claude Code, ou com Claude com os conectores de **Gmail, Google Sheets e Google Calendar** (n8n é opcional, apenas para ler PDFs e ZIPs anexados). É um assistente que prepara e organiza: o que não encontrar em um e-mail fica como "A confirmar", sem inventar. Não é assessoria financeira, contábil nem tributária.

## O que faz, em ordem

| Etapa | O que acontece |
|---|---|
| **0. Entrevista** | Pergunta seu país e moeda, bancos e cartões, a partir de qual data registrar e quais conectores você tem |
| **1. Google Sheets** | Cria "AG Finance" com as abas Movimentações, Assinaturas, Vencimentos e Parcelas |
| **2. E-mails e extratos** | Registra gastos, remove duplicatas e classifica com regras que você pode editar |
| **3. Anexos (opcional)** | Com n8n, lê PDFs e ZIPs do e-mail; sem n8n, você os anexa no chat |
| **4. Painel** | Números principais, próximas cobranças, gastos por categoria e semana, e tabelas de cobranças fixas, contas e parcelas |
| **5. Encerramento** | Link para o painel e a planilha, pendências agrupadas e, se você quiser, lembretes no Calendar |

## As 7 regras que vêm no prompt

1. **Não inventa dados:** o que for incerto fica como "A confirmar", com a fonte.
2. **Discorda de você com respeito:** se seu dado contradiz um documento, mostra a diferença.
3. **Faz perguntas em conjunto**, com opções, e continua trabalhando enquanto você responde.
4. **Avisa qual ferramenta vai usar** antes de usá-la.
5. **Verifica antes de dizer "pronto":** relê a planilha, recalcula os totais e abre o painel.
6. **Privacidade em primeiro lugar:** só os e-mails que você autorizar, sem salvar senhas de PDFs e sem publicar números reais em um lugar público.
7. **Responde de forma breve**, em português, começando pela resposta.

## Como usar

1. Baixe `ag-finance-prompt.md`, copie todo o conteúdo e cole no Claude Code (ou no Claude com os conectores ativos).
2. Responda à entrevista inicial. No caso de PDFs com senha: você fornece a senha apenas para leitura, ela não é salva.
3. Revise os itens "A confirmar" e as transferências "A classificar": agrupados, uma pergunta por conta.
4. Ajuste a aba **Regras** quando quiser: texto que contém, estabelecimento, categoria e tipo.

## Cuide dos seus dados

- O painel mostra seus valores reais: **não compartilhe publicamente**. Quem abrir precisa ter acesso à planilha.
- Os pagamentos de cartão de crédito não contam como gasto, para não somar duas vezes o que foi consumido.
- Se um conector não funcionar dentro da página publicada, o Claude avisa e propõe uma alternativa.

**Quer que a gente adapte ao seu caso? Envie FINANZAS para @andresgomez.ia.**

=> [Instagram: @andresgomez.ia](https://www.instagram.com/andresgomez.ia/)
