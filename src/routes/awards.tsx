import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'

export const Route = createFileRoute('/awards')({
  head: () => ({
    meta: [
      { title: 'Awards | MB Designs' },
      {
        name: 'description',
        content: 'International architecture and interior design awards earned by MB Designs.',
      },
    ],
    links: [
      { rel: 'preload', as: 'image', href: '/assets/images/awards-hero.webp' },
    ],
  }),
  component: AwardsPage,
})

const awardEntries = [
  {
    number: '01',
    name: 'EASTOWN DUPLEX',
    category: 'RESIDENTIAL PROPERTY INTERIOR – PRIVATE RESIDENCE',
    image: '/assets/images/award-eastown.webp',
    copy: [
      'THE EASTOWN DUPLEX PROJECT WAS RECOGNIZED AT THE ARABIAN-AFRICAN INTERNATIONAL PROPERTY AWARDS 2020–2021, WINNING IN THE RESIDENTIAL PROPERTY INTERIOR – PRIVATE RESIDENCE CATEGORY.',
      "THE PROJECT SHOWCASES MB DESIGNS' COMMITMENT TO CREATING SOPHISTICATED RESIDENTIAL SPACES THAT COMBINE FUNCTIONALITY, ELEGANCE, AND TIMELESS DESIGN.",
    ],
  },
  {
    number: '02',
    name: 'NUWA BY MORI CO',
    category: 'LEISURE INTERIOR CONCEPT',
    image: '/assets/images/award-nuwa.webp',
    copy: [
      'NUWA BY MORI CO RECEIVED THE ARABIAN-AFRICAN INTERNATIONAL PROPERTY AWARDS 2020–2021 FOR ITS OUTSTANDING INTERIOR CONCEPT IN THE LEISURE AND HOSPITALITY SECTOR.',
      'INSPIRED BY CONTEMPORARY ASIAN AESTHETICS, THE RESTAURANT DELIVERS AN IMMERSIVE DINING EXPERIENCE THROUGH CAREFULLY CURATED MATERIALS, LIGHTING, AND SPATIAL STORYTELLING.',
    ],
  },
] as const

const luxuryEntries = [
  {
    number: '01',
    name: 'GRAND RESIDENCE VILLA',
    category: 'BEST LUXURY RESIDENTIAL INTERIOR DESIGN IN EGYPT',
    image: '/assets/images/award-villa.webp',
    copy: [
      'THE GRAND RESIDENCE VILLA WAS HONORED WITH THE LUXURY LIFESTYLE AWARDS 2021, RECEIVING THE TITLE OF BEST LUXURY RESIDENTIAL INTERIOR DESIGN IN EGYPT.',
      'THE PROJECT REFLECTS EXCEPTIONAL CRAFTSMANSHIP, REFINED DETAILING, AND A SEAMLESS BLEND OF LUXURY WITH EVERYDAY LIVING.',
    ],
  },
  {
    number: '02',
    name: 'BEST LUXURY INTERIOR DESIGN STUDIO IN EGYPT',
    category: '',
    image: '/assets/images/award-studio.webp',
    copy: [
      'IN 2022, MB DESIGNS WAS RECOGNIZED AS THE BEST LUXURY INTERIOR DESIGN STUDIO IN EGYPT BY THE LUXURY LIFESTYLE AWARDS.',
      "THIS ACHIEVEMENT CELEBRATES THE FIRM'S CONTINUED EXCELLENCE IN DELIVERING INNOVATIVE ARCHITECTURAL AND INTERIOR DESIGN SOLUTIONS ACROSS RESIDENTIAL, HOSPITALITY, RETAIL, AND CORPORATE SECTORS.",
    ],
  },
] as const

function AwardsPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [ready, setReady] = useState(false)
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 90)
    const root = pageRef.current
    if (!root) return () => window.clearTimeout(timer)

    const items = root.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -7% 0px', threshold: 0.09 },
    )
    items.forEach((item) => observer.observe(item))

    return () => {
      window.clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  return (
    <div ref={pageRef} className={ready ? 'awards-site is-ready' : 'awards-site'}>
      <header className="site-header awards-header">
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="/about">ABOUT</a>
          <a className="is-current" href="/awards">AWARDS</a>
          <a href="/projects">PROJECTS</a>
          <a href="/" className="brand" aria-label="MB Designs home">
            <span className="wordmark" aria-hidden="true">
              <b>MB | DESIGNS</b>
              <small>ARCHITECTURE &amp; INTERIOR DESIGN STUDIO</small>
            </span>
          </a>
          <a href="/team">TEAM</a>
          <a href="/events-press">EVENTS/PRESS</a>
          <a href="#contact">CAREER</a>
        </nav>
        <a href="/" className="mobile-brand" aria-label="MB Designs home">
          <span className="wordmark" aria-hidden="true">
            <b>MB | DESIGNS</b>
            <small>ARCHITECTURE &amp; INTERIOR DESIGN STUDIO</small>
          </span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="awards-mobile-menu"
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? 'CLOSE' : 'MENU'}
        </button>
        <div id="awards-mobile-menu" className={menuOpen ? 'mobile-menu is-open' : 'mobile-menu'}>
          <a href="/about" onClick={() => setMenuOpen(false)}>ABOUT</a>
          <a href="/awards" onClick={() => setMenuOpen(false)}>AWARDS</a>
          <a href="/projects" onClick={() => setMenuOpen(false)}>PROJECTS</a>
          <a href="/team" onClick={() => setMenuOpen(false)}>TEAM</a>
          <a href="/events-press" onClick={() => setMenuOpen(false)}>EVENTS/PRESS</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>CAREER</a>
        </div>
      </header>

      <main>
        <section id="top" className="awards-hero">
          <img src="/assets/images/awards-hero.webp" alt="Abstract amber architectural light" width="1920" height="1145" fetchPriority="high" />
          <div className="awards-hero-shade" />
          <div className="awards-hero-copy">
            <h1>WHERE VISION<br />EARNS RECOGNITION</h1>
            <p>HONORING A TRADITION OF TIMELESS<br />DESIGN AND ARCHITECTURAL EXCELLENCE.</p>
          </div>
        </section>

        <section className="certificate-section">
          <h2 data-reveal>AWARDS</h2>
          <CertificateRow year="2021" image="/assets/images/awards-2021.webp" width={2400} height={1217} />
          <CertificateRow year="2022" image="/assets/images/awards-2022.webp" width={2400} height={1396} />
        </section>

        <section className="awards-purpose">
          <img src="/assets/images/awards-purpose.webp" alt="Contemporary residence in warm evening light" width="1472" height="1840" loading="lazy" decoding="async" />
          <div className="awards-purpose-shade" />
          <div data-reveal>
            <h2>DESIGN<br />WITH PURPOSE</h2>
            <p>EACH AWARD REFLECTS OUR PASSION FOR<br className="desktop-break" /> CREATING TIMELESS SPACES WITH PURPOSE, PRECISION,<br className="desktop-break" /> AND LASTING IMPACT.</p>
          </div>
        </section>

        <section className="award-editorial">
          <header className="award-family" data-reveal>
            <div>
              <h2>INTERNATIONAL AWARDS</h2>
              <p>THE ARABIAN-AFRICAN INTERNATIONAL PROPERTY AWARDS<br />2020–2021</p>
            </div>
            <div className="property-flags" aria-label="Arabian Property Awards winner 2020–2021">
              <span>ARABIAN<br />PROPERTY<br />AWARDS<br /><b>AWARD<br />WINNER</b><small>2020–2021</small></span>
              <span>ARABIAN<br />PROPERTY<br />AWARDS<br /><b>AWARD<br />WINNER</b><small>2020–2021</small></span>
            </div>
          </header>
          {awardEntries.map((entry) => <EditorialAward key={entry.name} entry={entry} />)}

          <header className="award-family luxury-family" data-reveal>
            <h2>LUXURY LIFESTYLE AWARDS 2021–2022</h2>
            <div className="luxury-wins" aria-label="Luxury Lifestyle Awards winners 2021 and 2022">
              <span>LUXURY <b>WINNER<br />2021</b></span>
              <span>LUXURY <b>WINNER<br />2022</b></span>
            </div>
          </header>
          {luxuryEntries.map((entry) => <EditorialAward key={entry.name} entry={entry} />)}

          <div className="awards-arrows" aria-hidden="true"><span>←</span><span>→</span></div>
        </section>
      </main>

      <footer id="contact" className="footer awards-footer">
        <img src="/assets/images/contact.webp" alt="MB Designs landscape visualization" width="1600" height="608" loading="lazy" decoding="async" />
        <div className="footer-shade" />
        <div className="footer-content" data-reveal>
          <h2>CONTACT US</h2>
          <div className="footer-grid">
            <address>
              <b>Egypt Office</b>
              <span>9 Salah Eldin Fadel Street</span>
              <span>Heliopolis, Cairo, Egypt</span>
              <a href="tel:+201003003797">+20 100 300 3797</a>
              <a href="tel:+20221811013">+20 2 2181 1013</a>
            </address>
            <address>
              <b>UAE Office</b>
              <span>IFZA Business Park</span>
              <span>DDP Building A1 Dubai Silicon Oasis</span>
              <span>Dubai, United Arab Emirates</span>
              <a href="tel:+971502551477">+971 50 255 1477</a>
            </address>
            <a className="footer-site" href="mailto:info@mbdesigns.design">MBDESIGNS.DESIGN</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} MB DESIGNS</span>
          <a href="#top">BACK TO TOP ↑</a>
        </div>
      </footer>
    </div>
  )
}

function CertificateRow({ year, image, width, height }: { year: string; image: string; width: number; height: number }) {
  return (
    <article className="certificate-row" data-reveal>
      <p>/LUXURY LIFESTYLE AWARDS {year}</p>
      <img src={image} alt={`Luxury Lifestyle Awards ${year} letter and winner certificate`} width={width} height={height} loading="lazy" decoding="async" />
    </article>
  )
}

type AwardEntry = (typeof awardEntries)[number] | (typeof luxuryEntries)[number]

function EditorialAward({ entry }: { entry: AwardEntry }) {
  return (
    <article className="editorial-award" data-reveal>
      <div className="editorial-copy">
        <div className="editorial-title"><span>{entry.number}</span><h3>{entry.name}</h3></div>
        {entry.category && <h4>{entry.category}</h4>}
        {entry.copy.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      <img src={entry.image} alt={`${entry.name} award project`} width="1600" height="1013" loading="lazy" decoding="async" />
    </article>
  )
}
