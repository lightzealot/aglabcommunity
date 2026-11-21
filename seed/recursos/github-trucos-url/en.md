---
title: "4 tricks if you don't understand anything on GitHub: change one word in the URL"
summary: "Seven tricks to understand any repository without reading the code: gitreverse, gitdiagram, gitingest, gitmcp, DeepWiki, the dot key and .patch. Full guide to read here; files download with your free account."
---
You open a GitHub repository, see a hundred files and don't understand anything. Here are **7 tricks to understand any repository without reading the code file by file**. In the first four you only change one word in the URL. They work with public repositories, and in the examples **your/repo** is the user and name of the repository you want to understand.

> These are third-party tools: they aren't from GitHub or Anthropic. They may change, be slow or stop working.

## Trick 1. Change "github.com" to "gitreverse.com"

GitReverse reads the repository and gives you **a prompt to ask an AI to build that same project from scratch**.

```
github.com/your/repo
gitreverse.com/your/repo
```

- Copy the prompt and paste it into Claude to create your own version.
- Adjust it: remove what you don't need before pasting.

## Trick 2. Change "github.com" to "gitdiagram.com"

GitDiagram draws an **interactive diagram** of how the repository is built: its parts and how they connect.

```
github.com/your/repo
gitdiagram.com/your/repo
```

- Click each box in the diagram to jump to that part of the code.
- Use it before touching someone else's project: you see the whole map in a minute.

## Trick 3. Change "github.com" to "gitingest.com"

Gitingest puts the whole repository **into a single text**: a summary, the folder tree and the content of each file. Ready to paste into Claude.

```
github.com/your/repo
gitingest.com/your/repo
```

- If the repo is very large, use the filters to include only the folders you care about.
- Paste the text into Claude together with this prompt (change what's in brackets):

```
I'm pasting a whole repository as a single text. Explain to me, in this order:
1) What the project does, in 3 lines and without jargon.
2) How it's organized: the important folders and what each one is for.
3) How to install and run it on my computer, step by step.
4) Which file I would have to touch to change [what you want to change].
Don't make anything up: if something isn't in the text, tell me.
```

## Trick 4. Change "github.com" to "gitmcp.io"

GitMCP turns the repository into an **MCP server**. You connect it to Claude and Claude can consult its documentation when you ask.

```
github.com/your/repo
gitmcp.io/your/repo
```

- **In Claude:** add a custom connector and paste the URL `https://gitmcp.io/your/repo`.
- **In Claude Code:** `claude mcp add --transport http repo https://gitmcp.io/your/repo`
- Then ask Claude about that project: it will use the repository as a source.

## The 3 extra tricks

**Trick 5. DeepWiki.** Change `github.com` to `deepwiki.com`: it builds a wiki of the repository, with explanations by section and a chat to ask it questions. Great for big projects with little documentation.

**Trick 6. The dot key.** Inside any repository on GitHub, press the **.** (dot) key. The project opens in a code editor in the browser (github.dev), with search and all the folders. You install nothing.

**Trick 7. ".patch" at the end of a commit.** Add `.patch` (or `.diff`) to the end of a commit or pull request URL and you see the full change in plain text, ready to paste into Claude and ask it to explain it.

```
github.com/your/repo/commit/abc123
github.com/your/repo/commit/abc123.patch
```

## Limits you should know

- **Public repos:** they work with public repositories. Gitingest accepts private repos with a GitHub token; don't share that token with anyone.
- **Very large repos:** Gitingest's text may not fit in a chat. Filter folders or ask in parts.
- **Check the license** before copying or rebuilding someone else's project.
- **Claude can make mistakes:** if it explains a file to you, open it and check the important parts.

| You want | Use |
|---|---|
| Understand | Diagram and DeepWiki |
| Ask | Ingest or GitMCP with Claude |
| Build | Reverse to build your version |
| Review | Dot key and .patch |

Try the tricks with a repository you already know and compare. **Want me to help with your case? Message me REPO at @andresgomez.ia.**
