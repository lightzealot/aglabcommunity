---
title: "4 truques se você não entende nada de GitHub: mude uma palavra na URL"
summary: "Sete truques para entender qualquer repositório sem ler o código: gitreverse, gitdiagram, gitingest, gitmcp, DeepWiki, a tecla ponto e .patch. Guia completo para ler aqui; os arquivos podem ser baixados com sua conta gratuita."
---
Você abre um repositório do GitHub, vê cem arquivos e não entende nada. Aqui estão **7 truques para entender qualquer repositório sem ler o código arquivo por arquivo**. Nos quatro primeiros, você só muda uma palavra da URL. Funcionam com repositórios públicos, e nos exemplos **tu/repo** é o usuário e o nome do repositório que você quer entender.

> São ferramentas de terceiros: não são do GitHub nem da Anthropic. Podem mudar, ficar lentas ou parar de funcionar.

## Truque 1. Troque “github.com” por “gitreverse.com”

GitReverse lê o repositório e devolve **um prompt para pedir a uma IA que monte esse mesmo projeto do zero**.

```
github.com/tu/repo
gitreverse.com/tu/repo
```

- Copie o prompt e cole no Claude para criar sua própria versão.
- Ajuste: remova o que não precisa antes de colar.

## Truque 2. Troque “github.com” por “gitdiagram.com”

GitDiagram desenha um **diagrama interativo** de como o repositório é montado: suas partes e como se conectam.

```
github.com/tu/repo
gitdiagram.com/tu/repo
```

- Clique em cada caixa do diagrama para ir àquela parte do código.
- Use antes de mexer em um projeto de outra pessoa: você vê o mapa completo em um minuto.

## Truque 3. Troque “github.com” por “gitingest.com”

Gitingest reúne todo o repositório **em um único texto**: um resumo, a árvore de pastas e o conteúdo de cada arquivo. Pronto para colar no Claude.

```
github.com/tu/repo
gitingest.com/tu/repo
```

- Se o repositório for muito grande, use os filtros para incluir só as pastas relevantes para você.
- Cole o texto no Claude junto com este prompt (troque o que está entre colchetes):

```
Vou colar um repositório completo em um único texto. Explique, nesta ordem:
1) O que o projeto faz, em 3 linhas e sem termos técnicos.
2) Como está organizado: as pastas importantes e para que serve cada uma.
3) Como instalar e rodar no meu computador, passo a passo.
4) Em qual arquivo eu teria que mexer para mudar [o que você quer mudar].
Não invente nada: se algo não estiver no texto, avise.
```

## Truque 4. Troque “github.com” por “gitmcp.io”

GitMCP transforma o repositório em um **servidor MCP**. Você conecta ao Claude, e ele pode consultar a documentação quando você fizer perguntas.

```
github.com/tu/repo
gitmcp.io/tu/repo
```

- **No Claude:** adicione um conector personalizado e cole a URL `https://gitmcp.io/tu/repo`.
- **No Claude Code:** `claude mcp add --transport http repo https://gitmcp.io/tu/repo`
- Depois pergunte ao Claude sobre esse projeto: ele usará o repositório como fonte.

## Os 3 truques extras

**Truque 5. DeepWiki.** Troque `github.com` por `deepwiki.com`: monta uma wiki do repositório, com explicações por seção e um chat para fazer perguntas. Ideal para projetos grandes com pouca documentação.

**Truque 6. A tecla ponto.** Dentro de qualquer repositório no GitHub, pressione a tecla **.** (ponto). O projeto abre em um editor de código no navegador (github.dev), com busca e todas as pastas. Você não instala nada.

**Truque 7. “.patch” no final de um commit.** Acrescente `.patch` (ou `.diff`) ao final da URL de um commit ou pull request para ver a mudança completa em texto simples, pronto para colar no Claude e pedir uma explicação.

```
github.com/tu/repo/commit/abc123
github.com/tu/repo/commit/abc123.patch
```

## Limites que você precisa conhecer

- **Repositórios públicos:** funcionam com repositórios públicos. Gitingest aceita repositórios privados com um token do GitHub; não compartilhe esse token com ninguém.
- **Repositórios muito grandes:** o texto do Gitingest pode não caber em um chat. Filtre pastas ou pergunte por partes.
- **Revise a licença** antes de copiar ou reconstruir o projeto de outra pessoa.
- **Claude pode errar:** se explicar um arquivo, abra e confira o que é importante.

| Você quer | Use |
|---|---|
| Entender | Diagram e DeepWiki |
| Perguntar | Ingest ou GitMCP com Claude |
| Construir | Reverse para montar sua versão |
| Revisar | Tecla ponto e .patch |

Teste os truques com um repositório que você já conhece e compare. **Quer ajuda com seu caso? Envie REPO para @andresgomez.ia.**
