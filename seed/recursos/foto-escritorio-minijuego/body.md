Convierte la foto de tu escritorio en un minijuego de carreras para el navegador con Gemini 4 Argon. Google publicó una demo parecida (Argon en Antigravity, Blender MCP, Nano Banana y Three.js); esta guía empieza por una **versión 2D más simple y comprobable**. No replica la demo ni promete el mismo resultado, y los prompts son propuestas para probar.

## 1. Prepara la foto

- Foto de tu propio escritorio, desde arriba o en diagonal, bien iluminada.
- 3 o 4 objetos reconocibles (taza, cuaderno, teclado, planta) y mesa visible entre ellos: será la pista.
- Quita documentos, pantallas o etiquetas con datos que no quieras compartir.

## 2. Prepara el entorno

Abre un proyecto vacío en Antigravity, elige Gemini 4 Argon si tu cuenta lo tiene y adjunta la foto. Pide HTML, CSS y JavaScript con Canvas 2D y sin dependencias; así lo verificas antes de sumar Blender u otras herramientas. Si no tienes ese modelo, mira las fuentes oficiales al final.

## 3. Prompt inicial

```text
Usa la foto adjunta de mi escritorio como referencia para crear un minijuego de carreras visto desde arriba, jugable en el navegador.

Primero identifica los objetos que realmente se ven. Si algo no se distingue, indícalo en lugar de inventarlo. Después construye una versión 2D estilizada con Canvas, HTML, CSS y JavaScript.

Entrega: index.html, styles.css y game.js. Sin librerías, servicios de pago ni recursos externos.

Requisitos:
- Conserva aproximadamente la distribución de los objetos.
- Pista cerrada que los rodee sin atravesarlos.
- Coche con flechas o WASD.
- Colisiones con objetos y límites.
- Meta, contador de vueltas y cronómetro; una vuelta cuenta solo tras pasar los puntos de control.
- Botón de reiniciar y pausa; instrucciones visibles.

Primero que funcione; después mejora el aspecto. Prueba movimiento, colisiones, vueltas y reinicio si puedes, y dime qué verificaste y qué no. No publiques ni despliegues. Explícame cómo probarlo localmente.
```

## 4. Compruébalo

1. El coche responde a las teclas y se puede pausar.
2. Chocar con una taza o el borde no permite atravesarlos.
3. Cruzar la meta hacia atrás varias veces no suma vueltas falsas.
4. Se completa una vuelta sin quedar bloqueado.
5. Reiniciar devuelve coche, vueltas y cronómetro al inicio.

Si algo falla, describe la acción y lo que viste:

```text
Al cruzar la meta hacia atrás suma una vuelta. Corrige solo la validación: exige los puntos de control en orden y el sentido correcto. Conserva diseño y controles. Repite la prueba y dime el resultado.
```

## 5. Mejora una cosa por vez

```text
La planta y la taza cambiaron de lugar respecto a mi foto. Acerca sus posiciones a la referencia y adapta la pista sin bloquear el recorrido. Mantén la mecánica que ya funciona.
```

```text
Propón cómo llevar este juego a Three.js. Distingue lo que se modela con geometría simple de lo que requeriría Blender, imágenes o conexiones adicionales. Presenta primero el plan y los requisitos; no instales ni conectes nada todavía.
```

**Qué obtendrás:** un prototipo local 2D con archivos editables. Una escena 3D con físicas, texturas y audio como la demo exige más herramientas.

**Fuentes:** [demo y herramientas de Google](https://blog.google/innovation-and-ai/models-and-research/gemini-models/introducing-gemini-4-argon/) · [Desk Racer en AI Studio](https://aistudio.google.com/apps/bundled/desk-racer?fullscreenApplet=true&showAssistant=true&showPreview=true) (puede pedir iniciar sesión) · [ficha oficial de Gemini 4 Argon](https://ai.google.dev/gemini-api/docs/models/gemini-4-argon)
