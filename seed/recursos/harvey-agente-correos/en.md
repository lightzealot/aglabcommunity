---
title: "HARVEY: set up your agent and review the first emails"
summary: Set up Harvey for your business with manual approval and review three drafts before sending: PDF guide, Brief and four prompts. Downloads with your account.
---
A guide to set up **Harvey**, the open-source sales agent by ethanplusai, for your business, and to review your first email drafts **before any of them goes out**. It includes an editable `Brief-HARVEY.md`, four prompts to copy and a three-draft checklist. Below you download the PDF (in Spanish), the editable guide, the brief and the prompts.

**What was checked and what wasn't:** the guide was written by reading the official repository ([ethanplusai/harvey](https://github.com/ethanplusai/harvey)) on **October 28, 2026**: version **0.3.0**, commit **4237f07**. **Harvey wasn't installed, no command was run, no account was connected and no message was sent.** The Windows-specific steps aren't in the README and are marked as unverified. It isn't the Harvey of legal assistants: it's the open-source sales project.

**What it doesn't promise:** replies, meetings, sales or that the emails reach the inbox. The repository's screenshots are demos with fictional data. It has external costs (mailbox, warm-up, verifier) and uses the limits of your Claude subscription.

## What the guide includes

1. **What Harvey does** and which results it doesn't guarantee.
2. **Requirements and costs:** Python 3.11+, Claude Pro or Max, a mailbox on a dedicated domain, an email verifier.
3. **Claude Code vs. the Claude chat.**
4. **Which commands only query and which can trigger sends**, with manual approval always on (`channels.email.require_approval: true`).
5. **Download the repository and open it in Claude Code**, with steps for Windows, macOS and Linux.
6. **Product, target client and location**, with a fictional example of booking systems for small businesses.
7. **Set up email** with the official flow and check the warm-up.
8. **Sources and signals** to find companies, starting with the free ones.
9. **Drafts:** review, edit, reject and approve one by one.
10. **Pause sends and review replies** in the dashboard.

## The four prompts

1. **Diagnosis and installation:** read-only; nothing is installed without your "yes".
2. **Business setup:** moves your brief into the configuration without making up data.
3. **Review of three drafts:** recipient, evidence, offer, personalization and tone.
4. **Follow-up evaluation:** real counts, without making up response rates.

All of them forbid starting Harvey, connecting accounts, opening your `.env` or approving emails for you.

**Official sources:** [Repository](https://github.com/ethanplusai/harvey) · [README](https://github.com/ethanplusai/harvey/blob/main/README.md) · [CLAUDE.md](https://github.com/ethanplusai/harvey/blob/main/CLAUDE.md) · [pyproject.toml](https://github.com/ethanplusai/harvey/blob/main/pyproject.toml) · [harvey.yaml](https://github.com/ethanplusai/harvey/blob/main/harvey.yaml) · [Claude Code](https://code.claude.com/docs/en/setup).
