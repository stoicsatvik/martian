# MARTIAN v0.2 — Observation-first map + optional USGS terrain sampling

**Date:** 2026-11-04 · **Pre-existing prototype (not a new hackathon-day deliverable).**

Changes:
- Viking colour mosaic selected as default. MOLA relief remains a scientific visualization option.
- High-resolution Jezero CTX no longer overlays the initial map by default. Explicit "Focus Jezero Detail" switches it on and identifies its published rectangular coverage footprint.
- CTX image opacity adjustable, accurately described as blending archived imagery, not colour science.
- On-demand USGS Mars 2020 CTX 20 m numerical terrain reader, via a same-origin read-only Cloudflare proxy or a local source TIFF upload.
- Raster dimensions, pixel spacing and georeferencing geometry are checked before showing elevations. On click, exact source cell elevation is inspected; 3×3 Horn slope is derived only with valid adjacent cells. Source reference and no-data states remain visible.
- Native Workers static-assets configuration provided in addition to the existing Cloudflare Pages Functions path.
- Unit tests for terrain geometry, DEM proxy allowlist/response checks and Worker API routing.

Source: https://astrogeology.usgs.gov/search/map/mars_2020_terrain_relative_navigation_ctx_dtm_mosaic
NASA WMTS: https://trek.nasa.gov/tiles/apidoc/trekAPI.html?body=mars
GeoTIFF decoder documentation: https://geotiffjs.github.io/geotiff.js/

### What we have *not* verified
- No real USGS TIFF bytes could be fetched inside the development container; full remote DEM load on the deployed Cloudflare region remains to be checked after deployment.
- No flight-certified elevation quality, uncertainty, hazard, or safe EVA route.
- No end-to-end live Cloudflare deployment has been made from this environment. GitHub commit triggers automatic deployment only if the user has enabled continuous deployment.

### Release gate
Run `npm test && npm run build`; verify the Workers deployment logs; open the app and inspect map tiles and DEM independently. If the DEM cannot be downloaded, do not display invented numbers.
