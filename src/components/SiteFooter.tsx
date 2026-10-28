import { Link } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { Container } from './Container'
import { ArrowIcon } from './Icon'

const footerLinks = [
  { label: 'HOME', to: '/' },
  { label: 'ABOUT', to: '/about' },
  { label: 'AWARDS', to: '/awards' },
  { label: 'PROJECTS', to: '/projects' },
  { label: 'TEAM', to: '/team' },
  { label: 'EVENTS / PRESS', to: '/events-press' },
  { label: 'CAREER', to: '/career' },
] as const

const socialLinks = [
  { label: 'FACEBOOK', href: 'https://www.facebook.com/mb.mbdesigns/?locale=ar_AR', network: 'facebook' },
  { label: 'INSTAGRAM', href: 'https://www.instagram.com/mbdesigns.design/', network: 'instagram' },
  { label: 'LINKEDIN', href: 'https://www.linkedin.com/company/mbdesignseg/home/', network: 'linkedin' },
] as const

const cairoMapUrl = 'https://www.bing.com/maps/search?q=30.109478694184%2C+31.34949233624&cp=30.109478%7E31.349493&lvl=16&style=r'
const dubaiMapUrl = 'https://www.bing.com/maps/search?q=IFZA%20Business%20Park%2C%20DDP%20Building%20A1%2C%20Dubai%20Silicon%20Oasis%2C%20UAE'

type SocialNetwork = (typeof socialLinks)[number]['network']

function SocialIcon({ network }: { network: SocialNetwork }) {
  if (network === 'facebook') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path fill="currentColor" d="M13.7 21v-8h2.7l.4-3h-3.1V8.1c0-.9.3-1.5 1.6-1.5H17V3.9a22 22 0 0 0-2.4-.1c-2.4 0-4.1 1.5-4.1 4.2v2H8v3h2.5v8h3.2Z" />
      </svg>
    )
  }

  if (network === 'instagram') {
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3.5" y="3.5" width="17" height="17" rx="5" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <circle cx="17.5" cy="6.7" r="1.1" fill="currentColor" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M5.2 8.3H8V19H5.2V8.3Zm1.4-5.2a1.65 1.65 0 1 1 0 3.3 1.65 1.65 0 0 1 0-3.3ZM10.2 8.3h2.7v1.5h.1c.4-.7 1.3-1.8 3.3-1.8 3.5 0 4.1 2.2 4.1 5.2V19h-2.8v-5.2c0-1.2 0-2.9-1.8-2.9s-2 1.4-2 2.8V19h-2.9V8.3Z" />
    </svg>
  )
}

export function SiteFooter() {
  const footerRef = useRef<HTMLElement>(null)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [scrollTopOverFooter, setScrollTopOverFooter] = useState(false)

  useEffect(() => {
    let frame = 0
    const updateScrollTop = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        const footerBounds = footerRef.current?.getBoundingClientRect()
        const buttonProbe = window.innerHeight - 42

        setShowScrollTop(window.scrollY > Math.min(560, window.innerHeight * 0.68))
        setScrollTopOverFooter(Boolean(
          footerBounds && footerBounds.top <= buttonProbe && footerBounds.bottom >= buttonProbe,
        ))
      })
    }

    updateScrollTop()
    window.addEventListener('scroll', updateScrollTop, { passive: true })
    window.addEventListener('resize', updateScrollTop)

    return () => {
      window.removeEventListener('scroll', updateScrollTop)
      window.removeEventListener('resize', updateScrollTop)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' })
  }

  return (
    <>
      <footer ref={footerRef} id="contact" className="site-footer">
        <section className="site-footer-body">
          <Container>
            <header className="site-footer-brand">
              <Link className="site-footer-wordmark" to="/" aria-label="MB Designs home">
                <img
                  className="site-footer-logo"
                  src="/assets/branding/mb-designs-logo-white-hq.png"
                  alt=""
                  width="937"
                  height="177"
                  loading="lazy"
                  decoding="async"
                />
              </Link>
              <p>Thoughtful spaces shaped by context, craft and the people who use them.</p>
            </header>

            <div className="site-footer-directory">
              <address>
                <small>01 / EGYPT OFFICE</small>
                <strong>CAIRO</strong>
                <p>9 Salah Eldin Fadel Street<br />Heliopolis, Cairo, Egypt</p>
                <a href="tel:+201003003797">+20 100 300 3797</a>
                <a href="tel:+20221811013">+20 2 2181 1013</a>
                <a className="site-footer-map-link" href={cairoMapUrl} target="_blank" rel="noopener noreferrer">
                  VIEW ON MAP <ArrowIcon />
                </a>
              </address>
              <address>
                <small>02 / UAE OFFICE</small>
                <strong>DUBAI</strong>
                <p>IFZA Business Park, DDP Building A1<br />Dubai Silicon Oasis, UAE</p>
                <a href="tel:+971502551477">+971 50 255 1477</a>
                <a className="site-footer-map-link" href={dubaiMapUrl} target="_blank" rel="noopener noreferrer">
                  VIEW ON MAP <ArrowIcon />
                </a>
              </address>
              <div className="site-footer-new-business">
                <small>03 / NEW BUSINESS</small>
                <strong>LET’S TALK</strong>
                <span>Projects, collaborations, careers and press enquiries.</span>
                <a href="mailto:info@mbdesigns.design">INFO@MBDESIGNS.DESIGN</a>
                <nav className="site-footer-social" aria-label="Social media">
                  {socialLinks.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`MB Designs on ${item.label}`}
                      title={item.label}
                    >
                      <SocialIcon network={item.network} />
                    </a>
                  ))}
                </nav>
              </div>
            </div>

            <nav className="site-footer-links" aria-label="Footer navigation">
              {footerLinks.map((item) => (
                <Link key={item.to} to={item.to} activeProps={{ className: 'is-active' }}>{item.label}</Link>
              ))}
            </nav>

            <div className="site-footer-bottom">
              <span>© {new Date().getFullYear()} MB DESIGNS. ALL RIGHTS RESERVED.</span>
              <span>DESIGNED BETWEEN CAIRO AND DUBAI</span>
            </div>
          </Container>
        </section>
      </footer>

      <button
        type="button"
        className={`scroll-top-button${showScrollTop ? ' is-visible' : ''}${scrollTopOverFooter ? ' is-over-footer' : ''}`}
        aria-label="Scroll to top"
        tabIndex={showScrollTop ? 0 : -1}
        onClick={scrollToTop}
      >
        {/* <span>TOP</span> */}
        <ArrowIcon direction="up" />
      </button>
    </>
  )
}
