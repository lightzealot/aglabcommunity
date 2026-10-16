Guía práctica para intentarlo con Gemini 4 Argon: convierte la foto de tu escritorio en un minijuego de carreras que corre en el navegador.

## El punto de partida

Google publicó una demostración en la que fotos de un escritorio se convirtieron en un juego de carreras. El flujo combinó Argon en Antigravity, Blender MCP, Nano Banana y Three.js. Esta guía propone empezar por una **versión 2D más sencilla y comprobable**; no replica exactamente la demo ni promete el mismo resultado. Los prompts son propuestas para probar, no una ejecución ya validada.

## 1. Prepara la foto

- Usa una foto de tu propio escritorio tomada desde arriba o en diagonal, bien iluminada.
- Incluye tres o cuatro objetos reconocibles: una taza, un cuaderno, un teclado y una planta, por ejemplo.
- Deja una zona de mesa visible entre los objetos: será el espacio para la pista.
- Retira documentos, pantallas o etiquetas con datos que no quieras compartir.
- Para el primer intento basta una imagen nítida; guarda otra toma lateral si después quieres probar una escena 3D.

## 2. Prepara el entorno

Abre un proyecto vacío en Antigravity y selecciona Gemini 4 Argon si está disponible en tu cuenta. Adjunta la foto con el mecanismo de archivos del entorno. Si no tienes acceso a ese modelo, comprueba las opciones oficiales indicadas al final; esta guía no presupone una suscripción ni instala herramientas automáticamente.

Primero pide una versión de navegador en HTML, CSS y JavaScript, con Canvas 2D y sin dependencias externas. Así podrás verificar el juego antes de incorporar Blender u otras herramientas. No necesitas configurar Blender MCP para este primer prototipo.

## 3. Copia este prompt inicial

```text
Usa la foto adjunta de mi escritorio como referencia para crear un
minijuego de carreras visto desde arriba, jugable en el navegador.

Primero identifica los objetos que realmente se ven en la foto.
Si algo no se distingue, indícalo en lugar de inventarlo.
Después construye una versión 2D estilizada con Canvas, HTML, CSS
y JavaScript. No necesitas reconstruir un modelo 3D de la foto.

Entrega estos archivos: index.html, styles.css y game.js.
No uses librerías, servicios de pago ni recursos externos.

Requisitos:
- Conserva aproximadamente la distribución de los objetos de la foto.
- Diseña una pista cerrada que los rodee sin atravesarlos.
- Un coche controlable con flechas o WASD.
- Colisiones con objetos y límites de la pista.
- Una meta, contador de vueltas y cronómetro.
- Cuenta una vuelta solo después de completar los puntos de control.
- Un botón para reiniciar y controles de pausa.
- Instrucciones visibles al empezar.

Primero haz que funcione; después mejora su aspecto.
Prueba movimiento, colisiones, vueltas y reinicio si puedes ejecutar
el navegador. Dime qué verificaste y qué no pudiste comprobar.
No publiques ni despliegues el proyecto.
Al terminar, explícame cómo abrirlo y probarlo localmente.
```

## 4. Comprueba que funciona

Sigue las instrucciones locales que entregue el agente. Si abrir el HTML directamente no basta, pídele que indique cómo servirlo localmente con las herramientas que ya tengas.

Prueba estas cinco cosas:

1. El coche responde a las teclas y se detiene o pausa de forma controlable.
2. Chocar contra una taza o el borde no permite atravesarlos.
3. Cruzar la meta hacia delante y hacia atrás repetidamente no suma vueltas falsas.
4. La pista permite completar una vuelta sin quedar bloqueado.
5. Reiniciar devuelve coche, vueltas y cronómetro al estado inicial.

Si falla algo, describe la acción y el resultado observado. Por ejemplo:

```text
Al cruzar la meta hacia atrás suma una vuelta. Corrige únicamente
la validación de vueltas: exige pasar los puntos de control en orden
y cruzar la meta en el sentido correcto. Conserva el diseño y los
controles. Repite la prueba y dime el resultado.
```

## 5. Mejora una cosa por vez

Para conservar el parecido con la foto:

```text
La planta y la taza cambiaron de lugar respecto a mi foto.
Ajusta sus posiciones para acercarlas a la referencia y adapta
la pista sin bloquear el recorrido. Mantén la mecánica que ya funciona.
```

Para mejorar la presentación:

```text
Conserva las reglas y los controles. Mejora la iluminación ilustrada,
las sombras y la legibilidad del cronómetro. Mantén el estilo de
miniatura de escritorio. No añadas funciones nuevas.
```

Para evolucionar a 3D, después de validar el prototipo:

```text
Propón cómo llevar este juego a Three.js. Distingue lo que puedes
modelar con geometría simple de lo que requeriría Blender, imágenes
o conexiones adicionales. Primero presenta el plan y los requisitos;
no instales ni conectes servicios todavía.
```

## Qué vas a obtener

El objetivo inicial es un prototipo local 2D inspirado en tu escritorio, con archivos editables. La calidad y el tiempo dependerán de la foto, el entorno y las iteraciones. Una escena 3D con físicas, texturas y audio como la demostración de Google requiere un flujo más amplio y herramientas adicionales.

## Fuentes y demo

- [Demostración y herramientas utilizadas por Google](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-argon/)
- [Desk Racer en AI Studio: puede requerir iniciar sesión](https://aistudio.google.com/apps/bundled/desk-racer?fullscreenApplet=true&showAssistant=true&showPreview=true)
- [Ficha oficial de Gemini 4 Argon y acceso](https://ai.google.dev/gemini-api/docs/models/gemini-4-argon)
