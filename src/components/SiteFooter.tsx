import { Link } from '@tanstack/react-router'
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

export function SiteFooter() {
  return (
    <footer id="contact" className="site-footer">
      <section className="site-footer-body">
        <Container>
          <header className="site-footer-brand">
            <Link className="site-footer-wordmark" to="/" aria-label="MB Designs home">
              <strong>MB <span>|</span> DESIGNS</strong>
              <small>ARCHITECTURE + INTERIOR DESIGN STUDIO</small>
            </Link>
            <p>Thoughtful spaces shaped by context, craft and the people who use them.</p>
          </header>

          <div className="site-footer-directory">
            <address>
              <small>01 / EGYPT OFFICE</small>
              <strong>CAIRO</strong>
              <span>9 Salah Eldin Fadel Street<br />Heliopolis, Cairo, Egypt</span>
              <a href="tel:+201003003797">+20 100 300 3797</a>
              <a href="tel:+20221811013">+20 2 2181 1013</a>
            </address>
            <address>
              <small>02 / UAE OFFICE</small>
              <strong>DUBAI</strong>
              <span>IFZA Business Park, DDP Building A1<br />Dubai Silicon Oasis, UAE</span>
              <a href="tel:+971502551477">+971 50 255 1477</a>
            </address>
            <div className="site-footer-new-business">
              <small>03 / NEW BUSINESS</small>
              <strong>LET’S TALK</strong>
              <span>Projects, collaborations, careers and press enquiries.</span>
              <a href="mailto:info@mbdesigns.design">INFO@MBDESIGNS.DESIGN</a>
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
            <a href="#top">BACK TO TOP <ArrowIcon direction="up" /></a>
          </div>
        </Container>
      </section>
    </footer>
  )
}
