import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { ArrowIcon } from '../components/Icon'
import { Container } from '../components/Container'
import { PageHeroCopy } from '../components/PageHeroCopy'
import { SectionHeading } from '../components/SectionHeading'

const localCareerImage = (id: string) => `/assets/images/career/${id}.webp`

const heroImage = localCareerImage('beb217_eb9741a51a4847268ed2c29d1b15a25c')
const careersEmail = 'info@mbdesigns.design'

const careerEmailHref = (jobTitle: string) =>
  `mailto:${careersEmail}?subject=${encodeURIComponent(jobTitle)}`

export const Route = createFileRoute('/career')({
  head: () => ({
    meta: [
      { title: 'Career | MB Designs' },
      { name: 'description', content: 'Build your career, internship, or supplier partnership with MB Designs.' },
    ],
    links: [{ rel: 'preload', as: 'image', href: heroImage }],
  }),
  component: CareerPage,
})

function CareerPage() {
  const rootRef = useRef<HTMLDivElement>(null)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 80)
    const root = rootRef.current
    if (!root) return () => window.clearTimeout(timer)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 })
    root.querySelectorAll('[data-reveal]').forEach((element) => observer.observe(element))
    return () => { window.clearTimeout(timer); observer.disconnect() }
  }, [])

  return (
    <div ref={rootRef} className={ready ? 'career-site career-v2 is-ready' : 'career-site career-v2'}>
      <main id="top">
        <Container as="section" className="career-hero site-page-hero" fluid aria-labelledby="career-hero-title">
          <img src={heroImage} alt="MB Designs creative studio in motion" width="2400" height="1450" fetchPriority="high" />
          <div className="career-hero-overlay" />
          <PageHeroCopy
            id="career-hero-title"
            className="career-hero-copy"
            eyebrow="CAREERS · CAIRO + DUBAI"
            title={<>THE FUTURE IS DESIGNED<br />BY THOSE WHO DARE TO CREATE.</>}
            lead="AT MB DESIGNS, BOLD IDEAS BECOME PURPOSEFUL SPACES AND LASTING IMPACT."
          />
          <a className="career-hero-scroll" href="#opportunities">
            <span>VIEW OPPORTUNITIES</span>
            <ArrowIcon direction="down" />
          </a>
        </Container>

        <Container as="section" className="career-statement section-pad" aria-labelledby="career-statement-title">
          <div className="career-statement-heading">
            <SectionHeading
              id="career-statement-title"
              eyebrow="01 / BUILD WITH US"
              title={<>READY TO SHAPE<br />WHAT COMES NEXT?</>}
              description="Join a multidisciplinary practice where curiosity, precision and collaboration turn ambitious ideas into enduring places."
              align="start"
            />
          </div>
          <div className="career-statement-side" data-reveal>
            <p className="career-statement-kicker">MB DESIGNS / ESTABLISHED 1995</p>
            <p>WE WELCOME CURIOUS MINDS, BOLD THINKERS AND TRUSTED PARTNERS WHO CARE ABOUT THE QUALITY OF EVERY DECISION.</p>
            <p>FROM EARLY-CAREER TALENT TO ESTABLISHED SUPPLIERS, WE VALUE PEOPLE WHO BRING CRAFT, INITIATIVE AND A GENEROUS COLLABORATIVE SPIRIT.</p>
          </div>
        </Container>

        <Container as="section" id="opportunities" className="career-opportunities section-pad" aria-labelledby="career-title">
          <SectionHeading
            id="career-title"
            eyebrow="02 / OPPORTUNITIES"
            title={<>BE PART OF<br />THE TEAM</>}
            description="Choose the path that fits you. Each action opens your email with the correct opportunity already added to the subject line."
            align="start"
          />
          <div className="career-opportunity-list">
            <Opportunity
              index="01"
              title="INTERNSHIPS"
              subtitle="START YOUR JOURNEY WITH MB DESIGNS"
              copy="Interested in gaining hands-on experience with MB Designs? Email your CV, portfolio link and a short introduction for our team to review."
              action="APPLY BY EMAIL"
              emailSubject="INTERNSHIPS"
            />
            <Opportunity
              index="02"
              title="SUPPLIERS"
              subtitle="WORK WITH MB DESIGNS"
              copy="Interested in joining our trusted supplier network? Email your company profile, catalogue and relevant project or product photography."
              action="SEND YOUR PROFILE"
              emailSubject="SUPPLIERS"
            />
          </div>
        </Container>
      </main>
    </div>
  )
}

function Opportunity({ index, title, subtitle, copy, action, emailSubject }: { index: string; title: string; subtitle: string; copy: string; action: string; emailSubject: string }) {
  return (
    <article className="career-opportunity" data-reveal>
      <div className="career-opportunity-label"><span>{index}</span><h3>{title}</h3></div>
      <div className="career-opportunity-copy"><h4>{subtitle}</h4><p>{copy}</p></div>
      <a className="career-opportunity-action" href={careerEmailHref(emailSubject)} aria-label={`${action} for ${emailSubject}`}>
        <span>{action}</span>
        <ArrowIcon />
      </a>
    </article>
  )
}
