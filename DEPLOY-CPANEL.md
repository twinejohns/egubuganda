# Deploying to shared cPanel hosting (Node.js App)

This site is server-rendered (SSR) with an admin area, so it must run as a Node.js
application — it cannot be dropped into `public_html` as static files.
The database, login and media stay on Lovable Cloud; the cPanel server only runs the app.

Requirements: cPanel with **Software → Setup Node.js App** and Node.js **20 or newer**.

---

## 1. Get the code

Download the codebase from the Lovable editor (Code Editor → Download codebase),
or connect Git and clone the repo.

## 2. Build for Node (on your computer)

```bash
npm install
NITRO_PRESET=node-server npm run build
```

Windows PowerShell:

```powershell
$env:NITRO_PRESET="node-server"; npm run build
```

This produces a `dist/` folder:

- `dist/server/` – the Node server (entry: `dist/server/index.mjs`)
- `dist/client/` – static assets

## 3. Upload

In cPanel **File Manager**, create a folder outside `public_html`, e.g. `/home/USER/ehub`.
Upload the whole `dist/` folder into it, so you have `/home/USER/ehub/dist/server/index.mjs`.

Also create `/home/USER/ehub/app.js` with:

```js
import('./dist/server/index.mjs');
```

## 4. Create the Node.js app

cPanel → **Setup Node.js App** → **Create Application**:

- Node.js version: 20+
- Application mode: Production
- Application root: `ehub`
- Application URL: your domain (e.g. `ehubuganda.org`)
- Application startup file: `app.js`

## 5. Environment variables

In the same screen, add these variables (values are in the project's `.env`,
Lovable editor → Code Editor → `.env`):

| Name | Purpose |
| --- | --- |
| `NODE_ENV` | `production` |
| `PORT` | leave as cPanel sets it |
| `SUPABASE_URL` | backend URL |
| `SUPABASE_PUBLISHABLE_KEY` | public backend key |
| `SUPABASE_PROJECT_ID` | backend project id |
| `VITE_SUPABASE_URL` | same as `SUPABASE_URL` |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | same as publishable key |
| `VITE_SUPABASE_PROJECT_ID` | same as project id |
| `LOVABLE_API_KEY` | only if you use AI / email features |

Note: the `VITE_*` values are baked in at build time, so they must also be present
in `.env` **before** you run the build in step 2.

Then click **Run NPM Install** (optional — the build is self-contained) and **Restart**.

## 6. Verify

- `https://yourdomain/` – public site
- `https://yourdomain/auth` – admin login
- `https://yourdomain/admin` – content editor

If you see a 503, open **Setup Node.js App → Logs**; the usual causes are a Node
version below 20 or a missing environment variable.

## Notes

- Re-deploying = rebuild locally, re-upload `dist/`, click **Restart** in cPanel.
- Point your domain's DNS to the cPanel server only after the app runs, otherwise
  the current Lovable-hosted site goes down.
- Lovable's own hosting keeps working; this config change does not affect it.
