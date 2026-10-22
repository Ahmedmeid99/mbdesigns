import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { PortfolioFooter, PortfolioHeader } from '../components/PortfolioChrome'
import { getCategory, getCategoryProjects } from '../portfolio-data'
import { getProjectDetail } from '../project-details.generated'

export const Route = createFileRoute('/projects/$category/$project')({
  head: ({ params }) => {
    const detail = getProjectDetail(params.project)
    return {
      meta: [
        { title: `${detail?.title ?? 'Project'} | MB Designs` },
        { name: 'description', content: `${detail?.title ?? 'Project'} by MB Designs.` },
      ],
    }
  },
  component: SingleProjectPage,
})

function SingleProjectPage() {
  const { category: categorySlug, project: projectSlug } = Route.useParams()
  const category = getCategory(categorySlug)
  const categoryProjects = getCategoryProjects(categorySlug).filter((project) => project.slug)
  const relatedProjects = categoryProjects.filter((project) => project.slug !== projectSlug)
  const detail = getProjectDetail(projectSlug)
  const cover = categoryProjects.find((project) => project.slug === projectSlug)
  const [ready, setReady] = useState(false)
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 60)
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
  }, [projectSlug])

  if (!detail || detail.category !== categorySlug || !cover) {
    return (
      <div className="single-project-site">
        <PortfolioHeader />
        <main className="single-project-missing">
          <h1>PROJECT NOT FOUND</h1>
          <Link to="/projects/$category" params={{ category: categorySlug }}>BACK TO PROJECTS</Link>
        </main>
      </div>
    )
  }

  return (
    <div ref={pageRef} className={ready ? 'single-project-site is-ready' : 'single-project-site'}>
      <PortfolioHeader />
      <main id="top" className="single-project-main">
        <header className="single-project-heading">
          <h1>{detail.title}</h1>
          <p>{detail.location}</p>
        </header>

        <div className="single-project-layout">
          <aside className="single-project-rail" aria-label={`${category.name} projects`}>
            <div className="single-project-thumbs">
              {relatedProjects.map((project) => (
                <Link
                  to="/projects/$category/$project"
                  params={{ category: categorySlug, project: project.slug! }}
                  key={project.slug}
                  aria-label={`View ${project.name}`}
                >
                  <img src={project.image} alt="" width="360" height="224" loading="lazy" decoding="async" />
                  <span>{project.name}</span>
                </Link>
              ))}
            </div>
            <Link className="single-project-back" to="/projects/$category" params={{ category: categorySlug }}>Back To Projects</Link>
          </aside>

          <section className="single-project-visuals" aria-label={`${detail.title} gallery`}>
            <img className="single-project-cover" src={cover.image} alt={`${detail.title} by MB Designs`} width="1600" height="900" fetchPriority="high" />
            <div className="single-project-gallery">
              {detail.gallery.map((image, index) => (
                <a href={image.src} target="_blank" rel="noreferrer" data-reveal key={`${image.src}-${index}`} aria-label={`Open ${detail.title} image ${index + 1}`}>
                  <img src={image.src} alt={`${detail.title} project view ${index + 1}`} width={image.width} height={image.height} loading={index < 2 ? 'eager' : 'lazy'} decoding="async" />
                </a>
              ))}
            </div>
          </section>
        </div>
      </main>
      <PortfolioFooter />
    </div>
  )
}
