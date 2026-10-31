# TheLift

A daily training page: a lifting session and a cardio workout for every day, plus your own workouts with checkmarks.

**Live site:** https://thecosmickitchen.github.io/TheLift/

## Features

- **Lifting splits:** Push / Pull / Legs, Upper / Lower, Full body, Bro split, Arnold split, Strength 5×5, Bodyweight, or no lifting. Each day's session is generated from a pool of exercises, with sets, reps, rest, RPE and a form tip for every movement.
- **Cardio types:** Running, Rowing, Cycling, Swimming, Walking / Hiking, Ski erg / Elliptical, Mixed, or no cardio. Sessions follow a weekly rhythm (Zone 2, intervals, tempo, sprints, long steady, recovery), with heart-rate zones, a time-by-intensity chart and cues for each sport.
- **Change any day:** switch one day to a different session (Pull instead of Push, Sprints instead of Tempo), or press Swap for a fresh version of the same session.
- **Checkmarks:** tick off each exercise or interval and watch the progress bar fill.
- **Your own workouts:** build workouts under Lifting, Cardio, HIIT, Mobility, Core or Other, save them to a library, and add them to any day. Customize turns a suggested session into an editable copy.
- **Build page:** pick days and exercises from a searchable list, set sets, reps and notes, then copy a share link in one click. Open it at https://thecosmickitchen.github.io/TheLift/#build.
- **Share links:** send a full week or a single saved workout. Whoever opens the link sees a preview and chooses when to add it. No accounts, and the plan travels inside the link.
- **Backup:** workouts and checkmarks are saved in your browser. Export a backup file to move them to another device, then import it there.

## How it's built

`index.html` and `app.js`, with no build step and no dependencies apart from Google Fonts. Host them anywhere static. Serve them over http(s), because the page only runs scripts from its own site.

## Share link safety

Share links are treated as untrusted input:

- **No code runs from a link.** Link contents are shown only as plain text, and a Content Security Policy blocks inline and injected scripts.
- **Nothing is saved without a click.** A link opens a preview first, and it can only add new entries. It cannot change or delete existing workouts.
- **No data leaves the page.** The site makes no data requests, and the part of the link holding the plan is never sent to a server.
- **Size limits apply.** Oversized or malformed links are rejected, and every field has a length limit. Backup imports are cleaned the same way.

Three limits to keep in mind: sender names are not verified, anyone with a link can read that plan, and a link cannot be cancelled once sent. Keep private details out of plan names and notes.

## Publish on GitHub Pages

This repo is already published from `main` / root. To host your own copy:

1. Fork or copy the repo.
2. Open **Settings → Pages**.
3. Set Source to **Deploy from a branch**, branch `main`, folder `/ (root)`.
4. The site appears at `https://<your-username>.github.io/<repo-name>/` within a minute or two.
