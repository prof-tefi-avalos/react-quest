import { Component, Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react'

// Carga cada misión con import dinámico. Si el archivo tiene un error, lo mostramos
// de forma amigable en vez de romper todo el juego.
// Cada vez que Vite actualiza un archivo (HMR) volvemos a importarlo con una marca de
// tiempo (?t=...) para saltear la caché del navegador y ver siempre la última versión.

class Frontera extends Component {
  state = { error: null }
  static getDerivedStateFromError(error) {
    return { error }
  }
  componentDidUpdate(prev) {
    if (prev.resetKey !== this.props.resetKey && this.state.error) this.setState({ error: null })
  }
  render() {
    if (this.state.error) {
      return (
        <div className="error-amigable">
          <strong>🛠 Todavía no compila</strong>
          <p>{String(this.state.error.message || this.state.error)}</p>
          <small>Leé el mensaje, arreglá el archivo y guardá. Si no se actualiza, apretá 🔄 Reintentar.</small>
        </div>
      )
    }
    return this.props.children
  }
}

export default function Preview({ mision, onResultado }) {
  const [version, setVersion] = useState(0)
  const [sello, setSello] = useState(0)
  const rootRef = useRef(null)

  // Cuando Vite aplica un cambio (HMR), volvemos a montar y a verificar
  useEffect(() => {
    if (!import.meta.hot) return
    const alActualizar = () => {
      setSello(Date.now())
      setVersion((v) => v + 1)
    }
    import.meta.hot.on('vite:afterUpdate', alActualizar)
    return () => import.meta.hot.off('vite:afterUpdate', alActualizar)
  }, [])

  const Comp = useMemo(() => {
    const url = `/src/misiones/${mision.file}${sello ? `?t=${sello}` : ''}`
    return lazy(() => import(/* @vite-ignore */ url))
  }, [mision.file, version, sello])

  // Verificar los objetivos cada vez que cambia el DOM de la vista previa
  useEffect(() => {
    const el = rootRef.current
    if (!el) return
    const verificar = async () => {
      // Leemos el código fuente de la misión (sin comentarios) para verificar cosas que el DOM no muestra
      let source = ''
      try {
        const raw = await import(/* @vite-ignore */ `/src/misiones/${mision.file}?raw${sello ? `&t=${sello}` : ''}`)
        source = raw.default.replace(/\/\*[\s\S]*?\*\//g, '').replace(/^\s*\/\/.*$/gm, '')
      } catch {
        /* sin código fuente, seguimos igual */
      }
      const extra = { source }
      if (mision.id === 5) {
        try {
          const mod = await import(/* @vite-ignore */ `/src/misiones/Tarjeta.jsx${sello ? `?t=${sello}` : ''}`)
          extra.tarjetaExporta = typeof mod.default === 'function'
        } catch {
          extra.tarjetaExporta = false
        }
        extra.mounted = el.querySelectorAll('.tarjeta').length > 0
      }
      const resultados = mision.objetivos.map((o) => {
        try {
          return !!o.test(el, extra)
        } catch {
          return false
        }
      })
      onResultado(mision.id, resultados)
    }
    verificar()
    const obs = new MutationObserver(verificar)
    obs.observe(el, { childList: true, subtree: true, characterData: true, attributes: true })
    const t = setTimeout(verificar, 400)
    return () => {
      obs.disconnect()
      clearTimeout(t)
    }
  }, [mision, version, sello, onResultado])

  return (
    <div className="ventana">
      <div className="ventana-barra">
        <span className="dot r" /> <span className="dot y" /> <span className="dot g" />
        <span className="ventana-url">localhost:5173 · {mision.file}</span>
        <button className="mini" onClick={() => {
            setSello(Date.now())
            setVersion((v) => v + 1)
          }}>🔄 Reintentar</button>
      </div>
      <div className="ventana-cuerpo">
        <div ref={rootRef} className="vista">
          <Frontera resetKey={version} key={version}>
            <Suspense fallback={<p>Cargando…</p>}>
              <Comp />
            </Suspense>
          </Frontera>
        </div>
      </div>
    </div>
  )
}
