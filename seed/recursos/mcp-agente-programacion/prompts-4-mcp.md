# Ocho prompts reutilizables para los 4 MCP

Complemento de la guía «4 MCP para ampliar tu agente de programación». Dos prompts por herramienta. Ninguno ejecuta cambios sin tu aprobación; mantén activada la confirmación manual en tu agente.

Sustituye los campos entre corchetes antes de usar cada prompt. Úsalos en Claude Code o en Codex, con el servidor correspondiente conectado.

### Context7

**1. Documentación para mi versión**

```text
Usa Context7 para consultar la documentación de [LIBRERÍA] en la versión [VERSIÓN] que usa este proyecto (míralo en package.json). Explícame cómo [TAREA]. Cita la versión que consultaste y no uses ejemplos de otras versiones. Si Context7 no tiene esa versión, dímelo.
```

**2. Revisar código con documentación actual**

```text
Revisa [ARCHIVO] y, usando Context7 con la versión de [LIBRERÍA] de este proyecto, indica si hay funciones o patrones obsoletos. Para cada hallazgo muestra la línea, qué dice la documentación actual y una propuesta. No modifiques nada hasta que yo lo apruebe.
```

### Chrome DevTools MCP

**3. Auditar una página real**

```text
Abre [URL DE MI PÁGINA LOCAL] con Chrome DevTools. Toma una captura, revisa los mensajes de la consola y las solicitudes de red que fallan, y dame un informe con: errores, solicitudes lentas y qué archivo probablemente los causa. No abras sesiones personales ni inicies sesión en ninguna cuenta.
```

**4. Probar un flujo**

```text
Con Chrome DevTools, prueba este flujo en [URL]: [PASOS DEL FLUJO]. Después de cada paso, indica qué viste y toma una captura si algo falla. Al final dime qué pasos funcionaron, cuáles no y qué cambiarías en el código. No envíes formularios con datos reales.
```

### Supabase MCP

**5. Explorar el esquema en modo lectura**

```text
Usando Supabase MCP en modo de solo lectura, lista las tablas de mi proyecto de pruebas y describe sus columnas y relaciones. Propón mejoras de diseño, pero no ejecutes ninguna instrucción que cambie datos o estructura.
```

**6. Datos de ejemplo**

```text
En mi proyecto de pruebas de Supabase, crea una tabla [NOMBRE] con las columnas [COLUMNAS] y añade [NÚMERO] filas de datos de ejemplo ficticios. Antes de ejecutar, muéstrame el SQL y espera mi aprobación. No toques otras tablas. Todos los datos deben ser inventados.
```

### Vercel MCP

**7. Diagnosticar un despliegue (solo lectura)**

```text
Con Vercel MCP, busca el último despliegue del proyecto [PROYECTO] del equipo [EQUIPO]. Dime su estado, y si falló, revisa los registros y errores y explica la causa probable. Solo consulta: no cambies variables de entorno, dominios ni despliegues.
```

**8. Preparar una vista previa**

```text
Quiero una vista previa del proyecto [PROYECTO]. Primero dime qué opciones hay para desplegar una vista previa con mis herramientas (conexión con Git, la CLI de Vercel o Vercel MCP) y qué requiere cada una. No despliegues nada todavía: espera a que yo elija y apruebe.
```
