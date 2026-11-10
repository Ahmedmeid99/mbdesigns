import { useEffect, useRef, useState } from 'react'
import type { CSSProperties, PointerEvent, FocusEvent } from 'react'
import { Container } from './Container'
import './LocationsMap.css'
import photoCredits from '../../public/assets/images/landmarks/credits.json'

type LandmarkPhoto = { latitude: number; longitude: number; image: string; width: number; height: number; source: string; artist?: string; license?: string; licenseUrl?: string }
const photos: Record<string, LandmarkPhoto> = photoCredits

const locations = [
  { country: 'Egypt', city: 'Cairo', region: 'Middle East', landmark: 'Pyramids of Giza' },
  { country: 'United Arab Emirates', city: 'Dubai', region: 'Middle East', landmark: 'Burj Khalifa' },
  { country: 'Saudi Arabia', city: 'Riyadh', region: 'Middle East', landmark: 'Kingdom Centre' },
  { country: 'Greece', city: 'Athens', region: 'Europe', landmark: 'The Parthenon' },
  { country: 'Oman', city: 'Muscat', region: 'Middle East', landmark: 'Sultan Qaboos Grand Mosque' },
  { country: 'Bahrain', city: 'Manama', region: 'Middle East', landmark: 'Bahrain World Trade Center' },
  { country: 'Qatar', city: 'Doha', region: 'Middle East', landmark: 'Museum of Islamic Art' },
  { country: 'Kuwait', city: 'Kuwait City', region: 'Middle East', landmark: 'Kuwait Towers' },
  { country: 'Mauritius', city: 'Le Morne', region: 'Africa', landmark: 'Le Morne Brabant', x: 65.98, y: 72.64 },
  { country: 'Seychelles', city: 'Victoria', region: 'Africa', landmark: 'Victoria Clock Tower', x: 65.40, y: 61.86 },
  { country: 'Cabo Verde', city: 'Cidade Velha', region: 'Africa', landmark: 'Fort Real de São Filipe', x: 43.44, y: 48.34 },
].map(location => {
  const photo = photos[location.country.toLowerCase().replaceAll(' ', '-')]
  const defaultX = (photo.longitude + 180) / 360 * 100
  const defaultY = (85 - photo.latitude) / 145 * 100
  return {
    ...location,
    photo,
    x: location.x ?? defaultX,
    y: location.y ?? defaultY,
  }
})

export const locationCountryCount = locations.length

export function LocationsMap() {
  const [selected, setSelected] = useState<number | null>(null)
  const pinned = useRef<number | null>(null)
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const cancelHide = () => {
    if (hideTimer.current) clearTimeout(hideTimer.current)
  }
  const hideSoon = () => {
    cancelHide()
    hideTimer.current = setTimeout(() => {
      if (pinned.current === null) setSelected(null)
    }, 140)
  }
  const countryInteraction = (index: number) => ({
    onPointerEnter: (event: PointerEvent<HTMLButtonElement>) => {
      if (event.pointerType !== 'mouse' || pinned.current !== null) return
      cancelHide()
      setSelected(index)
    },
    onPointerLeave: (event: PointerEvent<HTMLButtonElement>) => {
      if (event.pointerType === 'mouse') hideSoon()
    },
    onFocus: (event: FocusEvent<HTMLButtonElement>) => {
      if (pinned.current === null && event.currentTarget.matches(':focus-visible')) {
        cancelHide()
        setSelected(index)
      }
    },
    onBlur: hideSoon,
    onClick: () => {
      cancelHide()
      pinned.current = pinned.current === index ? null : index
      setSelected(pinned.current)
    },
  })
  useEffect(() => {
    const close = () => {
      if (hideTimer.current) clearTimeout(hideTimer.current)
      pinned.current = null
      setSelected(null)
    }
    const dismiss = (event: globalThis.PointerEvent) => {
      if (!(event.target instanceof Element) || !event.target.closest('.locations-pin, .locations-region button, .locations-landmark')) close()
    }
    const escape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }
    document.addEventListener('pointerdown', dismiss)
    document.addEventListener('keydown', escape)
    return () => {
      if (hideTimer.current) clearTimeout(hideTimer.current)
      document.removeEventListener('pointerdown', dismiss)
      document.removeEventListener('keydown', escape)
    }
  }, [])
  const active = selected !== null ? locations[selected] : null
  return (
    <Container as="section" id="markets" className="locations-section" fluid aria-labelledby="locations-title">
      <Container className="section-pad">
        <header className="locations-heading">
          <div><p className="locations-eyebrow">07 / ACROSS BORDERS</p><h2 id="locations-title">CONNECTED BY<br /><em>DESIGN.</em></h2></div>
          <p>Architecture and interiors shaped by place, culture and people.<span className="locations-hint">Hover to explore. Click or tap a country to keep its landmark open.</span></p>
        </header>
        <div className="locations-explorer">
          <div className="locations-canvas" aria-label="World map with selectable countries">
            <img className="locations-world" src="/assets/images/world-map-monochrome.svg" width="900" height="440" alt="Black and white geographic world map with country boundaries" loading="lazy" />
            {locations.map((location, index) => (
              <button
                key={location.country}
                type="button"
                className={`locations-pin${selected === index ? ' is-active' : ''}`}
                style={{ '--pin-x': `${location.x}%`, '--pin-y': `${location.y}%` } as CSSProperties}
                aria-label={`${location.country}: ${location.landmark}`}
                aria-pressed={selected === index}
                aria-controls={active ? 'location-landmark' : undefined}
                {...countryInteraction(index)}
              >
                <span /><span className="locations-pin-label">{location.country}</span>
              </button>
            ))}
            {active && (
              <aside id="location-landmark" className="locations-landmark" style={{ '--pin-x': `${active.x}%`, '--pin-y': `${active.y}%` } as CSSProperties} aria-live="polite" aria-atomic="true" onPointerEnter={cancelHide} onPointerLeave={event => { if (event.pointerType === 'mouse') hideSoon() }}>
                <img key={active.country} src={active.photo.image} width={active.photo.width} height={active.photo.height} alt={active.landmark} decoding="async" />
                <h3>{active.country}</h3><p>{active.landmark}</p>
              </aside>
            )}
            <span className="locations-map-caption">MIDDLE EAST · AFRICA · EUROPE</span>
          </div>
        </div>
        <div className="locations-countries" aria-label="Choose a country">
          {['Middle East', 'Africa', 'Europe'].map(region => (
            <div className="locations-region" key={region}>
              <h3>{region}</h3>
              <div>
                {locations.map((location, index) => location.region === region && (
                  <button
                    key={location.country}
                    type="button"
                    aria-pressed={selected === index}
                    aria-controls={active ? 'location-landmark' : undefined}
                    {...countryInteraction(index)}
                  >
                    {location.country}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </Container>
  )
}
