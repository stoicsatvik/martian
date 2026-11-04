# MARTIAN pre-event radiation dimensional and transferability audit (2026-11-04)

**Scope:** Independent source-based desk review and explicitly synthetic arithmetic. No Jezero radiation measurements, particle transport, shielding simulation, MEDA samples, Ayan code, or competition submission built.

## New verified distinctions

1. NASA's Curiosity RAD chart reports **absorbed dose rate** approximately **210 microgray/day** from predominantly GCR in Gale Crater during the first ten months (2012–2013). This is NOT 210 microsievert/day, and is not Jezero-specific. https://science.nasa.gov/resource/radiation-measurements-on-mars/
2. A 2021 review of MSL/RAD measurements and models reports **dose equivalent** rates approximately **0.25–0.95 mSv/day** under varying solar conditions, and a LET-derived average radiation quality factor **2.4 ± 0.3**. This range is not a Jezero forecast, an EVA exposure bound, or a guaranteed safe limit. https://doi.org/10.1007/s00159-021-00136-5
3. Köhler et al. (2014) infer neutral-particle neutron dose rate **14 ± 4 microgray/day** and dose-equivalent rate **61 ± 15 microsievert/day** for **8–740 MeV** neutrons from RAD; neutron unfolding adds nontrivial detector-response uncertainty. https://doi.org/10.1002/2013JE004539
4. NASA reports a **4% reduction in overall RAD radiation** and **7.5% reduction in neutral particle radiation** near a cliff at Gale (September 2016). A localized measured geometric effect, not a universal shielding factor transferable to arbitrary Jezero craters. https://www.nasa.gov/missions/mars-science-laboratory/how-nasas-curiosity-rover-is-making-mars-safer-for-astronauts/
5. A September 2017 solar particle event produced a **2–3-fold surface dose-rate increase** above background, according to multi-mission synthesis. A static GCR background alone cannot bound episodic SEP hazard. https://doi.org/10.1029/2018GL079162
6. NASA's 2002 Mars Odyssey surface map is a **modelled annual dose-equivalent map**, generally **10–20 rem/year** (= **100–200 mSv/year**, using 1 rem = 10 mSv), not a directly measured current Jezero dose map. https://science.nasa.gov/photojournal/estimated-radiation-dosage-on-mars/

## Independent numerical check (synthetic transfer, not a Jezero estimate)

Earlier Ayan research reports **0.191 mSv** over **3 h 50 min**. Time = 23/6 h = 0.1597222 day. Thus required constant dose-equivalent rate is 0.191/(23/144) = **1.195826 mSv/day**. This exceeds the cited review's 0.25–0.95 mSv/day *illustrative comparison range*, but is not disproved: exposure type, event conditions, suit shielding, and reference site/time are unspecified.

At the published 0.25–0.95 mSv/day **Gale reference range**, 3 h 50 min would correspond to **0.03993–0.15174 mSv** if rate remained constant. These are *synthetic time integrations*, not Jezero measurements or safety limits.

Separately, the NASA 210 microgray/day **absorbed dose** rate would yield **33.54 microgray** in 3 h 50 min. DO NOT compare 33.54 microgray numerically to 0.191 mSv without radiation weighting, detector medium, organ/geometry, and dose-equivalent conventions.

```python
hours=3+50/60
days=hours/24
print('days',days)
print('implied mSv/day',0.191/days)
print('synthetic mSv range',0.25*days,0.95*days)
print('synthetic absorbed microGy',210*days)
assert abs(0.191/days-1.1958260869565218)<1e-10
```

## Falsification and next source-data gates

- Obtain Ayan's actual radiation formula, baseline, output quantity (Gy, Sv, dose equivalent or effective dose), route clock, and suit shielding mass/areal density **g/cm²**. No arbitrary exponential shielding factor is validated here.
- Specify particle spectra and energy, incident angular distribution, atmospheric column density, shielding composition, secondary neutrons, dose conversion and uncertainty. Report GCR and SEP separately.
- If using RAD archived records, acquire product IDs, calibrated data and labels; document Gale location and dates. Do not call Gale observations Jezero measurements.
- Crater proximity is not a validated dose reduction: local horizon geometry and particle angular distribution require simulation/measurement.
- Ayan's reported 0.191 mSv cannot be endorsed or rejected without model provenance; treat as unverified.

**Status:** Sources above consulted 2026-11-04; no raw RAD time series processed. No NASA endorsement implied.
