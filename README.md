# One Wish Willow

A vintage-styled wish oracle: scatter the dandelion, and the willow answers in three paragraphs — every path leads to the same happily-ever-after.

## Run locally

```bash
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173).

## Build for production

```bash
npm run build
npm run preview
```

Static output is in `dist/`.

## How it works

- **`src/wishGrant.js`** — narrative compiler: mirror → theme bridge → canonical finale (3 paragraphs).
- **`src/storage.js`** — persists wishes under `wish:` keys (localStorage by default; uses `window.storage` when provided by the host).
- **`src/App.jsx`** — UI, dandelion animation, wish history drawer.

Wishes are stored locally in the browser. No server required.
