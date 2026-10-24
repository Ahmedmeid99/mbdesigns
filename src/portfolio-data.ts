type ProjectCard = {
  name: string
  image: string
  shape: 'portrait' | 'wide' | 'medium'
  slug: string
}

type CategoryDetail = {
  hero: string
  heroLines: readonly [string, string]
  subtitle: string
  layout: 'three-standard' | 'three-compact' | 'two-tall'
  projects: readonly ProjectCard[]
}

const projectSlug = (name: string) => name
  .toLowerCase()
  .replace(/[–—]/g, '-')
  .replace(/&/g, 'and')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '')

const card = (name: string, image: string, shape: ProjectCard['shape'] = 'medium'): ProjectCard => ({
  name,
  image,
  shape,
  slug: projectSlug(name),
})

export const architectureProjects = [
  card('CHESS FIELD', '/assets/images/architecture-chess.webp', 'portrait'),
  card('COMMERCIAL COMPLEX', '/assets/images/architecture-commercial.webp', 'wide'),
  card('MIVIDA', '/assets/images/architecture-mivida.webp'),
  card('SHERATON BUILDING', '/assets/images/architecture-sheraton.webp', 'portrait'),
] as const

export const projectCategories = [
  {
    slug: 'architecture', name: 'ARCHITECTURE', image: '/assets/images/projects-architecture.webp',
    detail: {
      hero: '/assets/images/architecture-hero.webp', heroLines: ['ARCHITECTURE', 'THAT BALANCES'],
      subtitle: 'VISION, FUNCTION, AND TIMELESS DESIGN', layout: 'three-standard',
      projects: architectureProjects,
    },
  },
  {
    slug: 'corporate', name: 'CORPORATE', image: '/assets/images/projects-corporate.webp',
    detail: {
      hero: '/assets/images/projects-corporate.webp', heroLines: ['WORK ENVIRONMENTS', 'DESIGNED TO INSPIRE'],
      subtitle: 'PRODUCTIVITY, COLLABORATION, AND INNOVATION', layout: 'three-standard',
      projects: [
        card('HALWANI GROUP', '/assets/images/corporate-01.webp', 'portrait'),
        card('ARCADE', '/assets/images/corporate-02.webp', 'wide'),
        card('GTE', '/assets/images/corporate-03.webp'),
        card('MORI INTERNATIONAL', '/assets/images/corporate-04.webp', 'portrait'),
        card('TALY', '/assets/images/corporate-05.webp', 'wide'),
        card('ECOLAB', '/assets/images/corporate-06.webp'),
        card('ALSHAYA GROUP', '/assets/images/corporate-07.webp', 'portrait'),
        card('PROPERTY FINDER', '/assets/images/corporate-08.webp', 'wide'),
      ],
    },
  },
  {
    slug: 'residential', name: 'RESIDENTIAL', image: '/assets/images/projects-residential.webp',
    detail: {
      hero: '/assets/images/residential-hero.webp', heroLines: ['HOMES', 'DESIGNED TO INSPIRE'],
      subtitle: 'COMFORT, ELEGANCE, AND LASTING MEMORIES', layout: 'three-compact',
      projects: [
        card('VILLA – ALLEGRIA', '/assets/images/residential-01.webp', 'portrait'),
        card('SWANLAKE RESIDENCE 135', '/assets/images/residential-06.webp', 'wide'),
        card('PALM HILLS', '/assets/images/residential-11.webp'),
        card('NEW GIZA – VILLA', '/assets/images/residential-02.webp', 'portrait'),
        card('MOUNTAIN VIEW', '/assets/images/residential-07.webp', 'wide'),
        card('KATAMEYA HEIGHTS', '/assets/images/residential-12.webp'),
        card('MARINA VILLA', '/assets/images/residential-03.webp', 'portrait'),
        card('KATAMYA PALM HILLS', '/assets/images/residential-08.webp', 'wide'),
        card('ALMAZA BAY', '/assets/images/residential-13.webp'),
        card('KMK RESIDENCE', '/assets/images/residential-04.webp', 'portrait'),
        card('MIVIDA VILLA 129', '/assets/images/residential-09.webp', 'wide'),
        card('ZAMALEK VILLA', '/assets/images/residential-14.webp'),
        card('GRAND RESIDENCE', '/assets/images/residential-05.webp', 'portrait'),
        card('EAST TOWN DUPLEX', '/assets/images/residential-10.webp', 'wide'),
      ],
    },
  },
  {
    slug: 'food-and-beverage', name: 'FOOD & BEVERAGE', image: '/assets/images/projects-fnb.webp',
    detail: {
      hero: '/assets/images/projects-fnb.webp', heroLines: ['THOUGHTFULLY', 'CRAFTED INTERIORS'],
      subtitle: 'THAT ELEVATE EVERY CULINARY EXPERIENCE', layout: 'three-compact',
      projects: [
        card('AL DAHAN', '/assets/images/fnb-01.webp', 'portrait'),
        card('TEDS', '/assets/images/fnb-04.webp', 'wide'),
        card('OZEL', '/assets/images/fnb-07.webp'),
        card('NISANTASI', '/assets/images/fnb-02.webp', 'portrait'),
        card('NUWA', '/assets/images/fnb-05.webp', 'wide'),
        card('ONE OAK', '/assets/images/fnb-08.webp'),
        card('CARLOS', '/assets/images/fnb-03.webp', 'portrait'),
        card('MORI SUSHI', '/assets/images/fnb-06.webp', 'wide'),
      ],
    },
  },
  {
    slug: 'retail-and-commercial', name: 'RETAIL & COMMERCIAL', image: '/assets/images/projects-retail.webp',
    detail: {
      hero: '/assets/images/retail-hero.webp', heroLines: ['COMMERCIAL', 'SPACES THAT STRENGTHEN'],
      subtitle: 'BRANDS AND CONNECT WITH CUSTOMERS', layout: 'two-tall',
      projects: [
        card('RAVIN', '/assets/images/retail-01.webp', 'portrait'),
        card('IQOS', '/assets/images/retail-05.webp', 'wide'),
        card('EGO', '/assets/images/retail-02.webp', 'portrait'),
        card('D STORE', '/assets/images/retail-06.webp', 'wide'),
        card('TWINSET', '/assets/images/retail-03.webp', 'portrait'),
        card('BILLIONAIRE', '/assets/images/retail-07.webp', 'wide'),
        card('PINKO', '/assets/images/retail-04.webp', 'portrait'),
        card('ELIZABETTA FRANCHI', '/assets/images/retail-08.webp', 'wide'),
      ],
    },
  },
  {
    slug: 'hospitality', name: 'HOSPITALITY', image: '/assets/images/projects-hospitality.webp',
    detail: {
      hero: '/assets/images/hospitality-hero.webp', heroLines: ['CREATING', 'WELCOMING DESTINATIONS'],
      subtitle: 'WHERE EVERY DETAIL ENHANCES THE GUEST EXPERIENCE.', layout: 'two-tall',
      projects: [
        card('JAZZY', '/assets/images/hospitality-01.webp', 'portrait'),
        card('COURTYARD BY MARRIOTT', '/assets/images/hospitality-02.webp', 'wide'),
      ],
    },
  },
] as const satisfies ReadonlyArray<{ slug: string; name: string; image: string; detail: CategoryDetail }>

export function getCategory(slug: string) {
  return projectCategories.find((category) => category.slug === slug) ?? projectCategories[0]
}

export function getCategoryProjects(slug: string) {
  return getCategory(slug).detail.projects
}
