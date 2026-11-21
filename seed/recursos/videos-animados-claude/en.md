---
title: How to make animated videos with Claude
summary: From an idea to an MP4 with the video-pizarra skill: install, storyboard, animation, sound and render. No editing subscriptions; model usage may have a cost.
---
The **video-pizarra** skill turns an idea into an animated vertical MP4 with Claude Code. The video isn't "generated": it's **programmed**. Each scene is code that draws and animates graphics; a headless browser captures the frames and ffmpeg joins them. The render runs on your machine; model usage may have a cost.

Repository: https://github.com/santmun/video-pizarra · The download includes the full guide.

## What you need

| What | What for | Check |
|---|---|---|
| Node.js 18+ | engine and render | `node -v` |
| Python 3 with `numpy` and `Pillow` | sound and contact sheets | `python3 -c "import numpy, PIL"` |
| ffmpeg | builds the MP4 | `ffmpeg -version` |
| Playwright Chromium | captures the frames | `npx playwright install chromium` |

On a Mac, whatever is missing: `brew install node python ffmpeg` and `python3 -m pip install --user numpy Pillow`.

## Install the skill

```bash
git clone https://github.com/santmun/video-pizarra ~/.claude/skills/video-pizarra
```

Restart Claude Code and ask: "make me an animated video about X".

## 7-step workflow

1. **Interview.** Define the **one** idea, the format (9:16 or 16:9), the length (60–75 s explains best), the tone, your brand and the CTA.
2. **Check the facts.** Only what appears in a source goes on screen.
3. **Storyboard.** One table per scene (background, text, action, transition). It gets approved before touching code.
4. **Set up the project:**

```bash
PROJ=~/Documents/my-video
mkdir -p "$PROJ/audio" && cp -R ~/.claude/skills/video-pizarra/template/. "$PROJ/"
cd "$PROJ" && npm install && npx playwright install chromium
cp scenes.example.js scenes.js
```

5. **Visual review (required):**

```bash
node render.mjs --every 1.2 && python3 contact.py 10
```

Open `contact.jpg` and look for cut-off text, empty scenes or things out of frame.

6. **Music and beats (optional):** `python3 -m venv .venv && .venv/bin/pip install librosa`, then `.venv/bin/python beats.py audio/music.mp3`.
7. **Final render:** `./build.sh my-video` outputs `my-video.mp4` (master) and `my-video-movil.mp4` (light). It takes about 3–5 min per minute of video.

## Two engines

- **`template/`**: chalkboard and hand drawing; for explaining and telling news.
- **`template-estilos/`**: watercolor, notebook or minimal; cleaner and more editorial. Look at `catalogo-estilos/` before choosing.

## A structure that works (8–10 scenes)

Hook → reveal → problem → twist → proof (one per scene) → payoff → CTA. **One idea per scene** and about 12 words max on screen. The first line appears at 0.2 s: no intros or logos.

## Mistakes already made

- **It feels like a slideshow:** use a continuous character and a camera that follows it.
- **Overloaded scenes:** 1 big text + 1 element + the character.
- **Made-up numbers or third-party names on screen:** use only sourced data and say "a client".
- **"100% code" with AI images:** if you say it, don't add generated images.
- **Everything comes out black:** use `immediateRender: false`.
- **150–200 MB file:** that's normal; share the `-movil` copy.

Technical rule: the render seeks every instant, it doesn't play. Everything must be a function of time: no `setTimeout` or random numbers.

## Summary in 5 lines

```bash
git clone https://github.com/santmun/video-pizarra ~/.claude/skills/video-pizarra   # once
mkdir -p ~/Documents/my-video/audio && cp -R ~/.claude/skills/video-pizarra/template/. ~/Documents/my-video/
cd ~/Documents/my-video && npm install && npx playwright install chromium
cp scenes.example.js scenes.js   # write your video here
node render.mjs --every 1.2 && python3 contact.py 10 && ./build.sh my-video
```

[Original document](https://docs.google.com/document/d/1ePjdt_CNMhL4pkUszWEeBpn-sU4dolYRlV9tehYy_jA/edit) · Skill: [santmun/video-pizarra](https://github.com/santmun/video-pizarra) · Resource shared by @andresgomez.ia.
