---
title: Give your agent a computer with CUA
summary: How to install CUA, connect Claude Code, Codex or another agent to a desktop and run a first verifiable test. PDF guide and checklist with your account.
---
How to connect your coding agent (Claude Code, Codex, Cursor and others) to a desktop it can see and control, with **CUA**. Checked against the official documentation on **October 26, 2026**; **nothing was installed or run**, so the commands match the documentation but aren't claimed to be tested. Below you can download the PDF (in Spanish), the editable guide and a checklist.

**Two routes:** **CUA Spaces** connects your agent to a desktop (you start with your own machine and can add a separate environment later). **CUA Driver** operates the apps on the machine where it's installed, in the background. For your first test, Spaces is enough.

## Requirements

| | Requirement |
|---|---|
| **macOS** | macOS 26 or later |
| **Windows** | Windows 11 (preview); Home works and doesn't need Hyper-V |
| **Linux** | Ubuntu 24.04 |
| **Agent** | A compatible one: Claude Code, Codex, Cursor… |
| **Account** | Not needed to use it on your machine; the free one works to log in from other machines |

An extra space on Linux needs a container engine (Docker); on macOS, a Mac with Apple silicon and about 50 GB free. Prices don't appear in the getting-started guide, so I'm not including them.

## Install

Download the installer from cua.ai/download or use the terminal:

```bash
curl -fsSL https://cua.ai/install.sh | sh
```

```powershell
irm https://cua.ai/install.ps1 | iex
```

The first is for macOS and Linux; the second, for Windows. **They download and run an installer: review it first if you prefer.** Then open CUA Spaces, choose your agent (**Connect**), grant the two permissions the system asks for and restart the agent.

## Check the connection

```bash
cua agents detect
cua agents status
```

If your agent is missing: **Settings → AI agents → Configure**, or `cua agents setup --agents claude,codex --yes`. By hand: `claude mcp add cua -- cua daemon mcp` or `codex mcp add cua -- cua daemon mcp`. The configuration is **per machine**.

## First test

```text
List the available computers or Spaces. Tell me which one you'll connect to before acting. On that desktop, open the calculator, calculate 6 × 7 and visually check that it shows 42. When you finish, tell me what you verified.
```

If it doesn't see tools, restart the agent and check `cua agents status`. If it sees the desktop but doesn't act, check the system permissions. If it picks another desktop, stop the task.

## Security and the Driver alternative

- The agent acts with **your permissions**: test first with tasks that have no sensitive data.
- Driver's default mode allows sending input to **all** apps, and an empty allowlist **grants everything**.
- To undo: `cua agents remove --dry-run` and then `cua agents remove`.
- **Hermes:** `hermes tools enable computer_use --platform cli`, without adding a second MCP server. **OpenClaw:** `cua-driver mcp-config --client openclaw`, run what it prints and restart.

**Pending verification:** the exact permissions path on macOS, whether Pi needs the CLI and the prices. **Documentation:** [Quickstart](https://cua.ai/docs/spaces/quickstart) · [Connect your agent](https://cua.ai/docs/spaces/guides/connect-your-agent) · [CLI and MCP](https://cua.ai/docs/cua-cli/guides/mcp-server) · [Driver](https://cua.ai/docs/cua-driver/guides/connect-your-agent).
