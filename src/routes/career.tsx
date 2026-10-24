import { createFileRoute } from '@tanstack/react-router'
import { FormEvent, useEffect, useRef, useState } from 'react'
import { Container } from '../components/Container'

const wixImage = (id: string, _extension: 'jpg' | 'png', _width: number, _height: number) => `/assets/images/career/${id}.webp`

const heroImage = wixImage('beb217_eb9741a51a4847268ed2c29d1b15a25c', 'jpg', 2400, 1450)
const statementLogo = wixImage('beb217_2092a8268dce4b678f8e3e47a2c80c8b', 'png', 1200, 364)
type ApplicationKind = 'internship' | 'supplier'

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
  const [application, setApplication] = useState<ApplicationKind | null>(null)

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

  useEffect(() => {
    if (!application) return
    const onKeyDown = (event: KeyboardEvent) => { if (event.key === 'Escape') setApplication(null) }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [application])

  return (
    <div ref={rootRef} className={ready ? 'career-site is-ready' : 'career-site'}>
      <main id="top">
        <Container as="section" className="career-hero" fluid>
          <img src={heroImage} alt="MB Designs creative studio in motion" width="2400" height="1450" fetchPriority="high" />
          <div className="career-hero-overlay" />
          <div className="career-hero-copy">
            <h1>THE FUTURE IS DESIGNED BY THOSE<br />WHO DARE TO CREATE</h1>
            <p>AT MB DESIGNS, WE TURN BOLD IDEAS INTO LASTING IMPACT</p>
          </div>
        </Container>

        <Container as="section" className="career-statement" aria-label="Join the MB Designs team">
          <div className="career-statement-line career-statement-line-a" aria-hidden="true">READY TO SHAPE&nbsp;&nbsp;&nbsp; THE FUTURE OF DESIGN?</div>
          <div className="career-statement-line career-statement-line-b" aria-hidden="true">LOOKING FOR YOU&nbsp;&nbsp;&nbsp; TO JOIN</div>
          <img src={statementLogo} alt="MB Designs team" width="1200" height="364" loading="eager" />
          <h2><span>READY TO SHAPE</span><span>THE FUTURE OF DESIGN?</span><span>LOOKING FOR YOU</span><span>TO JOIN</span><strong>TEAM</strong></h2>
        </Container>

        <Container as="section" className="career-opportunities" aria-labelledby="career-title">
          <header data-reveal>
            <h2 id="career-title">BE PART OF THE TEAM</h2>
            <span>INTERNS/SUPPLIERS</span>
          </header>
          <Opportunity
            title="INTERNSHIPS"
            subtitle="START YOUR JOURNEY WITH MB DESIGNS"
            copy="Interested in gaining hands-on experience with MB DESIGNS? Submit your application along with links to your CV, portfolio, and a recent photo for our team to review."
            action="APPLY NOW"
            onClick={() => setApplication('internship')}
          />
          <Opportunity
            title="SUPPLIERS"
            subtitle="WORK WITH MB DESIGNS"
            copy="Interested in becoming part of our network of trusted suppliers and partners? Submit your company profile, portfolio or catalogue, and relevant project or product photography for our team to review."
            action="SUBMIT YOUR PROFILE"
            onClick={() => setApplication('supplier')}
          />
          <div className="career-scroll-arrows" aria-hidden="true"><span>←</span><span>→</span></div>
        </Container>
      </main>
      {application && <ApplicationDialog kind={application} onClose={() => setApplication(null)} />}
    </div>
  )
}
function Opportunity({ title, subtitle, copy, action, onClick }: { title: string; subtitle: string; copy: string; action: string; onClick: () => void }) {
  return (
    <article className="career-opportunity" data-reveal>
      <h3>{title}</h3>
      <div><h4>{subtitle}</h4><p>{copy}</p></div>
      <button type="button" onClick={onClick}>{action}</button>
    </article>
  )
}

function ApplicationDialog({ kind, onClose }: { kind: ApplicationKind; onClose: () => void }) {
  const isInternship = kind === 'internship'
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') || '')
    const link = String(form.get('link') || '')
    const subject = isInternship ? 'Internship application' : 'Supplier profile'
    const body = `${subject} from ${name}\n\nPortfolio / profile: ${link}`
    window.location.href = `mailto:info@mbdesigns.design?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }
  return (
    <div className="career-dialog-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <Container as="section" size="narrow" className="career-dialog" role="dialog" aria-modal="true" aria-labelledby="career-dialog-title">
        <button className="career-dialog-close" type="button" onClick={onClose} aria-label="Close application form">×</button>
        <p>{isInternship ? 'INTERNSHIPS' : 'SUPPLIERS'}</p>
        <h2 id="career-dialog-title">{isInternship ? 'START YOUR JOURNEY' : 'WORK WITH MB DESIGNS'}</h2>
        <form onSubmit={submit}>
          <label>NAME / COMPANY<input name="name" required autoFocus /></label>
          <label>EMAIL<input name="email" type="email" required /></label>
          <label>{isInternship ? 'CV / PORTFOLIO LINK' : 'PROFILE / CATALOGUE LINK'}<input name="link" type="url" placeholder="https://" required /></label>
          <button type="submit">CONTINUE BY EMAIL ↗</button>
        </form>
      </Container>
    </div>
  )
}
