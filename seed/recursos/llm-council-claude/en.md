---
title: "Does Claude agree with everything you say? LLM Council: 5 advisors and a verdict"
summary: How to install and use LLM Council, the free skill that runs your decision past 5 AI advisors who review each other and give you a verdict with a clear next step. Full guide to read here; files download with your free account.
---
Does Claude agree with everything you say? Ask it whether your idea is great and it builds a flawless argument. Ask it why it's terrible and it builds another just as convincing. **LLM Council** changes that: it's a free skill, created by Ole Lehmann and based on Andrej Karpathy's LLM Council method, that runs your question past **five advisors with different viewpoints**, makes them review each other without knowing who wrote what and ends with **a verdict and a single clear step**.

=> [See the skill on GitHub](https://github.com/aiwithremy/claude-skills-llm-council)

**Works in:** Claude Code and Claude Cowork (claude.ai). It has over 3,000 stars on GitHub (3,192 on November 21, 2026).

## How to install it (no terminal)

**Option 1. Have Claude install it for you.** Open a new chat in Claude and paste this:

```
Install this Claude skill for me. The SKILL.md file is in this GitHub repository: https://github.com/aiwithremy/claude-skills-llm-council

Get it ready so I can use it and guide me through whatever you need from me.
```

**Option 2. Download the file and ask it to set it up.**

1. Go to the repository and open the `SKILL.md` file.
2. Download it with the download button on the right.
3. Open Claude and paste this:

```
I just downloaded a file called SKILL.md for the LLM Council skill. Can you help me install it? Tell me where I need to put it.
```

## How to use it

The skill responds to phrases in English. In any conversation type one of these, followed by your question:

| Phrase | What for |
|---|---|
| `council this` | Run your question through the council |
| `run the council on [your question]` | The same, with the question on the same line |
| `pressure-test this` / `stress-test this` | Put an idea or a plan to the test |
| `war room this` | Urgent decisions with a lot at stake |

You can write your question in Spanish: the advisors answer about whatever you ask them.

## The five advisors

| Advisor | What it does |
|---|---|
| **1. The contrarian** | Looks for what will kill your idea. Assumes there's a fatal flaw and hunts it down. |
| **2. The first-principles thinker** | Ignores your question and asks what you're really trying to solve. Sometimes tells you you're asking the wrong thing. |
| **3. The expansionist** | Looks for the potential you don't see: what happens if it turns out even better than expected. |
| **4. The outsider** | Gets none of your context. Sees the obvious that you've stopped noticing. |
| **5. The executor** | Only cares what you'll do on Monday morning. If there's no clear first step, it tells you. |

They're chosen to clash: the contrarian against the expansionist (risk against potential), first principles against the executor (rethink everything against do it now) and the outsider in the middle, seeing what a newcomer sees.

## What happens inside

1. **It frames your question.** It checks your context files (for example `CLAUDE.md` or a `memory/` folder) and rewrites the question neutrally, with what's at stake.
2. **It convenes the council.** It launches the five advisors at once as subagents; each answers in 150 to 300 words from its angle, without softening.
3. **Anonymous review.** It shuffles the answers as A, B, C, D and E. Five reviewers say which is the strongest, which has the biggest blind spot and what all of them missed.
4. **The chairman.** Pulls everything into a verdict with five parts: where they agree, where they clash, the blind spots that came up in the review, the recommendation and **the first thing you need to do**.

## Questions worth asking

- "Do I launch a $97 workshop or a $497 course?"
- "Which of these three approaches for my brand is the strongest?"
- "I'm thinking of going from X to Y. Am I crazy?"
- "This is my offer page. What's weak?"
- "Do I hire an assistant or automate first?"

And the ones that aren't: questions with a single answer ("what's the capital of France?"), creating tasks ("write me a post") or processing ones ("summarize this article"). The council is for when there's real doubt and being wrong is expensive.

## Template for your first consultation

```
council this: [your decision in one sentence].

Context: [what you do, what stage you're at, numbers that matter].
Options I'm considering: [A], [B].
What's at stake: [what happens if I'm wrong].
What I've already tried: [if it applies].
```

## Keep in mind

- Each consultation launches about eleven subagents (five advisors, five reviewers and the chairman), so it **uses more than a normal question**. Save it for decisions that matter.
- If you already know the answer and just want to be agreed with, the council will probably tell you what you don't want to hear. That's the idea.
- It's a third-party project: the repository may change. Review the `SKILL.md` before installing it.

**What decision would you put to the council? Tell me at @andresgomez.ia.**
