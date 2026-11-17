import { Container } from './Container'
import { ArrowIcon } from './Icon'
import './HomeNetwork.css'

export function HomeNetwork() {
  return (
    <Container as="section" id="our-network" className="home-network" fluid aria-labelledby="home-network-title">
      <img className="home-network__image" src="/assets/images/home-network-background.webp" alt="" width="1669" height="942" loading="lazy" decoding="async" />
      <div className="home-network__shade" />
      <Container className="home-network__content section-pad">
        <p className="home-network__eyebrow">05 / PEOPLE, PARTNERS & PLACES</p>
        <h2 id="home-network-title">
          <span>VALUED PARTNERS</span>
        </h2>
        <div className="home-network__footer">
          <div className="home-network__intro">
            <p>we shape living spaces, redefine work environments, and create distinctive hospitality experiences. From inspiring retail destinations and memorable dining spaces to timeless architectural landmarks, every project reflects our commitment to thoughtful design, functionality, and lasting impact.</p>
            <a href="#selected-clients">MEET OUR PARTNERS <ArrowIcon /></a>
          </div>
        </div>
      </Container>
    </Container>
  )
}
