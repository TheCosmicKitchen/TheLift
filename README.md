# TheLift

A daily training page: a lifting session and a cardio workout for every day, plus your own workouts with checkmarks.

**Live site:** https://thecosmickitchen.github.io/TheLift/

## Features

- **Lifting splits:** Push / Pull / Legs, Upper / Lower, Full body, Bro split, Arnold split, Strength 5×5, Bodyweight, or no lifting. Each day's session is generated from a pool of exercises, with sets, reps, rest, RPE and a form tip for every movement.
- **Cardio types:** Running, Rowing, Cycling, Swimming, Walking / Hiking, Ski erg / Elliptical, Mixed, or no cardio. Sessions follow a weekly rhythm (Zone 2, intervals, tempo, sprints, long steady, recovery), with heart-rate zones, a time-by-intensity chart and cues for each sport.
- **Change any day:** switch one day to a different session (Pull instead of Push, Sprints instead of Tempo), or press Swap for a fresh version of the same session.
- **Checkmarks:** tick off each exercise or interval and watch the progress bar fill.
- **Your own workouts:** build workouts under Lifting, Cardio, HIIT, Mobility, Core or Other, save them to a library, and add them to any day. Customize turns a suggested session into an editable copy.
- **Backup:** workouts and checkmarks are saved in your browser. Export a backup file to move them to another device, then import it there.

## How it's built

One `index.html` file, with no build step and no dependencies apart from Google Fonts. Open it locally or host it anywhere static.

## Publish on GitHub Pages

This repo is already published from `main` / root. To host your own copy:

1. Fork or copy the repo.
2. Open **Settings → Pages**.
3. Set Source to **Deploy from a branch**, branch `main`, folder `/ (root)`.
4. The site appears at `https://<your-username>.github.io/<repo-name>/` within a minute or two.
