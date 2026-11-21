---
title: "Paying for 300 Mbps and getting 90? The prompt for Claude to check your wifi and the 3 router settings"
summary: The exact prompt to ask Claude to check your wifi and how to check the channel, WMM and the 5 GHz band yourself. Full guide to read here; files download with your free account.
---
Paying for 300 Mbps and getting 90? Many times it isn't the internet company: it's **how your router is set up**. In the reel, that's exactly what happened to someone and they solved it by telling Claude the problem, which found three settings: **the channel, WMM and the 5 GHz band**. Here's the exact prompt and how to check each setting yourself.

**Before you start:** measure your speed by cable and over wifi. If by cable you don't get what you pay for either, the problem is the company's and no router setting will fix it.

## The prompt to ask Claude

Copy it into Claude (or Claude Code, which can run the commands for you) and change what's in brackets:

```
My wifi is slow: I pay for [X] Mbps and get [Y]. I'm on [Windows / Mac]. Help me find the cause step by step: 1) tell me which command to run to see the channel, the band (2.4 or 5 GHz) and the signal strength, and explain the result; 2) tell me how to get into my router's settings and what to check: channel, WMM and bands; 3) before changing anything, tell me what value it has now so I can go back. One thing at a time and wait for my reply.
```

## Step 1. Measure your signal

| System | How to see it |
|---|---|
| Windows | Open the terminal and type `netsh wlan show interfaces`: you'll see the channel, band, radio type and signal in % |
| Mac | Hold **Option** and click the wifi icon: you'll see the channel, band and signal (RSSI) |

Write down the values: that way you can compare before and after.

## Step 2. Get into your router

- The address is usually `192.168.0.1` or `192.168.1.1`.
- On Windows you see it with `ipconfig` under "Default Gateway". On Mac, in Settings > Network > Wi-Fi > Details > TCP/IP > Router.
- The user and password are usually on the router's label. If the router is from your company and won't let you in, ask them for access.
- **Before touching anything**, take a photo of each screen so you can go back.

## Setting 1. The channel

Wifi travels on channels, like radios. If your neighbor uses the same channel with a stronger signal, they step on each other. On 2.4 GHz the channels that don't overlap are **1, 6 and 11**: pick the one that's freest. If your router leaves it on "auto" and it's still slow, try setting it by hand.

## Setting 2. WMM

WMM (Wi-Fi Multimedia) orders traffic: first what can't wait, like calls and video. Also, fast wifi standards (802.11n and ac) need it: **if it's off, speed can get stuck at 54 Mbps**. Look for it in the advanced wireless settings and leave it **on**.

## Setting 3. The 5 GHz band

Almost all current routers have two bands:

| Band | Advantage | Disadvantage |
|---|---|---|
| 2.4 GHz | Reaches farther and goes through walls | Slower and more crowded |
| 5 GHz | Much faster and with more free channels | Shorter range |

If your computer is near the router, connect it to the 5 GHz network. If both bands have the same name, the router chooses on its own; you can separate them with different names to pick yourself.

## For anything that's been going wrong for months

The printer, the phone that won't charge, the endless spreadsheet, the email that doesn't arrive: the method is the same. Tell it the problem in detail and let it ask you questions.

```
For [how long] now [what's failing] in my [home / work]. I already tried [what you did]. Ask me the questions you need to understand the problem, one by one, and then give me the steps to fix it, from easiest to hardest. Before each change, tell me how to undo it.
```

**Want me to help with your case? Message me WIFI at @andresgomez.ia.**
