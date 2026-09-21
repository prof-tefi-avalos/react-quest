// 🎯 MISIÓN 3 · Detective de atributos
// Este formulario está escrito con costumbres de HTML. Abrí la consola (F12 → Console)
// y buscá los warnings rojos. Arreglá el código hasta que quede limpio.
//
// Objetivos:
//   1) className en vez de class
//   2) htmlFor en vez de for (y el id del input debe coincidir)
//   3) El botón: onClick y tabIndex en camelCase

function Mision3() {
  return (
    <div class="caja">
      <label for="nombre">Tu nombre</label>
      <input id="nombre" type="text" />
      <button onclick={() => alert("¡Hola!")} tabindex="0">
        Saludar
      </button>
    </div>
  );
}

export default Mision3;
