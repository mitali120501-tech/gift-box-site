# Gift Box

A single-page digital gift box: letters you can handwrite and seal, a bouquet
pulled live from Wikipedia, a mixtape sourced from Wikimedia Commons /
Openverse / the Internet Archive, real microphone voice notes, a photo album,
and a pixel-art sticker maker. "Build & share" saves a snapshot and hands you
a link anyone can open.

## Deploy on Netlify (recommended — makes sharing actually work)

1. **Push this folder to a new GitHub repo.**
   ```bash
   git init
   git add .
   git commit -m "gift box"
   gh repo create my-gift-box --public --source=. --push
   ```
   (No `gh` CLI? Create an empty repo on github.com, then `git remote add origin <url>` and `git push -u origin main`.)

2. **Import it on Netlify.**
   - Go to app.netlify.com → "Add new site" → "Import an existing project" → pick the repo.
   - Build command: leave blank. Publish directory: `.` (already set in `netlify.toml`).
   - Deploy. Netlify will run `npm install` automatically, which pulls in `@netlify/blobs` for the function.

3. **Enable Blobs** — no setup needed; Netlify Blobs works automatically once the site is deployed (it's tied to your site, no extra service to provision).

4. Open your new `https://<your-site>.netlify.app` URL. "Build & share this box" will now give out real links that work for anyone.

## Running locally

```bash
npm install -g netlify-cli
npm install
netlify dev
```
This serves `index.html` and runs the function at `/.netlify/functions/box` locally.

## Notes

- If you skip the function entirely (e.g. just drag-and-drop `index.html` onto any static host), the app still works fully — letters, bouquet, mixtape, voice notes, album, stickers, doodles — except "build & share" falls back to a downloadable `.json` file you can send someone directly, and "My Boxes" won't have anything to list.
- Everything else (flowers, tracks, mic recording, photo uploads) runs entirely in the visitor's browser — nothing is uploaded to any server except the box snapshot itself, which only exists as an opaque key-value blob.
