# Deploy to cPanel from GitHub

This project is set up to deploy from a Git repository to cPanel shared hosting.

## What you need in cPanel

1. A cPanel account that has **Git Version Control** enabled.
2. Node.js 20+ support (look for **Setup Node.js App** in cPanel). If your host does not offer Node.js, you must build the app locally and upload the output manually instead of using this guide.
3. A GitHub repository connected to Lovable (or one you push to manually).

## Files this repo adds for cPanel

- `.cpanel.yml` — deployment instructions for cPanel Git Version Control.
- `package.json` script `build:cpanel` — builds the app as a Node.js server bundle.
- `vite.config.ts` — reads the `NITRO_PRESET` environment variable to output a Node.js server.

## How to set up

### 1. Create a GitHub repository

In Lovable: click **GitHub → Connect project** and create the repository. Every edit you make in Lovable will now be pushed to GitHub.

### 2. Clone the repository into cPanel

In cPanel, go to **Git Version Control** and create a new repository from the URL of your GitHub repo. Use the branch you want to deploy (usually `main`).

### 3. Fix the “uncommitted changes” error

If cPanel says:

> No uncommitted changes exist on the checked-out branch.

it means the cPanel working copy has local edits that were never committed. Go to cPanel → Git Version Control → **Manage** your repository, then either commit those changes or discard them. The deployment cannot run until the working copy is clean.

### 4. Edit `.cpanel.yml` with your cPanel username

Open `.cpanel.yml` in this repo and replace `REPLACE_USERNAME` with your cPanel username. Also make sure the Node.js path matches your host. Common paths:

- `/opt/cpanel/ea-nodejs20/bin/npm`
- `/opt/alt/alt-nodejs20/root/usr/bin/npm`

If you are unsure, open the cPanel **Setup Node.js App** and check which Node.js binary path is shown.

### 5. Push the repo to GitHub

Commit and push the `.cpanel.yml` changes from Lovable:

```bash
# (Lovable does this automatically when you edit and publish)
# If you are editing locally:
git add .cpanel.yml package.json vite.config.ts DEPLOY-CPANEL.md
git commit -m "Add cPanel deployment config"
git push origin main
```

### 6. Deploy from cPanel

In cPanel → Git Version Control → click **Deploy** on your repository. This will:

1. Copy the repo to `/home/<username>/ehub-app`.
2. Run `npm install`.
3. Run `npm run build:cpanel` to create a Node.js server bundle.
4. Copy the bundle into `public_html`.

### 7. Set up the Node.js app in cPanel

In cPanel → **Setup Node.js App**:

- Application root: `/home/<username>/ehub-app`
- Application startup file: `dist/server/index.mjs`
- Application URL: your domain
- Environment variables: add the values from your `.env` file (VITE_SUPABASE_URL, VITE_SUPABASE_ANON_KEY, etc.)

You do not need to copy anything into `public_html`; the cPanel Node.js application will serve from the app root once it is running.

## Alternative: build locally and upload manually

If your cPanel host does not support Node.js builds, you can build on your own machine and upload the output:

```bash
NITRO_PRESET=node-server npm run build
```

Then upload the contents of the generated output folder to your cPanel `public_html` directory via FTP or File Manager.

## Keeping Lovable and the live site in sync

1. Edit in Lovable.
2. Lovable pushes to GitHub.
3. In cPanel, go to Git Version Control and click **Deploy** (or use cPanel’s automatic deployment if available).

## Troubleshooting

- **“A valid .cpanel.yml file exists”**: make sure `.cpanel.yml` is in the repository root and committed to the branch cPanel pulls from.
- **“No uncommitted changes exist on the checked-out branch”**: clean up the cPanel working copy as described above.
- **Build fails on cPanel**: make sure the Node.js path in `.cpanel.yml` is correct and your host allows shell builds.
- **Site 404s after deploy**: check the startup file path in cPanel **Setup Node.js App** matches the actual built entry file.
