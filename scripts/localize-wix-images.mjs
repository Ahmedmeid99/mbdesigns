import { mkdir, readFile, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = process.cwd()
const publicRoot = path.join(root, 'public', 'assets', 'images')
const projectFile = path.join(root, 'src', 'project-details.generated.ts')
const careerFile = path.join(root, 'src', 'routes', 'career.tsx')
const eventsFile = path.join(root, 'src', 'routes', 'events-press.tsx')
const teamFile = path.join(root, 'src', 'routes', 'team.tsx')

const [projectSource, careerSource, eventsSource, teamSource] = await Promise.all([
  readFile(projectFile, 'utf8'),
  readFile(careerFile, 'utf8'),
  readFile(eventsFile, 'utf8'),
  readFile(teamFile, 'utf8'),
])

const tasks = new Map()
const add = (folder, id, url, outputName = `${id}.webp`) => {
  const output = path.join(publicRoot, folder, outputName)
  tasks.set(output, { folder, id, url, output })
}

const literalUrlPattern = /https:\/\/static\.wixstatic\.com\/media\/(beb217_[a-f0-9]{32})~mv2\.(jpg|jpeg|png)\/v1\/[^"']+/g
for (const match of projectSource.matchAll(literalUrlPattern)) add('projects', match[1], match[0])

const callPattern = /wixImage\('(?<id>beb217_[a-f0-9]{32})',\s*'(?<ext>jpg|jpeg|png)',\s*(?<width>\d+),\s*(?<height>\d+)\)/g
for (const match of careerSource.matchAll(callPattern)) {
  const { id, ext, width, height } = match.groups
  add('career', id, `https://static.wixstatic.com/media/${id}~mv2.${ext}/v1/fill/w_${width},h_${height},al_c,q_92,enc_auto/local.webp`)
}

const eventAssets = new Map()
for (const match of eventsSource.matchAll(/\['(?<id>beb217_[a-f0-9]{32})',\s*'(?<ext>jpg|jpeg|png)'\]/g)) eventAssets.set(match.groups.id, match.groups.ext)
for (const match of eventsSource.matchAll(/wixImage\('(?<id>beb217_[a-f0-9]{32})',\s*'(?<ext>jpg|jpeg|png)'/g)) eventAssets.set(match.groups.id, match.groups.ext)
for (const [id, ext] of eventAssets) {
  const remoteId = id === 'beb217_c3d32d98753e44798eefc88241d2d74c' ? 'beb217_1bcac1cfff9347149cfbefa9e639f46b' : id
  add('events', id, `https://static.wixstatic.com/media/${remoteId}~mv2.${ext}/v1/fit/w_2400,h_1800,q_92,enc_auto/local.webp`)
}

const teamHero = teamSource.match(/https:\/\/static\.wixstatic\.com\/media\/(beb217_[a-f0-9]{32})~mv2\.(jpg|jpeg|png)\/v1\/[^']+/)
if (teamHero) add('team', teamHero[1], teamHero[0], 'hero.webp')
for (const match of teamSource.matchAll(/portrait\('(?<id>beb217_[a-f0-9]{32})',\s*'(?<ext>jpg|png)'(?:,\s*'(?<focus>[0-9.]+_[0-9.]+)')?\)/g)) {
  const { id, ext } = match.groups
  const focus = match.groups.focus || '0.50_0.50'
  add('team', id, `https://static.wixstatic.com/media/${id}~mv2.${ext}/v1/fill/w_900,h_1040,fp_${focus},q_92,enc_auto/local.webp`)
}

await Promise.all(['projects', 'career', 'events', 'team'].map((folder) => mkdir(path.join(publicRoot, folder), { recursive: true })))

let completed = 0
let skipped = 0
const all = [...tasks.values()]

async function download(task) {
  try {
    const existing = await stat(task.output)
    if (existing.size > 1024) { skipped += 1; completed += 1; return }
  } catch {}

  let lastError
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    try {
      const response = await fetch(task.url, { headers: { accept: 'image/webp,image/*;q=0.9,*/*;q=0.5' } })
      if (!response.ok) throw new Error(`${response.status} ${response.statusText}`)
      const input = Buffer.from(await response.arrayBuffer())
      await sharp(input, { failOn: 'warning' }).webp({ quality: 88, alphaQuality: 95, effort: 4, smartSubsample: true }).toFile(task.output)
      completed += 1
      if (completed % 20 === 0 || completed === all.length) console.log(`Localized ${completed}/${all.length} images`)
      return
    } catch (error) {
      lastError = error
      await new Promise((resolve) => setTimeout(resolve, attempt * 500))
    }
  }
  throw new Error(`Failed ${task.id}: ${lastError?.message || lastError}`)
}

const queue = [...all]
const workers = Array.from({ length: 8 }, async () => {
  while (queue.length) await download(queue.shift())
})
await Promise.all(workers)

let localizedProjects = projectSource.replace(literalUrlPattern, (_url, id) => `/assets/images/projects/${id}.webp`)
let localizedCareer = careerSource.replace(
  /const wixImage = \(id: string, extension: 'jpg' \| 'png', width: number, height: number\) =>\s*\n\s*`https:\/\/static\.wixstatic\.com\/media\/\$\{id\}~mv2\.\$\{extension\}\/v1\/fill\/w_\$\{width\},h_\$\{height\},al_c,q_90,enc_auto\/career\.webp`/,
  "const wixImage = (id: string, _extension: 'jpg' | 'png', _width: number, _height: number) => `/assets/images/career/${id}.webp`",
)
let localizedEvents = eventsSource.replace(
  /const wixImage = \(id: string, extension: ImageSource\[1\], width = 1800, height = 1200\) => `https:\/\/static\.wixstatic\.com\/media\/\$\{id\}~mv2\.\$\{extension\}\/v1\/fill\/w_\$\{width\},h_\$\{height\},al_c,q_90,enc_auto\/events\.webp`/,
  "const wixImage = (id: string, _extension: ImageSource[1], _width = 1800, _height = 1200) => `/assets/images/events/${id}.webp`",
)
let localizedTeam = teamSource
  .replace(/const heroImage = 'https:\/\/static\.wixstatic\.com\/media\/[^']+'/,
    "const heroImage = '/assets/images/team/hero.webp'")
  .replace(/const portrait = \(source: string, extension: 'jpg' \| 'png', focalPoint = '0\.50_0\.50'\) =>\s*\n\s*`https:\/\/static\.wixstatic\.com\/media\/\$\{source\}~mv2\.\$\{extension\}\/v1\/fill\/w_900,h_1040,fp_\$\{focalPoint\},q_90,enc_auto\/team\.webp`/,
    "const portrait = (source: string, _extension: 'jpg' | 'png', _focalPoint = '0.50_0.50') => `/assets/images/team/${source}.webp`")

await Promise.all([
  writeFile(projectFile, localizedProjects),
  writeFile(careerFile, localizedCareer),
  writeFile(eventsFile, localizedEvents),
  writeFile(teamFile, localizedTeam),
])

const bytes = (await Promise.all(all.map((task) => stat(task.output)))).reduce((sum, item) => sum + item.size, 0)
console.log(JSON.stringify({ images: all.length, skipped, bytes }))
