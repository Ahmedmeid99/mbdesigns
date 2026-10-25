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
  const headerClassName = [
    'site-header shared-header',
    scrolled ? 'is-scrolled' : '',
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
      frame = window.requestAnimationFrame(() => setScrolled(window.scrollY > 24))
    }

    updateHeader()
    window.addEventListener('scroll', updateHeader, { passive: true })
    return () => {
      window.removeEventListener('scroll', updateHeader)
      window.cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <header className={headerClassName}>
      <nav className="desktop-nav" aria-label="Primary navigation">
        {navigation.slice(0, 3).map((item) => (
          <Link key={item.to} to={item.to} activeProps={{ className: 'is-current' }}>{item.label}</Link>
        ))}
        <Link to="/" className="brand" activeOptions={{ exact: true }} aria-label="MB Designs home">
          <Wordmark />
        </Link>
        {navigation.slice(3).map((item) => (
          <Link key={item.to} to={item.to} activeProps={{ className: 'is-current' }}>{item.label}</Link>
        ))}
      </nav>

      <Link to="/" className="mobile-brand" activeOptions={{ exact: true }} aria-label="MB Designs home" onClick={() => setMenuOpen(false)}>
        <Wordmark />
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

function Wordmark() {
  return (
    <span className="wordmark" aria-hidden="true">
      <b>MB | DESIGNS</b>
      <small>ARCHITECTURE &amp; INTERIOR DESIGN STUDIO</small>
    </span>
  )
}
