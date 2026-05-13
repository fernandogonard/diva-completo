import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join, extname, dirname, basename } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const IMAGES_DIR = join(__dirname, '../public/images');

async function getImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getImages(full));
    } else if (['.jpg', '.jpeg', '.png'].includes(extname(entry.name).toLowerCase())) {
      files.push(full);
    }
  }
  return files;
}

const images = await getImages(IMAGES_DIR);
let converted = 0;
let saved = 0;

for (const img of images) {
  const webpPath = img.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  const originalSize = (await stat(img)).size;
  await sharp(img).webp({ quality: 82 }).toFile(webpPath);
  const newSize = (await stat(webpPath)).size;
  const reduction = Math.round((1 - newSize / originalSize) * 100);
  console.log(`✓ ${basename(webpPath)} — ${Math.round(originalSize/1024)}KB → ${Math.round(newSize/1024)}KB (${reduction}% menos)`);
  saved += originalSize - newSize;
  converted++;
}

console.log(`\n${converted} imágenes convertidas. Ahorro total: ${Math.round(saved/1024)}KB`);
