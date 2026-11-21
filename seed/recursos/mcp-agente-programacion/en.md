---
title: 4 MCPs to extend your coding agent
summary: Context7, Chrome DevTools, Supabase and Vercel: setup for Claude Code and Codex, checks, eight prompts and a full exercise. Downloads with your account.
---
Connect documentation, a browser, a database and deployments to **Claude Code** and **Codex**. Checked against the official documentation on **October 20, 2026**; **nothing was run**, so the commands match the documentation but aren't claimed to be tested. Anything not verified is marked *pending*. Below you can download the full PDF (in Spanish), the checklist and the 8 prompts.

**MCP** (Model Context Protocol) is a standard that lets an agent use external tools. **Remote** = the server is on the internet (URL, usually OAuth, sign-in in the browser). **Local** = a program on your machine (here, with `npx`). Installing all four **doesn't guarantee correct code or production-ready apps**. An MCP server acts with your permissions: only connect it if you trust it, keep **manual approval** on and be wary of external content (prompt injection).

## The four

| | What for | Type | Requirements |
|---|---|---|---|
| **Context7** | Current docs for your version of a library | Remote or local | API key recommended (free in its dashboard) |
| **Chrome DevTools** | Control and inspect a real Chrome | Local | Node LTS and stable Chrome |
| **Supabase** | Your project's tables, queries and logs | Remote | Supabase account |
| **Vercel** | Projects, deployments and logs | Remote | Vercel account and team permissions |

**Where each thing runs:** the `claude mcp …`, `codex mcp …` and `npx …` commands go in the **terminal**; `/mcp` and the prompts go **inside** Claude Code or Codex (`claude` or `codex` in the project folder). Claude Code stores the config by scope (`--scope local|project|user`; project scope goes in `.mcp.json`); Codex, in `~/.codex/config.toml`.

## 1. Context7

**Claude Code** (terminal; replace `YOUR_API_KEY`):

```bash
claude mcp add --scope user --transport http context7 https://mcp.context7.com/mcp --header "Authorization: Bearer YOUR_API_KEY"
```

**Codex** (terminal):

```bash
codex mcp add context7 -- npx -y @upstash/context7-mcp
```

With a key: add `--api-key YOUR_API_KEY` at the end. Remote in `config.toml`: `url = "https://mcp.context7.com/mcp"` and `http_headers = { "Authorization" = "Bearer YOUR_API_KEY" }`.

**Check:** `claude mcp list` or `codex mcp list`, and `/mcp` inside the agent. **Test:** "Use Context7 to explain how to define a route with the version of [LIBRARY] in this project. Cite the version."

**Mistakes:** leaving `YOUR_API_KEY` unreplaced; not stating the version. *Pending:* whether it works without a key and its limits.

## 2. Chrome DevTools MCP

**Claude Code:** `claude mcp add chrome-devtools --scope user npx chrome-devtools-mcp@latest`

**Codex:** `codex mcp add chrome-devtools -- npx chrome-devtools-mcp@latest`

**Test:** "Open http://localhost:3000, take a screenshot and tell me if there are errors in the console." (with your local server running). It opens a Chrome window controlled by the agent; with `--headless` it runs without a window.

**Privacy:** it exposes the browser's content to the agent: **don't open personal sessions** or share sensitive data. Usage statistics are on by default (`--no-usage-statistics` turns them off). Official support: Chrome and Chrome for Testing.

*Pending:* the project uses `startup_timeout_ms` in the Windows `config.toml` while Codex documents `startup_timeout_sec`; use whichever your version documents.

## 3. Supabase MCP

Use a **test project**, with scope and read-only in the URL: `https://mcp.supabase.com/mcp?project_ref=YOUR_PROJECT_ID&read_only=true`.

**Claude Code:**

```bash
claude mcp add --scope project --transport http supabase "https://mcp.supabase.com/mcp?project_ref=YOUR_PROJECT_ID&read_only=true"
```

Then `/mcp` → `supabase` → *Authenticate* (sign-in in the browser). Don't put keys in `.mcp.json`: it's shared with your team.

**Codex:**

```bash
codex mcp add supabase --url "https://mcp.supabase.com/mcp?project_ref=YOUR_PROJECT_ID&read_only=true"
codex mcp login supabase
```

**Test:** "List the tables in my project and how many rows each one has. Don't modify anything."

**Risks (according to its documentation):** prompt injection from untrusted data; keep manual approval on, avoid production data and use `project_ref`, `read_only` and sample data. Don't give this server to clients: it runs with your permissions.

## 4. Vercel MCP

**Claude Code:** `claude mcp add --transport http vercel https://mcp.vercel.com`, then `/mcp` → authenticate.

**Codex:** `codex mcp add vercel --url https://mcp.vercel.com` (opens the browser to authorize; if not, `codex mcp login vercel`).

**Querying isn't creating.** To **query**: `list_deployments`, `get_deployment`, `get_runtime_logs`, `get_runtime_errors`, `list_projects`. To **create or change**: according to an announcement on July 23, 2026, there's `deploy_to_vercel`, plus tools that modify resources. *Pending:* its Git or CLI requirements and whether it deploys preview or production.

**Permissions:** adding the server doesn't authorize anything: sign in and grant access only to the team you need. **MCP and the Vercel CLI use separate authentication.** Keep human confirmation on every action.

**Test:** "List my Vercel teams and projects. Don't make any changes."

## 8 prompts (2 per tool)

```text
Context7 · Use Context7 with the version of [LIBRARY] in this project (check package.json) to explain how to [TASK]. Cite the version; if it doesn't have it, tell me.
```

```text
Context7 · Review [FILE] against the current documentation for [LIBRARY] and list outdated patterns: line, what the docs say and proposal. Don't modify anything.
```

```text
DevTools · Open [LOCAL URL], take a screenshot and check the console and network. Give me a report: errors, slow requests and the likely file. Don't sign in to any account.
```

```text
DevTools · Test this flow at [URL]: [STEPS]. After each step say what you saw and take a screenshot if it fails. Don't submit forms with real data.
```

```text
Supabase · In read-only mode, list the tables in my test project with columns and relationships and suggest improvements. Don't run anything that changes data.
```

```text
Supabase · In my test project create the table [NAME] with [COLUMNS] and [N] fictional rows. Show me the SQL and wait for my approval. Don't touch other tables.
```

```text
Vercel · Find the latest deployment of [PROJECT] in team [TEAM]; if it failed, check logs and errors and explain the cause. Query only.
```

```text
Vercel · I want a preview of [PROJECT]. Tell me the options (Git, Vercel CLI or Vercel MCP) and what each one requires. Don't deploy until I choose.
```

## Exercise: a mini resources app

New folder, **test** projects and **fictional** data. 1) Connect all four and run each test. 2) Use Context7 to pick a framework and version. 3) In Supabase create `recursos` (`titulo`, `enlace`, `etiqueta`) with 5 sample rows; review the SQL first. 4) Ask for a page that reads the table with keys in environment variables (without pasting them in the chat). 5) Test it with DevTools and fix the console errors. 6) Use Vercel to decide how to deploy a preview (check its documentation; pending verification here). 7) Review and **clean up**: delete the test projects and `claude mcp remove <name>`.

This doesn't prove the code is secure or production-ready.

## Checklist

- [ ] I know where to run each command (terminal / inside the agent).
- [ ] Each server shows up in `list` and in `/mcp`.
- [ ] Keys kept out of files and the repository.
- [ ] Supabase: test project, `project_ref` and `read_only=true`.
- [ ] Vercel: access only to the team I need.
- [ ] Manual approval on; I reviewed the code before publishing.

**Official documentation:** [Context7](https://github.com/upstash/context7) · [Chrome DevTools MCP](https://github.com/ChromeDevTools/chrome-devtools-mcp) · [Supabase MCP](https://supabase.com/docs/guides/ai-tools/mcp) · [Vercel MCP](https://vercel.com/docs/agent-resources/vercel-mcp) · [Claude Code MCP](https://code.claude.com/docs/en/mcp) · [Codex MCP](https://developers.openai.com/codex/mcp) (redirects to an OpenAI page on `learn.chatgpt.com`).
