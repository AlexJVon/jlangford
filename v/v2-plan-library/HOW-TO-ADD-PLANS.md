# How to add blueprints to the website

No coding needed. You'll use a form on the site that writes everything for you.

## The short version

1. Open **add-plan.html** on the website (e.g. `https://<username>.github.io/<repo>/add-plan.html`).
   It isn't in the menu, so bookmark it.
2. Type the plan name, then fill in anything else you know. Every box except the name is optional.
3. Drag your drawings (JPG, PNG or PDF) into the **Drawings** box. Check each sheet's title and type.
4. Follow the numbered steps the page shows on the right. They're written for your exact plan.

## The steps it will give you

1. **Make a folder** on your computer named exactly what the page says (e.g. `the-magnolia`) and put the drawings in it.
2. **Upload the folder.** On GitHub, open the repository → click the `plans` folder → **Add file → Upload files** →
   drag the whole folder in → **Commit changes**.
3. **Copy the code** using the button on the form.
4. **Paste it.** On GitHub open `js/plans.js` → click the ✏️ pencil → scroll to the bottom → click on the line just above
   `ADD NEW PLANS ABOVE THIS LINE` → paste → **Commit changes**.
5. Wait about a minute and refresh the Plan Library.

## Filling in details on plans that are already there

Most of the plans brought over from the old site only have drawings. To add square footage, bedrooms and so on:

1. Open **add-plan.html** and pick the plan from **"Or edit an existing plan."**
2. Fill in the new information.
3. Copy the code. In `js/plans.js`, replace that plan's block (from its `{` to its `},`) with what you copied.

## Tips

- **Better scans = better site.** Drawings look best at around 2000–4000 pixels wide. PDFs are fine for full sheets.
- **Name files clearly** (`front-elevation.jpg`, `first-floor-plan.pdf`). The form guesses the sheet type from the name.
- **The first drawing is the main picture.** Use the ↑ ↓ arrows to reorder them.
- **Featured on the home page:** the three plans shown are listed near the bottom of `index.html` (`powell-building`, etc.).

## ⚠️ Privacy

A free GitHub Pages site is **public**, and so is the repository behind it. "Keep it out of the Plan Library list" only
hides a plan from the list. Anyone with the link, or anyone browsing the repository, can still see it.
**Don't upload drawings that must stay private** (client names, addresses, unreleased work) unless the repository
is made private on a paid GitHub plan.

GitHub limits single files to 100 MB. Keep the whole repository under about 1 GB.
