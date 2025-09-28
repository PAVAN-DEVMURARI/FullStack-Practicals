# Practical 9 — Express POC

A minimal, scalable Express.js backend for a small product site. The home route responds with:

> Welcome to our site

## Structure

- `src/app.js` — Express app factory, middlewares and routes
- `src/server.js` — HTTP server bootstrap with graceful shutdown
- `src/routes/index.js` — Home route
- `scripts/smoke-test.js` — Quick local assertion the home route works
- `package.json` — Scripts and dependencies

## Run locally

- Development (auto-reload):

```powershell
cd "Practical 9" ; npm install ; npm run dev
```

- Production style:

```powershell
cd "Practical 9" ; npm run start
```

- Smoke test:

```powershell
cd "Practical 9" ; npm run smoke
```

Note: Commands assume you're at the repo root. You can also open a terminal directly in the `Practical 9` folder and run the scripts without `cd`.
