¿Tu carro tiene CarPlay y no puedes ver YouTube en esa pantalla? **YouDash** es un proyecto gratis y de código abierto (licencia GPL-3.0) que pone **la app de YouTube de verdad** en la pantalla de CarPlay: se adapta al tamaño de la pantalla, trae un teclado para buscar y bloquea los anuncios. Salió el 14 de noviembre de 2026 y el 21 de noviembre ya tenía 365 estrellas en GitHub.

=> [Ver YouDash en GitHub](https://github.com/sa4hnd/YouDash)

> **Úsalo solo con el carro estacionado.** Respeta las leyes de tu país y las restricciones de tu vehículo.

## Qué hace, explicado fácil

| Lo que ves | Qué significa |
|---|---|
| La app real de YouTube | No es un espejo de tu celular estirado: es la misma app, adaptada a la pantalla del carro |
| Videos acomodados | La portada muestra los videos en columnas que caben en tu pantalla |
| Video + lista | El video a la izquierda y tu lista o tus recomendados a la derecha |
| Teclado en pantalla | Buscas videos desde la pantalla del carro, sin tocar el celular |
| Sin anuncios | Usa YouMod, que bloquea los anuncios (puede dejar de funcionar si YouTube cambia algo) |

## ¿Lo puedo instalar yo?

Te lo digo claro: **hoy no es de un solo clic**. Es un proyecto experimental pensado para gente que ya firma apps de iPhone, o que tiene a un desarrollador que le ayude. Esto es lo que necesitas:

| Necesitas | En palabras simples |
|---|---|
| Una Mac con Xcode | Xcode es el programa gratis de Apple para crear apps de iPhone. Solo funciona en Mac. También necesitas Python 3.9 o superior. |
| Un iPhone compatible | El rango previsto es iOS 26.4 a 27.2 (experimental). Se probó en un iPhone con iOS 27.0.1. |
| La app de YouTube con YouMod | Una copia «descifrada» de YouTube 21.42.4 con YouMod 2.0.0 que tengas derecho a modificar. La de la App Store no sirve, y el proyecto no la incluye. |
| El permiso de video de CarPlay | Apple tiene que autorizar a tu cuenta de desarrollador para mostrar video en CarPlay (`com.apple.developer.carplay-video`). Instalar la app con un programa de «sideload» no te da ese permiso. |
| Tu propia firma | Un identificador de app, un certificado y un perfil de Apple a tu nombre, con tu iPhone registrado. |

**Si no eres desarrollador:** dale una estrella al proyecto para seguirlo y pídele ayuda a alguien que ya publique apps de iPhone. Con el prompt de abajo, Claude Code te explica cada requisito y te dice si te falta algo antes de empezar.

## Glosario rápido

- **IPA:** el archivo de instalación de una app de iPhone (como un .exe en Windows).
- **Descifrada:** las apps de la App Store vienen cifradas; para modificarlas hace falta una copia sin cifrar.
- **Firmar una app:** ponerle tu «sello» de Apple para que el iPhone la acepte.
- **Permiso (entitlement):** una autorización que Apple le da a tu cuenta para que la app haga algo especial, como mostrar video en el carro.
- **Dylib:** el módulo que agrega YouDash a la app de YouTube para que funcione en CarPlay.

## La forma más fácil de empezar: que Claude Code te guíe

Si tienes una Mac, abre Claude Code y pégale esto. Te revisa qué tienes y qué te falta, y te explica cada paso sin saltarse nada:

```
Quiero instalar YouDash (https://github.com/sa4hnd/YouDash) para ver YouTube en CarPlay. Soy principiante.
1. Revisa si mi Mac tiene Xcode, el SDK de iPhone y Python 3.9 o superior, y dime cómo instalar lo que falte.
2. Explícame en palabras simples qué es la app «descifrada» con YouMod y el permiso de video de CarPlay que pide el README, y dime si con mi cuenta de Apple puedo tenerlo.
3. Si tengo todo, guíame paso a paso con la guía docs/BUILD.md del repo. Una cosa a la vez y espera mi respuesta.
```

## Los pasos (para quien ya tiene todo)

Primero se crea el módulo de CarPlay:

```
git clone https://github.com/sa4hnd/YouDash.git
cd YouDash
python3 -m venv .venv
source .venv/bin/activate
python3 -m pip install -r requirements-build.txt
python3 scripts/build_carplay.py --compile-only
```

Eso crea `build/YouTubeCarPlay.dylib`. Después se empaqueta con tu propia app y tu firma, y se instala en tu iPhone registrado:

```
python3 scripts/build_carplay.py \
  --ipa /ruta/a/tu/YouMod.ipa \
  --profile /ruta/a/tu.mobileprovision \
  --bundle-id com.tunombre.youtubecar \
  --device ID_DE_TU_IPHONE
```

Cambia las rutas, el identificador y el ID de tu iPhone por los tuyos. La guía completa (con solución de problemas) está en [docs/BUILD.md](https://github.com/sa4hnd/YouDash/blob/main/docs/BUILD.md).

## Cómo funciona por dentro

1. **Conecta la app a la pantalla del carro:** la app arranca normal en el iPhone y luego pasa su interfaz a la ventana de CarPlay.
2. **Adapta el diseño:** escala la interfaz, acomoda las columnas de videos y pone el video y la lista lado a lado.
3. **Agrega el teclado:** un teclado en pantalla que escribe en el buscador de YouTube.
4. **Usa el reproductor de YouTube y YouMod:** el video se reproduce con el motor de YouTube y YouMod quita los anuncios.
5. **Vuelve al celular al desconectar:** cuando sacas el iPhone del carro, la app regresa a la pantalla del teléfono.

## Ten en cuenta

- Es **experimental**: depende de tu iPhone, tu carro, la versión de la app y tu firma.
- Los anuncios se bloquean con YouMod, pero una actualización de YouTube puede cambiarlo.
- Es un proyecto independiente: no es una app oficial de Google ni de Apple. YouTube y Apple CarPlay son marcas de sus dueños.
- Créditos: integración de CarPlay de [Sehind Hemzani](https://github.com/sa4hnd), sobre [YouMod](https://github.com/Tonwalter888/YouMod).

**¿Lo usarías en tu carro? Cuéntamelo en @andresgomez.ia.**
