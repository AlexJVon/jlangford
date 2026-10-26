# Jennifer Langford, AIA, CNU, PA — website redesign

A rebuild of [jlangford.com](https://www.jlangford.com) (originally made in Adobe Muse) as a plain
HTML/CSS/JS site that can be hosted free on GitHub Pages while it's being reviewed.

**What changed from the old site**

- **Full-width, responsive layout.** The old site was a fixed ~440px column in the middle of the screen.
  This one fills the screen on desktop and works on phones and tablets.
- **New photo viewer.** Clicking a project opens a full-screen gallery with large photos,
  arrows / keyboard / swipe navigation, a thumbnail strip, and the project description beside it.
  Each project has its own link (e.g. `portfolio.html#project=powell-building`).
- **Filterable portfolio.** All 42 projects on one page, filterable by type.

## Pages

| File | Page |
| --- | --- |
| `index.html` | Home |
| `portfolio.html` | Portfolio + gallery viewer |
| `philosophy.html` | Philosophy |
| `credentials.html` | Credentials |
| `contact.html` | Contact + map |

## Editing projects and photos

Everything in the portfolio comes from **`js/projects.js`**. Each project looks like:

```js
{
  name: "Powell Building", category: "mixed-use", featured: true,
  location: "Haile Village Center, Gainesville, FL",
  cover: "front%20facade.jpg",            // optional — card photo (defaults to first image)
  description: "…",
  details: [["Year Built", "2006"], ["Builder", "Joyner Construction"]],
  links: [["Project website", "https://…"]],
  images: ["front%20facade.jpg", "powell%201.jpg", { src: "plan.png", caption: "First floor" }]
}
```

- **Remove a photo:** delete it from `images`.
- **Add a photo:** put the file in `images/projects/` and add its name to `images`.
  (Use `%20` for spaces in file names, or just avoid spaces.)
- **Feature on the home page:** add `featured: true`.

## Images

Photos are loaded from `images/projects/`. Any photo not there yet automatically falls back to the
copy on the old site, so the preview works before everything is copied over.

To copy all current photos into the repo:

```powershell
powershell -ExecutionPolicy Bypass -File tools\download-images.ps1
```

**Image quality:** the old site only stores photos at about 480×360 px. They'll look soft on a
modern full-width screen. If the original photos (or the `.muse` project file) are still around,
swapping in larger versions (~2000 px wide) will make a big difference.

## Previewing locally

```powershell
python -m http.server 8080
```

Then open http://localhost:8080.

## Publishing on GitHub Pages

1. Create a new repository on GitHub (e.g. `jlangford-website`).
2. Push this folder to it.
3. In the repo: **Settings → Pages → Build and deployment → Deploy from a branch → `main` / root**.
4. The site will be live at `https://<your-username>.github.io/jlangford-website/`.

When she's ready to go live on `jlangford.com`, add a `CNAME` file containing `www.jlangford.com`
and point the domain's DNS at GitHub Pages. GitHub Pages hosting is free, so only the domain renewal costs anything.
