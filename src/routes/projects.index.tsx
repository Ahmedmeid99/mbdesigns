import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { Container } from '../components/Container'
import { PortfolioFooter, PortfolioHeader } from '../components/PortfolioChrome'
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
      <PortfolioHeader />
      <main>
        <Container as="section" id="top" className="projects-hero">
          <img src="/assets/images/projects-hero.webp" alt="Contemporary MB Designs development at sunset" width="1920" height="1116" fetchPriority="high" />
          <div className="projects-hero-shade" />
          <h1>WE PURSUE<br />EXCELLENCE IN EVERY DETAIL</h1>
        </Container>

        <Container as="section" className="projects-index">
          <h2 data-reveal>OUR PROJECTS</h2>
          <div className="projects-category-grid">
            {projectCategories.map((category, index) => (
              <a
                className="project-category"
                href={`/projects/${category.slug}`}
                key={category.slug}
                data-reveal
                style={{ '--delay': `${(index % 2) * 80}ms` } as React.CSSProperties}
              >
                <div className="project-category-image">
                  <img src={category.image} alt={`${category.name} projects`} width="1360" height="832" loading={index < 2 ? 'eager' : 'lazy'} decoding="async" />
                </div>
                <h3>{category.name}</h3>
              </a>
            ))}
          </div>
          <div className="projects-arrows" aria-hidden="true"><span>←</span><span>→</span></div>
        </Container>
      </main>
      <PortfolioFooter />
    </div>
  )
}
