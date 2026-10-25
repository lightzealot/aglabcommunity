Un solo prompt que le pides a Claude y te arma **AG Finance**: un Google Sheet con tus gastos leídos desde Gmail, un dashboard que responde tres preguntas (¿en qué se va cada peso?, ¿qué facturas vencen y cuándo?, ¿cuánto pago fijo cada mes?) y un ojito para ocultar los montos. Abajo descargas el prompt listo para pegar y una guía en PDF.

**Antes de empezar:** funciona con Claude Code, o con Claude con los conectores de **Gmail, Google Sheets y Google Calendar** (n8n es opcional, solo para leer PDF y ZIP adjuntos). Es un asistente que prepara y ordena: lo que no encuentre en un correo lo deja "Por confirmar", no lo inventa. No es asesoría financiera, contable ni tributaria.

## Qué hace, en orden

| Paso | Qué pasa |
|---|---|
| **0. Entrevista** | Te pregunta país y moneda, bancos y tarjetas, desde qué fecha registrar y qué conectores tienes |
| **1. Google Sheet** | Crea "AG Finance" con pestañas Movimientos, Suscripciones, Vencimientos y Cuotas |
| **2. Correos y extractos** | Registra gastos, quita duplicados y clasifica con reglas que tú puedes editar |
| **3. Adjuntos (opcional)** | Con n8n lee PDF y ZIP del correo; sin n8n, los adjuntas en el chat |
| **4. Dashboard** | Cifras clave, próximos cobros, gasto por categoría y semana, y tablas de cobros fijos, facturas y cuotas |
| **5. Cierre** | Enlace al dashboard y al Sheet, pendientes agrupados y, si quieres, recordatorios en Calendar |

## Las 7 reglas que lleva dentro

1. **No inventa datos:** lo dudoso queda "Por confirmar" con su fuente.
2. **Te lleva la contraria con respeto:** si tu dato contradice un documento, te muestra la diferencia.
3. **Pregunta en bloque**, con opciones, y sigue trabajando mientras respondes.
4. **Te avisa qué herramienta usará** antes de usarla.
5. **Verifica antes de decir "listo":** relee el Sheet, recalcula totales y abre el dashboard.
6. **Privacidad primero:** solo los correos que autorices, sin guardar claves de PDF y sin publicar números reales en un lugar público.
7. **Responde corto**, en español, con la respuesta primero.

## Cómo usarlo

1. Descarga `ag-finance-prompt.md`, copia todo el contenido y pégalo en Claude Code (o en Claude con los conectores activos).
2. Responde la entrevista inicial. Las preguntas de PDF con clave: la da solo para leer, no se guarda.
3. Revisa lo "Por confirmar" y las transferencias "Por clasificar": agrupadas, una pregunta por cuenta.
4. Ajusta la pestaña **Reglas** cuando quieras: texto que contiene, comercio, categoría y tipo.

## Cuida tus datos

- El dashboard muestra tus cifras reales: **no lo compartas en público**. Quien lo abra necesita acceso al Sheet.
- Los pagos a tarjeta de crédito no cuentan como gasto, para no sumar dos veces lo consumido.
- Si un conector no funciona dentro de la página publicada, Claude te lo dice y propone una alternativa.

**¿Quieres que lo adaptemos a tu caso? Escríbeme FINANZAS a @andresgomez.ia.**

=> [Instagram: @andresgomez.ia](https://www.instagram.com/andresgomez.ia/)
