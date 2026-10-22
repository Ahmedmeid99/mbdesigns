import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const partnerLogos = [
  ['3b4e6777a0647590', 'Palm Hills Developments'],
  ['a244ee3790d7910d', 'SODIC'],
  ['8e4f93d539550a8a', 'Tatweer Misr'],
  ['d1a6577d69ebd454', 'Marakez'],
  ['22df8de71dee97fd', 'Pinko'],
  ['c78f3991e2b90752', 'Commercial partner'],
  ['2550bd4224eb62d4', 'Real estate partner'],
  ['3a965e4df698a4a3', 'Retail partner'],
  ['e97a6c6713d3eb28', 'Hospitality partner'],
  ['af05a4481afd8b74', 'Valentino'],
  ['538bb5dd411be0e1', 'Retail partner'],
  ['2938c3574ba2aebe', 'Commercial partner'],
  ['20af07b07db56cf2', 'Fashion partner'],
  ['4ff1a755e5a7ab9e', 'Hospitality partner'],
  ['7804445959065e27', 'Retail partner'],
  ['6d4b5d12526e8392', 'Hugo Boss'],
  ['f83ac1d5c2a93a53', 'Commercial partner'],
  ['7ab3e2dd957424c5', 'Hospitality partner'],
  ['70856edca403ccbe', 'Hotel partner'],
  ['f4402aa139140d81', 'Food and beverage partner'],
  ['18f4e5a174db548d', 'Hospitality partner'],
  ['ef0a159464d1e2ee', 'Food and beverage partner'],
] as const

const awards = [
  {
    number: '01',
    name: 'EASTOWN DUPLEX',
    category: 'RESIDENTIAL PROPERTY INTERIOR – PRIVATE RESIDENCE',
    image: '/assets/images/award-eastown.webp',
  },
  {
    number: '02',
    name: 'NUWA BY MORI CO',
    category: 'LEISURE INTERIOR CONCEPT',
    image: '/assets/images/award-nuwa.webp',
  },
] as const

const luxuryAwards = [
  {
    number: '01',
    name: 'GRAND RESIDENCE VILLA',
    category: 'BEST LUXURY RESIDENTIAL INTERIOR DESIGN IN EGYPT',
    image: '/assets/images/award-villa.webp',
  },
  {
    number: '02',
    name: 'BEST LUXURY STUDIO IN EGYPT',
    category: 'BEST LUXURY INTERIOR DESIGN STUDIO IN EGYPT',
    image: '/assets/images/award-studio.webp',
  },
] as const

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [introDone, setIntroDone] = useState(false)
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroDone(true), 900)
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
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
    )
    items.forEach((item) => observer.observe(item))

    return () => {
      window.clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  return (
    <div ref={pageRef} className={introDone ? 'site is-ready' : 'site'}>
      <div className="intro-curtain" aria-hidden="true">
        <span>MB</span>
      </div>

      <header className="site-header">
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a href="/about">ABOUT</a>
          <a href="/awards">AWARDS</a>
          <a href="/projects">PROJECTS</a>
          <a href="#top" className="brand" aria-label="MB Designs home">
            <span className="wordmark" aria-hidden="true">
              <b>MB | DESIGNS</b>
              <small>ARCHITECTURE &amp; INTERIOR DESIGN STUDIO</small>
            </span>
          </a>
          <a href="/team">TEAM</a>
          <a href="/events-press">EVENTS/PRESS</a>
          <a href="#contact">CAREER</a>
        </nav>
        <a href="#top" className="mobile-brand" aria-label="MB Designs home">
          <span className="wordmark" aria-hidden="true">
            <b>MB | DESIGNS</b>
            <small>ARCHITECTURE &amp; INTERIOR DESIGN STUDIO</small>
          </span>
        </a>
        <button
          className="menu-toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? 'CLOSE' : 'MENU'}
        </button>
        <div id="mobile-menu" className={menuOpen ? 'mobile-menu is-open' : 'mobile-menu'}>
          {['ABOUT', 'AWARDS', 'PROJECTS', 'TEAM', 'EVENTS/PRESS', 'CAREER'].map((item) => (
            <a key={item} href={item === 'ABOUT' ? '/about' : item === 'AWARDS' ? '/awards' : item === 'PROJECTS' ? '/projects' : item === 'TEAM' ? '/team' : item === 'EVENTS/PRESS' ? '/events-press' : '#contact'} onClick={() => setMenuOpen(false)}>
              {item}
            </a>
          ))}
        </div>
      </header>

      <main>
        <section id="top" className="hero">
          <video
            className="hero-video"
            poster="/assets/images/hero.webp"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="MB Designs architectural project film"
          >
            <source src="/assets/video/hero.mp4" type="video/mp4" />
          </video>
          <div className="hero-shade" />
          <h1 className="hero-title">
            ARCHITECTURE &amp; INTERIOR DESIGN THAT
            <br />
            INSPIRES
          </h1>
          <div className="hero-locations">
            <span>CAIRO, EGYPT</span>
            <span>DUBAI, UAE</span>
          </div>
          <a className="scroll-cue" href="#statement" aria-label="Scroll to introduction">
            <span>SCROLL</span>
            <i />
          </a>
        </section>

        <section id="statement" className="statement section-pad">
          <p className="eyebrow" data-reveal>WE REDEFINE</p>
          <h2 data-reveal>
            WE REDEFINE TIMELESS
            <br />
            ARCHITECTURE &amp; INTERIOR DESIGN
          </h2>
          <div className="statement-index" data-reveal>
            <span>EST. 1994</span>
            <span>CAIRO / DUBAI</span>
          </div>
        </section>

        <section id="about" className="about-collage section-pad">
          <div className="about-heading" data-reveal>
            <span>01</span>
            <h2>CRAFTING<br />TIMELESS SPACES</h2>
          </div>
          <div className="about-images" data-reveal>
            <img
              className="about-tall"
              src="/assets/images/about-tall.webp"
              alt="Contemporary MB Designs architecture"
              width="620"
              height="642"
              loading="lazy"
              decoding="async"
            />
            <img
              className="about-wide"
              src="/assets/images/about-wide.webp"
              alt="Modern courtyard designed by MB Designs"
              width="913"
              height="514"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="about-copy" data-reveal>
            <h3>
              DRIVEN BY OVER THREE DECADES OF DESIGN EXCELLENCE, MB DESIGNS CREATES AWARD-WINNING ARCHITECTURE AND INTERIOR ENVIRONMENTS THAT SEAMLESSLY BLEND INNOVATION, FUNCTIONALITY, AND TIMELESS AESTHETICS.
            </h3>
            <p>
              WITH EXPERTISE ACROSS CORPORATE, HOSPITALITY, RETAIL, AND RESIDENTIAL SECTORS, WE DESIGN SPACES THAT INSPIRE, PERFORM, AND ENDURE. GUIDED BY CREATIVITY, TECHNICAL PRECISION, AND METICULOUS ATTENTION TO DETAIL, EVERY PROJECT IS CRAFTED TO REFLECT ITS PURPOSE WHILE LEAVING A LASTING IMPRESSION.
            </p>
            <a className="pill" href="/about">EXPLORE</a>
          </div>
        </section>

        <section className="partners section-pad" aria-labelledby="partners-title">
          <p className="eyebrow" data-reveal>OUR VALUED PARTNERS</p>
          <h2 id="partners-title" data-reveal>SERVING INDUSTRY PARTNERS</h2>
          <div className="partner-row" data-reveal>
            <span>REAL ESTATE DEVELOPERS</span>
            <div className="logo-marquee">
              <div className="logo-track">
                {[...partnerLogos.slice(0, 11), ...partnerLogos.slice(0, 11)].map(([id, alt], index) => (
                  <div className="logo-cell" key={`${id}-${index}`}>
                    <img src={`/assets/partners/${id}.webp`} alt={alt} width="180" height="86" loading="lazy" decoding="async" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="partner-row reverse" data-reveal>
            <span>RETAIL &amp; COMMERCIAL</span>
            <div className="logo-marquee">
              <div className="logo-track">
                {[...partnerLogos.slice(11), ...partnerLogos.slice(11)].map(([id, alt], index) => (
                  <div className="logo-cell" key={`${id}-${index}`}>
                    <img src={`/assets/partners/${id}.webp`} alt={alt} width="180" height="86" loading="lazy" decoding="async" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="projects" className="manifesto">
          <video autoPlay muted loop playsInline preload="none" poster="/assets/images/hero.webp" aria-label="MB Designs project showcase">
            <source src="/assets/video/manifesto.mp4" type="video/mp4" />
          </video>
          <div className="manifesto-wash" />
          <h2 data-reveal>
            DRIVEN BY CREATIVITY
            <br />
            DEFINED BY CRAFTSMANSHIP
            <br />
            DESIGNED TO INSPIRE
          </h2>
        </section>

        <section id="studio" className="services section-pad">
          <div className="services-word" aria-hidden="true">WE</div>
          <div className="services-content" data-reveal>
            <p>WE COVER</p>
            <ul>
              <li>ARCHITECTURE</li>
              <li>INTERIOR</li>
              <li>SOFT/HARD LANDSCAPING</li>
              <li>COST MANAGEMENT</li>
              <li>PROJECT MANAGEMENT</li>
              <li>SITE SUPERVISION</li>
            </ul>
          </div>
        </section>

        <section className="territories section-pad" aria-labelledby="territories-title">
          <h2 id="territories-title" data-reveal>WHERE WE DESIGN</h2>
          <div className="territory-grid">
            {[
              ['EGYPT', '/assets/video/egypt.mp4'],
              ['UAE', '/assets/video/dubai.mp4'],
              ['SAUDI ARABIA', '/assets/video/riyadh.mp4'],
            ].map(([name, src], index) => (
              <article className="territory-card" data-reveal key={name} style={{ '--delay': `${index * 90}ms` } as React.CSSProperties}>
                <video autoPlay muted loop playsInline preload="none" aria-label={`${name} project locations`}>
                  <source src={src} type="video/mp4" />
                </video>
                <div />
                <h3>{name}</h3>
              </article>
            ))}
          </div>
        </section>

        <section id="awards" className="awards section-pad">
          <div className="awards-intro" data-reveal>
            <p>INTERNATIONAL AWARDS</p>
            <h2>THE ARABIAN-AFRICAN INTERNATIONAL<br />PROPERTY AWARDS 2020–2021</h2>
          </div>
          <div className="award-grid">
            {awards.map((award, index) => <AwardCard key={award.name} award={award} delay={index * 100} />)}
          </div>
          <a className="pill awards-pill" href="#contact">EXPLORE</a>

          <div className="luxury-heading" data-reveal>
            <div className="winner-badge">WINNER<br /><b>2021 / 2022</b></div>
            <h2>LUXURY LIFESTYLE AWARDS</h2>
          </div>
          <div className="award-grid">
            {luxuryAwards.map((award, index) => <AwardCard key={award.name} award={award} delay={index * 100} />)}
          </div>
        </section>
      </main>

      <footer id="contact" className="footer">
        <img src="/assets/images/contact.webp" alt="MB Designs landscape visualization" width="568" height="216" loading="lazy" decoding="async" />
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

function AwardCard({
  award,
  delay,
}: {
  award: { readonly number: string; readonly name: string; readonly category: string; readonly image: string }
  delay: number
}) {
  return (
    <article className="award-card" data-reveal style={{ '--delay': `${delay}ms` } as React.CSSProperties}>
      <div className="award-title">
        <span>{award.number}</span>
        <h3>{award.name}</h3>
      </div>
      <p>{award.category}</p>
      <div className="award-image">
        <img src={award.image} alt={award.name} width="478" height="303" loading="lazy" decoding="async" />
      </div>
    </article>
  )
}
