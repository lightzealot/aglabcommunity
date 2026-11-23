---
title: 4 MCP para ampliar seu agente de programação
summary: "Context7, Chrome DevTools, Supabase e Vercel: instalação para Claude Code e Codex, testes de verificação, oito prompts e um exercício completo. Downloads com sua conta."
---
Conecte documentação, navegador, banco de dados e deploys ao **Claude Code** e ao **Codex**. Verificado com a documentação oficial em **20 de outubro de 2026**; **nada foi executado**, então os comandos correspondem à documentação, mas não são apresentados como testados. O que não foi verificado está marcado como *pendente*. Abaixo, você pode baixar o PDF completo, o checklist e os 8 prompts.

**MCP** (Model Context Protocol) é um padrão para um agente usar ferramentas externas. **Remoto** = o servidor está na internet (URL, geralmente usa OAuth, login no navegador). **Local** = um programa no seu computador (aqui, com `npx`). Instalar os quatro **não garante código correto nem apps prontos para produção**. Um servidor MCP age com suas permissões: conecte apenas se confiar, mantenha a **aprovação manual** ativada e desconfie do conteúdo externo (injeção de instruções).

## Os quatro

| | Para quê | Tipo | Requisitos |
|---|---|---|---|
| **Context7** | Documentação atual da versão de uma biblioteca que você usa | Remoto ou local | Chave de API recomendada (gratuita no painel) |
| **Chrome DevTools** | Controlar e inspecionar um Chrome real | Local | Node LTS e Chrome estável |
| **Supabase** | Tabelas, consultas e logs do seu projeto | Remoto | Conta do Supabase |
| **Vercel** | Projetos, deploys e logs | Remoto | Conta da Vercel e permissões da equipe |

**Onde executar cada coisa:** os comandos `claude mcp …`, `codex mcp …` e `npx …` vão no **terminal**; `/mcp` e os prompts, **dentro** do Claude Code ou do Codex (`claude` ou `codex` na pasta do projeto). Claude Code salva a configuração por escopo (`--scope local|project|user`; a do projeto fica em `.mcp.json`); Codex, em `~/.codex/config.toml`.

## 1. Context7

**Claude Code** (terminal; substitua `TU_CLAVE_API`):

```bash
claude mcp add --scope user --transport http context7 https://mcp.context7.com/mcp --header "Authorization: Bearer TU_CLAVE_API"
```

**Codex** (terminal):

```bash
codex mcp add context7 -- npx -y @upstash/context7-mcp
```

Com chave: acrescente `--api-key TU_CLAVE_API` no final. Remoto em `config.toml`: `url = "https://mcp.context7.com/mcp"` e `http_headers = { "Authorization" = "Bearer TU_CLAVE_API" }`.

**Confira:** `claude mcp list` ou `codex mcp list`, e `/mcp` dentro do agente. **Teste:** “Use Context7 para explicar como definir uma rota com a versão de [BIBLIOTECA] deste projeto. Cite a versão.”

**Erros:** deixar `TU_CLAVE_API` sem substituir; não indicar a versão. *Pendente:* se funciona sem chave e quais são os limites.

## 2. Chrome DevTools MCP

**Claude Code:** `claude mcp add chrome-devtools --scope user npx chrome-devtools-mcp@latest`

**Codex:** `codex mcp add chrome-devtools -- npx chrome-devtools-mcp@latest`

**Teste:** ?Abra http://localhost:3000, faça uma captura de tela e diga se há erros no console.” (com seu servidor local em execução). Abre uma janela do Chrome controlada pelo agente; com `--headless`, roda sem janela.

**Privacidade:** expõe o conteúdo do navegador ao agente: **não abra sessões pessoais** nem compartilhe dados sensíveis. As estatísticas de uso vêm ativadas (`--no-usage-statistics` desativa). Suporte oficial: Chrome e Chrome for Testing.

*Pendente:* o projeto usa `startup_timeout_ms` no `config.toml` de Windows, e o Codex documenta `startup_timeout_sec`; use o que estiver documentado para sua versão.

## 3. Supabase MCP

Use um **projeto de testes**, com escopo e somente leitura na URL: `https://mcp.supabase.com/mcp?project_ref=ID_DE_TU_PROYECTO&read_only=true`.

**Claude Code:**

```bash
claude mcp add --scope project --transport http supabase "https://mcp.supabase.com/mcp?project_ref=ID_DE_TU_PROYECTO&read_only=true"
```

Depois `/mcp` → `supabase` → *Authenticate* (login no navegador). Não coloque chaves em `.mcp.json`: ele → compartilhado com sua equipe.

**Codex:**

```bash
codex mcp add supabase --url "https://mcp.supabase.com/mcp?project_ref=ID_DE_TU_PROYECTO&read_only=true"
codex mcp login supabase
```

**Teste:** “Liste as tabelas do meu projeto e quantas linhas cada uma tem. Não modifique nada.”

**Riscos (segundo a documentação):** injeção de instruções a partir de dados não confiáveis; mantenha a aprovação manual, evite dados de produção e use `project_ref`, `read_only` e dados de exemplo. Não disponibilize este servidor aos clientes: ele roda com suas permissões.

## 4. Vercel MCP

**Claude Code:** `claude mcp add --transport http vercel https://mcp.vercel.com` e depois `/mcp` → autenticar.

**Codex:** `codex mcp add vercel --url https://mcp.vercel.com` (abre o navegador para autorizar; caso contrário, `codex mcp login vercel`).

**Consultar não é criar.** Para **consultar**: `list_deployments`, `get_deployment`, `get_runtime_logs`, `get_runtime_errors`, `list_projects`. Para **criar ou alterar**: segundo um anúncio de 23 de julho de 2026, existe `deploy_to_vercel`, além de ferramentas que modificam recursos. *Pendente:* os requisitos de Git ou CLI e se faz deploy de prévia ou de produção.

**Permissões:** adicionar o servidor não autoriza o acesso: faça login e conceda acesso apenas à equipe necessária. **MCP e CLI da Vercel usam autenticações separadas.** Mantenha a confirmação humana em cada ação.

**Teste:** “Liste minhas equipes e projetos da Vercel. Não faça nenhuma alteração.”

## 8 prompts (2 por ferramenta)

```text
Context7 · Use Context7 com a versão de [BIBLIOTECA] deste projeto (veja package.json) para explicar como [TAREFA]. Cite a versão; se não a tiver, avise.
```

```text
Context7 · Revise [ARQUIVO] com a documentação atual de [BIBLIOTECA] e liste padrões obsoletos: linha, o que a documentação diz e proposta. Não modifique nada.
```

```text
DevTools · Abra [URL LOCAL], faça uma captura de tela e revise console e rede. Entregue um relatório: erros, requisições lentas e arquivo provável. Não faça login em nenhuma conta.
```

```text
DevTools · Teste este fluxo em [URL]: [PASSOS]. Depois de cada passo, diga o que viu e faça uma captura se falhar. Não envie formulários com dados reais.
```

```text
Supabase · Em modo somente leitura, liste as tabelas do meu projeto de testes com colunas e relações e proponha melhorias. Não execute nada que altere dados.
```

```text
Supabase · No meu projeto de testes, crie a tabela [NOME] com [COLUNAS] e [N] linhas fictícias. Mostre o SQL e espere minha aprovação. Não mexa em outras tabelas.
```

```text
Vercel · Busque o último deploy de [PROJETO] da equipe [EQUIPE]; se falhou, revise logs e erros e explique a causa. Apenas consulte.
```

```text
Vercel · Quero uma prévia de [PROJETO]. Diga as opções (Git, CLI da Vercel ou Vercel MCP) e o que cada uma exige. Não faça deploy até eu escolher.
```

## Exercício: mini app de recursos

Pasta nova, projetos de **teste** e dados **fictícios**. 1) Conecte os quatro e faça cada teste. 2) Com Context7, escolha framework e versão. 3) No Supabase, crie `recursos` (`titulo`, `enlace`, `etiqueta`) com 5 linhas de exemplo; revise o SQL antes. 4) Peça uma página que leia a tabela com chaves em variáveis de ambiente (sem colar no chat). 5) Teste com DevTools e corrija os erros de console. 6) Decida com Vercel como fazer deploy de uma prévia (consulte a documentação; pendente de verificação aqui). 7) Revise e **limpe**: apague os projetos de teste e `claude mcp remove <nombre>`.

Isso não demonstra que o código é seguro nem que está pronto para produção.

## Checklist

- [ ] Sei onde executar cada comando (terminal / dentro do agente).
- [ ] Cada servidor aparece em `list` e em `/mcp`.
- [ ] Chaves fora dos arquivos e do repositório.
- [ ] Supabase: projeto de testes, `project_ref` e `read_only=true`.
- [ ] Vercel: acesso apenas à equipe necessária.
- [ ] Aprovação manual ativada; revisei o código antes de publicar.

**Documentação oficial:** [Context7](https://github.com/upstash/context7) · [Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp) · [Supabase MCP](https://supabase.com/docs/guides/ai-tools/mcp) · [Vercel MCP](https://vercel.com/docs/agent-resources/vercel-mcp) · [Claude Code MCP](https://code.claude.com/docs/en/mcp) · [Codex MCP](https://developers.openai.com/codex/mcp) (redireciona para uma página da OpenAI em `learn.chatgpt.com`).
