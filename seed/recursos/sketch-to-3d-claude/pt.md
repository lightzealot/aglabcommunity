---
title: Sketch to 3D: o Claude desenha seu produto 3D de graça
summary: O que é o Sketch to 3D, a skill gratuita e de código aberto (MIT) para o Claude que transforma qualquer modelo 3D em um esboço de marcador que se desenha sozinho como um designer faria e depois vira o render real, em vídeo de qualquer tamanho ou ao vivo no seu site. Como instalar, os prompts para usar e os limites. Guia completo para ler aqui; o PDF e o prompt podem ser baixados com sua conta gratuita.
---
Tem um produto em 3D e quer mostrá-lo de um jeito que chame atenção? **Sketch to 3D** é uma skill gratuita e de código aberto (MIT) para o Claude que transforma qualquer modelo 3D em um esboço de marcador que se desenha sozinho, como um designer faria, e depois vira o render real. Você recebe um vídeo do tamanho que quiser ou uma versão para o seu site. Aqui está o que ela faz, como instalar e os prompts para usar.

**Antes de começar:** a skill não projeta o produto do zero: você precisa de um modelo 3D (um arquivo como GLB ou OBJ) ou de um objeto feito em código three.js. Funciona melhor com objetos modelados; escaneamentos 3D saem como rabisco.

## O que é e por que importa

| Dado | Valor (em 23 de nov. de 2026) |
|---|---|
| Estrelas no GitHub | 83 |
| Forks | 4 |
| Licença | MIT (serve também para trabalhos de clientes) |
| Publicado | 5 de novembro de 2026 |
| Duração do desenho | Uns 7 segundos |

=> [Ver o repositório no GitHub](https://github.com/dannystuart/sketch-to-3d)

=> [Ver a demo ao vivo](https://dannystuart.github.io/sketch-to-3d/)

## O que você pode dar a ela

- Um modelo 3D em **GLB, GLTF, OBJ, FBX, STL, PLY, USDZ, 3MF ou DAE**.
- Um objeto feito em **código three.js**.
- Uma cena de three.js que você já tenha.

## Como desenha (na ordem de um designer)

1. **Círculos** guia nas partes redondas.
2. **Uma caixa** de construção.
3. **Os contornos**.
4. **O traço**: uma passada leve de lápis e depois outra mais escura.
5. **O marcador**: preenchimento com sombra hachurada.
6. **A cor**, e no fim uma cortina para o render real.

## O que você recebe

- **Vídeo** do tamanho que quiser: vertical (1080×1920), quadrado (1080×1080), panorâmico (1920×1080) ou 4K.
- **Uma imagem por etapa** para revisar antes do vídeo.
- **Versão web** que toca ao carregar, ao aparecer na tela, junto com o scroll ou ao passar o mouse, e no final pode ser girada arrastando.
- **Quatro papéis**: branco, vermelho, lápis ou planta azul.
- Opcional: um **vídeo com fundo transparente** para colocar sobre outro vídeo.

## Passo 1. Instale

Você precisa do [Claude Code](https://claude.com/claude-code), [Node 18 ou superior](https://nodejs.org), [git](https://git-scm.com) e [ffmpeg](https://ffmpeg.org/download.html). Cole estas linhas no terminal, uma por vez:

```
git clone https://github.com/dannystuart/sketch-to-3d.git ~/.claude/skills/sketch-to-3d
```

```
cd ~/.claude/skills/sketch-to-3d
```

```
npm install
```

```
npx playwright install chromium
```

A última baixa o navegador onde a skill desenha (uns 500 MB, uma vez). Depois abra uma sessão nova do Claude Code para que ela seja reconhecida.

**No Windows:** quando testamos, tivemos que fazer dois ajustes pequenos (um erro `ERR_UNSUPPORTED_ESM_URL_SCHEME` ao iniciar e imagens saindo em branco). Se acontecer com você, cole o erro para o Claude e peça que corrija e use o Chrome que você já tem instalado.

## Passo 2. Peça em palavras simples

O Claude escolhe o tamanho, o papel e o enquadramento, mostra uma imagem de cada etapa e depois faz o vídeo:

```
Faça um vídeo de esboço com marcador de cadeira.glb, quadrado, para o Instagram.
```

```
Faça um esboço em papel vermelho de radio.glb. Pule a cor e vá direto do esboço para o render real. Enquadre um pouco mais perto.
```

```
Tenho uma chaleira em OBJ. Coloque na página do meu produto para que se desenhe enquanto as pessoas rolam a página e no final possam girá-la.
```

```
Só o esboço da minha cadeira, sem render, em papel de lápis.
```

## Prompt para o Claude te guiar na primeira vez

```
Quero usar a skill sketch-to-3d (https://github.com/dannystuart/sketch-to-3d). Sou iniciante.
1. Verifique se tenho Node 18 ou superior, git e ffmpeg, e me diga como instalar o que faltar.
2. Instale seguindo o README e confira se funciona com o teste da luminária.
3. Faça um vídeo de esboço de [caminho do seu modelo 3D], [vertical / quadrado / panorâmico], em papel [branco / vermelho / lápis / planta azul].
4. Me mostre as imagens de cada etapa antes do vídeo e explique em palavras simples o que posso ajustar.
```

## Bom saber

- Um vídeo de 7 segundos leva uns 30 segundos em um notebook recente.
- Bases, pisos e fundos do modelo são desenhados como parte do objeto, a menos que você peça para tirá-los.
- Vidro transparente esconde o que está embaixo no esboço; peça para ocultá-lo.
- Modelos brancos ou sem cor ficam quase invisíveis em papel claro: peça um fundo mais escuro.
- Não é uma ferramenta oficial da Anthropic.
