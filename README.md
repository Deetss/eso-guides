# 📜 ESO Progression Guide & Web Companion

A premium, interactive web application companion for Elder Scrolls Online (ESO) players, designed around daily desk routines, time-gated character upgrades, combat spammables, and CP progressions.

## 🛠️ Tech Stack & Architecture

- **Bundler:** Vite 8 (Vanilla JS template)
- **Styling:** Vanilla CSS 3 (ESO Dark Fantasy theme: Obsidian, Gold, Amber glow)
- **Deployment:** Pre-configured with a relative base path (`./`) inside `vite.config.js` for seamless hosting on **GitHub Pages** (works on subdirectories like `username.github.io/eso-guide/`).

## 🚀 Local Development

To run the project locally for adjustments:

1. **Install Dependencies:**
   ```bash
   npm install
   ```
2. **Start Dev Server:**
   ```bash
   npm run dev
   ```
   *Open the URL shown (typically `http://localhost:5173`) in your browser.*

---

## 🌐 Hosting on GitHub Pages

Because the project is pre-configured with a relative base path, you can host it on GitHub Pages easily using one of these two methods:

### Option A: GitHub Actions (Recommended & Automated)

1. Create a repository on GitHub named `eso-guide`.
2. In your local repository, initialize git, add the remote, and push:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/eso-guide.git
   git push -u origin main
   ```
3. Go to your repository settings on GitHub:
   * **Settings** → **Pages** → under **Build and deployment**, change the source from "Deploy from a branch" to **"GitHub Actions"**.
4. Create a folder structure `.github/workflows/` and save a file named `deploy.yml` inside it with the following content:
   ```yaml
   name: Deploy to GitHub Pages

   on:
     push:
       branches:
         - main

   permissions:
     contents: read
     pages: write
     id-token: write

   concurrency:
     group: "pages"
     cancel-in-progress: false

   jobs:
     deploy:
       environment:
         name: github-pages
         url: ${{ steps.deployment.outputs.page_url }}
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v4
         - name: Set up Node
           uses: actions/setup-node@v4
           with:
             node-version: 20
             cache: npm
         - name: Install dependencies
           run: npm ci
         - name: Build
           run: npm run build
         - name: Setup Pages
           uses: actions/configure-pages@v4
         - name: Upload artifact
           uses: actions/upload-pages-artifact@v3
           with:
             path: './dist'
         - name: Deploy to GitHub Pages
           id: deployment
           uses: actions/deploy-pages@v4
       ```
5. Commit and push: GitHub will automatically build and deploy your webpage to `https://YOUR_USERNAME.github.io/eso-guide/` in under a minute.

### Option B: Git Subtree (Manual / No Actions)

If you don't want to use GitHub Actions, you can push the compiled `dist/` folder directly to a `gh-pages` branch:

1. Build the production files:
   ```bash
   npm run build
   ```
2. Remove `dist` from your `.gitignore` temporarily if it's there, commit it, and run:
   ```bash
   git add dist -f
   git commit -m "Build assets for deployment"
   git subtree push --prefix dist origin gh-pages
   ```
3. In your GitHub repository settings under **Pages**, set the source branch to `gh-pages` / `/ (root)`.
