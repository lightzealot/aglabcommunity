---
title: Your car doesn't have YouTube? YouDash puts it on your CarPlay
summary: What YouDash is, the free, open-source project that puts the real YouTube app on the CarPlay screen, with a keyboard and no ads. Explained for beginners: what you need to install it and how to start. Full guide to read here; files download with your free account.
---
Does your car have CarPlay and you can't watch YouTube on that screen? **YouDash** is a free, open-source project (GPL-3.0 license) that puts **the real YouTube app** on the CarPlay screen: it adapts to the screen size, comes with a keyboard to search and blocks ads. It came out on November 14, 2026 and by November 21 it already had 365 stars on GitHub.

=> [See YouDash on GitHub](https://github.com/sa4hnd/YouDash)

> **Use it only with the car parked.** Follow your country's laws and your vehicle's restrictions.

## What it does, explained simply

| What you see | What it means |
|---|---|
| The real YouTube app | It isn't a stretched mirror of your phone: it's the same app, adapted to the car screen |
| Videos laid out | The home page shows the videos in columns that fit your screen |
| Video + list | The video on the left and your list or recommendations on the right |
| On-screen keyboard | You search for videos from the car screen, without touching your phone |
| No ads | It uses YouMod, which blocks ads (it may stop working if YouTube changes something) |

## Can I install it myself?

I'll be clear: **today it isn't one click**. It's an experimental project meant for people who already sign iPhone apps, or who have a developer to help. Here's what you need:

| You need | In simple words |
|---|---|
| A Mac with Xcode | Xcode is Apple's free program to build iPhone apps. It only works on Mac. You also need Python 3.9 or higher. |
| A compatible iPhone | The intended range is iOS 26.4 to 27.2 (experimental). It was tested on an iPhone with iOS 27.0.1. |
| The YouTube app with YouMod | A "decrypted" copy of YouTube 21.42.4 with YouMod 2.0.0 that you have the right to modify. The App Store one doesn't work, and the project doesn't include it. |
| The CarPlay video entitlement | Apple has to authorize your developer account to show video in CarPlay (`com.apple.developer.carplay-video`). Installing the app with a "sideload" tool doesn't give you that permission. |
| Your own signing | An app identifier, a certificate and an Apple profile in your name, with your iPhone registered. |

**If you're not a developer:** give the project a star to follow it and ask someone who already publishes iPhone apps for help. With the prompt below, Claude Code explains each requirement and tells you if something's missing before you start.

## Quick glossary

- **IPA:** the install file of an iPhone app (like an .exe on Windows).
- **Decrypted:** App Store apps come encrypted; to modify them you need an unencrypted copy.
- **Signing an app:** putting your Apple "seal" on it so the iPhone accepts it.
- **Entitlement:** an authorization Apple gives your account so the app can do something special, like show video in the car.
- **Dylib:** the module YouDash adds to the YouTube app so it works in CarPlay.

## The easiest way to start: let Claude Code guide you

If you have a Mac, open Claude Code and paste this to it. It checks what you have and what you're missing, and explains each step without skipping anything:

```
I want to install YouDash (https://github.com/sa4hnd/YouDash) to watch YouTube on CarPlay. I'm a beginner.
1. Check whether my Mac has Xcode, the iPhone SDK and Python 3.9 or higher, and tell me how to install whatever is missing.
2. Explain in simple words what the "decrypted" app with YouMod is and the CarPlay video entitlement the README asks for, and tell me whether I can get it with my Apple account.
3. If I have everything, guide me step by step with the docs/BUILD.md guide in the repo. One thing at a time and wait for my reply.
```

## The steps (for those who already have everything)

First the CarPlay module is built:

```
git clone https://github.com/sa4hnd/YouDash.git
cd YouDash
python3 -m venv .venv
source .venv/bin/activate
python3 -m pip install -r requirements-build.txt
python3 scripts/build_carplay.py --compile-only
```

That creates `build/YouTubeCarPlay.dylib`. Then it's packaged with your own app and your signing, and installed on your registered iPhone:

```
python3 scripts/build_carplay.py \
  --ipa /path/to/your/YouMod.ipa \
  --profile /path/to/your.mobileprovision \
  --bundle-id com.yourname.youtubecar \
  --device YOUR_IPHONE_ID
```

Change the paths, the identifier and your iPhone's ID to your own. The full guide (with troubleshooting) is at [docs/BUILD.md](https://github.com/sa4hnd/YouDash/blob/main/docs/BUILD.md).

## How it works inside

1. **Connects the app to the car screen:** the app starts normally on the iPhone and then moves its interface to the CarPlay window.
2. **Adapts the layout:** scales the interface, arranges the video columns and puts the video and the list side by side.
3. **Adds the keyboard:** an on-screen keyboard that types into YouTube's search box.
4. **Uses the YouTube player and YouMod:** the video plays with YouTube's engine and YouMod removes the ads.
5. **Goes back to the phone when disconnected:** when you take the iPhone out of the car, the app returns to the phone screen.

## Keep in mind

- It's **experimental**: it depends on your iPhone, your car, the app version and your signing.
- Ads are blocked with YouMod, but a YouTube update can change that.
- It's an independent project: it isn't an official Google or Apple app. YouTube and Apple CarPlay are trademarks of their owners.
- Credits: CarPlay integration by [Sehind Hemzani](https://github.com/sa4hnd), built on [YouMod](https://github.com/Tonwalter888/YouMod).

**Would you use it in your car? Tell me at @andresgomez.ia.**
