import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { Container } from '../components/Container'
import { SectionHeading } from '../components/SectionHeading'
import { projectCategories } from '../portfolio-data'

export const Route = createFileRoute('/projects/')({
  head: () => ({
    meta: [
      { title: 'Projects | MB Designs' },
      { name: 'description', content: 'Explore MB Designs architecture and interior design projects.' },
    ],
    links: [{ rel: 'preload', as: 'image', href: '/assets/images/projects-hero.webp' }],
  }),
  component: ProjectsPage,
})

function ProjectsPage() {
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
    }, { rootMargin: '0px 0px -7% 0px', threshold: 0.08 })
    root.querySelectorAll('[data-reveal]').forEach((item) => observer.observe(item))
    return () => { window.clearTimeout(timer); observer.disconnect() }
  }, [])

  return (
    <div ref={pageRef} className={ready ? 'projects-site is-ready' : 'projects-site'}>
      <main>
        <Container as="section" id="top" className="projects-hero site-page-hero" fluid aria-labelledby="projects-hero-title">
          <img src="/assets/images/projects-hero.webp" alt="Contemporary MB Designs development at sunset" width="1920" height="1116" fetchPriority="high" />
          <div className="projects-hero-shade" />
          <Container className="projects-hero-inner site-page-hero__inner">
            <div className="projects-hero-copy site-page-hero__copy">
              <p className="projects-hero-eyebrow site-page-hero__eyebrow">SELECTED WORK / SIX DISCIPLINES</p>
              <h1 id="projects-hero-title" className="display-title site-page-hero__title">WE PURSUE<br />EXCELLENCE IN EVERY DETAIL</h1>
              <p className="projects-hero-lead site-page-hero__lead">Architecture and interiors shaped by context, precision and the people who use them.</p>
            </div>
            <div className="projects-hero-foot">
              <span>CAIRO / DUBAI</span>
              <a href="#project-categories">EXPLORE CATEGORIES</a>
            </div>
          </Container>
        </Container>

        <Container as="section" id="project-categories" className="projects-index" aria-labelledby="projects-index-title">
          <SectionHeading
            id="projects-index-title"
            eyebrow="PORTFOLIO"
            title={<>OUR<br />PROJECTS</>}
            description="EXPLORE OUR WORK ACROSS ARCHITECTURE, INTERIORS AND HOSPITALITY."
            align="start"
          />
          <div className="projects-category-grid">
            {projectCategories.map((category, index) => (
              <Link
                className="project-category"
                to="/projects/$category"
                params={{ category: category.slug }}
                key={category.slug}
                data-reveal
                aria-label={`Explore ${category.name}, ${category.detail.projects.length} projects`}
                style={{ '--delay': `${(index % 2) * 80}ms` } as React.CSSProperties}
              >
                <div className="project-category-image">
                  <img src={category.image} alt={`${category.name} projects`} width="1360" height="832" loading={index < 2 ? 'eager' : 'lazy'} decoding="async" />
                </div>
                <div className="project-category-meta">
                  <span className="project-category-number">{String(index + 1).padStart(2, '0')}</span>
                  <h3>{category.name}</h3>
                  <span className="project-category-count">{String(category.detail.projects.length).padStart(2, '0')} PROJECTS</span>
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </main>
    </div>
  )
}
