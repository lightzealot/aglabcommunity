---
title: Dê um computador ao seu agente com CUA
summary: Como instalar CUA, conectar Claude Code, Codex ou outro agente a uma área de trabalho e fazer um primeiro teste verificável. Guia em PDF e checklist com sua conta.
---
Como conectar seu agente de programação (Claude Code, Codex, Cursor e outros) a uma área de trabalho que ele possa ver e controlar, com **CUA**. Verificado com a documentação oficial em **26 de outubro de 2026**; **nada foi instalado nem executado**, então os comandos correspondem à documentação, mas não são apresentados como testados. Abaixo, você pode baixar o PDF, o guia editável e um checklist.

**Dois caminhos:** **CUA Spaces** conecta seu agente a uma área de trabalho (você começa pelo próprio computador e pode adicionar um ambiente separado depois). **CUA Driver** opera os aplicativos da máquina onde está instalado, em segundo plano. Para seu primeiro teste, Spaces basta.

## Requisitos

| | Requisito |
|---|---|
| **macOS** | macOS 26 ou posterior |
| **Windows** | Windows 11 (prévia); Home serve e não precisa de Hyper-V |
| **Linux** | Ubuntu 24.04 |
| **Agente** | Um compatível: Claude Code, Codex, Cursor… |
| **Conta** | Não é necessária para usar no seu computador; a gratuita serve para acessar de outros computadores |

Um espaço adicional no Linux precisa de um mecanismo de contêineres (Docker); no macOS, um Mac com Apple silicon e cerca de 50 GB livres. Os preços não aparecem no guia de início, por isso não os incluo.

## Instale

Baixe o instalador em cua.ai/download ou use o terminal:

```bash
curl -fsSL https://cua.ai/install.sh | sh
```

```powershell
irm https://cua.ai/install.ps1 | iex
```

O primeiro é para macOS e Linux; o segundo, para Windows. **Eles baixam e executam um instalador: revise antes se preferir.** Depois abra CUA Spaces, escolha seu agente (**Connect**), conceda as duas permissões que o sistema pede e reinicie o agente.

## Confira a conexão

```bash
cua agents detect
cua agents status
```

Se seu agente não aparecer: **Settings → AI agents → Configure**, ou `cua agents setup --agents claude,codex --yes`. Manualmente: `claude mcp add cua -- cua daemon mcp` ou `codex mcp add cua -- cua daemon mcp`. A configuração → **por computador**.

## Primeiro teste

```text
Liste os computadores ou Spaces disponíveis. Diga a qual você vai se conectar antes de agir. Nessa área de trabalho, abra a calculadora, calcule 6 × 7 e confira visualmente que ela mostra 42. Ao terminar, diga o que você verificou.
```

Se não encontrar ferramentas, reinicie o agente e confira `cua agents status`. Se enxergar a área de trabalho mas não agir, revise as permissões do sistema. Se escolher outra área de trabalho, interrompa a tarefa.

## Segurança e alternativa com Driver

- O agente age com **suas permissões**: teste primeiro com tarefas sem dados sensíveis.
- O modo padrão do Driver permite enviar entradas a **todos** os aplicativos, e uma lista de permissões vazia **libera tudo**.
- Para desfazer: `cua agents remove --dry-run` e depois `cua agents remove`.
- **Hermes:** `hermes tools enable computer_use --platform cli`, sem adicionar um segundo servidor MCP. **OpenClaw:** `cua-driver mcp-config --client openclaw`, execute o que ele exibir e reinicie.

**Pendente de verificação:** o caminho exato das permissões no macOS, se Pi precisa da CLI e os preços. **Documentação:** [Início rápido](https://cua.ai/docs/spaces/quickstart) · [Conecte seu agente](https://cua.ai/docs/spaces/guides/connect-your-agent) · [CLI e MCP](https://cua.ai/docs/cua-cli/guides/mcp-server) · [Driver](https://cua.ai/docs/cua-driver/guides/connect-your-agent).
