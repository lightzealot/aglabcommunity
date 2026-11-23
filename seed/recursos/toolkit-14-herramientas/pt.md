---
title: "TOOLKIT: 14 ferramentas de IA e a função de cada uma"
summary: "De salvar um link a distribuir um recurso: o que cada ferramenta faz, entrada e saída, primeiros passos, exemplos, limites, modelo de calendário e prompts. Downloads com sua conta."
---
Catorze ferramentas, na ordem de um fluxo de conteúdo: **capturar → registrar → pesquisar → redigir → criar visuais → gravar → distribuir → atender dúvidas**. Data de consulta das fontes oficiais: **17 de outubro de 2026**. Abaixo, você pode baixar o PDF com uma ficha completa por ferramenta (passos, exemplo, erros e limites), o calendário para Notion e os prompts.

**Você não precisa das catorze.** Algumas são alternativas (Perplexity ou Grok; GPT Image 2 ou Gemini; Higgsfield ou HyperFrames) e **nenhuma se conecta sozinha**: cada passagem entre ferramentas é copiar e colar ou uma conexão que você configura. Os preços mudam: consulte em cada página oficial.

## As 14 em ordem

| # | Ferramenta | O que você faz com ela | Entrada → saída | Atenção |
|---|---|---|---|---|
| 1 | [Slack](https://slack.com/help/articles/360042650274-Save-messages-and-files) | Capturar links e ideias | Link + nota → mensagem salva | Salvar → nativo; enviar a outro app exige configuração |
| 2 | [Hermes Agent](https://hermes-agent.nousresearch.com/docs/) | Um agente registra os links | Mensagem → resumo e registro | Código aberto; exige terminal, modelo e app do Slack. Conexão com Notion: não verificada |
| 3 | [Notion](https://www.notion.com/help/intro-to-databases) | Uma linha por ideia em um calendário | Ideias ou CSV → calendário | Importação de CSV: 5 MB no gratuito, 50 MB no pago; datas em MM/DD/YYYY |
| 4 | [Perplexity](https://www.perplexity.ai/help-center/en/articles/10352155-what-is-perplexity) | Pesquisar com fontes | Pergunta → resposta com citações | Abra as fontes: uma citação não comprova o número |
| 5 | [Grok](https://grok.com) | Conferir e ampliar | Achados → verificação | Busca na web documentada na [API](https://docs.x.ai/docs/guides/tools/search-tools); funções do app não confirmadas |
| 6 | [Claude](https://claude.com/product/overview) | Redigir e revisar | Pesquisa + estilo → carrossel, legenda, newsletter | Forneça os dados: caso contrário, ele preenche as lacunas |
| 7 | [Claude Code](https://code.claude.com/docs/en/overview) | Construir sistemas de trabalho | Pasta + tarefa → scripts e arquivos | Exige assinatura ou conta do Console; revise as permissões |
| 8 | [GPT Image 2](https://developers.openai.com/api/docs/models/gpt-image-2) | Imagens estáticas | Brief → imagem | → o modelo `gpt-image-2` da API; a relação exata com ChatGPT Images não está confirmada |
| 9 | [Higgsfield](https://higgsfield.ai) | Dar movimento a uma imagem | Imagem + movimento → clipe | Conta e créditos; peça um ou dois movimentos por clipe |
| 10 | [Gemini](https://support.google.com/gemini/answer/14286560) | Imagens para infográficos | Brief → imagem | 2K com plano do Google AI, 1K sem ele; textos longos na imagem falham: adicione → parte |
| 11 | [HyperFrames](https://github.com/heygen-com/hyperframes) | Gráficos animados com código | HTML/CSS → MP4 | Node 22+ e FFmpeg; Apache 2.0. Diferente de HyperFrames Studio, seu editor |
| 12 | [Tella](https://www.tella.com) | Gravar tela e rosto | Tela + câmera → vídeo editado | Teste de 7 dias do plano Pro na data da consulta; revise as legendas |
| 13 | [ManyChat](https://help.manychat.com/hc/en-us/articles/14281316989724-Instagram-Post-and-Reel-Comments-trigger) | Palavra-chave nos comentários → mensagem direta | Comentário → mensagem com link | Conta e Instagram conectado; a ajuda não pôde ser aberta diretamente: confirme na sua conta |
| 14 | [Gmail](https://support.google.com/mail/answer/6579) | Marcadores e filtros para dúvidas | E-mails → caixa de entrada organizada | Um filtro de encaminhamento só afeta mensagens novas |

**Nomes que se confundem:** Hermes **Agent** não é o modelo Hermes; **HyperFrames** não é HyperFrames **Studio**; **Claude** não é **Claude Code**.

## Caminho mínimo (3 ou 4 ferramentas)

1. **Notion:** importe o calendário e coloque uma ideia real.
2. **Claude ou Perplexity:** pesquise e redija com revisão.
3. **Gemini ou GPT Image 2:** uma imagem simples.
4. **ManyChat:** só quando você já tiver o recurso hospedado.

## Exemplo fictício que percorre o fluxo

Você salva um link sobre como um negócio local (a “Clínica Dental Sonrisa Norte”, inventada) automatiza o atendimento: anota no Slack, passa para Notion, pesquisa, redige um carrossel, cria a imagem, grava um vídeo curto e entrega o guia a quem comentar **TOOLKIT**. Todos os dados são inventados.

## Entrega por ManyChat: configuração de exemplo

| Campo | Valor |
|---|---|
| Gatilho | Comentário em uma publicação ou reel do Instagram |
| Palavra-chave | `TOOLKIT` |
| Mensagem | “Olá! Aqui está o guia TOOLKIT: URL_DEL_RECURSO” |
| `URL_DEL_RECURSO` | Quem implementar preenche; este guia não inclui nenhum download |

**Testes antes de publicar:** comente `TOOLKIT` de outra conta (o link correto chega); teste `toolkit` e outra palavra; comente duas vezes (segundo a ajuda, só o primeiro comentário ativa); abra o link no celular e no computador. Este guia não afirma que exista uma automação ativa nem resultados.

## Modelo de calendário (Notion)

Importe `calendario-contenido.csv` em **Configurações → Importar → CSV**. Colunas: Título, Status, Data de publicação, Formato, Pilar, Link da fonte, Palavra-chave, Ferramenta de pesquisa, Brief visual, Texto ou legenda, Responsável, Notas. As duas linhas de exemplo são fictícias.

## Prompts

```text
Atue como pesquisador. Tema: [TEMA]. Público: [PÚBLICO]. Link: [URL].
Entregue: 1) cinco achados, cada um com sua fonte e o que ela diz exatamente; 2) o que as fontes não confirmam; 3) afirmações que devo verificar; 4) duas perguntas do público.
Não invente dados nem links; se não puder verificar algo, escreva “não confirmado”.
```

```text
Redija a partir desta pesquisa verificada: [COLAR]. Peças: carrossel de [N] slides, legenda de no máximo [N] palavras com CTA para comentar [PALAVRA-CHAVE] e newsletter de [N] palavras.
Português do Brasil com tratamento “você”, frases curtas, termos técnicos explicados, sem promessas de resultados nem dados sem fonte. No final, pontue seu rascunho com a rubrica.
```

```text
Escreva um brief visual para [peça]. Ideia: [frase]. Formato: [4:5 / 9:16 / 16:9]. Paleta: [cores]. Espaço para texto: [onde]. Proibido: texto longo na imagem, logotipos, pessoas reconhecíveis.
Entregue: descrição em um parágrafo, elementos por camada, prompt final para [ferramenta] e três verificações.
```

## Rubrica de cinco revisores (método proposto)

Cada critério vale 20 pontos; **se o total for menor que 95, a peça volta para revisão**.

| Revisor | 20 pontos se… |
|---|---|
| Precisão | Cada dado tem fonte aberta e verificada |
| Clareza | Uma ideia por slide ou parágrafo |
| Utilidade | O leitor consegue executar um passo concreto |
| Voz e português | Natural, com tratamento “você” e termos explicados |
| Honestidade | Sem promessas; limites, custos e requisitos mencionados |

## Primeiros passos (45 min)

Importe o CSV → troque as linhas de exemplo por uma ideia real → pesquise e abra três fontes → redija e aplique a rubrica → crie uma imagem → configure ManyChat apenas com o guia já hospedado.
