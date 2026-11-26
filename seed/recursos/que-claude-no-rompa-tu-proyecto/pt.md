---
title: O Claude quebrou seu app? 6 camadas para o Claude Code nunca quebrar seu projeto
summary: Os checkpoints e o /rewind do Claude Code, Git antes de cada mudança grande, testes e produção separados, permissões que bloqueiam comandos destrutivos, backups que funcionam de verdade e as regras de segurança para o seu CLAUDE.md. E o que fazer se já quebrou. Guia completo para ler aqui; o PDF é baixado com sua conta gratuita.
---
Você pediu uma mudança ao Claude e o app caiu? Acontece mais do que parece: um deploy que não devia, um arquivo apagado ou uma pasta de backup que na verdade estava vazia. Aqui estão as 6 camadas para o Claude Code **nunca quebrar seu projeto**, e o que fazer se já aconteceu.

**Dados de 26 de novembro de 2026**, segundo a documentação oficial do Claude Code ([checkpoints](https://code.claude.com/docs/pt/checkpointing)).

## 1. Os checkpoints do Claude Code (seu botão de desfazer)

O Claude Code **salva sozinho o estado do seu código antes de cada mensagem** que você envia. Se algo der errado, você volta.

| O quê | Como funciona |
|---|---|
| Quando salva | Antes de cada mensagem sua que inicia um turno |
| Quantos guarda | Os 100 mais recentes da sessão |
| Quanto duram | Cerca de 30 dias desde a última vez que a sessão salvou um |
| Como voltar | Com **`/rewind`**: restaura código e conversa, só a conversa ou só o código |

**Atenção, não substitui o Git:**
- só salva o que o Claude editou com suas ferramentas de arquivos,
- não salva mudanças feitas com comandos de terminal nem fora da sessão,
- quase nunca captura o que os subagentes editam,
- e não desfaz o que aconteceu fora: um deploy, um e-mail enviado ou um banco de dados apagado.

## 2. Git: um commit antes de cada mudança grande

```
Antes de tocar em qualquer arquivo, faça um commit com o estado atual e crie uma branch nova para esta mudança. Ao terminar, me mostre o diff e não faça merge sem me perguntar.
```

## 3. Testes e produção, separados

- Tenha um ambiente de **testes** com um nome claro (não «testes-final-v2»).
- Diga ao Claude para **nunca fazer deploy em produção** sem sua confirmação.
- Se funcionar em testes, quem sobe é você.

## 4. Permissões: que pergunte antes do perigoso

- No **modo padrão**, o Claude Code pede permissão antes de editar arquivos ou rodar comandos. Use em projetos reais.
- Use o **modo plano** para que primeiro proponha e depois execute.
- Bloqueie comandos destrutivos em `.claude/settings.json`:

```
{
  "permissions": {
    "deny": ["Bash(rm -rf:*)", "Bash(git push --force:*)", "Bash(npm run deploy:*)"]
  }
}
```

Troque `npm run deploy` pelo comando com que você faz deploy do seu projeto.

## 5. Backups que servem de verdade

Um backup que você nunca testou não é um backup.

| Confira | Com que frequência |
|---|---|
| Que a pasta de backup **tenha arquivos** e algum tamanho | Toda semana |
| Que você consegue **restaurar** uma cópia em um ambiente de testes | Todo mês |
| Que o banco de dados tenha backup automático no seu provedor | Uma vez, e quando mudar de plano |

## 6. As regras no seu CLAUDE.md

Cole isto no arquivo `CLAUDE.md` do seu projeto para o Claude ler em cada sessão:

```
## Regras de segurança
- Nunca faça deploy em produção sem me perguntar.
- Antes de uma mudança grande, faça um commit e trabalhe em uma branch nova.
- Nunca apague arquivos, pastas nem bancos de dados sem minha confirmação.
- Se for rodar um comando que não pode ser desfeito, explique o que ele faz e espere meu sim.
- Se algo falhar, pare e me avise antes de tentar consertar.
```

## Se já quebrou

1. **Pare de pedir mudanças**: cada mensagem nova acrescenta mudanças por cima.
2. Digite **`/rewind`** e volte ao checkpoint anterior ao problema.
3. Se a mudança saiu da sessão (deploy, banco de dados), volte ao último commit com Git ou restaure seu backup.
4. Peça ao Claude que explique o que aconteceu, **sem tocar em nada**:

```
Me explique passo a passo o que você mudou na última hora e o que pode ter quebrado o app. Não modifique nenhum arquivo: só diagnostique.
```
