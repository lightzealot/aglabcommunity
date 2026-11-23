---
title: Seu carro não tem YouTube? YouDash coloca no seu CarPlay
summary: O que é YouDash, o projeto gratuito e de código aberto que coloca o app real do YouTube na tela do CarPlay, com teclado e sem anúncios. Explicado para iniciantes, com os requisitos de instalação e como começar. Guia completo para ler aqui; os arquivos podem ser baixados com sua conta gratuita.
---
Seu carro tem CarPlay e você não consegue ver YouTube nessa tela? **YouDash** é um projeto gratuito e de código aberto (licença GPL-3.0) que coloca **o app real do YouTube** na tela do CarPlay: adapta ao tamanho da tela, inclui um teclado para buscar e bloqueia os anúncios. Foi lançado em 14 de novembro de 2026 e, em 21 de novembro, já tinha 365 estrelas no GitHub.

=> [Veja YouDash no GitHub](https://github.com/sa4hnd/YouDash)

> **Use apenas com o carro estacionado.** Respeite as leis do seu país e as restrições do seu veículo.

## O que faz, explicado de forma simples

| O que você vê | O que significa |
|---|---|
| O app real do YouTube | Não é um espelhamento esticado do seu celular: é o mesmo app, adaptado à tela do carro |
| Vídeos organizados | A página inicial mostra os vídeos em colunas que cabem na sua tela |
| Vídeo + lista | O vídeo à esquerda e sua lista ou recomendações à direita |
| Teclado na tela | Você busca vídeos pela tela do carro, sem tocar no celular |
| Sem anúncios | Usa YouMod, que bloqueia os anúncios (pode parar de funcionar se o YouTube mudar algo) |

## Consigo instalar sozinho?

Vou ser direto: **hoje não é de um clique só**. É um projeto experimental pensado para quem já assina apps de iPhone ou tem um desenvolvedor para ajudar. Veja do que você precisa:

| Você precisa de | Em palavras simples |
|---|---|
| Um Mac com Xcode | Xcode é o programa gratuito da Apple para criar apps de iPhone. Só funciona no Mac. Você também precisa de Python 3.9 ou superior. |
| Um iPhone compatível | A faixa prevista é iOS 26.4 a 27.2 (experimental). Foi testado em um iPhone com iOS 27.0.1. |
| O app do YouTube com YouMod | Uma cópia “descriptografada” do YouTube 21.42.4 com YouMod 2.0.0 que você tenha direito de modificar. A da App Store não serve, e o projeto não inclui. |
| A permissão de vídeo do CarPlay | A Apple precisa autorizar sua conta de desenvolvedor para mostrar vídeo no CarPlay (`com.apple.developer.carplay-video`). Instalar o app com um programa de “sideload” não dá essa permissão. |
| Sua própria assinatura | Um identificador de app, um certificado e um perfil da Apple em seu nome, com seu iPhone registrado. |

**Se você não é desenvolvedor:** dê uma estrela ao projeto para acompanhar e peça ajuda a alguém que já publique apps de iPhone. Com o prompt abaixo, Claude Code explica cada requisito e diz se falta algo antes de começar.

## Glossário rápido

- **IPA:** o arquivo de instalação de um app de iPhone (como um .exe no Windows).
- **Descriptografada:** os apps da App Store vêm criptografados; para modificar, é necessária uma cópia sem criptografia.
- **Assinar um app:** colocar seu “selo” da Apple para o iPhone aceitar.
- **Permissão (entitlement):** uma autorização que a Apple dá à sua conta para o app fazer algo especial, como mostrar vídeo no carro.
- **Dylib:** o módulo que adiciona YouDash ao app do YouTube para funcionar no CarPlay.

## A forma mais fácil de começar: deixe Claude Code orientar você

Se você tem um Mac, abra Claude Code e cole isto. Ele verifica o que você tem e o que falta, e explica cada passo sem pular nada:

```
Quero instalar YouDash (https://github.com/sa4hnd/YouDash) para ver YouTube no CarPlay. Sou iniciante.
1. Verifique se meu Mac tem Xcode, o SDK de iPhone e Python 3.9 ou superior, e diga como instalar o que faltar.
2. Explique em palavras simples o que é o app “descriptografado” com YouMod e a permissão de vídeo do CarPlay que o README exige, e diga se posso obter com minha conta da Apple.
3. Se eu tiver tudo, oriente passo a passo com o guia docs/BUILD.md do repositório. Uma coisa por vez e espere minha resposta.
```

## Os passos (para quem já tem tudo)

Primeiro, crie o módulo do CarPlay:

```
git clone https://github.com/sa4hnd/YouDash.git
cd YouDash
python3 -m venv .venv
source .venv/bin/activate
python3 -m pip install -r requirements-build.txt
python3 scripts/build_carplay.py --compile-only
```

Isso cria `build/YouTubeCarPlay.dylib`. Depois, empacote com seu próprio app e sua assinatura e instale no seu iPhone registrado:

```
python3 scripts/build_carplay.py \
  --ipa /ruta/a/tu/YouMod.ipa \
  --profile /ruta/a/tu.mobileprovision \
  --bundle-id com.tunombre.youtubecar \
  --device ID_DE_TU_IPHONE
```

Troque os caminhos, o identificador e o ID do iPhone pelos seus. O guia completo (com solução de problemas) está em [docs/BUILD.md](https://github.com/sa4hnd/YouDash/blob/main/docs/BUILD.md).

## Como funciona por dentro

1. **Conecta o app à tela do carro:** o app inicia normalmente no iPhone e depois passa sua interface para a janela do CarPlay.
2. **Adapta o design:** redimensiona a interface, organiza as colunas de vídeos e coloca o vídeo e a lista lado a lado.
3. **Adiciona o teclado:** um teclado na tela que digita na busca do YouTube.
4. **Usa o player do YouTube e YouMod:** o vídeo é reproduzido com o mecanismo do YouTube e YouMod remove os anúncios.
5. **Volta ao celular ao desconectar:** quando você tira o iPhone do carro, o app volta para a tela do telefone.

## Leve em conta

- É **experimental**: depende do seu iPhone, carro, versão do app e assinatura.
- Os anúncios são bloqueados com YouMod, mas uma atualização do YouTube pode mudar isso.
- É um projeto independente: não é um app oficial do Google nem da Apple. YouTube e Apple CarPlay são marcas dos respectivos donos.
- Créditos: integração do CarPlay por [Sehind Hemzani](https://github.com/sa4hnd), baseada em [YouMod](https://github.com/Tonwalter888/YouMod).

**Você usaria no seu carro? Conte em @andresgomez.ia.**
