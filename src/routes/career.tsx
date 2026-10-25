import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { Container } from '../components/Container'

const wixImage = (id: string, _extension: 'jpg' | 'png', _width: number, _height: number) => `/assets/images/career/${id}.webp`

const heroImage = wixImage('beb217_eb9741a51a4847268ed2c29d1b15a25c', 'jpg', 2400, 1450)
const statementLogo = wixImage('beb217_2092a8268dce4b678f8e3e47a2c80c8b', 'png', 1200, 364)
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
    <div ref={rootRef} className={ready ? 'career-site is-ready' : 'career-site'}>
      <main id="top">
        <Container as="section" className="career-hero site-page-hero" fluid aria-labelledby="career-hero-title">
          <img src={heroImage} alt="MB Designs creative studio in motion" width="2400" height="1450" fetchPriority="high" />
          <div className="career-hero-overlay" />
          <div className="career-hero-copy site-page-hero__copy">
            <p className="site-page-hero__eyebrow">CAREERS / CAIRO · DUBAI</p>
            <h1 id="career-hero-title" className="site-page-hero__title">THE FUTURE IS DESIGNED BY THOSE<br />WHO DARE TO CREATE</h1>
            <p className="site-page-hero__lead">At MB Designs, we turn bold ideas into lasting impact.</p>
          </div>
        </Container>

        <Container as="section" className="career-statement" aria-label="Join the MB Designs team">
          <div className="career-statement-copy" data-reveal>
            <p>BUILD WHAT COMES NEXT</p>
            <h2><span>READY TO SHAPE</span><span>THE FUTURE OF DESIGN?</span><strong>JOIN THE TEAM.</strong></h2>
          </div>
          <div className="career-statement-side" data-reveal>
            <img src={statementLogo} alt="MB Designs team" width="1200" height="364" loading="eager" />
            <p>WE WELCOME CURIOUS MINDS, BOLD THINKERS AND TRUSTED PARTNERS WHO WANT TO CREATE WORK WITH LASTING VALUE.</p>
          </div>
        </Container>

        <Container as="section" className="career-opportunities" aria-labelledby="career-title">
          <header data-reveal>
            <div>
              <p>OPPORTUNITIES</p>
              <h2 id="career-title">BE PART OF<br />THE TEAM</h2>
            </div>
            <span>TALENT / PARTNERS</span>
          </header>
          <Opportunity
            index="01"
            title="INTERNSHIPS"
            subtitle="START YOUR JOURNEY WITH MB DESIGNS"
            copy="Interested in gaining hands-on experience with MB DESIGNS? Submit your application along with links to your CV, portfolio, and a recent photo for our team to review."
            action="APPLY NOW"
            emailSubject="INTERNSHIPS"
          />
          <Opportunity
            index="02"
            title="SUPPLIERS"
            subtitle="WORK WITH MB DESIGNS"
            copy="Interested in becoming part of our network of trusted suppliers and partners? Submit your company profile, portfolio or catalogue, and relevant project or product photography for our team to review."
            action="SUBMIT YOUR PROFILE"
            emailSubject="SUPPLIERS"
          />
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
      <a className="career-opportunity-action" href={careerEmailHref(emailSubject)} aria-label={`${action} by email for ${emailSubject}`}>{action}</a>
    </article>
  )
}
