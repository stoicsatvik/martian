# MARTIAN pre-event research: MEDA provenance and oxygen accounting (2026-11-04)

**Scope:** Independent review of NASA/PDS documentation and synthetic arithmetic only. No raw MEDA data, Ayan source code, Jezero raster or astronaut telemetry processed. No competition submission code.

## Verified findings

1. MEDA's official PDS bundle is `urn:nasa:pds:mars2020_meda`. Calibrated products include pressure (mbar), temperature (K), wind (m/s), irradiance (W/m²) and humidity (%RH). Products are historical rover-location observations, not spatial weather forecasts. Sources: https://an.rsl.wustl.edu/help/Content/About%20the%20data/Data%20sets/M20/MEDA%20bundle.htm and https://pds-atmospheres.nmsu.edu/data_and_services/atmospheres_data/PERSEVERANCE/meda.html
2. MEDA RDR records are organized by sol and subsystem; PDS4 XML labels accompany CSV data. Clock references include SCLK, LMST and LTST. A sol file can have incomplete coverage; version numbers can change with recalibration. Source: https://pdsatmospheres.nmsu.edu/data_and_services/atmospheres_data/PERSEVERANCE/meda_07212021.html
3. MEDA's **Radiation and Dust Sensor (RDS)** measures optical/solar radiative forcing and dust, **not astronaut ionizing-radiation effective dose (mSv)**. Do not feed its radiation measurements into an astronaut dosimetry model. Source: PDS MEDA instrument description above.
4. Harri et al. (2024), DOI 10.1029/2023JE007880, report MEDA pressure sensor estimated absolute accuracy better than **3.5 Pa** and resolution **0.13 Pa**, evaluated in the first 414 sols. These are sensor specifications, not weather-interpolation accuracy. https://doi.org/10.1029/2023JE007880
5. NASA human-performance standards distinguish VO2max aerobic capacity from task VO2 consumption. The **32.9 mL/(kg min)** fitness-for-duty threshold for microgravity EVA is **not** a measured Mars walking rate. https://www.nasa.gov/reference/4-0-human-performance/

## Synthetic dimensional validation of Ayan's reported equation

Reported relation `q(v)=3.5+2.02v+0.667v²`, with numerical `v` in km/h and `q` in mL/(kg min), gives `q(2.5)=12.71875`. For a **synthetic** two-person crew, 82 kg each, 8.3 km single leg at 2.5 km/h:

- Walking time = 3.32 h = 199.2 min.
- Walking oxygen = `12.71875*82*2*199.2/1000 = 415.5063 L`.
- Three 10-min rest stops at assumed `q_rest=3.5`: `3.5*82*2*30/1000 = 17.22 L`.
- One-way total = **432.7263 L**, excluding suit losses and reserve.
- Symmetric return with identical stops = **865.4526 L**, excluding suit losses and reserve.

These figures are model arithmetic, not observed EVA consumables. Body mass vs suited mass in the equation must be validated against the equation's calibration population. Do not compare these gas-volume equivalents to tank geometric volume: gas reference pressure and temperature, compressibility, usable pressure, regulator and reserve policies matter. Compare moles or mass using a documented reference state.

```python
v,L,M,crew,rest=2.5,8.3,82,2,30
q=3.5+2.02*v+0.667*v*v
walking=q*M*crew*(60*L/v)/1000
stops=3.5*M*crew*rest/1000
print(q, walking, stops, walking+stops, 2*(walking+stops))
```

## Falsification gates

1. Obtain Ayan's exact source code, coefficient provenance, return route and whether the 679 L capacity is per-person or crew total; record gas reference P,T and suit loss terms.
2. Download one **calibrated** MEDA PS/ATS/WIND product with XML label and record LIDVID, sol, clock system, quality/missing codes, units and time coverage before charting.
3. Keep MEDA RDS separate from particle dosimetry; a radiation model needs particle spectra, shielding areal density (g/cm²), and a justified dose conversion.
4. No flight-certified oxygen or safe-route claim without empirical calibration.

**Status:** official documentation and published sensor specifications inspected; only synthetic arithmetic calculated.
