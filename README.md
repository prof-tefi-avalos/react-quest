# ⚛️ React Quest · Semana 1

Juego interactivo para practicar **JSX y componentes**. Completás 6 misiones (más una misión bonus de bugs) editando archivos reales de React; el navegador te va tildando los objetivos **en vivo** y ganás XP.

## Cómo arrancar (Vite)

Necesitás **Node.js 20.19+ o 22.12+** (`node -v`).

```bash
cd react-quest
npm install
npm run dev
```

Abrí **http://localhost:5173**. Editá los archivos de `src/misiones/` y guardá: los objetivos se actualizan solos.

## Reglas del juego
- Solo editás `src/misiones/Mision1.jsx` … `Mision6.jsx` (y `Tarjeta.jsx` en la misión 5). **No hace falta tocar nada más.**
- Cada objetivo vale 10 XP y cada misión completa da +20 XP. Rangos: Aprendiz → Componente Junior → Maestro de las Llaves → **React Wizard** 🧙 (las 6 misiones) → **Leyenda** 👑 (con la misión bonus)
- ¿Trabado? Hay 3 pistas por misión y, después de usarlas, aparece la solución.
- Si tu código rompe, ¡mejor! Leé el error rojo (es tu mejor amigo). Al arreglarlo, la página se recarga sola.
- Tu progreso se guarda en el navegador. Botón "Reiniciar progreso" para empezar de cero.

## Estructura
```
react-quest/
├── index.html            ← la única página HTML (Vite la sirve desde acá)
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx          ← punto de entrada: monta <App /> en #root
    ├── App.jsx           ← el juego (no lo toques… todavía 😉)
    ├── game/             ← misiones, verificaciones y vista previa
    └── misiones/         ← ✏️ ACÁ TRABAJÁS
        ├── Mision1.jsx … Mision7.jsx
        └── Tarjeta.jsx
```
