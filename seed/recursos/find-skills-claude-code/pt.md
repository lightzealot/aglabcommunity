---
title: "find-skills: a skill nº 1 do skills.sh que busca e instala a skill que falta no Claude Code"
summary: Como instalar find-skills, pedir a skill de que você precisa, revisar antes de instalar e conhecer as 10 skills mais instaladas do diretório. Guia completo para ler aqui; os arquivos podem ser baixados com sua conta gratuita.
---
Você pede algo ao Claude Code e ele faz pela metade? Muitas vezes o problema não é o Claude: **falta a skill certa**. find-skills é a skill que busca por você no skills.sh, o diretório aberto de skills da Vercel, sugere as que combinam com o que você quer fazer e, se você aceitar, instala para você. Aqui você aprende a usar passo a passo e conhece as 10 skills mais instaladas do diretório.

## Por que esta skill

| Dado | Valor (em 20 de nov. de 2026) |
|---|---|
| Instalações | 4.5 M (1º lugar no ranking geral) |
| Skills no diretório | 1,477,970 |
| Repositório | vercel-labs/skills (40.1K estrelas) |
| No skills.sh desde | 26 de janeiro de 2026 |

Segundo seu SKILL.md, recomenda skills pelo **número de instalações** (prefere mais de 1K), pela **reputação de quem publica** (fontes oficiais como Vercel ou Anthropic) e pelas estrelas no GitHub. Antes de buscar com comandos, consulta o ranking do skills.sh.

=> [Veja find-skills no skills.sh](https://skills.sh/vercel-labs/skills/find-skills)

## Do que você precisa

- **Claude Code** instalado (também funciona com outros agentes: Cursor, Codex, GitHub Copilot, Gemini e mais).
- **Node.js**, para usar `npx`.
- Uma pasta de projeto onde você queira manter suas skills.

## Passo 1. Instale find-skills

Abra o terminal no seu projeto e cole o comando oficial:

```
npx skills add https://github.com/vercel-labs/skills --skill find-skills
```

## Passo 2. Diga o que você quer fazer

Abra Claude Code e peça com suas palavras. Por exemplo:

```
Busque uma skill para editar vídeos para minhas redes sociais. Mostre as 3 melhores com o número de instalações, quem publica e o comando para instalar. Não instale nada ainda.
```

Você também pode buscar por conta própria com `npx skills find [o que você procura]`.

## Passo 3. Revise as sugestões

- **Instalações:** mais de 1K é um bom sinal.
- **Quem publica:** prefira fontes oficiais ou conhecidas.
- **Auditorias:** na página de cada skill no skills.sh, confira as auditorias de segurança (Gen Agent Trust Hub, Socket, Snyk). Até find-skills tem um alerta da Snyk: leia antes de instalar.
- **Leia o SKILL.md:** uma skill roda na sua máquina, com seus arquivos.

```
Antes de instalar [nome da skill], leia seu SKILL.md e me diga quais arquivos ela acessa ou altera, quais comandos executa e se precisa de chaves ou acesso à internet. Dê sua recomendação em três linhas.
```

## Passo 4. Instale a que você escolher

Aprove a que fizer sentido para você ou copie o comando. Exemplo real:

```
npx skills add https://github.com/heygen-com/hyperframes --skill hyperframes
```

Para manter todas atualizadas: `npx skills update`.

## As 10 skills mais instaladas (20 de nov. de 2026)

| # | Skill | Quem publica | Instalações | Para que serve |
|---|---|---|---|---|
| 1 | find-skills | vercel-labs | 4.5M | Busca e instala skills |
| 2 | hyperframes-cli | heygen-com | 1.6M | Cria, revisa e renderiza vídeos de HyperFrames |
| 3 | agent-browser | vercel-labs | 1.6M | Controla o navegador: navegar, preencher formulários, clicar |
| 4 | hyperframes | heygen-com | 1.6M | Vídeos feitos com HTML: explicativos, lançamentos, gráficos |
| 5 | grill-me | mattpocock | 1.6M | Faz perguntas a fundo para aprimorar um plano ou design |
| 6 | design-mobile-apps | designed-by-ai | 1.5M | Projeta telas de apps e converte para React Native ou HTML |
| 7 | media-use | heygen-com | 1.5M | Música, efeitos, imagens, voz e logos para seus vídeos |
| 8 | reddit-automation | flowkit-labs | 1.5M | Encontra discussões no Reddit em que pedem o que você oferece e redige respostas |
| 9 | hyperframes-registry | heygen-com | 1.4M | Cerca de 450 blocos prontos: transições, títulos, legendas |
| 10 | grill-with-docs | mattpocock | 1.4M | Como grill-me, mas documenta as decisões ao longo do caminho |

O ranking muda todos os dias: confira no skills.sh antes de instalar.

=> [Abra o ranking do skills.sh](https://skills.sh/)

**Quer saber qual skill serve para você? Envie SKILLS para @andresgomez.ia.**
