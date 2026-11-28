"""Mira a tus 200 drones aprender, generación por generación.

Primero corre la simulación (crea tray_seed12.npz y log_seed12.json):
    python drones_cueva.py --gens 10 --seed 12
Luego ábrela en una ventana:
    python ver_drones.py --seed 12              # todas las generaciones, una tras otra
    python ver_drones.py --seed 12 --gen 8      # solo la generación 8
    python ver_drones.py --seed 12 --mp4 drones.mp4   # guarda un video (necesita ffmpeg)

Necesitas: pip install numpy matplotlib
"""
import argparse, json
import numpy as np
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
from matplotlib.colors import ListedColormap
from drones_cueva import Mundo, RES

ap = argparse.ArgumentParser()
ap.add_argument("--seed", type=int, default=12)
ap.add_argument("--gen", type=int, default=0, help="0 = todas")
ap.add_argument("--salto", type=int, default=3, help="pasos de simulación por cuadro (más = más rápido)")
ap.add_argument("--mp4", default="")
a = ap.parse_args()

z = np.load(f"tray_seed{a.seed}.npz")
log = json.load(open(f"log_seed{a.seed}.json", encoding="utf8"))
gens = [g["gen"] for g in log["gens"]] if a.gen == 0 else [a.gen]
mundo = Mundo()
h, w = mundo.libre.shape
ext = [mundo.x0, mundo.x0 + w * RES, mundo.y0, mundo.y0 + h * RES]

fig, ax = plt.subplots(figsize=(7, 9), facecolor="#0a111c")
ax.set_facecolor("#0a111c"); ax.set_aspect("equal"); ax.axis("off")
ax.imshow(mundo.libre.astype(float), origin="lower", extent=ext, cmap=ListedColormap(["#04060b", "#16233a"]), vmin=0, vmax=1)
ax.contour(mundo.libre.astype(float), levels=[0.5], origin="lower", extent=ext, colors="#3D8BFF", linewidths=1.2)
for s, txt in [(mundo.s_paso1, "1.er paso"), (mundo.s_paso2, "2.º paso")]:
    i = int(np.searchsorted(mundo.seg, s)); ax.plot(*mundo.P[i], "o", color="#FFB020", ms=6); ax.text(*mundo.P[i], "  " + txt, color="#FFB020", fontsize=9)
vivos = ax.scatter([], [], s=10, c="#BFE0FF")
caidos = ax.scatter([], [], s=6, c="#5A6270")
lider = ax.scatter([], [], s=60, c="#FFB020", edgecolors="white", zorder=5)
hud = ax.text(0.02, 0.98, "", transform=ax.transAxes, va="top", color="white", fontsize=12, family="monospace")

# cuadros: (generación, paso)
cuadros = []
for g in gens:
    T = z[f"g{g}_tray"].shape[0]
    cuadros += [(g, t) for t in range(0, T, a.salto)] + [(g, T - 1)] * 15  # pausa al final de cada generación
fila = {r["gen"]: r for r in log["gens"]}


def dibujar(k):
    g, t = cuadros[k]
    tr = z[f"g{g}_tray"][t]; L = int(z[f"g{g}_lider"])
    est = tr[:, 3]  # 1 = vuela, 0 = chocó, 2/3 = salió
    vivos.set_offsets(tr[est >= 1][:, :2]); caidos.set_offsets(tr[est < 1][:, :2] if (est < 1).any() else np.empty((0, 2)))
    lider.set_offsets(tr[L:L + 1, :2])
    r = fila[g]
    hud.set_text(f"GENERACIÓN {g}\n1.er paso {r['paso1']:>3}/200\n2.º paso  {r['paso2']:>3}/200\nsalen     {r['salen']:>3}/200")
    return vivos, caidos, lider, hud


anim = FuncAnimation(fig, dibujar, frames=len(cuadros), interval=33, blit=True)
if a.mp4:
    anim.save(a.mp4, fps=30, dpi=120); print("video guardado en", a.mp4)
else:
    plt.show()
