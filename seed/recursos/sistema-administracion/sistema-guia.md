# SISTEMA: ¿qué parte de tu administración te quita más tiempo?

Antes de automatizar nada, hay que responder unas preguntas. Esta guía te las da. No es un sistema instalado ni asesoría contable, tributaria o legal: es un diagnóstico para que sepas por dónde empezar. Todos los números de los ejemplos son ficticios.

## 1. Diez preguntas

1. ¿Qué tareas administrativas repites cada semana?
2. ¿Cuántas facturas emites y recibes por semana?
3. ¿Cuántas vencidas tienes hoy y cuánto tardas en perseguirlas?
4. ¿Cuántas horas semanales dedicas a cobranzas, proveedores y gastos? Mídelo una semana, no lo calcules de memoria.
5. ¿Dónde viven tus datos: sistema contable, hojas, correo, chats, papel?
6. ¿Qué herramientas exportan datos o tienen API (una puerta técnica para que otros programas lean o escriban)?
7. ¿Qué datos faltan o llegan incompletos (referencias de pago, órdenes de compra)?
8. ¿Qué errores se repiten y cuánto costó el último?
9. ¿Quién aprueba pagos, mensajes y facturas? ¿Hay suplente?
10. Si el proceso parara dos semanas, ¿quién lo haría a mano?

**Cómo leerlas**

- Datos en chats o papel: se ordenan antes de pensar en automatizar.
- Más de 6 horas por semana en un proceso: es candidato.
- Errores que cuestan dinero: ahí una persona tiene que aprobar.
- Nadie respalda al que aprueba: define un suplente primero.
- No sabes cuántas horas dedicas: mide primero.

## 2. Preguntas por proceso

**Cobranzas**

- ¿Cuántas facturas vencidas tienes y cuánto suman?
- ¿Desde cuántos días de vencimiento una factura pasa a cobranza (por ejemplo, 15)?
- ¿Cómo sabes que un cliente realmente pagó: por su palabra o por el extracto?
- ¿Qué haces con un pago parcial o sin referencia?

**Proveedores**

- ¿Cuántas facturas de proveedor recibes al mes y por qué canal?
- ¿Cómo compruebas que no llegó dos veces?
- ¿Qué porcentaje tiene orden de compra?

**Gastos**

- ¿Cómo te llegan los recibos: foto, correo, papel?
- ¿Cuántos son ilegibles o no tienen soporte?
- ¿Quién decide a qué categoría va cada gasto?

**Resumen diario**

- ¿Distingues lo facturado de lo cobrado y lo gastado de lo pagado?
- ¿Cuánto tardas en saber cuánto hay por cobrar y por pagar?
- ¿Cuántas excepciones quedan sin dueño al final del día?

## 3. Puntúa tus procesos

Da de **1 a 5** a cada factor.

| Puntos | Frecuencia | Horas por semana | Impacto de errores | Facilidad de integración |
|---|---|---|---|---|
| 1 | Mensual | < 1 | Molestia menor | Papel o chats |
| 2 | Quincenal | 1 a < 3 | Corrección con trabajo | Hoja con formato libre |
| 3 | Semanal | 3 a < 6 | Retraso o reclamo | Hoja o exportación ordenada |
| 4 | Varias veces por semana | 6 a 10 | Pérdida de dinero | Sistema con API conocida |
| 5 | Diaria | > 10 | Pérdida grande o riesgo legal | API y datos limpios |

**Puntaje = frecuencia + tiempo + impacto + facilidad** (de 4 a 20).

Ejemplo ficticio: Cobranzas 3+3+4+3 = **13**; Proveedores 3+3+4+2 = **12**; Gastos 4+2+2+3 = **11**.

El de mayor puntaje es tu candidato. Si hay empate, gana el de mayor facilidad. Si ninguno pasa de 10, primero toca ordenar los datos.

## 4. Plantilla CSV

El archivo `plantilla-diagnostico.csv` tiene 14 columnas: proceso, responsable, herramienta actual, frecuencia, volumen semanal, minutos por tarea, horas semanales, error habitual, datos necesarios, prioridad, aprobación requerida, métrica inicial, objetivo del piloto y estado.

**Horas semanales = volumen semanal × minutos por tarea ÷ 60.** Ejemplo: 40 × 6 ÷ 60 = 4,0 horas.

Trae tres ejemplos ficticios marcados y filas vacías para tus datos.

## 5. Y ahora, ¿qué?

Cuando tengas el proceso elegido, te quedan tres datos:

1. **Qué proceso es.**
2. **Cuántas horas por semana te quita.**
3. **Dónde viven hoy los datos.**

Con eso se puede revisar si tiene sentido automatizarlo y qué parte debe seguir en manos de una persona. La regla que no cambia: la IA prepara, **una persona aprueba el dinero**.

**¿Quieres revisarlo conmigo? Escríbeme SISTEMA a @andresgomez.ia y cuéntame esos tres datos.**
