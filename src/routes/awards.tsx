import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { Container } from '../components/Container'
import { PageHeroCopy } from '../components/PageHeroCopy'
import { SectionHeading } from '../components/SectionHeading'

export const Route = createFileRoute('/awards')({
  head: () => ({
    meta: [
      { title: 'Awards | MB Designs' },
      {
        name: 'description',
        content: 'International architecture and interior design awards earned by MB Designs.',
      },
    ],
    links: [
      { rel: 'preload', as: 'image', href: '/assets/images/awards-hero.webp' },
    ],
  }),
  component: AwardsPage,
})

const awardEntries = [
  {
    number: '01',
    name: 'EASTOWN DUPLEX',
    category: 'RESIDENTIAL PROPERTY INTERIOR – PRIVATE RESIDENCE',
    image: '/assets/images/award-eastown.webp',
    width: 3909,
    height: 2596,
    copy: [
      'THE EASTOWN DUPLEX PROJECT WAS RECOGNIZED AT THE ARABIAN-AFRICAN INTERNATIONAL PROPERTY AWARDS 2020–2021, WINNING IN THE RESIDENTIAL PROPERTY INTERIOR – PRIVATE RESIDENCE CATEGORY.',
      "THE PROJECT SHOWCASES MB DESIGNS' COMMITMENT TO CREATING SOPHISTICATED RESIDENTIAL SPACES THAT COMBINE FUNCTIONALITY, ELEGANCE, AND TIMELESS DESIGN.",
    ],
  },
  {
    number: '02',
    name: 'NUWA BY MORI CO',
    category: 'LEISURE INTERIOR CONCEPT',
    image: '/assets/images/award-nuwa.webp',
    width: 1600,
    height: 1013,
    copy: [
      'NUWA BY MORI CO RECEIVED THE ARABIAN-AFRICAN INTERNATIONAL PROPERTY AWARDS 2020–2021 FOR ITS OUTSTANDING INTERIOR CONCEPT IN THE LEISURE AND HOSPITALITY SECTOR.',
      'INSPIRED BY CONTEMPORARY ASIAN AESTHETICS, THE RESTAURANT DELIVERS AN IMMERSIVE DINING EXPERIENCE THROUGH CAREFULLY CURATED MATERIALS, LIGHTING, AND SPATIAL STORYTELLING.',
    ],
  },
] as const

const luxuryEntries = [
  {
    number: '01',
    name: 'GRAND RESIDENCE VILLA',
    category: 'BEST LUXURY RESIDENTIAL INTERIOR DESIGN IN EGYPT',
    image: '/assets/images/award-villa.webp',
    width: 1600,
    height: 1013,
    copy: [
      'THE GRAND RESIDENCE VILLA WAS HONORED WITH THE LUXURY LIFESTYLE AWARDS 2021, RECEIVING THE TITLE OF BEST LUXURY RESIDENTIAL INTERIOR DESIGN IN EGYPT.',
      'THE PROJECT REFLECTS EXCEPTIONAL CRAFTSMANSHIP, REFINED DETAILING, AND A SEAMLESS BLEND OF LUXURY WITH EVERYDAY LIVING.',
    ],
  },
  {
    number: '02',
    name: 'BEST LUXURY INTERIOR DESIGN STUDIO IN EGYPT',
    category: '',
    image: '/assets/images/award-studio.webp',
    width: 1709,
    height: 1617,
    copy: [
      'IN 2022, MB DESIGNS WAS RECOGNIZED AS THE BEST LUXURY INTERIOR DESIGN STUDIO IN EGYPT BY THE LUXURY LIFESTYLE AWARDS.',
      "THIS ACHIEVEMENT CELEBRATES THE FIRM'S CONTINUED EXCELLENCE IN DELIVERING INNOVATIVE ARCHITECTURAL AND INTERIOR DESIGN SOLUTIONS ACROSS RESIDENTIAL, HOSPITALITY, RETAIL, AND CORPORATE SECTORS.",
    ],
  },
] as const

type CertificateImage = {
  src: string
  alt: string
  width: number
  height: number
}

const certificateSets: ReadonlyArray<{ label: string; year: string; variant?: 'portrait'; images: readonly CertificateImage[] }> = [
  {
    label: 'AFRICAN PROPERTY AWARDS',
    year: '2020–2021',
    variant: 'portrait',
    images: [
      {
        src: '/assets/images/award-african-nuwa-2021.webp',
        alt: 'African Property Awards 2020–2021 certificate for Nüwa, Capital Business Park',
        width: 1488,
        height: 2105,
      },
      {
        src: '/assets/images/award-african-eastown-2021.webp',
        alt: 'African Property Awards 2020–2021 certificate for Eastown Duplex',
        width: 1488,
        height: 2105,
      },
    ],
  },
  {
    label: 'LUXURY LIFESTYLE AWARDS',
    year: '2021',
    images: [
      {
        src: '/assets/images/award-2021-letter.webp',
        alt: 'Luxury Lifestyle Awards 2021 winner letter',
        width: 1156,
        height: 1520,
      },
      {
        src: '/assets/images/award-2021-certificate.webp',
        alt: 'Luxury Lifestyle Awards 2021 winner certificate',
        width: 1560,
        height: 1177,
      },
    ],
  },
  {
    label: 'LUXURY LIFESTYLE AWARDS',
    year: '2022',
    images: [
      {
        src: '/assets/images/award-2022-letter.webp',
        alt: 'Luxury Lifestyle Awards 2022 winner letter',
        width: 1109,
        height: 1574,
      },
      {
        src: '/assets/images/award-2022-certificate.webp',
        alt: 'Luxury Lifestyle Awards 2022 winner certificate',
        width: 1542,
        height: 1208,
      },
    ],
  },
]

const certificateLightboxCount = certificateSets.reduce((total, set) => total + set.images.length, 0)

const awardLightboxImages = [
  ...certificateSets.flatMap((set) => set.images),
  ...awardEntries.map((entry) => ({
    src: entry.image,
    alt: `${entry.name} award project`,
    width: entry.width,
    height: entry.height,
  })),
  ...luxuryEntries.map((entry) => ({
    src: entry.image,
    alt: `${entry.name} award project`,
    width: entry.width,
    height: entry.height,
  })),
]

function AwardsPage() {
  const [ready, setReady] = useState(false)
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null)
  const pageRef = useRef<HTMLDivElement>(null)
  const closeLightboxRef = useRef<HTMLButtonElement>(null)
  const lastImageTriggerRef = useRef<HTMLButtonElement | null>(null)
  const lightboxOpen = activeImageIndex !== null

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 90)
    const root = pageRef.current
    if (!root) return () => window.clearTimeout(timer)

    const items = root.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { rootMargin: '0px 0px -7% 0px', threshold: 0.09 },
    )
    items.forEach((item) => observer.observe(item))

    return () => {
      window.clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    if (!lightboxOpen) return

    const previousOverflow = document.body.style.overflow
    const focusFrame = window.requestAnimationFrame(() => closeLightboxRef.current?.focus())
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveImageIndex(null)
      if (event.key === 'ArrowLeft') {
        setActiveImageIndex((current) => current === null ? null : (current - 1 + awardLightboxImages.length) % awardLightboxImages.length)
      }
      if (event.key === 'ArrowRight') {
        setActiveImageIndex((current) => current === null ? null : (current + 1) % awardLightboxImages.length)
      }
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.cancelAnimationFrame(focusFrame)
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
      lastImageTriggerRef.current?.focus()
    }
  }, [lightboxOpen])

  const openImage = (index: number, trigger: HTMLButtonElement) => {
    lastImageTriggerRef.current = trigger
    setActiveImageIndex(index)
  }

  const activeImage = activeImageIndex === null ? null : awardLightboxImages[activeImageIndex]

  return (
    <div ref={pageRef} className={ready ? 'awards-site is-ready' : 'awards-site'}>
      <main>
        <Container as="section" id="top" className="awards-hero site-page-hero" fluid aria-labelledby="awards-hero-title">
          <img src="/assets/images/awards-hero.webp" alt="Abstract amber architectural light" width="1920" height="1145" fetchPriority="high" />
          <div className="awards-hero-shade" />
          <PageHeroCopy
            id="awards-hero-title"
            className="awards-hero-copy"
            eyebrow="AWARDS / INTERNATIONAL RECOGNITION"
            title={<>WHERE VISION<br />EARNS RECOGNITION</>}
            lead="Honoring a tradition of timeless design and architectural excellence."
          />
        </Container>

        <Container as="section" className="certificate-section" aria-labelledby="awards-certificate-title">
          <SectionHeading
            id="awards-certificate-title"
            eyebrow="RECOGNITION"
            title="AWARDS"
            description="A selection of international distinctions honoring our architectural and interior design work."
          />
          {certificateSets.map((set, index) => (
            <CertificateRow
              key={set.year}
              label={set.label}
              year={set.year}
              images={set.images}
              variant={set.variant}
              startIndex={index * set.images.length}
              onOpen={openImage}
            />
          ))}
        </Container>

        <Container as="section" className="awards-purpose" fluid>
          <div className="awards-purpose-sticky">
            <div className="awards-purpose-copy" data-reveal>
              <h2 className="display-title">DESIGN<br />WITH PURPOSE</h2>
              <p>EACH AWARD REFLECTS OUR PASSION FOR<br className="desktop-break" /> CREATING TIMELESS SPACES WITH PURPOSE, PRECISION,<br className="desktop-break" /> AND LASTING IMPACT.</p>
            </div>
          </div>
        </Container>

        <Container as="section" className="award-editorial" aria-label="Award-winning projects">
          <AwardFamilyHeader
            eyebrow="2020–2021"
            title={<>INTERNATIONAL<br />AWARDS</>}
            description="THE ARABIAN-AFRICAN INTERNATIONAL PROPERTY AWARDS"
            variant="property"
          />
          {awardEntries.map((entry, index) => (
            <EditorialAward key={entry.name} entry={entry} reverse={index % 2 === 1} onOpen={(trigger) => openImage(index + certificateLightboxCount, trigger)} />
          ))}

          <AwardFamilyHeader
            eyebrow="2021–2022"
            title={<>LUXURY LIFESTYLE<br />AWARDS</>}
            description="INTERNATIONAL RECOGNITION FOR RESIDENTIAL DESIGN AND STUDIO EXCELLENCE"
            variant="luxury"
          />
          {luxuryEntries.map((entry, index) => (
            <EditorialAward key={entry.name} entry={entry} reverse={index % 2 === 1} onOpen={(trigger) => openImage(index + certificateLightboxCount + awardEntries.length, trigger)} />
          ))}

        </Container>
      </main>

      {activeImageIndex !== null && activeImage ? (
        <div className="single-project-lightbox award-lightbox" role="dialog" aria-modal="true" aria-label="Awards image viewer">
          <button className="single-project-lightbox-close" type="button" ref={closeLightboxRef} onClick={() => setActiveImageIndex(null)}>
            CLOSE
          </button>
          <div className="single-project-lightbox-frame">
            <img src={activeImage.src} alt={activeImage.alt} width={activeImage.width} height={activeImage.height} />
          </div>
          <div className="single-project-lightbox-controls">
            <button
              type="button"
              onClick={() => setActiveImageIndex((current) => current === null ? null : (current - 1 + awardLightboxImages.length) % awardLightboxImages.length)}
              aria-label="Previous award image"
            >
              PREVIOUS
            </button>
            <span>{String(activeImageIndex + 1).padStart(2, '0')} / {String(awardLightboxImages.length).padStart(2, '0')}</span>
            <button
              type="button"
              onClick={() => setActiveImageIndex((current) => current === null ? null : (current + 1) % awardLightboxImages.length)}
              aria-label="Next award image"
            >
              NEXT
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}

function CertificateRow({
  label,
  year,
  images,
  variant,
  startIndex,
  onOpen,
}: {
  label: string
  year: string
  images: readonly CertificateImage[]
  variant?: 'portrait'
  startIndex: number
  onOpen: (index: number, trigger: HTMLButtonElement) => void
}) {
  return (
    <article className={`certificate-row${variant ? ` certificate-row--${variant}` : ''}`} data-reveal>
      <p>/{label} {year}</p>
      <div className="certificate-row__media">
        {images.map((image, index) => (
          <button
            key={image.src}
            className="award-focus-trigger award-focus-trigger--certificate"
            type="button"
            aria-label={`Open ${image.alt}`}
            onClick={(event) => onOpen(startIndex + index, event.currentTarget)}
          >
            <img src={image.src} alt={image.alt} width={image.width} height={image.height} loading="lazy" decoding="async" />
          </button>
        ))}
      </div>
    </article>
  )
}

type AwardEntry = (typeof awardEntries)[number] | (typeof luxuryEntries)[number]

function AwardFamilyHeader({
  eyebrow,
  title,
  description,
  variant,
}: {
  eyebrow: string
  title: React.ReactNode
  description: string
  variant: 'property' | 'luxury'
}) {
  return (
    <div className={`award-family award-family--${variant}`} data-reveal>
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        description={description}
        align="start"
        reveal={false}
        className="award-family-heading"
      />
      {variant === 'property' ? (
        <div className="property-flags">
          <img
            src="/assets/images/award-property-flags.webp"
            alt="Arabian Property Awards winner 2020–2021"
            width="1338"
            height="1739"
            loading="lazy"
            decoding="async"
          />
        </div>
      ) : (
        <div className="luxury-wins" role="img" aria-label="Luxury Lifestyle Awards winners 2021 and 2022">
          <span aria-hidden="true">LUXURY <b>WINNER<br />2021</b></span>
          <span aria-hidden="true">LUXURY <b>WINNER<br />2022</b></span>
        </div>
      )}
    </div>
  )
}

function EditorialAward({ entry, reverse = false, onOpen }: { entry: AwardEntry; reverse?: boolean; onOpen: (trigger: HTMLButtonElement) => void }) {
  const headingId = `award-${entry.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`

  return (
    <article className={`editorial-award${reverse ? ' editorial-award--reverse' : ''}`} aria-labelledby={headingId} data-reveal>
      <div className="editorial-copy">
        <div className="editorial-title"><span>{entry.number}</span><h3 id={headingId}>{entry.name}</h3></div>
        {entry.category && <h4>{entry.category}</h4>}
        {entry.copy.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      <button className="award-focus-trigger award-focus-trigger--editorial" type="button" aria-label={`Open ${entry.name} award image`} onClick={(event) => onOpen(event.currentTarget)}>
        <img src={entry.image} alt={`${entry.name} award project`} width={entry.width} height={entry.height} loading="lazy" decoding="async" />
      </button>
    </article>
  )
}
