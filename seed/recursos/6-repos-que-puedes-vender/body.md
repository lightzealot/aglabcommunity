¿Quieres venderle algo con inteligencia artificial a un negocio y no sabes qué ofrecer? Aquí tienes **6 proyectos gratis de GitHub con licencia MIT**, a quién ofrecer cada uno, cómo venderlo y qué revisar antes de cobrar.

**Antes de empezar:** el código es gratis, pero operarlo puede costar (modelos de IA, claves de API, servidores). Las cifras de estrellas son del 26 de noviembre de 2026 y cambian todos los días. Esto es una guía práctica, no asesoría legal.

## Qué te deja hacer la licencia MIT

- **Puedes** usar el código, modificarlo, incluirlo en tu servicio y venderlo, también en proyectos cerrados.
- **Debes** conservar el aviso de copyright y el texto de la licencia en las copias o partes importantes que entregues.
- **Viene sin garantía:** el autor no responde si falla. Deja por escrito con tu cliente qué cubres tú.
- La licencia del código **no cubre** por sí sola los modelos de IA, los servicios en la nube, las marcas ni el contenido que proceses.

## Los 6 repos de un vistazo

| Repo | Estrellas | A quién | Qué vendes |
|---|---|---|---|
| AutoClip | 17.096 | Podcasters y coaches | Clips cortos de cada episodio |
| faster-whisper | 27.048 | Academias y creadores | Transcripciones y subtítulos revisados |
| Browser Use | 122.172 | Pymes con tareas web repetitivas | Automatización a la medida |
| Docling | 71.122 | Contadores y abogados | PDF y escaneos convertidos en datos |
| OpenHands | 94.431 | Negocios que necesitan una herramienta interna | Software a la medida |
| Hermes Agent | 266.447 | Negocios que no alcanzan a responder | Asistente montado y mantenido |

## 1. AutoClip

Le das un video largo y saca clips cortos.

=> [AutoClip en GitHub](https://github.com/zhouxiaoka/autoclip)

- **Cómo instalarlo:** app de escritorio en la sección Releases, para Windows 10/11 x64 o Mac con Apple Silicon. En Linux o Mac con Intel se corre con Docker.
- **Antes de cobrar:** corta en tu equipo, pero el análisis usa tu propia clave de API o un modelo local (Ollama o LM Studio). Trabaja solo con videos que tu cliente tenga derecho a usar.

## 2. faster-whisper

Transcribe en tu propio computador y marca el tiempo de cada palabra.

=> [faster-whisper en GitHub](https://github.com/SYSTRAN/faster-whisper)

```
pip install faster-whisper
```

- **Antes de cobrar:** es una librería de Python, no una app: tú armas el flujo. Revisa nombres y cifras a mano antes de entregar.

## 3. Browser Use

Un agente de IA que usa la web como una persona: pedidos, facturas, formularios.

=> [Browser Use en GitHub](https://github.com/browser-use/browser-use)

```
pip install 'browser-use==1.0.9'
```

- **Requisito:** Python 3.11 o más nuevo.
- **Antes de cobrar:** el modelo de IA y el navegador en la nube se cobran aparte. Respeta los términos de cada web que automatices y deja una persona revisando. La telemetría anónima se apaga con `ANONYMIZED_TELEMETRY=false`.

## 4. Docling

Convierte PDF y escaneos en datos ordenados.

=> [Docling en GitHub](https://github.com/docling-project/docling)

```
pip install docling
```

- **Requisito:** Python 3.10 o más nuevo.
- **Antes de cobrar:** cada modelo que usa tiene su propia licencia. Si hay datos personales, acuerda por escrito cómo se guardan y cómo se borran.

## 5. OpenHands

Un agente que programa: úsalo para construir software a la medida más rápido, y pruébalo tú antes de entregar.

=> [OpenHands en GitHub](https://github.com/OpenHands/OpenHands)

```
npm install -g @openhands/agent-canvas
```

- **Requisitos:** para correrlo aislado en contenedores, el README pide Node.js 24 o más nuevo, `uv` y Docker funcionando. Hay otras formas de instalarlo: revísalas en el README.
- **Antes de cobrar:** necesitas un modelo (de pago o local). El agente puede ejecutar comandos: úsalo en un entorno aislado y revisa el código.

## 6. Hermes Agent

Un asistente que se conecta a Telegram, WhatsApp, Slack y otros canales.

=> [Hermes Agent en GitHub](https://github.com/NousResearch/hermes-agent)

- **Cómo instalarlo:** sigue el instalador oficial que aparece en el README.
- **Antes de cobrar:** para responder las 24 horas necesita un equipo o servidor siempre encendido y un modelo. Define cuándo la conversación pasa a una persona y revisa las reglas de cada canal.

## Cómo venderlos

No vendas el repo: cualquiera lo descarga. **Vende el problema resuelto.**

| Forma | Qué entregas |
|---|---|
| Por entrega | Un resultado concreto: los clips de un episodio o una carpeta de documentos convertida en tabla |
| Instalación | Lo dejas funcionando en el equipo del cliente, le enseñas y entregas una hoja con los pasos |
| Mensualidad | Mantenimiento y soporte, con los costos de modelos y nube aparte y por escrito |

Antes de cobrar, haz una prueba pequeña con material real del cliente. No prometas resultados que no hayas medido.

## La letra pequeña: dos que no son como los otros

- **RedInk** ([HisMax/RedInk](https://github.com/HisMax/RedInk)): licencia CC BY-NC-SA 4.0, **uso no comercial**. Para cobrar, el autor ofrece una licencia comercial aparte que hay que pedirle.
- **PersonaLive** ([GVCLab/PersonaLive](https://github.com/GVCLab/PersonaLive)): su archivo LICENSE dice Apache-2.0, pero el README dice que el proyecto es **solo para investigación académica**. No lo uses para cobrar sin permiso escrito de los autores.

Moraleja: lee el archivo LICENSE **y también** el README.

## Prompt para revisar cualquier repo antes de cobrar

Pégalo en Claude y cambia lo que está entre corchetes. No reemplaza a un abogado.

```
Revisa este repositorio antes de que lo use para cobrarle a un cliente: [LINK DEL REPO].
Lo que quiero vender: [servicio y tipo de cliente].

1. Lee el archivo LICENSE y el README completo. Cita textual cualquier frase sobre uso comercial, investigación o restricciones.
2. Revisa las licencias de los modelos y de las dependencias importantes.
3. Dime qué servicios o claves de API cuestan dinero.
4. Dime qué avisos debo conservar al entregarlo.
5. Señala riesgos con datos personales, derechos de contenido y términos de las webs que use.
6. Termina con: SÍ, SÍ CON CONDICIONES o NO. Si algo no se puede comprobar, dilo.
```
