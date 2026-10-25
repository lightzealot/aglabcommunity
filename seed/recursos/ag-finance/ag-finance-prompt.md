# Prompt: crear "AG Finance" (control de finanzas personales) para cualquier usuario

Copia todo lo que está debajo de la línea y pégalo en Claude Code (o en Claude con los conectores de Gmail, Google Sheets, Google Calendar y, si lo tienes, n8n).

---

Actúa como un ingeniero de datos y diseñador de producto. Vas a construir, de punta a punta, un sistema de finanzas personales llamado AG Finance para la persona que te está escribiendo (no para nadie en particular). Funciona con su Gmail, un Google Sheet y un dashboard publicado como artefacto de Claude. El objetivo del usuario es responder tres preguntas: ¿en qué se va cada peso?, ¿qué facturas vencen y cuándo?, ¿cuánto pago fijo cada mes?

## Reglas de trabajo (no negociables)

1. No inventes datos. Si un monto, una fecha o una categoría no está en un correo, extracto o respuesta del usuario, déjalo vacío o márcalo "Por confirmar". Nunca rellenes con estimaciones. Cada dato dudoso se anota en la columna `nota` con su fuente.
2. Sé crítico, no complaciente. Si el usuario afirma algo que contradice un documento (por ejemplo, un monto distinto), dile la diferencia y pide confirmar antes de cambiarlo.
3. Pregunta lo que no puedas resolver tú. Haz las preguntas en bloque, con opciones, y sigue trabajando con lo que sí sabes mientras responden.
4. Avisa qué skill o herramienta vas a usar antes de usarla.
5. Verifica antes de decir "listo": relee lo escrito en el Sheet, recalcula los totales y abre/renderiza el dashboard. Si no puedes comprobar algo (por ejemplo, que un conector funcione dentro de la página publicada), dilo con claridad.
6. Privacidad primero. Trabaja solo con los correos y archivos que el usuario autorice. No guardes claves de PDF en el Sheet ni en el dashboard. No publiques nada con números reales en un lugar público.
7. Responde en español, corto y claro, con la respuesta primero.

## Paso 0: entrevista inicial (haz estas preguntas antes de tocar nada)

- País, moneda y formato de números (por ejemplo, COP con punto de miles).
- Bancos, billeteras y tarjetas que usa, y desde qué correos le llegan alertas y extractos.
- Desde qué fecha quiere registrar (por defecto, el inicio del mes anterior).
- Si algún PDF viene con contraseña: pide la clave solo para leer esos archivos y no la persistas en ningún archivo compartido.
- Qué cuentas pertenecen a familia (pareja, hijos) para tratar esas transferencias como "Familia" y no como "Por clasificar".
- Qué quiere ver primero: gasto del mes, cobros fijos, vencimientos o compras en cuotas.
- Qué conectores tiene activos (Gmail, Drive, Sheets, Calendar, n8n). Si falta alguno, dile cuál conectar y qué desbloquea.

## Paso 1: el Google Sheet (fuente de verdad)

Crea un Sheet llamado "AG Finance" con estas pestañas y columnas exactas:

- **Movimientos:** `fecha, mes, descripcion, monto, sentido, tipo, categoria, medio, estado, nota, comercio`
  - `fecha` en ISO (AAAA-MM-DD). `mes` como número AAAAMM. `monto` positivo en número.
  - `sentido`: `Sale` o `Entra`.
  - `tipo`: `Gasto`, `Ingreso`, `Pago tarjeta`, `Traslado propio`, `Ahorro/inversión`, `Por clasificar`.
  - `estado`: `Confirmado` o `Por confirmar`.
- **Suscripciones:** `servicio, tipo, valor, periodicidad, mensual, proximo, proximo_fecha, medio, estado, nota`
  - `tipo`: `Fija` o `Variable`. `mensual` es el equivalente mensual (un cobro anual cuenta en 12 partes; usa fórmula `=ROUND(valor/12,0)`).
  - `estado`: `Activa`, `Cancelada` o `Sin confirmar`.
- **Vencimientos:** `proveedor, concepto, referencia, valor, fecha_limite, estado, fecha_pago, nota`
- **Cuotas:** `fecha, comercio, valor, cuotas, cuota_mes, saldo`

Reglas de escritura (aprendidas por las malas):

- Escribe con `USER_ENTERED` para que las fórmulas funcionen, pero revisa que los textos no se conviertan solos en números o fechas (por ejemplo, referencias de factura o cuentas).
- La lectura de Sheets devuelve todo como texto; el dashboard debe convertir los números.
- Crea el Sheet con Drive (subiendo un CSV) o con el conector de Sheets, y edítalo siempre en el mismo archivo; nunca crees uno nuevo para un cambio.
- No borres ni muevas a la papelera archivos del usuario sin que lo pida.

## Paso 2: leer correos y extractos

1. Busca en Gmail alertas del banco, facturas, recibos y extractos desde la fecha acordada. Para cada banco pide al usuario un ejemplo de alerta si no reconoces el formato.
2. Registra cada gasto en Movimientos. Detecta y elimina duplicados idénticos (misma fecha, monto y descripción) dejando uno solo.
3. Clasificación:
   - Crea reglas editables en una pestaña extra Reglas (`texto_que_contiene, comercio, categoria, tipo`). El usuario las ajusta; tú las aplicas.
   - Categorías base: Vivienda, Servicios, Comida, Mercado, Transporte, Vehículo, Salud, Educación, Familia, Suscripciones, Tecnología, Deporte, Ocio, Intereses y comisiones, Sin categoría.
   - Transferencias a personas o cuentas desconocidas van como Por clasificar; pregunta al usuario por cada una agrupándolas (misma cuenta = una sola pregunta).
   - Pagos a la tarjeta de crédito son `Pago tarjeta`, no gasto, para no contar dos veces el consumo de la tarjeta.
4. Facturas y vencimientos: lee el valor, la referencia de pago y la fecha límite. Si el cuerpo del correo trae los datos, úsalos; si solo vienen en un PDF o zip, ve al paso 3.
5. Compras en cuotas (tarjetas): sácalas del extracto y llénalas en Cuotas.
6. Cuando un valor del correo y el del extracto difieran, no elijas uno: anótalos ambos y pregunta.

## Paso 3: adjuntos PDF y ZIP (opcional, con n8n)

El conector de Gmail no descarga adjuntos. Si el usuario tiene n8n:

- Crea un flujo que cada 15 minutos busque correos con `has:attachment (filename:pdf OR filename:zip)`, descomprima los ZIP, guarde el PDF original en una carpeta de Drive ("Finanzas - Adjuntos del correo") y guarde además el texto extraído como `.txt`.
- Para PDFs con clave, intenta primero sin clave y luego con la clave que el usuario te dio, usando credenciales de n8n, no escribiéndola en el Sheet.
- Si un PDF es una imagen (sin texto), dilo: hace falta OCR o que el usuario copie los datos.
- Para reprocesar histórico, agrega un disparador manual.
- Busca después los resultados en Drive por el nombre del archivo del adjunto (por ejemplo `fv…pdf.txt`), no por el nombre del remitente.
- Revisa duplicados en Drive tras reprocesar y deja uno solo de cada archivo idéntico.

Si no tiene n8n, pídele que adjunte los PDF en el chat.

## Paso 4: el dashboard (artefacto de Claude, tipo Dashboard)

Usa el tipo de artefacto Dashboard y conéctalo en vivo al Sheet con el conector de Google Sheets (`get_values` por pestaña, con un loader que convierte la primera fila en nombres de columna y los números en `Number`). Antes de publicar:

- Prueba la misma llamada de `get_values` en tu sesión y guarda los argumentos tal cual.
- Si la página no puede llamar al conector, dilo y ofrece una alternativa (datos adjuntos que se refrescan, o un flujo de n8n).
- Cada persona que abra el dashboard necesita acceso al Sheet y al conector.

Contenido del dashboard:

- Franja de cifras clave: gasto del mes actual, gasto del mes anterior, cobros fijos por mes, y total "Sin clasificar" con cantidad.
- Próximos cobros como línea de tiempo (siguientes 36 días) con punto de color para fijo y variable.
- Gasto por categoría (barras horizontales, ordenadas) y gasto por semana (barras con tooltip; la última semana en tono más claro porque puede estar incompleta).
- Tabla de cobros que se repiten, tabla de facturas y vencimientos, compras diferidas con saldo total, y una tabla "A dónde se va cada peso" por comercio o persona, con búsqueda, orden por columna y porcentaje del total de lo que salió.
- Ojito de privacidad arriba a la derecha: oculta todos los montos, porcentajes, conteos y los ejes de las gráficas con `••••`, también en tooltips; guarda la elección en `localStorage` dentro de `try/catch`.

Diseño: oscuro tipo vidrio, un solo acento cálido (ámbar), tipografía legible, tarjetas redondeadas con un brillo en la cifra principal. Aplica las skills de diseño (`frontend-design`, `artifact-design`, `dataviz`) y comprueba el resultado renderizándolo en escritorio (1280 px) y celular (400 px) con capturas, antes de decir que está listo. Respeta las reglas del tipo Dashboard: el contenido va dentro de un contenedor, no uses `innerHTML` con datos, marca cada elemento con su fuente de datos y no cargues fuentes ni hojas de estilo externas.

## Paso 5: cierre

Entrega al usuario, en este orden:

1. El enlace al dashboard y al Sheet.
2. Un resumen de 5 líneas: qué leíste, qué quedó "Por confirmar", qué conector faltó, qué es estimado (si algo lo es) y qué no pudiste verificar.
3. La lista de preguntas pendientes, agrupadas (cuentas por clasificar, facturas sin fecha, pagos sin factura).
4. Cómo agregar una regla de clasificación nueva y cómo ocultar los montos.
5. Si el usuario lo pide, un recordatorio en Google Calendar para cada vencimiento con fecha límite.
