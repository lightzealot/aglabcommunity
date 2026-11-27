---
title: "Not sure what to sell with AI? 6 free repos you can actually charge for"
summary: "Six MIT-licensed GitHub projects: who to offer each one to, how to sell it, what to check before charging, and two examples with fine print. Read the full guide here; the PDF (in Spanish) downloads with your free account."
---
Want to sell something AI-powered to a business but don't know what to offer? Here are **6 free GitHub projects under the MIT license**, who to offer each one to, how to sell it and what to check before charging.

**Before you start:** the code is free, but running it may cost money (AI models, API keys, servers). Star counts are from November 26, 2026 and change daily. This is a practical guide, not legal advice.

## What the MIT license lets you do

- **You may** use the code, modify it, include it in your service and sell it, closed-source projects included.
- **You must** keep the copyright notice and the license text in the copies or substantial portions you deliver.
- **It comes with no warranty:** the author is not liable if it fails. Put in writing what you cover for your client.
- The code license **does not by itself cover** AI models, cloud services, trademarks or the content you process.

## The 6 repos at a glance

| Repo | Stars | For whom | What you sell |
|---|---|---|---|
| AutoClip | 17,096 | Podcasters and coaches | Short clips from each episode |
| faster-whisper | 27,048 | Academies and creators | Reviewed transcripts and subtitles |
| Browser Use | 122,172 | Small businesses with repetitive web tasks | Custom automation |
| Docling | 71,122 | Accountants and lawyers | PDFs and scans turned into data |
| OpenHands | 94,431 | Businesses that need an internal tool | Custom software |
| Hermes Agent | 266,447 | Businesses that can't keep up with messages | An assistant, set up and maintained |

## 1. AutoClip

Give it a long video and it produces short clips.

=> [AutoClip on GitHub](https://github.com/zhouxiaoka/autoclip)

- **How to install it:** desktop app in the Releases section, for Windows 10/11 x64 or Apple Silicon Macs. On Linux or Intel Macs it runs with Docker.
- **Before charging:** cutting runs on your machine, but the analysis uses your own API key or a local model (Ollama or LM Studio). Only use videos your client has the right to use.

## 2. faster-whisper

Transcribes on your own computer and timestamps every word.

=> [faster-whisper on GitHub](https://github.com/SYSTRAN/faster-whisper)

```
pip install faster-whisper
```

- **Before charging:** it is a Python library, not an app: you build the workflow. Check names and figures by hand before delivering.

## 3. Browser Use

An AI agent that uses the web like a person: orders, invoices, forms.

=> [Browser Use on GitHub](https://github.com/browser-use/browser-use)

```
pip install 'browser-use==1.0.9'
```

- **Requirement:** Python 3.11 or later.
- **Before charging:** the AI model and the cloud browser are billed separately. Respect the terms of every site you automate and keep a person reviewing. Anonymous telemetry is turned off with `ANONYMIZED_TELEMETRY=false`.

## 4. Docling

Turns PDFs and scans into structured data.

=> [Docling on GitHub](https://github.com/docling-project/docling)

```
pip install docling
```

- **Requirement:** Python 3.10 or later.
- **Before charging:** each model it uses has its own license. If there is personal data, agree in writing how it is stored and deleted.

## 5. OpenHands

A coding agent: use it to build custom software faster, and test it yourself before delivering.

=> [OpenHands on GitHub](https://github.com/OpenHands/OpenHands)

```
npm install -g @openhands/agent-canvas
```

- **Requirements:** to run it isolated in containers, the README asks for Node.js 24 or later, `uv` and a running Docker. There are other install options: check them in the README.
- **Before charging:** you need a model (paid or local). The agent can run commands: use it in an isolated environment and review the code.

## 6. Hermes Agent

An assistant that connects to Telegram, WhatsApp, Slack and other channels.

=> [Hermes Agent on GitHub](https://github.com/NousResearch/hermes-agent)

- **How to install it:** follow the official installer in the README.
- **Before charging:** to answer around the clock it needs an always-on computer or server, plus a model. Define when a conversation goes to a human and check each channel's rules.

## How to sell them

Don't sell the repo: anyone can download it. **Sell the solved problem.**

| Model | What you deliver |
|---|---|
| Per delivery | A concrete result: the clips from one episode, or a folder of documents turned into a table |
| Setup | You leave it working on the client's machine, train them and hand over a page with the steps |
| Monthly fee | Maintenance and support, with model and cloud costs separate and in writing |

Before charging, run a small test with the client's real material. Don't promise results you haven't measured.

## The fine print: two that are not like the others

- **RedInk** ([HisMax/RedInk](https://github.com/HisMax/RedInk)): CC BY-NC-SA 4.0 license, **non-commercial use**. To charge, you need to request the separate commercial license from the author.
- **PersonaLive** ([GVCLab/PersonaLive](https://github.com/GVCLab/PersonaLive)): its LICENSE file says Apache-2.0, but the README says the project is **for academic research only**. Don't charge with it without the authors' written permission.

Lesson: read the LICENSE file **and also** the README.

## Prompt to check any repo before charging

Paste it into Claude and replace what is in brackets. It does not replace a lawyer.

```
Review this repository before I use it to charge a client: [REPO LINK].
What I want to sell: [service and type of client].

1. Read the LICENSE file and the whole README. Quote any sentence about commercial use, research or restrictions.
2. Check the licenses of the important models and dependencies.
3. Tell me which services or API keys cost money.
4. Tell me which notices I must keep when I deliver it.
5. Point out risks with personal data, content rights and the terms of the websites it uses.
6. End with: YES, YES WITH CONDITIONS or NO. If something can't be verified, say so.
```
