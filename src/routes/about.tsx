import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      { title: 'About | MB Designs' },
      {
        name: 'description',
        content: 'The story, philosophy, mission and vision behind MB Designs.',
      },
    ],
    links: [
      { rel: 'preload', as: 'image', href: '/assets/images/about-founder.webp' },
    ],
  }),
  component: AboutPage,
})

function AboutPage() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [ready, setReady] = useState(false)
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 100)
    const root = pageRef.current
    if (!root) return () => window.clearTimeout(timer)

    const items = root.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )
    items.forEach((item) => observer.observe(item))

    return () => {
      window.clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  return (
    <div ref={pageRef} className={ready ? 'about-site is-ready' : 'about-site'}>
      <header className="site-header about-header">
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a className="is-current" href="/about">ABOUT</a>
          <a href="/awards">AWARDS</a>
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
          aria-controls="about-mobile-menu"
          onClick={() => setMenuOpen((value) => !value)}
        >
          {menuOpen ? 'CLOSE' : 'MENU'}
        </button>
        <div id="about-mobile-menu" className={menuOpen ? 'mobile-menu is-open' : 'mobile-menu'}>
          <a href="/about" onClick={() => setMenuOpen(false)}>ABOUT</a>
          <a href="/awards" onClick={() => setMenuOpen(false)}>AWARDS</a>
          <a href="/projects" onClick={() => setMenuOpen(false)}>PROJECTS</a>
          <a href="/team" onClick={() => setMenuOpen(false)}>TEAM</a>
          <a href="/events-press" onClick={() => setMenuOpen(false)}>EVENTS/PRESS</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>CAREER</a>
        </div>
      </header>

      <main>
        <section className="about-hero" id="top">
          <img
            className="about-founder"
            src="/assets/images/about-founder.webp"
            alt="Mohamed Badr, founder of MB Designs"
            width="1133"
            height="1388"
            fetchPriority="high"
          />
          <div className="about-hero-copy">
            <h1>THE VISION<br />BEHIND EVERY PROJECT</h1>
            <p>
              MOHAMED BADR IS RENOWNED FOR HIS INNOVATIVE DESIGN APPROACH, COMBINING<br className="desktop-break" />
              CREATIVITY WITH A DEEP UNDERSTANDING OF MATERIALS, FUNCTIONALITY, AND HUMAN EXPERIENCE. HIS EXPERTISE
              SPANS ARCHITECTURE, INTERIOR DESIGN, PROJECT MANAGEMENT, AND CONSULTANCY,<br className="desktop-break" />
              EARNING RECOGNITION FOR CREATING SOPHISTICATED SPACES THAT<br className="desktop-break" />
              ARE BOTH PURPOSEFUL AND TIMELESS.
            </p>
          </div>
          <div className="about-legacy" aria-label="Elevating lasting legacies">
            <span>ELEVATING</span>
            <span>LASTING</span>
            <span>LEGACIES</span>
          </div>
        </section>

        <section className="about-story about-section">
          <h2 data-reveal>OUR STORY</h2>
          <div className="about-copy" data-reveal>
            <p className="about-kicker">/ WHERE OUR JOURNEY BEGAN</p>
            <p>FOUNDED IN 1995, MB DESIGNS HAS GROWN INTO A MULTIDISCIPLINARY DESIGN STUDIO RECOGNIZED FOR DELIVERING EXCEPTIONAL ARCHITECTURE AND INTERIOR SOLUTIONS ACROSS CORPORATE, HOSPITALITY, RETAIL, AND RESIDENTIAL SECTORS.</p>
            <p>EVERY PROJECT IS GUIDED BY COLLABORATION, CREATIVITY, AND A DEDICATION TO ARCHITECTURAL EXCELLENCE. TODAY, WE CONTINUE TO BUILD UPON OUR LEGACY BY DESIGNING SPACES THAT ENHANCE EXPERIENCES AND ENRICH THE WAY PEOPLE LIVE, WORK, AND CONNECT.</p>
          </div>
        </section>

        <section className="about-philosophy">
          <div className="about-philosophy-shade" />
          <h2 data-reveal>OUR PHILOSOPHY</h2>
          <p data-reveal>
            WE BELIEVE THAT EXCEPTIONAL DESIGN EXTENDS BEYOND AESTHETICS. EVERY SPACE SHOULD INSPIRE, FUNCTION EFFORTLESSLY, AND REFLECT THE IDENTITY OF THOSE WHO EXPERIENCE IT. OUR WORK BALANCES ELEGANCE, INNOVATION, CRAFTSMANSHIP, AND TECHNICAL EXPERTISE TO CREATE ENVIRONMENTS THAT IMPROVE EVERYDAY LIFE WHILE STANDING THE TEST OF TIME.
          </p>
        </section>

        <section className="about-values about-section">
          <article className="about-value" data-reveal>
            <h2>OUR MISSION</h2>
            <div>
              <p className="about-kicker">/ WHAT DRIVES US?</p>
              <p>OUR MISSION IS TO DESIGN MEANINGFUL SPACES THAT ELEVATE HUMAN EXPERIENCES THROUGH THOUGHTFUL ARCHITECTURE, TIMELESS INTERIORS, AND UNCOMPROMISING QUALITY.</p>
              <p>EVERY PROJECT IS AN OPPORTUNITY TO TRANSFORM VISION INTO REALITY WHILE DELIVERING ENDURING VALUE FOR OUR CLIENTS AND COMMUNITIES.</p>
            </div>
          </article>
          <article className="about-value about-value-vision" data-reveal>
            <h2>OUR VISION</h2>
            <div>
              <p className="about-kicker">/ THE FUTURE WE ENVISION</p>
              <p>TO SHAPE THE FUTURE OF ARCHITECTURE AND INTERIOR DESIGN BY CREATING INSPIRING ENVIRONMENTS THAT REDEFINE HOW PEOPLE LIVE, WORK, AND EXPERIENCE SPACE, SETTING NEW STANDARDS OF EXCELLENCE THROUGH INNOVATION, CREATIVITY, AND PURPOSEFUL DESIGN.</p>
            </div>
          </article>
          <div className="about-arrows" aria-hidden="true"><span>←</span><span>→</span></div>
        </section>
      </main>

      <footer id="contact" className="footer about-footer">
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
