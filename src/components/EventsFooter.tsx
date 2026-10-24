import { Link } from '@tanstack/react-router'

const footerImage = '/assets/images/events/beb217_c8d6b2aff1e04d3aaefbe1525d64f982.webp'
const footerLogo = '/assets/images/events/beb217_7045e1c98fe7473e9c71b4cf8a4e6050.webp'

export function EventsFooter() {
  return (
    <footer id="contact" className="events-footer">
      <div className="events-footer-visual">
        <img src={footerImage} alt="MB Designs studio interior" width="1700" height="950" loading="lazy" decoding="async" />
        <div className="events-footer-shade" />
        <div className="events-footer-cta" data-reveal>
          <div className="events-footer-kicker">
            <span>START A CONVERSATION</span>
            <span>CAIRO · DUBAI</span>
          </div>
          <h2>LET’S CREATE<br />SOMETHING<br /><em>TIMELESS.</em></h2>
          <a className="events-footer-mail" href="mailto:info@mbdesigns.design">
            <span>START A PROJECT</span><i>↗</i>
          </a>
        </div>
      </div>

      <div className="events-footer-info">
        <div className="events-footer-brand">
          <img src={footerLogo} alt="MB Designs" width="600" height="180" loading="lazy" decoding="async" />
          <p>ARCHITECTURE &amp; INTERIOR DESIGN STUDIO</p>
        </div>

        <div className="events-footer-offices">
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
          <div className="events-footer-new-business">
            <small>03 / NEW BUSINESS</small>
            <strong>LET’S TALK</strong>
            <span>For projects, collaborations<br />and press enquiries.</span>
            <a href="mailto:info@mbdesigns.design">INFO@MBDESIGNS.DESIGN</a>
          </div>
        </div>

        <nav className="events-footer-links" aria-label="Footer navigation">
          <Link to="/">HOME</Link>
          <Link to="/about">ABOUT</Link>
          <Link to="/awards">AWARDS</Link>
          <Link to="/projects">PROJECTS</Link>
          <Link to="/team">TEAM</Link>
          <Link to="/events-press">EVENTS / PRESS</Link>
          <Link to="/career">CAREER</Link>
        </nav>

        <div className="events-footer-bottom">
          <span>© {new Date().getFullYear()} MB DESIGNS. ALL RIGHTS RESERVED.</span>
          <span>ARCHITECTURE · INTERIOR · PROJECT MANAGEMENT</span>
          <a href="#top">BACK TO TOP <i>↑</i></a>
        </div>
      </div>
    </footer>
  )
}
