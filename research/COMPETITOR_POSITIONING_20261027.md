# Pre-event public competitor and rules audit | 27 October 2026

**Scope:** Public, self-reported team descriptions on the official 2026 NASA Space Apps website. No outreach, scraping of private accounts, access-control bypass, challenge solution code, routes, maps or project submission. This is **pre-event competitive intelligence**, not evidence that a rival has shipped or validated anything.

## Four independently discoverable Martian Map team profiles

| Public team | Official page | Self-described direction | What is actually verified |
|---|---|---|---|
| ARES (Sydney) | https://www.spaceappschallenge.org/2026/find-a-team/ares12/ | NASA-data Martian interactive map; route planning framed as safe and scientifically interesting | The public team description exists. Route safety, dataset integration and working demo are **not independently verified**. |
| Delta Dune / Delta V (Universal Event) | https://www.spaceappschallenge.org/2026/find-a-team/delta-dune/ | Team claims prior robot-swarm AI research and a working simulator | Only the **self-report** is verified. No simulator, publication or benchmark was independently inspected in this audit. |
| 6C1.2 (Hanoi) | https://www.spaceappschallenge.org/2026/find-a-team/6c12-space-challenge/ | Proposed map of terrain, hazards, scientific sites and routes | The public description exists; technical implementation and validation **unknown**. |
| ANGARAKA-X (Delhi) | https://www.spaceappschallenge.org/2026/find-a-team/angaraka-x/ | Interactive Mars survival/navigation guide | The public description exists; technical implementation and validation **unknown**. |

**Sampling limitation:** This is a non-random convenience sample of four publicly indexed team pages, **not** an exhaustive competitor census or a ranking of the reported hundreds of teams. Teams may change their direction; marketing statements are not verified engineering evidence.

## Pre-event strategic inference (NOT a competition solution)

At least three sampled teams explicitly propose some form of map, navigation, hazard or route interface. Therefore, **a layered map and route line alone are weak differentiation hypotheses**. This does not establish any competitor's actual capabilities.

The most discriminating *future evaluation questions* are:

1. Can a published hazard label be traced to a NASA/partner measurement with units, projection, resolution, acquisition time and missing-data rules?
2. Can any proposed route-risk ranking beat a transparent simple baseline under held-out sites and changed assumptions?
3. Are terrain, thermal, radiation, visibility and communications claims physically comparable across instruments and dates?
4. Can the system distinguish `unknown` from `safe`, and show sensitivity to uncertain or absent observations?
5. Does a demonstration preserve scientific caveats instead of describing an uncertified path as astronaut-safe?

These are **research/evaluation criteria only**, not implemented features or pre-built competition artifacts. Do not implement challenge-specific routing or UI before the allowed event period.

## Official event and legal boundary

- Official 2026 page: https://www.spaceappschallenge.org/2026/ . Event **14–15 November 2026**; project submission opens **14 November at 09:00** and closes **15 November at 23:59 local event time**.
- Full challenge statements/resources expected **28 October 2026** per published 2026 event schedules; replace any preliminary interpretation after release.
- Official 2026 terms (updated 7 August 2026): https://www.spaceappschallenge.org/legal/ . **Under-18 participants require registration by a parent/legal guardian and accompaniment during the event**. All used sources and third-party licenses must be disclosed, and recognizable names/faces/voices of minors must not appear in submitted media. Check the full official terms and local-event guidance before any participation.
- The repo's declared policy reserves challenge solution implementation for **14–15 November**. This audit does not modify that policy.

## Decision and next evidence gate

**Current claim:** A generic layered map/route pitch is already publicly proposed by multiple teams (SUPPORTED AS SELF-REPORTED DESCRIPTIONS). No competitor's simulator, routes, code, science, team strength, ranking or likelihood of winning is validated.

**Next (28 October):** Read the complete official Martian Map brief, list required versus optional data and outputs, confirm rules and permitted pre-existing materials, and compare its evidence requirements with the planetary-analogue challenge and all other official challenge choices. Keep `stoicsatvik/NASA` prior research separate and disclose any authorized reuse.

**No claims of NASA certification, route safety, competitor superiority, original discovery or successful submission.**
