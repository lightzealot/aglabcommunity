---
title: Como fazer vídeos animados com Claude
summary: "De uma ideia a um MP4 com a skill video-pizarra: instalação, storyboard, animação, som e renderização. Sem assinaturas de edição; o uso do modelo pode ter custo."
---
A skill **video-pizarra** transforma uma ideia em um MP4 vertical animado com Claude Code. O vídeo não é “gerado”: é **programado**. Cada cena é código que desenha e anima gráficos; um navegador sem interface captura os quadros e ffmpeg os une. A renderização roda no seu computador; o uso do modelo pode ter custo.

Repositório: https://github.com/santmun/video-pizarra · O download inclui o guia completo.

## Do que você precisa

| O quê | Para quê | Conferir |
|---|---|---|
| Node.js 18+ | mecanismo e renderização | `node -v` |
| Python 3 com `numpy` e `Pillow` | som e folhas de contato | `python3 -c "import numpy, PIL"` |
| ffmpeg | monta o MP4 | `ffmpeg -version` |
| Chromium do Playwright | captura os quadros | `npx playwright install chromium` |

No Mac, para o que faltar: `brew install node python ffmpeg` e `python3 -m pip install --user numpy Pillow`.

## Instalar a skill

```bash
git clone https://github.com/santmun/video-pizarra ~/.claude/skills/video-pizarra
```

Reinicie Claude Code e peça: “faça um vídeo animado sobre X”.

## Fluxo em 7 passos

1. **Entrevista.** Defina **uma única** ideia, o formato (9:16 ou 16:9), a duração (60–75 s permite explicar melhor), o tom, sua marca e o CTA.
2. **Verifique os dados.** Só vai para a tela o que aparece em uma fonte.
3. **Storyboard.** Uma tabela por cena (fundo, texto, ação, transição). Deve ser aprovado antes de mexer no código.
4. **Monte o projeto:**

```bash
PROJ=~/Documents/mi-video
mkdir -p "$PROJ/audio" && cp -R ~/.claude/skills/video-pizarra/template/. "$PROJ/"
cd "$PROJ" && npm install && npx playwright install chromium
cp scenes.example.js scenes.js
```

5. **Revisão visual (obrigatória):**

```bash
node render.mjs --every 1.2 && python3 contact.py 10
```

Abra `contact.jpg` e procure texto cortado, cenas vazias ou elementos fora do quadro.

6. **Música e batidas (opcional):** `python3 -m venv .venv && .venv/bin/pip install librosa` e depois `.venv/bin/python beats.py audio/music.mp3`.
7. **Renderização final:** `./build.sh mi-video` gera `mi-video.mp4` (master) e `mi-video-movil.mp4` (leve). Leva cerca de 3–5 min por minuto de vídeo.

## Dois mecanismos

- **`template/`**: lousa e desenho à mão; para explicar e contar notícias.
- **`template-estilos/`**: aquarela, caderno ou minimalista; mais limpo e editorial. Veja `catalogo-estilos/` antes de escolher.

## Estrutura que funciona (8–10 cenas)

Chamada → revelação → problema → virada → evidências (uma por cena) → arremate → CTA. **Uma ideia por cena** e no máximo ~12 palavras na tela. A primeira frase aparece em 0,2 s: sem introduções nem logos.

## Erros que já aconteceram

- **Parece uma apresentação:** use um personagem contínuo e uma câmera que acompanhe.
- **Cenas sobrecarregadas:** 1 texto grande + 1 elemento + o personagem.
- **Números inventados ou nomes de terceiros na tela:** use apenas dados com fonte e diga “um cliente”.
- **“100% código” com imagens de IA:** se disser isso, não inclua imagens geradas.
- **Tudo fica preto:** use `immediateRender: false`.
- **Arquivo de 150–200 MB:** é normal; compartilhe a cópia `-movil`.

Regra técnica: a renderização busca cada instante, não reproduz. Tudo deve ser função do tempo: nada de `setTimeout` nem números aleatórios.

## Resumo em 5 linhas

```bash
git clone https://github.com/santmun/video-pizarra ~/.claude/skills/video-pizarra   # uma vez
mkdir -p ~/Documents/mi-video/audio && cp -R ~/.claude/skills/video-pizarra/template/. ~/Documents/mi-video/
cd ~/Documents/mi-video && npm install && npx playwright install chromium
cp scenes.example.js scenes.js   # escreva seu vídeo aqui
node render.mjs --every 1.2 && python3 contact.py 10 && ./build.sh mi-video
```

[Documento original](https://docs.google.com/document/d/1ePjdt_CNMhL4pkUszWEeBpn-sU4dolYRlV9tehYy_jA/edit) · Skill: [santmun/video-pizarra](https://github.com/santmun/video-pizarra) · Recurso compartilhado por @andresgomez.ia.
