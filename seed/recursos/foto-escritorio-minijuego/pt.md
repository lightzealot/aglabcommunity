---
title: Da foto da sua mesa a um minijogo
summary: Guia prático para tentar com Gemini 4 Argon, com foto, prompt inicial, cinco verificações e melhorias uma por vez. Comece em 2D.
---
Transforme a foto da sua mesa em um minijogo de corrida para o navegador com Gemini 4 Argon. O Google publicou uma demonstração parecida (Argon no Antigravity, Blender MCP, Nano Banana e Three.js); este guia começa por uma **versão 2D mais simples e verificável**. Não reproduz a demonstração nem promete o mesmo resultado, e os prompts são propostas para testar.

## 1. Prepare a foto

- Foto da sua própria mesa, de cima ou na diagonal, bem iluminada.
- 3 ou 4 objetos reconhecíveis (caneca, caderno, teclado, planta) e mesa visível entre eles: será a pista.
- Remova documentos, telas ou etiquetas com dados que você não queira compartilhar.

## 2. Prepare o ambiente

Abra um projeto vazio no Antigravity, escolha Gemini 4 Argon se sua conta tiver acesso e anexe a foto. Peça HTML, CSS e JavaScript com Canvas 2D e sem dependências; assim você verifica antes de adicionar Blender ou outras ferramentas. Se não tiver esse modelo, consulte as fontes oficiais no final.

## 3. Prompt inicial

```text
Use a foto anexada da minha mesa como referência para criar um minijogo de corrida visto de cima, jogável no navegador.

Primeiro identifique os objetos realmente visíveis. Se algo não estiver claro, indique em vez de inventar. Depois construa uma versão 2D estilizada com Canvas, HTML, CSS e JavaScript.

Entregue: index.html, styles.css e game.js. Sem bibliotecas, serviços pagos nem recursos externos.

Requisitos:
- Preserve aproximadamente a distribuição dos objetos.
- Pista fechada que contorne os objetos sem atravessá-los.
- Carro controlado pelas setas ou WASD.
- Colisões com objetos e limites.
- Linha de chegada, contador de voltas e cronômetro; uma volta só conta depois de passar pelos pontos de controle.
- Botão de reiniciar e pausa; instruções visíveis.

Primeiro faça funcionar; depois melhore a aparência. Teste movimento, colisões, voltas e reinício se puder, e diga o que verificou e o que não verificou. Não publique nem faça deploy. Explique como testar localmente.
```

## 4. Confira

1. O carro responde às teclas e é possível pausar.
2. Bater em uma caneca ou na borda não permite atravessá-las.
3. Cruzar a linha de chegada para três várias vezes não soma voltas falsas.
4. É possível completar uma volta sem ficar preso.
5. Reiniciar faz carro, voltas e cronômetro voltarem ao início.

Se algo falhar, descreva a ação e o que você viu:

```text
Ao cruzar a linha de chegada para três, soma uma volta. Corrija apenas a validação: exija os pontos de controle em ordem e no sentido correto. Preserve o design e os controles. Repita o teste e diga o resultado.
```

## 5. Melhore uma coisa por vez

```text
A planta e a caneca mudaram de lugar em relação à minha foto. Aproxime as posições da referência e adapte a pista sem bloquear o percurso. Mantenha a mecânica que já funciona.
```

```text
Proponha como levar este jogo para Three.js. Diferencie o que pode ser modelado com geometria simples do que exigiria Blender, imagens ou conexões adicionais. Apresente primeiro o plano e os requisitos; não instale nem conecte nada ainda.
```

**O que você vai obter:** um protótipo local 2D com arquivos editáveis. Uma cena 3D com física, texturas e áudio como a demonstração exige mais ferramentas.

**Fontes:** [demonstração e ferramentas do Google](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-argon/) · [Desk Racer no AI Studio](https://aistudio.google.com/apps/bundled/desk-racer?fullscreenApplet=true&showAssistant=true&showPreview=true) (pode pedir login) · [página oficial do Gemini 4 Argon](https://ai.google.dev/gemini-api/docs/models/gemini-4-argon)
