# Candidate Mars data source register (pre-hackathon research)

**Status:** Desk-researched on 2026-10-27. No full science datasets downloaded or processed in this repository. Confirm official challenge detailed resources and event eligibility before implementation.

| Source | Official reference | Relevant measurement | Critical limitation | Next research action |
|---|---|---|---|---|
| MOLA MEGDR | https://pds-geosciences.wustl.edu/missions/mgs/megdr.html | Global topography, observation counts, planetary radius and areoid | 4/16/32/64/128 pixels per degree is generally broad-scale; vertical reference and grid geometry must be respected | Read PDS4 labels and distinguish topography from raw radius |
| MOLA archive context | https://pds-geosciences.wustl.edu/missions/mgs/mola.html | Altimetry provenance and IAU 2000 reference | Historic survey, not current local surface conditions | Record coordinate-system definitions |
| NASA/USGS HiRISE controlled DTM | https://registry.opendata.aws/nasa-usgs-mars-hirise-dtms/ | High-resolution local digital terrain models in COGs | Patchy coverage; uncontrolled HiRISE imagery may not align | Read STAC metadata, WKT2 projection, footprints, pixel units |
| NASA/USGS uncontrolled HiRISE RDR | https://registry.opendata.aws/nasa-usgs-mars-hirise/ | Detailed visible surface imagery | Uncontrolled location; cannot assume alignment with DTM | Investigate registration residuals and controlled alternatives |
| PDS | https://pds.nasa.gov/ | Public missions datasets and archive labels | Variable formats and metadata completeness | Inventory suitable missions and stable product identifiers |

## Required catalog fields

Each selected file should eventually have a unique product ID, URL, archive version, collection, mission/instrument, observation time, acquisition bounds, projection/CRS, Mars longitude convention, grid transform, spatial resolution, vertical reference, units, missing-value codes, scale factors, quality flags, checksum, license/citation, and access date.

## Scientific stop conditions

- No declared CRS or coordinate frame: don't display as geolocated evidence.
- No units or scale factor: don't perform physical calculations.
- No independently supported hazard threshold: don't label a pixel 'safe'.
- No valid spatial overlap: don't pretend datasets describe the same site.
- Missing values: preserve mask; don't replace with traversable terrain.
- Uncontrolled images: do not overlay on controlled DTMs as though pixel-aligned.
- Model outputs: display their assumptions and validation status.

## Resolution intuition

At the equator, 1 degree is roughly 59 km on Mars (spherical radius ~3389.5 km, illustrative approximation). A 128-pixel/degree product is roughly 460 m per cell at the equator, not sufficient to measure individual boulders or human foot hazards. Record exact geodetic geometry instead of using this rough conversion in final science calculations.

## Candidate research questions

1. Can a verified controlled DTM and aligned image be located for the same candidate region?
2. Which source provides a reliable local elevation product rather than only visualization?
3. What are the quality masks and gaps?
4. What data can support science-destination annotation without inventing coordinates?
5. Which uncertainty statements are supported by published mission documentation?
