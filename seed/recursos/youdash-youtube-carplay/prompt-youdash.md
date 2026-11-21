# YouDash · prompts listos para copiar

Repositorio: https://github.com/sa4hnd/YouDash (licencia GPL-3.0). Úsalo solo con el carro estacionado.

## 1. Que Claude Code revise lo que tienes y te guíe (principiantes)

```
Quiero instalar YouDash (https://github.com/sa4hnd/YouDash) para ver YouTube en CarPlay. Soy principiante.
1. Revisa si mi Mac tiene Xcode, el SDK de iPhone y Python 3.9 o superior, y dime cómo instalar lo que falte.
2. Explícame en palabras simples qué es la app «descifrada» con YouMod y el permiso de video de CarPlay que pide el README, y dime si con mi cuenta de Apple puedo tenerlo.
3. Si tengo todo, guíame paso a paso con la guía docs/BUILD.md del repo. Una cosa a la vez y espera mi respuesta.
```

## 2. Crear el módulo de CarPlay (Mac)

```
git clone https://github.com/sa4hnd/YouDash.git
cd YouDash
python3 -m venv .venv
source .venv/bin/activate
python3 -m pip install -r requirements-build.txt
python3 scripts/build_carplay.py --compile-only
```

## 3. Empaquetar e instalar con tu firma

```
python3 scripts/build_carplay.py \
  --ipa /ruta/a/tu/YouMod.ipa \
  --profile /ruta/a/tu.mobileprovision \
  --bundle-id com.tunombre.youtubecar \
  --device ID_DE_TU_IPHONE
```

Necesitas tu propia app de YouTube + YouMod que tengas derecho a modificar y un perfil de Apple con el permiso de video de CarPlay. El proyecto no incluye ninguno de los dos.
