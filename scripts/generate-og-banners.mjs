/**
 * Banners Open Graph 1200×630 para la portada y las tres landings.
 * No toca Zappy Express ni Zappy Business.
 * Uso: node scripts/generate-og-banners.mjs
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import satori from "satori";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "public/og");
const navy = "#0B1F4D";
const mist = "#F6F8FC";
const light = "#DCE8FF";

const pages = [
  {
    file: "home.png",
    title: "Mensajería en moto para empresas en Panamá",
    illustration: "home-hero-768.webp",
  },
  {
    file: "mensajeria-corporativa.png",
    title: "Mensajería Corporativa en Panamá",
    illustration: "corporativa-hero-768.webp",
  },
  {
    file: "mensajeria-bancaria.png",
    title: "Mensajería Bancaria en Panamá",
    illustration: "credit-cards-768.webp",
  },
  {
    file: "entregas-comercios-ecommerce.png",
    title: "Entregas para Comercios y E-commerce",
    illustration: "fragile-768.webp",
  },
];

function node(type, style, children) {
  return {
    type,
    props: children === undefined ? { style } : { style, children },
  };
}

function banner(title, logoSrc, artSrc) {
  return node(
    "div",
    {
      width: "1200px",
      height: "630px",
      display: "flex",
      background: navy,
      padding: "56px",
      gap: "40px",
    },
    [
      node(
        "div",
        {
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "560px",
          height: "518px",
        },
        [
          node(
            "div",
            {
              display: "flex",
              background: "#ffffff",
              borderRadius: "8px",
              padding: "10px 14px",
              width: "220px",
            },
            [
              {
                type: "img",
                props: { src: logoSrc, width: 192, height: 112 },
              },
            ],
          ),
          node(
            "div",
            {
              display: "flex",
              flexDirection: "column",
              gap: "20px",
            },
            [
              node(
                "div",
                {
                  display: "flex",
                  color: "#ffffff",
                  fontSize: "52px",
                  fontWeight: 600,
                  fontFamily: "Inter",
                  lineHeight: 1.15,
                  letterSpacing: "-0.5px",
                },
                title,
              ),
              node(
                "div",
                {
                  display: "flex",
                  color: light,
                  fontSize: "22px",
                  fontWeight: 500,
                  fontFamily: "Inter",
                  lineHeight: 1.2,
                },
                "zappydelivery.com",
              ),
            ],
          ),
        ],
      ),
      node(
        "div",
        {
          display: "flex",
          width: "488px",
          height: "518px",
          background: mist,
          borderRadius: "8px",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        },
        [
          {
            type: "img",
            props: { src: artSrc, width: 488, height: 366 },
          },
        ],
      ),
    ],
  );
}

async function dataUrl(file, width) {
  const png = await sharp(file).resize({ width, withoutEnlargement: true }).png().toBuffer();
  return `data:image/png;base64,${png.toString("base64")}`;
}

await mkdir(outDir, { recursive: true });
const fontDir = path.join(root, "node_modules/@fontsource/inter/files");
const [regular, medium, semibold] = await Promise.all([
  readFile(path.join(fontDir, "inter-latin-400-normal.woff")),
  readFile(path.join(fontDir, "inter-latin-500-normal.woff")),
  readFile(path.join(fontDir, "inter-latin-600-normal.woff")),
]);
const fonts = [
  { name: "Inter", data: regular, weight: 400, style: "normal" },
  { name: "Inter", data: medium, weight: 500, style: "normal" },
  { name: "Inter", data: semibold, weight: 600, style: "normal" },
];
const logoSrc = await dataUrl(path.join(root, "src/assets/brand/logo-zappy.png"), 384);

for (const page of pages) {
  const artSrc = await dataUrl(path.join(root, "public/illustrations", page.illustration), 976);
  const svg = await satori(banner(page.title, logoSrc, artSrc), {
    width: 1200,
    height: 630,
    fonts,
  });
  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9, effort: 10 }).toBuffer();
  const meta = await sharp(png).metadata();
  if (meta.width !== 1200 || meta.height !== 630) {
    throw new Error(`${page.file} salió ${meta.width}x${meta.height}`);
  }
  if (png.length > 300 * 1024) {
    throw new Error(`${page.file} pesa ${png.length} bytes`);
  }
  await writeFile(path.join(outDir, page.file), png);
  console.log(`${page.file} ${meta.width}x${meta.height} ${png.length}`);
}
