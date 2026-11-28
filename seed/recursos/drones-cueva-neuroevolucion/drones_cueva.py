"""Neuroevolución: 200 drones aprenden a cruzar una cueva (vista cenital).

Red por dron: 8 entradas (7 sensores de distancia + velocidad) -> 6 ocultas (tanh) -> 2 salidas (giro, acelerador).
Algoritmo genético: cada generación se ordenan por distancia recorrida; los 20 mejores se copian
con pequeños errores (ruido gaussiano) para formar la siguiente. El mejor pasa intacto.

Uso:
  python drones_cueva.py --preview            # dibuja la cueva en cueva_preview.png
  python drones_cueva.py --gens 10 --seed 12   # la corrida del reel: guarda log_seed12.json + tray_seed12.npz
  python ver_drones.py --seed 12               # míralos aprender (necesita matplotlib)

Necesitas: pip install numpy (y matplotlib para verlos). Cambia la cueva en TRAMOS o prueba otras semillas.
"""
import argparse, json, math, time, datetime
import numpy as np

# ---------------- cueva ----------------
RES = 2.0  # px de mundo por celda

# (tipo, parámetro, ángulo/longitud, semiancho al final del tramo, etiqueta)
TRAMOS = [
    # entrada
    ("S", 260, None, 62, None),
    ("A", 140, -90, 56, None),        # a la derecha
    ("S", 180, None, 50, None),
    # serpentín: dos horquillas amplias
    ("A", 95, 180, 46, None),
    ("S", 260, None, 48, None),
    ("A", 95, -180, 44, None),
    ("S", 120, None, 46, None),
    # chicane
    ("A", 60, 70, 38, None),
    ("A", 60, -140, 36, None),
    ("A", 60, 70, 40, None),
    ("S", 120, None, 44, None),
    # paso 1: horquilla estrecha
    ("A", 100, 180, 22, "paso1"),
    ("S", 220, None, 42, None),
    ("A", 110, -90, 44, None),
    ("S", 120, None, 40, None),
    # S doble
    ("A", 75, -110, 34, None),
    ("A", 75, 160, 32, None),
    ("A", 75, -50, 38, None),
    ("S", 160, None, 40, None),
    ("A", 120, -60, 40, None),
    ("S", 100, None, 34, None),
    # paso 2: S cerrada, muy estrecha
    ("A", 56, -125, 18, None),
    ("A", 56, 125, 18, "paso2"),
    ("S", 120, None, 38, None),
    ("A", 150, 70, 50, None),
    ("S", 300, None, 72, "salida"),
]
RUGOSIDAD = True  # paredes irregulares (roca)


def construir_cueva():
    pts, hw, marcas = [(0.0, 0.0)], [70.0], {}
    x, y, th = 0.0, 0.0, math.pi / 2
    h_prev = 70.0
    step = 2.0
    for tipo, a, b, h_fin, etiqueta in TRAMOS:
        if tipo == "S":
            n = int(a / step)
            for i in range(n):
                x += step * math.cos(th); y += step * math.sin(th)
                pts.append((x, y)); hw.append(h_prev + (h_fin - h_prev) * (i + 1) / n)
        else:
            r, ang = a, math.radians(b)
            n = int(abs(ang) * r / step)
            dth = ang / n
            for i in range(n):
                th += dth
                x += step * math.cos(th); y += step * math.sin(th)
                pts.append((x, y)); hw.append(h_prev + (h_fin - h_prev) * (i + 1) / n)
        h_prev = h_fin
        if etiqueta:
            marcas[etiqueta] = len(pts) - 1
    P = np.array(pts); H = np.array(hw)
    seg = np.r_[0, np.cumsum(np.hypot(*np.diff(P, axis=0).T))]
    if RUGOSIDAD:
        H = H * (1 + 0.10 * np.sin(seg / 41.0) + 0.07 * np.sin(seg / 17.0 + 2.0))
    return P, H, seg, marcas


SOLAPES = []


def rasterizar(P, H, seg):
    m = H.max() + 20
    x0, y0 = P[:, 0].min() - m, P[:, 1].min() - m
    x1, y1 = P[:, 0].max() + m, P[:, 1].max() + m
    W, Hh = int((x1 - x0) / RES) + 1, int((y1 - y0) / RES) + 1
    libre = np.zeros((Hh, W), bool)
    prog = np.full((Hh, W), -1.0, np.float32)
    for (px, py), h, s in zip(P, H, seg):
        cx, cy, rr = (px - x0) / RES, (py - y0) / RES, h / RES
        ix0, ix1 = int(cx - rr), int(cx + rr) + 2
        iy0, iy1 = int(cy - rr), int(cy + rr) + 2
        yy, xx = np.mgrid[iy0:iy1, ix0:ix1]
        d = (xx - cx) ** 2 + (yy - cy) ** 2 <= rr * rr
        sub = prog[iy0:iy1, ix0:ix1]
        # control de solape: celdas (con pared de 12 px) ya pintadas por un tramo lejano
        rr2 = (h + 12) / RES
        jx0, jx1, jy0, jy1 = int(cx - rr2), int(cx + rr2) + 2, int(cy - rr2), int(cy + rr2) + 2
        y2, x2 = np.mgrid[jy0:jy1, jx0:jx1]
        d2 = (x2 - cx) ** 2 + (y2 - cy) ** 2 <= rr2 * rr2
        prev = prog[jy0:jy1, jx0:jx1][d2]
        if ((prev >= 0) & (prev < s - 4 * H.max())).any():
            SOLAPES.append(round(float(s)))
        # progreso = s del punto de la línea central más cercano (aprox.: el de mayor s que cubre)
        sub[d] = np.maximum(sub[d], s)
        libre[iy0:iy1, ix0:ix1] |= d
    return libre, prog, (x0, y0)


# ---------------- red y simulación ----------------
N_IN, N_HID, N_OUT = 8, 6, 2
N_W = N_IN * N_HID + N_HID + N_HID * N_OUT + N_OUT  # 68
ANG_SENS = np.radians([-90, -55, -25, 0, 25, 55, 90])
SENS_MAX, SENS_STEP = 150.0, 4.0
V_MIN, V_MAX, V_INI = 2.5, 8.0, 4.0
GIRO, ACEL = 0.065, 0.25


def red(W, x):
    o = 0
    W1 = W[:, o:o + N_IN * N_HID].reshape(-1, N_IN, N_HID); o += N_IN * N_HID
    b1 = W[:, o:o + N_HID]; o += N_HID
    W2 = W[:, o:o + N_HID * N_OUT].reshape(-1, N_HID, N_OUT); o += N_HID * N_OUT
    b2 = W[:, o:o + N_OUT]
    h = np.tanh(np.einsum("ni,nih->nh", x, W1) + b1)
    return np.tanh(np.einsum("nh,nho->no", h, W2) + b2)


class Mundo:
    def __init__(self):
        self.P, self.H, self.seg, self.marcas = construir_cueva()
        self.libre, self.prog, (self.x0, self.y0) = rasterizar(self.P, self.H, self.seg)
        self.s_total = self.seg[-1]
        self.s_paso1 = self.seg[self.marcas["paso1"]]
        self.s_paso2 = self.seg[self.marcas["paso2"]]
        self.s_salida = self.seg[self.marcas["salida"]] - 40

    def celda(self, x, y):
        ix = ((x - self.x0) / RES).astype(int); iy = ((y - self.y0) / RES).astype(int)
        ok = (ix >= 0) & (iy >= 0) & (ix < self.libre.shape[1]) & (iy < self.libre.shape[0])
        ix = np.clip(ix, 0, self.libre.shape[1] - 1); iy = np.clip(iy, 0, self.libre.shape[0] - 1)
        return ok & self.libre[iy, ix], self.prog[iy, ix]

    def sensores(self, x, y, th):
        n = len(x)
        a = th[:, None] + ANG_SENS[None, :]
        dist = np.full((n, len(ANG_SENS)), SENS_MAX)
        vivo = np.ones((n, len(ANG_SENS)), bool)
        for d in np.arange(SENS_STEP, SENS_MAX + 1e-6, SENS_STEP):
            px = x[:, None] + d * np.cos(a); py = y[:, None] + d * np.sin(a)
            libre, _ = self.celda(px.ravel(), py.ravel())
            golpe = vivo & ~libre.reshape(n, -1)
            dist[golpe] = d
            vivo &= ~golpe
            if not vivo.any():
                break
        return dist


def simular(mundo, W, max_pasos=2500, guardar=False, rng=None):
    n = len(W)
    x = np.zeros(n) + rng.uniform(-14, 14, n)
    y = np.zeros(n) + rng.uniform(-6, 6, n) + 10
    th = np.full(n, math.pi / 2); v = np.full(n, V_INI)
    vivo = np.ones(n, bool); salio = np.zeros(n, bool)
    s_max = np.zeros(n); sin_avance = np.zeros(n, int); paso_fin = np.full(n, max_pasos)
    tray, rays = [], []
    for t in range(max_pasos):
        d = mundo.sensores(x, y, th)
        ent = np.c_[d / SENS_MAX, (v - V_MIN) / (V_MAX - V_MIN)]
        o = red(W, ent)
        act = vivo & ~salio
        th = np.where(act, th + GIRO * o[:, 0], th)
        v = np.where(act, np.clip(v + ACEL * o[:, 1], V_MIN, V_MAX), v)
        x = np.where(act, x + v * np.cos(th), x); y = np.where(act, y + v * np.sin(th), y)
        libre, s = mundo.celda(x, y)
        choca = act & ~libre
        vivo &= ~choca
        paso_fin[choca] = t
        mejora = act & libre & (s > s_max + 0.5)
        sin_avance = np.where(mejora, 0, sin_avance + 1)
        s_max = np.where(act & libre, np.maximum(s_max, s), s_max)
        atasco = act & libre & (sin_avance > 90)
        vivo &= ~atasco; paso_fin[atasco] = t
        nuevo = act & libre & (s_max >= mundo.s_salida)
        salio |= nuevo; paso_fin[nuevo] = t
        if guardar:
            tray.append(np.stack([x, y, th, vivo.astype(float) + salio * 2], 1).astype(np.float32))
            rays.append(d.astype(np.float16))
        if not (vivo & ~salio).any():
            break
    fit = s_max + salio * (2000 - paso_fin)
    return fit, s_max, salio, paso_fin, (np.array(tray), np.array(rays)) if guardar else None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--seed", type=int, default=7)
    ap.add_argument("--gens", type=int, default=40)
    ap.add_argument("--pop", type=int, default=200)
    ap.add_argument("--elite", type=int, default=20)
    ap.add_argument("--sigma", type=float, default=0.15)
    ap.add_argument("--prob", type=float, default=0.1)
    ap.add_argument("--preview", action="store_true")
    ap.add_argument("--out", default=".")
    a = ap.parse_args()
    mundo = Mundo()
    if a.preview:
        from PIL import Image
        img = np.where(mundo.libre, 40, 0).astype(np.uint8)[::-1]
        Image.fromarray(img).save(f"{a.out}/cueva_preview.png")
        print("largo", round(mundo.s_total), "paso1", round(mundo.s_paso1), "paso2", round(mundo.s_paso2),
              "grid", mundo.libre.shape, "pesos", N_W, "solapes", SOLAPES[:5], len(SOLAPES))
        return
    rng = np.random.default_rng(a.seed)
    W = rng.normal(0, 1, (a.pop, N_W))
    log, trays = [], {}
    t0 = time.time()
    for g in range(1, a.gens + 1):
        fit, s_max, salio, paso_fin, (tr, ry) = simular(mundo, W, guardar=True, rng=rng)
        orden = np.argsort(-fit)
        fila = dict(gen=g,
                    paso1=int((s_max >= mundo.s_paso1).sum()),
                    paso2=int((s_max >= mundo.s_paso2).sum()),
                    salen=int(salio.sum()),
                    mejor_s=round(float(s_max.max()), 1),
                    lider=int(orden[0]))
        log.append(fila)
        tr = tr.astype(np.float32)
        tr[:, :, 2] = np.mod(tr[:, :, 2] + np.pi, 2 * np.pi) - np.pi  # rumbo en [-pi, pi)
        trays[f"g{g}_tray"] = tr
        trays[f"g{g}_rays"] = ry
        trays[f"g{g}_lider"] = np.array(orden[0])
        print(fila, f"{time.time()-t0:.1f}s", flush=True)
        elites = W[orden[:a.elite]]
        hijos = elites[rng.integers(0, a.elite, a.pop - 1)]
        mask = rng.random(hijos.shape) < a.prob
        hijos = hijos + mask * rng.normal(0, a.sigma, hijos.shape)
        W = np.vstack([elites[:1], hijos])
    meta = dict(fecha=datetime.date.today().isoformat(), seed=a.seed, pop=a.pop, elite=a.elite,
                sigma=a.sigma, prob=a.prob, red=f"{N_IN}-{N_HID}-{N_OUT}", pesos=N_W,
                sensores=len(ANG_SENS), s_paso1=mundo.s_paso1, s_paso2=mundo.s_paso2,
                s_salida=mundo.s_salida, tramos=TRAMOS, v_min=V_MIN, v_max=V_MAX, v_ini=V_INI,
                giro=GIRO, acel=ACEL, sens_max=SENS_MAX, angulos_sens=np.degrees(ANG_SENS).tolist(),
                max_pasos=2500, numpy=np.__version__, gens=log)
    with open(f"{a.out}/log_seed{a.seed}.json", "w", encoding="utf8") as f:
        json.dump(meta, f, ensure_ascii=False, indent=1)
    np.savez_compressed(f"{a.out}/tray_seed{a.seed}.npz", P=mundo.P, H=mundo.H, seg=mundo.seg, **trays)


if __name__ == "__main__":
    main()
