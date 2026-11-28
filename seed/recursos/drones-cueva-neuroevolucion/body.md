200 drones que **no saben volar** y una cueva con dos pasos estrechos. Nadie les enseña: cada generación se copian, con pequeños errores, los que llegan más lejos. Aquí tienes cómo funciona, las cifras reales de la corrida del reel y el **simulador en Python** para verlos aprender en tu compu.

**Antes de empezar:** es una simulación hecha para el reel, no un dron real. Las cifras salen de una corrida con semilla fija (la 12) del 27 de noviembre de 2026; si cambias la semilla o las reglas, te saldrán otras.

## Qué pasa en el reel

| Generación | Pasan el 1.er paso | Pasan el 2.º | Salen de la cueva |
|---|---|---|---|
| 1 | **0** | 0 | 0 |
| 2 | 3 | 0 | 0 |
| 3 | 50 | 0 | 0 |
| 4 | 161 | 0 | 0 |
| 5 | 172 | **0** | 0 |
| 6 | 196 | 4 | 4 |
| 7 | 199 | 45 | 45 |
| 8 | 199 | 128 | **128** |

De 200 drones, ninguno pasa el primer paso en la generación 1. En la 8 ya salen 128.

## El cerebro de cada dron

Cada dron lleva una red neuronal diminuta: **8 entradas, 6 neuronas ocultas y 2 salidas**, en total **68 pesos**. Al principio todos son valores al azar.

- **Entran:** 7 sensores que miden la distancia a la pared (de −90° a 90°) y su velocidad.
- **Salen:** cuánto gira y cuánto acelera en cada paso.
- **Se cae** si toca la pared o si deja de avanzar.

## Cómo aprenden sin que nadie les enseñe

1. **Vuelan los 200**, cada uno con su red, y se mide hasta dónde llega.
2. **Se quedan los 20 mejores** (los que salen van primero).
3. **Se copian con errores:** ruido pequeño (σ 0,15) en el 10 % de los pesos de cada copia.
4. **El mejor pasa intacto** a la siguiente generación, así nunca se pierde lo aprendido.

A esto se le llama **neuroevolución**: un algoritmo genético que ajusta los pesos de una red neuronal. Nadie le explica al dron qué es una pared.

## Córrelo en tu compu

Necesitas Python 3. Descarga **drones_cueva.py** y **ver_drones.py** (abajo, con tu cuenta gratis) en la misma carpeta, abre una terminal ahí y escribe:

```
pip install numpy matplotlib
python drones_cueva.py --gens 10 --seed 12
```

Tarda unos 30 segundos (medido en un PC de escritorio). Te deja `log_seed12.json` con las cifras y `tray_seed12.npz` con cada vuelo. Con la semilla 12 te salen las mismas cifras de la tabla.

## Míralos aprender

```
python ver_drones.py --seed 12
```

Se abre una ventana y pasan las generaciones una tras otra; el punto dorado es el líder. Opciones útiles:

- `--gen 8`: solo una generación.
- `--salto 6`: más rápido.
- `--mp4 drones.mp4`: guarda un video (necesitas ffmpeg instalado).

## Cambia las reglas

Prueba y compara cuántas generaciones tardan en salir:

| Opción | Qué cambia |
|---|---|
| `--seed 7` | Otro arranque al azar |
| `--elite 5` | Copia solo a los 5 mejores |
| `--sigma 0.4` | Errores más grandes |
| `--prob 0.3` | Errores en más pesos |
| `--gens 30` | Más generaciones |

Para otra cueva, edita la lista `TRAMOS` al principio de `drones_cueva.py`: tramos rectos (`S`), curvas (`A`) y el ancho de cada uno. Mira la forma con `python drones_cueva.py --preview`.

Si quieres pedirle a una IA que te ayude a cambiarla, pégale el archivo y algo así:

```
Este es mi simulador de neuroevolución (drones_cueva.py). Añade a la lista TRAMOS un tercer paso estrecho antes de la salida, sin que los tramos se solapen, y dime qué semilla probar para que se vea cómo aprenden a pasarlo.
```

Sígueme en Instagram como **@andresgomez.ia** para ver cómo siguen aprendiendo.
