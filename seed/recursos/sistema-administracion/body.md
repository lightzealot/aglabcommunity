Un método para elegir **un** proceso administrativo, reunir la información que necesita y definir un **piloto con aprobación humana**: cobranzas, proveedores, gastos y un resumen diario. Pensado para pequeñas empresas en Colombia. Fecha de consulta de las fuentes: **25 de octubre de 2026**. Abajo puedes descargar el PDF completo, la guía editable y la plantilla CSV.

**Qué no es:** no reemplaza tu administración, no incluye un sistema instalado ni una automatización de mensajes configurada, y no es asesoría contable, tributaria ni legal. Pagos y emisión de facturas **siempre** requieren aprobación.

**Cinco reglas:** 1) una persona aprueba el dinero; 2) el piloto lee y prepara borradores antes de escribir; 3) todo deja rastro; 4) lo dudoso se deriva a una persona, nunca se inventa; 5) hay un interruptor para detenerlo.

```text
ENTRADA → PREPARACIÓN → [ APROBACIÓN HUMANA ] → ACCIÓN → REGISTRO → MEDICIÓN
```
*(diagrama conceptual, no una pantalla de ninguna aplicación)*

## 1. Diagnóstico: 10 preguntas

1. ¿Qué tareas administrativas repites cada semana?
2. ¿Cuántas facturas emites y recibes por semana?
3. ¿Cuántas vencidas tienes hoy y cuánto tardas en perseguirlas?
4. ¿Cuántas horas semanales dedicas a cobranzas, proveedores y gastos? (mídelo una semana)
5. ¿Dónde viven los datos: sistema contable, hojas, correo, chats, papel?
6. ¿Qué herramientas exportan datos o tienen API (una puerta técnica para que otros programas lean o escriban)?
7. ¿Qué datos faltan o llegan incompletos (referencias de pago, órdenes de compra)?
8. ¿Qué errores se repiten y cuánto costó el último?
9. ¿Quién aprueba pagos, mensajes y facturas? ¿Hay suplente?
10. Si el proceso parara dos semanas, ¿quién lo haría a mano?

**Cómo leerlas:** datos en chats o papel → ordénalos antes de automatizar; más de 6 h/semana en un proceso → buen candidato; errores que cuestan dinero → aprobación en cada paso; nadie respalda al aprobador → define un suplente; no sabes tus horas → mide primero.

## 2. Elegir el primer proceso

Puntúa cada factor de **1 a 5**:

| Puntos | Frecuencia | Horas por semana | Impacto de errores | Facilidad de integración |
|---|---|---|---|---|
| 1 | Mensual | < 1 | Molestia menor | Papel o chats |
| 2 | Quincenal | 1 a < 3 | Corrección con trabajo | Hoja con formato libre |
| 3 | Semanal | 3 a < 6 | Retraso o reclamo | Hoja o exportación ordenada |
| 4 | Varias veces/semana | 6 a 10 | Pérdida de dinero | Sistema con API conocida |
| 5 | Diaria | > 10 | Pérdida grande o riesgo legal | API y datos limpios |

**Puntaje = frecuencia + tiempo + impacto + facilidad** (4 a 20). Ejemplo ficticio: Cobranzas 3+3+4+3 = **13**; Proveedores 3+3+4+2 = **12**; Gastos 4+2+2+3 = **11**.

Elige el mayor; si hay empate, el de **mayor facilidad**. Evita como primer piloto uno con impacto 5 y facilidad 1 o 2. Si nadie pasa de 10, ordena los datos primero.

## 3. Cobranzas

```text
Facturas vencidas → Recordatorios con contexto → [ Aprobar mensajes ] → Enviar por canal permitido → Confirmar y vincular pagos → Detener avisos
```

- **Inicia:** una factura vence sin pago confirmado.
- **Necesita:** cliente, número, valor, saldo, vencimiento, historial y canal permitido.
- **Produce:** recordatorios aprobados, registro de envíos y estados actualizados.
- **Aprobación:** cada mensaje (o una plantilla aprobada de antemano) y cualquier acuerdo de pago.
- **Métrica:** horas semanales, vencidas con aviso en 48 h, días promedio de mora.
- **Hoy:** exporta tus vencidas a una hoja con valor, saldo y último contacto.

**Una afirmación por chat no basta.** «Ya pagué» no marca una factura como pagada: hace falta **evidencia verificable** (el pago en el extracto bancario o el sistema contable, con valor y fecha) y una persona que lo concilie.

- **Pago parcial:** se registra el valor y queda el **saldo**; los avisos siguen solo por él.
- **Duplicado:** el segundo pago con misma referencia, valor y fecha no se aplica: va a revisión.
- **Sin referencia:** queda «por identificar» hasta que una persona lo vincule con evidencia.
- **Avisos se detienen** con pago conciliado, acuerdo vigente, disputa o petición del cliente.

**Canal:** el que el cliente aceptó. En WhatsApp, fuera de la ventana de atención solo se envían **plantillas aprobadas** (documentación de Meta); los requisitos de consentimiento no quedaron verificados. En Colombia aplica la Ley 1581 de 2012 sobre datos personales: confírmalo con un profesional.

## 4. Proveedores

```text
Recibir documentos → Detectar duplicados → Contrastar con orden de compra → Revisar diferencias → [ Autorizar comunicaciones o pagos ]
                                                  ↓ sin orden: REVISIÓN HUMANA
```

- **Inicia:** llega una factura o cuenta de cobro. **Necesita:** el documento, datos del proveedor, orden de compra e historial.
- **Pasos:** lee datos; busca duplicados (proveedor, número y valor); busca la orden; compara valores, cantidades y fechas; marca diferencias.
- **Produce:** una ficha por documento: coincide, con diferencias, posible duplicado o sin orden.
- **Aprobación:** toda comunicación al proveedor y **todo pago**.
- **Sin orden de compra:** va a revisión; **no se inventa una**.
- **Métrica:** documentos revisados por semana, duplicados evitados, minutos por documento. **Hoy:** marca qué facturas del último mes tenían orden de compra.

## 5. Gastos

```text
Foto del recibo → Extraer datos → Comprobar campos y duplicados → Proponer categoría → [ Revisar dudosos ] → Registrar
```

- **Inicia:** alguien envía la foto de un recibo. **Necesita:** la imagen, quién la envió, tu catálogo de categorías y reglas de aprobación.
- **Produce:** gastos registrados con su imagen de respaldo y una lista de pendientes.
- **Aprobación:** dudosos, de valor alto (tú defines el límite) o sin soporte.
- **No se inventa nada:** si un valor, una identificación (como un NIT) o un impuesto no se lee, el campo queda **«ilegible»** y pasa a revisión.
- **Métrica:** gastos sin corrección, % que pasa a revisión, minutos por recibo. **Hoy:** escribe tu catálogo (máximo diez categorías) y cuándo se necesita aprobación.

## 6. Resumen diario

Cuatro bloques, cada uno con su fuente: **entradas confirmadas** y **salidas confirmadas** (extracto bancario o sistema contable, con conciliación aprobada), **cuentas pendientes** (sistema contable u hojas) y **excepciones** (bandejas de revisión). Distingue lo **facturado** de lo **cobrado** y lo **gastado** de lo **pagado**.

| Ejemplo ficticio (COP) | Valor |
|---|---|
| Facturado hoy (no es dinero cobrado) | $3.100.000 |
| **Cobrado hoy** (F-1043 $1.500.000 + F-1051 $850.000) | **$2.350.000** |
| Gastos registrados hoy (no es dinero pagado) | $1.540.000 |
| **Pagado hoy** (proveedor $780.000 + servicio $400.000) | **$1.180.000** |
| Movimiento confirmado | $1.170.000 |
| Por cobrar vencido (3 facturas) | $3.900.000 |
| Por pagar pendiente (2 documentos) | $2.250.000 |

Excepciones: un pago de $420.000 sin referencia, una posible factura duplicada y un recibo ilegible.

## 7. Integraciones verificadas

| Herramienta | Se verificó | Tipo |
|---|---|---|
| [Alegra](https://developer.alegra.com) | API REST con autenticación Basic (correo y token de Configuración → API); facturas, compras, órdenes de compra, pagos, contactos y webhooks | API |
| [Siigo](https://siigoapi.docs.apiary.io/) | API con clave de acceso y token; facturas, clientes, recibos de pago y compras | API |
| [WhatsApp (Meta)](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/overview) | Fuera de la ventana de atención solo plantillas aprobadas; la categoría afecta el precio | API y plantillas |
| [n8n](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.wait/) | El nodo Wait pausa un flujo hasta una llamada web o un formulario (aprobación humana) | Función de la herramienta |
| Bancos | **No se verificó** ninguna conexión | Sin verificar |

**Nativa** = viene lista en la herramienta; **API** = alguien configura la conexión; **desarrollo adicional** = programar o contratar. No se incluyen precios ni disponibilidad bancaria.

## 8. Piloto de siete días (calendario adaptable, sin garantía)

1. Elige el proceso y documenta cómo se hace hoy.
2. Reúne 20–30 casos reales (datos sensibles protegidos) y define estados y excepciones.
3. Define aprobadores, suplente y permisos mínimos (solo lectura).
4. Conecta la fuente en modo lectura y genera borradores.
5. Prueba casos normales y de excepción (parciales, duplicados, sin referencia, ilegibles).
6. Corrige, revisa el registro de acciones y prueba el interruptor de parada.
7. Evalúa con la métrica inicial: ampliar, ajustar o detener.

## 9. Checklist operativo

- [ ] **Responsables:** dueño del proceso y suplente.
- [ ] **Permisos mínimos:** solo lectura primero; credenciales fuera de los archivos y revocables.
- [ ] **Datos:** completos y con datos personales protegidos.
- [ ] **Aprobaciones:** pagos, facturas y mensajes pasan por una persona.
- [ ] **Registro de acciones:** qué se hizo, cuándo y quién aprobó.
- [ ] **Errores:** dónde se ven y quién los atiende.
- [ ] **Detener:** interruptor claro y plan manual.

## Plantilla CSV

`plantilla-diagnostico.csv`: Proceso, responsable, herramienta actual, frecuencia, volumen semanal, minutos por tarea, horas semanales, error habitual, datos necesarios, prioridad, aprobación requerida, métrica inicial, objetivo del piloto y estado. **Horas semanales = volumen semanal × minutos por tarea ÷ 60** (ej.: 40 × 6 ÷ 60 = 4,0 h). Trae tres ejemplos **ficticios** marcados y filas vacías para tus datos.

**Pendiente de verificar:** precios, conexiones bancarias, requisitos de consentimiento en WhatsApp y permisos exactos de cada API. No se probó ninguna integración.

**¿Quieres adaptar este sistema a tu negocio? Escríbeme SISTEMA a @andresgomez.ia y revisamos qué puedes automatizar.**

=> [Instagram: @andresgomez.ia](https://www.instagram.com/andresgomez.ia/)
