import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { PortfolioFooter, PortfolioHeader } from '../components/PortfolioChrome'
import { getCategory, getCategoryProjects } from '../portfolio-data'

export const Route = createFileRoute('/projects/$category')({
  head: ({ params }) => {
    const category = getCategory(params.category)
    return {
      meta: [
        { title: `${category.name} | MB Designs` },
        { name: 'description', content: `${category.name} projects by MB Designs.` },
      ],
      links: [{ rel: 'preload', as: 'image', href: category.detail.hero }],
    }
  },
  component: ProjectCategoryPage,
})

function ProjectCategoryPage() {
  const { category: slug } = Route.useParams()
  const category = getCategory(slug)
  const projects = getCategoryProjects(slug)
  const detail = category.detail
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
  }, [slug])

  return (
    <div ref={pageRef} className={ready ? `project-detail-site project-detail-${slug} is-ready` : `project-detail-site project-detail-${slug}`}>
      <PortfolioHeader />
      <main>
        <section id="top" className="project-detail-hero">
          <img src={detail.hero} alt={`${category.name} by MB Designs`} width="1920" height="1080" fetchPriority="high" />
          <div className="project-detail-shade" />
          <div className="project-detail-hero-copy">
            <h1>{detail.heroLines[0]}<br />{detail.heroLines[1]}</h1>
            <p>{detail.subtitle}</p>
          </div>
        </section>

        <section className={`project-detail-gallery detail-layout-${detail.layout}`}>
          <h2 data-reveal>{detail.galleryTitle}</h2>
          <div className="detail-project-grid">
            {projects.map((project, index) => (
              <article className={`detail-project detail-project-${project.shape}`} data-reveal key={`${project.name}-${index}`}>
                <div><img src={project.image} alt={`${project.name} by MB Designs`} width="1280" height="1280" loading={index < 3 ? 'eager' : 'lazy'} decoding="async" /></div>
                <h3>{project.name}</h3>
              </article>
            ))}
          </div>
          <div className="projects-arrows detail-arrows" aria-hidden="true"><span>←</span><span>→</span></div>
        </section>
      </main>
      <PortfolioFooter />
    </div>
  )
}
