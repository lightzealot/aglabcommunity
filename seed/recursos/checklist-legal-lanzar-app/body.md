¿Hiciste tu app con IA y ya la vas a lanzar? Funcionar no es lo mismo que estar lista. Una app sin política de privacidad, con cookies que cargan sin permiso o con una suscripción imposible de cancelar te puede costar multas, reclamos o que te la bajen de una tienda. Aquí tienes los **35 puntos** que debes pedirle a Claude antes de publicar, agrupados en 7 bloques, y un prompt listo para que Claude Code revise tu app por ti.

**Antes de empezar:** esto no es asesoría legal. Las reglas cambian según el país (GDPR en Europa, CCPA en California, Ley 1581 en Colombia, LGPD en Brasil). Usa la checklist para llegar preparado y que un abogado revise tu app antes de lanzar.

## Cómo usar esta checklist con Claude Code

1. Abre Claude Code dentro de la carpeta de tu app.
2. Pega el prompt del final (también está en el archivo `prompt.md`).
3. Claude te devuelve una tabla con cada punto: ✅ cumple, ⚠️ a medias o ❌ falta, dónde lo vio y qué propone.
4. Aprueba los arreglos uno por uno. Nada cambia sin tu visto bueno.

## Bloque 1. Privacidad y términos

| # | Punto | Qué pedirle a Claude |
|---|---|---|
| 1 | Política de privacidad | Que la cree y la enlace en el pie de página y en el registro: qué datos, para qué y con quién se comparten |
| 2 | Términos y condiciones | Que los publique y los enlace donde el usuario se registra |
| 3 | Tiempo de guardado | Que defina y escriba cuánto tiempo guardas cada tipo de dato |
| 4 | Casilla sin marcar | Que la casilla para aceptar los términos empiece vacía |
| 5 | Registro de aceptación | Que guarde quién aceptó, qué versión de los términos y cuándo |

## Bloque 2. Cookies, rastreo y proveedores

| # | Punto | Qué pedirle a Claude |
|---|---|---|
| 6 | Banner de cookies | Que «Rechazar todo» sea tan visible como «Aceptar todo» |
| 7 | Bloquear rastreadores | Que los scripts de analítica y anuncios no carguen hasta que el usuario acepte |
| 8 | Auditar SDK | Que liste cada SDK de analítica, anuncios y errores, y qué datos envía |
| 9 | Acuerdos de datos | Que te recuerde firmar un acuerdo de tratamiento de datos (DPA) con cada proveedor |
| 10 | Lista de proveedores | Que publique qué proveedores procesan datos y en qué país |

## Bloque 3. Pagos y suscripciones

| # | Punto | Qué pedirle a Claude |
|---|---|---|
| 11 | Reembolsos | Que publique la política de reembolsos antes del pago |
| 12 | Cancelar fácil | Que cancelar tome los mismos pasos que suscribirse |
| 13 | Renovación automática | Que avise por correo antes de cobrar la renovación |
| 14 | Sin cargos ocultos | Que el precio final se vea desde el inicio, sin cargos sorpresa |

## Bloque 4. Honestidad y marketing

| # | Punto | Qué pedirle a Claude |
|---|---|---|
| 15 | Darse de baja | Que cada correo de marketing traiga un enlace para darse de baja |
| 16 | Cuentas regresivas | Que quite los contadores falsos o que se reinician |
| 17 | Patrones engañosos | Que quite la culpa al cancelar, las casillas premarcadas y los botones escondidos |
| 18 | Reseñas | Que quite cualquier reseña inventada o comprada |
| 19 | Promesas | Que cambie «garantizado» y «el número 1» por lo que la app hace de verdad |
| 20 | Permiso de marketing | Que pida el permiso para publicidad en una casilla aparte |
| 21 | Certificaciones | Que quite SOC 2, ISO u otros sellos que no tengas |
| 22 | Disponibilidad | Que prometa una disponibilidad que puedas medir, no «100 %» |

## Bloque 5. Accesibilidad y contenido

| # | Punto | Qué pedirle a Claude |
|---|---|---|
| 23 | Contraste | Que suba el contraste a WCAG AA (4,5:1 en texto normal) |
| 24 | Texto alternativo | Que agregue `alt` descriptivo a todas las imágenes |
| 25 | Teclado | Que todo se pueda usar con Tab, Enter y Esc, con el foco visible |
| 26 | Contenido con IA | Que etiquete lo que hizo la IA (imágenes, textos, voces) |

## Bloque 6. Licencias y marcas

| # | Punto | Qué pedirle a Claude |
|---|---|---|
| 27 | Logos de clientes | Que quite los logos que no tengan permiso por escrito |
| 28 | Imágenes, fuentes y código | Que revise la licencia de cada recurso que usas |
| 29 | Open source | Que incluya los avisos de licencia y te alerte de AGPL o GPL |
| 30 | Derechos de autor | Que agregue un correo o formulario visible para reclamos |

## Bloque 7. Datos de usuarios

| # | Punto | Qué pedirle a Claude |
|---|---|---|
| 31 | Descargar y borrar | Que el usuario pueda exportar sus datos y borrar su cuenta sin pedir permiso |
| 32 | Datos mínimos | Que quite del registro los campos que no necesitas |
| 33 | Menores de edad | Que pida permiso de un padre o tutor antes de guardar datos de menores |
| 34 | Entrenar IA | Que no use datos de usuarios para entrenar IA sin permiso explícito |
| 35 | Contacto | Que muestre el nombre de tu empresa, un correo y cómo contactarte |

## El prompt para Claude Code

Cópialo entero y pégalo en Claude Code dentro de la carpeta de tu app. Si quieres la versión con los 35 puntos escritos uno por uno, descarga `prompt.md`.

```
Actúa como revisor de lanzamiento de mi app. Revisa el código, las pantallas, los textos y las integraciones contra esta checklist de 35 puntos: privacidad y términos, cookies y rastreo, proveedores, pagos y suscripciones, honestidad y marketing, accesibilidad, contenido con IA, licencias y datos de usuarios.

Para cada punto dame una fila con:
- Estado: ✅ cumple · ⚠️ a medias · ❌ falta · ➖ no aplica
- Dónde lo viste: archivo, ruta o pantalla
- Qué propones: el cambio exacto, en una o dos líneas

No cambies nada todavía. Primero entrégame la tabla ordenada de ❌ a ✅. Después implementa solo los arreglos que yo apruebe, uno por uno. Marca los puntos que deba revisar un abogado: tú no lo reemplazas.
```

## Antes de lanzar

> Claude te ayuda a encontrar lo que falta, pero no reemplaza a un abogado. Lleva esta tabla a la revisión y ahorrarás tiempo y dinero.
