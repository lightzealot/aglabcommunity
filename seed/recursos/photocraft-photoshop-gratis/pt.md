---
title: "PhotoCraft: o Photoshop gratuito e de código aberto que Claude pode controlar"
summary: O que é PhotoCraft, como baixar para Windows, Mac ou Linux, abrir seus PSDs e conectar ao Claude por MCP. Guia completo para ler aqui; os arquivos podem ser baixados com sua conta gratuita.
---
PhotoCraft é um editor de fotos **gratuito e de código aberto** que reescreve Photoshop do zero. Abre seus PSDs, não exige conta nem assinatura e inclui um servidor MCP para o Claude controlar por você. Aqui estão os links diretos, como instalar e como conectar ao Claude.

**Antes de começar:** é um projeto muito novo (o repositório foi criado em 30 de setembro de 2026). Use primeiro com cópias dos seus arquivos e compare com seu fluxo de trabalho real antes de deixar a Adobe. Não pertence à Adobe nem tem vínculo com ela: é um projeto independente.

## O que é e por que importa

| Dado | Valor (em 19 de nov. de 2026) |
|---|---|
| Estrelas no GitHub | 80.4k |
| Forks | 14.2k |
| Licença | MIT ou Apache-2.0 |
| Versão atual | v0.23.1 |
| Funciona sem conta nem conexão | Sim |

## Passo 1. Baixe de graça

A forma mais fácil é o instalador oficial. Se quiser um formato específico, todos estão no GitHub.

=> [Baixe pela página oficial](https://getartcraft.com/apps/photocraft)

- **Windows:** instalador `.msi` (x64, ARM ou 32 bits) ou versão portátil `.zip`.
- **Mac:** app universal `.dmg` (Apple Silicon e Intel), assinado.
- **Linux:** AppImage, `.deb`, `.rpm`, Flatpak ou tarball.
- **Web:** também roda no navegador (WebAssembly).

Todas as versões: [github.com/storytold/photocraft/releases/latest](https://github.com/storytold/photocraft/releases/latest). O código: [github.com/storytold/photocraft](https://github.com/storytold/photocraft).

## Passo 2. Abra e salve seus PSDs

Você abre um PSD que está pela metade e ele preserva camadas, máscaras, textos editáveis, estilos de camada e camadas de ajuste. Depois salva de novo como PSD.

- **27 modos de mesclagem** do Photoshop e 69 ferramentas, com os mesmos atalhos.
- **Teste público:** ao abrir e salvar novamente, 307 dos 309 arquivos do conjunto de testes psd-tools ficam visualmente iguais.
- **Atenção:** o arquivo salvo não é idêntico byte a byte. Parece igual, mas PhotoCraft reescreve partes internas.
- Também abre PSB, TIFF com camadas, arquivos de GIMP, Krita e Affinity (estes últimos apenas para leitura).

## Passo 3. Seus apps irmãos

PhotoCraft faz parte das Crafting Apps da equipe ArtCraft: todas gratuitas, de código aberto e escritas do zero.

- **LightCraft:** no estilo Lightroom, biblioteca de fotos e revelação RAW. [github.com/storytold/lightcraft](https://github.com/storytold/lightcraft)
- **FilmCraft:** no estilo Premiere, edição de vídeo, cor e som. [github.com/storytold/filmcraft](https://github.com/storytold/filmcraft)
- **E mais:** VectorCraft, PdfCraft, EffectCraft, DesignCraft e outras em [getartcraft.com](https://getartcraft.com).

## Passo 4. Conecte ao Claude por MCP

Cada botão e cada ferramenta do PhotoCraft é um comando, então o Claude pode usar da mesma forma que você. Há dois caminhos.

### Caminho A. Sem terminal (ArtCraft Launcher)

1. Abra o ArtCraft Launcher: Settings, AI agents, e ative **Let AI agents use Craft apps**.
2. Clique em **Add** ao lado de Claude Desktop ou Claude Code e reinicie o Claude.
3. Segundo a documentação, essa função depende de uma opção experimental chamada AI-MCP. Se não vir a opção, consulte `docs/mcp.md` no repositório.

### Caminho B. Claude Code com a ferramenta de linha de comando

Registre o MCP (troque a pasta pela sua):

```
claude mcp add photocraft -- photocraft-cli mcp --automation-read-root /ruta/a/tus/fotos --automation-write-root /ruta/a/tus/fotos
```

- `photocraft-cli` vem em um `.zip` separado para Mac. No Linux, o AppImage inclui com `--cli`. Também pode ser instalado a partir do código com cargo.
- As duas pastas limitam onde o Claude pode ler e salvar. Use uma pasta de teste.

### Peça assim

Quando estiver conectado, teste algo concreto em uma pasta de testes:

```
Abra foto.psd da minha pasta de testes, recorte no formato 4:5, aumente um pouco o contraste com uma camada de Curvas e exporte como PNG com o nome foto-final.png. Diga cada passo que fez.
```

## Limites antes de deixar a Adobe

- **É muito novo:** tem menos de dois meses e milhares de issues abertas. Espere falhas.
- **Trabalhe com cópias** dos seus PSDs até confiar no resultado.
- **Claude pode errar:** revise o que exporta antes de enviar a um cliente.
- **Não cancele ainda:** teste por uma ou duas semanas em paralelo com seu trabalho real.

**Quer que a gente adapte ao seu caso? Envie ADOBE para @andresgomez.ia.**
