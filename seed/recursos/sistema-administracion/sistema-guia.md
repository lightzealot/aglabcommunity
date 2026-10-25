# SISTEMA: guía para empezar a automatizar la administración de tu negocio

Guía práctica para dueños y administradores de pequeñas empresas, pensada para Colombia. Fecha de consulta de la documentación citada: **25 de octubre de 2026**. @andresgomez.ia

## Antes de empezar

**Qué es esta guía:** un método para elegir **un** proceso administrativo, reunir la información que necesita y definir un **piloto con aprobación humana**. Recorre cuatro frentes: cobranzas, proveedores, gastos y un resumen diario.

**Qué no es:** no reemplaza la administración de tu negocio, no incluye un sistema ya instalado ni una automatización de mensajes configurada, y no es asesoría contable, tributaria ni legal. Las decisiones contables y tributarias corresponden al responsable competente. Los pagos y la emisión de facturas **siempre** requieren aprobación.

**Cinco reglas para todo el recorrido**

1. **Una persona aprueba el dinero.** Pagos, facturas emitidas y mensajes a clientes pasan por una aprobación humana.
2. **Se lee antes de escribir.** El primer piloto solo consulta y prepara borradores; no paga, no emite, no envía solo.
3. **Todo deja rastro.** Cada acción queda registrada: qué se hizo, cuándo y quién la aprobó.
4. **Lo dudoso se deriva.** Si falta un dato, la respuesta es «revisión humana», nunca inventarlo.
5. **Se puede detener.** Existe un interruptor claro para parar el flujo.

**Diagrama conceptual: anatomía de un flujo con aprobación**

```text
ENTRADA  →  PREPARACIÓN  →  [ APROBACIÓN HUMANA ]  →  ACCIÓN  →  REGISTRO  →  MEDICIÓN
(factura,   (ordenar,       (una persona revisa       (enviar,     (qué pasó,   (tiempo,
 recibo,     comprobar,      y decide)                 registrar,   quién       errores,
 pago)       proponer)                                 conciliar)   aprobó)      excepciones)
```

Este diagrama es **conceptual**: muestra la lógica de un flujo, no una pantalla de ninguna aplicación.

## 1. Diagnóstico inicial: 10 preguntas

Responde con números y ejemplos, no con impresiones. Anota la fecha: sirve de punto de partida.

1. ¿Qué tareas administrativas repites cada semana? Lista cada una.
2. ¿Cuántas facturas emites y cuántas recibes por semana?
3. ¿Cuántas facturas vencidas tienes hoy y cuánto tardas en perseguirlas?
4. ¿Cuántas horas semanales dedicas a cobranzas, proveedores y gastos? Mídelo durante una semana.
5. ¿Dónde viven los datos: sistema contable, hojas de cálculo, correo, chats, papel, fotos?
6. ¿Qué herramientas usas y cuáles permiten exportar datos o conectarse por una API (una puerta técnica para que otros programas lean o escriban datos)?
7. ¿Qué datos faltan o llegan incompletos: referencias de pago, órdenes de compra, datos del proveedor?
8. ¿Qué errores se repiten: duplicados, pagos mal aplicados, recibos ilegibles? ¿Cuánto costó el último?
9. ¿Quién aprueba pagos, mensajes a clientes y facturas? ¿Hay un respaldo si esa persona no está?
10. Si el proceso se detuviera dos semanas, ¿quién lo haría a mano y cómo?

**Cómo interpretar las respuestas**

| Si descubres que… | Significa… | Haz esto primero |
|---|---|---|
| Los datos viven en chats, papel o fotos (pregunta 5) | No hay una fuente única | Ordena los datos en una hoja o en tu sistema antes de automatizar |
| Pasas más de 6 horas por semana en un proceso (pregunta 4) | Buen candidato por tiempo | Compáralo con los demás en la matriz |
| Tus herramientas no exportan ni tienen API (pregunta 6) | La conexión costará más | Elige un proceso cuyos datos ya estén en una hoja o exportación |
| Los errores cuestan dinero (pregunta 8) | El impacto es alto | Mantén aprobación humana en cada paso y empieza en modo lectura |
| Nadie respalda a quien aprueba (pregunta 9) | El flujo se atascaría | Define un suplente antes del piloto |
| No sabes cuántas horas inviertes (pregunta 4) | Falta una medición base | Mide una semana antes de decidir |

## 2. Cómo elegir el primer proceso

Compara tus procesos con cuatro factores. Puntúa cada uno de **1 a 5** usando estas escalas:

| Puntos | Frecuencia | Tiempo consumido (horas por semana) | Impacto de los errores | Facilidad de integración |
|---|---|---|---|---|
| 1 | Mensual | Menos de 1 | Molestia menor, se corrige sin costo | Datos en papel o en chats |
| 2 | Quincenal | De 1 a menos de 3 | Corrección con algo de trabajo | Datos en hoja de cálculo con formato libre |
| 3 | Semanal | De 3 a menos de 6 | Retraso o reclamo de un cliente o proveedor | Datos ordenados en hoja o exportación estable |
| 4 | Varias veces por semana | De 6 a 10 | Pérdida de dinero o relación afectada | Sistema con exportación o API conocida |
| 5 | Diaria | Más de 10 | Pérdida significativa, sanción o riesgo legal | Sistema con API y datos limpios |

**Puntaje = frecuencia + tiempo + impacto + facilidad** (de 4 a 20).

**Ejemplo ficticio**

| Proceso | Frecuencia | Tiempo | Impacto | Facilidad | Puntaje |
|---|---|---|---|---|---|
| Cobranzas (4,0 h/sem) | 3 | 3 | 4 | 3 | **13** |
| Proveedores (3,3 h/sem) | 3 | 3 | 4 | 2 | **12** |
| Gastos (2,0 h/sem) | 4 | 2 | 2 | 3 | **11** |

**Cómo priorizar**

1. Elige el proceso con **mayor puntaje**.
2. Si hay empate, elige el de **mayor facilidad de integración**: el primer piloto debe ser el más fácil de conectar.
3. **Evita como primer piloto** un proceso con impacto 5 y facilidad 1 o 2: es el más riesgoso y el más difícil.
4. Si ningún proceso pasa de 10 puntos, probablemente conviene ordenar los datos antes de automatizar.

## 3. Cobranzas

**Diagrama conceptual**

```text
Identificar        Preparar recordatorios     [ Aprobar los      Enviar por un      Confirmar y        Detener
facturas vencidas →  con contexto           →   mensajes ]    →  canal permitido →  vincular pagos  →  los avisos
```

| Pregunta | Respuesta |
|---|---|
| **Qué lo inicia** | Una factura que pasa su fecha de vencimiento sin pago confirmado |
| **Qué información necesita** | Cliente, número y valor de la factura, fecha de vencimiento, saldo, historial de contacto, canal permitido por el cliente |
| **Qué pasos ejecuta** | Lista las vencidas; arma un recordatorio con el número, el valor y el saldo; lo deja en una bandeja de aprobación; tras la aprobación lo envía por el canal permitido; cuando entra un pago, lo vincula a la factura; detiene los avisos |
| **Qué produce** | Recordatorios aprobados, un registro de envíos y facturas con estado actualizado |
| **Qué requiere aprobación** | Cada mensaje (o una plantilla aprobada de antemano) y cualquier acuerdo de pago |
| **Excepciones** | Pagos parciales, pagos duplicados, pagos sin referencia, clientes en disputa, clientes que pidieron no recibir avisos |
| **Métrica** | Horas semanales dedicadas, facturas vencidas con aviso en las últimas 48 horas, días promedio de mora |
| **Acción para hoy** | Exporta tus facturas vencidas a una hoja y anota para cada una el valor, el saldo y la última vez que contactaste al cliente |

**Regla de oro: una afirmación por chat no basta.** Un mensaje del cliente que dice «ya pagué» no marca una factura como pagada. Se marca como pagada solo con **evidencia verificable**: el pago aparece en el extracto bancario o en el sistema contable, con valor y fecha, y una persona lo concilia.

**Casos especiales**

- **Pago parcial:** se registra el valor recibido y la factura queda con el **saldo pendiente**. Los avisos continúan solo por ese saldo.
- **Pago duplicado:** si llegan dos pagos con la misma referencia, valor y fecha, el segundo no se aplica: pasa a revisión y se decide si es devolución o abono.
- **Pago sin referencia:** no se asigna a ninguna factura. Queda en «por identificar» y una persona lo vincula con evidencia (valor, fecha, nombre de quien pagó).
- **Cuándo se detienen los avisos:** factura pagada y conciliada, acuerdo de pago vigente, disputa abierta o solicitud del cliente de no recibir más mensajes.

**Canal permitido:** el que el cliente aceptó (por ejemplo, correo). Si usas WhatsApp, la documentación oficial indica que fuera de la ventana de atención al cliente solo se pueden enviar **mensajes de plantilla**, y que la plantilla debe estar en estado APROBADO antes de usarse. La documentación consultada no aclaró los requisitos de consentimiento: verifícalos con el proveedor y con tu responsable legal. En Colombia, el tratamiento de datos personales de clientes se rige por la Ley 1581 de 2012: confirma tus obligaciones con un profesional.

## 4. Proveedores

**Diagrama conceptual**

```text
Recibir        Detectar       Contrastar factura    Revisar        [ Autorizar
documentos  →  duplicados  →  con orden de compra → diferencias →   comunicaciones o pagos ]
                                      ↓ sin orden de compra
                                 REVISIÓN HUMANA (no se inventa una)
```

| Pregunta | Respuesta |
|---|---|
| **Qué lo inicia** | Llega una factura, cuenta de cobro o documento de un proveedor |
| **Qué información necesita** | Documento (PDF o foto), datos del proveedor, orden de compra, condiciones de pago, historial de documentos anteriores |
| **Qué pasos ejecuta** | Lee los datos del documento; busca duplicados (mismo proveedor, número y valor); busca la orden de compra; compara valores, cantidades y fechas; marca diferencias; prepara el borrador de respuesta o de solicitud de pago |
| **Qué produce** | Una ficha por documento con estado: coincide, tiene diferencias, posible duplicado o sin orden de compra |
| **Qué requiere aprobación** | Cualquier comunicación al proveedor y **todo pago** |
| **Excepciones** | Documento ilegible, proveedor nuevo, diferencias de valor, factura sin orden de compra, factura recibida dos veces |
| **Métrica** | Documentos revisados por semana, duplicados evitados, minutos por documento |
| **Acción para hoy** | Reúne las facturas de proveedores del último mes y marca cuáles tenían orden de compra y cuáles no |

**Sin orden de compra:** la factura se deriva a revisión. No se inventa una orden ni se asume una coincidencia: la decide la persona responsable.

**Diferencias:** define tú qué diferencia exige revisión (por ejemplo, cualquier diferencia de valor o de cantidad). La herramienta compara; la persona decide.

## 5. Gastos

**Diagrama conceptual**

```text
Recibir foto   Extraer       Comprobar campos     Proponer        Revisar casos     Registrar
del recibo  →  datos      →  y duplicados      →  categoría    →  dudosos         →  el gasto
                                                                   (persona)
```

| Pregunta | Respuesta |
|---|---|
| **Qué lo inicia** | Una persona envía la foto de un recibo o factura de compra |
| **Qué información necesita** | La imagen, quién envió el gasto, el catálogo de categorías de tu negocio y las reglas de aprobación |
| **Qué pasos ejecuta** | Extrae fecha, proveedor, valor y concepto; comprueba que los campos obligatorios estén; busca duplicados; propone una categoría de tu catálogo; separa los casos dudosos; registra los confirmados |
| **Qué produce** | Gastos registrados con su imagen de respaldo y una lista de pendientes por revisar |
| **Qué requiere aprobación** | Gastos dudosos, de valor alto (tú defines el límite) o sin soporte; las decisiones contables y tributarias |
| **Excepciones** | Recibo borroso o cortado, valor o fecha ilegible, gasto repetido, categoría incierta |
| **Métrica** | Gastos registrados sin corrección, porcentaje que pasa a revisión, minutos por recibo |
| **Acción para hoy** | Escribe tu catálogo de categorías (diez como máximo) y la regla de cuándo un gasto necesita aprobación |

**No se inventa nada.** Si un valor, una identificación (como un NIT) o un impuesto no se lee con claridad, el campo queda como **«ilegible»** y el recibo pasa a revisión. La herramienta no completa, no estima y no corrige por su cuenta.

## 6. Resumen diario

Un mensaje o una hoja al final del día con cuatro bloques. Cada dato indica su **fuente**.

| Bloque | Qué muestra | Fuente |
|---|---|---|
| Entradas confirmadas | Pagos recibidos y conciliados hoy | Extracto bancario o sistema contable, con aprobación de conciliación |
| Salidas confirmadas | Pagos realizados hoy | Extracto bancario o comprobante de pago aprobado |
| Cuentas pendientes | Por cobrar (facturas vencidas) y por pagar (documentos aprobados sin pagar) | Sistema contable u hoja de cobranzas y proveedores |
| Excepciones | Lo que una persona debe resolver | Bandejas de revisión de los tres flujos |

**Distingue lo facturado de lo cobrado y lo gastado de lo pagado.** Una venta facturada no es dinero en el banco, y un gasto registrado no es una salida de dinero.

**Ejemplo ficticio en COP (todos los datos son inventados)**

| Concepto | Valor | Qué es |
|---|---|---|
| Facturado hoy | $3.100.000 | Ventas emitidas; **no** es dinero cobrado |
| **Cobrado hoy (entradas confirmadas)** | **$2.350.000** | Facturas F-1043 ($1.500.000) y F-1051 ($850.000), conciliadas |
| Gastos registrados hoy | $1.540.000 | Recibos registrados; **no** es dinero pagado |
| **Pagado hoy (salidas confirmadas)** | **$1.180.000** | Proveedor ($780.000) y servicio ($400.000) |
| Movimiento confirmado del día | $1.170.000 | $2.350.000 − $1.180.000 |
| Por cobrar vencido | $3.900.000 | 3 facturas: $1.200.000 + $1.450.000 + $1.250.000 |
| Por pagar pendiente | $2.250.000 | 2 documentos: $1.300.000 + $950.000 |

**Excepciones del día:** un pago de $420.000 **sin referencia** (por identificar), una posible factura duplicada de un proveedor y un recibo ilegible.

## 7. Integraciones: qué es nativo, qué es API y qué es desarrollo

Antes de comprometerte con una herramienta, pregunta a cuál de estos tres grupos pertenece cada conexión:

- **Conexión nativa:** viene lista en la herramienta; se activa desde su configuración.
- **API:** la herramienta ofrece una puerta técnica; alguien debe configurar la conexión.
- **Desarrollo adicional:** hay que programar o contratar una solución a medida.

Lo que se pudo verificar en documentación oficial el 25 de octubre de 2026:

| Herramienta | Qué se verificó | Tipo | Pendiente |
|---|---|---|---|
| Alegra | API REST con autenticación Basic (correo del usuario y un token que se genera en Configuración → API); recursos de facturas de venta, compras, órdenes de compra, pagos, contactos y webhooks | API | Permisos exactos del token y límites de uso |
| Siigo | API pública con una clave de acceso y un punto para obtener un token; recursos de facturas, clientes, recibos de pago y compras | API | Requisitos para obtener acceso y detalles de cada recurso |
| WhatsApp (plataforma para empresas de Meta) | Fuera de la ventana de atención solo se envían plantillas, que deben estar aprobadas; la categoría de la plantilla afecta el precio | API y plantillas | Consentimiento, precios y duración de la ventana |
| n8n (automatización) | Su nodo «Wait» puede pausar un flujo y reanudarlo por una llamada web o un formulario, útil para aprobación humana | Función de la herramienta | Operaciones de aprobación específicas por aplicación |
| Bancos | **No se verificó** ninguna conexión bancaria | Sin verificar | Disponibilidad por banco: consulta al tuyo |

No se incluyen precios ni disponibilidad bancaria porque no se verificaron.

**Fuentes consultadas el 25 de octubre de 2026:** [API de Alegra](https://developer.alegra.com) · [API de Siigo](https://siigoapi.docs.apiary.io/) · [Plantillas de WhatsApp (Meta)](https://developers.facebook.com/documentation/business-messaging/whatsapp/templates/overview) · [Nodo Wait de n8n](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.wait/)

## 8. Plan de piloto de siete días

Es un **calendario adaptable**, no una garantía de implementación. Cada día termina con un entregable.

| Día | Qué haces | Entregable |
|---|---|---|
| 1 | Elige el proceso con la matriz y documenta los pasos tal como se hacen hoy | Descripción del proceso en una página |
| 2 | Reúne 20 a 30 casos reales (con datos sensibles protegidos) y define las categorías, estados y reglas de excepción | Hoja de datos de ejemplo |
| 3 | Define las aprobaciones, quién aprueba y el suplente; prepara los permisos mínimos (solo lectura) | Tabla de roles y permisos |
| 4 | Conecta la fuente de datos en modo lectura y prepara los borradores | Primeros borradores generados |
| 5 | Prueba con casos reales: normales y de excepción (parciales, duplicados, sin referencia, ilegibles) | Lista de casos probados y fallos |
| 6 | Corrige y repite las pruebas; revisa el registro de acciones y prueba el interruptor de parada | Lista de ajustes y prueba de parada |
| 7 | Evalúa con la métrica inicial y decide: ampliar, ajustar o detener | Informe de una página con la decisión |

## 9. Checklist operativo

| Tema | Pregunta de control |
|---|---|
| **Responsables** | ¿Hay una persona dueña del proceso y un suplente? |
| **Permisos mínimos** | ¿Empieza en solo lectura? ¿Las credenciales se guardan fuera de los archivos y se pueden revocar? |
| **Datos necesarios** | ¿Están completos los datos del caso (cliente, valor, referencia, orden de compra)? ¿Están protegidos los datos personales? |
| **Aprobaciones** | ¿Pagos, facturas emitidas y mensajes a clientes pasan por una persona antes de salir? |
| **Registro de acciones** | ¿Queda anotado qué se hizo, cuándo y quién aprobó? |
| **Manejo de errores** | ¿Qué ocurre si falla una conexión o un dato llega mal? ¿Dónde se ven los errores y quién los atiende? |
| **Posibilidad de detener** | ¿Existe un interruptor que pare el flujo y las instrucciones para hacerlo manualmente? |

## Plantilla CSV de diagnóstico y seguimiento

El archivo `plantilla-diagnostico.csv` tiene estas columnas, con tres ejemplos **ficticios** (marcados «EJEMPLO FICTICIO») y filas vacías para que completes tus datos:

| Columna | Qué escribir | Unidad o cálculo |
|---|---|---|
| Proceso | Nombre del proceso (cobranzas, proveedores, gastos…) | Texto |
| Responsable | Persona que lo ejecuta hoy | Texto |
| Herramienta actual | Con qué se hace hoy | Texto |
| Frecuencia | Cada cuánto ocurre | Diaria, semanal, quincenal o mensual |
| Volumen semanal | Cuántas tareas hay por semana | Número de tareas |
| Minutos por tarea | Cuánto toma una tarea | Minutos |
| Horas semanales | **Volumen semanal × minutos por tarea ÷ 60** | Horas (se calcula; deja en blanco lo que no conozcas) |
| Error habitual | El error que más se repite | Texto |
| Datos necesarios | Información que el proceso requiere | Texto |
| Prioridad | Puntaje de la matriz | De 4 a 20 |
| Aprobación requerida | Quién aprueba y qué | Texto |
| Métrica inicial | Valor de hoy, antes del piloto | Número y unidad |
| Objetivo del piloto | Qué quieres comprobar | Texto |
| Estado | Dónde va el proceso | Por diagnosticar, en piloto, en revisión, aprobado o detenido |

**Ejemplo del cálculo:** 40 facturas por semana × 6 minutos ÷ 60 = **4,0 horas semanales**.

## Supuestos y verificaciones pendientes

- Los datos, nombres y cifras de los ejemplos son **ficticios**.
- Las escalas de la matriz y el plan de siete días son una propuesta adaptable.
- No se verificaron precios, conexiones bancarias, requisitos de consentimiento de WhatsApp ni permisos exactos de las API.
- No se probó ninguna integración ni se instaló nada.
- Los diagramas son conceptuales; no son capturas de ninguna aplicación.
- Las decisiones contables, tributarias y legales corresponden al responsable competente.

## Siguiente paso

**¿Quieres adaptar este sistema a tu negocio? Escríbeme SISTEMA a @andresgomez.ia y revisamos qué puedes automatizar.**

[Instagram: @andresgomez.ia](https://www.instagram.com/andresgomez.ia/)
