---
title: Can your AI-built app get you sued? 35 legal checks to ask Claude before launch
summary: The 35 legal and technical points to review before launching an app you built with AI (privacy, terms, cookies, payments, marketing, accessibility, licenses and user data), grouped in 7 blocks, plus a ready-to-paste prompt so Claude Code audits your app. Full guide to read here; files download with your free account.
---
Did you build your app with AI and you're about to launch? Working is not the same as ready. An app with no privacy policy, cookies that load without consent or a subscription that's impossible to cancel can cost you fines, complaints or a store takedown. Here are the **35 points** to ask Claude for before you publish, grouped in 7 blocks, plus a prompt so Claude Code reviews your app for you.

**Before you start:** this is not legal advice. Rules change by country (GDPR in Europe, CCPA in California, LGPD in Brazil). Use this checklist to arrive prepared, and have a lawyer review your app before launch.

## How to use this checklist with Claude Code

1. Open Claude Code inside your app's folder.
2. Paste the prompt at the end (it's also in `prompt.md`).
3. Claude returns a table with every point: ✅ done, ⚠️ partial or ❌ missing, where it saw it and what it proposes.
4. Approve fixes one by one. Nothing changes without your OK.

## Block 1. Privacy and terms

| # | Point | What to ask Claude |
|---|---|---|
| 1 | Privacy policy | Create it and link it in the footer and sign-up: what data, why and who it's shared with |
| 2 | Terms and conditions | Publish them and link them where users sign up |
| 3 | Retention | Define and write down how long you keep each type of data |
| 4 | Unchecked box | The box to accept the terms starts empty |
| 5 | Acceptance log | Store who accepted, which version of the terms and when |

## Block 2. Cookies, tracking and vendors

| # | Point | What to ask Claude |
|---|---|---|
| 6 | Cookie banner | "Reject all" as visible as "Accept all" |
| 7 | Block trackers | Analytics and ad scripts don't load until the user accepts |
| 8 | Audit SDKs | List every analytics, ads and error SDK and what data it sends |
| 9 | Data agreements | Remind you to sign a data processing agreement (DPA) with each vendor |
| 10 | Vendor list | Publish which vendors process data and in which country |

## Block 3. Payments and subscriptions

| # | Point | What to ask Claude |
|---|---|---|
| 11 | Refunds | Publish the refund policy before payment |
| 12 | Easy cancel | Cancelling takes the same steps as subscribing |
| 13 | Auto-renewal | Email a notice before charging the renewal |
| 14 | No hidden fees | The final price is visible from the start |

## Block 4. Honesty and marketing

| # | Point | What to ask Claude |
|---|---|---|
| 15 | Unsubscribe | Every marketing email has an unsubscribe link |
| 16 | Countdowns | Remove fake or resetting timers |
| 17 | Dark patterns | Remove guilt-tripping, pre-checked boxes and hidden buttons |
| 18 | Reviews | Remove any invented or paid review |
| 19 | Claims | Replace "guaranteed" and "number 1" with what the app really does |
| 20 | Marketing consent | Ask for marketing consent in a separate box |
| 21 | Certifications | Remove SOC 2, ISO or other badges you don't have |
| 22 | Uptime | Promise availability you can measure, not "100%" |

## Block 5. Accessibility and content

| # | Point | What to ask Claude |
|---|---|---|
| 23 | Contrast | Raise contrast to WCAG AA (4.5:1 for normal text) |
| 24 | Alt text | Add descriptive `alt` to every image |
| 25 | Keyboard | Everything usable with Tab, Enter and Esc, with visible focus |
| 26 | AI content | Label what the AI made (images, text, voices) |

## Block 6. Licenses and brands

| # | Point | What to ask Claude |
|---|---|---|
| 27 | Client logos | Remove logos without written permission |
| 28 | Images, fonts and code | Check the license of every asset you use |
| 29 | Open source | Include license notices and flag AGPL or GPL |
| 30 | Copyright | Add a visible email or form for claims |

## Block 7. User data

| # | Point | What to ask Claude |
|---|---|---|
| 31 | Download and delete | Users can export their data and delete their account on their own |
| 32 | Minimum data | Remove sign-up fields you don't need |
| 33 | Minors | Ask a parent or guardian before storing minors' data |
| 34 | AI training | Don't train AI on user data without explicit consent |
| 35 | Contact | Show your company name, an email and how to reach you |

## The prompt for Claude Code

Copy it all and paste it into Claude Code inside your app's folder. For the version with all 35 points written out, download `prompt.md` (in Spanish).

```
Act as the launch reviewer for my app. Review the code, screens, copy and integrations against this 35-point checklist: privacy and terms, cookies and tracking, vendors, payments and subscriptions, honesty and marketing, accessibility, AI content, licenses and user data.

For each point give me a row with:
- Status: ✅ done · ⚠️ partial · ❌ missing · ➖ not applicable
- Where you saw it: file, route or screen
- What you propose: the exact change, in one or two lines

Don't change anything yet. First give me the table sorted from ❌ to ✅. Then implement only the fixes I approve, one by one. Flag the points a lawyer should review: you don't replace one.
```

## Before you launch

> Claude helps you find what's missing, but it doesn't replace a lawyer. Bring this table to the review and save time and money.
