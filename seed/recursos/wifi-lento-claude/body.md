¿Pagas 300 megas y te llegan 90? Muchas veces no es la compañía de internet: es **cómo está configurado tu router**. En el reel, a alguien le pasó justo eso y lo resolvió contándole el problema a Claude, que encontró tres ajustes: **el canal, WMM y la banda de 5 GHz**. Aquí tienes el prompt exacto y cómo revisar cada ajuste tú mismo.

**Antes de empezar:** mide tu velocidad por cable y por wifi. Si por cable tampoco llega lo que pagas, el problema sí es de la compañía y ningún ajuste del router lo arregla.

## El prompt para pedírselo a Claude

Cópialo en Claude (o en Claude Code, que puede correr los comandos por ti) y cambia lo que está entre corchetes:

```
Mi wifi anda lento: pago [X] megas y me llegan [Y]. Estoy en [Windows / Mac]. Ayúdame a encontrar la causa paso a paso: 1) dime qué comando correr para ver el canal, la banda (2,4 o 5 GHz) y la intensidad de la señal, y explícame el resultado; 2) dime cómo entrar a la configuración de mi router y qué revisar: canal, WMM y bandas; 3) antes de cambiar algo, dime qué valor tiene ahora para poder volver atrás. Una cosa a la vez y espera mi respuesta.
```

## Paso 1. Mide tu señal

| Sistema | Cómo verlo |
|---|---|
| Windows | Abre la terminal y escribe `netsh wlan show interfaces`: verás el canal, la banda, el tipo de radio y la señal en % |
| Mac | Mantén **Opción** y haz clic en el ícono del wifi: verás el canal, la banda y la señal (RSSI) |

Anota los valores: así comparas el antes y el después.

## Paso 2. Entra a tu router

- La dirección suele ser `192.168.0.1` o `192.168.1.1`.
- En Windows la ves con `ipconfig` en «Puerta de enlace predeterminada». En Mac, en Ajustes > Red > Wi-Fi > Detalles > TCP/IP > Router.
- El usuario y la contraseña suelen estar en la etiqueta del router. Si el router es de tu compañía y no te deja entrar, pídeles el acceso.
- **Antes de tocar nada**, saca una foto de cada pantalla para poder volver atrás.

## Ajuste 1. El canal

El wifi viaja por canales, como las radios. Si tu vecino usa el mismo canal con una señal más fuerte, se pisan. En 2,4 GHz los canales que no se solapan son el **1, el 6 y el 11**: elige el que esté más libre. Si tu router lo deja en «automático» y sigue lento, prueba fijarlo a mano.

## Ajuste 2. WMM

WMM (Wi-Fi Multimedia) ordena el tráfico: primero lo que no puede esperar, como las llamadas y el video. Además, los estándares de wifi rápidos (802.11n y ac) lo necesitan: **si está apagado, la velocidad se puede quedar en 54 Mbps**. Búscalo en la configuración inalámbrica avanzada y déjalo **prendido**.

## Ajuste 3. La banda de 5 GHz

Casi todos los routers actuales tienen dos bandas:

| Banda | Ventaja | Desventaja |
|---|---|---|
| 2,4 GHz | Llega más lejos y atraviesa paredes | Más lenta y más saturada |
| 5 GHz | Mucho más rápida y con más canales libres | Alcance más corto |

Si tu compu está cerca del router, conéctala a la red de 5 GHz. Si las dos bandas tienen el mismo nombre, el router elige solo; puedes separarlas con nombres distintos para escoger tú.

## Para cualquier cosa que anda mal hace meses

La impresora, el celular que no carga, la planilla eterna, el mail que no llega: el método es el mismo. Cuéntale el problema con detalle y deja que te pregunte.

```
Hace [tiempo] que [lo que falla] en mi [casa / trabajo]. Ya probé [lo que hiciste]. Hazme las preguntas que necesites para entender el problema, una por una, y después dame los pasos para arreglarlo, del más fácil al más difícil. Antes de cada cambio dime cómo deshacerlo.
```

**¿Te ayudo con tu caso? Escríbeme WIFI a @andresgomez.ia.**
