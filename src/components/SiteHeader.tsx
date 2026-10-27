import { Link, useLocation } from '@tanstack/react-router'
import { useEffect, useState } from 'react'

const navigation = [
  { label: 'ABOUT', to: '/about' },
  { label: 'AWARDS', to: '/awards' },
  { label: 'PROJECTS', to: '/projects' },
  { label: 'TEAM', to: '/team' },
  { label: 'EVENTS/PRESS', to: '/events-press' },
  { label: 'CAREER', to: '/career' },
] as const

export function SiteHeader() {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [overDark, setOverDark] = useState(true)
  const headerClassName = [
    'site-header shared-header',
    scrolled ? 'is-scrolled' : '',
    overDark ? 'is-over-dark' : 'is-over-light',
    menuOpen ? 'is-menu-open' : '',
  ].filter(Boolean).join(' ')

  useEffect(() => setMenuOpen(false), [pathname])

  useEffect(() => {
    if (!menuOpen) return
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = previousOverflow }
  }, [menuOpen])

  useEffect(() => {
    let frame = 0
    const updateHeader = () => {
      window.cancelAnimationFrame(frame)
      frame = window.requestAnimationFrame(() => {
        const probeY = Math.min(42, window.innerHeight / 2)
        const darkSurfaces = document.querySelectorAll<HTMLElement>(
          '.site-page-hero, .home-hero, .site-footer, .awards-purpose, .home-awards-hero',
        )
        const isOverDark = Array.from(darkSurfaces).some((surface) => {
          const bounds = surface.getBoundingClientRect()
          return bounds.top <= probeY && bounds.bottom >= probeY
        })

        setScrolled(window.scrollY > 24)
        setOverDark(isOverDark)
      })
    }

    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    window.addEventListener('resize', updateHeader)
    return () => {
      window.removeEventListener('scroll', updateHeader)
      window.removeEventListener('resize', updateHeader)
      window.cancelAnimationFrame(frame)
    }
  }, [pathname])

  return (
    <header className={headerClassName}>
      <nav className="desktop-nav" aria-label="Primary navigation">
        <div className="desktop-nav__links">
          {navigation.slice(0, 3).map((item) => (
            <Link key={item.to} to={item.to} activeProps={{ className: 'is-current' }}>{item.label}</Link>
          ))}
        </div>
        <Link to="/" className="brand" activeOptions={{ exact: true }} aria-label="MB Designs home">
          <BrandLogo />
        </Link>
        <div className="desktop-nav__links">
          {navigation.slice(3).map((item) => (
            <Link key={item.to} to={item.to} activeProps={{ className: 'is-current' }}>{item.label}</Link>
          ))}
        </div>
      </nav>

      <Link to="/" className="mobile-brand" activeOptions={{ exact: true }} aria-label="MB Designs home" onClick={() => setMenuOpen(false)}>
        <BrandLogo />
      </Link>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="site-mobile-menu"
        onClick={() => setMenuOpen((value) => !value)}
      >
        {menuOpen ? 'CLOSE' : 'MENU'}
      </button>
      <nav id="site-mobile-menu" className={menuOpen ? 'mobile-menu is-open' : 'mobile-menu'} aria-label="Mobile navigation">
        {navigation.map((item) => (
          <Link key={item.to} to={item.to} activeProps={{ className: 'is-current' }} onClick={() => setMenuOpen(false)}>{item.label}</Link>
        ))}
      </nav>
    </header>
  )
}

function BrandLogo() {
  return (
    <span className="brand-logo" aria-hidden="true">
      <img
        className="brand-logo__image brand-logo__image--white"
        src="/assets/branding/mb-designs-logo-white-hq.png"
        alt=""
        width="937"
        height="177"
        fetchPriority="high"
      />
      <img
        className="brand-logo__image brand-logo__image--black"
        src="/assets/branding/mb-designs-logo-black-hq.png"
        alt=""
        width="937"
        height="177"
        decoding="async"
      />
    </span>
  )
}
