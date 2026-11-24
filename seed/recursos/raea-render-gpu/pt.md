---
title: raea: testei o motor que renderiza seus vídeos 7× mais rápido, de graça
summary: O que é o raea (Render Anything Engine), o motor gratuito que desenha seus vídeos em React na sua própria placa de vídeo, sem navegador. Os testes que fiz no meu PC (de 127 s para 17 s em um reel completo), como instalar no Windows, Mac ou Linux, o prompt para o seu primeiro vídeo e o que saber antes de usar. Guia completo para ler aqui; o PDF e o prompt podem ser baixados com sua conta gratuita.
---
Cada mudança no seu vídeo com IA custa minutos de render? O **raea** (Render Anything Engine) é um motor gratuito que desenha seus vídeos na sua própria placa de vídeo, sem navegador. Você escreve o vídeo em React e TypeScript, o código que o Claude já sabe escrever, e o raea renderiza cada quadro. Antes de recomendar, testei no meu PC: aqui está o que medi, como instalar e o prompt para o seu primeiro vídeo.

## O que medi no meu PC

Tudo no mesmo computador (Windows 10, RTX 5060 Ti, Ryzen 5 7600X), vídeo vertical 1080×1920 a 30 fps, mediana de 3 execuções, 23 de novembro de 2026.

| Teste | Com navegador (meu motor de sempre) | Com raea | Diferença |
|---|---|---|---|
| A mesma cena, 300 quadros | 13,5 s | 7,1 s | 1,9× |
| A mesma cena, 1.200 quadros | 47,0 s | 12,5 s | 3,8× |
| Meu último reel completo (1.167 quadros, com vídeos e som) | 127,1 s | 17,3 s | **7,3×** |
| Este reel sobre o raea (1.866 quadros) | não medi | 53,9 s | — |

- **Imagem:** coloquei os dois vídeos lado a lado e são iguais.
- **Áudio:** a voz ficou a 8 ms do original (menos de um quadro) e o raea deixa em −14 LUFS, o volume padrão das redes.
- **Quanto mais longo o vídeo, mais ganha:** o raea leva uns 5 segundos para iniciar, mas depois desenha cada quadro em 6 a 11 milissegundos.

## O que é e por que importa

| Dado | Valor (em 23 de nov. de 2026) |
|---|---|
| Estrelas no GitHub | 4.702 |
| Forks | 373 |
| Versão | 0.1.9 (22 de novembro de 2026) |
| Ritmo | 10 versões estáveis entre 9 e 22 de novembro |
| Licença | FSL-1.1 (cada versão vira Apache-2.0 dois anos depois) |
| Preço | Grátis, sem conta para o motor |
| Sistemas | Mac (Apple Silicon), Linux e Windows 10/11 |

Foi criado por **Shane Murphy** (@shinyobjectz), ex-editor e designer de motion em agências.

=> [Ver o raea no GitHub](https://github.com/shinyobjectz/raea)

=> [Ver o site oficial](https://raea.io)

=> [Ver filmes feitos no raea](https://media.raea.io)

## O que faz além de vídeo

- **Jogos:** o mesmo arquivo é jogado ao vivo com `raea play` (input, física, som e 3D).
- **3D:** cenas com luzes, materiais e modelos glTF, desenhadas pelo motor Bevy.
- **Som:** efeitos e notas de instrumentos com modelos que rodam no seu computador (`raea sao`).
- **Revisão automática:** `raea check` avisa sobre textos cortados, pouco contraste, zonas seguras das redes e volume.
- **Para agentes:** traz uma skill para o Claude Code; seu agente renderiza um quadro, olha e corrige sozinho.

## Passo 1. Instale

Você precisa de uma placa de vídeo com driver DirectX 12 ou Vulkan (quase qualquer PC dos últimos anos) e uns 350 MB livres.

**No Windows**, abra o PowerShell e cole:

```
irm https://raea.io/install.ps1 | iex
```

**No Mac ou Linux**, no terminal:

```
curl -fsSL https://raea.io/install | sh
```

O instalador deixa o raea na sua pasta de usuário (`.raea`), adiciona ao seu PATH e copia a skill para `~/.claude/skills`, para que o Claude Code saiba usá-lo. Abra um terminal novo quando terminar e confira:

```
raea --version
```

## Passo 2. Seu primeiro vídeo

Assim é um vídeo no raea: um componente React que desenha o quadro que pedirem.

```
import { AbsoluteFill, Composition, interpolate, registerRoot, useCurrentFrame } from "raea";

function Ola() {
  const f = useCurrentFrame();
  return <AbsoluteFill style={{ background: "#000", color: "#fff", fontSize: 120, opacity: interpolate(f, [0, 20], [0, 1]) }}>Olá</AbsoluteFill>;
}

registerRoot(() => <Composition id="ola" component={Ola} width={1080} height={1920} fps={30} durationInFrames={90} />);
```

Salve como `ola.tsx` e renderize:

```
raea render ola.tsx -o ola.mp4
```

No meu PC esses 90 quadros saíram em uns 6 segundos, contando a inicialização.

## Prompt para o Claude te guiar

```
Quero usar o raea (https://github.com/shinyobjectz/raea) para fazer vídeos com código. Sou iniciante.
1. Verifique se o raea está instalado (raea --version). Se não, instale com o instalador oficial para o meu sistema.
2. Crie um projeto com raea init e me explique em palavras simples qual arquivo é o vídeo.
3. Faça um vídeo vertical de 10 segundos para o Instagram sobre [seu tema], com títulos que entrem no ritmo e minhas cores [suas cores].
4. Antes do vídeo completo, renderize 3 imagens (raea render edit.tsx -o fotos --at 30,150,270) e me mostre.
5. Quando eu aprovar, renderize o vídeo, rode raea check nele e me diga o que corrigir.
```

## Comandos que você mais vai usar

| Comando | Para quê |
|---|---|
| `raea render video.tsx -o video.mp4` | Renderiza o vídeo completo |
| `raea render video.tsx -o fotos --at 30,150,270` | Imagens desses quadros para revisar (números de quadro, não segundos) |
| `raea check video.mp4 --platform reels` | Revisa texto cortado, contraste, zonas seguras e volume |
| `raea play jogo.tsx` | Joga o arquivo ao vivo |
| `raea guide` | Guias de design que vêm com o motor |

## Bom saber

- **É uma versão canary:** sai uma versão quase todo dia, então algo pode mudar de uma semana para outra. O Windows é a plataforma mais nova e a menos testada.
- **Seu vídeo precisa estar em React.** No meu teste, um vídeo HTML feito para outro motor não renderizou direito como estava: tive que passar para React (o Claude fez isso por mim).
- **Para o Instagram, troque o áudio para AAC:** o raea entrega o áudio em Opus. Com o ffmpeg, sem mexer na imagem:

```
ffmpeg -i video.mp4 -c:v copy -c:a aac -b:a 192k -movflags +faststart final.mp4
```

- **Algumas funções baixam modelos grandes** (som local, movimento de personagens): podem ocupar vários GB.
- A licença é FSL: você pode usar de graça para seus vídeos e clientes, mas não para montar um produto que concorra com o raea.
- Não é uma ferramenta da Anthropic.
