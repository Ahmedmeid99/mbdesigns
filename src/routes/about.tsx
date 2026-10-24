import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { Container } from '../components/Container'
import { SectionHeading } from '../components/SectionHeading'

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      { title: 'About | MB Designs' },
      {
        name: 'description',
        content: 'The story, philosophy, mission and vision behind MB Designs.',
      },
    ],
    links: [
      { rel: 'preload', as: 'image', href: '/assets/images/about-founder.webp' },
    ],
  }),
  component: AboutPage,
})

function AboutPage() {
  const [ready, setReady] = useState(false)
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 100)
    const root = pageRef.current
    if (!root) return () => window.clearTimeout(timer)

    const items = root.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )
    items.forEach((item) => observer.observe(item))

    return () => {
      window.clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  return (
    <div ref={pageRef} className={ready ? 'about-site is-ready' : 'about-site'}>
      <main>
        <Container as="section" className="about-hero" id="top" fluid>
          <img
            className="about-founder"
            src="/assets/images/about-founder.webp"
            alt="Mohamed Badr, founder of MB Designs"
            width="1133"
            height="1388"
            fetchPriority="high"
          />
          <div className="about-hero-copy">
            <h1 className="display-title">THE VISION<br />BEHIND EVERY PROJECT</h1>
            <p>
              MOHAMED BADR IS RENOWNED FOR HIS INNOVATIVE DESIGN APPROACH, COMBINING<br className="desktop-break" />
              CREATIVITY WITH A DEEP UNDERSTANDING OF MATERIALS, FUNCTIONALITY, AND HUMAN EXPERIENCE. HIS EXPERTISE
              SPANS ARCHITECTURE, INTERIOR DESIGN, PROJECT MANAGEMENT, AND CONSULTANCY,<br className="desktop-break" />
              EARNING RECOGNITION FOR CREATING SOPHISTICATED SPACES THAT<br className="desktop-break" />
              ARE BOTH PURPOSEFUL AND TIMELESS.
            </p>
          </div>
          <div className="about-legacy" aria-label="Elevating lasting legacies">
            <span>ELEVATING</span>
            <span>LASTING</span>
            <span>LEGACIES</span>
          </div>
        </Container>

        <Container as="section" className="about-story about-section" aria-labelledby="about-story-title">
          <SectionHeading
            id="about-story-title"
            eyebrow="1995 — TODAY"
            title={<>OUR<br />STORY</>}
            description="WHERE OUR JOURNEY BEGAN"
            align="start"
            className="about-story-heading"
          />
          <div className="about-story-copy" data-reveal>
            <p>FOUNDED IN 1995, MB DESIGNS HAS GROWN INTO A MULTIDISCIPLINARY DESIGN STUDIO RECOGNIZED FOR DELIVERING EXCEPTIONAL ARCHITECTURE AND INTERIOR SOLUTIONS ACROSS CORPORATE, HOSPITALITY, RETAIL, AND RESIDENTIAL SECTORS.</p>
            <p>EVERY PROJECT IS GUIDED BY COLLABORATION, CREATIVITY, AND A DEDICATION TO ARCHITECTURAL EXCELLENCE. TODAY, WE CONTINUE TO BUILD UPON OUR LEGACY BY DESIGNING SPACES THAT ENHANCE EXPERIENCES AND ENRICH THE WAY PEOPLE LIVE, WORK, AND CONNECT.</p>
          </div>
        </Container>

        <Container as="section" className="about-philosophy" fluid aria-labelledby="about-philosophy-title">
          <div className="about-philosophy-shade" />
          <SectionHeading
            id="about-philosophy-title"
            eyebrow="DESIGN PRINCIPLES"
            title={<>OUR<br />PHILOSOPHY</>}
            align="start"
            className="about-philosophy-heading"
          />
          <p className="about-philosophy-copy" data-reveal>
            WE BELIEVE THAT EXCEPTIONAL DESIGN EXTENDS BEYOND AESTHETICS. EVERY SPACE SHOULD INSPIRE, FUNCTION EFFORTLESSLY, AND REFLECT THE IDENTITY OF THOSE WHO EXPERIENCE IT. OUR WORK BALANCES ELEGANCE, INNOVATION, CRAFTSMANSHIP, AND TECHNICAL EXPERTISE TO CREATE ENVIRONMENTS THAT IMPROVE EVERYDAY LIFE WHILE STANDING THE TEST OF TIME.
          </p>
        </Container>

        <Container as="section" className="about-values about-section" aria-label="Mission and vision">
          <article className="about-value" aria-labelledby="about-mission-title" data-reveal>
            <SectionHeading
              id="about-mission-title"
              eyebrow="01 / WHAT DRIVES US"
              title={<>OUR<br />MISSION</>}
              align="start"
              reveal={false}
              className="about-value-heading"
            />
            <div className="about-value-copy">
              <p>OUR MISSION IS TO DESIGN MEANINGFUL SPACES THAT ELEVATE HUMAN EXPERIENCES THROUGH THOUGHTFUL ARCHITECTURE, TIMELESS INTERIORS, AND UNCOMPROMISING QUALITY.</p>
              <p>EVERY PROJECT IS AN OPPORTUNITY TO TRANSFORM VISION INTO REALITY WHILE DELIVERING ENDURING VALUE FOR OUR CLIENTS AND COMMUNITIES.</p>
            </div>
          </article>
          <article className="about-value about-value-vision" aria-labelledby="about-vision-title" data-reveal>
            <SectionHeading
              id="about-vision-title"
              eyebrow="02 / THE FUTURE WE ENVISION"
              title={<>OUR<br />VISION</>}
              align="start"
              reveal={false}
              className="about-value-heading"
            />
            <div className="about-value-copy">
              <p>TO SHAPE THE FUTURE OF ARCHITECTURE AND INTERIOR DESIGN BY CREATING INSPIRING ENVIRONMENTS THAT REDEFINE HOW PEOPLE LIVE, WORK, AND EXPERIENCE SPACE, SETTING NEW STANDARDS OF EXCELLENCE THROUGH INNOVATION, CREATIVITY, AND PURPOSEFUL DESIGN.</p>
            </div>
          </article>
        </Container>
      </main>
    </div>
  )
}
