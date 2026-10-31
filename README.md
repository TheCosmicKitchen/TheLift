# TheLift

A daily training page: a lifting session and a cardio workout for every day, plus your own workouts with checkmarks.

**Live site:** https://thecosmickitchen.github.io/TheLift/

## Features

- **Lifting splits:** Push / Pull / Legs, Upper / Lower, Full body, Bro split, Arnold split, Strength 5×5, Bodyweight, or no lifting. Each day's session is generated from a pool of exercises, with sets, reps, rest, RPE and a form tip for every movement.
- **Cardio types:** Running, Rowing, Cycling, Swimming, Walking / Hiking, Ski erg / Elliptical, Mixed, or no cardio. Sessions follow a weekly rhythm (Zone 2, intervals, tempo, sprints, long steady, recovery), with heart-rate zones, a time-by-intensity chart and cues for each sport.
- **Change any day:** switch one day to a different session (Pull instead of Push, Sprints instead of Tempo), or press Swap for a fresh version of the same session.
- **Checkmarks:** tick off each exercise or interval and watch the progress bar fill.
- **Your own workouts:** build workouts under Lifting, Cardio, HIIT, Mobility, Core or Other, save them to a library, and add them to any day. Customize turns a suggested session into an editable copy.
- **Plan builder:** pick exercises from a searchable list of 280, add your own, and set sets, reps, weight, rest, RPE and notes. Group supersets, reorder, duplicate, copy a day to another day, start from a split template, repeat a plan for up to 12 weeks, preview it, and undo mistakes. Open it at https://thecosmickitchen.github.io/TheLift/#build.
- **Program starters:** load a simplified version of a proven program, such as Couch to 5K, 5/3/1, PHUL or a sweet spot cycling base, then edit it and share it. Programs live in `presets.js`.
- **Share links:** copy a link in one click and send a full plan or a single saved workout. Whoever opens the link sees a preview and chooses when to add it. No accounts, and the plan travels inside the link.
- **Logging:** press Log on any exercise to record weight and reps set by set, with last time shown.
- **Following plans:** open a plan link and press Follow. Everyone following the same link logs their own results in their own file. A newer link for the same plan updates it, and logs stay.
- **Share page:** poster-style cards for your plan, followed plans and saved workouts, plus a season card you can copy as text. Each person keeps their own copy.
- **Seasons and PRs:** the Progress page shows sessions, volume, personal records and history, for all time or one season.
- **Save file:** where the browser supports it, TheLift auto-saves to a file you choose, so clearing browser data can't erase your logs. Open that file to restore everything. Other browsers use Export backup.

## How it's built

`index.html`, `app.js` and `presets.js`, with no build step and no dependencies apart from Google Fonts. Host them anywhere static. Serve them over http(s), because the page only runs scripts from its own site.

## Compact links

The plan is stored inside the link, so there is no shortener or database. Links use a small binary format: known exercises and common values such as `3` or `90 s` become positions in fixed lists, and only custom text is spelled out. A six-day plan with 36 exercises comes to about 450 characters.

`CATALOG` and `TOKENS` in `app.js` are append-only. Add new entries at the end, and never reorder or remove any, or existing links will change meaning.

## Share link safety

Share links are treated as untrusted input:

- **No code runs from a link.** Link contents are shown only as plain text, and a Content Security Policy blocks inline and injected scripts.
- **Nothing is saved without a click.** A link opens a preview first, and it can only add new entries. It cannot change or delete existing workouts.
- **No data leaves the page.** The site makes no data requests, and the part of the link holding the plan is never sent to a server. Save files stay wherever you put them.
- **Size limits apply.** Oversized or malformed links are rejected, and every field has a length limit. Backup imports and save files are cleaned the same way.

Three limits to keep in mind: sender names are not verified, anyone with a link can read that plan, and a link cannot be cancelled once sent. Keep private details out of plan names and notes.

## Publish on GitHub Pages

This repo is already published from `main` / root. To host your own copy:

1. Fork or copy the repo.
2. Open **Settings → Pages**.
3. Set Source to **Deploy from a branch**, branch `main`, folder `/ (root)`.
4. The site appears at `https://<your-username>.github.io/<repo-name>/` within a minute or two.
