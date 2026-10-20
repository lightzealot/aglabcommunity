# Checklist de contexto: detecta instrucciones duplicadas, contradictorias, obsoletas o innecesarias

Complemento de la guía «CONTEXTO: organiza tus instrucciones para trabajar mejor con Claude». Fecha de consulta de las fuentes: 19 de octubre de 2026.

## Checklist para revisar tu contexto

Marca cada punto con una prueba concreta (una línea, un archivo, un comando), no con una impresión.

**Duplicadas**

- [ ] ¿La misma regla aparece en `CLAUDE.md`, en una skill y en una regla por ruta?
- [ ] ¿Hay un `CLAUDE.local.md` que repite lo que ya dice el del proyecto?
- [ ] ¿Repites en el texto lo que la herramienta ya explica en su descripción?
- [ ] ¿La memoria automática guardó algo que ya está en `CLAUDE.md`?

**Contradictorias**

- [ ] ¿Hay dos instrucciones que piden cosas incompatibles (por ejemplo, «siempre pregunta» y «nunca interrumpas»)?
- [ ] ¿Un `CLAUDE.md` de subcarpeta contradice al de la raíz?
- [ ] ¿Una skill dice una cosa y una regla por ruta otra?

**Obsoletas**

- [ ] ¿Hay instrucciones escritas para un modelo anterior (por ejemplo, órdenes absolutas que compensaban un defecto antiguo)?
- [ ] ¿Se mencionan archivos, comandos o carpetas que ya no existen? (compruébalo buscándolos)
- [ ] ¿Hay fechas, versiones o nombres de personas que cambiaron?

**Innecesarias**

- [ ] ¿Describes lo que Claude puede deducir leyendo el proyecto (estructura de carpetas, dependencias)?
- [ ] ¿Hay frases genéricas como «escribe código limpio»?
- [ ] ¿Hay explicaciones largas o tutoriales que deberían estar en un documento enlazado o en una skill?
- [ ] Para cada línea: ¿quitarla haría que Claude cometa errores? Si no, es candidata a salir.

**Que se conservan**

- [ ] Restricciones de seguridad, privacidad y permisos (se mantienen, con su razón).
- [ ] Datos que no se pueden deducir del código: trampas, decisiones y requisitos del negocio.
- [ ] Reglas que deben cumplirse siempre: pásalas a un permiso o a un hook en lugar de dejarlas solo como frase.
