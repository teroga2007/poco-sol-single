import { cp, mkdir, rm } from 'node:fs/promises'

const previewDirectory = new URL('../.preview-site/', import.meta.url)
const pocoSolDirectory = new URL('../.preview-site/poco-sol-single/', import.meta.url)

await rm(previewDirectory, { recursive: true, force: true })
await mkdir(pocoSolDirectory, { recursive: true })
await cp(new URL('../dist/', import.meta.url), pocoSolDirectory, { recursive: true })
await cp(new URL('../public-root/', import.meta.url), previewDirectory, { recursive: true })

console.log('Sitio local preparado: home, Ethereal y Poco Sol.')
