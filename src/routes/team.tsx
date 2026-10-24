import { createFileRoute } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { Container } from '../components/Container'
import { PortfolioHeader } from '../components/PortfolioChrome'

const heroImage = '/assets/images/team/hero.webp'

const portrait = (source: string, _extension: 'jpg' | 'png', _focalPoint = '0.50_0.50') => `/assets/images/team/${source}.webp`

const teamMembers = [
  { name: 'MOHAMED BADR', role: 'FOUNDER & CHIEF DESIGNER', image: portrait('beb217_a18c866788764b2aa7716b963dc5dba0', 'png', '0.48_0.26') },
  { name: 'GHADA YOUSSEF', role: 'OFFICE MANAGER/HR ADMIN', image: portrait('beb217_673aa22389e6474f8db5688f33486883', 'png', '0.51_0.30') },
  { name: 'MINA GEORGE', role: 'TECHNICAL OFFICE MANAGER', image: portrait('beb217_77e11df7414a4e85b783ad1eb2cce304', 'png', '0.47_0.26') },
  { name: 'HUSSAM ZINAL', role: 'SENIOR ID/TECHNICAL OFFICE MANAGER', image: portrait('beb217_cf520a2ae1e04e5c863bc1b7e7e05264', 'png', '0.49_0.30') },
  { name: 'FARAH ELSAYAAD', role: 'GRAPHIC DESIGNER /SOCIAL MEDIA SPECIALIST', image: portrait('beb217_a0fe1f6bb9434049a451d4043944c0af', 'jpg') },
  { name: 'MALAK HANY', role: 'ARCHITECT', image: portrait('beb217_c013fdebae4d453aa8dba3a8ce5d04dd', 'jpg') },
  { name: 'ALIA MOENES', role: 'CREATIVE INTERIOR DESIGNER', image: portrait('beb217_b917b169af25485dbb289d10bf91678f', 'png') },
  { name: 'VERINA EHAB', role: 'ARCHITECT/INTERIOR DESIGNER', image: portrait('beb217_c807b15d57c64e93b66259082e52b37d', 'png') },
  { name: 'MALAK IBRAHIM', role: 'CREATIVE INTERIOR DESIGNER', image: portrait('beb217_ca525c95ef5e4e7891e735e0e4290bb0', 'png') },
  { name: 'JANA MAGDY', role: 'JUNIOR INTERIOR DESIGNER', image: portrait('beb217_574179661cda4166846821034181c8f6', 'jpg') },
  { name: 'HODA HANY', role: 'JUNIOR INTERIOR DESIGNER', image: portrait('beb217_95bcd09f4f454cb7aa61709b78bf882f', 'png', '0.47_0.25') },
  { name: 'FARIDA SARHAN', role: 'CREATIVE INTERIOR DESIGNER', image: portrait('beb217_57c64eda3aaa4dd3b4bd1699ad998342', 'png', '0.51_0.27') },
  { name: 'YOUSSEF SEDKI', role: 'INTERIOR DESIGNER/VISUALIZER', image: portrait('beb217_d45cfc1ed88c461f84e3faa80e95b2c4', 'png', '0.50_0.23') },
  { name: 'MOHAMED GRISHA', role: 'ACCOUNTING MANAGER', image: portrait('beb217_0674141c74fb47fdbc40039292cd986d', 'png') },
  { name: 'AHMED SAMIR', role: 'PROJECT MANAGER', image: portrait('beb217_3c68b41008a4482f98d6c70dad116d3a', 'png', '0.54_0.24') },
  { name: 'IBRAHIM HOSNY', role: 'DOCUMENT CONTROLLER', image: portrait('beb217_e3483e462607491db7b67490a5ac2fe3', 'png') },
  { name: 'MOHAMED SAYED', role: 'DOCUMENT CONTROLLER', image: portrait('beb217_d0c7a134dc3e49dda3106599a1ec7977', 'jpg') },
  { name: 'AHMED METWALY', role: 'DOCUMENT CONTROLLER', image: portrait('beb217_66039c4cb57d43b9b272203be05c81e9', 'png', '0.53_0.22') },
] as const

export const Route = createFileRoute('/team')({
  head: () => ({
    meta: [
      { title: 'Team | MB Designs' },
      { name: 'description', content: 'Meet the architects, interior designers and project specialists behind MB Designs.' },
    ],
    links: [{ rel: 'preload', as: 'image', href: heroImage }],
  }),
  component: TeamPage,
})

function TeamPage() {
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
    return () => {
      window.clearTimeout(timer)
      observer.disconnect()
    }
  }, [])

  return (
    <div ref={pageRef} className={ready ? 'team-site is-ready' : 'team-site'}>
      <PortfolioHeader current="team" className="team-header" />
      <main id="top">
        <Container as="section" className="team-hero" aria-label="MB Designs team" fluid>
          <img src={heroImage} alt="MB Designs team in motion" width="2400" height="1200" fetchPriority="high" />
          <h1>BEHIND EVERY<br />DETAIL IS A DEDICATED TEAM</h1>
        </Container>

        <Container as="section" className="team-roster" aria-labelledby="team-roster-title">
          <h2 id="team-roster-title" data-reveal>MEET THE TEAM</h2>
          <div className="team-grid">
            {teamMembers.map((member, index) => (
              <article
                className="team-card"
                key={member.name}
                data-reveal
                style={{ '--delay': `${(index % 4) * 75}ms` } as React.CSSProperties}
              >
                <div className="team-portrait">
                  <img
                    src={member.image}
                    alt={member.name}
                    width="900"
                    height="1040"
                    loading={index < 4 ? 'eager' : 'lazy'}
                    decoding="async"
                  />
                </div>
                <h3>{member.name}</h3>
                <p>{member.role}</p>
              </article>
            ))}
          </div>
        </Container>
      </main>
    </div>
  )
}
