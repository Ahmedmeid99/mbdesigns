import { createFileRoute, Link } from '@tanstack/react-router'
import type { CSSProperties } from 'react'
import { useEffect, useRef, useState } from 'react'
import { ArrowIcon } from '../components/Icon'
import { Container } from '../components/Container'
import { SectionHeading } from '../components/SectionHeading'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'MB Designs | Architecture & Interior Design' },
      {
        name: 'description',
        content: 'MB Designs creates enduring architecture and interior environments across residential, corporate, retail and hospitality sectors.',
      },
    ],
  }),
  component: HomePage,
})

const featuredProjects = [
  {
    number: '01',
    name: 'COMMERCIAL COMPLEX',
    discipline: 'ARCHITECTURE',
    image: '/assets/images/architecture-commercial.webp',
    href: '/projects/architecture/commercial-complex',
    size: 'feature',
  },
  {
    number: '02',
    name: 'ARCADE',
    discipline: 'CORPORATE',
    image: '/assets/images/corporate-02.webp',
    href: '/projects/corporate/arcade',
    size: 'portrait',
  },
  {
    number: '03',
    name: 'GRAND RESIDENCE',
    discipline: 'RESIDENTIAL',
    image: '/assets/images/residential-05.webp',
    href: '/projects/residential/grand-residence',
    size: 'portrait',
  },
  {
    number: '04',
    name: 'NUWA',
    discipline: 'FOOD & BEVERAGE',
    image: '/assets/images/fnb-05.webp',
    href: '/projects/food-and-beverage/nuwa',
    size: 'wide',
  },
  {
    number: '05',
    name: 'PINKO',
    discipline: 'RETAIL & COMMERCIAL',
    image: '/assets/images/retail-04.webp',
    href: '/projects/retail-and-commercial/pinko',
    size: 'portrait',
  },
  {
    number: '06',
    name: 'COURTYARD BY MARRIOTT',
    discipline: 'HOSPITALITY',
    image: '/assets/images/hospitality-02.webp',
    href: '/projects/hospitality/courtyard-by-marriott',
    size: 'wide',
  },
] as const

const services = [
  'ARCHITECTURE',
  'INTERIOR DESIGN',
  'LANDSCAPE DESIGN',
  'COST MANAGEMENT',
  'PROJECT MANAGEMENT',
  'SITE SUPERVISION',
] as const

const clientLogos = [
  ['18f4e5a174db548d', ''],
  ['20af07b07db56cf2', ''],
  ['22df8de71dee97fd', ''],
  ['2550bd4224eb62d4', ''],
  ['2938c3574ba2aebe', ''],
  ['3b4e6777a0647590', 'Palm Hills Developments'],
  ['4ff1a755e5a7ab9e', ''],
  ['538bb5dd411be0e1', ''],
  ['6d4b5d12526e8392', 'Hugo Boss'],
  ['70856edca403ccbe', ''],
  ['7804445959065e27', ''],
  ['8e4f93d539550a8a', 'Al Jazi Gardens'],
  ['a244ee3790d7910d', 'SODIC'],
  ['af05a4481afd8b74', 'Asfour Crystal'],
  ['c78f3991e2b90752', ''],
  ['d1a6577d69ebd454', 'Billionaire'],
  ['e97a6c6713d3eb28', ''],
  ['ef0a159464d1e2ee', ''],
  ['f4402aa139140d81', ''],
  ['f83ac1d5c2a93a53', ''],
] as const

function HomePage() {
  const [ready, setReady] = useState(false)
  const pageRef = useRef<HTMLDivElement>(null)
  const workTrackRef = useRef<HTMLDivElement>(null)

  const moveWorkSlider = (direction: -1 | 1) => {
    const track = workTrackRef.current
    if (!track) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    track.scrollBy({
      left: direction * Math.max(280, track.clientWidth * 0.78),
      behavior: reduceMotion ? 'auto' : 'smooth',
    })
  }

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 80)
    const root = pageRef.current
    if (!root) return () => window.clearTimeout(timer)

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })

    root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((item) => observer.observe(item))

    return () => {
      window.clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  return (
    <div ref={pageRef} className={ready ? 'site home-site is-ready' : 'site home-site'}>
      <main>
        <Container as="section" id="top" className="home-hero" fluid aria-labelledby="home-hero-title">
          <video
            className="home-hero-media"
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
          <div className="home-hero-shade" />
          <div className="home-hero-content">
            <p className="home-hero-eyebrow">ARCHITECTURE · INTERIORS · CAIRO · DUBAI</p>
            <h1 id="home-hero-title" className="display-title">
              DESIGNING SPACES
              <br />
              THAT <em>ENDURE.</em>
            </h1>
            <p className="home-hero-lead">
              Award-winning environments shaped by context, precision and more than three decades of design practice.
            </p>
            <div className="home-hero-actions">
              <Link className="home-action home-action--solid" to="/projects">
                <span>EXPLORE PROJECTS</span>
                <ArrowIcon />
              </Link>
              <Link className="home-action home-action--ghost" to="/about">
                <span>MEET THE STUDIO</span>
                <ArrowIcon />
              </Link>
            </div>
          </div>
          <div className="home-hero-foot">
            <span>OVER THREE DECADES</span>
            <a href="#studio">SCROLL TO DISCOVER <ArrowIcon direction="down" /></a>
          </div>
        </Container>

        <Container as="section" id="studio" className="home-studio section-pad" aria-labelledby="home-studio-title">
          <div className="home-studio-heading">
            <SectionHeading
              id="home-studio-title"
              eyebrow="01 / THE STUDIO"
              title={<>DESIGN WITH PURPOSE.<br />DELIVERED WITH PRECISION.</>}
              description="We unite architecture, interiors and delivery under one practice—creating places that feel distinctive, function beautifully and last."
              align="start"
            />
            <Link className="home-text-link" to="/about">
              <span>ABOUT MB DESIGNS</span>
              <ArrowIcon />
            </Link>
          </div>
          <div className="home-studio-visual" data-reveal>
            <img
              src="/assets/images/about-wide.webp"
              alt="MB Designs architecture in warm evening light"
              width="1360"
              height="768"
              loading="eager"
              decoding="async"
            />
          </div>
          <dl className="home-studio-facts" data-reveal>
            <div>
              <dt>30+</dt>
              <dd>YEARS OF DESIGN PRACTICE</dd>
            </div>
            <div>
              <dt>02</dt>
              <dd>STUDIOS · CAIRO + DUBAI</dd>
            </div>
            <div>
              <dt>06</dt>
              <dd>INTEGRATED DISCIPLINES</dd>
            </div>
          </dl>
        </Container>

        <Container as="section" id="selected-work" className="home-work section-pad" aria-labelledby="home-work-title">
          <div className="home-work-heading">
            <SectionHeading
              id="home-work-title"
              eyebrow="02 / SELECTED WORK"
              title="PLACES WITH PRESENCE"
              description="A cross-section of architecture and interiors designed for living, working, gathering and belonging."
              align="start"
            />
            <div className="home-work-actions">
              <Link className="home-text-link" to="/projects">
                <span>VIEW ALL PROJECTS</span>
                <ArrowIcon />
              </Link>
              <div className="home-slider-controls" aria-label="Selected work controls">
                <button type="button" aria-label="Previous projects" onClick={() => moveWorkSlider(-1)}>
                  <ArrowIcon direction="left" />
                </button>
                <button type="button" aria-label="Next projects" onClick={() => moveWorkSlider(1)}>
                  <ArrowIcon direction="right" />
                </button>
              </div>
            </div>
          </div>
          <div
            ref={workTrackRef}
            className="home-project-track"
            role="region"
            aria-label="Selected work carousel"
            tabIndex={0}
          >
            {featuredProjects.map((project, index) => (
              <a
                className={`home-project-card home-project-card--${project.size}`}
                href={project.href}
                aria-labelledby={`home-project-${index}`}
                data-reveal
                style={{ '--delay': `${(index % 2) * 90}ms` } as CSSProperties}
                key={project.name}
              >
                <div className="home-project-image">
                  <img
                    src={project.image}
                    alt={`${project.name} by MB Designs`}
                    width="1360"
                    height="1020"
                    loading={index === 0 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </div>
                <div className="home-project-meta">
                  <span>{project.number} / {project.discipline}</span>
                  <h3 id={`home-project-${index}`}>{project.name}</h3>
                  <ArrowIcon />
                </div>
              </a>
            ))}
          </div>
        </Container>

        <Container as="section" className="home-practice" fluid aria-labelledby="home-practice-title">
          <div className="home-practice-media">
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="none"
              poster="/assets/images/about-tall.webp"
              aria-label="MB Designs project environments"
            >
              <source src="/assets/video/manifesto.mp4" type="video/mp4" />
            </video>
            <div />
            <p>FROM FIRST LINE<br />TO FINAL DETAIL.</p>
          </div>
          <div className="home-practice-copy section-pad">
            <SectionHeading
              id="home-practice-title"
              eyebrow="03 / OUR PRACTICE"
              title="ONE INTEGRATED TEAM"
              description="Creative vision and technical delivery work together from concept through completion."
              align="start"
            />
            <ol className="home-service-list">
              {services.map((service, index) => (
                <li data-reveal style={{ '--delay': `${index * 55}ms` } as CSSProperties} key={service}>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{service}</strong>
                </li>
              ))}
            </ol>
          </div>
        </Container>

        <Container as="section" id="selected-clients" className="home-clients" fluid aria-labelledby="home-clients-title">
          <Container className="home-clients-heading section-pad">
            <SectionHeading
              id="home-clients-title"
              eyebrow="04 / SELECTED CLIENTS"
              title="DESIGNING FOR LEADING BRANDS"
              description="Long-term collaborations across real estate, hospitality, retail and commercial development."
              align="start"
            />
          </Container>
          <div className="home-client-marquee" data-reveal tabIndex={0} aria-label="Selected client logos">
            <div className="home-client-track">
              {[0, 1].map((sequenceIndex) => (
                <div className="home-client-sequence" aria-hidden={sequenceIndex === 1 ? true : undefined} key={sequenceIndex}>
                  {clientLogos.map(([id, alt]) => (
                    <div className="home-client-logo" key={`${sequenceIndex}-${id}`}>
                      <img
                        src={`/assets/partners/${id}.webp`}
                        alt={sequenceIndex === 0 ? alt : ''}
                        width="180"
                        height="86"
                        loading="eager"
                        decoding="async"
                      />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </Container>

        <Container as="section" className="home-recognition section-pad" aria-labelledby="home-recognition-title">
          <div className="home-recognition-image" data-reveal>
            <img
              src="/assets/images/awards-purpose.webp"
              alt="Architectural form in warm evening light"
              width="768"
              height="1365"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="home-recognition-copy">
            <SectionHeading
              id="home-recognition-title"
              eyebrow="05 / RECOGNITION"
              title="RECOGNIZED INTERNATIONALLY"
              description="Awarded for residential, leisure and studio excellence—while remaining focused on the people and purpose behind every project."
              align="start"
            />
            <div className="home-award-summary" data-reveal>
              <div>
                <span>2020–2021</span>
                <strong>ARABIAN-AFRICAN<br />PROPERTY AWARDS</strong>
              </div>
              <div>
                <span>2021–2022</span>
                <strong>LUXURY LIFESTYLE<br />AWARDS</strong>
              </div>
            </div>
            <Link className="home-text-link" to="/awards">
              <span>EXPLORE OUR AWARDS</span>
              <ArrowIcon />
            </Link>
          </div>
        </Container>
      </main>
    </div>
  )
}
