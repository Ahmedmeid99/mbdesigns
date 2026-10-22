import { createFileRoute, Link } from '@tanstack/react-router'
import { useEffect, useRef, useState } from 'react'
import { PortfolioHeader } from '../components/PortfolioChrome'

type ImageSource = readonly [string, 'jpg' | 'jpeg' | 'png']
const wixImage = (id: string, extension: ImageSource[1], width = 1800, height = 1200) => `https://static.wixstatic.com/media/${id}~mv2.${extension}/v1/fill/w_${width},h_${height},al_c,q_90,enc_auto/events.webp`
const heroImage = wixImage('beb217_a1ad0c8b264f477b9b0456fc974ad4bf', 'jpg', 2400, 1450)
const headerLogo = wixImage('beb217_7045e1c98fe7473e9c71b4cf8a4e6050', 'png', 600, 180)
const eventLogo = wixImage('beb217_f05ef094d6db4bbcb6bdb74b21cd6c81', 'png', 700, 260)
const glcLogo = wixImage('beb217_e523d46e31884908b49e647d3154989e', 'png', 700, 260)
const arrivalMark = wixImage('beb217_183a13d9ed494981b8b52fc1eb2ec9a1', 'jpg', 420, 180)
const contactImage = wixImage('beb217_c8d6b2aff1e04d3aaefbe1525d64f982', 'jpg', 1700, 950)

const design2026 = [
  ['beb217_ff8f9ee68ec94188b960eb61b12c037f', 'png'], ['beb217_f5fd7dc5fee7480da3819221a205fc91', 'png'],
  ['beb217_e587f26ac9f146f1abd46afb67e2cfc6', 'png'], ['beb217_a902d177a05649498c9b65f3e599e31a', 'png'],
  ['beb217_e2dea30d141141159c9bc6c3d19ba98e', 'png'], ['beb217_0ffe92c1206648e882194391f2b42dcf', 'png'],
  ['beb217_fe56de7ceaa14bb1b294cd9186757140', 'png'], ['beb217_397eeb69429d4bce96fff700597bdf0c', 'png'],
  ['beb217_1bcac1cfff9347149cfbefa9e639f46b', 'png'], ['beb217_5db93bbd552e44698cfd5a772d6f9183', 'png'],
  ['beb217_9f177f88ad594f2ea2a50c6a9f49878e', 'png'], ['beb217_9a33fbc30e114ded9ef1e04780b51648', 'png'],
  ['beb217_c3d32d98753e44798eefc88241d2d74c', 'png'],
] as const satisfies readonly ImageSource[]
const repeatedConcept2026 = [design2026[7], design2026[8], design2026[9], design2026[10], design2026[11]] as const
const reality2026 = [
  ['beb217_b879358db7a34b1299084c09cf0898dc', 'jpg'], ['beb217_85f3e0bdc1284116991f5604e81e97f4', 'jpg'],
  ['beb217_b824a1ec4e23488b89a7169f6412a6cc', 'jpeg'], ['beb217_21fa7c5fc006400ab1a6a3f18be9dca6', 'jpg'],
  ['beb217_74325a5ae54248bfa7e1baa1fef733f1', 'jpg'], ['beb217_57ef02651b30454b8cf74a66029eaa09', 'jpg'],
  ['beb217_03638fb4d50f4f1ab46ca3ac2046eda2', 'jpg'], ['beb217_9cc1a425c6784227b35d05fde3f968d3', 'jpg'],
  ['beb217_3a4792f5f6354d17837ec94597c2ed42', 'jpg'], ['beb217_916341007c1b4f5db717f4024749b93c', 'jpg'],
  ['beb217_c51a7c405ee0424dbd7cdd874d4d6ece', 'jpg'], ['beb217_2867b7b71b2541f2b5d4d9d5e8adfd66', 'jpg'],
] as const satisfies readonly ImageSource[]
const innerPeace = [
  ['beb217_b74163c970034fbc9dade9d5dd6d01f2', 'jpeg'], ['beb217_a1ea2c9219c243ceb67917f000e1bcae', 'jpeg'],
  ['beb217_f607e907b1b1473fb89a6ed49d11a022', 'jpg'], ['beb217_8dce4efe9c2e4dd58c5a96678bdc21ab', 'jpg'],
  ['beb217_2cf12b8cc940476b8272bbbec268fefc', 'jpg'], ['beb217_048fee1417664850b12566769dd6c6d8', 'jpg'],
  ['beb217_1ff9aeb4eb4d480db0d0562c470db3a0', 'jpeg'],
] as const satisfies readonly ImageSource[]
const glc2019 = [
  ['beb217_f49bc0542fcf46ccad19f3606e0c9f4e', 'jpg'], ['beb217_1fdf3033938842d0965e7cc48a86343c', 'jpg'], ['beb217_b477cd730c344367873ba2c23d588a40', 'jpg'],
  ['beb217_c4ca2565ab644d4eae1d2f46003ee645', 'jpg'], ['beb217_1a9efd3b9bfb4b77a43c8f619c9bd968', 'jpg'], ['beb217_d7141e4ca5fb4e31b8dedefe93d25c16', 'jpg'],
  ['beb217_6714c028c9154eac8f3eb74b5d86c334', 'jpg'], ['beb217_e1263e5fcc8343b0a774481b24831655', 'jpg'], ['beb217_221a9102c19a4781a802845fb5c311d8', 'jpg'],
  ['beb217_a16b1511cd574f24a3c7626598f854ae', 'jpg'], ['beb217_f0b64aac17884b0e94b308654766a2f5', 'jpg'], ['beb217_da7414b1c7c64915a899b33dc40d0222', 'jpg'],
] as const satisfies readonly ImageSource[]
const insights2025 = [
  ['beb217_bc1e547ecb9e48e683764c8eb0c4e9b7', 'jpeg'], ['beb217_d980de241ea449719879e8bdcb7a2bfb', 'jpg'],
  ['beb217_29213082016e4396b03cd0f1c79e51c4', 'jpeg'], ['beb217_d1d6f4e990a34e1d9ec21bad66009142', 'jpeg'],
] as const satisfies readonly ImageSource[]
const meuble2019 = [
  ['beb217_59213134a7c94ff2be83fdfac7156ad3', 'jpg'], ['beb217_0c63fd5d88d04f9599caf457eadcd2ec', 'jpeg'], ['beb217_194141831f5d4b6aafca8f902afbb577', 'jpg'],
  ['beb217_b43e0a5afd0e4517bf5184e48b4d759c', 'jpeg'], ['beb217_038832842e45439f9488a93d781870c3', 'jpeg'], ['beb217_7ff62c309dbe472cbdb7a317f8b99f1a', 'jpg'],
  ['beb217_6cfef1002d6f4796b44c67395c1f9df0', 'jpeg'], ['beb217_268ffe30d4484a1f918fd56eac91e137', 'jpeg'],
] as const satisfies readonly ImageSource[]
const meuble2018 = [
  ['beb217_73b7d050bcf342368c7d5eb232917367', 'jpg'], ['beb217_b52d632fc11d440b95e82f435911df6e', 'jpg'], ['beb217_bb1a8727df6742c1886cc6398a715cfd', 'jpg'],
  ['beb217_c402dd330eec4d989d695fc5eb606fee', 'jpg'], ['beb217_54d3e89259b247c7aeb9841e3074b540', 'jpg'], ['beb217_55166f4de8654d2c901bebcc1d171414', 'jpg'],
  ['beb217_b2675f7d494d4cd196cf08ce188ff9fb', 'jpg'], ['beb217_22cb8a1cef014f189f484ed2430f427f', 'jpg'], ['beb217_25242dff63134a54a09aef243f0a89bf', 'jpg'],
  ['beb217_b346ab143d1d42afba32d5bfdfce4e17', 'jpg'], ['beb217_363b785aed074b78ae5a30cb943619c1', 'jpg'],
] as const satisfies readonly ImageSource[]
const meuble2018Design = [
  ['beb217_4814f3643fff4bc591b4f8c9c0aa6776', 'png'], ['beb217_58b08467d3e44156ad285a743b35fe2e', 'jpg'], ['beb217_7b2bf4186ed943c893d8e65d7dd1af6d', 'jpg'],
  ['beb217_d2d4f72ab0454a088e21a00efc33f56f', 'jpg'], ['beb217_f6e7eabf2d87483ba7ce133faff05b06', 'jpg'], ['beb217_39c86ba307414efab54592aa43d18130', 'jpg'],
] as const satisfies readonly ImageSource[]
const glc2018 = [
  ['beb217_78ef498d6b034b96a55e23bb2abbdc61', 'jpg'], ['beb217_0ae48e9f3a4945fea007bd4d7321b4cd', 'jpg'], ['beb217_efca68caa4fe4f9b930fcb3dd51e1eb7', 'jpg'],
  ['beb217_7abc4521be2047c296df3d3880b4ce0d', 'jpg'], ['beb217_80a5556c4f454684ad7561e03b173acc', 'jpg'], ['beb217_b53eed5e20444b7485daeda30ccfcd21', 'jpg'],
  meuble2018Design[3], meuble2018Design[4], meuble2018Design[5],
] as const satisfies readonly ImageSource[]
const videos = [
  'https://video.wixstatic.com/video/beb217_00da508f1c484ac0812c773af85a35ba/720p/mp4/file.mp4',
  'https://video.wixstatic.com/video/beb217_b930394e98684bdeaf928241adcb3902/720p/mp4/file.mp4',
  'https://video.wixstatic.com/video/beb217_8b710c48138d4392b674beb112008e51/720p/mp4/file.mp4',
] as const
const videoPosters = [
  wixImage('beb217_00da508f1c484ac0812c773af85a35baf000', 'jpg', 720, 1080),
  wixImage('beb217_b930394e98684bdeaf928241adcb3902f000', 'jpg', 720, 1080),
  wixImage('beb217_8b710c48138d4392b674beb112008e51f000', 'jpg', 720, 1080),
] as const

export const Route = createFileRoute('/events-press')({ head: () => ({ meta: [{ title: 'Events / Press | MB Designs' }, { name: 'description', content: 'MB Designs events, collaborations and press.' }], links: [{ rel: 'preload', as: 'image', href: heroImage }] }), component: EventsPressPage })

function EventsPressPage() {
  const [ready, setReady] = useState(false)
  const pageRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const timer = window.setTimeout(() => setReady(true), 80)
    const root = pageRef.current
    if (!root) return () => window.clearTimeout(timer)
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target) } }), { rootMargin: '0px 0px -7% 0px', threshold: 0.06 })
    root.querySelectorAll('[data-reveal]').forEach((item) => observer.observe(item))
    return () => { window.clearTimeout(timer); observer.disconnect() }
  }, [])
  return <div ref={pageRef} className={ready ? 'events-site is-ready' : 'events-site'}>
    <PortfolioHeader current="events" className="events-header" logoImage={headerLogo} />
    <main id="top">
      <section className="events-hero"><img src={heroImage} alt="MB Designs event gathering" width="2400" height="1450" fetchPriority="high" /><div className="events-hero-shade" /><div className="events-hero-copy"><h1>THE STORY OF MB DESIGNS<br />IS WRITTEN THROUGH THE MOMENTS<br />WE SHARE</h1><p>OUR EVENTS CAPTURE THE PEOPLE, CONVERSATIONS, AND MILESTONES THAT DRIVE OUR WORK.<br />EVERY GATHERING IS AN OPPORTUNITY TO LEARN, COLLABORATE, AND CELEBRATE<br />THE CREATIVE PROCESS BEHIND EVERY SPACE WE DESIGN.</p></div></section>
      <EventIntro title="OUR CONCEPT" event="TDS" year="2026" collaboration="MB DESIGNS X MEUBLE EL CHARK" kicker="/A SENSE OF ARRIVAL" mark={arrivalMark} paragraphs={['HOSPITALITY BEGINS WITH A FEELING — THE WARMTH OF BEING WELCOMED, THE COMFORT OF BELONGING, AND THE BEAUTY OF A SPACE THAT FEELS LIKE HOME.', 'THE BOOTH UNFOLDS AS A JOURNEY THROUGH A BOUTIQUE HOTEL, WHERE EACH SPACE REVEALS A DISTINCT MOOD WHILE REMAINING PART OF ONE COHESIVE EXPERIENCE.', 'REFINED FURNITURE, RICH MATERIALS, AND ARCHITECTURAL SIMPLICITY COME TOGETHER TO CREATE A SENSE OF ARRIVAL THAT IS BOTH MEMORABLE AND DEEPLY PERSONAL.']} />
      <EditorialGallery eyebrow="/ 3D BOOTH DESIGN" title="DESIGN EVOLUTION" images={design2026.slice(0, 2)} layout="pair-asym" />
      <EditorialGallery title="THE VISION BEFORE REALITY" images={design2026.slice(2)} layout="vision" />
      <CopyPair kicker="/A LIVED HOSPITALITY EXPERIENCE" paragraphs={['THE JOURNEY DEEPENS INTO A SIGNATURE LEVANTINE RESTAURANT, WHERE HISTORY, CRAFT, CARVED WOOD, AND ARTISAN FINISHES BRING HERITAGE TO LIFE.', 'THE SPACE HONORS THE MEMORY OF AHMED HELMY, ENSURING THAT HIS PASSION CONTINUES TO SHAPE HOSPITALITY DESIGN TODAY.']} />
      <section className="events-video-section"><h2 data-reveal>THE JOURNEY BEHIND THE<br />EXPERIENCE</h2><div className="events-video-grid" data-reveal>{videos.map((video, index) => <video key={video} src={video} poster={videoPosters[index]} aria-label={`MB Designs event film ${index + 1}`} autoPlay muted loop playsInline preload="metadata" />)}</div></section>
      <CopyPair className="legacy-copy" kicker="/A LEGACY OF CRAFTSMANSHIP" paragraphs={['BESPOKE TABLEWARE, DELICATE ACCESSORIES, AND A SIGNATURE SCENT ELEVATE THE SENSES, TRANSFORMING THE BOOTH FROM A DISPLAY INTO A LIVED EXPERIENCE.', 'IT IS A JOURNEY INTO THE ART OF HOSPITALITY — WHERE DESIGN BECOMES MEMORY AND FURNITURE BECOMES PART OF LIFE’S MOST MEANINGFUL MOMENTS.']} />
      <EditorialGallery title="FROM VISION TO REALITY" images={reality2026} layout="reality12" />
      <EditorialGallery images={repeatedConcept2026} layout="repeat5" />
      <EventIntro title="DESIGN CONCEPT" event="TDS" year="2023" collaboration="MB DESIGNS X MOHM X AUREA" kicker="/DISCOVER YOUR INNER PEACE" paragraphs={['PEACE IS AN ESSENTIAL ELEMENT IN ART AND LIFE. IT IS THE QUIET FORCE THAT ALLOWS US TO REFLECT, CREATE, AND CONNECT WITH THE WORLD AROUND US.', 'THREE CREATIVE FORCES COME TOGETHER TO ENVISION A PRESENT AND FUTURE GROUNDED IN TRANQUILITY, SERENITY, AND INNER PEACE.', 'THE DESIGN INVITES VISITORS TO PAUSE AND EXPERIENCE A JOURNEY THROUGH COLOR, MATERIAL, TEXTURE, LIGHT, AND SOUND.', 'RHYTHMIC COLOR AND NATURAL MATERIALS BUILD A TACTILE LANDSCAPE THAT FEELS BOTH IMMERSIVE AND RESTORATIVE.', 'EACH ELEMENT IS PLACED TO CREATE BALANCE, ENCOURAGING A CALM CONNECTION BETWEEN OURSELVES AND THE INTERIORS WE INHABIT.', 'THE RESULT IS A SHARED SANCTUARY — A PLACE TO DISCOVER THE QUIET POWER OF DESIGN.']} />
      <EditorialGallery images={innerPeace} layout="seven" />
      <EventIntro title="DESIGN CONCEPT" event="TDS" year="2019" collaboration="MB DESIGN X GLC" kicker="/DISCOVER YOUR INNER PEACE" paragraphs={['AN OPEN, IMMERSIVE DESIGN ENVIRONMENT BRINGS COLLABORATION, DISPLAY, AND SOCIAL INTERACTION TOGETHER WITHIN ONE COHESIVE SPACE.', 'AN EXPOSED BLACK METAL FRAMEWORK IS BALANCED BY WARM TIMBER, NEUTRAL FINISHES, SOFT UPHOLSTERY, AND CURATED ACCENTS.', 'THE EXPERIENCE BLURS THE BOUNDARY BETWEEN AN EXHIBITION BOOTH AND A LIVED INTERIOR, INVITING PEOPLE TO GATHER, EXPLORE, AND CONNECT.']} />
      <EditorialGallery eyebrow="/ 3D CONCEPT DESIGN" title="DESIGN EVOLUTION" images={glc2019.slice(0, 3)} layout="three" />
      <EditorialGallery title="FROM VISION TO REALITY" images={glc2019.slice(3)} layout="nine" />
      <section className="event-title-card" data-reveal><img src={eventLogo} alt="MB Designs" /><div><h2>CREATIVE INSIGHTS TALK</h2><p>2025</p></div></section>
      <EditorialGallery images={insights2025} layout="four" />
      <EventIntro title="DESIGN CONCEPT" event="MB DESIGNS X MEUBLE EL CHARK" year="2019" collaboration="" kicker="/BOOTH 1 — TIMELESS EXPRESSION" logo={eventLogo} paragraphs={['A REFINED INTERPRETATION OF TIMELESS DESIGN, WHERE CLASSIC PROPORTIONS MEET CONTEMPORARY DETAILING. WARM TIMBER, GEOMETRIC SCREENS, AND GREENERY CREATE AN ELEGANT, INVITING SETTING.', 'THE COMPOSITION FOCUSES ON BALANCE, CRAFTSMANSHIP, AND ENDURING MATERIALS THAT REMAIN RELEVANT BEYOND CHANGING TRENDS.']} />
      <EditorialGallery images={meuble2019.slice(0, 3)} layout="three" />
      <CopyPair className="compact-copy" kicker="/BOOTH 2 — BOLD GEOMETRIC EXPRESSION" paragraphs={['MONOCHROME GEOMETRY, RICH UPHOLSTERY, NATURAL MATERIALS, AND SCULPTURAL FURNITURE CREATE A DISTINCT CONTEMPORARY SETTING.']} />
      <EditorialGallery images={meuble2019.slice(3, 6)} layout="three" />
      <CopyPair className="compact-copy" kicker="/BOOTH 03 — SCULPTURAL GEOMETRY" paragraphs={['FORM, REPETITION, TEXTURE, AND ORGANIC FURNITURE BALANCE BOLD GEOMETRY WITH NATURAL ELEMENTS.']} />
      <EditorialGallery images={meuble2019.slice(6)} layout="stacked" />
      <EventIntro title="DESIGN CONCEPT" event="MB DESIGNS X MEUBLE EL CHARK" year="2018" collaboration="" kicker="/DESIGN IS SO SIMPLE — THAT’S WHY IT’S COMPLICATED" logo={eventLogo} paragraphs={['THE INSTALLATION EXPRESSES A BROADER PHILOSOPHY: DESIGN IS PRESENT IN THE OBJECTS WE USE, THE MATERIALS THAT SURROUND US, AND THE SPACES WE EXPERIENCE EVERY DAY.', 'BY REIMAGINING AN ORDINARY OBJECT AS ARCHITECTURE, THE FAMILIAR IS TRANSFORMED THROUGH CREATIVITY, FUNCTION, AND UNEXPECTED EXPRESSION.']} />
      <EditorialGallery title="FROM VISION TO REALITY" images={meuble2018} layout="eleven" />
      <EditorialGallery images={meuble2018Design} layout="six" />
      <EventIntro title="DESIGN CONCEPT" event="MB DESIGNS X GLC PAINTS" year="2018" collaboration="" kicker="/DESIGN IS SO SIMPLE — THAT’S WHY IT’S COMPLICATED" logo={glcLogo} paragraphs={['A PLAYFUL ARCHITECTURAL LANGUAGE TURNS EVERYDAY FORMS INTO A VIVID DESIGN EXPERIENCE, CELEBRATING COLOR, SCALE, AND MOVEMENT.', 'THE RESULT REFLECTS MOHAMED BADR’S APPROACH TO DESIGN AS A CONTINUOUS PART OF DAILY LIFE.']} />
      <EditorialGallery images={glc2018} layout="late-nine" />
      <section className="press-hero" data-reveal><img src={wixImage('beb217_f6d401a6b8744e12b88e9b766c9c4247', 'jpg', 2400, 900)} alt="Architectural project featured in the press" width="2400" height="900" loading="lazy" decoding="async" /><h2>WHERE OUR WORK<br />MAKES HEADLINES</h2></section>
      <section className="press-releases"><h2 data-reveal>PRESS RELEASES</h2><p data-reveal>OUR PRESS RELEASES HIGHLIGHT THE LATEST ANNOUNCEMENTS, MILESTONES, COLLABORATIONS, AND ACHIEVEMENTS AT MB DESIGNS. FOLLOW THE STORIES BEHIND OUR PROJECTS AND THE MOMENTS THAT CONTINUE TO SHAPE OUR VISION.</p><div className="press-logo-grid" data-reveal>{([['beb217_9cfecee13beb4fada02a2abdec2c91d1', 'png'], ['beb217_9c850e9ad2bf4a95a689207e58a71bbc', 'png'], ['beb217_16d4edd124b94d41a30178c2d27306b4', 'png'], ['beb217_8f6a962789714c48b5a8162d7c5b59ff', 'jpg'], ['beb217_f202f7e7d7ad4df0ac2aa3c67f0007df', 'jpg']] as const).map(([id, extension], index) => <img key={id} src={wixImage(id, extension, 700, 300)} alt={`Press publication ${index + 1}`} loading="lazy" />)}</div><div className="press-arrows" aria-hidden="true"><span>←</span><span>→</span></div></section>
    </main>
    <EventsFooter />
  </div>
}

function EventIntro({ title, event, year, collaboration, kicker, paragraphs, mark, logo }: { title: string; event: string; year: string; collaboration: string; kicker: string; paragraphs: readonly string[]; mark?: string; logo?: string }) {
  return <section className="event-intro" data-reveal>{logo && <img className="event-section-logo" src={logo} alt="Event partner" />}<div className="event-intro-title"><div><span>{event}</span><small>{year}</small></div><h2>{title}</h2></div><div className="event-intro-copy"><div className="event-intro-meta">{collaboration && <b>{collaboration}</b>}<span>{kicker}</span>{mark && <img className="event-arrival-mark" src={mark} alt="A sense of arrival" />}</div><div>{paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div></section>
}
function CopyPair({ kicker, paragraphs, className = '' }: { kicker: string; paragraphs: readonly string[]; className?: string }) { return <section className={`events-copy-pair ${className}`} data-reveal><div><span>{kicker}</span></div><div>{paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></section> }
type GalleryLayout = 'pair-asym' | 'vision' | 'reality12' | 'repeat5' | 'seven' | 'three' | 'nine' | 'four' | 'stacked' | 'eleven' | 'six' | 'late-nine'
function EditorialGallery({ eyebrow, title, images, layout }: { eyebrow?: string; title?: string; images: readonly ImageSource[]; layout: GalleryLayout }) { return <section className={`event-gallery event-layout-${layout}`}>{(eyebrow || title) && <header data-reveal>{eyebrow && <p>{eyebrow}</p>}{title && <h2>{title}</h2>}</header>}<div className="event-gallery-grid">{images.map(([id, extension], index) => <figure key={`${id}-${index}`} data-reveal><img src={wixImage(id, extension, 2000, 1300)} alt="MB Designs event installation" width="2000" height="1300" loading="lazy" decoding="async" /></figure>)}</div></section> }
function EventsFooter() { return <footer className="events-footer"><div className="events-footer-top"><img src={contactImage} alt="MB Designs studio interior" loading="lazy" /><div><p>START A PROJECT WITH US</p><h2>LET’S CREATE<br />SOMETHING<br />TIMELESS</h2><a href="mailto:info@mb-designs.com">INFO@MB-DESIGNS.COM</a></div></div><div className="events-footer-links"><Link to="/">HOME</Link><Link to="/about">ABOUT</Link><Link to="/projects">PROJECTS</Link><Link to="/team">TEAM</Link><Link to="/events-press">EVENTS / PRESS</Link><span>CAIRO, EGYPT</span></div><div className="events-footer-bottom"><span>© 2035 BY ELITE ARCHITECTURE. BUILT ON WIX STUDIO.</span><a href="#top">BACK TO TOP ↑</a></div></footer> }
