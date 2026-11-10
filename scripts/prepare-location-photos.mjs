import fs from 'node:fs/promises'
import sharp from 'sharp'

const entries = [
  ['egypt', 'Giza_pyramid_complex'], ['united-arab-emirates', 'Burj_Khalifa'],
  ['saudi-arabia', 'Kingdom_Centre'], ['greece', 'Parthenon'],
  ['oman', 'Sultan_Qaboos_Grand_Mosque'], ['bahrain', 'Bahrain_World_Trade_Center'],
  ['qatar', 'Museum_of_Islamic_Art,_Doha'], ['kuwait', 'Kuwait_Towers'],
  ['mauritius', 'Le_Morne_Brabant'], ['seychelles', 'Horloge_de_Victoria'],
  ['cabo-verde', 'Forte_Real_de_São_Filipe'],
]
const dir = 'public/assets/images/landmarks'
await fs.mkdir(dir, { recursive: true })
const get = async url => {
  const response = await fetch(url, { headers: { 'User-Agent': 'MBDesignsWebsiteAssets/1.0' } })
  if (!response.ok) throw new Error(`${response.status}: ${url}`)
  return response
}
const manifest = JSON.parse(await fs.readFile(`${dir}/credits.json`, 'utf8').catch(() => '{}'))
for (const [slug, title] of entries) {
  if (manifest[slug]) continue
  const language = slug === 'seychelles' ? 'fr' : 'en'
  const summary = await (await get(`https://${language}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`)).json()
  if (!summary.originalimage || !summary.coordinates) throw new Error(`Missing image or coordinates: ${title}`)
  const url = (summary.thumbnail?.source ?? summary.originalimage.source).replace(/\/\d+px-/, '/960px-').split('?')[0]
  const parts = new URL(url).pathname.split('/')
  const filename = decodeURIComponent(parts.at(parts.includes('thumb') ? -2 : -1))
  const commons = await (await get(`https://commons.wikimedia.org/w/api.php?action=query&format=json&titles=${encodeURIComponent(`File:${filename}`)}&prop=imageinfo&iiprop=extmetadata%7Curl`)).json()
  let info = Object.values(commons.query.pages)[0].imageinfo?.[0]
  if (!info) {
    const local = await (await get(`https://en.wikipedia.org/w/api.php?action=query&format=json&titles=${encodeURIComponent(`File:${filename}`)}&prop=imageinfo&iiprop=extmetadata%7Curl`)).json()
    info = Object.values(local.query.pages)[0].imageinfo?.[0]
  }
  if (!info) throw new Error(`Missing photo attribution: ${filename}`)
  const image = Buffer.from(await (await get(url)).arrayBuffer())
  const result = await sharp(image).rotate().resize({ width: 960, withoutEnlargement: true }).webp({ quality: 88, effort: 6 }).toFile(`${dir}/${slug}.webp`)
  manifest[slug] = { title: summary.title, latitude: summary.coordinates.lat, longitude: summary.coordinates.lon, image: `/assets/images/landmarks/${slug}.webp`, width: result.width, height: result.height, source: info.descriptionurl, artist: info.extmetadata?.Artist?.value, license: info.extmetadata?.LicenseShortName?.value, licenseUrl: info.extmetadata?.LicenseUrl?.value }
  await fs.writeFile(`${dir}/credits.json`, JSON.stringify(manifest, null, 2))
  console.log(slug, result.width, result.height)
}
const source = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson'
const geo = await (await get(source)).json()
const xy = ([lon, lat]) => [((lon + 180) / 360 * 900).toFixed(2), ((85 - lat) / 145 * 440).toFixed(2)]
const paths = geo.features.filter(f => f.properties.ADMIN !== 'Antarctica').map(f => {
  const polygons = f.geometry.type === 'MultiPolygon' ? f.geometry.coordinates : [f.geometry.coordinates]
  return polygons.map(polygon => polygon.map(ring => 'M' + ring.map(p => xy(p).join(',')).join('L') + 'Z').join('')).join('')
})
await fs.writeFile('public/assets/images/world-map-geographic.svg', `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 440"><title>World map — Natural Earth public domain data</title><g fill="#101114" stroke="#737477" stroke-width="0.55" stroke-linejoin="round">${paths.map(d => `<path d="${d}"/>`).join('')}</g></svg>`)
await fs.writeFile('public/assets/images/landmarks/map-source.txt', `Map: Natural Earth, public domain.\n${source}\nProjection: equirectangular, longitude -180 to 180, latitude 85 to -60.\n`)
