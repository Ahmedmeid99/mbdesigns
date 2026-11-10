import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { Container } from '../components/Container'
import { EditorialTitle, PageHeroCopy } from '../components/PageHeroCopy'
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
      links: [{ rel: 'preload', as: 'image', href: '/assets/images/projects-hero.webp' }],
    }
  },
  component: SingleProjectPage,
})

function SingleProjectPage() {
  const { category: categorySlug, project: projectSlug } = Route.useParams()
  const category = getCategory(categorySlug)
  const categoryProjects = getCategoryProjects(categorySlug)
  const relatedProjects = categoryProjects.filter((project) => project.slug !== projectSlug)
  const detail = getProjectDetail(projectSlug)
  const cover = categoryProjects.find((project) => project.slug === projectSlug)
  const [ready, setReady] = useState(false)
  const pageRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setReady(false)
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
        <Container as="main" className="single-project-missing">
          <h1>PROJECT NOT FOUND</h1>
          <Link to="/projects/$category" params={{ category: categorySlug }}>BACK TO PROJECTS</Link>
        </Container>
      </div>
    )
  }

  return (
    <div ref={pageRef} className={ready ? 'single-project-site is-ready' : 'single-project-site'}>
      <Container as="section" id="top" className="single-project-hero site-page-hero" fluid aria-labelledby="single-project-title">
        <img src="/assets/images/projects-hero.webp" alt="Contemporary MB Designs development at sunset" width="1920" height="1116" fetchPriority="high" />
        <div className="single-project-hero-shade" />
        <Container className="single-project-hero-inner site-page-hero__inner">
          <PageHeroCopy
            id="single-project-title"
            className="single-project-hero-copy"
            eyebrowClassName="single-project-hero-eyebrow"
            titleClassName={detail.title.length > 18 ? 'is-long' : ''}
            leadClassName="single-project-hero-location"
            eyebrow={<>PROJECT / {category.name}</>}
            title={<EditorialTitle lines={[detail.title]} />}
            lead={detail.location}
          />
          <div className="single-project-hero-foot">
            <Link to="/projects/$category" params={{ category: categorySlug }}>BACK TO {category.name}</Link>
            <a href="#project-gallery">SCROLL TO VIEW PROJECT</a>
          </div>
        </Container>
      </Container>

      <Container as="section" className="single-project-intro section-pad" aria-labelledby="single-project-intro-title">
        <div>
          <p className="single-project-intro-eyebrow">PROJECT / {category.name}</p>
          <h2 id="single-project-intro-title">{detail.title}</h2>
          <p>{projectDescription(detail.title, categorySlug)}</p>
        </div>
        <dl>
          <div><dt>LOCATION</dt><dd>{shortLocation(detail.location)}</dd></div>
          <div><dt>SPACE</dt><dd>PROJECT SPECIFIC</dd></div>
          <div><dt>SCOPE OF WORK</dt><dd>{scopeForCategory(categorySlug)}</dd></div>
        </dl>
      </Container>

      <Container as="main" className="single-project-main">
        <div id="project-gallery" className="single-project-layout">
          <aside className="single-project-rail" aria-label={`${category.name} projects`}>
            <div className="single-project-thumbs">
              {relatedProjects.map((project) => (
                <Link
                  to="/projects/$category/$project"
                  params={{ category: categorySlug, project: project.slug }}
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

          <Container as="section" className="single-project-visuals" aria-label={`${detail.title} gallery`}>
            <div className="single-project-gallery">
              <figure className="single-project-cover" data-reveal key={cover.image}>
                <img src={cover.image} alt={`${detail.title} project cover`} loading="eager" decoding="async" />
              </figure>
              {detail.gallery.filter((image) => image.src !== cover.image).map((image, index) => (
                <figure data-reveal key={`${image.src}-${index}`}>
                  <img src={image.src} alt={`${detail.title} project view ${index + 1}`} width={image.width} height={image.height} loading={index < 2 ? 'eager' : 'lazy'} decoding="async" />
                </figure>
              ))}
            </div>
          </Container>
        </div>
      </Container>

    </div>
  )
}

function shortLocation(location: string) {
  return location.split(/[|,]/)[0]?.trim() || 'CAIRO'
}

function scopeForCategory(category: string) {
  if (category === 'architecture') return 'ARCHITECTURE & DESIGN DEVELOPMENT'
  if (category === 'food-and-beverage') return 'INTERIOR DESIGN & F&B EXPERIENCE'
  if (category === 'corporate') return 'WORKPLACE INTERIOR DESIGN'
  if (category === 'residential') return 'RESIDENTIAL INTERIOR DESIGN'
  if (category === 'hospitality') return 'HOSPITALITY INTERIOR DESIGN'
  return 'INTERIOR DESIGN & PROJECT DELIVERY'
}

function projectDescription(title: string, category: string) {
  const sectorCopy: Record<string, string> = {
    architecture: 'A CONTEXT-LED ARCHITECTURAL RESPONSE THAT BALANCES A CLEAR FORMAL IDENTITY WITH EVERYDAY FUNCTION, CLIMATE AND LONG-TERM USE.',
    corporate: 'A CONTEMPORARY WORKPLACE DESIGNED TO SUPPORT FOCUS, COLLABORATION AND A DISTINCTIVE ORGANIZATIONAL IDENTITY.',
    residential: 'A REFINED HOME SHAPED AROUND COMFORT, MATERIAL WARMTH AND THE RHYTHMS OF DAILY LIFE.',
    'food-and-beverage': 'A LAYERED DINING ENVIRONMENT WHERE LIGHT, MATERIAL AND SPATIAL RHYTHM CREATE A MEMORABLE GUEST EXPERIENCE.',
    'retail-and-commercial': 'A CLEAR COMMERCIAL ENVIRONMENT THAT UNITES BRAND EXPRESSION, PRODUCT PRESENTATION AND AN INTUITIVE CUSTOMER JOURNEY.',
    hospitality: 'A CALM, WELCOMING DESTINATION DESIGNED AROUND COMFORT, ATMOSPHERE AND A SEAMLESS STAY EXPERIENCE.',
  }
  return `${title} IS ${sectorCopy[category]?.replace(/^A /, 'A ') ?? 'A PURPOSEFUL ENVIRONMENT CREATED WITH CARE, PRECISION AND A STRONG SENSE OF PLACE.'}`
}
