---
title: Passa horas editando cada vídeo? MoneyPrinterTurbo faz isso sozinho
summary: Como instalar e configurar MoneyPrinterTurbo, a ferramenta gratuita e de código aberto que, a partir de um único tema, cria o roteiro, os clipes, a voz, as legendas e a música, e até publica o vídeo. Guia completo para ler aqui; os arquivos podem ser baixados com sua conta gratuita.
---
Você passa horas editando cada vídeo? **MoneyPrinterTurbo** é uma ferramenta gratuita e de código aberto (licença MIT) que, a partir de **um único tema**, escreve o roteiro, busca os clipes, gera a voz, sincroniza as legendas, adiciona música e entrega o vídeo pronto. Tem mais de 140.000 estrelas no GitHub (144.845 em 21 de novembro de 2026).

=> [Veja MoneyPrinterTurbo no GitHub](https://github.com/harry0703/MoneyPrinterTurbo)

## O que faz

| Etapa | O que a ferramenta faz |
|---|---|
| Roteiro | Um modelo de IA escreve a partir do seu tema |
| Clipes | Busca vídeos de banco no Pexels ou Pixabay (gratuitos), ou usa os seus |
| Voz | Edge TTS gratuito (sem chave), ou ElevenLabs, Azure, Gemini e outras |
| Legendas | Sincroniza com a voz |
| Música | De fundo, aleatória ou enviada por você |
| Formato | Vertical 9:16, horizontal 16:9 ou quadrado 1:1 |
| Publicar | Diretamente no TikTok, Instagram e YouTube Shorts, com título e hashtags |

Para o roteiro, funciona com ChatGPT, Claude, Gemini, DeepSeek, Kimi, Qwen, Ollama (local) e muitos outros.

## A forma mais fácil: deixe seu agente instalar

Se você usa **Claude Code** (ou outro agente que possa usar o terminal), cole isto. O agente instala e configura MoneyPrinterTurbo, gera o vídeo e diz onde ficou. Só vai pedir as chaves que faltarem. Funciona em Mac e Windows.

```
Use esta Skill: https://raw.githubusercontent.com/harry0703/MoneyPrinterTurbo/main/docs/skill/SKILL.md
Crie um vídeo com o tema "Como a IA está mudando o dia a dia", em português e no formato vertical.
```

## Instalar no Windows (pacote de um clique)

1. Acesse a [última versão no GitHub](https://github.com/harry0703/MoneyPrinterTurbo/releases/latest) e baixe o arquivo **.7z** da seção **Assets** (não o “Source code”).
2. Extraia em uma pasta sem espaços nem acentos no caminho.
3. Clique duas vezes em `update.bat` para obter a última versão.
4. Clique duas vezes em `start.bat`: a interface abre no navegador (se aparecer em branco, use Chrome ou Edge).

## Instalar com Python (Mac, Linux ou Windows)

Você precisa de Python 3.11 ou superior.

```
python3 -m venv .venv
source .venv/bin/activate
python -m pip install mpt
mpt webui
```

No Windows PowerShell, ative o ambiente com `.venv\Scripts\Activate.ps1`. O pacote oficial se chama **mpt** (o chamado “MoneyPrinterTurbo” no PyPI é de um terceiro).

## Configurar pela primeira vez

1. Na interface, abra as **configurações básicas**.
2. Escolha o modelo para o roteiro e cole a chave. Se quiser algo gratuito, Ollama roda no seu computador.
3. Para os clipes, crie uma chave gratuita no [Pexels](https://www.pexels.com/api/) ou [Pixabay](https://pixabay.com/api/docs/).
4. Para a voz, Edge TTS funciona sem chave.
5. Escreva o tema, escolha formato e voz e clique em **Gerar vídeo**.

## Do que seu computador precisa

| | Mínimo | Recomendado |
|---|---|---|
| Processador | 4 núcleos | 6 a 8 núcleos |
| Memória | 4 GB | 8 GB |
| Placa de vídeo | Não precisa | 4 GB ou mais para maior velocidade |

## Leve em conta

- A ferramenta é gratuita, mas **o modelo do roteiro pode ter custo** se você usar um pago (ChatGPT, Claude, Gemini). Há opções gratuitas, como Ollama local.
- Os clipes de banco são genéricos: para sua marca, envie seus próprios vídeos e imagens.
- Revise cada vídeo antes de publicar; a publicação automática exige conectar suas contas.
- É um projeto de terceiros e muda com frequência: se algum passo não corresponder, consulte o README.

**Qual tema você escolheria primeiro? Conte em @andresgomez.ia.**
