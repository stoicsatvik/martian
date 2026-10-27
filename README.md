# MARTIAN

**Status:** Pre-hackathon preparation only  
**Event:** NASA International Space Apps Challenge 2026, November 14–15  
**Challenge candidate:** [Interplanetary Survival Guide: Martian Map](https://www.spaceappschallenge.org/2026/challenges/interplanetary-survival-guide-martian-map/)  
**Maintainer:** stoicsatvik  
**Repository purpose:** Team coordination, challenge research notes, data-source discovery, skills preparation, and experiment governance.

> This repository does **not** yet contain a hackathon solution or validated Mars navigation product. Work on the actual competition entry is reserved for the authorized event period, subject to the official rules.

## Mission statement

Investigate how multiple Mars science datasets could support evidence-based human exploration decisions. Our goal during the hackathon is to create a clear, useful, original demonstration grounded in real observations, reproducible computation, and explicit uncertainty.

A visually convincing map is not sufficient. We must be able to distinguish an observation from a model assumption, an exploratory metric from validated risk, and a hypothetical itinerary from certified astronaut navigation.

## Confirmed event information

- Dates: **14–15 November 2026**
- Team size: **1–6**, everyone must register
- Project submission: through the NASA Space Apps team project page; official global schedule lists November 15, 11:59 PM local time
- Full challenge details/resources: expected **October 28, 2026**; revisit and replace preliminary interpretations
- All team members should select the same Local Event or Universal Event according to the official event guidance

Sources:
- https://www.spaceappschallenge.org/2026/
- https://www.spaceappschallenge.org/2026/challenges/interplanetary-survival-guide-martian-map/
- https://www.spaceappschallenge.org/legal/

## Questions to resolve after the detailed challenge release

1. What is explicitly mandatory, and what is merely suggested?
2. Which datasets are explicitly recommended by NASA?
3. Is a specific Martian region, route, audience, or scientific mission required?
4. What precise project formats, demo materials, provenance and disclosure requirements apply?
5. Which decisions can genuinely be supported by the supplied observations?
6. What can be completed and checked within the event window?

## Preparation tracks (before November 14)

| Track | Learn/review | Readiness evidence |
|---|---|---|
| Geospatial science | Coordinate reference systems, raster grids, projection and resolution | Explain pixel-to-location conversion with a general example |
| Planetary data | PDS documentation, MOLA, CTX, HiRISE and mission metadata | Trace dataset provenance and limitations |
| Scientific reasoning | Error propagation, resolution mismatch, missing data, confounders | Write a short data-claims audit |
| Algorithms | Graphs, A*, Dijkstra, constrained optimization | Explain optimality assumptions on a toy graph unrelated to the challenge |
| Interface engineering | Map rendering, progressive detail, accessible layer toggles | Compare candidate libraries, no challenge-specific interface yet |
| Integration | Reproducible environments, CI, reviews, deployment rehearsals | Agree on team workflow and version pinning |
| Presentation | Evidence-led storytelling and source citations | Study previous public hackathon examples |

Preparation means studying general techniques and reading documentation, **not** generating the project's routes, screens, data pipelines, or solution code early.

## Possible source families to research

These are leads, not confirmed suitable sources or an implementation plan:

- NASA Planetary Data System (PDS): https://pds.nasa.gov/
- Mars Orbiter Laser Altimeter (MOLA)
- Mars Reconnaissance Orbiter Context Camera (CTX)
- High Resolution Imaging Science Experiment (HiRISE)
- Perseverance and Curiosity mission public data and documentation

For every candidate dataset, record: owning mission, product ID, source URL, coordinate frame, geographic coverage, spatial resolution, units, missing-value conventions, uncertainty, license/terms, and acquisition or processing date.

## Non-negotiable scientific standards

1. **No invented coordinates, routes, terrain measurements, or hazards.**
2. Do not call a route 'safe' without explicitly specifying the risk model and its evidence limits.
3. Preserve source provenance and distinguish observed data from derived quantities.
4. Missing data must remain visible; don't silently classify it as traversable.
5. Cross-dataset registration must have a documented coordinate system, resolution and alignment test.
6. Any ranking model needs baseline comparisons and sensitivity tests.
7. Separate proof of software correctness from empirical proof of scientific usefulness.
8. Document AI-assisted work and pre-existing research in the final submission as required by the published rules.

## Team formation

Seeking collaborators in:
- GIS / planetary science / geology
- Data ingestion, geospatial Python, raster processing
- Frontend, interactive visualization, accessibility
- Algorithms, testing and reproducibility
- Scientific communication, technical writing, presentation

Team limit is six, but role assignment depends on actual demonstrated skills. Don't duplicate five generalist coders while leaving geospatial validation uncovered.

## Decision gates

**Gate 0 — Now:** official registration, recruitment, challenge reading, scientific background, tooling decisions. No solution implementation.  
**Gate 1 — October 28:** verify detailed official brief; update requirements and shortlist datasets.  
**Gate 2 — November 13:** read latest official participant/submission guidance; freeze responsibilities and approved preparation artifacts.  
**Gate 3 — November 14–15:** implement, validate, document, demonstrate and submit the original hackathon project.

## Competition-day acceptance criteria (provisional)

- A working demonstration addressing the detailed NASA brief.
- Real NASA/partner data visibly used and cited.
- Reproducible, documented processing or analysis.
- Clear distinction between measured quantities and assumptions.
- Evidence-backed comparison to at least one simple baseline where relevant.
- Useful explanation of limitations and data gaps.
- Accessible demo and completed submission with required disclosures.

These are **our proposed quality gates**, not an official NASA judging rubric.

## Related prior work

Previous experimental research exists at https://github.com/stoicsatvik/NASA . Treat it as background/pre-existing work. It is not automatically a competition deliverable or evidence that a Martian route planner is validated. Reuse must comply with official rules and be disclosed.

## Collaboration practice

Use GitHub issues for research questions and work assignments, pull requests for review, source URLs for data claims, and short decision records for architecture changes. The repository's first code should be authored during the allowed competition window, after the team confirms the rules.
