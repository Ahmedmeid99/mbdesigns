import { createFileRoute, Link } from '@tanstack/react-router'
import type { CSSProperties } from 'react'
import { useEffect, useRef, useState } from 'react'
import { ArrowIcon } from '../components/Icon'
import { Container } from '../components/Container'
import { SectionHeading } from '../components/SectionHeading'
import { LocationsMap, locationCountryCount } from '../components/LocationsMap'
import { HomeNetwork } from '../components/HomeNetwork'

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

const sectors = [
  { name: 'ARCHITECTURE', copy: 'ENDURING BUILDINGS SHAPED BY CONTEXT, CLIMATE AND HUMAN EXPERIENCE.' },
  { name: 'CORPORATE', copy: 'HIGH-PERFORMING WORKPLACES THAT SUPPORT CULTURE, FOCUS AND COLLABORATION.' },
  { name: 'RESIDENTIAL', copy: 'PERSONAL, REFINED HOMES DESIGNED AROUND THE RHYTHMS OF DAILY LIFE.' },
  { name: 'FOOD & BEVERAGE', copy: 'MEMORABLE DINING ENVIRONMENTS WHERE BRAND, ATMOSPHERE AND OPERATIONS ALIGN.' },
  { name: 'RETAIL & COMMERCIAL', copy: 'CLEAR, DISTINCTIVE CUSTOMER JOURNEYS THAT STRENGTHEN BRAND IDENTITY.' },
  { name: 'HOSPITALITY', copy: 'CALM, WELCOMING DESTINATIONS DESIGNED AROUND COMFORT AND THE GUEST EXPERIENCE.' },
] as const

// 49 unique logo crops from the reference site's “Our Valued Partners” section,
// reordered to feature leading real estate developers and international hospitality & luxury brands first.
const partnerOrder = [
  // Real Estate Developers
  ['partner-01', 'Mountain View'],
  ['partner-04', 'Palm Hills Developments'],
  ['partner-03', 'SODIC'],
  ['partner-05', 'Al Jazi Developments'],
  ['partner-02', 'Starlight Developments'],
  ['partner-06', 'Al Ahly Sabbour Developments'],
  // International Hospitality & Luxury Brands
  ['partner-29', 'Courtyard by Marriott'],
  ['partner-27', 'ALL - Accor Live Limitless'],
  ['partner-28', 'Novotel Hotels & Resorts'],
  ['partner-23', 'Hugo Boss'],
  ['partner-16', 'Emporio Armani'],
  ['partner-09', 'Armani Exchange'],
  ['partner-07', 'Billionaire'],
  ['partner-10', 'DSquared2'],
  ['partner-12', 'Pinko'],
  ['partner-13', 'Twinset Milano'],
  ['partner-25', 'Elisabetta Franchi'],
  ['partner-24', 'Subaru'],
  ['partner-32', "Casper & Gambini's"],
  ['partner-18', 'Asfour Crystal'],
  // Premium Retail, Fitness & Corporate Brands
  ['partner-11', 'd store'],
  ['partner-26', 'EGO Your Fashion Destination'],
  ['partner-15', 'BeFit 360'],
  ['partner-14', 'The Science Gym'],
  ['partner-08', "Ravin'"],
  ['partner-20', 'Fourteen'],
  ['partner-21', 'Shoeroom'],
  ['partner-17', 'Golden N'],
  ['partner-22', 'Samir & Aly'],
  ['partner-19', 'The Grocer'],
  // Destination F&B & Dining
  ['partner-47', 'Crimson Bar and Grill'],
  ['partner-48', 'Nüwa'],
  ['partner-35', "Carlo's"],
  ['partner-34', 'One Oak'],
  ['partner-30', "Ted's"],
  ['partner-33', 'Fuego Sushi'],
  ['partner-31', 'Garnell'],
  ['partner-36', 'Tamara Elna'],
  ['partner-41', 'Beit Wared'],
  ['partner-46', 'Nişantaşı'],
  ['partner-45', 'Ozel'],
  ['partner-40', 'Abou Shakra'],
  ['partner-38', 'El Dahan'],
  ['partner-37', 'Coppermelt'],
  ['partner-43', 'Tortina'],
  ['partner-39', 'Cake Cafe'],
  ['partner-44', 'The Four Fat Ladies'],
  ['partner-42', 'Oh Betty!'],
  ['partner-49', 'Mince'],
] as const

const clientLogos = partnerOrder.map(([id, name]) => [
  `our-valued-partners-normalized/${id}`,
  name,
] as const)

const clientLogoRows = [
  clientLogos.filter((_, index) => index % 2 === 0),
  clientLogos.filter((_, index) => index % 2 === 1),
]

function HomePage() {
  const [ready, setReady] = useState(false)
  const [activeSector, setActiveSector] = useState(0)
  const pageRef = useRef<HTMLDivElement>(null)
  const heroVideoRef = useViewportVideo()
  const practiceVideoRef = useViewportVideo({ preloadAhead: true })

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
            ref={heroVideoRef}
            className="home-hero-media"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label="MB Designs architectural project film"
          >
            <source src="/assets/video/hero.mp4" type="video/mp4" />
          </video>
          <div className="home-hero-shade" />
          <div className="home-hero-content">
            <p className="home-hero-eyebrow">ARCHITECTURE · INTERIORS · CAIRO · DUBAI</p>
            <h1 id="home-hero-title" className="display-title">
              ARCHITECTURE &<br /> INTERIOR DESIGN<br /> THAT <em>INSPIRES</em>


            </h1>
            <p className="home-hero-lead">
              Award-winning environments shaped by context, precision and more than three decades of design practice.
            </p>
            <div className="home-hero-actions">
              <Link className="home-action home-action--solid" to="/projects">
                <span>EXPLORE PROJECTS</span>
                <ArrowIcon />
              </Link>
              <Link className="home-action home-action--ghost" to="/team">
                <span>MEET THE STUDIO</span>
                <ArrowIcon />
              </Link>
            </div>
          </div>
          <div className="home-hero-foot">
            <span>OVER THREE DECADES</span>
            <a href="#selected-work">SCROLL TO DISCOVER <ArrowIcon direction="down" /></a>
          </div>
        </Container>

        <Container as="section" id="selected-work" className="home-work" fluid aria-labelledby="home-work-title">
          <Container className="section-pad">
            <div className="home-work-heading">
              <SectionHeading
                id="home-work-title"
                eyebrow="01 / SELECTED WORK"
                title={<>PLACES WITH <em>PRESENCE</em></>}
                description="A cross-section of architecture and interiors designed for living, working, gathering and belonging."
                align="start"
              />
              <div className="home-work-actions">
                <Link className="home-text-link" to="/projects">
                  <span>VIEW ALL PROJECTS</span>
                  <ArrowIcon />
                </Link>
              </div>
            </div>
            <Link className="home-project-feature" to="/projects" data-reveal aria-label="Explore all MB Designs projects">
              <img
                src="/assets/images/home-work-architecture.webp"
                alt="Contemporary architecture with layered stone volumes and glazed façades"
                width="1536"
                height="1024"
                loading="lazy"
                decoding="async"
              />
              <span className="home-project-feature__shade" />
              <span className="home-project-feature__caption">
                <small>ARCHITECTURE · INTERIORS · CAIRO · DUBAI</small>
                <strong>EXPLORE THE PORTFOLIO</strong>
                <ArrowIcon />
              </span>
            </Link>
          </Container>
        </Container>

        <Container as="section" id="studio" className="home-studio section-pad" aria-labelledby="home-studio-title">
          <div className="home-studio-heading">
            <SectionHeading
              id="home-studio-title"
              eyebrow="02 / THE STUDIO"
              title={<>DESIGN WITH PURPOSE.<br />DELIVERED WITH <em>PRECISION.</em></>}
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
              src="/assets/images/home-studio-residential-empty.webp"
              alt="Residential living room with warm timber, sculptural furnishings and natural light"
              width="1674"
              height="939"
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

        <Container as="section" className="home-practice" fluid aria-labelledby="home-practice-title">
          <div className="home-practice-media">
            <video
              ref={practiceVideoRef}
              muted
              loop
              playsInline
              preload="metadata"
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
              eyebrow="03 / OUR SECTORS"
              title={<>DESIGN ACROSS <em>SCALES</em></>}
              description="Select a sector to explore how our integrated approach responds to different people, places and ambitions."
              align="start"
            />
            <div className="home-sector-explorer">
              <div className="home-sector-tabs" role="tablist" aria-label="Design sectors">
                {sectors.map((sector, index) => (
                  <button
                    type="button"
                    role="tab"
                    aria-selected={activeSector === index}
                    onMouseEnter={() => setActiveSector(index)}
                    onFocus={() => setActiveSector(index)}
                    onClick={() => setActiveSector(index)}
                    style={{ '--delay': `${index * 55}ms` } as CSSProperties}
                    key={sector.name}
                    data-reveal
                  >
                    <span>{String(index + 1).padStart(2, '0')}</span>
                    <span className="home-sector-tab-content">
                      <strong>{sector.name}</strong>
                      <span className="home-sector-tab-copy" aria-hidden={activeSector !== index}>
                        <span>{sector.copy}</span>
                      </span>
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </Container>

        <Container as="section" className="home-recognition section-pad" aria-labelledby="home-recognition-title">
          <div className="home-recognition-image" data-reveal>
            <img
              src="/assets/images/home-recognition-dining.webp"
              alt="Dining interior with layered lighting, warm timber and refined lounge seating"
              width="1254"
              height="1254"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="home-recognition-copy">
            <SectionHeading
              id="home-recognition-title"
              eyebrow="04 / RECOGNITION"
              title={<>RECOGNIZED <em>INTERNATIONALLY</em></>}
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
        <HomeNetwork partnerCount={partnerOrder.length} countryCount={locationCountryCount} />
        <Container as="section" id="selected-clients" className="home-clients" fluid aria-labelledby="home-clients-title">
          <Container className="home-clients-heading section-pad">
            <SectionHeading
              id="home-clients-title"
              eyebrow="06 / SELECTED CLIENTS"
              title={<>DESIGNING FOR LEADING <em>BRANDS</em></>}
              description="Long-term collaborations across real estate, hospitality, retail and commercial development."
              align="start"
            />
          </Container>
          <div className="home-client-marquees" data-reveal>
            {clientLogoRows.map((logos, rowIndex) => (
              <div
                className={`home-client-marquee${rowIndex === 1 ? ' is-reverse' : ''}`}
                tabIndex={0}
                aria-label={`Selected client logos row ${rowIndex + 1}`}
                key={rowIndex}
              >
                <div className="home-client-track">
                  {[0, 1].map((sequenceIndex) => (
                    <div className="home-client-sequence" aria-hidden={sequenceIndex === 1 ? true : undefined} key={sequenceIndex}>
                      {logos.map(([id, alt]) => (
                        <div className="home-client-logo" data-logo={id} key={`${rowIndex}-${sequenceIndex}-${id}`}>
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
            ))}
          </div>
        </Container>

        <LocationsMap />
      </main>
    </div>
  )
}

function useViewportVideo({ preloadAhead = false }: { preloadAhead?: boolean } = {}) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let isVisible = false

    const syncPlayback = () => {
      const shouldPlay = isVisible && !document.hidden && !reducedMotion.matches
      if (shouldPlay) {
        void video.play().catch(() => {
          // Autoplay can be denied by browser policy; keep the video paused on its current frame.
        })
      } else {
        video.pause()
      }
    }

    const playbackObserver = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting && entry.intersectionRatio >= 0.12
      syncPlayback()
    }, { threshold: [0, 0.12, 0.5] })

    playbackObserver.observe(video)
    document.addEventListener('visibilitychange', syncPlayback)
    reducedMotion.addEventListener('change', syncPlayback)

    let preloadObserver: IntersectionObserver | undefined
    if (preloadAhead) {
      preloadObserver = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return
        video.preload = 'auto'
        video.load()
        syncPlayback()
        preloadObserver?.disconnect()
      }, { rootMargin: '40% 0px' })
      preloadObserver.observe(video)
    }

    return () => {
      playbackObserver.disconnect()
      preloadObserver?.disconnect()
      document.removeEventListener('visibilitychange', syncPlayback)
      reducedMotion.removeEventListener('change', syncPlayback)
      video.pause()
    }
  }, [preloadAhead])

  return videoRef
}
