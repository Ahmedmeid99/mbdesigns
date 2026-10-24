import { Link } from '@tanstack/react-router'
import { Container } from './Container'

const footerImage = '/assets/images/events/beb217_c8d6b2aff1e04d3aaefbe1525d64f982.webp'
const footerLogo = '/assets/images/events/beb217_7045e1c98fe7473e9c71b4cf8a4e6050.webp'

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
      <section className="site-footer-hero" aria-labelledby="site-footer-title">
        <img src={footerImage} alt="MB Designs studio interior" width="1700" height="950" loading="lazy" decoding="async" />
        <div className="site-footer-shade" />
        <Container className="site-footer-hero-inner">
          <div className="site-footer-eyebrow">
            <span>START A CONVERSATION</span>
            <span>CAIRO · DUBAI</span>
          </div>
          <div className="site-footer-callout">
            <h2 id="site-footer-title">LET’S TURN<br />IDEAS INTO<br /><em>PLACES.</em></h2>
            <a className="site-footer-project" href="mailto:info@mbdesigns.design">
              <span>START A PROJECT</span>
              <i aria-hidden="true">↗</i>
            </a>
          </div>
        </Container>
      </section>

      <section className="site-footer-body">
        <Container>
          <header className="site-footer-brand">
            <img src={footerLogo} alt="MB Designs" width="600" height="180" loading="lazy" decoding="async" />
            <p>ARCHITECTURE · INTERIOR DESIGN · PROJECT MANAGEMENT</p>
          </header>

          <div className="site-footer-directory">
            <div className="site-footer-intro">
              <small>BUILDING TIMELESS EXPERIENCES</small>
              <p>Thoughtful spaces shaped by context, craft and the people who use them.</p>
            </div>
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
              <span>Projects, collaborations and press enquiries.</span>
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
            <a href="#top">BACK TO TOP <i aria-hidden="true">↑</i></a>
          </div>
        </Container>
      </section>
    </footer>
  )
}
