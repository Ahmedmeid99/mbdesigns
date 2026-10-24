import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Container } from '../components/Container'
import { PortfolioHeader } from '../components/PortfolioChrome'

type ImageSource = readonly [string, 'jpg' | 'jpeg' | 'png']
type EventYear = '2026' | '2025' | '2023' | '2019' | '2018'
type HubView = 'events' | 'press'

const eventImage = (id: string) => `/assets/images/events/${id}.webp`
const image = ([id]: ImageSource) => eventImage(id)

const heroImage = eventImage('beb217_a1ad0c8b264f477b9b0456fc974ad4bf')
const headerLogo = eventImage('beb217_7045e1c98fe7473e9c71b4cf8a4e6050')
const pressHero = eventImage('beb217_f6d401a6b8744e12b88e9b766c9c4247')

const design2026 = [
  ['beb217_ff8f9ee68ec94188b960eb61b12c037f', 'png'], ['beb217_f5fd7dc5fee7480da3819221a205fc91', 'png'],
  ['beb217_e587f26ac9f146f1abd46afb67e2cfc6', 'png'], ['beb217_a902d177a05649498c9b65f3e599e31a', 'png'],
  ['beb217_e2dea30d141141159c9bc6c3d19ba98e', 'png'], ['beb217_0ffe92c1206648e882194391f2b42dcf', 'png'],
  ['beb217_fe56de7ceaa14bb1b294cd9186757140', 'png'], ['beb217_397eeb69429d4bce96fff700597bdf0c', 'png'],
] as const satisfies readonly ImageSource[]
const reality2026 = [
  ['beb217_b879358db7a34b1299084c09cf0898dc', 'jpg'], ['beb217_85f3e0bdc1284116991f5604e81e97f4', 'jpg'],
  ['beb217_b824a1ec4e23488b89a7169f6412a6cc', 'jpeg'], ['beb217_21fa7c5fc006400ab1a6a3f18be9dca6', 'jpg'],
  ['beb217_74325a5ae54248bfa7e1baa1fef733f1', 'jpg'], ['beb217_57ef02651b30454b8cf74a66029eaa09', 'jpg'],
] as const satisfies readonly ImageSource[]
const innerPeace = [
  ['beb217_b74163c970034fbc9dade9d5dd6d01f2', 'jpeg'], ['beb217_a1ea2c9219c243ceb67917f000e1bcae', 'jpeg'],
  ['beb217_f607e907b1b1473fb89a6ed49d11a022', 'jpg'], ['beb217_8dce4efe9c2e4dd58c5a96678bdc21ab', 'jpg'],
  ['beb217_2cf12b8cc940476b8272bbbec268fefc', 'jpg'], ['beb217_048fee1417664850b12566769dd6c6d8', 'jpg'],
] as const satisfies readonly ImageSource[]
const glc2019 = [
  ['beb217_f49bc0542fcf46ccad19f3606e0c9f4e', 'jpg'], ['beb217_1fdf3033938842d0965e7cc48a86343c', 'jpg'],
  ['beb217_b477cd730c344367873ba2c23d588a40', 'jpg'], ['beb217_c4ca2565ab644d4eae1d2f46003ee645', 'jpg'],
  ['beb217_1a9efd3b9fb4b77a43c8f619c9bd968', 'jpg'], ['beb217_d7141e4ca5fb4e31b8dedefe93d25c16', 'jpg'],
] as const satisfies readonly ImageSource[]
const insights2025 = [
  ['beb217_bc1e547ecb9e48e683764c8eb0c4e9b7', 'jpeg'], ['beb217_d980de241ea449719879e8bdcb7a2bfb', 'jpg'],
  ['beb217_29213082016e4396b03cd0f1c79e51c4', 'jpeg'], ['beb217_d1d6f4e990a34e1d9ec21bad66009142', 'jpeg'],
] as const satisfies readonly ImageSource[]
const meuble2019 = [
  ['beb217_59213134a7c94ff2be83fdfac7156ad3', 'jpg'], ['beb217_0c63fd5d88d04f9599caf457eadcd2ec', 'jpeg'],
  ['beb217_194141831f5d4b6aafca8f902afbb577', 'jpg'], ['beb217_b43e0a5afd0e4517bf5184e48b4d759c', 'jpeg'],
  ['beb217_038832842e45439f9488a93d781870c3', 'jpeg'], ['beb217_7ff62c309dbe472cbdb7a317f8b99f1a', 'jpg'],
] as const satisfies readonly ImageSource[]
const meuble2018 = [
  ['beb217_73b7d050bcf342368c7d5eb232917367', 'jpg'], ['beb217_b52d632fc11d440b95e82f435911df6e', 'jpg'],
  ['beb217_bb1a8727df6742c1886cc6398a715cfd', 'jpg'], ['beb217_c402dd330eec4d989d695fc5eb606fee', 'jpg'],
  ['beb217_54d3e89259b247c7aeb9841e3074b540', 'jpg'], ['beb217_55166f4de8654d2c901bebcc1d171414', 'jpg'],
] as const satisfies readonly ImageSource[]
const glc2018 = [
  ['beb217_78ef498d6b034b96a55e23bb2abbdc61', 'jpg'], ['beb217_0ae48e9f3a4945fea007bd4d7321b4cd', 'jpg'],
  ['beb217_efca68caa4fe4f9b930fcb3dd51e1eb7', 'jpg'], ['beb217_7abc4521be2047c296df3d3880b4ce0d', 'jpg'],
  ['beb217_80a5556c4f454684ad7561e03b173acc', 'jpg'], ['beb217_b53eed5e20444b7485daeda30ccfcd21', 'jpg'],
] as const satisfies readonly ImageSource[]

type EventItem = {
  id: string
  year: EventYear
  title: string
  partner: string
  kicker: string
  summary: string
  cover: ImageSource
  gallery: readonly ImageSource[]
}
const events: readonly EventItem[] = [
  {
    id: 'sense-of-arrival', year: '2026', title: 'A SENSE OF ARRIVAL', partner: 'TDS · MB DESIGNS × MEUBLE EL CHARK',
    kicker: 'HOSPITALITY AS A LIVED EXPERIENCE',
    summary: 'A boutique-hotel journey where rich materiality, refined furniture and architectural simplicity create a memorable feeling of welcome and belonging.',
    cover: reality2026[0], gallery: [...design2026, ...reality2026],
  },
  {
    id: 'creative-insights', year: '2025', title: 'CREATIVE INSIGHTS TALK', partner: 'MB DESIGNS',
    kicker: 'CONVERSATIONS THAT SHAPE DESIGN',
    summary: 'A focused gathering for exchanging ideas, sharing creative practice and opening new conversations around architecture and interior design.',
    cover: insights2025[0], gallery: insights2025,
  },
  {
    id: 'inner-peace', year: '2023', title: 'DISCOVER YOUR INNER PEACE', partner: 'TDS · MB DESIGNS × MOHM × AUREA',
    kicker: 'AN IMMERSIVE DESIGN SANCTUARY',
    summary: 'Three creative forces use color, material, texture, light and sound to invite visitors into a calm, restorative design experience.',
    cover: innerPeace[0], gallery: innerPeace,
  },
  {
    id: 'tds-glc-2019', year: '2019', title: 'TDS × GLC', partner: 'MB DESIGNS × GLC',
    kicker: 'DESIGN EVOLUTION',
    summary: 'An open exhibition environment that balances black metal framework with warm timber, soft upholstery and social spaces.',
    cover: glc2019[0], gallery: glc2019,
  },
  {
    id: 'meuble-2019', year: '2019', title: 'TIMELESS EXPRESSION', partner: 'MB DESIGNS × MEUBLE EL CHARK',
    kicker: 'THREE DISTINCT BOOTH EXPERIENCES',
    summary: 'Classic proportion, bold geometry and sculptural furniture come together across three complementary exhibition concepts.',
    cover: meuble2019[0], gallery: meuble2019,
  },
  {
    id: 'meuble-2018', year: '2018', title: 'DESIGN IS SIMPLE', partner: 'MB DESIGNS × MEUBLE EL CHARK',
    kicker: 'THE FAMILIAR, REIMAGINED',
    summary: 'An ordinary object becomes architecture through creativity, craftsmanship, function and unexpected expression.',
    cover: meuble2018[0], gallery: meuble2018,
  },
  {
    id: 'glc-2018', year: '2018', title: 'COLOR IN MOTION', partner: 'MB DESIGNS × GLC PAINTS',
    kicker: 'A PLAYFUL ARCHITECTURAL LANGUAGE',
    summary: 'Everyday forms become a vivid spatial experience celebrating color, movement and the role of design in daily life.',
    cover: glc2018[0], gallery: glc2018,
  },
] as const

const pressLogos = [
  ['beb217_9cfecee13beb4fada02a2abdec2c91d1', 'png'], ['beb217_9c850e9ad2bf4a95a689207e58a71bbc', 'png'],
  ['beb217_16d4edd124b94d41a30178c2d27306b4', 'png'], ['beb217_8f6a962789714c48b5a8162d7c5b59ff', 'jpg'],
  ['beb217_f202f7e7ad4df0ac2aa3c67f0007df', 'jpg'],
] as const satisfies readonly ImageSource[]

export const Route = createFileRoute('/events-press')({
  head: () => ({
    meta: [
      { title: 'Events / Press | MB Designs' },
      { name: 'description', content: 'Browse MB Designs events, exhibitions, collaborations and press coverage.' },
    ],
    links: [{ rel: 'preload', as: 'image', href: heroImage }],
  }),
  component: EventsPressPage,
})

function EventsPressPage() {
  const [ready, setReady] = useState(false)
  const [view, setView] = useState<HubView>('events')
  const [year, setYear] = useState<'ALL' | EventYear>('ALL')
  const [selected, setSelected] = useState<EventItem | null>(null)
  const pageRef = useRef<HTMLDivElement>(null)
  const filteredEvents = useMemo(() => year === 'ALL' ? events : events.filter((item) => item.year === year), [year])

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 80)
    const root = pageRef.current
    if (!root) return () => window.clearTimeout(timer)
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      }
    }), { rootMargin: '0px 0px -7% 0px', threshold: 0.06 })
    root.querySelectorAll('[data-reveal]').forEach((item) => observer.observe(item))
    return () => { window.clearTimeout(timer); observer.disconnect() }
  }, [view, year])

  useEffect(() => {
    if (!selected) return
    const previousOverflow = document.body.style.overflow
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === 'Escape') setSelected(null) }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', closeOnEscape)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', closeOnEscape)
    }
  }, [selected])

  const changeView = (nextView: HubView) => {
    setView(nextView)
    window.requestAnimationFrame(() => document.getElementById('events-browser')?.scrollIntoView({ behavior: 'smooth', block: 'start' }))
  }

  return (
    <div ref={pageRef} className={ready ? 'events-site events-hub-site is-ready' : 'events-site events-hub-site'}>
      <PortfolioHeader current="events" className="events-header" logoImage={headerLogo} />
      <main id="top">
        <Container as="section" className="events-hero" fluid>
          <img src={heroImage} alt="MB Designs event gathering" width="2400" height="1450" fetchPriority="high" />
          <div className="events-hero-shade" />
          <div className="events-hero-copy events-hub-hero-copy">
            <p>MB DESIGNS · CAIRO / DUBAI</p>
            <h1>EVENTS<br />&amp; PRESS</h1>
            <span>EXHIBITIONS, COLLABORATIONS, CONVERSATIONS AND STORIES FROM OUR STUDIO.</span>
          </div>
          <a className="events-hub-scroll" href="#events-browser">EXPLORE <i>↓</i></a>
        </Container>

        <Container as="section" id="events-browser" className="events-browser">
          <header className="events-browser-intro" data-reveal>
            <p>DISCOVER THE MOMENTS BEHIND OUR WORK</p>
            <h2>CHOOSE WHAT<br />YOU WANT TO EXPLORE</h2>
          </header>

          <div className="events-view-tabs" role="tablist" aria-label="Events and press sections">
            <button type="button" role="tab" aria-selected={view === 'events'} className={view === 'events' ? 'is-active' : ''} onClick={() => changeView('events')}>
              EVENTS <span>{String(events.length).padStart(2, '0')}</span>
            </button>
            <button type="button" role="tab" aria-selected={view === 'press'} className={view === 'press' ? 'is-active' : ''} onClick={() => changeView('press')}>
              PRESS <span>{String(pressLogos.length).padStart(2, '0')}</span>
            </button>
          </div>

          {view === 'events' ? (
            <div role="tabpanel" className="events-panel">
              <div className="events-year-filter" aria-label="Filter events by year">
                {(['ALL', '2026', '2025', '2023', '2019', '2018'] as const).map((filterYear) => (
                  <button type="button" key={filterYear} className={year === filterYear ? 'is-active' : ''} onClick={() => setYear(filterYear)}>
                    {filterYear}
                  </button>
                ))}
              </div>
              <div className="event-card-grid">
                {filteredEvents.map((item, index) => (
                  <article className="event-browser-card" data-reveal key={item.id} style={{ '--delay': `${index * 70}ms` } as React.CSSProperties}>
                    <button type="button" onClick={() => setSelected(item)} aria-label={`View ${item.title}, ${item.year}`}>
                      <img src={image(item.cover)} alt={`${item.title} event`} width="900" height="1120" loading="lazy" decoding="async" />
                      <span className="event-card-wash" />
                      <span className="event-card-number">{String(index + 1).padStart(2, '0')}</span>
                      <span className="event-card-content">
                        <small>{item.year} · {item.partner}</small>
                        <strong>{item.title}</strong>
                        <em>VIEW EVENT <i>↗</i></em>
                      </span>
                    </button>
                  </article>
                ))}
              </div>
            </div>
          ) : (
            <div role="tabpanel" className="press-browser-panel">
              <div className="press-browser-feature" data-reveal>
                <img src={pressHero} alt="MB Designs architectural project featured in the press" width="2400" height="900" loading="lazy" decoding="async" />
                <div><p>IN THE NEWS</p><h2>WHERE OUR WORK<br />MAKES HEADLINES</h2></div>
              </div>
              <div className="press-browser-copy" data-reveal>
                <h3>PRESS RELEASES</h3>
                <p>Explore announcements, milestones, collaborations and achievements from MB Designs through the publications that share our story.</p>
              </div>
              <div className="press-browser-grid">
                {pressLogos.map((logo, index) => (
                  <article key={logo[0]} data-reveal style={{ '--delay': `${index * 70}ms` } as React.CSSProperties}>
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <img src={image(logo)} alt={`Press publication ${index + 1}`} loading="lazy" decoding="async" />
                    <small>FEATURED PUBLICATION</small>
                  </article>
                ))}
              </div>
            </div>
          )}
        </Container>
      </main>
      {selected && <EventDialog event={selected} onClose={() => setSelected(null)} />}
    </div>
  )
}

function EventDialog({ event, onClose }: { event: EventItem; onClose: () => void }) {
  return (
    <div className="event-dialog" role="dialog" aria-modal="true" aria-labelledby="event-dialog-title" onMouseDown={(click) => { if (click.target === click.currentTarget) onClose() }}>
      <div className="event-dialog-shell">
        <button className="event-dialog-close" type="button" onClick={onClose} autoFocus aria-label="Close event details">CLOSE <span>×</span></button>
        <header>
          <div><span>{event.year}</span><small>{event.partner}</small></div>
          <h2 id="event-dialog-title">{event.title}</h2>
          <p>{event.kicker}</p>
        </header>
        <div className="event-dialog-story"><p>{event.summary}</p><span>{String(event.gallery.length).padStart(2, '0')} IMAGES</span></div>
        <div className="event-dialog-gallery">
          {event.gallery.map((source, index) => (
            <figure key={`${source[0]}-${index}`}>
              <img src={image(source)} alt={`${event.title} — view ${index + 1}`} width="1500" height="1000" loading={index < 3 ? 'eager' : 'lazy'} decoding="async" />
            </figure>
          ))}
        </div>
      </div>
    </div>
  )
}
