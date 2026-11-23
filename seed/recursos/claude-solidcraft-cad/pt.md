---
title: Claude projeta suas peças 3D com SolidCraft
summary: Configuração passo a passo para conectar Claude Code ao SolidCraft, o app de CAD gratuito e de código aberto, e 3 prompts para sua primeira peça (suporte para celular, caixa com tampa e gancho). Guia completo para ler aqui; o PDF e os prompts editáveis podem ser baixados com sua conta gratuita.
---
Quer imprimir em 3D, mas o CAD trava você? Com **SolidCraft** (app de CAD gratuito e de código aberto) e **Claude Code**, você descreve a peça e o Claude desenha, mede e deixa tudo pronto para o fatiador. Aqui você encontra a configuração passo a passo e **3 prompts para sua primeira peça**. Abaixo, você baixa o PDF e os prompts em um arquivo editável.

## Do que você precisa

| | |
|---|---|
| **SolidCraft** | Gratuito, para Windows, macOS e Linux (também funciona no navegador). Versão atual: 0.45.0. |
| **Claude Code** | O assistente do Claude no terminal. Você precisa de uma conta do Claude com acesso ao Claude Code. |
| **Um fatiador** | O programa que você já usa para imprimir (Cura, PrusaSlicer, Bambu Studio, Orca…). |

=> [Baixe o SolidCraft](https://solidcraft.io/download)

## Passo 1 · Instale o SolidCraft

- **Windows:** baixe o instalador. O arquivo ainda não é assinado, então o Windows pode exibir um aviso: clique em **Mais informações** e depois em **Executar assim mesmo**.
- **Mac:** baixe a imagem de disco (serve para Apple Silicon e Intel). É assinada e autenticada pela Apple e abre como qualquer app.
- **Linux:** AppImage, ou `sudo snap install solidcraft`.

A instalação também inclui `solidcraft-cli`, o programa que o Claude usa para se comunicar com o app.

## Passo 2 · Conecte Claude Code com um único comando

Abra o terminal e cole:

```
claude mcp add solidcraft -- solidcraft-cli mcp
```

Se o terminal disser que não encontra `solidcraft-cli` (acontece com instaladores antigos do Windows), use o caminho completo:

```
claude mcp add solidcraft -- "C:\Program Files\SolidCraft\solidcraft-cli.exe" mcp
```

Outra forma: no app, **Help > Connect AI assistants…** faz a configuração automaticamente.

## Passo 3 · Para ver o Claude modelar ao vivo

Sem este passo, o Claude trabalha “às cegas” (sem janela) e ainda entrega o arquivo. Se quiser ver como ele desenha a peça no app:

1. Abra o SolidCraft.
2. Vá a **Preferences > Assistant > Agents through MCP** e ative **“Let AI agents connect”**.
3. Abra Claude Code (`claude` no terminal). Ele se conecta automaticamente ao app aberto.

## Passo 4 · Sua primeira peça: 3 prompts

Cole os prompts como estão no Claude Code. Troque as medidas pelas suas.

### 1. Suporte para celular

```
Use SolidCraft para projetar um suporte de mesa para celular, inclinado a 60 graus. Base de 80 x 90 mm e 10 mm de espessura, apoio traseiro de 90 mm de altura e uma borda frontal de 14 mm para o celular não escorregar. A ranhura deve medir 11 mm (a espessura do meu celular com capa). Arredonde as bordas externas com 5 mm. Deixe o ângulo, a largura e a ranhura como parâmetros. Revise o modelo e meça a ranhura antes de terminar, e exporte um STL chamado soporte.stl.
```

### 2. Caixa com tampa de encaixe

```
Use SolidCraft para projetar uma caixa com tampa de encaixe de 60 x 40 x 30 mm por dentro, paredes de 2 mm e cantos arredondados de 3 mm. A tampa encaixa com uma folga de 0,2 mm para impressão FDM. Deixe comprimento, largura, altura e folga como parâmetros. Meça a folga entre caixa e tampa e exporte dois STLs: caja.stl e tapa.stl.
```

### 3. Gancho de parede

```
Use SolidCraft para projetar um gancho de parede em forma de J para pendurar fones de ouvido: 25 mm de largura, 5 mm de espessura, 70 mm de altura e uma curva de 30 mm de raio, com dois furos escareados para parafusos de 4 mm. Arredonde todas as bordas com 1,5 mm. Deixe a largura e o raio como parâmetros e exporte gancho.stl.
```

## Passo 5 · Mude um número e exporte novamente

A vantagem do SolidCraft é ser **paramétrico**: você pede ao Claude “mude o ângulo para 70 graus” ou “a ranhura para 13 mm” e a peça inteira é refeita. Depois peça novamente o STL (ou 3MF) e abra no seu fatiador.

## Antes de imprimir

- É um projeto novo (lançado em outubro de 2026): comece com peças simples como estas.
- Confira as medidas e folgas no fatiador e, se a peça for grande, imprima primeiro um teste pequeno antes de uma impressão longa.
- Segundo o próprio repositório, 75 de 76 peças de referência têm volume, área e centro de massa iguais aos de um CAD consolidado.

## Dados do projeto

- Repositório: [tangency-labs/solidcraft](https://github.com/tangency-labs/solidcraft), licença Apache-2.0 / MIT.
- 17.578 estrelas no GitHub e 748 commits escritos com o Claude (de 10.510), dados de 21 de novembro de 2026.

Salve este guia para quando quiser imprimir sua primeira peça. @andresgomez.ia
