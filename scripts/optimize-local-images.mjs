import { readdir, readFile, stat, writeFile } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = path.join(process.cwd(), 'public', 'assets', 'images')
const profiles = {
  projects: { width: 1600, height: 1600, quality: 80 },
  events: { width: 1800, height: 1400, quality: 82 },
  career: { width: 2000, height: 1300, quality: 84 },
  team: { width: 1200, height: 1200, quality: 84 },
}

const tasks = []
for (const [folder, profile] of Object.entries(profiles)) {
  const directory = path.join(root, folder)
  for (const name of await readdir(directory)) {
    if (name.endsWith('.webp')) tasks.push({ file: path.join(directory, name), profile })
  }
}

const before = (await Promise.all(tasks.map(({ file }) => stat(file)))).reduce((sum, item) => sum + item.size, 0)
let completed = 0
const queue = [...tasks]
const workers = Array.from({ length: 4 }, async () => {
  while (queue.length) {
    const { file, profile } = queue.shift()
    const input = await readFile(file)
    const output = await sharp(input)
      .resize({ width: profile.width, height: profile.height, fit: 'inside', withoutEnlargement: true })
      .webp({ quality: profile.quality, alphaQuality: 92, effort: 5, smartSubsample: true })
      .toBuffer()
    await writeFile(file, output)
    completed += 1
    if (completed % 40 === 0 || completed === tasks.length) console.log(`Optimized ${completed}/${tasks.length} images`)
  }
})
await Promise.all(workers)

const after = (await Promise.all(tasks.map(({ file }) => stat(file)))).reduce((sum, item) => sum + item.size, 0)
console.log(JSON.stringify({ images: tasks.length, before, after, saved: before - after }))
