"""Pre-event, synthetic numerical proof controls ONLY; not a Martian raster or route engine.
Requires numpy. Run: python research/geospatial_proof_controls.py
"""
import numpy as np

# Prove grid-gradient estimator reproduces an analytic plane with metre units.
rows, cols, cell_m = 81, 101, 20.0
c, r = np.meshgrid(np.arange(cols), np.arange(rows))
a, b = .05, .12
z = a*(cell_m*c) + b*(cell_m*r) - 2550.0
dz_dr, dz_dc = np.gradient(z, cell_m, cell_m)
true_slope_deg = np.degrees(np.arctan(np.hypot(a,b)))
found_slope_deg = np.degrees(np.arctan(np.hypot(dz_dc,dz_dr)))
assert np.allclose(found_slope_deg, true_slope_deg, atol=1e-9)

# Rotation matters: derivatives of z wrt pixel coords are J^T times
# its true (map-metre) gradient. Invert J^T to recover physical slope.
theta = np.deg2rad(17)
J = cell_m*np.array([[np.cos(theta),-np.sin(theta)],
                     [np.sin(theta), np.cos(theta)]])
dzd_pixel = J.T @ np.array([a,b])
recovered = np.linalg.solve(J.T, dzd_pixel)
assert np.allclose(recovered, [a,b], atol=1e-12)

# Coarse averaging can conceal narrow features; this is an invented toy example.
fine = np.zeros((100,100),dtype=float)
fine[:,48:50]=100.
coarse=fine.reshape(10,10,10,10).mean(axis=(1,3))
assert fine.max()==100 and coarse.max()==20

print(f"PASS: synthetic plane slope {true_slope_deg:.8f} deg, rotated affine recovered.")
print("PASS: synthetic 2m feature reduced from 100 to 20m as 10m cell mean.")
print("This code did NOT access NASA/USGS datasets or measure actual Mars terrain.")
