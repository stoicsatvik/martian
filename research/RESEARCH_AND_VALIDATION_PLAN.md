# Martian Research and Validation Plan

**Preparation-only document.** No competition solution or challenge-specific implementation should be created before the event without confirmation that the rules permit it.

## Research objective

Clarify what could be scientifically justified about route and mission planning from heterogeneous Mars observations. Separate **data availability**, **software functioning**, **physical-model adequacy**, and **operational safety**, which are different claims.

## Workstreams

### A. Geodesy

Study areocentric/planetocentric vs planetographic latitude; positive-east vs positive-west longitude; 0–360 vs -180–180 intervals; simple cylindrical vs polar stereographic projections; areoid/ellipsoid/radius; coordinate precision; map scale versus ground sampling.

**Readiness check:** explain the coordinate transformation for a hypothetical raster, with tests at edges and longitude wraparound.

### B. Instrument and data provenance

Read MOLA and HiRISE instrument/product documentation. Describe acquisition time, error sources, resolution, observation footprint, and what cannot be inferred from each data product. Investigate controlled versus uncontrolled images.

**Readiness check:** one source-quality dossier with product metadata and explicit unknowns.

### C. Terrain and graph theory

Study raster derivatives, slope estimation, gap masks, neighborhood graph construction, Dijkstra and A* with admissible heuristics, dimensional consistency, obstacle handling, energy budgets and Pareto fronts. Use abstract examples unrelated to any challenge area to practice.

**Readiness check:** explain why minimum distance and minimum assumed travel cost differ, and why a shortest path need not be operationally safe.

### D. Uncertainty and validation

Understand deterministic test fixtures, coordinate-registration residuals, perturbation/sensitivity analysis, missingness stress tests, route stability, resolution convergence, overfitting and data leakage.

**Readiness check:** written protocol showing how one would disprove an apparent improvement. No invented ground truth or risk thresholds.

### E. Interface and evidence

Review geospatial UI libraries and accessibility. A map must preserve source context and distinguish measured data, derived quantities and hypothetical assumptions.

**Readiness check:** written comparison of interface approaches (no challenge-specific design build prior to event).

## Proposed challenge-day evaluation hierarchy (not executed)

1. Source correctness: labels, checksum, projection, units, masks
2. Calculation correctness: independent numerical sanity controls
3. Geographic correctness: pixel placement and registration
4. Baseline comparison: distance-only versus terrain-aware planner, if relevant
5. Sensitivity: uncertainty and weight perturbations
6. Failure handling: missing coverage, unreachable destination, contradictory inputs
7. Scientific interpretation: limits and provenance visible to judges

## Performance discipline

Measure before parallelizing. Prefer chunked, spatially windowed processing, cached derived tiles, vectorized arrays and bounded queues. Document reproducibility seeds and code versions. A trillion arbitrary iterations do not imply higher scientific confidence.

## Hypotheses to test on event day if permitted

- Higher-resolution controlled DTMs can yield materially different route assessments than coarse MOLA alone.
- A distance-only baseline may ignore terrain variation; a weighted planner may produce different paths, but ranking reliability depends on uncertainty assumptions.
- Missing-data sensitivity may dominate planner confidence.
- Uncontrolled imagery may exhibit measurable misregistration against controlled elevation products.

These are proposals, NOT validated findings.

## Team roles

Project lead and integration; GIS/geodesy; scientific analysis; route algorithms; frontend and map visualization; quality assurance/scientific presentation. Rebalance according to confirmed team skills.

## Schedule

- Oct 27: create research charter, source register and validation protocol.
- Oct 28: read detailed official challenge brief; separate requirements from proposals.
- Oct 29–Nov 3: literature/data-product metadata reading, recruit science/GIS collaborator.
- Nov 4–8: general skill drills in GIS, graph theory, projections and robust testing.
- Nov 9–13: team rehearsals, review rules, make integration and submission checklist; no actual entry implementation.
- Nov 14–15: create the competition-specific code and deliverable, run tests and submit.

Official event timeline: https://www.spaceappschallenge.org/2026/
