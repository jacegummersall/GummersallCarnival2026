# Gummersall Carnival 2026

A simple static website for the Gummersall family reunion. It is designed to be easy to update and easy to host in Azure Static Web Apps, Azure Storage Static Website hosting, GitHub Pages, or any plain web server.

## Preview Locally

From this folder, run:

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080
```

## Update Reunion Details

Most family-specific content lives in:

```text
reunion-data.js
```

Edit the `quickFacts`, `schedule`, `activities`, `details`, and `updates` arrays. Refresh the browser to see changes.

## Project Files

- `index.html` is the page structure.
- `styles.css` controls the carnival styling and responsive layout.
- `reunion-data.js` stores the editable reunion information.
- `site.js` renders the editable data onto the page.
- `assets/carnival-hero.png` is the generated carnival banner used in the hero section.

## GitHub Repository Setup

This folder is ready to become a Git repository:

```bash
git init
git add .
git commit -m "Create Gummersall Carnival reunion site"
```

After creating an empty GitHub repository, connect and push:

```bash
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO-NAME.git
git branch -M main
git push -u origin main
```

## Azure Hosting Notes

For Azure Static Web Apps, connect the GitHub repo and set the app location to `/`. No build command or output folder is needed because this is plain HTML, CSS, and JavaScript.

For Azure Storage Static Website hosting, upload the contents of this folder and set `index.html` as the index document.
