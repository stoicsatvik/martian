# MARTIAN — Cloudflare Pages deployment

**Purpose:** A working, pre-event **research/exploration** viewer for NASA's *archived* Mars Trek map tile services. This code is **not** a validated Marswalk planner or an eligible competition submission by itself. Check the official NASA Space Apps 2026 rules and disclose all pre-existing work before using any of it in a competition entry.

## What works

- Actual NASA/JPL Mars Trek WMTS **orbital image tiles** at user-selected map positions, loaded dynamically from the published Mars service. Tiles are historical observations, not live camera data.
- Equirectangular Mars map pan/zoom, location inspector, graticule, global MOLA and Viking maps, controlled Jezero CTX and HiRISE image overlays.
- A **great-circle** surface separation tool using Mars mean radius 3389.5 km. This is not terrain-constrained route finding, slope measurement, oxygen or risk prediction.
- A Cloudflare Pages Function at `/api/tiles/{layer}/{z}/{row}/{col}` fetching only allowlisted NASA layer IDs, with bounded tile indexes, CDN caching, image-type check, and direct NASA fallback in browser.
- Explicit source status, warnings on missing tiles, documented source IDs.
- Responsive desktop/mobile panels and keyboard shortcuts.

## Connect GitHub to Cloudflare Pages

1. Push this project **including** `public/`, `functions/`, `scripts/`, `package.json`, and `tests/` to the `stoicsatvik/martian` repository (or a separate repository if this will stay an independent pre-event prototype).
2. In Cloudflare, go to **Workers & Pages → Create → Pages → Connect to Git** and select that repository.
3. **Framework preset:** None (or custom). **Project root:** repository root (`/`).
4. **Build command:** `npm run build`.
5. **Build output directory:** `dist`.
6. **Production branch:** your chosen branch (usually `main`).
7. Click **Save and Deploy**. Cloudflare will build the static site and include the `functions/` directory as Cloudflare Pages Functions.
8. Open your assigned `.pages.dev` URL. Under the right-hand panel's status indicator, click the chevron to view source-tile diagnostics. Tile loading depends on NASA's service and Cloudflare's ability to reach it.

No API key or environment variables are required for NASA's public Mars Trek imagery. The browser tries the Cloudflare proxy first for deployed HTTPS sites, and the exact NASA public URL if the proxy fails. On localhost it requests NASA directly.

## Local development

```bash
npm run build
python3 -m http.server 8000 --directory dist
npm test
```

`python http.server` does not run Cloudflare Pages Functions, so local tiles use direct NASA requests. Cloudflare production serves proxy functions, subject to third-party availability.

## Source integrity

NASA tile schema: https://trek.nasa.gov/tiles/apidoc/trekAPI.html?body=mars

NASA open APIs reference: https://api.nasa.gov/

Cloudflare Pages build instructions: https://developers.cloudflare.com/pages/configuration/build-configuration/

The exact imagery extension for local Jezero tile layers must be read from WMTS capabilities. The Pages proxy attempts both `.png` and `.jpg` to accommodate published layer format differences. Missing tiles are expected outside image footprints or available zoom ranges.

## Known limitations

- **Cannot certify live tile reliability from this build environment**: external NASA host was inaccessible from the local container. A successful local UI test and an upstream-proxy unit test do not prove production tiles will load.
- Different orbital datasets have different acquisition dates and coverages; visual alignment is not proof of exact science-grade co-registration.
- This version does not process raw numeric DEM GeoTIFFs. It shows no measured elevation/slope, EVA oxygen, radiation or safety recommendation.
- User-visible named coordinates are approximate mission-site references; don't use for real mission decisions.
- A click-to-click geodesic connection is not terrain-aware A*, Dijkstra, or a permitted EVA route.

## Future scientific integration (after rules approval)

Use numerical USGS Jezero CTX DTM + matched orthorectified image, preserve Mars CRS/projection metadata, pixel footprints, NoData masking, vertical reference and uncertainties. Only then compute terrain slopes, routing constraints and mission costs. Validation work should include return-trip accounting and independent check against Ayan's notes.