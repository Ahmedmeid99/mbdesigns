import { Container } from './Container'
import { ArrowIcon } from './Icon'
import './HomeNetwork.css'

export function HomeNetwork({ partnerCount, countryCount }: { partnerCount: number; countryCount: number }) {
  return (
    <Container as="section" id="our-network" className="home-network" fluid aria-labelledby="home-network-title">
      <img className="home-network__image" src="/assets/images/home-network-background.webp" alt="" width="1669" height="942" loading="lazy" decoding="async" />
      <div className="home-network__shade" />
      <Container className="home-network__content section-pad">
        <p className="home-network__eyebrow">05 / PEOPLE, PARTNERS & PLACES</p>
        <h2 id="home-network-title">
          <span className="home-network__number">{partnerCount}</span>
          <span>VALUED PARTNERS</span>
        </h2>
        <div className="home-network__footer">
          <div className="home-network__intro">
            <p>From Mountain View and SODIC to Marriott and Armani, our work brings together ambitious brands, distinctive places and a shared belief in thoughtful design.</p>
            <a href="#selected-clients">MEET OUR PARTNERS <ArrowIcon /></a>
          </div>
          <a className="home-network__stat" href="#markets">
            <strong>{String(countryCount).padStart(2, '0')}</strong>
            <span>COUNTRIES ON OUR MAP<small>EXPLORE THE LOCATIONS</small></span>
            <ArrowIcon />
          </a>
          <a className="home-network__stat" href="#markets">
            <strong>03</strong>
            <span>REGIONS<small>MIDDLE EAST · AFRICA · EUROPE</small></span>
            <ArrowIcon />
          </a>
        </div>
      </Container>
    </Container>
  )
}
