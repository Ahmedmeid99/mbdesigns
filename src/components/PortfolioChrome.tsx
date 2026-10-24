import { useState } from 'react'

type PortfolioPage = 'projects' | 'team' | 'events' | 'career'

export function PortfolioHeader({ current = 'projects', className = '', logoImage }: { current?: PortfolioPage; className?: string; logoImage?: string }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className={`site-header projects-header ${className}`.trim()}>
      <nav className="desktop-nav" aria-label="Primary navigation">
        <a href="/about">ABOUT</a>
        <a href="/awards">AWARDS</a>
        <a className={current === 'projects' ? 'is-current' : undefined} href="/projects">PROJECTS</a>
        <a href="/" className="brand" aria-label="MB Designs home">
          {logoImage ? <img className="nav-logo-image" src={logoImage} alt="" aria-hidden="true" /> : (
            <span className="wordmark" aria-hidden="true">
              <b>MB | DESIGNS</b>
              <small>ARCHITECTURE &amp; INTERIOR DESIGN STUDIO</small>
            </span>
          )}
        </a>
        <a className={current === 'team' ? 'is-current' : undefined} href="/team">TEAM</a>
        <a className={current === 'events' ? 'is-current' : undefined} href="/events-press">EVENTS/PRESS</a>
        <a className={current === 'career' ? 'is-current' : undefined} href="/career">CAREER</a>
      </nav>
      <a href="/" className="mobile-brand" aria-label="MB Designs home">
        {logoImage ? <img className="nav-logo-image" src={logoImage} alt="" aria-hidden="true" /> : (
          <span className="wordmark" aria-hidden="true">
            <b>MB | DESIGNS</b>
            <small>ARCHITECTURE &amp; INTERIOR DESIGN STUDIO</small>
          </span>
        )}
      </a>
      <button
        className="menu-toggle"
        type="button"
        aria-expanded={menuOpen}
        aria-controls="projects-mobile-menu"
        onClick={() => setMenuOpen((value) => !value)}
      >
        {menuOpen ? 'CLOSE' : 'MENU'}
      </button>
      <div id="projects-mobile-menu" className={menuOpen ? 'mobile-menu is-open' : 'mobile-menu'}>
        <a href="/about" onClick={() => setMenuOpen(false)}>ABOUT</a>
        <a href="/awards" onClick={() => setMenuOpen(false)}>AWARDS</a>
        <a href="/projects" onClick={() => setMenuOpen(false)}>PROJECTS</a>
        <a href="/team" onClick={() => setMenuOpen(false)}>TEAM</a>
        <a href="/events-press" onClick={() => setMenuOpen(false)}>EVENTS/PRESS</a>
        <a href="/career" onClick={() => setMenuOpen(false)}>CAREER</a>
      </div>
    </header>
  )
}
