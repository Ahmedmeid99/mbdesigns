import sharp from 'sharp'
import { resolve } from 'node:path'

const source = (name) => resolve('.media-upgrade', 'images', name)
const output = (name) => resolve('public', 'assets', 'images', name)

const jobs = [
  ['hero-source.jpg', 'hero.webp', 2880, 1620],
  ['about-tall-source.jpeg', 'about-tall.webp', 1266, 1310],
  ['about-wide-source.jpeg', 'about-wide.webp', 1360, 768],
  ['award-eastown-source.jpg', 'award-eastown.webp', 1600, 1013],
  ['award-nuwa-source.jpg', 'award-nuwa.webp', 1600, 1013],
  ['award-villa-source.jpg', 'award-villa.webp', 1600, 1013],
  ['award-studio-alt-source.jpg', 'award-studio.webp', 1600, 1013],
  ['contact-source.jpg', 'contact.webp', 1600, 608],
  ['about-founder-source.png', 'about-founder.webp', 1133, 1388],
]

for (const [inputName, outputName, width, height] of jobs) {
  await sharp(source(inputName))
    .rotate()
    .resize({ width, height, fit: 'cover', position: 'centre' })
    .webp({ quality: 92, effort: 6, smartSubsample: true })
    .toFile(output(outputName))
}
