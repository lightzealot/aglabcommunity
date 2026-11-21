---
title: "AG Finance: control your personal finances with Claude, Gmail and Google Sheets"
summary: A prompt that builds your expense Sheet from Gmail and a dashboard with due dates, fixed charges and a privacy eye. Prompt and PDF guide with your account.
---
A single prompt you give Claude and it builds **AG Finance** for you: a Google Sheet with your expenses read from Gmail, a dashboard that answers three questions (where does every peso go? which bills are due and when? how much do I pay fixed each month?) and an eye icon to hide the amounts. Below you download the ready-to-paste prompt and a PDF guide (in Spanish).

**Before you start:** it works with Claude Code, or with Claude plus the **Gmail, Google Sheets and Google Calendar** connectors (n8n is optional, only to read attached PDFs and ZIPs). It's an assistant that prepares and organizes: whatever it can't find in an email it leaves as "To confirm", it doesn't make it up. It isn't financial, accounting or tax advice.

## What it does, in order

| Step | What happens |
|---|---|
| **0. Interview** | It asks your country and currency, banks and cards, from what date to record and which connectors you have |
| **1. Google Sheet** | Creates "AG Finance" with the tabs Movements, Subscriptions, Due dates and Installments |
| **2. Emails and statements** | Records expenses, removes duplicates and classifies with rules you can edit |
| **3. Attachments (optional)** | With n8n it reads PDFs and ZIPs from email; without n8n, you attach them in the chat |
| **4. Dashboard** | Key figures, upcoming charges, spending by category and week, and tables of fixed charges, bills and installments |
| **5. Wrap-up** | Link to the dashboard and the Sheet, pending items grouped and, if you want, reminders in Calendar |

## The 7 rules inside

1. **It doesn't make up data:** anything doubtful stays "To confirm" with its source.
2. **It respectfully disagrees:** if your number contradicts a document, it shows you the difference.
3. **It asks in a batch**, with options, and keeps working while you answer.
4. **It tells you which tool it will use** before using it.
5. **It verifies before saying "done":** rereads the Sheet, recalculates totals and opens the dashboard.
6. **Privacy first:** only the emails you authorize, no saving PDF passwords and no publishing real numbers in a public place.
7. **Short answers**, in plain English, answer first.

## How to use it

1. Download `ag-finance-prompt.md`, copy all the content and paste it into Claude Code (or Claude with the connectors on).
2. Answer the initial interview. For password-protected PDFs: you give it only to read, it isn't saved.
3. Review what's "To confirm" and the transfers "To classify": grouped, one question per account.
4. Adjust the **Rules** tab whenever you like: text it contains, merchant, category and type.

## Look after your data

- The dashboard shows your real figures: **don't share it publicly**. Whoever opens it needs access to the Sheet.
- Credit card payments don't count as spending, so you don't count what was charged twice.
- If a connector doesn't work inside the published page, Claude tells you and suggests an alternative.

**Want us to adapt it to your case? Message me FINANZAS at @andresgomez.ia.**

=> [Instagram: @andresgomez.ia](https://www.instagram.com/andresgomez.ia/)
