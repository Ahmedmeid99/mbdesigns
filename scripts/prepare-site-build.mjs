import { copyFile, mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

const projectRoot = fileURLToPath(new URL('../', import.meta.url))
const manifestSource = path.join(projectRoot, '.openai', 'hosting.json')
const manifestDirectory = path.join(projectRoot, 'dist', '.openai')

await mkdir(manifestDirectory, { recursive: true })
await copyFile(manifestSource, path.join(manifestDirectory, 'hosting.json'))
