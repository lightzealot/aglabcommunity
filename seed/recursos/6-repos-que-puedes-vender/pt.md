---
title: "Não sabe o que vender com IA? 6 repositórios grátis que você pode cobrar"
summary: "Seis projetos do GitHub com licença MIT: para quem oferecer cada um, como vender, o que conferir antes de cobrar e dois exemplos com letras miúdas. Leia o guia completo aqui; o PDF (em espanhol) é baixado com sua conta grátis."
---
Quer vender algo com inteligência artificial para um negócio e não sabe o que oferecer? Aqui estão **6 projetos grátis do GitHub com licença MIT**, para quem oferecer cada um, como vender e o que conferir antes de cobrar.

**Antes de começar:** o código é grátis, mas operar pode ter custo (modelos de IA, chaves de API, servidores). As estrelas são de 26 de novembro de 2026 e mudam todos os dias. Este é um guia prático, não é assessoria jurídica.

## O que a licença MIT permite

- **Você pode** usar o código, modificar, incluir no seu serviço e vender, inclusive em projetos fechados.
- **Você deve** manter o aviso de copyright e o texto da licença nas cópias ou partes importantes que entregar.
- **Não há garantia:** o autor não responde se falhar. Deixe por escrito com seu cliente o que você cobre.
- A licença do código **não cobre** por si só os modelos de IA, os serviços na nuvem, as marcas nem o conteúdo que você processa.

## Os 6 repositórios em resumo

| Repositório | Estrelas | Para quem | O que você vende |
|---|---|---|---|
| AutoClip | 17.096 | Podcasters e coaches | Cortes curtos de cada episódio |
| faster-whisper | 27.048 | Escolas e criadores | Transcrições e legendas revisadas |
| Browser Use | 122.172 | Pequenas empresas com tarefas web repetitivas | Automação sob medida |
| Docling | 71.122 | Contadores e advogados | PDFs e digitalizações em dados |
| OpenHands | 94.431 | Negócios que precisam de uma ferramenta interna | Software sob medida |
| Hermes Agent | 266.447 | Negócios que não conseguem responder a todos | Assistente montado e mantido |

## 1. AutoClip

Você entrega um vídeo longo e ele gera cortes curtos.

=> [AutoClip no GitHub](https://github.com/zhouxiaoka/autoclip)

- **Como instalar:** aplicativo na seção Releases, para Windows 10/11 x64 ou Mac com Apple Silicon. No Linux ou Mac com Intel, roda com Docker.
- **Antes de cobrar:** o corte acontece no seu computador, mas a análise usa sua própria chave de API ou um modelo local (Ollama ou LM Studio). Use apenas vídeos que o cliente tenha direito de usar.

## 2. faster-whisper

Transcreve no seu próprio computador e marca o tempo de cada palavra.

=> [faster-whisper no GitHub](https://github.com/SYSTRAN/faster-whisper)

```
pip install faster-whisper
```

- **Antes de cobrar:** é uma biblioteca Python, não um aplicativo: você monta o fluxo. Confira nomes e números à mão antes de entregar.

## 3. Browser Use

Um agente de IA que usa a web como uma pessoa: pedidos, notas, formulários.

=> [Browser Use no GitHub](https://github.com/browser-use/browser-use)

```
pip install 'browser-use==1.0.9'
```

- **Requisito:** Python 3.11 ou mais novo.
- **Antes de cobrar:** o modelo de IA e o navegador na nuvem são cobrados à parte. Respeite os termos de cada site que automatizar e mantenha uma pessoa revisando. A telemetria anônima é desligada com `ANONYMIZED_TELEMETRY=false`.

## 4. Docling

Transforma PDFs e digitalizações em dados organizados.

=> [Docling no GitHub](https://github.com/docling-project/docling)

```
pip install docling
```

- **Requisito:** Python 3.10 ou mais novo.
- **Antes de cobrar:** cada modelo usado tem sua própria licença. Se houver dados pessoais, combine por escrito como serão guardados e apagados.

## 5. OpenHands

Um agente que programa: use para criar software sob medida mais rápido e teste você mesmo antes de entregar.

=> [OpenHands no GitHub](https://github.com/OpenHands/OpenHands)

```
npm install -g @openhands/agent-canvas
```

- **Requisitos:** para rodar isolado em contêineres, o README pede Node.js 24 ou mais novo, `uv` e Docker em execução. Há outras formas de instalar: veja no README.
- **Antes de cobrar:** você precisa de um modelo (pago ou local). O agente pode executar comandos: use em um ambiente isolado e revise o código.

## 6. Hermes Agent

Um assistente que se conecta ao Telegram, WhatsApp, Slack e outros canais.

=> [Hermes Agent no GitHub](https://github.com/NousResearch/hermes-agent)

- **Como instalar:** siga o instalador oficial que está no README.
- **Antes de cobrar:** para responder 24 horas, precisa de um computador ou servidor sempre ligado e de um modelo. Defina quando a conversa passa para uma pessoa e confira as regras de cada canal.

## Como vender

Não venda o repositório: qualquer um pode baixar. **Venda o problema resolvido.**

| Formato | O que você entrega |
|---|---|
| Por entrega | Um resultado concreto: os cortes de um episódio ou uma pasta de documentos transformada em tabela |
| Instalação | Você deixa funcionando no computador do cliente, ensina a usar e entrega uma folha com os passos |
| Mensalidade | Manutenção e suporte, com os custos de modelos e nuvem à parte e por escrito |

Antes de cobrar, faça um teste pequeno com material real do cliente. Não prometa resultados que você não mediu.

## Letras miúdas: dois que não são como os outros

- **RedInk** ([HisMax/RedInk](https://github.com/HisMax/RedInk)): licença CC BY-NC-SA 4.0, **uso não comercial**. Para cobrar, é preciso pedir ao autor a licença comercial separada.
- **PersonaLive** ([GVCLab/PersonaLive](https://github.com/GVCLab/PersonaLive)): o arquivo LICENSE diz Apache-2.0, mas o README diz que o projeto é **apenas para pesquisa acadêmica**. Não cobre usando-o sem permissão por escrito dos autores.

Lição: leia o arquivo LICENSE **e também** o README.

## Prompt para revisar qualquer repositório antes de cobrar

Cole no Claude e troque o que está entre colchetes. Não substitui um advogado.

```
Revise este repositório antes que eu o use para cobrar de um cliente: [LINK DO REPOSITÓRIO].
O que quero vender: [serviço e tipo de cliente].

1. Leia o arquivo LICENSE e o README inteiro. Cite qualquer frase sobre uso comercial, pesquisa ou restrições.
2. Confira as licenças dos modelos e das dependências importantes.
3. Diga quais serviços ou chaves de API custam dinheiro.
4. Diga quais avisos devo manter ao entregar.
5. Aponte riscos com dados pessoais, direitos de conteúdo e termos dos sites usados.
6. Termine com: SIM, SIM COM CONDIÇÕES ou NÃO. Se algo não puder ser verificado, diga.
```
