---
title: From a photo of your desk to a mini-game
summary: A practical guide to try it with Gemini 4 Argon: photo, starter prompt, five checks and improvements one at a time. Start in 2D.
---
Turn a photo of your desk into a browser racing mini-game with Gemini 4 Argon. Google published a similar demo (Argon in Antigravity, Blender MCP, Nano Banana and Three.js); this guide starts with a **simpler 2D version you can check**. It doesn't replicate the demo or promise the same result, and the prompts are suggestions to try.

## 1. Prepare the photo

- A photo of your own desk, from above or at an angle, well lit.
- 3 or 4 recognizable objects (mug, notebook, keyboard, plant) and visible table between them: that will be the track.
- Remove documents, screens or labels with information you don't want to share.

## 2. Prepare the environment

Open an empty project in Antigravity, choose Gemini 4 Argon if your account has it and attach the photo. Ask for HTML, CSS and JavaScript with Canvas 2D and no dependencies; that way you check it before adding Blender or other tools. If you don't have that model, look at the official sources at the end.

## 3. Starter prompt

```text
Use the attached photo of my desk as a reference to create a top-down racing mini-game that plays in the browser.

First identify the objects you can actually see. If something can't be made out, say so instead of making it up. Then build a stylized 2D version with Canvas, HTML, CSS and JavaScript.

Deliver: index.html, styles.css and game.js. No libraries, paid services or external assets.

Requirements:
- Roughly keep the layout of the objects.
- A closed track that goes around them without crossing them.
- A car controlled with the arrow keys or WASD.
- Collisions with objects and edges.
- Finish line, lap counter and timer; a lap only counts after passing the checkpoints.
- Restart and pause buttons; visible instructions.

Make it work first; improve the look afterwards. Test movement, collisions, laps and restart if you can, and tell me what you verified and what you didn't. Don't publish or deploy. Explain how to test it locally.
```

## 4. Check it

1. The car responds to the keys and can be paused.
2. Hitting a mug or the edge doesn't let you go through.
3. Crossing the finish line backwards several times doesn't add fake laps.
4. You can complete a lap without getting stuck.
5. Restart brings the car, laps and timer back to the start.

If something fails, describe the action and what you saw:

```text
Crossing the finish line backwards adds a lap. Fix only the validation: require the checkpoints in order and the right direction. Keep the design and controls. Run the test again and tell me the result.
```

## 5. Improve one thing at a time

```text
The plant and the mug swapped places compared to my photo. Move their positions closer to the reference and adapt the track without blocking the route. Keep the mechanics that already work.
```

```text
Propose how to take this game to Three.js. Separate what can be modeled with simple geometry from what would need Blender, images or extra connections. Present the plan and requirements first; don't install or connect anything yet.
```

**What you'll get:** a local 2D prototype with editable files. A 3D scene with physics, textures and audio like the demo needs more tools.

**Sources:** [Google's demo and tools](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-argon/) · [Desk Racer in AI Studio](https://aistudio.google.com/apps/bundled/desk-racer?fullscreenApplet=true&showAssistant=true&showPreview=true) (may ask you to sign in) · [official Gemini 4 Argon page](https://ai.google.dev/gemini-api/docs/models/gemini-4-argon)
