import { createFileRoute, Link } from '@tanstack/react-router'
import type { CSSProperties } from 'react'
import { useEffect, useRef, useState } from 'react'
import { ArrowIcon } from '../components/Icon'
import { Container } from '../components/Container'
import { SectionHeading } from '../components/SectionHeading'

export const Route = createFileRoute('/about')({
  head: () => ({
    meta: [
      { title: 'About | MB Designs' },
      {
        name: 'description',
        content: 'Discover the story, philosophy and vision behind MB Designs, founded in 1995 by Mohamed Badr.',
      },
    ],
    links: [{ rel: 'preload', as: 'image', href: '/assets/images/about-founder-wide.webp' }],
  }),
  component: AboutPage,
})

const principles = [
  {
    number: '01',
    name: 'PURPOSE',
    copy: 'Every decision begins with how a space should serve the people who use it.',
  },
  {
    number: '02',
    name: 'FUNCTION',
    copy: 'Planning, movement and material choices work together to make every environment effortless.',
  },
  {
    number: '03',
    name: 'CRAFT',
    copy: 'Technical precision and close attention to detail turn a strong idea into a lasting place.',
  },
  {
    number: '04',
    name: 'LONGEVITY',
    copy: 'We pursue a timeless character that remains relevant beyond trends and first impressions.',
  },
] as const

function AboutPage() {
  const [ready, setReady] = useState(false)
  const pageRef = useRef<HTMLDivElement>(null)

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
    <div ref={pageRef} className={ready ? 'about-site about-v2 is-ready' : 'about-site about-v2'}>
      <main>
        <Container as="section" id="top" className="about-v2-hero site-page-hero" fluid aria-labelledby="about-v2-hero-title">
          <div className="about-v2-hero-copy site-page-hero__copy">
            <p className="about-v2-eyebrow site-page-hero__eyebrow">MB DESIGNS · ESTABLISHED 1995</p>
            <h1 id="about-v2-hero-title" className="display-title site-page-hero__title">
              A PRACTICE BUILT
              <br />
              ON <em>VISION.</em>
            </h1>
            <p className="about-v2-hero-lead site-page-hero__lead">
              Led by founder Mohamed Badr, MB Designs brings creativity, technical knowledge and human experience together to shape purposeful, enduring spaces.
            </p>
          </div>
          <figure className="about-v2-founder">
            <picture>
              <source media="(max-width: 720px)" srcSet="/assets/images/about-founder.webp" />
              <img
                src="/assets/images/about-founder-wide.webp"
                alt="Mohamed Badr, founder of MB Designs"
                width="1672"
                height="941"
                fetchPriority="high"
              />
            </picture>
            <figcaption>
              <span>MOHAMED BADR</span>
              <span>FOUNDER · MB DESIGNS</span>
            </figcaption>
          </figure>
          <a className="about-v2-scroll" href="#story">
            <span>DISCOVER OUR STORY</span>
            <ArrowIcon direction="down" />
          </a>
        </Container>

        <Container as="section" id="story" className="about-v2-story section-pad" aria-labelledby="about-v2-story-title">
          <div className="about-v2-section-heading">
            <SectionHeading
              id="about-v2-story-title"
              eyebrow="01 / OUR STORY"
              title={<>THREE DECADES OF<br />DESIGN EVOLUTION</>}
              description="A multidisciplinary practice built through collaboration, precision and a commitment to architectural excellence."
              align="start"
            />
          </div>
          <div className="about-v2-story-grid">
            <div className="about-v2-story-image" data-reveal>
              <img
                src="/assets/images/about-wide.webp"
                alt="MB Designs architecture in warm evening light"
                width="1360"
                height="768"
                loading="eager"
                decoding="async"
              />
            </div>
            <div className="about-v2-story-copy" data-reveal>
              <p>
                Founded in 1995, MB Designs has grown into a multidisciplinary studio delivering architecture and interior solutions across corporate, hospitality, retail and residential sectors.
              </p>
              <p>
                Each project is guided by collaboration, creative clarity and technical rigor. Today, the practice continues to build on that legacy by designing spaces that enrich how people live, work and connect.
              </p>
              <Link className="home-text-link" to="/projects">
                <span>EXPLORE OUR WORK</span>
                <ArrowIcon />
              </Link>
            </div>
          </div>
          <dl className="about-v2-facts" data-reveal>
            <div>
              <dt>1995</dt>
              <dd>THE PRACTICE WAS FOUNDED</dd>
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

        <Container as="section" className="about-v2-philosophy" fluid aria-labelledby="about-v2-philosophy-title">
          <div className="about-v2-philosophy-image" data-reveal>
            <img
              src="/assets/images/about-tall.webp"
              alt="Contemporary courtyard designed by MB Designs"
              width="1266"
              height="1280"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div className="about-v2-philosophy-copy section-pad">
            <SectionHeading
              id="about-v2-philosophy-title"
              eyebrow="02 / OUR PHILOSOPHY"
              title={<>DESIGN BEYOND<br /><em>AESTHETICS.</em></>}
              description="Exceptional spaces should inspire, function effortlessly and express the identity of the people and organizations they serve."
              align="start"
            />
            <ol className="about-v2-principles">
              {principles.map((principle, index) => (
                <li data-reveal style={{ '--delay': `${index * 60}ms` } as CSSProperties} key={principle.name}>
                  <span>{principle.number}</span>
                  <strong>{principle.name}</strong>
                  <p>{principle.copy}</p>
                </li>
              ))}
            </ol>
          </div>
        </Container>

        <Container as="section" className="about-v2-direction section-pad" aria-labelledby="about-v2-direction-title">
          <SectionHeading
            id="about-v2-direction-title"
            eyebrow="03 / PURPOSE & DIRECTION"
            title="WHAT GUIDES THE PRACTICE"
            description="A clear mission for today and an ambitious vision for the future of the built environment."
            align="start"
          />
          <div className="about-v2-direction-grid">
            <article data-reveal aria-labelledby="about-v2-mission-title">
              <span>01 / MISSION</span>
              <h3 id="about-v2-mission-title">CREATE MEANINGFUL SPACES</h3>
              <p>
                Our mission is to elevate human experience through thoughtful architecture, timeless interiors and uncompromising quality—transforming vision into lasting value for clients and communities.
              </p>
              <Link className="home-text-link" to="/projects">
                <span>VIEW PROJECTS</span>
                <ArrowIcon />
              </Link>
            </article>
            <article data-reveal style={{ '--delay': '90ms' } as CSSProperties} aria-labelledby="about-v2-vision-title">
              <span>02 / VISION</span>
              <h3 id="about-v2-vision-title">SHAPE HOW PEOPLE EXPERIENCE SPACE</h3>
              <p>
                Our vision is to advance architecture and interior design through innovation, creativity and purpose—setting a higher standard for how people live, work and connect.
              </p>
              <Link className="home-text-link" to="/team">
                <span>MEET THE TEAM</span>
                <ArrowIcon />
              </Link>
            </article>
          </div>
        </Container>
      </main>
    </div>
  )
}
