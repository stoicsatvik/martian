# MARTIAN | Official 2026 rules + Jezero evidence audit
**Compiled:** 2026-11-04  
**Status:** Pre-event research, compliance and dataset-metadata analysis. **No raw raster processing, scientific model validation or competition solution work was performed as part of this report.** The public NASA full challenge Details/Resources tab was inaccessible to this research session; official general terms/timeline and published summary are separately verified.

## 1. Confirmed official 2026 participation rules

- NASA main timeline: https://www.spaceappschallenge.org/2026/
- NASA Participant Terms (updated 2026-06-22): https://www.spaceappschallenge.org/legal/
- Saturday 2026-11-14 09:00 *Local Event time*: project submission opens.
- Sunday 2026-11-15 23:59 *Local Event time*: submission closes.
- Max six participants. Register under the same Local Event as the team.
- Project submitted from the Project tab on the team's NASA Space Apps page.
- Every source must be attributed. Original submissions need an OSI-compliant open license or unrestricted availability; the default for unlicensed original content is Apache 2.0. Third-party licenses/rights need checking and documentation.
- Minors under 18: guardian registration and accompaniment. Terms specifically limit recognizable minors' names, voices and likenesses *in submission materials and video*.
- China-related restriction is **affiliation/institution-based, not nationality-based**. Need verify specific institutional relationships of contributors, including external researchers mentioned by the team, and seek organizers' written clarification where uncertain.
- Local NASA 2026 event guidance (https://www.spaceappschallenge.org/2026/local-events/santiago-dominican-republic/) explicitly says **preparation and skills learning are allowed; the competition solution must not be started before the hackathon**. Treat the October 2026 Mars Atlas prototype as pre-existing. Obtain formal clarification before reusing existing code or presenting it as competition-day output.
- In-person attendance for Mumbai/Mira-Bhayandar is organizer-specific. Check with the official Mumbai Local Lead rather than assuming an online submission eliminates local in-person judging.

## 2. 2026 event collaborators (names, not assumed credits)

From https://www.spaceappschallenge.org/2026/ :
- Global Collaborators (Global Offers): GoDaddy; Google; Meteomatics; Microsoft. Exact offers/terms not verified.
- Amplification collaborators include Google DeepMind (promotion role).
- NASA Space Apps funded by NASA Science Mission Directorate through Booz Allen Hamilton, Mindgrub and SecondMuse.
- Official 2026 Space Agency Partners include ISRO, ESA, JAXA, CSA and others: https://www.spaceappschallenge.org/blog/explore-the-next-frontier-at-the-2026-nasa-space-apps-challenge/
- None of these relationships grants an implied endorsement of MARTIAN.

## 3. Official challenge summary (full details unverified here)

Published "Interplanetary Survival Guide: Martian Map" summary describes a layered, integrated view of a Martian location or route combining data from multiple NASA science missions, supporting human Marswalk science and planning.

Official challenge URL: https://www.spaceappschallenge.org/2026/challenges/interplanetary-survival-guide-martian-map/

**Do not interpret** proposed A*, AI guide, full-scale thermal forecasts or oxygen models as mandatory NASA requirements without reviewing the complete official Details/Resources tabs.

## 4. Official Jezero source families — metadata-only findings

| Source | Ground sampling | Coverage/dimensions from official metadata | Raw *uncompressed* storage implied by dimensions and depth | Source |
|---|---:|---|---:|---|
| CTX science-investigation DEM (2021) | 20 m/pixel | 4456 × 5067 pixels; approx 89.12 × 101.34 km pixel-spacing footprint | 90.31 MB (decimal; 32-bit single band) | https://astrogeology.usgs.gov/search/map/mars_2020_science_investigation_ctx_dem_mosaic |
| Matched CTX science orthomosaic | 5 m/pixel | Extends across science DEM region; exact raster dimensions not yet independently checked | Not computed | Same source |
| CTX terrain-relative-navigation (TRN) DTM (2020) | 20 m/pixel | 1596 × 1512; approx 31.92 × 30.24 km | 9.65 MB (32-bit) | https://astrogeology.usgs.gov/search/map/mars_2020_terrain_relative_navigation_ctx_dtm_mosaic |
| CTX TRN orthomosaic (2020) | 6 m/pixel | 5322 × 5040; approx 31.93 × 30.24 km | 26.82 MB (8-bit) | https://astrogeology.usgs.gov/search/map/mars_2020_terrain_relative_navigation_context_camera_orthorectified_image_mosaic |
| HiRISE TRN orthomosaic (2020) | 0.25 m/pixel imagery | 85600 × 85952; approx 21.4 × 21.49 km | 7.36 GB (8-bit) | https://astrogeology.usgs.gov/search/map/mars_2020_terrain_relative_navigation_hirise_orthorectified_image_mosaic |
| MSR HiRISE 2025 terrain mosaic | 1 m/pixel elevation | 26816 × 19144; approx 26.82 × 19.14 km | 2.05 GB (32-bit) | https://astrogeology.usgs.gov/search/map/mars-sample-return-terrain-relative-navigation-hirise-dtm-mosaic |

**Warning:** These dimensions and raw-storage estimates are calculations from USGS *published metadata*, not data downloaded or analyzed. Product download sizes, cropping, masks, compression, CRS extent and region overlap can differ. Need inspect actual GeoTIFF and its PDS label before doing science.

### Distinctive technical finding

USGS provides an orthomosaic matched to the 20 m/pixel Jezero science DEM (5 m/pixel image). The earlier NASA Mars 2020 landing TRN collection offers a corresponding CTX orthomosaic and DTM. The latter's technical report states mean relative image displacement approximately 9.6 m and inter-DTM vertical registration approximately 3.8 m in the described processing. These are **different metrics** from Ayan's manually matched image median held-out error (~140 m), not immediately directly comparable as absolute errors.

The 2025 MSR HiRISE mosaic extends beyond some previous Jezero products and reports better than 0.9 m relative horizontal registration between DEMs at the 99th percentile, plus HiRISE-to-CTX alignment <6 m at 93rd percentile (<10.2 m at 99th), subject to source caveats. It is very large; avoid downloading whole files for a narrow route if a windowed product is available.

**Highest-value next source audit:** verify the actual GeoTIFF CRS, latitude type, standard parallel, pixel origin, NoData mask, native transform and overlap with Ayan's Jezero patch. Notebook's claimed standard parallel 18.4663° should not be mixed with differently named equirectangular TRN files suggesting latitude-of-true-scale 0; inspect metadata instead of assuming both products use an identical projection.

## 5. Findings from Ayan's 15-page notebook (reported, not independently reproduced)

- Default Basecamp to Western Delta **8.3 km**, 3 h 50 min, oxygen **679 L** for two crew with assumed 30% reserve, modeled radiation **0.191 mSv**.
- Human route-planning grid: 320×320 cells × roughly 95 m = ~30.4 km per side.
- Manual image alignment: reported ~140 m held-out median error = **1.47 route cells**. Notebook says alignment revision changed maximum route slope 21° (CAUTION) to 18° (GO). **Therefore no unqualified "GO" on a marginally rated route.**
- Route length 8.3 km / 2.5 km/h + 3×10-min rests = 3.82 hours (~3h49m): **arithmetic consistent**, not proof of real EVA rate.
- 679 L / 1.30 = 522.3 L nominal, assuming reserve multiplicative. Nominal per-person average across 230 minutes ~1.14 L/min. Reference temperature/pressure for litre volumes not stated.
- **Critical return-trip ambiguity:** The reported route is described as Basecamp -> Western Delta; the reserve-only walk-back radius is 3.0 km, versus a destination 8.3 km of route travel away. If 8.3 km is one-way, the reported GO and 679 L do not establish a safe return. Require explicit round-trip geometry, worst-case failure point and oxygen carry/consumption conventions. Treat as an open audit, not proven error without code.
- Fatigue growth (5% per working hour), rest recovery (30% per break), stress episodes and slope thresholds are illustrative assumptions. 400 simulations cannot validate assumptions not informed by empirical Mars EVA measurements.
- Crater detector reports 81 candidates; only one independently sized crater (Belva) and 18 of the other 80 stable under a refined method. Need independent catalogue and false-negative audits.
- Radiation extrapolated from Curiosity RAD at Gale to Jezero; pressure derivative check is a consistency calibration, not independent planetary dose validation.
- Rest-spot off-route detours omitted from resource calculations, expressly admitted by the notebook; this is a high-priority accounting bug.
- Atlas AI assistant should explain **structured trusted model outputs**, never invent EVA or radiation measurements.

Sources: user's provided "Dr Ayans Research on Mars.pdf", pages 2–15. The paper itself, source code, route points, raw datasets, and executable notebooks are required for full reproduction.

## 6. Additional official references

- NASA spacesuit preliminary mass study: https://ntrs.nasa.gov/citations/20260005410 (ICES-2026-127; preliminary recommendation, not flight-certified human traversability)
- Jezero geologic map USGS SIM 3464: https://pubs.usgs.gov/publication/sim3464
- Perseverance MEDA archive: https://pds-atmospheres.nmsu.edu/data_and_services/atmospheres_data/PERSEVERANCE/meda.html
- NASA/JPL Mars image service: https://trek.nasa.gov/
- NASA Planetary Data System: https://pds.nasa.gov/

## 7. Proposed research tests, ordered by expected value

1. **Source artifact check (P0):** Pin actual CTX DTM and ortho product IDs, source hashes, projections and masks.
2. **Coordinate-regression test (P0):** On a *preparation-only* toy map, practice forward/inverse projected coordinate transforms, longitude and latitude conventions; challenge implementation postponed to event. For Ayan's prototype, request its control-point ledger and route-export evidence.
3. **Return-trip audit (P0):** Confirm whether 8.3 km includes return; verify outbound + return oxygen, three rest breaks, reserve interpretation, life-support capacity and failure scenarios.
4. **Hazard threshold stability (P0):** Determine from a documented *protocol* whether GO/CAUTION status changes when maps are shifted by the reported error, routing cell size changes, or thresholds vary.
5. **Mass/units audit (P1):** Clarify O₂ gas state, actual carried O₂ mass, crew metabolic rate, primary vs emergency supply, per-person vs crew totals.
6. **Crater precision-recall (P1):** Predefine independent crater catalog, matching radius, false-positive and false-negative counts.
7. **Radiation external-validity audit (P1):** Separate measured RAD dose from atmospheric scaling, particle transport and storm scenarios; do not compare ad hoc acute dose to a career limit as proof of safety.
8. **Rest-spot detours (P1):** Model travel distance as total traversed path, not just snapped path segments; document non-shelter status.
9. **Scientific-source page (P2):** Every visualization and figure needs provenance, units, time, uncertainty and reproduction record.

## 8. Event-day candidate minimum demonstration (only after organizer approves prior-work handling)

Pick one Jezero science destination; render a genuinely aligned instrument basemap; present one baseline route and one terrain-aware alternative, both with sources, gap flags and explicit modeled assumptions; calculate *round-trip* requirements; show a failure/uncertainty case where software appropriately declines to certify safety. Prefer this to a full-planet simulation.

## 9. Open questions requiring organizer response

- Can any previously developed Mars Atlas code be used or must submission solution be newly implemented during 2026-11-14–15?
- Is the official Mumbai Local Event in-person presentation mandatory for each listed member? What is the exact local timetable?
- Does a specific outside researcher institutional affiliation fall under the China-related restriction? Describe affiliation and contribution, not nationality.
- What exact 2026 submission Demo specifications, source link and judging rules apply? A 2022 guide lists a 30s video or seven slides but this is **not confirmed as the binding 2026 requirement**.
- The public 2026 Martian Map **full Details / Resources** tab was not retrievable here. Review it in logged-in browser and update this record.

## 10. Scientific integrity rules

Separate *measured observation*, *derived statistic*, *assumed scenario*, and *not available*. Never invent NASA source products, hazard labels, geometry, available oxygen, or real-time Mars weather. Do not call a route astronaut-safe. Distinguish testable mathematical models from certified flight operations.
