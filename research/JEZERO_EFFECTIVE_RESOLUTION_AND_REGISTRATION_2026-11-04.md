# MARTIAN research increment: effective terrain resolution and registration
Date: 2026-11-04. Pre-event source audit only; no competition solution code.

## New verified source facts
1. USGS Jezero 2020 CTX TRN DTM reports **20 m raster posting**, **9.6 m average relative horizontal displacement between individual orthorectified CTX images**, and **3.8 m vertical inter-DTM registration after a 183.3 m mosaic offset to HRSC**. The 9.6 m is *not* a global absolute position-error bound; 3.8 m is not per-pixel elevation accuracy. Source: https://astrogeology.usgs.gov/search/map/mars_2020_terrain_relative_navigation_ctx_dtm_mosaic
2. USGS 2020 HiRISE orthomosaic reports pairwise relative registration better than **3 m at the 99th percentile**, with most overlaps better than **1.1 m at the 99th percentile**. Comparing HiRISE and CTX, **94.1% of matched features had displacement <6 m**, not 99%. Source: https://astrogeology.usgs.gov/search/map/mars_2020_terrain_relative_navigation_hirise_orthorectified_image_mosaic
3. A USGS 2020 stereo DTM quality study finds **horizontal effective resolution of approximately 3–5 raster postings**, rather than the nominal pixel spacing. This is a study-dependent rule of thumb, not a guarantee for every DEM. For a 20 m/pixel DTM, **60–100 m** is a useful *screening scale* for resolvable landform detail, pending local validation. Source: https://www.usgs.gov/publications/evaluating-stereo-dtm-quality-jezero-crater-mars-hrsc-ctx-and-hirise-images ; DOI 10.5194/isprs-archives-XLIII-B3-2020-1129-2020
4. The 2025 extended-westward HiRISE DEM is independently published by USGS, DOI **10.5066/P13CPYYU**, and is marked CC0 1.0 Universal. It was generated from 8 HiRISE stereo pairs. Source: https://www.usgs.gov/data/mars-sample-return-hirise-mosaics-terrain-relative-navigation
5. Its 2025 conference report cautions that HiRISE/CTX alignment is **<6 m at the 93rd percentile** and **<10.2 m at the 99th percentile**, with an unexplained localized offset around Jezero's rim. This should be treated as an area-specific uncertainty flag, not erased by the high nominal raster resolution. Source: https://www.hou.usra.edu/meetings/lpsc2025/pdf/1627.pdf
6. The expanded 2021 CTX science DEM explicitly includes additional stereo products tied vertically to MOLA and some horizontal referencing done in ArcGIS Pro; the matching 5 m orthomosaic is listed. Do not automatically transfer the *2020 TRN* 9.6 m alignment statistic to the expanded 2021 mosaic. Source: https://astrogeology.usgs.gov/search/map/mars_2020_science_investigation_ctx_dem_mosaic

## First-principles implication: sampling is not resolving
Let h be terrain rise and w the distance over which it occurs. A naive grade-derived slope is theta=atan(h/w). An illustrative 10 m rise spread over 20 m yields **26.565°**, while the same rise represented over a smoothed 100 m transition yields **5.711°**. This is **not an observed Jezero landform**. It demonstrates how unresolved features and smoothing can change a hazard verdict, even when calculations are arithmetically correct.

20 m posts with 3–5-post effective horizontal resolution imply features much narrower than 60–100 m may be poorly represented in that CTX DTM. Ayan's ~95 m route-analysis cells are near this order of magnitude, but that does **not** establish safe detection of rocks, small ledges, crater rim microtopography or suit-scale footing hazards. A 5 m orthomosaic supplies visual detail, **not** 5 m elevation.

## Error metrics that must not be conflated
- Ayan's ~140 m median held-out manually matched image-to-DEM error: an empirical *manual registration* result for his prototype.
- 9.6 m CTX average relative image displacement: *relative orthoimage matching* within the 2020 TRN production.
- 3.8 m vertical registration: *inter-DTM vertical agreement after offset*, not terrain-height uncertainty.
- <3 m HiRISE pairwise at 99th: *within HiRISE orthoimage relative registration*.
- <6 m at 93rd and <10.2 m at 99th: *2025 HiRISE to CTX reference alignment*, with geographic caveats.

None can be substituted for another without a shared reference frame and evaluation protocol.

## Test protocol to apply once real data is accessible
- Record product ID, DOI, file hash, native CRS/projection, vertical datum, longitude domain, NoData mask, pixel size and region of validity.
- Select a known route corridor. Compare a CTX-derived elevation profile to overlapping HiRISE DEM where available, after resampling onto a common projection and reference surface.
- Compute slope with documented spatial window sizes (e.g., 20, 60, 100 m) and report the distribution of disagreement, not one magic slope.
- Map *unresolved* hazards separately from detected hazards; absence of a detected rock is not evidence of a rock-free path.
- Perturb the whole raster/route alignment with coherent offsets from source registration evidence; do not add independent per-pixel jitter as if it represented a rigid alignment error.
- Do not claim a route is EVA-safe or apply landing TRN thresholds to suited walking.

## Current blockers
The published USGS metadata and studies were reviewed, but raw source rasters and Ayan's exact source commit/route waypoints have **not** been processed. The numbers above are official metadata and independent arithmetic, not direct Jezero measurements.

## Scientific impact
The actionable correction is a **two-scale terrain representation**: CTX for regional routing; HiRISE for local hazard screening where the coverage and validation support it. Even HiRISE imagery alone cannot establish safe footing or traversability. The system must expose *unknown* terrain explicitly.
