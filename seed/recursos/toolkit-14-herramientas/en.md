---
title: "TOOLKIT: 14 AI tools and what each one does"
summary: From saving a link to distributing a resource: what each tool does, input and output, first steps, examples, limits, a calendar template and prompts. Downloads with your account.
---
Fourteen tools, in the order of a content workflow: **capture → log → research → write → create visuals → record → distribute → handle inquiries**. Date the official sources were checked: **October 17, 2026**. Below you can download the PDF (in Spanish) with a full sheet per tool (steps, example, mistakes and limits), the Notion calendar and the prompts.

**You don't need all fourteen.** Some are alternatives (Perplexity or Grok; GPT Image 2 or Gemini; Higgsfield or HyperFrames) and **none of them connect on their own**: every step between tools is copy and paste or a connection you set up yourself. Prices change: check them on each official page.

## The 14 in order

| # | Tool | What you do with it | Input → output | Watch out |
|---|---|---|---|---|
| 1 | [Slack](https://slack.com/help/articles/360042650274-Save-messages-and-files) | Capture links and ideas | Link + note → saved message | Saving is built in; sending to another app needs setup |
| 2 | [Hermes Agent](https://hermes-agent.nousresearch.com/docs/) | An agent logs the links | Message → summary and log | Open source; needs a terminal, a model and a Slack app. Notion connection: not verified |
| 3 | [Notion](https://www.notion.com/help/intro-to-databases) | One row per idea in a calendar | Ideas or CSV → calendar | CSV import: 5 MB on free, 50 MB on paid; dates as MM/DD/YYYY |
| 4 | [Perplexity](https://www.perplexity.ai/help-center/en/articles/10352155-what-is-perplexity) | Research with sources | Question → answer with citations | Open the sources: a citation doesn't prove the number |
| 5 | [Grok](https://grok.com) | Cross-check and expand | Findings → verification | Web search documented in its [API](https://docs.x.ai/docs/guides/tools/search-tools); app features unconfirmed |
| 6 | [Claude](https://claude.com/product/overview) | Write and review | Research + style → carousel, caption, newsletter | Give it the data: otherwise it fills the gaps |
| 7 | [Claude Code](https://code.claude.com/docs/en/overview) | Build work systems | Folder + request → scripts and files | Needs a subscription or a Console account; check the permissions |
| 8 | [GPT Image 2](https://developers.openai.com/api/docs/models/gpt-image-2) | Still images | Brief → image | It's the `gpt-image-2` API model; its exact relation to ChatGPT Images isn't confirmed |
| 9 | [Higgsfield](https://higgsfield.ai) | Add motion to an image | Image + motion → clip | Account and credits; ask for one or two movements per clip |
| 10 | [Gemini](https://support.google.com/gemini/answer/14286560) | Images for infographics | Brief → image | 2K with a Google AI plan, 1K without; long text in the image fails: add it separately |
| 11 | [HyperFrames](https://github.com/heygen-com/hyperframes) | Animated graphics with code | HTML/CSS → MP4 | Node 22+ and FFmpeg; Apache 2.0. Different from HyperFrames Studio, its editor |
| 12 | [Tella](https://www.tella.com) | Record screen and face | Screen + camera → edited video | 7-day Pro trial when checked; review the captions |
| 13 | [ManyChat](https://help.manychat.com/hc/en-us/articles/14281316989724-Instagram-Post-and-Reel-Comments-trigger) | Comment keyword → direct message | Comment → message with a link | Account and connected Instagram; its help page couldn't be opened directly: confirm on your account |
| 14 | [Gmail](https://support.google.com/mail/answer/6579) | Labels and filters for inquiries | Emails → organized inbox | A forwarding filter only affects new messages |

**Names that get mixed up:** Hermes **Agent** is not the Hermes model; **HyperFrames** is not HyperFrames **Studio**; **Claude** is not **Claude Code**.

## Minimum route (3 or 4 tools)

1. **Notion:** import the calendar and add a real idea.
2. **Claude or Perplexity:** research and write with review.
3. **Gemini or GPT Image 2:** one simple image.
4. **ManyChat:** only once the resource is already hosted.

## A fictional example that runs through the workflow

You save a link about how a local business (the made-up "Sonrisa Norte Dental Clinic") automates inquiries: you note it in Slack, move it to Notion, research it, write a carousel, create the image, record a short video and deliver the guide to whoever comments **TOOLKIT**. All the data is made up.

## Delivery through ManyChat: example setup

| Field | Value |
|---|---|
| Trigger | Comment on an Instagram post or reel |
| Keyword | `TOOLKIT` |
| Message | "Hi! Here's the TOOLKIT guide: RESOURCE_URL" |
| `RESOURCE_URL` | Filled in by whoever implements it; this guide doesn't include any download |

**Tests before publishing:** comment `TOOLKIT` from another account (the right link arrives); try `toolkit` and another word; comment twice (according to the help page, only the first comment triggers); open the link on mobile and desktop. This guide doesn't claim there's an active automation or results.

## Calendar template (Notion)

Import `calendario-contenido.csv` in **Settings → Import → CSV**. Columns: Title, Status, Publish date, Format, Pillar, Source link, Keyword, Research tool, Visual brief, Text or caption, Owner, Notes. The two example rows are fictional.

## Prompts

```text
Act as a researcher. Topic: [TOPIC]. Audience: [AUDIENCE]. Link: [URL].
Deliver: 1) five findings, each with its source and exactly what it says; 2) what the sources don't confirm; 3) claims I should verify; 4) two questions from the audience.
Don't make up data or links; if you can't verify something, write "unconfirmed".
```

```text
Write from this verified research: [PASTE]. Pieces: a [N]-slide carousel, a caption of [N] words max with a CTA to comment [KEYWORD] and a [N]-word newsletter.
Plain, friendly English, short sentences, technical terms explained, no promises of results or unsourced data. At the end, score your draft with the rubric.
```

```text
Write a visual brief for [piece]. Idea: [sentence]. Format: [4:5 / 9:16 / 16:9]. Palette: [colors]. Space for text: [where]. Not allowed: long text in the image, logos, recognizable people.
Deliver: a one-paragraph description, elements by layer, the final prompt for [tool] and three checks.
```

## Five-reviewer rubric (suggested method)

Each criterion is worth 20 points; **if the total is under 95, the piece goes back for review**.

| Reviewer | 20 points if… |
|---|---|
| Accuracy | Every fact has an open, verified source |
| Clarity | One idea per slide or paragraph |
| Usefulness | The reader can carry out a concrete step |
| Voice and language | Plain, friendly and with terms explained |
| Honesty | No promises; limits, costs and requirements mentioned |

## First steps (45 min)

Import the CSV → replace the example rows with a real idea → research and open three sources → write and apply the rubric → create an image → set up ManyChat only once the guide is hosted.
