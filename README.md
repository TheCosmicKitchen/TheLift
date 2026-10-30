# Daily Training Card

A one-page training site: a suggested lifting session and cardio workout for every day, plus your own workouts (Lifting, Cardio, HIIT, Mobility, Core, Other) with checkmarks.

Everything is a single `index.html`, with no build step. Your workouts and checkmarks are saved in your browser's localStorage. Use **Export backup** and **Import backup** to move them between devices.

## Publish on GitHub Pages

1. Create a new repository on GitHub and push this folder to it (with `index.html` at the root).
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, set Source to **Deploy from a branch**, then choose branch `main` and folder `/ (root)`.
4. After a minute the site is live at `https://<your-username>.github.io/<repo-name>/`.
