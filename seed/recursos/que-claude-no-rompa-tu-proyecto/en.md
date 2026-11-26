---
title: Did Claude break your app? 6 layers so Claude Code never breaks your project
summary: Claude Code checkpoints and /rewind, Git before every big change, separate test and production, permissions that block destructive commands, backups that really work and the safety rules for your CLAUDE.md. Plus what to do if it already broke. Full guide to read here; the PDF downloads with your free account.
---
Did you ask Claude for a change and your app went down? It happens more than you think: a deploy it shouldn't have done, a deleted file or a backup folder that was actually empty. Here are the 6 layers so Claude Code **never breaks your project**, and what to do if it already happened.

**Facts as of November 26, 2026**, from the official Claude Code docs ([checkpointing](https://code.claude.com/docs/en/checkpointing)).

## 1. Claude Code checkpoints (your undo button)

Claude Code **automatically saves the state of your code before each message** you send. If something goes wrong, you go back.

| What | How it works |
|---|---|
| When it saves | Before each of your messages that starts a turn |
| How many | The 100 most recent in the session |
| How long they last | About 30 days after the session last saved one |
| How to go back | With **`/rewind`**: restore code and conversation, only the conversation or only the code |

**Careful, it doesn't replace Git:**
- it only saves what Claude edited with its file tools,
- it doesn't save changes made with terminal commands or outside the session,
- it usually doesn't capture what subagents edit,
- and it doesn't undo what happened outside: a deploy, a sent email or a deleted database.

## 2. Git: a commit before every big change

```
Before touching any file, make a commit with the current state and create a new branch for this change. When you finish, show me the diff and don't merge without asking me.
```

## 3. Test and production, apart

- Keep a **test** environment with a clear name (not "test-final-v2").
- Tell Claude to **never deploy to production** without your confirmation.
- If something works in test, you ship it.

## 4. Permissions: make it ask before anything dangerous

- In **default mode**, Claude Code asks permission before editing files or running commands. Use it on real projects.
- Use **plan mode** so it proposes first and executes later.
- Block destructive commands in `.claude/settings.json`:

```
{
  "permissions": {
    "deny": ["Bash(rm -rf:*)", "Bash(git push --force:*)", "Bash(npm run deploy:*)"]
  }
}
```

Swap `npm run deploy` for the command you deploy your project with.

## 5. Backups that actually work

A backup you never tested isn't a backup.

| Check | How often |
|---|---|
| That the backup folder **has files** and some size | Every week |
| That you can **restore** a copy in a test environment | Every month |
| That your database has automatic backups at your provider | Once, and when you change plans |

## 6. The rules in your CLAUDE.md

Paste this into your project's `CLAUDE.md` file so Claude reads it every session:

```
## Safety rules
- Never deploy to production without asking me.
- Before a big change, make a commit and work on a new branch.
- Never delete files, folders or databases without my confirmation.
- If you're about to run a command that can't be undone, explain what it does and wait for my yes.
- If something fails, stop and tell me before trying to fix it.
```

## If it already broke

1. **Stop asking for changes**: every new message adds changes on top.
2. Type **`/rewind`** and go back to the checkpoint before the problem.
3. If the change left the session (deploy, database), go back to the last Git commit or restore your backup.
4. Ask Claude to explain what happened, **without touching anything**:

```
Explain step by step what you changed in the last hour and what could have broken the app. Don't modify any file: just diagnose.
```
