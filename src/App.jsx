import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { MISIONES, RANGOS } from './game/misiones.js'
import Preview from './game/Preview.jsx'

const CLAVE = 'react-quest-semana1'

function cargarProgreso() {
  try {
    return JSON.parse(localStorage.getItem(CLAVE)) || {}
  } catch {
    return {}
  }
}

function Confeti({ activo }) {
  if (!activo) return null
  const piezas = ['🎉', '⭐', '✨', '⚛️', '🚀', '💜']
  return (
    <div className="confeti" aria-hidden="true">
      {Array.from({ length: 24 }, (_, i) => (
        <span key={i} style={{ left: `${(i * 4.3) % 100}%`, animationDelay: `${(i % 8) * 0.12}s` }}>
          {piezas[i % piezas.length]}
        </span>
      ))}
    </div>
  )
}

export default function App() {
  const [activa, setActiva] = useState(() => Number(localStorage.getItem(CLAVE + '-activa')) || 1)
  const [progreso, setProgreso] = useState(cargarProgreso) // { [id]: boolean[] }
  const [pistas, setPistas] = useState({}) // { [id]: cuántas pistas se vieron }
  const [verSolucion, setVerSolucion] = useState(false)
  const [fiesta, setFiesta] = useState(false)
  const completadas = useRef(new Set())

  const mision = MISIONES.find((m) => m.id === activa)

  const alResultado = useCallback((id, resultados) => {
    setProgreso((prev) => {
      const antes = prev[id] || []
      // Solo guardamos logros: una vez tildado un objetivo, no se destilda
      const merged = resultados.map((r, i) => r || antes[i] || false)
      if (JSON.stringify(merged) === JSON.stringify(antes)) return prev
      const sig = { ...prev, [id]: merged }
      try {
        localStorage.setItem(CLAVE, JSON.stringify(sig))
      } catch {
        /* sin localStorage no pasa nada */
      }
      return sig
    })
  }, [])

  const hechos = (id) => (progreso[id] || []).filter(Boolean).length
  const estaCompleta = (m) => hechos(m.id) === m.objetivos.length

  // XP: 10 por objetivo + 20 de bonus por misión completa
  const xp = useMemo(
    () => MISIONES.reduce((t, m) => t + hechos(m.id) * 10 + (estaCompleta(m) ? 20 : 0), 0),
    [progreso],
  )
  const xpMax = MISIONES.reduce((t, m) => t + m.objetivos.length * 10 + 20, 0)
  const rango = [...RANGOS].reverse().find((r) => xp >= r.xp)

  // Fiesta cuando se completa una misión
  useEffect(() => {
    MISIONES.forEach((m) => {
      if (estaCompleta(m) && !completadas.current.has(m.id)) {
        completadas.current.add(m.id)
        if (Object.keys(progreso).length) {
          setFiesta(true)
          setTimeout(() => setFiesta(false), 2600)
        }
      }
    })
  }, [progreso])

  useEffect(() => {
    setVerSolucion(false)
    try {
      localStorage.setItem(CLAVE + '-activa', String(activa))
    } catch {
      /* ok */
    }
  }, [activa])

  const vistas = pistas[activa] || 0
  const total = MISIONES.filter(estaCompleta).length

  return (
    <div className="juego">
      <Confeti activo={fiesta} />

      <header className="top">
        <div>
          <h1>⚛️ React Quest</h1>
          <p className="sub">Semana 1 · JSX y componentes</p>
        </div>
        <div className="xp">
          <div className="xp-linea">
            <strong>{rango.nombre}</strong>
            <span>
              {xp} / {xpMax} XP · {total}/{MISIONES.length} misiones
            </span>
          </div>
          <div className="barra">
            <div className="barra-relleno" style={{ width: `${(xp / xpMax) * 100}%` }} />
          </div>
        </div>
      </header>

      <div className="layout">
        <nav className="mapa" aria-label="Mapa de misiones">
          {MISIONES.map((m) => (
            <button
              key={m.id}
              className={`nodo ${m.id === activa ? 'activo' : ''} ${estaCompleta(m) ? 'listo' : ''}`}
              onClick={() => setActiva(m.id)}
            >
              <span className="nodo-emoji">{estaCompleta(m) ? '✅' : m.emoji}</span>
              <span>
                <b>Misión {m.id}</b>
                <small>{m.titulo}</small>
              </span>
              <span className="nodo-n">
                {hechos(m.id)}/{m.objetivos.length}
              </span>
            </button>
          ))}
          <button
            className="reset"
            onClick={() => {
              if (confirm('¿Borrar todo tu progreso?')) {
                localStorage.removeItem(CLAVE)
                localStorage.removeItem(CLAVE + '-activa')
                location.reload()
              }
            }}
          >
            ↺ Reiniciar progreso
          </button>
        </nav>

        <main className="panel">
          <section className="tarjeta-info">
            <p className="etiqueta">
              {mision.emoji} Misión {mision.id} · {mision.concepto}
            </p>
            <h2>{mision.titulo}</h2>
            <p>{mision.historia}</p>
            <p className="archivo">
              📂 Editá: <code>src/misiones/{mision.file}</code>
              {mision.id === 5 && (
                <>
                  {' '}
                  y <code>src/misiones/Tarjeta.jsx</code>
                </>
              )}
            </p>
          </section>

          <section className="tarjeta-info">
            <h3>Objetivos</h3>
            <ul className="objetivos">
              {mision.objetivos.map((o, i) => {
                const ok = (progreso[mision.id] || [])[i]
                return (
                  <li key={i} className={ok ? 'ok' : ''}>
                    <span className="check">{ok ? '✔' : ''}</span>
                    {o.label}
                  </li>
                )
              })}
            </ul>
            {estaCompleta(mision) && (
              <p className="ganaste">
                🎉 ¡Misión completada! +{mision.objetivos.length * 10 + 20} XP
                {mision.id < MISIONES.length && (
                  <button className="mini grande" onClick={() => setActiva(mision.id + 1)}>
                    Siguiente misión →
                  </button>
                )}
              </p>
            )}
          </section>

          <Preview mision={mision} onResultado={alResultado} />

          <section className="tarjeta-info ayuda">
            <h3>¿Trabado?</h3>
            {Array.from({ length: vistas }, (_, i) => (
              <p key={i} className="pista">
                💡 <b>Pista {i + 1}:</b> {mision.pistas[i]}
              </p>
            ))}
            <div className="botones">
              {vistas < mision.pistas.length && (
                <button className="mini" onClick={() => setPistas({ ...pistas, [activa]: vistas + 1 })}>
                  💡 Dame una pista ({vistas}/{mision.pistas.length})
                </button>
              )}
              {vistas >= mision.pistas.length && (
                <button className="mini" onClick={() => setVerSolucion(!verSolucion)}>
                  {verSolucion ? 'Ocultar solución' : '🔓 Ver solución'}
                </button>
              )}
            </div>
            {verSolucion && <pre className="solucion">{mision.solucion}</pre>}
          </section>
        </main>
      </div>
    </div>
  )
}
