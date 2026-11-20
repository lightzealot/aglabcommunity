# Wifi lento con Claude: los prompts

## 1. El prompt para tu wifi

```
Mi wifi anda lento: pago [X] megas y me llegan [Y]. Estoy en [Windows / Mac]. Ayúdame a encontrar la causa paso a paso:
1) dime qué comando correr para ver el canal, la banda (2,4 o 5 GHz) y la intensidad de la señal, y explícame el resultado;
2) dime cómo entrar a la configuración de mi router y qué revisar: canal, WMM y bandas;
3) antes de cambiar algo, dime qué valor tiene ahora para poder volver atrás.
Una cosa a la vez y espera mi respuesta.
```

## 2. El prompt para cualquier cosa que anda mal hace meses

```
Hace [tiempo] que [lo que falla] en mi [casa / trabajo]. Ya probé [lo que hiciste]. Hazme las preguntas que necesites para entender el problema, una por una, y después dame los pasos para arreglarlo, del más fácil al más difícil. Antes de cada cambio dime cómo deshacerlo.
```

## 3. Comandos para ver tu señal

```
Windows:  netsh wlan show interfaces
Mac:      mantén Opción y haz clic en el ícono del wifi
```

Guía completa: comunidad.andresgomez.store · @andresgomez.ia
