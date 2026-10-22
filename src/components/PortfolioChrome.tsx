import { useState } from 'react'

type PortfolioPage = 'projects' | 'team'

export function PortfolioHeader({ current = 'projects', className = '' }: { current?: PortfolioPage; className?: string }) {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className={`site-header projects-header ${className}`.trim()}>
      <nav className="desktop-nav" aria-label="Primary navigation">
        <a href="/about">ABOUT</a>
        <a href="/awards">AWARDS</a>
        <a className={current === 'projects' ? 'is-current' : undefined} href="/projects">PROJECTS</a>
        <a href="/" className="brand" aria-label="MB Designs home">
          <span className="wordmark" aria-hidden="true">
            <b>MB | DESIGNS</b>
            <small>ARCHITECTURE &amp; INTERIOR DESIGN STUDIO</small>
          </span>
        </a>
        <a className={current === 'team' ? 'is-current' : undefined} href="/team">TEAM</a>
        <a href="/#awards">EVENTS/PRESS</a>
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
        <a href="/#awards" onClick={() => setMenuOpen(false)}>EVENTS/PRESS</a>
        <a href="#contact" onClick={() => setMenuOpen(false)}>CAREER</a>
      </div>
    </header>
  )
}

export function PortfolioFooter({ reveal = true }: { reveal?: boolean }) {
  return (
    <footer id="contact" className="footer projects-footer">
      <img src="/assets/images/contact.webp" alt="MB Designs landscape visualization" width="1600" height="608" loading="lazy" decoding="async" />
      <div className="footer-shade" />
      <div className="footer-content" {...(reveal ? { 'data-reveal': '' } : {})}>
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
  )
}
