import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { Container } from '../components/Container'
import { SectionHeading } from '../components/SectionHeading'
import { getCategory, getCategoryProjects } from '../portfolio-data'

export const Route = createFileRoute('/projects/$category/')({
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
      <main>
        <Container as="section" id="top" className="project-detail-hero site-page-hero" fluid aria-labelledby="project-detail-hero-title">
          <img src={detail.hero} alt={`${category.name} by MB Designs`} width="1920" height="1080" fetchPriority="high" />
          <div className="project-detail-shade" />
          <Container className="project-detail-hero-inner site-page-hero__inner">
            <div className="project-detail-hero-copy site-page-hero__copy">
              <p className="project-detail-hero-eyebrow site-page-hero__eyebrow">PROJECTS / {category.name}</p>
              <h1 id="project-detail-hero-title" className="display-title site-page-hero__title">{detail.heroLines[0]}<br />{detail.heroLines[1]}</h1>
              <p className="project-detail-hero-lead site-page-hero__lead">{detail.subtitle}</p>
            </div>
            <div className="project-detail-hero-foot">
              <Link to="/projects">ALL PROJECTS</Link>
              <a href="#project-gallery">{String(projects.length).padStart(2, '0')} SELECTED PROJECTS</a>
            </div>
          </Container>
        </Container>

        <Container as="section" id="project-gallery" className={`project-detail-gallery detail-layout-${detail.layout}`} aria-labelledby="project-gallery-title">
          <SectionHeading
            id="project-gallery-title"
            eyebrow={category.name}
            title={<>{category.name}<br />PROJECTS</>}
            description={`${String(projects.length).padStart(2, '0')} SELECTED PROJECTS`}
            align="start"
          />
          <div className="detail-project-grid">
            {projects.map((project, index) => {
              const card = (
                <article className={`detail-project detail-project-${project.shape}`} data-reveal>
                  <div className="detail-project-media"><img src={project.image} alt={`${project.name} by MB Designs`} width="1280" height="1280" loading={index < 3 ? 'eager' : 'lazy'} decoding="async" /></div>
                  <div className="detail-project-caption">
                    <span className="detail-project-number">{String(index + 1).padStart(2, '0')}</span>
                    <h3>{project.name}</h3>
                    <span className="detail-project-action">VIEW PROJECT</span>
                  </div>
                </article>
              )

              return (
                <Link
                  className="detail-project-link"
                  to="/projects/$category/$project"
                  params={{ category: slug, project: project.slug }}
                  key={`${project.name}-${index}`}
                  aria-label={`View ${project.name} project`}
                >
                  {card}
                </Link>
              )
            })}
          </div>
        </Container>
      </main>
    </div>
  )
}
