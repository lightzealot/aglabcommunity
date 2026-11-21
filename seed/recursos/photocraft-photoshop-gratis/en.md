---
title: "PhotoCraft: the free, open-source Photoshop that Claude can operate"
summary: What PhotoCraft is, how to download it for Windows, Mac or Linux, open your PSDs and connect it to Claude via MCP. Full guide to read here; files download with your free account.
---
PhotoCraft is a **free, open-source** photo editor that rewrites Photoshop from scratch. It opens your PSDs, needs no account or subscription and ships with an MCP server so Claude can operate it for you. Here are the direct links, how to install it and how to connect it to Claude.

**Before you start:** it's a very new project (the repository was created on September 30, 2026). Use it first with copies of your files and compare it with your real workflow before dropping Adobe. It isn't from Adobe or affiliated with it: it's an independent project.

## What it is and why it matters

| Fact | Value (as of Nov 19, 2026) |
|---|---|
| GitHub stars | 80.4k |
| Forks | 14.2k |
| License | MIT or Apache-2.0 |
| Current version | v0.23.1 |
| Works without an account or connection | Yes |

## Step 1. Download it for free

The easiest way is the official installer. If you want a specific format, they're all on GitHub.

=> [Download from the official page](https://getartcraft.com/apps/photocraft)

- **Windows:** `.msi` installer (x64, ARM or 32-bit) or portable `.zip`.
- **Mac:** universal `.dmg` app (Apple Silicon and Intel), signed.
- **Linux:** AppImage, `.deb`, `.rpm`, Flatpak or tarball.
- **Web:** it also runs in the browser (WebAssembly).

All versions: [github.com/storytold/photocraft/releases/latest](https://github.com/storytold/photocraft/releases/latest). The code: [github.com/storytold/photocraft](https://github.com/storytold/photocraft).

## Step 2. Open and save your PSDs

You open the half-finished PSD you have and it keeps layers, masks, editable text, layer styles and adjustment layers. Then you save it again as a PSD.

- **27 Photoshop blend modes** and 69 tools, with the same shortcuts.
- **Public test:** when opening and saving again, 307 of the 309 files in the psd-tools test set look the same.
- **Note:** the saved file isn't byte-for-byte identical. It looks the same, but PhotoCraft rewrites some internal parts.
- It also opens PSB, layered TIFF, GIMP, Krita and Affinity files (the latter read-only).

## Step 3. Its sister apps

PhotoCraft is part of the Crafting Apps by the ArtCraft team: all free, open source and written from scratch.

- **LightCraft:** Lightroom-style, photo library and RAW development. [github.com/storytold/lightcraft](https://github.com/storytold/lightcraft)
- **FilmCraft:** Premiere-style, video, color and sound editing. [github.com/storytold/filmcraft](https://github.com/storytold/filmcraft)
- **And more:** VectorCraft, PdfCraft, EffectCraft, DesignCraft and others at [getartcraft.com](https://getartcraft.com).

## Step 4. Connect it to Claude via MCP

Every button and every PhotoCraft tool is a command, so Claude can use them just like you. There are two paths.

### Path A. No terminal (ArtCraft Launcher)

1. Open the ArtCraft Launcher: Settings, AI agents, and turn on **Let AI agents use Craft apps**.
2. Press **Add** next to Claude Desktop or Claude Code and restart Claude.
3. According to its documentation, this feature sits behind an experimental switch called AI-MCP. If you don't see the option, check `docs/mcp.md` in the repository.

### Path B. Claude Code with the command-line tool

Register the MCP (change the folder to yours):

```
claude mcp add photocraft -- photocraft-cli mcp --automation-read-root /path/to/your/photos --automation-write-root /path/to/your/photos
```

- `photocraft-cli` comes in a separate `.zip` for Mac. On Linux, the AppImage includes it with `--cli`. It can also be installed from source with cargo.
- The two folders limit where Claude can read and save. Use a test folder.

### Ask it like this

Once it's connected, try something concrete in a test folder:

```
Open photo.psd from my test folder, crop it to 4:5, raise the contrast a little with a Curves layer and export it as a PNG named photo-final.png. Tell me each step you took.
```

## Limits before dropping Adobe

- **It's very new:** it's under two months old and has thousands of open issues. Expect bugs.
- **Work with copies** of your PSDs until you trust the result.
- **Claude can make mistakes:** check what it exports before sending it to a client.
- **Don't cancel yet:** try it for a week or two alongside your real work.

**Want us to adapt it to your case? Message me ADOBE at @andresgomez.ia.**
