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
  { label: 'FACEBOOK', href: 'https://www.facebook.com/mb.mbdesigns/?locale=ar_AR' },
  { label: 'INSTAGRAM', href: 'https://www.instagram.com/mbdesigns.design/' },
  { label: 'LINKEDIN', href: 'https://www.linkedin.com/company/mbdesignseg/home/' },
] as const

const cairoMapUrl = 'https://www.bing.com/maps/search?q=30.109478694184%2C+31.34949233624&cp=30.109478%7E31.349493&lvl=16&style=r'

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
                  src="/assets/branding/mb-designs-logo-white.png"
                  alt=""
                  width="1169"
                  height="354"
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
                <a className="site-footer-map-link" href={cairoMapUrl} target="_blank" rel="noopener noreferrer">
                  VIEW ON MAP <ArrowIcon />
                </a>
                <a href="tel:+201003003797">+20 100 300 3797</a>
                <a href="tel:+20221811013">+20 2 2181 1013</a>
              </address>
              <address>
                <small>02 / UAE OFFICE</small>
                <strong>DUBAI</strong>
                <p>IFZA Business Park, DDP Building A1<br />Dubai Silicon Oasis, UAE</p>
                <a href="tel:+971502551477">+971 50 255 1477</a>
              </address>
              <div className="site-footer-new-business">
                <small>03 / NEW BUSINESS</small>
                <strong>LET’S TALK</strong>
                <span>Projects, collaborations, careers and press enquiries.</span>
                <a href="mailto:info@mbdesigns.design">INFO@MBDESIGNS.DESIGN</a>
              </div>
            </div>

            <div className="site-footer-social">
              <span>FOLLOW THE STUDIO</span>
              <nav aria-label="Social media">
                {socialLinks.map((item) => (
                  <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer">
                    {item.label} <ArrowIcon />
                  </a>
                ))}
              </nav>
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
