---
title: "DESIGN: guia para melhorar seus sites com Claude"
summary: Qual skill ou MCP instalar primeiro, como configurar e como aplicar a um projeto real, com BRIEF.md e quatro prompts. Downloads com sua conta.
---
Um guia para escolher qual ferramenta de design instalar primeiro com **Claude Code**, configurar e aplicar a um projeto real. Inclui um `BRIEF.md` editável, quatro prompts para copiar e um checklist final. Abaixo, você baixa o PDF, o guia editável, o brief e os prompts.

**O que foi verificado e o que não foi:** as instruções vêm das fontes oficiais, consultadas em **27 de outubro de 2026**. Foi verificado em um computador com Windows que o comando do Playwright MCP é adicionado e fica conectado, e que os comandos `npx` de Emil Kowalski e Impeccable existem. As skills e Figma MCP **não foram instalados** em um projeto, **os resultados não foram testados** e não há promessa de um site profissional nem de prazo. O que não foi verificado está marcado em cada passo.

## O que instalar primeiro?

Você não precisa instalar tudo. Escolha conforme sua situação:

| Ferramenta | Tipo | Comece aqui se... | Obrigatória |
|---|---|---|---|
| **Taste** | Skill | Você cria um site do zero e não tem uma direção visual | Não |
| **Impeccable** | Skill | Você já tem um site e quer revisar composição, tipografia, cor e consistência | Não |
| **Emil Kowalski** | Skills | Você quer cuidar de animações, transições e interações | Não |
| **Figma MCP** | MCP | Você já tem um design no Figma para implementar | Não |
| **Playwright MCP** | MCP | Você quer que o Claude abra seu site em um navegador e revise | Não |

Uma **skill** dá critérios ao Claude (instruções). Um **servidor MCP** dá uma capacidade (abrir um navegador, ler Figma).

## O fluxo do guia

1. **Complete o brief:** negócio, público, objetivo, CTA, conteúdo, imagens, referências, tecnologia e requisitos de revisão.
2. **Escolha a direção visual:** o prompt 1 propõe três e para antes de programar.
3. **Implemente:** o prompt 2 constrói a direção escolhida usando apenas seu conteúdo.
4. **Ajuste os detalhes:** o prompt 3 primeiro faz um diagnóstico e corrige apenas o que você aprovar.
5. **Revise no computador e no celular:** o prompt 4 testa o site em 375, 768 e 1280 px.

Cada prompt indica o que preencher, quais arquivos consultar, o que entregar e como conferir, e pede ao Claude que avise se faltar uma integração.

## Claude Code ou Claude no navegador

Os comandos de instalação são para **Claude Code** (executado em um terminal dentro do seu projeto). Em claude.ai, você só pode enviar skills como ZIP; o suporte a Figma MCP e Playwright MCP em claude.ai **não foi verificado**. O guia explica as diferenças passo a passo.

**Fontes oficiais:** [Emil Kowalski](https://github.com/emilkowalski/skills) · [Impeccable](https://impeccable.style/) · [Taste](https://github.com/Leonxlnx/taste-skill) · [Figma MCP](https://developers.figma.com/docs/figma-mcp-server/) · [Playwright MCP](https://github.com/microsoft/playwright-mcp).
