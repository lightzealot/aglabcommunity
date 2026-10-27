# Edita videos con Claude Code

Guía práctica + prompts + plantilla de estilo para preparar tu primer proyecto de video. Por Andrés Gómez, @andresgomez.ia.

Con esta guía organizas tu proyecto, conviertes referencias en reglas concretas y preparas tu primera edición con Claude Code. Cada sección termina en una acción que puedes completar.

**Qué se comprobó y qué no.** Los requisitos, planes y comandos de instalación salen de la documentación oficial, consultada el **26 de octubre de 2026**. **No se instaló ni se ejecutó ninguna herramienta, y los prompts no se probaron en un equipo**: el resultado depende de tu sistema, tu video y tu versión de cada herramienta. No hay edición automática perfecta: tú revisas cada paso.

## 1. Prepara tu proyecto

**Qué necesitas**

- **Un plan que incluya Claude Code:** Claude Pro, Max, Team o Enterprise, o una cuenta de Claude Console (API con créditos de pago). El plan gratis de claude.ai no incluye Claude Code. No incluyo precios porque cambian: míralos en claude.com/pricing. **Este flujo no es gratis.**
- **Tu equipo:** macOS 13 o posterior, Windows 10 (1809) o posterior, o Ubuntu 20.04 / Debian 10 o posteriores; 4 GB de RAM o más e internet. Editar video suele pedir más recursos: eso no se verificó.
- **Un video tuyo** y, si puedes, de 3 a 5 referencias (sección 3).
- **Una terminal** (PowerShell en Windows, Terminal en Mac).

**Claude Code no es el chat de Claude.** En el chat conversas y adjuntas archivos. Claude Code se abre en una carpeta de tu computador, lee tus archivos y ejecuta comandos, y te pide aprobación antes de cambiar algo. Por eso esta guía usa una carpeta de proyecto.

**Instala Claude Code** (según la documentación oficial):

```powershell
irm https://claude.ai/install.ps1 | iex
```

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

El primero es para Windows (PowerShell); el segundo, para macOS, Linux y WSL. Revisa lo que ejecutas si lo prefieres. Abre una terminal nueva y comprueba con `claude --version`. La primera vez que ejecutes `claude`, inicia sesión desde el navegador.

**Crea la carpeta del proyecto:**

```text
AI Video Editor/
  Raw footage/
  References/
  Exports/
  STYLE.md
```

En PowerShell: `mkdir "AI Video Editor\Raw footage", "AI Video Editor\References", "AI Video Editor\Exports"` y luego `ni "AI Video Editor\STYLE.md"`. En Mac o Linux: `mkdir -p "AI Video Editor"/{"Raw footage",References,Exports} && touch "AI Video Editor/STYLE.md"`.

| Carpeta | Qué guardar |
|---|---|
| **Raw footage/** | Tus videos originales, sin editar. Claude no debe modificarlos. |
| **References/** | Videos de referencia y, dentro, la carpeta `frames/` con los fotogramas extraídos. |
| **Exports/** | Transcripciones, pruebas y versiones exportadas (v1, v2, v3…). |
| **STYLE.md** | Tu guía de estilo: la plantilla de la sección 4. |

**Empieza con una prueba de 10 a 15 segundos.** Un tramo corto se procesa rápido, deja ver los problemas pronto y cuesta menos que repetir un video entero.

**Tu acción:** crea la carpeta, copia en `Raw footage/` un video corto tuyo y abre una terminal dentro de `AI Video Editor`. Escribe `claude`.

## 2. Prompt 1: preparar el entorno

Pega esto en Claude Code, dentro de `AI Video Editor`. Revisa tu equipo, consulta los requisitos oficiales y te propone solo lo necesario, con tu aprobación antes de instalar.

```text
Voy a editar videos con ayuda de Claude Code y quiero preparar este proyecto. Estás en la carpeta "AI Video Editor". Trabaja por pasos y no instales nada sin mi aprobación.

1. Revisa mi equipo en modo solo lectura: sistema operativo y versión, y si ya tengo Node.js, npm, Git, Python, FFmpeg, whisper.cpp (whisper-cli) y yt-dlp. Para cada una muestra el comando que usaste y la versión encontrada, o dime que no está.
2. Consulta la documentación oficial de Remotion, HyperFrames, FFmpeg, whisper.cpp y yt-dlp: remotion.dev, hyperframes.heygen.com, ffmpeg.org/download, github.com/ggml-org/whisper.cpp y github.com/yt-dlp/yt-dlp. Si no puedes consultar la web, dilo y no completes los requisitos de memoria. Anota los requisitos y la licencia de cada una, con la fecha de consulta.
3. Propón el conjunto mínimo para una primera edición de 10 a 15 segundos. No hace falta instalar todo: dime qué necesito de verdad (por ejemplo, FFmpeg para cortar y whisper.cpp para transcribir) y qué puedo dejar para después. Avisa si alguna herramienta tiene condiciones de licencia que deba conocer.
4. Muéstrame una tabla con: herramienta, para qué sirve, si ya está, comando de instalación exacto, qué cambia en mi equipo y si pide permisos de administrador. Espera mi respuesta antes de instalar. Ejecuta los comandos de uno en uno y explica cada uno.
5. Después de cada instalación, compruébala con su versión. Al final haz una prueba pequeña: crea en Exports un archivo de prueba de 3 segundos con FFmpeg a partir de un video de Raw footage (si hay uno) o con un tono generado (si no hay ninguno).
6. No borres, muevas ni sobrescribas nada de Raw footage ni de References. Si un archivo ya existe, usa otro nombre.
7. Si un comando falla: muéstrame el error completo, explícalo en palabras sencillas, propón una solución y espera mi aprobación. No repitas el mismo comando más de una vez.

Al terminar dame: lo que quedó instalado con sus versiones, lo que dejaste pendiente y el comando para repetir la prueba.
```

**Qué hace cada herramienta** (según su documentación oficial)

| Herramienta | Para qué | Requisitos y licencia |
|---|---|---|
| **FFmpeg** | Cortar, convertir y extraer fotogramas y audio | Solo ofrece código fuente; los binarios para Windows y Mac son de terceros enlazados desde su página, y en Linux vienen en los paquetes de la distribución. Licencia: no verificada aquí |
| **whisper.cpp** | Transcribir el audio con marcas de tiempo | Licencia MIT. Se compila con CMake; lee WAV de 16 bits. Modelo `base`: unos 142 MiB en disco |
| **yt-dlp** | Descargar un tramo de un video para estudiarlo | Python 3.11 o superior si usas pip; FFmpeg muy recomendado. Respeta los términos del sitio y los derechos del autor |
| **Remotion** | Crear video con código React (subtítulos, gráficos) | Gratis para personas, organizaciones sin ánimo de lucro y empresas de hasta 3 empleados; el resto necesita licencia de empresa |
| **HyperFrames** | Convertir HTML en video, pensado para agentes | Licencia Apache 2.0; Node.js 22 o superior y FFmpeg. El costo del renderizado en la nube no se verificó |

No necesitas todo: para una primera prueba suelen bastar FFmpeg y whisper.cpp. Remotion y HyperFrames hacen un trabajo parecido: elige una. Si algo cambió, la documentación manda.

**Resultado esperado:** una tabla de herramientas con su comando, tu aprobación, las versiones instaladas y un archivo de prueba de 3 segundos en `Exports/`.

**Si aparece un error:** copia el mensaje completo en Claude Code y pídele que lo explique y proponga una solución; no repitas el mismo comando. Si una herramienta no se instala, sigue sin ella y retoma después.

**Tu acción:** pega el prompt, responde la tabla y confirma que `Exports/` tiene el archivo de prueba.

## 3. Prompt 2: convertir referencias en una guía de estilo

**Elige de 3 a 5 referencias** que tengan tu mismo formato y objetivo. De cada una, anota un tramo de 10 a 20 segundos que te guste y por qué. Guárdalas en `References/`, con el nombre del archivo y el intervalo. Puedes usar tus propios videos, una grabación de pantalla que hagas tú, o descargar un tramo con yt-dlp **solo si los términos del sitio y los derechos te lo permiten** y solo para estudiarlo:

```text
yt-dlp --download-sections "*00:10-00:25" -o "References/%(title)s.%(ext)s" URL
```

`--download-sections` está en el README de yt-dlp; este comando concreto no se probó. Requiere FFmpeg.

Pega este prompt (completa lo que está entre corchetes). **No se verificó si Claude Code puede ver un video directamente**, por eso el prompt le pide que lo compruebe y, si no puede, extraiga fotogramas y transcriba el audio.

```text
Quiero convertir mis videos de referencia en una guía de estilo concreta. Las referencias están en References/ (o te daré enlaces).
Objetivo del video: [OBJETIVO]
Plataforma y formato: [por ejemplo, Reels 9:16]
Audiencia: [AUDIENCIA]

Antes de analizar:
1. Dime qué puedes hacer con un video directamente en esta sesión. Si no puedes verlo, comprueba si tengo FFmpeg para extraer fotogramas (uno por segundo y uno en cada corte) y whisper.cpp para transcribir el audio. Si falta algo, dime qué y pide mi aprobación antes de instalarlo. No inventes lo que no pudiste analizar: márcalo como "no analizado".
2. Trabaja una referencia a la vez. Guarda los fotogramas en References/frames/[nombre]/ y no toques el video original.

Para cada referencia mide y anota, con el tiempo en que lo viste:
- Ritmo y cortes: duración típica de cada plano, cortes por cada 10 segundos y duración de las pausas.
- Subtítulos: fuente (si puedes identificarla), tamaño aproximado en relación con la altura del video, color, contorno o fondo, posición, palabras por línea y si resaltan palabras.
- Colores y encuadres: colores dominantes (en hexadecimal si puedes), tipo de plano y cambios de zoom.
- Apoyos visuales: capturas, rótulos, íconos, flechas; cuándo aparecen y cuánto duran.
- Música y efectos: si hay música, su volumen respecto a la voz, y los efectos de sonido.

Después compara las referencias y entrégame la guía en formato STYLE.md (usa la estructura de mi STYLE.md si existe en la carpeta; si no, propón una). Cada regla debe tener: un valor concreto, un ejemplo con archivo y tiempo, y una excepción. No escribas reglas vagas como "edición dinámica" o "estilo profesional": conviértelas en números o en una acción que se pueda comprobar. Si las referencias se contradicen, dímelo y propón una opción. Al final lista lo que no pudiste verificar.
```

**Resultado esperado:** reglas con valor, ejemplo y excepción, como "subtítulos de 3 palabras como máximo (referencia-1.mp4, 00:07)", y una lista de lo que no se pudo analizar. Una regla como "edición dinámica" no sirve: pídele que la convierta en un número o una acción.

**Tu acción:** guarda el resultado en `STYLE.md`.

## 4. Plantilla STYLE.md

Copia la plantilla en `STYLE.md` y complétala. Debajo hay un ejemplo rellenado.

```text
# STYLE.md · [NOMBRE DEL PROYECTO]

## 1. Objetivo y audiencia
- Objetivo del video: [qué debe entender o hacer quien lo ve]
- Audiencia: [quién es y qué sabe ya]
- Tono: [cercano, técnico, humorístico…]

## 2. Plataforma, formato y duración
- Plataforma: [Instagram Reels, YouTube Shorts, TikTok, YouTube…]
- Formato: [ancho x alto, por ejemplo 1080 x 1920 (9:16)]
- Duración objetivo: [segundos]
- Fotogramas por segundo: [24, 30…]

## 3. Referencias
| Archivo o enlace | Intervalo | Qué copiar de ahí |
|---|---|---|
| References/[archivo] | [00:00 a 00:00] | [subtítulos, ritmo, color…] |

## 4. Subtítulos
- Fuente: [nombre]
- Tamaño: [en píxeles o % de la altura]
- Color y contorno o fondo: [valores hexadecimales]
- Posición: [por ejemplo, centrados, a X px del borde inferior]
- Palabras por línea: [número]
- Resaltado: [qué palabras y cómo]
- Excepción: [cuándo no se aplica]

## 5. Cortes y pausas
- Silencio que se elimina: [más de X segundos]
- Pausa que se conserva: [hasta X segundos, cuándo]
- Duración típica de un plano: [segundos]
- Muletillas: [se quitan o se conservan, cuáles]
- Excepción: [ ]

## 6. Cambios de encuadre
- Tipo: [zoom, plano abierto o cerrado]
- Cada cuánto: [segundos]
- Intensidad: [por ejemplo, de 100 % a 110 %]
- Excepción: [ ]

## 7. Apoyos visuales
- Qué entra: [capturas, rótulos, íconos, flechas]
- Cuándo: [al nombrar una herramienta, al dar una cifra…]
- Duración en pantalla: [segundos]
- Dónde se coloca: [zona de la pantalla]
- Excepción: [ ]

## 8. Voz, música y efectos
- Voz: [nivel y limpieza del sonido de fondo]
- Música: [archivo, de dónde viene y qué licencia tiene; solo música autorizada]
- Volumen de la música respecto a la voz: [valor]
- Efectos de sonido: [cuáles y cuándo]

## 9. Excepciones generales
- [Situación → qué se hace en su lugar]

## 10. Revisión y exportación
- Revisión: [lista de comprobación en el teléfono]
- Exportación: [resolución, formato, nombre del archivo, carpeta Exports]
- Versiones: [v1, v2…; nunca sobrescribir]
```

**Ejemplo: Reel educativo de IA para pequeños negocios.** Todos los valores son de ejemplo, no reglas universales.

```text
# STYLE.md · Reel educativo de IA para pequeños negocios (EJEMPLO)

> Los valores de este ejemplo son una propuesta para un caso concreto. No son reglas universales: cámbialos según tus referencias.

## 1. Objetivo y audiencia
- Objetivo del video: que el dueño de un negocio pequeño entienda una tarea que la IA le ahorra y la pruebe hoy.
- Audiencia: dueños de negocios pequeños sin experiencia técnica.
- Tono: cercano y directo, sin tecnicismos.

## 2. Plataforma, formato y duración
- Plataforma: Instagram Reels.
- Formato: 1080 x 1920 (9:16).
- Duración objetivo: 30 a 45 segundos.
- Fotogramas por segundo: 30.

## 3. Referencias
| Archivo o enlace | Intervalo | Qué copiar de ahí |
|---|---|---|
| References/referencia-1.mp4 | 00:05 a 00:20 | Subtítulos por palabras y ritmo de cortes |
| References/referencia-2.mp4 | 00:10 a 00:25 | Capturas de pantalla al nombrar una herramienta |
| References/referencia-3.mp4 | 00:00 a 00:08 | Gancho de los primeros segundos |

## 4. Subtítulos
- Fuente: sans serif gruesa, legible en teléfono.
- Tamaño: 6 % de la altura del video (unos 115 px).
- Color: blanco (#FFFFFF) con contorno negro (#000000) de 6 px.
- Posición: centrados, a 380 px del borde inferior, fuera de la zona que tapan los botones de la app.
- Palabras por línea: máximo 3.
- Resaltado: la palabra clave de cada frase en naranja (#D9500B).
- Excepción: una cifra o un nombre propio puede ocupar su propia línea aunque sea más largo.

## 5. Cortes y pausas
- Silencio que se elimina: todo el que dure más de 0,4 segundos.
- Pausa que se conserva: hasta 0,2 segundos después de una pregunta o de una cifra.
- Duración típica de un plano: 2 a 4 segundos.
- Muletillas ("eh", "este"): se quitan.
- Excepción: si quitar una pausa vuelve la frase atropellada, se deja.

## 6. Cambios de encuadre
- Tipo: zoom suave sobre la cara.
- Cada cuánto: cada 4 a 6 segundos.
- Intensidad: de 100 % a 110 %.
- Excepción: durante una captura de pantalla no hay zoom.

## 7. Apoyos visuales
- Qué entra: captura de pantalla de la herramienta que se nombra.
- Cuándo: en el momento en que se dice el nombre.
- Duración en pantalla: 2 a 3 segundos.
- Dónde se coloca: mitad superior, sin tapar los subtítulos.
- Excepción: si no hay una captura clara, no se pone ninguna.

## 8. Voz, música y efectos
- Voz: normalizada y sin sonidos de fondo fuertes.
- Música: instrumental autorizada; escribe aquí la fuente y la licencia.
- Volumen de la música respecto a la voz: unos 20 dB por debajo.
- Efectos de sonido: un "pop" suave en cada captura de pantalla.

## 9. Excepciones generales
- Si una regla de este archivo choca con la claridad del mensaje, gana el mensaje y se anota el cambio.

## 10. Revisión y exportación
- Revisión: lista del teléfono de la guía.
- Exportación: 1080 x 1920, MP4 (H.264), nombre reel-[tema]-v1.mp4 en Exports/.
- Versiones: v1, v2, v3; nunca sobrescribir.
```

**Tu acción:** completa tu `STYLE.md`. Si un valor no lo sabes, déjalo vacío o pon "por definir"; no lo inventes.

## 5. Prompt 3: preparar la primera edición

Pega esto después de tener `STYLE.md` y un video en `Raw footage/`. Cambia `[ARCHIVO]` por el nombre del video.

```text
Vamos a preparar la primera edición.
Archivo: Raw footage/[ARCHIVO]
Estilo: lee STYLE.md completo antes de empezar y dime qué reglas vas a aplicar.

Paso 1. Comprobaciones. Confirma que puedes abrir el video y que tiene audio. Con FFmpeg dime duración, resolución, fotogramas por segundo y códec de audio. Si algo falla, detente y dímelo.
Paso 2. Transcripción. Transcribe el audio con marcas de tiempo y guárdala en Exports/transcripcion.txt. Marca las frases dudosas.
Paso 3. Plan de cortes. Propón qué cortar (silencios largos, muletillas, repeticiones) con el tiempo exacto de cada corte. No cambies el sentido del mensaje, no cortes palabras a la mitad y conserva las pausas naturales que sirven para respirar o dar énfasis, según STYLE.md. Muéstralo en una tabla: tiempo inicial, tiempo final, qué se quita y por qué.
Paso 4. Storyboard. Antes de renderizar, descríbeme el video escena por escena: tiempo, qué se ve, qué dice, subtítulos y apoyos visuales. Espera mi aprobación.
Paso 5. Prueba. Con mi aprobación, genera solo 10 a 15 segundos (dime qué tramo) en Exports/prueba-v1.mp4. Dime qué reglas de STYLE.md cumple y cuáles no pudo cumplir.
Paso 6. Correcciones. Aplica mis comentarios y genera prueba-v2.mp4. Renderiza el video completo solo después de que yo escriba "exporta el completo".

Reglas: nunca modifiques ni sobrescribas nada de Raw footage. Guarda cada versión con un nombre nuevo en Exports (v1, v2, v3…). Si una herramienta no está instalada, pide mi aprobación antes de instalarla.
```

**Resultado esperado:** `Exports/transcripcion.txt`, una tabla de cortes, un storyboard, `prueba-v1.mp4` y `prueba-v2.mp4`. El video completo solo se exporta cuando escribes "exporta el completo".

**Tu acción:** aprueba o corrige el storyboard, mira la prueba en tu teléfono y pide las correcciones.

## 6. Revisión y problemas frecuentes

| Problema | Qué hacer |
|---|---|
| **El resultado es demasiado genérico** | Tu `STYLE.md` tiene reglas vagas. Pídele a Claude: "Convierte cada regla en un número y un ejemplo con archivo y tiempo". Añade una referencia mejor. |
| **Subtítulos pequeños o mal ubicados** | Pide el tamaño como % de la altura y la distancia al borde inferior. Revisa en el teléfono: los botones de la app tapan la parte baja. |
| **Cortes que quitan palabras o pausas necesarias** | Sube el silencio mínimo que se elimina y define qué pausas se conservan. Pide una tabla de cortes y revisa cada tiempo antes de renderizar. |
| **No se pudo analizar una referencia** | Comprueba que el archivo abre y que FFmpeg está instalado. Si sigue fallando, descríbele tú a Claude lo que ves (tamaño, posición, ritmo) o usa otra referencia. |
| **Una dependencia no se instaló** | Copia el error completo. Pide que lo explique, propón la alternativa más simple y avanza sin esa herramienta si no es imprescindible. |
| **Audio y subtítulos desincronizados** | Compara los tiempos de `transcripcion.txt` con el video. Pide que regenere los subtítulos desde la transcripción y verifica la frecuencia de fotogramas (la guía del prompt 3 la mide). |

**Lista de revisión en el teléfono antes de publicar**

- [ ] Lo vi en el teléfono, con sonido y en pantalla completa.
- [ ] Los subtítulos se leen sin esfuerzo y no los tapan los botones de la app.
- [ ] No faltan palabras y las pausas importantes siguen ahí.
- [ ] Audio y subtítulos van al mismo tiempo de principio a fin.
- [ ] La música es autorizada y no tapa la voz.
- [ ] El inicio explica en los primeros segundos de qué trata.
- [ ] El archivo exportado tiene el formato y el nombre de `STYLE.md`.
- [ ] Conservo el original en `Raw footage/`.

## Documentación consultada (26 de octubre de 2026)

- Claude Code, instalación y requisitos: https://code.claude.com/docs/en/setup
- Claude Code, primeros pasos: https://code.claude.com/docs/en/quickstart
- Remotion: https://github.com/remotion-dev/remotion (licencia en el archivo LICENSE.md; precios en remotion.pro/license)
- HyperFrames: https://github.com/heygen-com/hyperframes y https://hyperframes.heygen.com/introduction
- FFmpeg: https://ffmpeg.org/download.html
- whisper.cpp: https://github.com/ggml-org/whisper.cpp
- yt-dlp: https://github.com/yt-dlp/yt-dlp
