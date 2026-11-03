# MARTIAN | Preflight quantitative audit, 2026-11-04

**Status:** Independent arithmetic verification and *synthetic* scenario analysis referencing Ayan's 15-page Mars Atlas research. This is pre-hackathon research only, not a NASA flight safety validation, competition entry, or a processed Jezero raster. The exact runnable Python source, machine-readable JSON, and plot are available in the conversation's downloadable research bundle.

## What was actually calculated

Using Ayan's reported level-walking relation, `VO2(v) = 3.5 + 2.02v + 0.667v²` (ml/kg/min, v in km/h):
- At 3.54 km/h: **19.01 ml/kg/min**, matching the notebook's ~19 anchor.
- At 5.63 km/h: **36.01 ml/kg/min**, matching the notebook's ~36 anchor.
- At 8.3 km / 2.5 km/h plus 3 × 10-minute stops: **3.82 h**, approximately 3h49m, consistent with 3h50m.
- 186m total climb − 26m total descent = **160m net elevation difference**, to be tested against the real route endpoints.
- Claimed held-out image alignment error 140m / 95m routing cell = **1.474 grid cells**. The notebook reports a **21° to 18°** change in steepest slope after alignment refit, crossing its own 20° threshold. Neither image alignment nor slope hazard classification is independently verified here.
- If the stated 679L allocation applies a multiplicative 30% reserve: **522.3L before reserve**, subject to that convention. A 3.0km emergency walk-back radius is **5.3km short of an 8.3km distant endpoint** if that endpoint must be reached by walking back on the reserve alone. The report may use a different return-trip convention; **request clarification before calling it an error**.
- 0.191 mSv across 3h50m corresponds to **1.196 mSv/day** under a constant-rate simplification; not a direct source measurement at Jezero.

### Illustrative exhaustive model grid, not empirical probabilities

Nine explicitly selected factors, each at three values: **3^9 = 19,683** parameter combinations; both one-way and symmetric out-and-back were evaluated, totaling **39,366** model evaluations. Factors: distance (7.4/8.3/9.2km), speed (2/2.5/3km/h), metabolic demand multiplier (0.9/1/1.1), terrain multiplier (1/1.1/1.2), fatigue (1/1.05/1.1), stops per leg (2/3/4), crew member mass (75/82/90kg), rest VO2 (3.5/5/6.5ml/kg/min), and reserve multiplier (1.2/1.3/1.4). Two crew throughout. Code uses time = distance/speed, gas consumed = VO2×mass×time and a separate multiplicative reserve.

| Output | Minimum | Median | Grid 95th percentile | Maximum | Grid fraction <=679L |
|---|---:|---:|---:|---:|---:|
| Outbound-only | 378.53L | 654.28L | 868.76L | 1113.32L | 58.25% |
| Symmetric return | 757.07L | 1308.57L | 1737.51L | 2226.64L | 0% |

**Crucial boundaries:** fractions above are percentages of this author's arbitrarily selected levels, **not estimated success probabilities**. Every full return in this simplified scenario set exceeds 679L; that does NOT establish actual Mars EVA requirements or prove Ayan's code wrong. Real return conditions, suits, oxygen storage P/T, rescue, shadows, dust, fatigue and hazards are not captured. Equal-weight factors have no empirical frequency interpretation.

### Mathematical proof checks

With metabolic rate q in ml/(kg·min), mass M in kg, route length L in km and speed v in km/h: `time_minutes=60L/v`; thus `oxygen_litres=q*M*(60L/v)/1000`. Both unit conversions are required. For a path with waypoints, total path length cannot be smaller than geodesic separation between endpoints. For a trip that returns to base, traversed distance cannot be less than twice the geodesic distance to the farthest point, absent other transport.

Oxygen volume is not mass unless reference pressure and temperature are specified: 679L pure O2 is ~0.97kg at 0°C and 1 atm, versus ~0.89kg at 25°C and 1 atm (ideal-gas approximation).

## Best real official datasets to audit next

- Jezero CTX science 20m elevation **and matched 5m orthomosaic**: https://astrogeology.usgs.gov/search/map/mars_2020_science_investigation_ctx_dem_mosaic
- USGS Jezero CTX TRN elevation: https://www.usgs.gov/data/mars-2020-terrain-relative-navigation-ctx-dtm-mosaic
- USGS Jezero TRN orthorectified image: https://www.usgs.gov/data/mars-2020-terrain-relative-navigation-context-camera-orthorectified-image-mosaic
- NASA Johnson Space Center **preliminary** suit mass study: https://ntrs.nasa.gov/citations/20260005410 (not an empirically validated Martian traversability model)
- Perseverance MEDA PDS (historical Jezero meteorology): https://pds-atmospheres.nmsu.edu/data_and_services/atmospheres_data/PERSEVERANCE/meda.html
- Curiosity RAD (Gale measurements, **not** Jezero): https://science.nasa.gov/resource/radiation-measurements-on-mars/

**No raw USGS TIFF was processed** in this research run: the computational environment could not resolve the S3 data host. Obtaining the real raster, exact coordinate reference, masks, source IDs, published image-to-DEM alignment and route waypoints is the hard gate before claiming measured Jezero hazards.

## Human-performance evidence and visual references

- NASA Apollo 15 time-and-motion: https://ntrs.nasa.gov/citations/19730008096 . Comparable lunar task activity reportedly took about **40% longer on the Moon than in 1g training**; this is not a transferable +40% Mars oxygen multiplier.
- Apollo movement/gaits: https://www.nasa.gov/wp-content/uploads/static/history/alsj/a11/a11.gaits.html . Illustrates variable lunar locomotion.
- NASA JETT mock-suit field exercises: https://www.nasa.gov/humans-in-space/nasa-tests-technology-practices-artemis-moonwalks-in-arizona-desert/ . Highlights the need for operational protocols, field science and communications, not just navigation.
- NASA video, Apollo surface footage: https://svs.gsfc.nasa.gov/10432
- NASA Perseverance rover's real traverse imagery: https://science.nasa.gov/resource/1000-days-of-perseverance/

## Top unresolved verification demands

1. Get Ayan's source commit plus actual start/end/return waypoints and route legs; confirm whether 8.3km is one-way.
2. Confirm O2 litre reference state, mass/capacity, consumption during stops, emergency reserves, and the 3km walk-back semantics.
3. Verify geographic registration against the **matched USGS orthomosaic**, not a hand-aligned display image. Compare location-error perturbations with categorical verdicts.
4. Include off-route rest-stop detours in distance/time/resources.
5. Use an independent crater catalogue and confusion matrix; 81 detections are not 81 validated craters.
6. Treat the radiation single-exponential scaling as a calibrated approximation. Particle environment and radiation quality factors require more evidence.
7. Distinguish measured environmental samples, derived quantities, model assumptions and unknown states in every output.
8. Confirm with NASA organizers what parts, if any, of previously developed Mars Atlas can be reused in an eligible hackathon submission.

### Official rules boundary

NASA 2026 terms: https://www.spaceappschallenge.org/legal/ . Cite all sources and licenses. Do not describe pre-event work as newly built during the hackathon. Minors' recognizable names, faces and voices should not appear in submitted media.

**Next test:** Read *actual* Jezero CTX raster and matched ortho metadata, hash inputs, reproduce one source-pinned route and quantify classification changes under registration uncertainty; otherwise label any map verdict illustrative.
