export const projectCategories = [
  { slug: 'architecture', name: 'ARCHITECTURE', image: '/assets/images/projects-architecture.webp' },
  { slug: 'corporate', name: 'CORPORATE', image: '/assets/images/projects-corporate.webp' },
  { slug: 'residential', name: 'RESIDENTIAL', image: '/assets/images/projects-residential.webp' },
  { slug: 'food-and-beverage', name: 'FOOD & BEVERAGE', image: '/assets/images/projects-fnb.webp' },
  { slug: 'retail-and-commercial', name: 'RETAIL & COMMERCIAL', image: '/assets/images/projects-retail.webp' },
  { slug: 'hospitality', name: 'HOSPITALITY', image: '/assets/images/projects-hospitality.webp' },
] as const

export const architectureProjects = [
  { name: 'CHESS FIELD', image: '/assets/images/architecture-chess.webp', shape: 'portrait' },
  { name: 'COMMERCIAL COMPLEX', image: '/assets/images/architecture-commercial.webp', shape: 'wide' },
  { name: 'MIVIDA', image: '/assets/images/architecture-mivida.webp', shape: 'medium' },
  { name: 'SHERATON BUILDING', image: '/assets/images/architecture-sheraton.webp', shape: 'portrait' },
  { name: 'PROJECT NAME', image: '/assets/images/architecture-placeholder-one.webp', shape: 'wide' },
  { name: 'PROJECT NAME', image: '/assets/images/architecture-placeholder-two.webp', shape: 'medium' },
] as const

export function getCategory(slug: string) {
  return projectCategories.find((category) => category.slug === slug) ?? projectCategories[0]
}

export function getCategoryProjects(slug: string) {
  if (slug === 'architecture') return architectureProjects

  const selected = getCategory(slug)
  return projectCategories.map((category, index) => ({
    name: index === 0 ? `${selected.name} PROJECT` : category.name,
    image: category.image,
    shape: index % 3 === 0 ? 'portrait' : index % 3 === 1 ? 'wide' : 'medium',
  }))
}
