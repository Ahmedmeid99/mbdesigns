import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { Container } from '../components/Container'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const partnerLogos = [
  ['3b4e6777a0647590', 'Palm Hills Developments'],
  ['a244ee3790d7910d', 'SODIC'],
  ['8e4f93d539550a8a', 'Tatweer Misr'],
  ['d1a6577d69ebd454', 'Marakez'],
  ['22df8de71dee97fd', 'Pinko'],
  ['c78f3991e2b90752', 'Commercial partner'],
  ['2550bd4224eb62d4', 'Real estate partner'],
  ['3a965e4df698a4a3', 'Retail partner'],
  ['e97a6c6713d3eb28', 'Hospitality partner'],
  ['af05a4481afd8b74', 'Valentino'],
  ['538bb5dd411be0e1', 'Retail partner'],
  ['2938c3574ba2aebe', 'Commercial partner'],
  ['20af07b07db56cf2', 'Fashion partner'],
  ['4ff1a755e5a7ab9e', 'Hospitality partner'],
  ['7804445959065e27', 'Retail partner'],
  ['6d4b5d12526e8392', 'Hugo Boss'],
  ['f83ac1d5c2a93a53', 'Commercial partner'],
  ['7ab3e2dd957424c5', 'Hospitality partner'],
  ['70856edca403ccbe', 'Hotel partner'],
  ['f4402aa139140d81', 'Food and beverage partner'],
  ['18f4e5a174db548d', 'Hospitality partner'],
  ['ef0a159464d1e2ee', 'Food and beverage partner'],
] as const

const awards = [
  {
    number: '01',
    name: 'EASTOWN DUPLEX',
    category: 'RESIDENTIAL PROPERTY INTERIOR – PRIVATE RESIDENCE',
    image: '/assets/images/award-eastown.webp',
  },
  {
    number: '02',
    name: 'NUWA BY MORI CO',
    category: 'LEISURE INTERIOR CONCEPT',
    image: '/assets/images/award-nuwa.webp',
  },
] as const

const luxuryAwards = [
  {
    number: '01',
    name: 'GRAND RESIDENCE VILLA',
    category: 'BEST LUXURY RESIDENTIAL INTERIOR DESIGN IN EGYPT',
    image: '/assets/images/award-villa.webp',
  },
  {
    number: '02',
    name: 'BEST LUXURY STUDIO IN EGYPT',
    category: 'BEST LUXURY INTERIOR DESIGN STUDIO IN EGYPT',
    image: '/assets/images/award-studio.webp',
  },
] as const

function HomePage() {
  const [introDone, setIntroDone] = useState(false)
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => setIntroDone(true), 900)
    const root = pageRef.current
    if (!root) return () => window.clearTimeout(timer)

    const items = root.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.1 },
    )
    items.forEach((item) => observer.observe(item))

    return () => {
      window.clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  return (
    <div ref={pageRef} className={introDone ? 'site is-ready' : 'site'}>
      <div className="intro-curtain" aria-hidden="true">
        <span>MB</span>
      </div>

      <main>
        <Container as="section" id="top" className="hero" fluid>
          <video
            className="hero-video"
            poster="/assets/images/hero.webp"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="MB Designs architectural project film"
          >
            <source src="/assets/video/hero.mp4" type="video/mp4" />
          </video>
          <div className="hero-shade" />
          <h1 className="hero-title">
            ARCHITECTURE &amp; INTERIOR DESIGN THAT
            <br />
            INSPIRES
          </h1>
          <div className="hero-locations">
            <span>CAIRO, EGYPT</span>
            <span>DUBAI, UAE</span>
          </div>
          <a className="scroll-cue" href="#about" aria-label="Scroll to introduction">
            <span>SCROLL</span>
            <i />
          </a>
        </Container>
        <Container as="section" id="statement" className="statement">
          <h2 data-reveal>
            WE REDEFINE TIMELESS
            <br />
            ARCHITECTURE &amp; INTERIOR DESIGN
          </h2>
        </Container>
        <Container as="section" id="about" className="home-crafting">
          <div className="home-crafting-copy" data-reveal>
            <h2>CRAFTING<br />TIMELESS SPACES</h2>
            <p>ARCHITECTURE &amp; INTERIOR DESIGN THAT INSPIRES</p>
          </div>
          <img
            src="/assets/images/about-tall.webp"
            alt="Contemporary courtyard designed by MB Designs"
            width="1266"
            height="1280"
            loading="lazy"
            decoding="async"
            data-reveal
          />
        </Container>

        <Container as="section" className="home-about-detail">
          <img
            src="/assets/images/about-wide.webp"
            alt="MB Designs architecture in warm evening light"
            width="1360"
            height="768"
            loading="lazy"
            decoding="async"
            data-reveal
          />
          <div className="home-about-copy" data-reveal>
            <h3>
              DRIVEN BY OVER THREE DECADES OF DESIGN EXCELLENCE, MB DESIGNS CREATES AWARD-WINNING ARCHITECTURE AND INTERIOR ENVIRONMENTS THAT SEAMLESSLY BLEND INNOVATION, FUNCTIONALITY, AND TIMELESS AESTHETICS.
            </h3>
            <p>
              WITH EXPERTISE ACROSS CORPORATE, HOSPITALITY, RETAIL, AND RESIDENTIAL SECTORS, WE DESIGN SPACES THAT INSPIRE, PERFORM, AND ENDURE. GUIDED BY CREATIVITY, TECHNICAL PRECISION, AND METICULOUS ATTENTION TO DETAIL, EVERY PROJECT IS CRAFTED TO REFLECT ITS PURPOSE WHILE LEAVING A LASTING IMPRESSION.
            </p>
            <a className="pill" href="/about">EXPLORE</a>
          </div>
        </Container>

        <Container as="section" className="partners section-pad" aria-labelledby="partners-title">
          <p className="eyebrow" data-reveal>OUR VALUED PARTNERS</p>
          <h2 id="partners-title" data-reveal>SERVING INDUSTRY PARTNERS</h2>
          <div className="partner-row" data-reveal>
            <span>REAL ESTATE DEVELOPERS</span>
            <div className="logo-marquee">
              <div className="logo-track">
                {[...partnerLogos.slice(0, 11), ...partnerLogos.slice(0, 11)].map(([id, alt], index) => (
                  <div className="logo-cell" key={`${id}-${index}`}>
                    <img src={`/assets/partners/${id}.webp`} alt={alt} width="180" height="86" loading="lazy" decoding="async" />
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="partner-row reverse" data-reveal>
            <span>RETAIL &amp; COMMERCIAL</span>
            <div className="logo-marquee">
              <div className="logo-track">
                {[...partnerLogos.slice(11), ...partnerLogos.slice(11)].map(([id, alt], index) => (
                  <div className="logo-cell" key={`${id}-${index}`}>
                    <img src={`/assets/partners/${id}.webp`} alt={alt} width="180" height="86" loading="lazy" decoding="async" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Container>

        <Container as="section" id="projects" className="manifesto">
          <video autoPlay muted loop playsInline preload="none" poster="/assets/images/hero.webp" aria-label="MB Designs project showcase">
            <source src="/assets/video/manifesto.mp4" type="video/mp4" />
          </video>
          <div className="manifesto-wash" />
          <h2 data-reveal>
            DRIVEN BY CREATIVITY
            <br />
            DEFINED BY CRAFTSMANSHIP
            <br />
            DESIGNED TO INSPIRE
          </h2>
        </Container>

        <Container as="section" id="studio" className="services section-pad">
          <div className="services-word" aria-hidden="true">WE</div>
          <div className="services-content" data-reveal>
            <p>WE COVER</p>
            <ul>
              <li>ARCHITECTURE</li>
              <li>INTERIOR</li>
              <li>SOFT/HARD LANDSCAPING</li>
              <li>COST MANAGEMENT</li>
              <li>PROJECT MANAGEMENT</li>
              <li>SITE SUPERVISION</li>
            </ul>
          </div>
        </Container>

        <Container as="section" className="territories section-pad" aria-labelledby="territories-title">
          <h2 id="territories-title" data-reveal>WHERE WE DESIGN</h2>
          <div className="territory-grid">
            {[
              ['EGYPT', '/assets/video/egypt.mp4'],
              ['UAE', '/assets/video/dubai.mp4'],
              ['SAUDI ARABIA', '/assets/video/riyadh.mp4'],
            ].map(([name, src], index) => (
              <article className="territory-card" data-reveal key={name} style={{ '--delay': `${index * 90}ms` } as React.CSSProperties}>
                <video autoPlay muted loop playsInline preload="none" aria-label={`${name} project locations`}>
                  <source src={src} type="video/mp4" />
                </video>
                <div />
                <h3>{name}</h3>
              </article>
            ))}
          </div>
        </Container>

        <Container as="section" id="awards" className="home-awards-hero" fluid>
          <img
            src="/assets/images/awards-hero.webp"
            alt="Abstract amber light introducing the international awards"
            width="1920"
            height="1080"
            loading="lazy"
            decoding="async"
          />
          <div className="home-awards-hero-shade" />
          <h2 data-reveal>INTERNATIONAL AWARDS</h2>
        </Container>

        <Container as="section" className="awards section-pad">
          <div className="awards-heading awards-heading--property" data-reveal>
            <AwardMarks variant="property" />
            <h2>THE ARABIAN-AFRICAN INTERNATIONAL</h2>
            <p>PROPERTY AWARDS 2020–2021</p>
          </div>
          <div className="award-grid">
            {awards.map((award, index) => <AwardCard key={award.name} award={award} delay={index * 100} />)}
          </div>
          <a className="pill awards-pill" href="/awards">EXPLORE</a>

          <div className="awards-heading awards-heading--luxury" data-reveal>
            <AwardMarks variant="luxury" />
            <h2>LUXURY LIFESTYLE AWARDS</h2>
            <p>2021–2022</p>
          </div>
          <div className="award-grid">
            {luxuryAwards.map((award, index) => <AwardCard key={award.name} award={award} delay={index * 100} />)}
          </div>
          <a className="pill awards-pill awards-pill--last" href="/awards">EXPLORE</a>
        </Container>
      </main>
    </div>
  )
}

function AwardCard({
  award,
  delay,
}: {
  award: { readonly number: string; readonly name: string; readonly category: string; readonly image: string }
  delay: number
}) {
  return (
    <article className="award-card" data-reveal style={{ '--delay': `${delay}ms` } as React.CSSProperties}>
      <div className="award-title">
        <span>{award.number}</span>
        <h3>{award.name}</h3>
      </div>
      <p>{award.category}</p>
      <div className={award.name === 'EASTOWN DUPLEX' ? 'award-image award-image--eastown' : 'award-image'}>
        <img src={award.image} alt={award.name} width="478" height="303" loading="lazy" decoding="async" />
      </div>
    </article>
  )
}

function AwardMarks({ variant }: { variant: 'property' | 'luxury' }) {
  if (variant === 'property') {
    return (
      <div className="property-marks" aria-label="Arabian Property Awards award winner 2020–2021">
        {[0, 1].map((mark) => (
          <div className="property-mark" aria-hidden="true" key={mark}>
            <span className="property-mark-crest">♜</span>
            <b>ARABIAN<br />PROPERTY<br />AWARDS</b>
            <strong>AWARD<br />WINNER</strong>
            <small>2020–2021</small>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="luxury-marks" aria-label="Luxury Lifestyle Awards winners 2021 and 2022">
      {['2021', '2022'].map((year) => (
        <div className="luxury-mark" aria-hidden="true" key={year}>
          <em>Luxury</em>
          <span />
          <b>WINNER<br />{year}</b>
        </div>
      ))}
    </div>
  )
}
