# Jennifer Langford, AIA, CNU, PA — website

A rebuild of [jlangford.com](https://www.jlangford.com) (originally Adobe Muse) as a plain HTML/CSS/JS site.
It needs no build step and is hosted free on GitHub Pages. It works on phones, tablets and desktops.

## Pages

| File | What it is |
| --- | --- |
| `index.html` | Home: intro, stats, featured projects, Plan Library preview, how a project works |
| `portfolio.html` | Built work: 42 projects, filterable, full-screen photo galleries |
| `plans.html` | **Plan Library**: every drawing set, searchable by type, beds, baths, stories, size, lot width and sheet type |
| `plan.html?id=…` | One plan: zoomable drawing set, plain-English summary, technical specs, built photos, printable spec sheet |
| `services.html` | What the studio offers, the six project phases, a builder's sheet list and code basis, and an FAQ |
| `glossary.html` | ~50 architecture terms in plain English. Dotted-underlined words site-wide link here |
| `philosophy.html`, `credentials.html`, `contact.html` | Philosophy, About/credentials, contact + email-composing inquiry form |
| `add-plan.html` | **Studio tool** (not in the menu): a form that writes the code for a new or updated plan |

## Where to edit things

| To change… | Edit |
| --- | --- |
| Phone, email, address, social links, menu | `js/layout.js` (top of file) |
| Plans and drawings | Use `add-plan.html`, or edit `js/plans.js` (see **HOW-TO-ADD-PLANS.md**) |
| Portfolio projects and photos | `js/projects.js` |
| Glossary definitions | `js/glossary.js` |
| Colors and fonts | `css/style.css` (`:root` at the top) |

Drawings for new plans go in `plans/<plan-id>/`. Portfolio photos go in `images/projects/`.

## Images

Any photo missing from `images/projects/` falls back to the copy on the old site. To copy them all into the repo, run:

```powershell
powershell -ExecutionPolicy Bypass -File tools\download-images.ps1
```

The old site stores images at only about 480×360 px. Original photos and drawing scans (2000 px or more) will look far better.

## Content to confirm with Jennifer before launch

Some copy was written to fill out the site and should be checked:

- Home headline, service blurbs, "How a project works" steps
- **Services page:** service descriptions, the six phases and their deliverables, the sheet list, "Code & design basis",
  "Working with builders" (CAD files, multi-build licensing), and every FAQ answer
- Plan licensing terms (build once per license, modifications offered)
- The "not for construction" note on plan pages
- Plan summaries for the Augusta (Laney Walker/Bethlehem) houses. Most plans have **no square footage or bedroom counts
  yet**, because the old site didn't list them. Add them with `add-plan.html` → "edit an existing plan"

## Preview locally

```powershell
python -m http.server 8080
```

## Preview versions (one per branch)

Every branch is published automatically by `.github/workflows/pages.yml`:

| Branch | Address |
| --- | --- |
| `main` (latest) | `https://alexjvon.github.io/jlangford/` |
| any other branch, e.g. `v3-darker` | `https://alexjvon.github.io/jlangford/v/v3-darker/` |

Each page has a **Version** button in the bottom-left corner for switching between versions on the same page.
To add a version without replacing anything, create a new branch and push it:

```powershell
git checkout -b v3-darker
git push -u origin v3-darker
```

Deleting a branch on GitHub removes that version. Pages setting: **Settings → Pages → Branch: `gh-pages` / `(root)`**.

## Publish on GitHub Pages

1. Create a repository on GitHub and push this folder to it.
2. **Settings → Pages → Deploy from a branch → `main` / root.**
3. To go live on `jlangford.com`, add a `CNAME` file containing `www.jlangford.com` and point the domain's DNS at GitHub Pages.

⚠️ Free GitHub Pages sites and their repositories are **public**. See the privacy note in HOW-TO-ADD-PLANS.md.
