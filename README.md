# MB Designs

TanStack Start website with server-side rendering and deployment support for both the existing Sites/Cloudflare build and Vercel.

## Requirements

- Node.js 22
- npm

## Local development

```bash
npm ci
npm run dev
```

## Build output

Create the local/Sites production build:

```bash
npm run build
```

This creates `dist/client` for browser assets and `dist/server` for the SSR server bundle.

Create and validate the Vercel SSR bundle:

```bash
npm run build:vercel
```

This creates `.vercel/output` in Vercel Build Output API format. It contains the static assets and the Node.js SSR function.

## Deploy from GitHub to Vercel

1. Push this repository to GitHub.
2. In Vercel, choose **Add New → Project** and import the repository.
3. Confirm the framework preset is **TanStack Start**.
4. Keep the project root as `/` and do not override the output directory.
5. Deploy. `vercel.json` runs `npm run build:vercel` automatically.

The generated `dist` and `.vercel` directories are intentionally ignored by Git because Vercel builds them from the committed source.
