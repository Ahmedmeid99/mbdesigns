import { readFile, writeFile } from 'node:fs/promises'
import { resolve } from 'node:path'

const referenceOrigin = 'https://fs7836483.wixstudio.com/my-site-2'
const referenceHtml = resolve('.media-upgrade', 'reference-gte.html')
const generatedFile = resolve('src', 'project-details.generated.ts')

const parseJsonScript = (html, id) => {
  const match = html.match(new RegExp(`<script[^>]+id="${id}"[^>]*>([\\s\\S]*?)<\\/script>`))
  if (!match) throw new Error(`Missing ${id} in reference page`)
  return JSON.parse(match[1])
}

const toCategorySlug = (sector) => ({
  ARCHITECTURE: 'architecture',
  CORPORATE: 'corporate',
  RESIDENTIAL: 'residential',
  'FOOD & BEVERAGE': 'food-and-beverage',
  'RETAIL & COMMERCIAL': 'retail-and-commercial',
  HOSPITALITY: 'hospitality',
})[sector]

const toProjectSlug = (title) => title
  .toLowerCase()
  .replace(/[–—]/g, '-')
  .replace(/&/g, 'and')
  .replace(/[^a-z0-9]+/g, '-')
  .replace(/^-|-$/g, '')

const withConcurrency = async (items, limit, worker) => {
  let cursor = 0
  const runners = Array.from({ length: Math.min(limit, items.length) }, async () => {
    while (cursor < items.length) {
      const index = cursor++
      await worker(items[index], index)
    }
  })
  await Promise.all(runners)
}

const fetchText = async (url, attempts = 3) => {
  let lastError
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    try {
      const response = await fetch(url, { headers: { 'user-agent': 'Mozilla/5.0' } })
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`)
      return await response.text()
    } catch (error) {
      lastError = error
      if (attempt < attempts) await new Promise((resolvePromise) => setTimeout(resolvePromise, 750 * attempt))
    }
  }
  throw lastError
}

const seedHtml = await readFile(referenceHtml, 'utf8')
const seedWarmup = parseJsonScript(seedHtml, 'wix-warmup-data')
const recordsById = seedWarmup.appsWarmupData.dataBinding.dataStore.recordsByCollectionId.PROJECTS

const projects = Object.values(recordsById)
  .map((record) => ({
    title: record.title,
    slug: toProjectSlug(record.title),
    referencePath: record['link-projects-1-title'],
    category: toCategorySlug(record.sector),
    sector: record.sector,
    location: record.location?.formatted || record.location || '',
  }))
  .filter((project) => project.slug && project.category)
  .sort((a, b) => a.category.localeCompare(b.category) || a.title.localeCompare(b.title))

await withConcurrency(projects, 6, async (project) => {
  const html = project.slug === 'gte'
    ? seedHtml
    : await fetchText(`${referenceOrigin}${project.referencePath}?rc=FEEDBACK`)
  const warmup = parseJsonScript(html, 'wix-warmup-data')
  const updates = Object.fromEntries((warmup.platform?.ssrPropsUpdates ?? []).flatMap((entry) => Object.entries(entry)))
  const itemIds = updates['comp-mrv8qmuk']?.items ?? []
  project.gallery = itemIds.flatMap((itemId) => {
    const image = updates[`comp-mrv9b9vv__${itemId}`]?.imageInfo?.imageData
    if (!image?.uri) return []
    return [{ source: image.uri, width: image.width, height: image.height }]
  })
  console.log(`Mapped ${project.slug}: ${project.gallery.length} images`)
})

const uniqueImages = new Map()
for (const project of projects) {
  for (const image of project.gallery) uniqueImages.set(image.source, image)
}

for (const project of projects) delete project.referencePath

for (const image of uniqueImages.values()) {
  image.output = `https://static.wixstatic.com/media/${image.source}/v1/fit/w_1920,h_1920,q_90,enc_auto/detail.webp`
}

for (const project of projects) {
  project.gallery = project.gallery.map((image) => ({
    src: uniqueImages.get(image.source).output,
    width: image.width,
    height: image.height,
  }))
}

const source = `// Generated from the MB Designs reference collection by scripts/sync-project-details.mjs.\n` +
  `export const projectDetails = ${JSON.stringify(projects, null, 2)} as const\n\n` +
  `export function getProjectDetail(slug: string) {\n  return projectDetails.find((project) => project.slug === slug)\n}\n`

await writeFile(generatedFile, source)
console.log(`Generated ${projects.length} project records with ${uniqueImages.size} unique optimized images.`)
