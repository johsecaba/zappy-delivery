/**
 * Genera AVIF y WebP responsive desde los JPG de marca.
 * Uso: node scripts/optimize-illustrations.mjs <dir-con-jpg>
 * Los nombres de salida son fijos: credit-cards, fragile, wine, art, medicine.
 */
import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const widths = [480, 768, 1152];
const names = {
  "credit-cards": "credit-cards",
  "fragile": "fragile",
  "wine": "wine",
  "art": "art",
  "medicine": "medicine",
  legal: "legal",
  "real-estate": "real-estate",
  insurance: "insurance",
};

const sourceDir = process.argv[2];
if (!sourceDir) {
  console.error("Falta el directorio de los JPG originales.");
  process.exit(1);
}

const outDir = path.resolve("public/illustrations");
await mkdir(outDir, { recursive: true });

const files = await readdir(sourceDir);
for (const file of files) {
  const key = Object.keys(names).find((name) => file.startsWith(name));
  if (!key) continue;
  const input = path.join(sourceDir, file);
  for (const width of widths) {
    const image = sharp(input).resize({ width, withoutEnlargement: true });
    await image.clone().webp({ quality: 72 }).toFile(path.join(outDir, `${names[key]}-${width}.webp`));
    await image.clone().avif({ quality: 48 }).toFile(path.join(outDir, `${names[key]}-${width}.avif`));
  }
  console.log(key);
}
