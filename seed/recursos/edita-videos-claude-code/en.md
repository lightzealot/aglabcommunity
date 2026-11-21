---
title: "Edit videos with Claude Code: guide, prompts and style template"
summary: Organize your project, turn references into concrete rules and prepare your first edit with 3 prompts and a STYLE.md template. Downloads with your account.
---
A guide to organize your video project, turn references into concrete rules and prepare your first edit with **Claude Code**. It includes 3 prompts to copy, a `STYLE.md` template with a filled-in example and a phone review checklist. Below you download the PDF (in Spanish), the editable guide, the template and the prompts.

**What was checked and what wasn't:** the requirements, plans and install commands come from the official documentation, checked on **October 26, 2026**. **No tool was installed or run and the prompts weren't tested on a machine**: the result depends on your system and your video. It doesn't promise a perfect automatic edit, and the workflow **isn't free**: Claude Code requires a paid Claude plan (Pro, Max, Team or Enterprise) or a Console account with credits.

## Your working folder

```text
AI Video Editor/
  Raw footage/
  References/
  Exports/
  STYLE.md
```

**Raw footage:** your original videos, untouched. **References:** references and extracted frames. **Exports:** transcripts, tests and versions (v1, v2…). **STYLE.md:** your style guide. Start with a test of **10 to 15 seconds**.

## The six sections

1. **Prepare your project:** requirements, Claude Code vs. the Claude chat and the folder structure.
2. **Prompt 1, prepare the environment:** checks your machine, looks up the official requirements and proposes only what's needed, asking for your approval before installing.
3. **Prompt 2, references to style guide:** analyzes 3 to 5 references (pacing, captions, colors, visual aids, music) and turns them into rules with a value, an example and an exception.
4. **`STYLE.md` template:** ready to fill in, with an example of an educational AI Reel for small businesses. The values are examples, not universal rules.
5. **Prompt 3, first edit:** transcribes, proposes cuts, presents a storyboard, generates a 10 to 15 second test and exports the full one only when you approve.
6. **Review and problems:** fixes for generic results, badly placed captions, cuts that remove words and desync, plus the phone review checklist.

## Tools the guide mentions

| Tool | What for | Conditions (according to its documentation) |
|---|---|---|
| **FFmpeg** | Cut, convert and extract frames | Only offers source code; binaries are third-party |
| **whisper.cpp** | Transcribe with timestamps | MIT license; reads 16-bit WAV |
| **yt-dlp** | Download a reference clip | Respect the site's terms and rights |
| **Remotion** | Video with React code | Free for individuals, non-profits and companies up to 3 employees; others need a company license |
| **HyperFrames** | HTML to video for agents | Apache 2.0; Node.js 22+ and FFmpeg |

You don't need to install them all: Prompt 1 helps you choose the minimum.

**Documentation:** [Claude Code](https://code.claude.com/docs/en/setup) · [Remotion](https://github.com/remotion-dev/remotion) · [HyperFrames](https://hyperframes.heygen.com/introduction) · [FFmpeg](https://ffmpeg.org/download.html) · [whisper.cpp](https://github.com/ggml-org/whisper.cpp) · [yt-dlp](https://github.com/yt-dlp/yt-dlp).
