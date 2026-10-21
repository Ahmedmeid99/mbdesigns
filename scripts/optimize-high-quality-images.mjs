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
  ['awards-hero-source.jpg', 'awards-hero.webp', 1920, 1145],
  ['awards-2021-source.jpg', 'awards-2021.webp', 2400, 1217],
  ['awards-2022-source.jpg', 'awards-2022.webp', 2400, 1396],
  ['awards-purpose-source.jpg', 'awards-purpose.webp', 1472, 1840],
  ['projects-hero-source.png', 'projects-hero.webp', 1920, 1116],
  ['projects-architecture-source.jpeg', 'projects-architecture.webp', 1360, 832],
  ['projects-corporate-source.jpeg', 'projects-corporate.webp', 1360, 832],
  ['projects-residential-source.jpg', 'projects-residential.webp', 1360, 832],
  ['projects-fnb-source.webp', 'projects-fnb.webp', 1360, 832],
  ['projects-retail-source.webp', 'projects-retail.webp', 1360, 832],
  ['projects-hospitality-source.webp', 'projects-hospitality.webp', 1360, 832],
  ['architecture-hero-source.jpg', 'architecture-hero.webp', 1920, 1080],
  ['architecture-chess-source.jpg', 'architecture-chess.webp', 1280, 1280],
  ['architecture-sheraton-source.jpeg', 'architecture-sheraton.webp', 1280, 1280],
  ['architecture-commercial-source.jpeg', 'architecture-commercial.webp', 1280, 1280],
  ['architecture-placeholder-one-source.jpg', 'architecture-placeholder-one.webp', 1280, 1280],
  ['architecture-mivida-source.jpeg', 'architecture-mivida.webp', 1280, 1280],
  ['architecture-placeholder-two-source.jpg', 'architecture-placeholder-two.webp', 1280, 1280],
]

for (const [inputName, outputName, width, height] of jobs) {
  await sharp(source(inputName))
    .rotate()
    .resize({ width, height, fit: 'cover', position: 'centre' })
    .webp({ quality: 92, effort: 6, smartSubsample: true })
    .toFile(output(outputName))
}
