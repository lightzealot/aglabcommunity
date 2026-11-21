---
title: Spending hours editing every video? MoneyPrinterTurbo makes them on its own
summary: How to install and set up MoneyPrinterTurbo, the free, open-source tool that turns a single topic into the script, clips, voice, captions and music, and even publishes the video. Full guide to read here; files download with your free account.
---
Spending hours editing every video? **MoneyPrinterTurbo** is a free, open-source tool (MIT license) that, from **a single topic**, writes the script, finds the clips, generates the voice, syncs the captions, adds music and hands you the finished video. It has over 140,000 stars on GitHub (144,845 on November 21, 2026).

=> [See MoneyPrinterTurbo on GitHub](https://github.com/harry0703/MoneyPrinterTurbo)

## What it does

| Step | What the tool does |
|---|---|
| Script | An AI model writes it from your topic |
| Clips | Finds stock videos on Pexels or Pixabay (free), or uses yours |
| Voice | Free Edge TTS (no key), or ElevenLabs, Azure, Gemini and others |
| Captions | Syncs them with the voice |
| Music | In the background, random or one you upload |
| Format | Vertical 9:16, horizontal 16:9 or square 1:1 |
| Publish | Straight to TikTok, Instagram and YouTube Shorts, with title and hashtags |

For the script it works with ChatGPT, Claude, Gemini, DeepSeek, Kimi, Qwen, Ollama (local) and many more.

## The easiest way: have your agent install it

If you use **Claude Code** (or another agent that can use the terminal), paste this to it. The agent installs and sets up MoneyPrinterTurbo, generates the video and tells you where it ended up. It will only ask you for the keys that are missing. It works on Mac and Windows.

```
Use this Skill: https://raw.githubusercontent.com/harry0703/MoneyPrinterTurbo/main/docs/skill/SKILL.md
Create a video on the topic "How AI is changing daily life", in English and in vertical format.
```

## Install it on Windows (one-click package)

1. Go to the [latest release on GitHub](https://github.com/harry0703/MoneyPrinterTurbo/releases/latest) and download the **.7z** file from the **Assets** section (not "Source code").
2. Unzip it into a folder with no spaces or accents in the path.
3. Double-click `update.bat` to bring in the latest version.
4. Double-click `start.bat`: the interface opens in your browser (if it comes up blank, use Chrome or Edge).

## Install it with Python (Mac, Linux or Windows)

You need Python 3.11 or higher.

```
python3 -m venv .venv
source .venv/bin/activate
python -m pip install mpt
mpt webui
```

On Windows PowerShell, activate the environment with `.venv\Scripts\Activate.ps1`. The official package is called **mpt** (the one called "MoneyPrinterTurbo" on PyPI is from a third party).

## Set it up the first time

1. In the interface, open the **basic settings**.
2. Choose the model for the script and paste its key. If you want something free, Ollama runs on your computer.
3. For clips, create a free key at [Pexels](https://www.pexels.com/api/) or [Pixabay](https://pixabay.com/api/docs/).
4. For the voice, Edge TTS works with no key.
5. Type the topic, choose format and voice, and press **Generate video**.

## What your computer needs

| | Minimum | Recommended |
|---|---|---|
| Processor | 4 cores | 6 to 8 cores |
| Memory | 4 GB | 8 GB |
| Graphics card | Not needed | 4 GB or more to go faster |

## Keep in mind

- The tool is free, but **the script model may cost money** if you use a paid one (ChatGPT, Claude, Gemini). There are free options, like Ollama locally.
- Stock clips are generic: for your brand, upload your own videos and images.
- Review each video before publishing; automatic publishing needs you to connect your accounts.
- It's a third-party project and changes often: if a step doesn't match, check the README.

**What topic would you give it first? Tell me at @andresgomez.ia.**
