// 🐛 MISIÓN BONUS 7 · Cazá los 5 bugs (nivel Árbol)
// Este archivo tiene 5 errores de JSX. Vite te los va a mostrar de a uno en un cartel rojo:
// leé el mensaje, arreglá, guardá, y mirá cuál aparece después.
// Los objetivos se tildan a medida que los resolvés. ¡No hace falta hacerlos en orden!
// Anotá para cada bug: 1) el mensaje, 2) por qué pasa, 3) cómo lo arreglaste.

function Tarjeta({ titulo }) {
  return <h3 className="tarjeta-bug">{titulo}</h3>;
}

function Mision7() {
  const nombre = "Ana";
  const perfil = { rol: "Dev", ciudad: "Rosario" };

  return (
    <h1 class="titulo">Portfolio de {nombre}</h1>
    <img src="/favicon.svg" alt="Logo" width="48">
    <p>Perfil: {perfil}</p>
    <tarjeta titulo="Proyecto 1" />
  );
}

export default Mision7;
