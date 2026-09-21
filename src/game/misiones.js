// Metadatos de cada misión: historia, objetivos (se verifican en vivo), pistas y solución.
// 👉 Los alumnos NO necesitan tocar este archivo. Solo editan src/misiones/*.jsx

const year = new Date().getFullYear()
const txt = (root) => root.textContent || ''

export const MISIONES = [
  {
    id: 1,
    file: 'Mision1.jsx',
    titulo: 'Hola, JSX',
    emoji: '👋',
    concepto: 'Llaves { } y expresiones',
    historia:
      'Un robot llamado JSX-9000 necesita saber quién sos. Tenés que hablarle en JSX y usar las llaves para meter JavaScript adentro.',
    objetivos: [
      {
        label: 'Cambiá "???" por tu nombre: el título debe decir “Hola, <tu nombre>”',
        test: (r) => {
          const h = r.querySelector('h1, h2')
          return !!h && /hola/i.test(txt(h)) && !txt(h).includes('???') && txt(h).length > 8
        },
      },
      {
        label: 'Mostrá en un <p> cuántos años vas a tener el año que viene (edad + 1, con llaves)',
        test: (r) => [...r.querySelectorAll('p')].some((p) => /\d{1,3}/.test(txt(p)) && !/EDAD/.test(txt(p))),
      },
      {
        label: `Mostrá el año actual (${year}) calculado con new Date().getFullYear()`,
        test: (r) => txt(r).includes(String(year)),
      },
    ],
    pistas: [
      'Las llaves abren una ventana a JavaScript: <h2>Hola, {nombre}</h2>',
      'Para la cuenta: <p>El año que viene tendré {edad + 1}</p>',
      'El año actual es una expresión: {new Date().getFullYear()}',
    ],
    solucion: `function Mision1() {
  const nombre = "Ana";
  const edad = 20;

  return (
    <div>
      <h2>Hola, {nombre}</h2>
      <p>El año que viene tendré {edad + 1}</p>
      <p>Estamos en {new Date().getFullYear()}</p>
    </div>
  );
}
export default Mision1;`,
  },
  {
    id: 2,
    file: 'Mision2.jsx',
    titulo: 'Un solo raíz',
    emoji: '🌳',
    concepto: 'Un único elemento raíz y Fragments',
    historia:
      'Un componente solo puede devolver UNA cosa. El div de abajo es un “envoltorio” que ensucia el HTML. Usá un Fragment para hacerlo invisible… y después rompé el código a propósito.',
    objetivos: [
      {
        label: 'Reemplazá el <div> por un Fragment <> … </> (el título tiene que quedar “suelto”, sin envoltorio)',
        test: (r) => r.firstElementChild?.tagName === 'H2',
      },
      {
        label: 'Agregá una lista <ul> con al menos 3 <li>',
        test: (r) => r.querySelectorAll('ul > li').length >= 3,
      },
      {
        label: 'Agregá un párrafo <p> que explique en tus palabras por qué existe la regla',
        test: (r) => [...r.querySelectorAll('p')].some((p) => txt(p).trim().length > 15 && !/^pista/i.test(txt(p).trim())),
      },
    ],
    pistas: [
      'Un Fragment se escribe con una etiqueta vacía: <> y </>',
      'Cambiá <div> por <> y </div> por </>',
      'Después probá lo contrario: borrá el Fragment y leé el error rojo. ¡Es tu nuevo mejor amigo!',
    ],
    solucion: `function Mision2() {
  return (
    <>
      <h2>Un solo raíz</h2>
      <p>Una función devuelve una sola cosa, por eso se agrupa todo.</p>
      <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
      </ul>
    </>
  );
}
export default Mision2;`,
  },
  {
    id: 3,
    file: 'Mision3.jsx',
    titulo: 'Detective de atributos',
    emoji: '🕵️',
    concepto: 'className, htmlFor y camelCase',
    historia:
      'El código de abajo se escribió con costumbres de HTML. Algunos navegadores lo toleran y otras veces React avisa en la consola (F12), pero en JSX estos atributos se escriben distinto. Encontralos.',
    objetivos: [
      {
        label: 'Usá className en vez de class para la caja',
        test: (r, e) => !!r.querySelector('.caja') && /className\s*=/.test(e.source) && !/\bclass\s*=/.test(e.source),
      },
      {
        label: 'Conectá el <label> con el <input> usando htmlFor',
        test: (r, e) => {
          const l = r.querySelector('label')
          const i = r.querySelector('input')
          return !!l && !!i && !!i.id && l.htmlFor === i.id && /htmlFor\s*=/.test(e.source) && !/\bfor\s*=/.test(e.source)
        },
      },
      {
        label: 'Arreglá el botón: en JSX los atributos se escriben en camelCase (onClick, tabIndex)',
        test: (_r, e) => /onClick\s*=/.test(e.source) && /tabIndex\s*=/.test(e.source) && !/\b(onclick|tabindex)\s*=/.test(e.source),
      },
    ],
    pistas: [
      'class es palabra reservada de JavaScript: en JSX se escribe className',
      'for → htmlFor. Y el id del input tiene que coincidir con el htmlFor del label.',
      'onclick → onClick y tabindex → tabIndex. Ojo: tabIndex recibe un número entre llaves: tabIndex={0}',
    ],
    solucion: `function Mision3() {
  return (
    <div className="caja">
      <label htmlFor="nombre">Tu nombre</label>
      <input id="nombre" type="text" />
      <button onClick={() => alert("¡Hola!")} tabIndex={0}>
        Saludar
      </button>
    </div>
  );
}
export default Mision3;`,
  },
  {
    id: 4,
    file: 'Mision4.jsx',
    titulo: 'La tienda inteligente',
    emoji: '🛒',
    concepto: 'Expresiones, ternarios y estilos inline',
    historia:
      'Tu tienda tiene un producto sin precio final ni estado. Calculá el precio con IVA y mostrá si hay stock, todo con expresiones dentro de las llaves.',
    objetivos: [
      {
        label: 'Mostrá el precio con IVA del 21% calculado con JavaScript (12100)',
        test: (r) => txt(r).replace(/[.,\s$]/g, '').includes('12100'),
      },
      {
        label: 'Usá un ternario para mostrar “Disponible” o “Sin stock” según la variable stock',
        test: (r) => /disponible|sin stock/i.test(txt(r)),
      },
      {
        label: 'Pintá el estado con un estilo inline: verde si hay stock, rojo si no',
        test: (r) => [...r.querySelectorAll('[style]')].some((e) => /color/i.test(e.getAttribute('style') || '')),
      },
    ],
    pistas: [
      'Precio con IVA: {precio * 1.21}',
      'Ternario: {stock > 0 ? "Disponible" : "Sin stock"}',
      'Estilo inline con DOS llaves: style={{ color: stock > 0 ? "green" : "red" }}',
    ],
    solucion: `function Mision4() {
  const precio = 10000;
  const stock = 0;

  return (
    <div>
      <h2>Zapatillas</h2>
      <p>Precio con IVA: \${precio * 1.21}</p>
      <p style={{ color: stock > 0 ? "green" : "red" }}>
        {stock > 0 ? "Disponible" : "Sin stock"}
      </p>
    </div>
  );
}
export default Mision4;`,
  },
  {
    id: 5,
    file: 'Mision5.jsx',
    titulo: 'Construí tu propio componente',
    emoji: '🧱',
    concepto: 'Crear → exportar → importar → usar',
    historia:
      'Hay un componente Tarjeta guardado en su propio archivo, pero nadie lo puede usar todavía. Completá el ciclo de 4 pasos y usalo 3 veces.',
    objetivos: [
      {
        label: 'Paso 2 · Exportá Tarjeta en src/misiones/Tarjeta.jsx (export default)',
        test: (_r, extra) => extra?.tarjetaExporta === true,
      },
      {
        label: 'Paso 3 · Importalo en Mision5.jsx (descomentá la línea import)',
        test: (_r, e) => /import\s+Tarjeta\s+from/.test(e.source),
      },
      {
        label: 'Paso 4 · Usá <Tarjeta /> tres veces',
        test: (r) => r.querySelectorAll('.tarjeta').length >= 3,
      },
    ],
    pistas: [
      'Al final de Tarjeta.jsx agregá: export default Tarjeta;',
      'En Mision5.jsx: descomentá  import Tarjeta from "./Tarjeta.jsx";',
      'Dentro del return de Mision5 escribí <Tarjeta /> tres veces (con un <> alrededor)',
    ],
    solucion: `// Tarjeta.jsx
function Tarjeta() {
  return (
    <div className="tarjeta">
      <h3>Soy una tarjeta</h3>
    </div>
  );
}
export default Tarjeta;

// Mision5.jsx
import Tarjeta from "./Tarjeta.jsx";

function Mision5() {
  return (
    <>
      <Tarjeta />
      <Tarjeta />
      <Tarjeta />
    </>
  );
}
export default Mision5;`,
  },
  {
    id: 6,
    file: 'Mision6.jsx',
    titulo: 'Jefe final: tu portfolio',
    emoji: '🏆',
    concepto: 'Todo junto',
    historia:
      '¡El jefe final! Armá un mini portfolio que junte TODO lo aprendido: componentes propios, un solo raíz, llaves, ternarios y estilos.',
    objetivos: [
      {
        label: 'Un <header> con un <h1> que incluya tu nombre desde una variable',
        test: (r) => !!r.querySelector('header h1') && txt(r.querySelector('header h1')).trim().length > 2,
      },
      {
        label: 'Una lista de al menos 3 skills (<ul> con <li>)',
        test: (r) => r.querySelectorAll('ul > li').length >= 3,
      },
      {
        label: 'Al menos 2 proyectos, cada uno con la clase “proyecto” (¡un componente reutilizado!)',
        test: (r) => r.querySelectorAll('.proyecto').length >= 2,
      },
      {
        label: 'Un ternario: “Disponible para trabajar” o “No disponible”',
        test: (r) => /disponible para trabajar|no disponible/i.test(txt(r)),
      },
      {
        label: `Un <footer> con el año actual (${year})`,
        test: (r) => !!r.querySelector('footer') && txt(r.querySelector('footer')).includes(String(year)),
      },
    ],
    pistas: [
      'Definí const Proyecto = ... o function Proyecto() {...} en el mismo archivo y usalo varias veces',
      'const disponible = true;  →  {disponible ? "Disponible para trabajar" : "No disponible"}',
      'El footer: <footer>© {new Date().getFullYear()} {nombre}</footer>',
    ],
    solucion: `function Proyecto() {
  return (
    <article className="proyecto">
      <h3>Mi proyecto</h3>
      <p>Una app hecha con React.</p>
    </article>
  );
}

function Mision6() {
  const nombre = "Ana";
  const disponible = true;

  return (
    <>
      <header>
        <h1>Portfolio de {nombre}</h1>
        <p style={{ color: disponible ? "green" : "gray" }}>
          {disponible ? "Disponible para trabajar" : "No disponible"}
        </p>
      </header>
      <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>React</li>
      </ul>
      <Proyecto />
      <Proyecto />
      <footer>© {new Date().getFullYear()} {nombre}</footer>
    </>
  );
}
export default Mision6;`,
  },
  {
    id: 7,
    file: 'Mision7.jsx',
    titulo: 'Bonus: cazá los 5 bugs',
    emoji: '🐛',
    concepto: 'Debugging de JSX (nivel Árbol)',
    historia:
      'Este archivo tiene 5 errores de JSX escondidos. Vite te va a mostrar los errores de a uno (¡mirá el cartel rojo!). Arreglá uno, guardá, y fijate cuál aparece después.',
    objetivos: [
      {
        label: 'Bug 1 · Hacé que el código compile (leé el primer error del cartel rojo)',
        test: (r) => !!r.querySelector('h1'),
      },
      {
        label: 'Bug 2 · Usá el atributo correcto de JSX para la clase CSS',
        test: (r, e) => !!r.querySelector('h1.titulo') && !/\bclass\s*=/.test(e.source),
      },
      {
        label: 'Bug 3 · Cerrá la etiqueta de la imagen como pide JSX',
        test: (r, e) => !!r.querySelector('img') && /<img[^>]*\/>/.test(e.source),
      },
      {
        label: 'Bug 4 · Mostrá el rol y la ciudad del perfil (no el objeto entero)',
        test: (r) => txt(r).includes('Dev') && txt(r).includes('Rosario'),
      },
      {
        label: 'Bug 5 · Lograr que se dibuje la Tarjeta (¿cómo deben llamarse los componentes?)',
        test: (r) => !!r.querySelector('.tarjeta-bug'),
      },
    ],
    pistas: [
      'Un componente solo puede devolver UN elemento raíz. Envolvelo todo con <> … </>',
      'class → className · <img> → <img ... /> · {perfil} → {perfil.rol} y {perfil.ciudad}',
      '<tarjeta /> con minúscula es una etiqueta HTML inventada. Los componentes empiezan con Mayúscula: <Tarjeta />',
    ],
    solucion: `function Tarjeta({ titulo }) {
  return <h3 className="tarjeta-bug">{titulo}</h3>;
}

function Mision7() {
  const nombre = "Ana";
  const perfil = { rol: "Dev", ciudad: "Rosario" };

  return (
    <>
      <h1 className="titulo">Portfolio de {nombre}</h1>
      <img src="/favicon.svg" alt="Logo" width="48" />
      <p>Perfil: {perfil.rol} en {perfil.ciudad}</p>
      <Tarjeta titulo="Proyecto 1" />
    </>
  );
}
export default Mision7;`,
  },
]

export const RANGOS = [
  { xp: 0, nombre: 'Aprendiz de JSX' },
  { xp: 60, nombre: 'Componente Junior' },
  { xp: 140, nombre: 'Maestro de las Llaves' },
  { xp: 240, nombre: 'React Wizard 🧙' },
  { xp: 380, nombre: 'Leyenda de React 👑' },
]
