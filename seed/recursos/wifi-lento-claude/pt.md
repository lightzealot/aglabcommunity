---
title: Paga por 300 megas e recebe 90? O prompt para Claude revisar seu Wi-Fi e os 3 ajustes do roteador
summary: O prompt exato para pedir ao Claude que revise seu Wi-Fi e como conferir por conta própria o canal, WMM e a banda de 5 GHz. Guia completo para ler aqui; os arquivos podem ser baixados com sua conta gratuita.
---
Você paga por 300 megas e recebe 90? Muitas vezes o problema não é a operadora de internet: é **como seu roteador está configurado**. No reel, alguém passou exatamente por isso e resolveu contando o problema ao Claude, que encontrou três ajustes: **o canal, WMM e a banda de 5 GHz**. Aqui está o prompt exato e como conferir cada ajuste por conta própria.

**Antes de começar:** meça sua velocidade por cabo e por Wi-Fi. Se por cabo também não chegar o que você paga, o problema é da operadora e nenhum ajuste do roteador resolve.

## O prompt para pedir ao Claude

Copie no Claude (ou no Claude Code, que pode executar os comandos por você) e troque o que está entre colchetes:

```
Meu Wi-Fi está lento: pago por [X] megas e recebo [Y]. Uso [Windows / Mac]. Ajude a encontrar a causa passo a passo: 1) diga qual comando executar para ver o canal, a banda (2,4 ou 5 GHz) e a intensidade do sinal, e explique o resultado; 2) diga como entrar nas configurações do meu roteador e o que conferir: canal, WMM e bandas; 3) antes de mudar algo, diga qual é o valor atual para eu poder voltar atrás. Uma coisa por vez e espere minha resposta.
```

## Passo 1. Meça seu sinal

| Sistema | Como ver |
|---|---|
| Windows | Abra o terminal e digite `netsh wlan show interfaces`: você verá o canal, a banda, o tipo de rádio e o sinal em % |
| Mac | Segure **Option** e clique no ícone do Wi-Fi: você verá o canal, a banda e o sinal (RSSI) |

Anote os valores: assim você compara o antes e o depois.

## Passo 2. Entre no roteador

- O endereço costuma ser `192.168.0.1` ou `192.168.1.1`.
- No Windows, você encontra com `ipconfig` em “Gateway Padrão”. No Mac, em Ajustes > Rede > Wi-Fi > Detalhes > TCP/IP > Roteador.
- O usuário e a senha costumam estar na etiqueta do roteador. Se ele for da operadora e não permitir acesso, peça a eles.
- **Antes de mexer em qualquer coisa**, tire uma foto de cada tela para poder voltar atrás.

## Ajuste 1. O canal

O Wi-Fi viaja por canais, como o rádio. Se seu vizinho usa o mesmo canal com um sinal mais forte, eles interferem entre si. Em 2,4 GHz, os canais que não se sobrepõem são **1, 6 e 11**: escolha o mais livre. Se seu roteador estiver em “automático” e continuar lento, tente definir manualmente.

## Ajuste 2. WMM

WMM (Wi-Fi Multimedia) organiza o tráfego: primeiro o que não pode esperar, como chamadas e vídeo. Além disso, os padrões rápidos de Wi-Fi (802.11n e ac) precisam dele: **se estiver desligado, a velocidade pode ficar limitada a 54 Mbps**. Procure nas configurações avançadas de rede sem fio e deixe **ligado**.

## Ajuste 3. A banda de 5 GHz

Quase todos os roteadores atuais têm duas bandas:

| Banda | Vantagem | Desvantagem |
|---|---|---|
| 2,4 GHz | Alcança mais longe e atravessa paredes | Mais lenta e mais congestionada |
| 5 GHz | Muito mais rápida e com mais canais livres | Alcance menor |

Se seu computador estiver perto do roteador, conecte à rede de 5 GHz. Se as duas bandas tiverem o mesmo nome, o roteador escolhe sozinho; você pode separar com nomes diferentes para escolher.

## Para qualquer coisa que está com problema há meses

A impressora, o celular que não carrega, a planilha interminável, o e-mail que não chega: o método é o mesmo. Conte o problema em detalhes e deixe que ele faça perguntas.

```
Faz [tempo] que [o que falha] em [casa / trabalho]. Já tentei [o que você fez]. Faça as perguntas necessárias para entender o problema, uma por vez, e depois dê os passos para resolver, do mais fácil ao mais difícil. Antes de cada mudança, diga como desfazer.
```

**Quer ajuda com seu caso? Envie WIFI para @andresgomez.ia.**
