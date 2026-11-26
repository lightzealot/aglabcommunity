---
title: Seu app feito com IA pode te dar problemas legais? 35 pontos para pedir ao Claude antes de lançar
summary: Os 35 pontos legais e técnicos para revisar antes de lançar um app feito com IA (privacidade, termos, cookies, pagamentos, marketing, acessibilidade, licenças e dados de usuários), em 7 blocos, mais um prompt pronto para o Claude Code auditar seu app. Guia completo para ler aqui; os arquivos são baixados com sua conta gratuita.
---
Você fez seu app com IA e já vai lançar? Funcionar não é o mesmo que estar pronto. Um app sem política de privacidade, com cookies que carregam sem permissão ou com uma assinatura impossível de cancelar pode render multas, reclamações ou remoção da loja. Aqui estão os **35 pontos** para pedir ao Claude antes de publicar, em 7 blocos, e um prompt para o Claude Code revisar seu app por você.

**Antes de começar:** isto não é assessoria jurídica. As regras mudam conforme o país (LGPD no Brasil, GDPR na Europa, CCPA na Califórnia). Use a checklist para chegar preparado e peça a um advogado que revise seu app antes do lançamento.

## Como usar esta checklist com o Claude Code

1. Abra o Claude Code dentro da pasta do seu app.
2. Cole o prompt do final (também está no arquivo `prompt.md`).
3. O Claude devolve uma tabela com cada ponto: ✅ cumpre, ⚠️ parcial ou ❌ falta, onde viu e o que propõe.
4. Aprove as correções uma por uma. Nada muda sem o seu ok.

## Bloco 1. Privacidade e termos

| # | Ponto | O que pedir ao Claude |
|---|---|---|
| 1 | Política de privacidade | Criar e linkar no rodapé e no cadastro: quais dados, para quê e com quem são compartilhados |
| 2 | Termos e condições | Publicar e linkar onde o usuário se cadastra |
| 3 | Tempo de guarda | Definir e escrever por quanto tempo cada tipo de dado é guardado |
| 4 | Caixa desmarcada | A caixa para aceitar os termos começa vazia |
| 5 | Registro de aceite | Guardar quem aceitou, qual versão dos termos e quando |

## Bloco 2. Cookies, rastreamento e fornecedores

| # | Ponto | O que pedir ao Claude |
|---|---|---|
| 6 | Banner de cookies | «Rejeitar tudo» tão visível quanto «Aceitar tudo» |
| 7 | Bloquear rastreadores | Scripts de análise e anúncios só carregam depois do aceite |
| 8 | Auditar SDKs | Listar cada SDK de análise, anúncios e erros e quais dados envia |
| 9 | Acordos de dados | Lembrar de assinar um acordo de tratamento de dados (DPA) com cada fornecedor |
| 10 | Lista de fornecedores | Publicar quais fornecedores tratam dados e em que país |

## Bloco 3. Pagamentos e assinaturas

| # | Ponto | O que pedir ao Claude |
|---|---|---|
| 11 | Reembolsos | Publicar a política de reembolso antes do pagamento |
| 12 | Cancelar fácil | Cancelar leva os mesmos passos que assinar |
| 13 | Renovação automática | Avisar por e-mail antes de cobrar a renovação |
| 14 | Sem taxas ocultas | O preço final aparece desde o início |

## Bloco 4. Honestidade e marketing

| # | Ponto | O que pedir ao Claude |
|---|---|---|
| 15 | Descadastrar | Todo e-mail de marketing tem link para descadastrar |
| 16 | Contagens regressivas | Tirar cronômetros falsos ou que reiniciam |
| 17 | Padrões enganosos | Tirar a culpa ao cancelar, caixas pré-marcadas e botões escondidos |
| 18 | Avaliações | Tirar qualquer avaliação inventada ou comprada |
| 19 | Promessas | Trocar «garantido» e «o número 1» pelo que o app faz de verdade |
| 20 | Permissão de marketing | Pedir a permissão de publicidade em uma caixa separada |
| 21 | Certificações | Tirar SOC 2, ISO ou outros selos que você não tem |
| 22 | Disponibilidade | Prometer uma disponibilidade que você mede, não «100 %» |

## Bloco 5. Acessibilidade e conteúdo

| # | Ponto | O que pedir ao Claude |
|---|---|---|
| 23 | Contraste | Subir o contraste para WCAG AA (4,5:1 em texto normal) |
| 24 | Texto alternativo | Colocar `alt` descritivo em todas as imagens |
| 25 | Teclado | Tudo funciona com Tab, Enter e Esc, com foco visível |
| 26 | Conteúdo com IA | Rotular o que a IA fez (imagens, textos, vozes) |

## Bloco 6. Licenças e marcas

| # | Ponto | O que pedir ao Claude |
|---|---|---|
| 27 | Logos de clientes | Tirar logos sem permissão por escrito |
| 28 | Imagens, fontes e código | Revisar a licença de cada recurso usado |
| 29 | Open source | Incluir os avisos de licença e alertar sobre AGPL ou GPL |
| 30 | Direitos autorais | Colocar um e-mail ou formulário visível para reclamações |

## Bloco 7. Dados de usuários

| # | Ponto | O que pedir ao Claude |
|---|---|---|
| 31 | Baixar e apagar | O usuário pode exportar seus dados e apagar a conta sozinho |
| 32 | Dados mínimos | Tirar do cadastro os campos que você não precisa |
| 33 | Menores de idade | Pedir permissão de pai, mãe ou responsável antes de guardar dados de menores |
| 34 | Treinar IA | Não usar dados de usuários para treinar IA sem permissão explícita |
| 35 | Contato | Mostrar o nome da empresa, um e-mail e como falar com você |

## O prompt para o Claude Code

Copie tudo e cole no Claude Code dentro da pasta do seu app. Para a versão com os 35 pontos escritos um por um, baixe `prompt.md` (em espanhol).

```
Atue como revisor de lançamento do meu app. Revise o código, as telas, os textos e as integrações com esta checklist de 35 pontos: privacidade e termos, cookies e rastreamento, fornecedores, pagamentos e assinaturas, honestidade e marketing, acessibilidade, conteúdo com IA, licenças e dados de usuários.

Para cada ponto me dê uma linha com:
- Status: ✅ cumpre · ⚠️ parcial · ❌ falta · ➖ não se aplica
- Onde você viu: arquivo, rota ou tela
- O que propõe: a mudança exata, em uma ou duas linhas

Não mude nada ainda. Primeiro me entregue a tabela ordenada de ❌ a ✅. Depois implemente só as correções que eu aprovar, uma por uma. Marque os pontos que um advogado deve revisar: você não substitui um.
```

## Antes de lançar

> O Claude ajuda a encontrar o que falta, mas não substitui um advogado. Leve esta tabela para a revisão e economize tempo e dinheiro.
