---
title: "O que é um repositório no GitHub: exemplos e exercícios"
summary: "Entenda o que é um repositório, para que serve e pratique com seis exercícios: crie o seu, faça commits, use branches e desfaça erros."
---
Um repositório é **uma pasta do seu projeto que guarda todo o histórico**: cada mudança, quem fez e quando. Assim você pode voltar atrás, testar ideias sem medo e trabalhar com outras pessoas (ou com uma IA). **GitHub** é o site onde você guarda essa pasta online.

| Palavra | O que é |
|---|---|
| **Git** | O programa que mantém o histórico no seu computador |
| **Repositório** | A pasta do projeto com seu histórico |
| **Commit** | Uma “foto” do projeto com uma mensagem sobre o que mudou |
| **Branch** | Cópia paralela para testar sem mexer na versão principal |
| **Clonar** | Baixar uma cópia de um repositório |
| **Push / Pull** | Enviar mudanças ao GitHub / baixar as novas |

## Para que serve

Desfazer erros, testar em uma branch, ter backup, colaborar, mostrar seu trabalho e usar ferramentas como Claude Code, que deixam as mudanças como commits que você pode revisar ou desfazer. Serve para prompts, sites, skills, notas, cursos…

```text
mi-proyecto/
├── README.md     ← apresentação: o que é, para que serve, como usar
├── prompts/
├── .gitignore    ← arquivos que o Git deve ignorar (por exemplo, .env)
└── .git/         ← o histórico (não mexa)
```

## O ciclo básico

Com Git instalado, na pasta do seu projeto:

```bash
git init                       # transformar a pasta em repositório
git add .                      # marcar os arquivos para salvar
git commit -m "Agrego mis primeros prompts"
git log --oneline              # ver o histórico
```

Para conectar ao GitHub, crie um repositório vazio no site e:

```bash
git remote add origin https://github.com/TU-USUARIO/mi-proyecto.git
git branch -M main
git push -u origin main
```

Daí em diante: **altere → `git add .` → `git commit -m "..."` → `git push`**. Uma boa mensagem diz o que você fez (“Corrijo o link quebrado do README”), não “mudanças”.

## Exercícios

1. **Seu primeiro repositório (10 min):** em github.com, crie `mis-prompts`, público, com README.
2. **Edite pelo site (5 min):** edite o README, faça commit e veja a aba **Commits**.
3. **Envie um arquivo (5 min):** **Add file → Create new file** → `prompts/ideas.md`.
4. **Do seu computador (20 min):** `git clone https://github.com/TU-USUARIO/mis-prompts.git`, crie `prompts/correos.md`, e `git add .` → `git commit -m "..."` → `git push`.
5. **Branch e erro (20 min):** `git switch -c prueba-readme`, apague o README, faça commit, volte com `git switch main` (continua intacto) e exclua a branch com `git branch -D prueba-readme`.
6. **Explore (10 min):** abra um repositório de outra pessoa, leia o README e veja quando foi o último commit.

**Desafio final:** `mi-sistema-ia` com um README, uma pasta `prompts/` com 3 prompts e um commit para cada um. Compartilhe na comunidade.

## Cuidado com os dados privados

- **Nunca envie senhas, chaves de API nem dados de clientes.** O que foi apagado continua no histórico.
- Se não quiser que ninguém veja, crie como **Private**.
- Coloque `.env` em `.gitignore`.

**Depois:** aprenda branches e pull requests. Se usar Claude Code, peça que explique cada comando antes de executar.
