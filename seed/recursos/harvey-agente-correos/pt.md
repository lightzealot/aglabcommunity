---
title: "HARVEY: configure seu agente e revise os primeiros e-mails"
summary: "Configure Harvey para seu negócio com aprovação manual e revise três rascunhos antes de enviar: guia em PDF, Brief e quatro prompts. Downloads com sua conta."
---
Um guia para configurar **Harvey**, o agente de vendas de código aberto de ethanplusai, para seu negócio, e revisar seus primeiros rascunhos de e-mail **antes de qualquer envio**. Inclui um `Brief-HARVEY.md` editável, quatro prompts para copiar e um checklist de três rascunhos. Abaixo, você baixa o PDF, o guia editável, o brief e os prompts.

**O que foi verificado e o que não foi:** o guia foi escrito a partir da leitura do repositório oficial ([ethanplusai/harvey](https://github.com/ethanplusai/harvey)) em **28 de outubro de 2026**: versão **0.3.0**, commit **4237f07**. **Harvey não foi instalado, nenhum comando foi executado, nenhuma conta foi conectada e nenhuma mensagem foi enviada.** Os passos específicos para Windows não estão no README e foram marcados como não verificados. Não é o Harvey dos assistentes jurídicos: é o projeto de código aberto para vendas.

**O que não promete:** respostas, reuniões, vendas nem que os e-mails cheguem à caixa de entrada. As capturas do repositório são demonstrações com dados fictícios. Há custos externos (caixa de e-mail, aquecimento, verificador) e ele usa os limites da sua assinatura do Claude.

## O que o guia inclui

1. **O que Harvey faz** e quais resultados não garante.
2. **Requisitos e custos:** Python 3.11+, Claude Pro ou Max, caixa de e-mail em domínio dedicado, verificador de e-mails.
3. **Claude Code em comparação com o chat do Claude.**
4. **Quais comandos só consultam e quais podem ativar envios**, com a aprovação manual sempre ativada (`channels.email.require_approval: true`).
5. **Baixar o repositório e abrir no Claude Code**, com passos para Windows, macOS e Linux.
6. **Produto, cliente-alvo e localização**, com um exemplo fictício de sistemas de reservas para pequenos negócios.
7. **Configurar o e-mail** com o fluxo oficial e conferir o aquecimento.
8. **Fontes e sinais** para encontrar empresas, começando pelo que é gratuito.
9. **Rascunhos:** revisar, editar, rejeitar e aprovar um por um.
10. **Pausar envios e revisar respostas** no painel.

## Os quatro prompts

1. **Diagnóstico e instalação:** somente leitura; nada é instalado sem seu “sim”.
2. **Configuração do negócio:** transfere seu brief para a configuração sem inventar dados.
3. **Revisão de três rascunhos:** destinatário, evidência, oferta, personalização e tom.
4. **Avaliação do acompanhamento:** contagens reais, sem inventar taxas de resposta.

Todos proíbem iniciar Harvey, conectar contas, abrir seu `.env` ou aprovar e-mails por você.

**Fontes oficiais:** [Repositório](https://github.com/ethanplusai/harvey) · [README](https://github.com/ethanplusai/harvey/blob/main/README.md) · [CLAUDE.md](https://github.com/ethanplusai/harvey/blob/main/CLAUDE.md) · [pyproject.toml](https://github.com/ethanplusai/harvey/blob/main/pyproject.toml) · [harvey.yaml](https://github.com/ethanplusai/harvey/blob/main/harvey.yaml) · [Claude Code](https://code.claude.com/docs/en/setup).
