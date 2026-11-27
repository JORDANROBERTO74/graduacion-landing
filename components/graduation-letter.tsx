'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { ArrowLeft, ArrowRight, CassetteTape, ChevronDown, Clock3, Stethoscope, Heart } from 'lucide-react'

/* Una sola fuente de verdad para la ceremonia: 27 de noviembre de 2026, 9:00 a. m. */
const CEREMONY = { year: 2026, month: 10, day: 27, hour: 9, minute: 0 } as const
const CEREMONY_DATE = new Date(CEREMONY.year, CEREMONY.month, CEREMONY.day, CEREMONY.hour, CEREMONY.minute, 0)
const CEREMONY_SHORT = '27.11.2026 · 09:00'
const CEREMONY_LABEL = '27 Nov 2026'
const CEREMONY_LONG = '27 de noviembre de 2026 · 9:00 a. m.'

function Cover({ onNext }: { onNext: () => void }) {
  return (
    <section className="cover section-shell" aria-labelledby="cover-title">
      <div className="cover-topline"><span>UNA CARTA</span><i /><span>MEDICINA</span></div>
      <div className="cover-emblem" aria-hidden="true">
        <div className="emblem-ring"><Stethoscope size={30} strokeWidth={1.15} /><span className="emblem-star">✳</span></div>
      </div>
      <p className="eyebrow">{CEREMONY_LABEL}</p>
      <h1 id="cover-title" className="display-title">Para la amiga<br />que hoy será doctora</h1>
      <p className="cover-name">Dra. Lorena V. Escobar</p>
      <p className="cover-copy">Años de guardias, apuntes y cafés<br />que no alcanzaron. Hoy te titulas.</p>
      <button className="primary-pill" onClick={onNext}>Abrir la carta <ArrowRight size={16} aria-hidden="true" /></button>
      <div className="cover-signature"><span>con orgullo y cariño</span><strong>de tu amigo</strong></div>
      <span className="float-mark mark-cap" aria-hidden="true">✧</span>
      <span className="float-mark mark-star" aria-hidden="true">✳</span>
      <span className="float-mark mark-heart" aria-hidden="true">♡</span>
    </section>
  )
}

function Portrait({ onNext }: { onNext: () => void }) {
  return (
    <section id="retrato" className="portrait-section section-shell">
      <p className="eyebrow date-label">{CEREMONY_LONG}</p>
      <figure className="portrait-frame">
        <img src="/quirofano.jpeg" alt="Lorena y su amigo con bata quirúrgica y mascarilla en el quirófano" width={1600} height={1200} fetchPriority="high" />
        <span className="portrait-number">01 / 05</span>
      </figure>
      <p className="photo-caption">La bata que soñaste antes<br />de saber cuánto costaría</p>
      <span className="tiny-rule" aria-hidden="true" />
      <SceneContinue label="Leer la carta" onClick={onNext} />
    </section>
  )
}

function Song({ onNext }: { onNext: () => void }) {
  const [videoRevealed, setVideoRevealed] = useState(false)
  const reduced = useReducedMotion()

  return (
    <section className="song-section section-shell" aria-labelledby="song-title">
      <p className="eyebrow">PARA REÍR JUNTOS</p>
      <h2 id="song-title" className="section-title">Un momento<br /><em>de todos estos años</em></h2>
      <div className={`song-swap ${videoRevealed ? 'is-video' : ''}`}>
        <AnimatePresence mode="popLayout" initial={false}>
          {!videoRevealed && (
            <motion.button
              type="button"
              key="cassette"
              className="cassette"
              onClick={() => setVideoRevealed(true)}
              aria-label="Ver el video: nuestro momento"
              aria-expanded={false}
              aria-controls="song-video"
              initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: -3 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.92, rotate: 2, filter: 'blur(4px)' }}
              transition={{ duration: reduced ? 0.12 : 0.42, ease: [0.23, 1, 0.32, 1] }}
              whileTap={reduced ? undefined : { scale: 0.98 }}
            >
              <span className="cassette-label"><span>lado A · 2026</span><strong>Nuestro momento</strong></span>
              <span className="cassette-window"><i /><span /><i /></span>
              <span className="cassette-bottom"><span>PLAY • REPEAT</span><span>♥ AMIGA ♥</span></span>
            </motion.button>
          )}
          {videoRevealed && (
            <motion.div
              key="video"
              id="song-video"
              className="video-wrap"
              initial={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.94, y: 10 }}
              transition={{ duration: reduced ? 0.12 : 0.42, ease: [0.23, 1, 0.32, 1], delay: reduced ? 0 : 0.12 }}
            >
              <video
                src="/baile.mp4"
                aria-label="Video del baile"
                controls
                playsInline
                preload="metadata"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <p className="cassette-prompt">{videoRevealed ? 'Nuestro momento, para recordar juntos' : 'Toca el casete para revivir el momento'}</p>
      {videoRevealed && (
        <button type="button" className="cassette-revert" onClick={() => setVideoRevealed(false)}>
          <CassetteTape size={15} aria-hidden="true" /> Volver al casete
        </button>
      )}
      <SceneContinue label="Seguir celebrando" onClick={onNext} />
    </section>
  )
}

function getElapsedParts(start: Date, now: Date) {
  if (now < start) return { years: 0, months: 0, days: 0, hours: 0, minutes: 0, seconds: 0 }
  let years = now.getFullYear() - start.getFullYear()
  let months = now.getMonth() - start.getMonth()
  let anchor = new Date(start)
  anchor.setFullYear(start.getFullYear() + years)
  if (anchor > now) { years -= 1; anchor = new Date(start); anchor.setFullYear(start.getFullYear() + years) }
  months = now.getMonth() - anchor.getMonth() + (now.getFullYear() - anchor.getFullYear()) * 12
  anchor.setMonth(anchor.getMonth() + months)
  if (anchor > now) { months -= 1; anchor = new Date(start); anchor.setFullYear(start.getFullYear() + years); anchor.setMonth(anchor.getMonth() + months) }
  const remaining = Math.max(0, now.getTime() - anchor.getTime())
  const days = Math.floor(remaining / 86_400_000)
  const hours = Math.floor((remaining % 86_400_000) / 3_600_000)
  const minutes = Math.floor((remaining % 3_600_000) / 60_000)
  const seconds = Math.floor((remaining % 60_000) / 1000)
  return { years, months, days, hours, minutes, seconds }
}

type CountUnit = { label: string; value: number }

/**
 * Devuelve SOLO las unidades necesarias para que se lea de un vistazo.
 * La regla es "pinta la magnitud y la precisión inmediatamente menor":
 *   < 24 h  → horas, minutos, segundos
 *   < 1 día → igual
 *   < 1 año → días, horas, minutos   (sin segundos: no aportan nada a esa escala)
 *   ≥ 1 año → años, meses, días
 * Así nunca se ven seis bloques a la vez, y el que más avanza manda.
 */
function selectUnits(start: Date, now: Date): { units: CountUnit[]; scale: string } {
  if (now < start) {
    return { units: [{ label: 'H', value: 0 }, { label: 'MIN', value: 0 }, { label: 'S', value: 0 }], scale: 'horas' }
  }
  const parts = getElapsedParts(start, now)
  const totalHours = Math.floor((now.getTime() - start.getTime()) / 3_600_000)

  if (totalHours < 24) {
    return {
      units: [{ label: 'H', value: parts.hours }, { label: 'MIN', value: parts.minutes }, { label: 'S', value: parts.seconds }],
      scale: 'horas',
    }
  }
  if (parts.years === 0) {
    return {
      units: [{ label: 'DÍAS', value: parts.days }, { label: 'H', value: parts.hours }, { label: 'MIN', value: parts.minutes }],
      scale: 'días',
    }
  }
  // A partir de un año: años y meses son los que realmente cambian. Los días
  // solo entran si son muchos, para no mostrar un "0" que no informa nada.
  const units: CountUnit[] = [{ label: 'AÑOS', value: parts.years }, { label: 'MESES', value: parts.months }]
  if (parts.days > 0) units.push({ label: 'DÍAS', value: parts.days })
  return { units, scale: 'años' }
}

function MilestoneClock({ onNext }: { onNext: () => void }) {
  const [now, setNow] = useState<Date | null>(null)
  const reduced = useReducedMotion()
  useEffect(() => {
    setNow(new Date())
    const timer = window.setInterval(() => setNow(new Date()), 1000)
    return () => window.clearInterval(timer)
  }, [])
  const { units, scale } = now
    ? selectUnits(CEREMONY_DATE, now)
    : { units: [{ label: 'H', value: 0 }, { label: 'MIN', value: 0 }, { label: 'S', value: 0 }], scale: 'horas' }

  return (
    <section className="milestone-section section-shell" aria-labelledby="milestone-title">
      <div className="clock-icon" aria-hidden="true">
        <Clock3 size={26} strokeWidth={1.25} />
      </div>
      <p className="eyebrow">EL TIEMPO MÁS BONITO</p>
      <h2 id="milestone-title" className="section-title small-title">Desde ese instante,<br /><em>el mundo tiene una doctora más</em></h2>
      <div className="count-card">
        <p className="count-heading">siendo Dra. en Medicina</p>
        <div className={`count-grid count-${scale}`} aria-label="Tiempo desde la titulación" role="timer">
          <AnimatePresence mode="popLayout" initial={false}>
            {units.map(({ label, value }) => (
              <motion.div
                className="count-unit"
                key={label}
                layout
                initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={reduced ? { opacity: 0 } : { opacity: 0, y: -8, scale: 0.96 }}
                transition={{ duration: reduced ? 0.1 : 0.26, ease: [0.23, 1, 0.32, 1] }}
              >
                <strong className="count-value" key={`${label}-${value}`}>
                  {String(value).padStart(2, '0')}
                </strong>
                <span>{label}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        <div className="count-footer"><span />DESDE EL {CEREMONY_SHORT}<span /></div>
      </div>
      <SceneContinue label="Seguir la historia" onClick={onNext} />
    </section>
  )
}

function Dedication({ onRestart }: { onRestart: () => void }) {
  const [opened, setOpened] = useState(false)
  const reduced = useReducedMotion()
  const openLetter = () => setOpened(true)
  return (
    <section className={`letter-section section-shell ${opened ? 'is-open' : ''}`} aria-labelledby="letter-title">
      <p className="eyebrow">UNA CARTA DE TU AMIGO</p>
      <h2 id="letter-title" className="section-title">Lo que no te pude decir<br /><em>en todos estos años</em></h2>
      <motion.button className={`envelope ${opened ? 'is-open' : ''}`} onClick={openLetter} aria-expanded={opened} aria-label={opened ? 'Carta abierta' : 'Abrir la carta para Lorena'} whileTap={reduced ? undefined : { scale: 0.985 }} tabIndex={opened ? -1 : 0}>
        <span className="envelope-back" />
        <span className="envelope-paper" />
        <span className="envelope-flap" />
        <span className="envelope-seal"><Heart size={15} fill="currentColor" aria-hidden="true" /><small>{opened ? 'Con cariño' : 'Descúbrela'}</small></span>
        {!opened && <span className="envelope-prompt">Hay un mensaje para ti <ChevronDown size={13} aria-hidden="true" /></span>}
      </motion.button>
      <AnimatePresence initial={false}>
        {opened && <motion.article className="dedication-card" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 8 }} transition={{ duration: reduced ? 0.15 : 0.28 }}>
          <p className="letter-greeting">Lo lograste, hermana! ❤️‍🩹</p>
          <p className="dedication-copy">Parece que fue ayer cuando comenzamos el internado, sin imaginar que esos nueve meses terminarían regalándome una de las amistades más bonitas que tengo.</p>
          <p className="dedication-copy">Entre tantas experiencias, risas, momentos buenos y no tan buenos, terminamos convirtiéndonos en uña y mugre, hasta llegar a considerarnos hermanos. Y qué bonito es saber que, más allá de haber compartido una etapa de nuestras vidas, nos llevamos una amistad que espero conservar siempre.</p>
          <p className="dedication-copy">Hoy quiero que sepas que nunca dudé de ti. Siempre confié en que ibas a llegar a este momento y que tarde o temprano vería cumplida esta meta que tanto te propusiste. Y aquí estás, demostrando que todo el esfuerzo, los sacrificios y las largas jornadas valieron la pena.</p>
          <p className="dedication-copy">Me siento muy orgulloso de ti y de la gran profesional en la que te estás convirtiendo. Te quiero muchísimo, hermana, y deseo de corazón que este sea apenas el comienzo de una vida llena de éxitos y oportunidades.</p>
          <p className="dedication-copy">¡Felicidades, doctora! Te lo mereces todo. Y nunca olvides que aquí tienes un hermano que siempre va a celebrar tus logros como si fueran propios. ❤️</p>
          <p className="letter-signoff">Con cariño de siempre,<br /><strong>Tu hermano</strong></p>
          <button className="primary-pill celebrate-button" onClick={onRestart}>Volver a vivirlo <ArrowRight size={16} aria-hidden="true" /></button>
        </motion.article>}
      </AnimatePresence>
    </section>
  )
}

function FloatingDetails() {
  return <div className="floating-details" aria-hidden="true"><span className="float-stethoscope"><Stethoscope size={18} /></span><span className="float-sparkle">✧</span><span className="float-sparkle second">✦</span></div>
}

function SceneContinue({ label, onClick }: { label: string; onClick: () => void }) {
  return <button className="scene-continue" onClick={onClick}>{label}<ArrowRight size={16} aria-hidden="true" /></button>
}

const sceneCount = 5
const sceneNames = ['Portada', 'El momento', 'El tiempo', 'Retrato', 'La carta']

export default function GraduationLetter() {
  const [scene, setScene] = useState(0)
  const reduced = useReducedMotion()
  const moveTo = (index: number) => setScene(Math.max(0, Math.min(sceneCount - 1, index)))

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.altKey || event.ctrlKey || event.metaKey || event.target instanceof HTMLButtonElement) return
      if (event.key === 'ArrowRight' || event.key === 'PageDown') { event.preventDefault(); setScene((current) => Math.min(sceneCount - 1, current + 1)) }
      if (event.key === 'ArrowLeft' || event.key === 'PageUp') { event.preventDefault(); setScene((current) => Math.max(0, current - 1)) }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const content = [
    <Cover key="cover" onNext={() => moveTo(1)} />,
    <Song key="song" onNext={() => moveTo(2)} />,
    <MilestoneClock key="milestone" onNext={() => moveTo(3)} />,
    <Portrait key="portrait" onNext={() => moveTo(4)} />,
    <Dedication key="letter" onRestart={() => moveTo(0)} />,
  ][scene]

  return (
    <main className="gift-page">
      <div className="gift-column">
        <FloatingDetails />
        <p className="visually-hidden" aria-live="polite" aria-atomic="true">
          {`Escena ${scene + 1} de ${sceneCount}: ${sceneNames[scene]}`}
        </p>
        <div className="presentation-stage">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={scene} className="presentation-scene" initial={reduced ? { opacity: 0 } : { opacity: 0, y: 18, scale: 0.99 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduced ? { opacity: 0 } : { opacity: 0, y: -12, scale: 0.99 }} transition={{ duration: reduced ? 0.12 : 0.42, ease: [0.22, 1, 0.36, 1] }}>
              {scene > 0 && <button className="scene-back" type="button" onClick={() => moveTo(scene - 1)} aria-label="Escena anterior"><ArrowLeft size={18} aria-hidden="true" /></button>}
              {content}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </main>
  )
}
