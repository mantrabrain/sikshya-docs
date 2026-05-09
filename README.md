# Sikshya Documentation

Modern documentation site for the **Sikshya LMS** WordPress plugin (free + Pro), built with [VitePress](https://vitepress.dev/).

## Develop

```bash
npm install
npm run dev
```

Then open <http://localhost:5173>.

## Build

```bash
npm run build
```

Output is written to `docs/.vitepress/dist`.

## Preview a production build

```bash
npm run preview
```

## Structure

```
docs/
├── .vitepress/
│   └── config.ts            # Theme, nav, sidebar, SEO
├── guide/                   # All guide pages
└── index.md                 # Homepage (hero + cards + Free vs Pro)
```

Edit any Markdown file under `docs/` and the dev server hot-reloads.
