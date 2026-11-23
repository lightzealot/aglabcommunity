---
title: "MarkItDown + Claude: converta seus documentos para Markdown passo a passo"
summary: Instale MarkItDown, converta seu primeiro documento e trabalhe com o resultado no Claude, com prompts, checklist e soluções rápidas. Downloads com sua conta.
---
O guia para configurar MarkItDown no Claude passo a passo, para pessoas sem experiência técnica. Data de consulta: **21 de outubro de 2026**. Abaixo, você pode baixar o PDF completo, o guia editável e um documento de teste com sua conversão.

**Verificado** = executado no Windows 10 com Python 3.13.5 e MarkItDown 0.1.9, com documentos fictícios. **Documentado** = segundo a documentação oficial, sem testar (**macOS não foi testado**).

**Markdown** é texto simples com marcações básicas (`#` título, `*` lista, `|` tabela). **MarkItDown**, da Microsoft, converte PDF, Word, PowerPoint, Excel, imagens, áudio, HTML, CSV/JSON/XML, ZIP, YouTube e EPub para Markdown, preservando títulos, listas, tabelas e links. Foi pensado para análise de texto: não é uma cópia fiel do original.

```text
Documento  →  MarkItDown (no seu computador)  →  arquivo .md  →  Claude
```

## Antes de começar

- **Python 3.10 a 3.14** e um ambiente virtual (pasta isolada).
- Os comandos são escritos no **terminal** (PowerShell no Windows, Terminal no Mac), **não no chat do Claude**.
- **Claude Chat** só trabalha com o documento já convertido. **Claude Code** pode executar comandos no seu computador, com sua permissão (requer assinatura do Claude ou conta do Console; o app de desktop inclui na aba **Code**).

## Instalação

**1. Confira o Python.** Windows: `python --version`; Mac: `python3 --version` → deve ser 3.10–3.14 (Verificado: 3.13.5). Se não tiver, [python.org/downloads](https://www.python.org/downloads/).

**2. Pasta e ambiente** (Windows / PowerShell):

```powershell
cd $HOME\Documents
mkdir MarkItDown, MarkItDown\originales, MarkItDown\salida
cd MarkItDown
python -m venv .venv
.venv\Scripts\Activate.ps1
```

Mac: `cd ~/Documents && mkdir -p MarkItDown/originales MarkItDown/salida && cd MarkItDown && python3 -m venv .venv && source .venv/bin/activate` (Documentado). Você verá `(.venv)` no início da linha.

**3. Instale:**

```bash
pip install "markitdown[all]"
markitdown --version
```

Deve mostrar `markitdown 0.1.9` ou posterior. No Windows, use aspas duplas.

**4. Converta:**

```bash
markitdown "originales/acta-de-ejemplo.docx" -o "salida/acta-de-ejemplo.md"
```

Não exibe mensagem e cria o arquivo. **Se o arquivo de saída existir, ele sobrescreve sem avisar** (Verificado). Outra forma: `markitdown archivo.pdf > documento.md`.

Na próxima vez: entre na pasta, ative o ambiente e converta; não precisa reinstalar.

## Deixe Claude Code fazer com você

Abra Claude Code na pasta (`claude` no terminal, ou a aba **Code** → *Local* → *Open folder…*) e cole este prompt. **Até você enviar e aprovar, nada foi instalado.**

```text
Quero instalar MarkItDown a partir do repositório oficial https://github.com/microsoft/markitdown.

Antes de fazer qualquer coisa: confira meu sistema operacional e meu Python (deve estar entre 3.10 e 3.14), explique as mudanças e espere minha confirmação. Execute um comando por vez e diga o que ele faz.

Com minha confirmação: 1) crie um ambiente virtual (.venv) nesta pasta, sem permissões de administrador nem instalações fora dela; 2) instale MarkItDown com suas dependências; 3) converta este documento de teste: [CAMINHO] e salve o resultado em salida/ como .md; 4) confira se preserva títulos, parágrafos, listas e tabelas e diga o que falta ou parece estranho.

Não apague nem sobrescreva meus originais ou arquivos existentes (se o de saída já existir, use outro nome). Não envie meus documentos a serviços externos.
Ao terminar: o que instalou, onde ficou o arquivo e o comando para repetir.
```

## Use o resultado no Claude

- **Chat:** a central de ajuda lista PDF, DOCX, CSV, TXT, HTML, ODT, RTF, EPUB, JSON e XLSX (até 500 MB e 20 arquivos por chat) e **não menciona `.md`**. Opções seguras: **colar o texto** ou **anexar uma cópia `.txt`**. *Pendente:* se sua conta aceita `.md` diretamente.
- **Claude Code:** escreva `@salida/archivo.md` para incluir.

```text
Resuma este documento em 5–8 pontos. Depois de cada ponto, indique entre parênteses a seção de origem (título exato). Use apenas o que o documento diz. Se algo parecer incompleto (por exemplo, uma tabela quebrada), indique em “Dúvidas”.
[COLAR OU ANEXAR]
```

```text
Extraia as tarefas em uma tabela: Tarefa | Responsável | Prazo | Seção. Se faltar responsável ou data, escreva “Não informado”: não deduza nem invente. Copie as datas como estão. Depois liste as tarefas ambíguas e explique por quê.
[COLAR OU ANEXAR]
```

```text
Compare o DOCUMENTO A e o DOCUMENTO B: tabela Tema | O que A diz | O que B diz; o que só está em cada um; o que coincide; contradições. Cite a seção de cada um e não invente. Se algo não puder ser comparado, indique.
[A] … [B] …
```

## Revise a conversão

- [ ] **Títulos** com `#` (no teste, o título do Word com estilo “Título” saiu sem `#`).
- [ ] **Parágrafos** sem quebras indevidas (em um PDF de teste, cada linha saiu como um parágrafo).
- [ ] **Tabelas** com colunas e cabeçalhos corretos (no teste, a linha de cabeçalho saiu vazia).
- [ ] **Links, números e datas** completos; sem omissões.

**Consulte também o original** se houver gráficos ou imagens, tabelas complexas ou documentos importantes. Um **PDF digitalizado** gerou um arquivo **vazio e sem erro** (Verificado).

## Tokens: o que esperar

Depende do documento e do método. **Não há economia fixa garantida.** Dado oficial da Anthropic para PDF **por API**: normalmente **1.500–3.000 tokens de texto por página**, conforme a densidade, mais o custo de imagem porque cada página também é convertida em imagem. Não é uma medição do MarkItDown. Para saber seu caso, compare o mesmo documento no original e em Markdown na sua conta.

## Soluções rápidas

- **“markitdown” não é reconhecido / `command not found`:** o ambiente não está ativado. Ative ou chame pelo caminho: `.venv\Scripts\markitdown.exe archivo.docx -o salida\archivo.md` (Verificado). Se o PowerShell bloquear `Activate.ps1`, use essa alternativa.
- **`MissingDependencyException`:** você instalou apenas `markitdown`. Use `pip install "markitdown[all]"` ou grupos, por exemplo `"markitdown[pdf,docx,pptx]"` (Verificado).
- **Caminhos com espaços:** use aspas duplas; sem elas, ocorre o erro “unrecognized arguments” (Verificado).
- **`FileNotFoundError`:** confira nome, extensão e pasta.
- **Saída vazia:** provavelmente é um PDF digitalizado. Há serviços opcionais (OCR `markitdown-ocr`, Azure Document Intelligence/Content Understanding) que requerem credenciais e podem ter custo: Documentado, não testado. A conversão deste guia é **local**, sem chaves.
- **Segurança:** MarkItDown usa suas permissões de arquivos e rede; não converta arquivos que você não conhece.

## Checklist final

- [ ] Python 3.10–3.14 · [ ] pasta, ambiente ativado e `pip install "markitdown[all]"` · [ ] `markitdown --version` · [ ] primeiro `.md` em `salida` · [ ] revisado com o original · [ ] usado no Claude com um prompt.

**Fontes:** [MarkItDown](https://github.com/microsoft/markitdown) · [Claude Code](https://code.claude.com/docs/en/quickstart) · [Claude Code no desktop](https://code.claude.com/docs/en/desktop-quickstart) · [Enviar arquivos ao Claude](https://support.claude.com/en/articles/8241126-uploading-files-to-claude) · [PDF e tokens](https://platform.claude.com/docs/en/build-with-claude/pdf-support).
