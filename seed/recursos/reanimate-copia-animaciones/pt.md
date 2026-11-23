---
title: Reanimate: copie qualquer animação com o Claude Code
summary: O que é o Reanimate, a skill gratuita e de código aberto (MIT) para Claude Code que grava uma animação, reconstrói no seu código e compara quadro a quadro até se mover igual. Como instalar, os prompts para usar e os limites. Guia completo para ler aqui; o PDF e o prompt podem ser baixados com sua conta gratuita.
---
Viu uma animação incrível em outro site e não faz ideia de como foi feita? **Reanimate** é uma skill gratuita e de código aberto (MIT) para o Claude Code que grava a animação, reconstrói no seu código e compara com a original quadro a quadro até se mover igual. Aqui está o que ela faz, como instalar e os prompts para usar.

**Antes de começar:** funciona no Mac e no Linux; no Windows ainda não foi testada. Copie animações para estudar ou como ponto de partida: fontes, imagens e código de outro site continuam sendo dos donos.

## O que é e por que importa

| Dado | Valor (em 23 de nov. de 2026) |
|---|---|
| Estrelas no GitHub | 2,4 mil |
| Forks | 209 |
| Licença | MIT |
| Publicado | 29 de outubro de 2026 |
| Chaves de API | Não precisa |

=> [Ver o repositório no GitHub](https://github.com/NiazMorshed2007/reanimate)

## O que você pode dar a ela

- O **link** de um site no ar.
- Uma **gravação de tela**.
- Um **MP4** ou um **GIF**.
- Um arquivo **Lottie**.

## Como funciona (5 passos)

1. **Grava:** filma a animação original em um navegador, quadro a quadro.
2. **Separa em detalhes:** monta uma tabela com cada elemento: quando começa, quanto dura, de onde para onde vai e com qual aceleração (easing).
3. **Reconstrói** com o que o seu projeto já usa: CSS, Framer Motion, GSAP ou three.js.
4. **Compara:** grava a cópia do mesmo jeito e mede tempos, aceleração e pixels.
5. **Repete:** corrige a maior diferença e grava de novo, normalmente de 2 a 5 rodadas. O que não conseguir igualar aparece no relatório.

**A prova:** o autor clonou a barra de ferramentas da Vercel e **417 de 417 quadros** saíram idênticos. No cubo do resend.com só 0,11% dos pixels é diferente.

## Passo 1. Instale

Você precisa do [Bun](https://bun.sh) 1.1 ou superior. No terminal:

```
npx skills add NiazMorshed2007/reanimate -g
```

Ele pergunta em quais agentes instalar; adicione `-a claude-code` para pular a pergunta. Na primeira vez baixa uns 250 MB (ffmpeg e o Chromium do Playwright).

## Passo 2. Peça a animação

No Claude Code diga **o que** quer, **onde** está e **para onde** vai:

```
/reanimate the hero entrance on https://example.com, into components/Hero.tsx
```

```
/reanimate this loader, 0:03 to 0:05 of ~/Downloads/loader.mov
```

```
/reanimate the card hover in this gif, match it exactly
```

```
/reanimate the logo marquee from https://example.com, with our logos and pause on hover
```

## Passo 3. Escolha o quanto igual você quer

| Se você disser | O que ela iguala |
|---|---|
| «clone this animation» (padrão) | Que se mova igual: ordem, tempos (±80 ms), tipo de aceleração e distância |
| «match it exactly» ou «pixel-perfect» | Que pareça igual: também fontes, tamanhos, cores e espaçamentos (≤ 2% de pixels diferentes) |
| «clone X and add Y» | A cópia mais o seu toque, separado |

## Prompt para o Claude te guiar na primeira vez

```
Quero usar a skill reanimate (https://github.com/NiazMorshed2007/reanimate). Sou iniciante.
1. Verifique se tenho Bun 1.1 ou superior e se meu sistema é Mac ou Linux.
2. Instale com npx skills add NiazMorshed2007/reanimate -g -a claude-code.
3. Clone esta animação: [cole o link ou o caminho do vídeo] e coloque em [arquivo do seu projeto].
4. No final me explique em palavras simples quais rodadas fez e o que ficou diferente.
```

## Limites

- Páginas com login, YouTube e Loom não são gravadas direto: dê a ela uma gravação de tela.
- Efeitos com física (molas) são aproximados medindo como quicam.
- Não é uma ferramenta oficial da Anthropic nem dos sites que clona.
