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

const services = [
  'ARCHITECTURE',
  'INTERIOR DESIGN',
  'LANDSCAPE DESIGN',
  'COST MANAGEMENT',
  'PROJECT MANAGEMENT',
  'SITE SUPERVISION',
] as const

// 49 unique logo crops from the reference site's “Our Valued Partners” section.
// The source repeats one crop exactly, so it is intentionally stored only once here.
const clientLogos = Array.from({ length: 49 }, (_, index) => [
  `our-valued-partners-normalized/partner-${String(index + 1).padStart(2, '0')}`,
  '',
] as const)

const clientLogoRows = [
  clientLogos.filter((_, index) => index % 2 === 0),
  clientLogos.filter((_, index) => index % 2 === 1),
]

function HomePage() {
  const [ready, setReady] = useState(false)
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
            poster="/assets/images/hero.webp"
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
            </div>
          </div>
          <Link className="home-project-feature" to="/projects" data-reveal aria-label="Explore all MB Designs projects">
            <img
              src="/assets/images/projects-hero.webp"
              alt="Contemporary architecture by MB Designs"
              width="1920"
              height="1116"
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

        <Container as="section" className="home-practice" fluid aria-labelledby="home-practice-title">
          <div className="home-practice-media">
            <video
              ref={practiceVideoRef}
              muted
              loop
              playsInline
              preload="metadata"
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
          // Autoplay can be denied by browser policy; the poster remains visible.
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
