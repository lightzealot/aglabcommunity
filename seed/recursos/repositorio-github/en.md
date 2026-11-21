---
title: "What a GitHub repository is: examples and exercises"
summary: Understand what a repository is, what it's for, and practice with six exercises: create your own, make commits, use branches and undo mistakes.
---
A repository is **a folder for your project that remembers its whole history**: every change, who made it and when. That way you can go back, try ideas without fear and work with other people (or with an AI). **GitHub** is the website where you keep that folder online.

| Word | What it is |
|---|---|
| **Git** | The program that keeps the history, on your computer |
| **Repository** | The project folder with its history |
| **Commit** | A "snapshot" of the project with a message about what changed |
| **Branch** | A parallel copy to try things without touching the main version |
| **Clone** | Download a copy of a repository |
| **Push / Pull** | Upload changes to GitHub / bring down the new ones |

## What it's useful for

Undoing mistakes, trying things on a branch, having a backup, collaborating, showing your work and using tools like Claude Code, which leave their changes as commits you can review or undo. It works for prompts, websites, skills, notes, courses…

```text
my-project/
├── README.md     ← front page: what it is, what it's for, how to use it
├── prompts/
├── .gitignore    ← files Git should ignore (e.g. .env)
└── .git/         ← the history (don't touch it)
```

## The basic cycle

With Git installed, in your project folder:

```bash
git init                       # turn the folder into a repository
git add .                      # mark the files to save
git commit -m "Add my first prompts"
git log --oneline              # see the history
```

To connect it to GitHub, create an empty repository on the website and:

```bash
git remote add origin https://github.com/YOUR-USER/my-project.git
git branch -M main
git push -u origin main
```

From there on: **you change something → `git add .` → `git commit -m "..."` → `git push`**. A good message says what you did ("Fix the broken link in the README"), not "changes".

## Exercises

1. **Your first repository (10 min):** on github.com create `my-prompts`, public, with a README.
2. **Edit on the web (5 min):** edit the README, commit and look at the **Commits** tab.
3. **Upload a file (5 min):** **Add file → Create new file** → `prompts/ideas.md`.
4. **From your computer (20 min):** `git clone https://github.com/YOUR-USER/my-prompts.git`, create `prompts/emails.md`, then `git add .` → `git commit -m "..."` → `git push`.
5. **Branch and mistake (20 min):** `git switch -c test-readme`, delete the README, commit, go back with `git switch main` (it's still intact) and delete the branch with `git branch -D test-readme`.
6. **Explore (10 min):** open someone else's repository, read its README and check when its last commit was.

**Final challenge:** `my-ai-system` with a README, a `prompts/` folder with 3 prompts and one commit for each. Share it in the community.

## Careful with private stuff

- **Never upload passwords, API keys or client data.** Deleted things stay in the history.
- If you don't want anyone to see it, create it as **Private**.
- Put `.env` in `.gitignore`.

**Next:** learn branches and pull requests. If you use Claude Code, ask it to explain each command before running it.
