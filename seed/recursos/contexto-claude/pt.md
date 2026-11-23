---
title: "CONTEXTO: organize suas instruções para trabalhar melhor com Claude"
summary: Cinco mudanças com antes e depois, mapa de componentes, checklist, modelo de CLAUDE.md, prompt de auditoria em modo leitura e um método para comparar resultados. Downloads com sua conta.
---
Organize o que você fornece ao Claude antes de pedir algo: instruções, arquivos, ferramentas, memória e exemplos do resultado. Data de consulta das fontes: **19 de outubro de 2026**. Abaixo, você pode baixar o PDF completo, o checklist e o prompt de auditoria. Os exemplos usam um projeto fictício (Café Brisa Norte).

**Artigo base:** [The new rules of context engineering for Claude 5 generation models](https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models) (publicado em 24 de julho de 2026; o link redireciona para um endereço de `claude.dev`, e este guia se apoia na documentação de [code.claude.com](https://code.claude.com/docs/en/memory)).

## Os “80%”: o que significam e o que não significam

Segundo o artigo, a Anthropic removeu **mais de 80% da instrução de sistema do Claude Code** para modelos como Opus 5 e Fable 5, sem perda mensurável nas avaliações internas. É uma afirmação da empresa, sem definição da medida e não reproduzida aqui.

**Isso não significa apagar 80% das suas instruções:** elas são outra camada (suas convenções, armadilhas e restrições), e uma porcentagem não distingue o que está obsoleto de uma restrição de segurança. A pergunta útil, da documentação, é: *“Remover esta linha faria o Claude cometer erros?”* Se não, ela é dispensável.

## As 5 mudanças

**1. Menos ordens, mais autonomia.** Troque proibições absolutas de estilo pela forma de trabalhar que você espera.
- Antes: `NUNCA escreva comentários. NUNCA crie funções com mais de 20 linhas.`
- Depois: `Escreva código que siga o estilo do código ao redor. Comente apenas o que não fica claro pela leitura.`
- Atenção: **as restrições de segurança são mantidas**.

**2. Ferramentas e interfaces úteis.** Uma ferramenta bem projetada vale mais que dez exemplos.
- Antes: 10 exemplos de como chamar um script. Depois: `python registrar.py --ayuda` e estados definidos (`pendiente | en_preparacion | entregado`).

**3. Contexto em arquivos consultados quando necessário.** `CLAUDE.md` curto (menos de 200 linhas); procedimentos em skills; regras por caminho para determinados arquivos.
- Atenção: **importar com `@` não economiza contexto**, o conteúdo importado também é carregado ao iniciar.

**4. Memória.** O Claude salva notas por conta própria (sobre você, correções, decisões e referências); deixe o que é estável em `CLAUDE.md`.
- Você vê e ativa com `/memory`; configuração `autoMemoryEnabled`; variável `CLAUDE_CODE_DISABLE_AUTO_MEMORY=1`.
- Limites: apenas as **primeiras 200 linhas ou 25 KB** de `MEMORY.md` são carregadas; é **local ao seu computador**; não é compartilhada.

**5. Referências concretas.** Um mockup, um teste ou uma rubrica valem mais que uma descrição.
- Antes: “faça uma página bonita de pedidos”. Depois: `Referência: @mockups/pedidos.html. Deve passar: @pruebas/pedido-completo.test.js. Revise com @docs/rubrica-pagina.md.`

## Onde vai cada coisa

| O que é? | Onde fica |
|---|---|
| Deve ser cumprido sem exceção | Permissão ou hook |
| Vale para tudo | `CLAUDE.md` (curto) |
| Só para determinados arquivos | Regra por caminho (`.claude/rules/`) |
| Um procedimento | Skill com referências separadas |
| Material de consulta | `docs/`, `referencias/` (com `@`) |
| Aprendido durante o trabalho | Memória automática |

`CLAUDE.md` é contexto, **não** uma configuração de cumprimento obrigatório: o que é crítico deve ser uma permissão ou hook.

## `/doctor`: o que foi verificado

| Comando | O que faz segundo a documentação | Altera arquivos |
|---|---|---|
| `/doctor` | Verifica a configuração (instalação, extensões, `CLAUDE.md`, permissões) | Informa e pede confirmação |
| `claude doctor` | Diagnóstico de instalação no terminal | Não (somente leitura) |
| `/doctor prompt-audit [ruta]` | Audita instruções; relatório com edições propostas | Só quando você pedir. Requer **v2.1.283+** |

O artigo apresenta isso como simplificação automática e mistura os nomes; a documentação fala em **relatório e confirmação**. Não existe limpeza automática universal. Nenhum comando foi executado.

## Modelo breve de CLAUDE.md

```markdown
# Café Brisa Norte: site de pedidos
## O que é
Site para pedir e retirar. Uma única loja. Dados de exemplo fictícios.
## Comandos
- `npm run dev` · `npm test` (antes de considerar algo concluído) · `npm run lint`
## Forma de trabalhar
- Siga o estilo do código ao redor.
- Em mudanças que envolvam vários arquivos, resuma o plano e espere minha confirmação.
- Ao terminar, mostre a saída dos testes.
## Armadilhas
- Os preços ficam em `src/precios.ts`; só são alterados com aprovação do dono.
- O horário de retirada usa o fuso horário da loja.
## Segurança (sempre mantida)
- Nunca escreva chaves; elas são lidas de variáveis de ambiente.
- Não leia nem modifique `.env` nem dados de clientes.
- Nada de exclusões em massa nem `git push` sem que eu peça.
## Detalhes (consultados quando necessário)
- Revisão de entregas: skill `revisar-entrega` · Regras de pedidos: `.claude/rules/pedidos.md`
```

## Checklist: o que cortar

- **Duplicadas:** a mesma regra em `CLAUDE.md`, em uma skill e em uma regra por caminho?
- **Contraditórias:** duas instruções incompatíveis (“sempre pergunte” / “nunca interrompa”)?
- **Obsoletas:** arquivos ou comandos que já não existem, ou regras pensadas para modelos antigos?
- **Desnecessárias:** o que o Claude deduz lendo o projeto, ou frases como “escreva código limpo”?
- **São mantidas:** segurança, privacidade, permissões e o que não pode ser deduzido do código.

## Prompt de auditoria (modo leitura)

```text
Atue como auditor de instruções em MODO LEITURA: não modifique, crie ou apague nada, nem instale nada.
Pasta: [CAMINHO]. Revise CLAUDE.md, CLAUDE.local.md, AGENTS.md, .claude/rules/, .claude/skills/.
1) Inventário: arquivo, linhas e quando é carregado. 2) Classifique cada instrução: duplicada, contraditória, obsoleta (verifique lendo), desnecessária, necessária ou de segurança.
3) Para cada achado: arquivo e linha, evidência e proposta (manter, reescrever como padrão de trabalho, mover para skill ou regra, converter em permissão/hook, eliminar).
4) Nunca proponha remover restrições de segurança. 5) Se não puder comprovar algo, escreva “não verificado”. Não aplique mudanças: pergunte quais eu aprovo.
```

## Comparar antes e depois

Salve uma cópia das suas instruções; escolha 5–8 tarefas reais e repetíveis; defina critérios de aceitação; execute 2–3 vezes antes e depois de **uma única** mudança, anotando requisitos atendidos, correções que você fez e o tamanho do contexto (`/context`). Se não houver melhora, isso também é um resultado. Não invente testes nem depoimentos.
