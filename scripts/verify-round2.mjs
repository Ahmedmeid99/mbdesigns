import { existsSync, readFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

const root = new URL('../', import.meta.url)
const read = (path) => readFileSync(new URL(path, root), 'utf8')
const ensure = (condition, message) => {
  if (!condition) throw new Error(message)
}
const includesAll = (source, values, label) => values.forEach((value) => ensure(source.includes(value), `${label}: missing ${value}`))

const checks = {
  global() {
    const styles = read('src/styles.css')
    const routes = [read('src/routes/awards.tsx'), read('src/routes/team.tsx'), read('src/routes/projects.index.tsx'), read('src/routes/career.tsx')]
    const sharedHeroRoutes = [
      read('src/routes/about.tsx'),
      read('src/routes/events-press.tsx'),
      read('src/routes/projects.$category.index.tsx'),
      read('src/routes/projects.$category.$project.tsx'),
    ]
    const heroComponent = read('src/components/PageHeroCopy.tsx')
    ensure(styles.includes('.site-page-hero .site-page-hero__title em'), 'shared editorial title treatment is missing')
    ensure(routes.every((route) => route.includes('<em>')), 'a main page hero is missing the modern-plus-serif title treatment')
    ensure(heroComponent.includes('export function EditorialTitle'), 'reusable editorial title helper is missing')
    ensure(sharedHeroRoutes.every((route) => route.includes('<EditorialTitle')), 'an interior page hero is missing the shared editorial title treatment')
    ensure(styles.includes('padding-inline: max(var(--container-gutter), 2.25vw)'), 'reduced shared project bleed is missing')
    console.log('round2 global verification passed')
  },
  home() {
    const home = read('src/routes/index.tsx')
    const footer = read('src/components/SiteFooter.tsx')
    includesAll(home, ['to="/team"', 'className="home-markets', 'CAIRO', 'DUBAI', 'RIYADH', 'ATHENS', 'EGYPT', 'UNITED ARAB EMIRATES', 'SAUDI ARABIA', 'GREECE', 'FOUNDING STUDIO', 'REGIONAL OFFICE', 'PROJECT MARKET', '/assets/images/world-map-neutral.png', 'home-market-pins', 'ACTIVE LOCATION', 'home-sector-tabs', 'home-sector-tab-copy', 'aria-hidden={activeSector !== index}'], 'home')
    includesAll(footer, ['Salah ElDeen Fadel Street', 'href="tel:+201003003797"', 'site-footer-map-link'], 'footer')
    ensure(footer.indexOf('href="tel:+201003003797"') < footer.indexOf('site-footer-map-link'), 'phone must precede map link')
    console.log('round2 home verification passed')
  },
  awards() {
    const awards = read('src/routes/awards.tsx')
    const styles = read('src/styles.css')
    includesAll(awards, ['featuredStudioProjects', 'D STORE', "sector: 'RETAIL & COMMERCIAL'", 'PROPERTY FINDER', "sector: 'CORPORATE'", 'ONE OAK RESTAURANT', 'KMK RESIDENCE, DUBAI', 'BEST LUXURY INTERIOR DESIGN STUDIO AWARDS', 'certificateSets[0]', 'certificateSets[1]', 'certificateSets[2]', '[1, 2, 3, 4]', 'featured-award-collage'], 'awards')
    ensure(awards.indexOf('certificateSets[0]') < awards.indexOf('{awardEntries.map'), 'African certificates must precede their projects')
    includesAll(styles, ['.certificate-row__media .award-focus-trigger', 'object-fit: contain', '.featured-award-collage'], 'awards styles')
    console.log('round2 awards verification passed')
  },
  async 'awards-crops'() {
    const styles = read('src/styles.css')
    const awards = read('src/routes/awards.tsx')
    const pairs = [
      ['.media-upgrade/images/award-nuwa-source.jpg', 'public/assets/images/award-nuwa.webp'],
      ['.media-upgrade/images/award-villa-source.jpg', 'public/assets/images/award-villa.webp'],
    ]
    for (const [sourcePath, outputPath] of pairs) {
      const sourceMeta = await sharp(fileURLToPath(new URL(sourcePath, root))).metadata()
      const outputMeta = await sharp(fileURLToPath(new URL(outputPath, root))).metadata()
      ensure(sourceMeta.width && sourceMeta.height && outputMeta.width && outputMeta.height, `missing image dimensions for ${outputPath}`)
      const sourceRatio = sourceMeta.width / sourceMeta.height
      const outputRatio = outputMeta.width / outputMeta.height
      ensure(Math.abs(sourceRatio - outputRatio) < 0.002, `${outputPath} changes the source ratio and can crop award marks`)
      ensure(outputMeta.width >= 1600, `${outputPath} is below the required output width`)
    }
    includesAll(awards, ["image: '/assets/images/award-nuwa.webp'", "image: '/assets/images/award-villa.webp'"], 'award project images')
    ensure(/\.editorial-award > \.award-focus-trigger img[^}]*object-fit: contain/s.test(styles), 'award project images must use contain')
    console.log('round2 awards crop verification passed')
  },
  'projects-index'() {
    const projects = read('src/routes/projects.index.tsx')
    const styles = read('src/styles.css')
    ensure(projects.includes('EXPLORE OUR ARCHITECTURE AND INTERIOR PROJECTS.'), 'revised projects subtitle missing')
    ensure(!projects.includes('project-category-count'), 'project counts must be removed')
    includesAll(styles, ['grid-template-columns: repeat(3, minmax(0, 1fr))', '.project-category-image { aspect-ratio: 1;', 'white-space: nowrap'], 'projects index styles')
    console.log('round2 projects index verification passed')
  },
  'project-details'() {
    const route = read('src/routes/projects.$category.$project.tsx')
    const category = read('src/routes/projects.$category.index.tsx')
    const styles = read('src/styles.css')
    includesAll(route, ['single-project-intro', 'LOCATION', 'SPACE', 'SCOPE OF WORK', '<figure data-reveal'], 'project detail')
    ensure(!route.includes('setActiveImageIndex'), 'project gallery zoom/lightbox remains')
    ensure(category.includes('detail-project-grid'), 'sector project grid missing')
    includesAll(styles, ['aspect-ratio: 16 / 10', '.detail-project-action { display: none;', '.single-project-gallery figure'], 'project styles')
    console.log('round2 project detail verification passed')
  },
  'project-content'() {
    const data = read('src/portfolio-data.ts')
    const property = data.indexOf("card('PROPERTY FINDER'")
    const ecolab = data.indexOf("card('ECOLAB'")
    const alshaya = data.indexOf("card('ALSHAYA GROUP'")
    const mori = data.indexOf("card('MORI INTERNATIONAL'")
    ensure(property < ecolab && ecolab < alshaya && alshaya < mori, 'corporate international-first order is incorrect')
    const teds = data.indexOf("card('TEDS'")
    const carlos = data.indexOf("card('CARLOS'")
    const sushi = data.indexOf("card('MORI SUSHI'")
    ensure(teds < carlos && carlos < sushi, 'F&B international-first order is incorrect')
    includesAll(data, ["card('ONE OAK', '/assets/images/fnb-05.webp'", "card('NUWA', '/assets/images/fnb-08.webp'", "card('CARLOS', '/assets/images/fnb-06.webp'", "card('MORI SUSHI', '/assets/images/fnb-03.webp'", 'RESTFUL STAYS', 'SHAPED BY COMFORT'], 'project content')
    console.log('round2 project content verification passed')
  },
  'project-metadata'() {
    const route = read('src/routes/projects.$category.$project.tsx')
    ensure(!route.includes('<dd>PROJECT SPECIFIC</dd>'), 'Space still contains a placeholder; verified project areas are required')
    includesAll(route, [
      "architecture: 'A CONTEXT-LED ARCHITECTURAL RESPONSE",
      "'food-and-beverage': 'A LAYERED DINING ENVIRONMENT",
      '<p>{projectDescription(detail.title, categorySlug)}</p>',
      '<dt>LOCATION</dt>',
      '<dt>SPACE</dt>',
      '<dt>SCOPE OF WORK</dt>',
      "if (category === 'corporate') return 'WORKPLACE INTERIOR DESIGN'",
      "if (category === 'residential') return 'RESIDENTIAL INTERIOR DESIGN'",
      "if (category === 'hospitality') return 'HOSPITALITY INTERIOR DESIGN'",
    ], 'project metadata')
    console.log('round2 project metadata verification passed')
  },
  team() {
    const team = read('src/routes/team.tsx')
    const styles = read('src/styles.css')
    includesAll(team, ['SITE & DOCUMENTATION TEAM', "MOHAMED SAYED', role: 'SITE SUPERVISOR", "AHMED METWALLY', role: 'SITE SUPERVISOR"], 'team')
    ensure(!team.includes("name: 'DOCUMENTS TEAM'"), 'documents team was not combined')
    ensure(styles.includes('.team-grid { grid-template-columns: repeat(5'), 'desktop portraits were not reduced')
    console.log('round2 team verification passed')
  },
  career() {
    const career = read('src/routes/career.tsx')
    includesAll(career, ['PORTFOLIO LINK', 'CV ATTACHMENT', 'COMPANY PORTFOLIO OR CATALOGUE LINK', 'REQUIRED WITH THIS EMAIL', 'START YOUR INTERNSHIP WITH MB DESIGNS'], 'career')
    ensure(!career.toUpperCase().includes('JOURNEY'), 'internship copy still contains Journey')
    console.log('round2 career verification passed')
  },
  'career-polish'() {
    const career = read('src/routes/career.tsx')
    const styles = read('src/styles.css')
    includesAll(career, ['title="INTERNSHIP"', 'subtitle="START YOUR INTERNSHIP WITH MB DESIGNS"'], 'career internship')
    ensure(!career.toUpperCase().includes('JOURNEY'), 'internship copy still contains Journey')
    ensure(/\.site-page-hero \.site-page-hero__copy \.site-page-hero__lead\s*\{[^}]*margin: var\(--space-4\) 0 0;[^}]*font-size: var\(--font-size-small\);/s.test(styles), 'desktop hero subtitle is not compact')
    ensure(/@media \(max-width: 720px\)[\s\S]*?\.site-page-hero \.site-page-hero__copy \.site-page-hero__lead\s*\{[^}]*margin-top: var\(--space-3\);[^}]*font-size: var\(--font-size-label\);/s.test(styles), 'mobile hero subtitle is not compact')
    console.log('round2 career polish verification passed')
  },
  assets() {
    const files = ['d-store', 'property-finder', 'one-oak', 'kmk-residence'].flatMap((slug) => [1, 2, 3, 4].map((index) => `public/assets/images/awards-featured/${slug}-${String(index).padStart(2, '0')}.webp`))
    files.forEach((file) => ensure(existsSync(new URL(file, root)), `missing local image ${file}`))
    const sources = ['src/routes/awards.tsx', 'src/routes/index.tsx', 'src/portfolio-data.ts'].map(read).join('\n')
    ensure(!/wixstatic|wixstudio|static\.wix/i.test(sources), 'production source still references Wix')
    console.log('round2 asset verification passed')
  },
  build() {
    const command = process.platform === 'win32' ? 'cmd.exe' : 'npm'
    const args = process.platform === 'win32' ? ['/d', '/s', '/c', 'npm run build:vercel'] : ['run', 'build:vercel']
    const result = spawnSync(command, args, { cwd: new URL('.', root), stdio: 'inherit', shell: false })
    ensure(result.status === 0, `build failed with status ${result.status}`)
    console.log('round2 build verification passed')
  },
}

const target = process.argv[2]
ensure(target && checks[target], `usage: node scripts/verify-round2.mjs <${Object.keys(checks).join('|')}>`)
await checks[target]()
