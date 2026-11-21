---
title: "AI Job Search: the free framework that turns Claude Code into your job-hunting assistant"
summary: How to install AI Job Search and use /setup, /scrape, /apply and /interview to apply with a tailored CV and cover letter reviewed by a second agent. Full guide to read here; files download with your free account.
---
AI Job Search is a **free, open-source** framework that turns Claude Code into your job-hunting assistant: it builds your profile from your résumé, looks for openings, ranks them by how well you fit, writes a tailored CV and cover letter, has them reviewed by a second agent that acts as a recruiter and prepares you for the interview. Here's how to install and use it step by step.

**Before you start:** the framework is free (MIT license), but **Claude Code has no free plan**. You need a Claude Pro, Max or Team subscription, or Anthropic API credits. It's an independent project: it isn't from Anthropic or affiliated with it.

## What it is and why it works

A geophysicist created it when his position was eliminated in late 2025. He used it every week in his own search and, as he says in the README, made **69 tailored applications, got 20 first interviews and signed a contract**. He started as an AI engineer in June 2026.

| Fact | Value (as of Nov 19, 2026) |
|---|---|
| GitHub stars | 72.6k |
| Forks | 23.3k |
| License | MIT |
| Current version | v2.0.0 |
| Where it runs | On your computer, with your files |

=> [Open the repository on GitHub](https://github.com/ai-job-search-dev/ai-job-search)

## Step 0. What you need

- **Claude Code:** the command-line tool, with a Pro, Max or Team plan, or API credits.
- **Python 3.10 or higher:** for the tools in the `tools/` folder.
- **LaTeX** with `lualatex` and `xelatex` (TeX Live, MacTeX, TinyTeX or MiKTeX): it's what compiles your CV and letter to PDF.
- **Bun:** only if you'll use community job portals.
- **pypdf (optional):** `pip install pypdf`, to check your CV reads well in ATS systems.

## Step 1. Make your private copy

Your profile will store personal data (name, contact, history, salary expectations). That's why **don't make a fork**: forks of public repos are always public. Make a private copy:

```
gh repo clone ai-job-search-dev/ai-job-search
cd ai-job-search
git remote rename origin upstream
gh repo create ai-job-search --private --source=. --remote=origin --push
```

If you don't use GitHub's `gh` tool, download the code as a `.zip` and work in that folder without uploading it to any public repo.

## Step 2. Build your profile with /setup

Open Claude Code inside the folder and run the command:

```
claude
/setup
```

You have three paths and the command detects which one works for you:

- **`documents/` folder:** put your PDF CV, your LinkedIn export, diplomas, reference letters or old applications there. You can run it again when you add more.
- **Paste your CV** directly into the chat.
- **Interview:** it asks you questions and builds the profile from your answers.

**Key tip:** the more detail you give, the better the applications turn out. Don't just list job titles: tell it about projects, tools, achievements with numbers and what you liked or wore you out about each job.

## Step 3. Find openings with /scrape and /rank

```
/scrape
```

It searches job portals for openings that fit your profile, removes duplicates and presents them ranked by fit. If you didn't install any portal, it searches with Claude's web search.

- If many come up, use `/rank` to score them all and keep a short list.
- For your country, look for your portal in the [community-portals](https://github.com/ai-job-search-dev/community-portals) repo or create one with `/add-portal`. **Read the code** of any portal before using it: it runs on your machine with your data.
- To change what you search for (roles, cities, skills) without redoing everything: `/setup --section search`.

## Step 4. Apply with /apply

Give it the link to the posting, or paste the description if the portal blocks access:

```
/apply https://link-to-the-posting
```

Here's what it does, in order:

1. Reads the posting and runs it through a **safety filter** (hidden text, invisible characters, hidden instructions).
2. **Evaluates the fit** with your profile: skills, experience, culture, location and career direction.
3. Writes a **tailored CV and cover letter** in LaTeX.
4. Launches a **second reviewer agent** that researches the company and critiques the drafts, as a recruiter would.
5. **Fixes** things according to that critique.
6. Compiles the PDFs and checks them: the CV at **exactly 2 pages** and the letter at **1 page**.
7. Checks that the CV reads well in an **ATS system** and measures which of the posting's keywords it covers.

Everything in the CV is checked against your real profile: **it doesn't make up skills or experience**.

## Step 5. Prepare for the interview with /interview

```
/interview
```

It builds a prep package for the interview stage you're at and runs a **mock interview**. Bring it your real examples in STAR format so the answers sound like you.

## More useful commands

| Command | What it does |
|---|---|
| `/outcome` | Records results, archives what you sent and drafts follow-ups |
| `/gmail-sync` | Suggests updating the status of your applications from Gmail |
| `/notion-sync` | Publishes a read-only view of your search in Notion |
| `/html-report` | Generates an offline dashboard with your applications |
| `/upskill` | Detects your skill gaps and builds a learning plan |
| `/add-template` | Uses your own CV or letter template |
| `/reset` | Deletes your profile or your documents (asks you to type RESET to confirm) |

## The prompt to start off on the right foot

When you finish `/setup`, ask Claude Code this to refine your profile before applying:

```
Review my whole profile and tell me: 1) which experiences I described without measurable achievements, 2) which skills I mention without context for where I used them and 3) three types of role that fit my history and that I may not be considering. Ask me questions to fill in whatever's missing, one by one.
```

## Before sending your first application

- **Review everything before sending:** the agent can make mistakes. Read the CV and the letter as if someone else had written them.
- **Job postings as untrusted text:** the framework doesn't follow instructions hidden in postings, but on portals you don't know, look at what it downloaded before sending.
- **Your data stays on your machine:** keep your copy private.
- **Be transparent if asked:** the author said in every interview that he used this system and, according to him, that opened technical conversations instead of counting against him.

**Want me to help adapt it to your search? Message me TRABAJO at @andresgomez.ia.**
