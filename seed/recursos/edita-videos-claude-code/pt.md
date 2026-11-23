---
title: "Edite vídeos com Claude Code: guia, prompts e modelo de estilo"
summary: Organize seu projeto, transforme referências em regras concretas e prepare sua primeira edição com 3 prompts e um modelo STYLE.md. Downloads com sua conta.
---
Um guia para organizar seu projeto de vídeo, transformar referências em regras concretas e preparar sua primeira edição com **Claude Code**. Inclui 3 prompts para copiar, um modelo `STYLE.md` com um exemplo preenchido e uma lista de revisão no celular. Abaixo, você baixa o PDF, o guia editável, o modelo e os prompts.

**O que foi verificado e o que não foi:** os requisitos, planos e comandos de instalação vêm da documentação oficial, consultada em **26 de outubro de 2026**. **Nenhuma ferramenta foi instalada ou executada e os prompts não foram testados em um computador**: o resultado depende do seu sistema e do seu vídeo. Não promete uma edição automática perfeita, e o fluxo **não é gratuito**: Claude Code exige um plano pago do Claude (Pro, Max, Team ou Enterprise) ou uma conta do Console com créditos.

## Sua pasta de trabalho

```text
AI Video Editor/
  Raw footage/
  References/
  Exports/
  STYLE.md
```

**Raw footage:** seus vídeos originais, intactos. **References:** referências e quadros extraídos. **Exports:** transcrições, testes e versões (v1, v2…). **STYLE.md:** seu guia de estilo. Comece com um teste de **10 a 15 segundos**.

## As seis seções

1. **Prepare seu projeto:** requisitos, Claude Code em comparação com o chat do Claude e a estrutura de pastas.
2. **Prompt 1, preparar o ambiente:** verifica seu computador, consulta os requisitos oficiais e propõe apenas o necessário, pedindo sua aprovação antes de instalar.
3. **Prompt 2, de referências a guia de estilo:** analisa de 3 a 5 referências (ritmo, legendas, cores, apoios visuais, música) e as transforma em regras com valor, exemplo e exceção.
4. **Modelo `STYLE.md`:** pronto para preencher, com um exemplo de Reel educativo de IA para pequenos negócios. Os valores são exemplos, não regras universais.
5. **Prompt 3, primeira edição:** transcreve, propõe cortes, apresenta um storyboard, gera um teste de 10 a 15 segundos e exporta o vídeo completo só quando você aprovar.
6. **Revisão e problemas:** soluções para resultados genéricos, legendas mal posicionadas, cortes que removem palavras e falta de sincronia, além da lista de revisão no celular.

## Ferramentas mencionadas no guia

| Ferramenta | Para quê | Condições (segundo a documentação) |
|---|---|---|
| **FFmpeg** | Cortar, converter e extrair quadros | Só oferece código-fonte; os binários são de terceiros |
| **whisper.cpp** | Transcrever com marcações de tempo | Licença MIT; lê WAV de 16 bits |
| **yt-dlp** | Baixar um trecho de referência | Respeite os termos do site e os direitos |
| **Remotion** | Vídeo com código React | Gratuito para pessoas, organizações sem fins lucrativos e empresas de até 3 funcionários; para os demais, licença empresarial |
| **HyperFrames** | HTML para vídeo para agentes | Apache 2.0; Node.js 22+ e FFmpeg |

Você não precisa instalar todas: o Prompt 1 ajuda a escolher o mínimo.

**Documentação:** [Claude Code](https://code.claude.com/docs/en/setup) · [Remotion](https://github.com/remotion-dev/remotion) · [HyperFrames](https://hyperframes.heygen.com/introduction) · [FFmpeg](https://ffmpeg.org/download.html) · [whisper.cpp](https://github.com/ggml-org/whisper.cpp) · [yt-dlp](https://github.com/yt-dlp/yt-dlp).
