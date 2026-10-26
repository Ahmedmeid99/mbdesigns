import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { Container } from '../components/Container'
import { PageHeroCopy } from '../components/PageHeroCopy'
import { getCategory, getCategoryProjects } from '../portfolio-data'
import { getProjectDetail } from '../project-details.generated'

export const Route = createFileRoute('/projects/$category/$project')({
  head: ({ params }) => {
    const detail = getProjectDetail(params.project)
    const cover = getCategoryProjects(params.category).find((project) => project.slug === params.project)
    return {
      meta: [
        { title: `${detail?.title ?? 'Project'} | MB Designs` },
        { name: 'description', content: `${detail?.title ?? 'Project'} by MB Designs.` },
      ],
      links: cover ? [{ rel: 'preload', as: 'image', href: cover.image }] : [],
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
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null)
  const pageRef = useRef<HTMLDivElement>(null)
  const closeLightboxRef = useRef<HTMLButtonElement>(null)
  const lastImageTriggerRef = useRef<HTMLButtonElement | null>(null)
  const galleryLength = detail?.gallery.length ?? 0
  const lightboxOpen = activeImageIndex !== null

  useEffect(() => {
    setActiveImageIndex(null)
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

  useEffect(() => {
    if (!lightboxOpen || galleryLength === 0) return

    const previousOverflow = document.body.style.overflow
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveImageIndex(null)
      if (event.key === 'ArrowLeft') {
        setActiveImageIndex((current) => current === null ? null : (current - 1 + galleryLength) % galleryLength)
      }
      if (event.key === 'ArrowRight') {
        setActiveImageIndex((current) => current === null ? null : (current + 1) % galleryLength)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    closeLightboxRef.current?.focus()

    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
      lastImageTriggerRef.current?.focus()
    }
  }, [galleryLength, lightboxOpen])

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
        <img src={cover.image} alt={`${detail.title} by MB Designs`} width="1920" height="1080" fetchPriority="high" />
        <div className="single-project-hero-shade" />
        <Container className="single-project-hero-inner site-page-hero__inner">
          <PageHeroCopy
            id="single-project-title"
            className="single-project-hero-copy"
            eyebrowClassName="single-project-hero-eyebrow"
            titleClassName={detail.title.length > 18 ? 'is-long' : ''}
            leadClassName="single-project-hero-location"
            eyebrow={<>PROJECT / {category.name}</>}
            title={detail.title}
            lead={detail.location}
          />
          <div className="single-project-hero-foot">
            <Link to="/projects/$category" params={{ category: categorySlug }}>BACK TO {category.name}</Link>
            <a href="#project-gallery">SCROLL TO VIEW PROJECT</a>
          </div>
        </Container>
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
              {detail.gallery.map((image, index) => (
                <button
                  type="button"
                  data-reveal
                  key={`${image.src}-${index}`}
                  aria-label={`Open ${detail.title} image ${index + 1}`}
                  onClick={(event) => {
                    lastImageTriggerRef.current = event.currentTarget
                    setActiveImageIndex(index)
                  }}
                >
                  <img src={image.src} alt={`${detail.title} project view ${index + 1}`} width={image.width} height={image.height} loading={index < 2 ? 'eager' : 'lazy'} decoding="async" />
                </button>
              ))}
            </div>
          </Container>
        </div>
      </Container>

      {activeImageIndex !== null && detail.gallery[activeImageIndex] ? (
        <div className="single-project-lightbox" role="dialog" aria-modal="true" aria-label={`${detail.title} image viewer`}>
          <button className="single-project-lightbox-close" type="button" ref={closeLightboxRef} onClick={() => setActiveImageIndex(null)}>
            CLOSE
          </button>
          <div className="single-project-lightbox-frame">
            <img
              src={detail.gallery[activeImageIndex].src}
              alt={`${detail.title} project view ${activeImageIndex + 1}`}
              width={detail.gallery[activeImageIndex].width}
              height={detail.gallery[activeImageIndex].height}
            />
          </div>
          <div className="single-project-lightbox-controls">
            <button
              type="button"
              onClick={() => setActiveImageIndex((current) => current === null ? null : (current - 1 + galleryLength) % galleryLength)}
              aria-label="Previous project image"
            >
              PREVIOUS
            </button>
            <span aria-live="polite">{String(activeImageIndex + 1).padStart(2, '0')} / {String(galleryLength).padStart(2, '0')}</span>
            <button
              type="button"
              onClick={() => setActiveImageIndex((current) => current === null ? null : (current + 1) % galleryLength)}
              aria-label="Next project image"
            >
              NEXT
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
