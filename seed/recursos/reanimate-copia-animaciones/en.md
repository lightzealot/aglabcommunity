---
title: Reanimate: copy any animation with Claude Code
summary: What Reanimate is, the free MIT-licensed Claude Code skill that records an animation, rebuilds it in your code and compares it frame by frame until it moves the same. How to install it, the prompts to use it and its limits. Full guide to read here; the PDF and the prompt download with your free account.
---
See an amazing animation on another site and have no idea how they made it? **Reanimate** is a free, open-source (MIT) skill for Claude Code that records the animation, rebuilds it in your code and compares it with the original frame by frame until it moves the same. Here's what it does, how to install it and the prompts to use it.

**Before you start:** it works on Mac and Linux; Windows is still untested. Copy animations to study them or as a starting point: another site's fonts, images and code still belong to their owners.

## What it is and why it matters

| Fact | Value (as of Nov 23, 2026) |
|---|---|
| GitHub stars | 2.4k |
| Forks | 209 |
| License | MIT |
| Published | October 29, 2026 |
| API keys | Not needed |

=> [See the repository on GitHub](https://github.com/NiazMorshed2007/reanimate)

## What you can give it

- The **link** to a live site.
- A **screen recording**.
- An **MP4** or a **GIF**.
- A **Lottie** file.

## How it works (5 steps)

1. **Records:** films the original animation in a browser, frame by frame.
2. **Breaks it into details:** builds a table with each element: when it starts, how long it lasts, from where to where and with which easing.
3. **Rebuilds it** with what your project already uses: CSS, Framer Motion, GSAP or three.js.
4. **Compares:** films its copy the same way and measures timing, easing and pixels.
5. **Repeats:** fixes the biggest difference and films again, usually 2 to 5 rounds. Whatever it can't match is listed in its report.

**The proof:** the author cloned Vercel's toolbar and **417 of 417 frames** came out identical. On the resend.com cube only 0.11% of pixels differ.

## Step 1. Install it

You need [Bun](https://bun.sh) 1.1 or later. In the terminal:

```
npx skills add NiazMorshed2007/reanimate -g
```

It asks which agents to set up; add `-a claude-code` to skip the question. The first run downloads about 250 MB (ffmpeg and Playwright's Chromium).

## Step 2. Ask for the animation

In Claude Code say **what** you want, **where** it is and **where** it should go:

```
/reanimate the hero entrance on https://example.com, into components/Hero.tsx
```

```
/reanimate this loader, 0:03 to 0:05 of ~/Downloads/loader.mov
```

```
/reanimate the card hover in this gif, match it exactly
```

```
/reanimate the logo marquee from https://example.com, with our logos and pause on hover
```

## Step 3. Choose how close it should be

| If you say | What it matches |
|---|---|
| "clone this animation" (default) | Moves the same: order, timing (±80 ms), easing family and distance |
| "match it exactly" or "pixel-perfect" | Looks the same: also fonts, sizes, colors and spacing (≤ 2% pixel mismatch) |
| "clone X and add Y" | The copy plus your additions, kept separate |

## Prompt so Claude guides you the first time

```
I want to use the reanimate skill (https://github.com/NiazMorshed2007/reanimate). I'm a beginner.
1. Check whether I have Bun 1.1 or later and whether my system is Mac or Linux.
2. Install it with npx skills add NiazMorshed2007/reanimate -g -a claude-code.
3. Clone this animation: [paste the link or video path] and put it in [file in your project].
4. At the end explain in simple words which rounds it ran and what is still different.
```

## Limits

- Pages behind a login, YouTube and Loom can't be recorded directly: give it a screen recording.
- Physics springs are approximated by measuring how they bounce.
- It's not an official tool from Anthropic or from the sites it clones.
