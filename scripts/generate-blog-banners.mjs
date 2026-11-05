import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import satori from "satori";
import sharp from "sharp";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const blogDir = path.join(root, "src/content/blog");
const outDir = path.join(root, "public/blog/banners");
const fontPath = path.join(
  root,
  "node_modules/@fontsource/inter/files/inter-latin-800-normal.woff",
);

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) throw new Error("Falta el frontmatter");
  const data = {};
  for (const line of match[1].split(/\r?\n/)) {
    const item = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/);
    if (!item) continue;
    let value = item[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = JSON.parse(value.startsWith("'") ? `"${value.slice(1, -1)}"` : value);
    }
    data[item[1]] = value;
  }
  return data;
}

function withImageFields(raw, slug, title) {
  let next = raw;
  const image = `/blog/banners/${slug}.png`;
  if (!/^image:/m.test(next)) {
    next = next.replace(/\r?\n---\r?\n/, `\nimage: ${image}\n---\n`);
  }
  if (!/^imageAlt:/m.test(next)) {
    const alt = `Banner del artículo «${title}»: logotipo de Zappy Delivery y una ilustración geométrica de mensajería, en azul marino, celeste y naranja.`;
    next = next.replace(/\r?\n---\r?\n/, `\nimageAlt: ${JSON.stringify(alt)}\n---\n`);
  }
  return next;
}

function h(type, style, children) {
  return {
    type,
    props: children === undefined ? { style } : { style, children },
  };
}

function variantFor(slug) {
  if (slug.includes("corporativa") || slug.includes("tramite")) return "documentos";
  if (slug.includes("ultima-milla") || slug.includes("paquete")) return "paquete";
  if (slug.includes("elegir")) return "moto";
  const variants = ["moto", "paquete", "documentos"];
  const n = [...slug].reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return variants[n % variants.length];
}

function wheel() {
  return h(
    "div",
    {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "78px",
      height: "78px",
      borderRadius: "99px",
      background: "#ffffff",
      border: "6px solid #000000",
    },
    [
      h("div", {
        width: "26px",
        height: "26px",
        borderRadius: "99px",
        background: "#21397A",
        border: "4px solid #000000",
      }),
    ],
  );
}

function moto() {
  return h("div", { display: "flex", flexDirection: "column", alignItems: "center" }, [
    h("div", {
      display: "flex",
      width: "64px",
      height: "64px",
      borderRadius: "99px",
      background: "#EB6935",
      border: "6px solid #000000",
      marginLeft: "160px",
    }),
    h(
      "div",
      { display: "flex", alignItems: "flex-end", marginTop: "12px" },
      [
        h("div", {
          width: "72px",
          height: "58px",
          background: "#008BCE",
          border: "6px solid #000000",
          borderRadius: "12px",
          marginBottom: "34px",
        }),
        h("div", {
          width: "168px",
          height: "52px",
          background: "#21397A",
          border: "6px solid #000000",
          borderRadius: "16px",
          marginBottom: "22px",
          marginLeft: "-6px",
        }),
      ],
    ),
    h("div", { display: "flex", gap: "86px", marginTop: "-40px" }, [wheel(), wheel()]),
  ]);
}

function paquete() {
  return h("div", { display: "flex", flexDirection: "column", alignItems: "center" }, [
    h("div", {
      width: "64px",
      height: "64px",
      borderRadius: "99px",
      background: "#008BCE",
      border: "6px solid #000000",
      marginBottom: "16px",
    }),
    h("div", {
      display: "flex",
      width: "200px",
      height: "22px",
      background: "#EB6935",
      border: "5px solid #000000",
      borderRadius: "8px",
    }),
    h(
      "div",
      {
        display: "flex",
        width: "240px",
        height: "150px",
        background: "#F3F3F1",
        border: "6px solid #000000",
        borderRadius: "16px",
        marginTop: "-5px",
        alignItems: "center",
        justifyContent: "center",
      },
      [
        h("div", {
          width: "22px",
          height: "110px",
          background: "#EB6935",
          border: "5px solid #000000",
        }),
      ],
    ),
  ]);
}

function line(color, width) {
  return h("div", {
    width: `${width}px`,
    height: "10px",
    background: color,
    borderRadius: "99px",
  });
}

function sheet(bg, width) {
  return h(
    "div",
    {
      display: "flex",
      flexDirection: "column",
      gap: "10px",
      width: `${width}px`,
      background: bg,
      border: "5px solid #000000",
      borderRadius: "14px",
      padding: "16px",
    },
    [line("#21397A", width - 80), line("#008BCE", width - 50), line("#EB6935", Math.round((width - 50) * 0.55))],
  );
}

function documentos() {
  return h("div", { display: "flex", flexDirection: "column", alignItems: "center" }, [
    h("div", { display: "flex", marginBottom: "-36px" }, [sheet("#E5F4FB", 200)]),
    h("div", { display: "flex", marginBottom: "-36px", marginLeft: "28px" }, [sheet("#ffffff", 210)]),
    h("div", { display: "flex", position: "relative" }, [
      sheet("#F3F3F1", 230),
      h("div", {
        position: "absolute",
        right: "14px",
        bottom: "14px",
        width: "52px",
        height: "52px",
        borderRadius: "99px",
        background: "#EB6935",
        border: "5px solid #000000",
      }),
    ]),
  ]);
}

function illustration(kind) {
  if (kind === "paquete") return paquete();
  if (kind === "documentos") return documentos();
  return moto();
}

function fontSizeFor(title) {
  if (title.length > 78) return 44;
  if (title.length > 60) return 50;
  if (title.length > 42) return 56;
  return 62;
}

function banner(title, logoSrc, kind) {
  return h(
    "div",
    {
      width: "1200px",
      height: "630px",
      display: "flex",
      background: "#21397A",
      padding: "28px",
    },
    [
      h(
        "div",
        {
          display: "flex",
          width: "1144px",
          height: "574px",
          border: "8px solid #000000",
          borderRadius: "32px",
          padding: "32px",
          gap: "28px",
        },
        [
          h(
            "div",
            {
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              width: "640px",
              height: "494px",
            },
            [
              h("div", { display: "flex" }, [
                h(
                  "div",
                  {
                    display: "flex",
                    background: "#EB6935",
                    color: "#000000",
                    border: "4px solid #000000",
                    borderRadius: "99px",
                    padding: "8px 18px",
                    fontSize: "22px",
                    fontWeight: 800,
                    fontFamily: "Inter",
                  },
                  "Blog · Zappy Delivery",
                ),
              ]),
              h(
                "div",
                {
                  display: "flex",
                  width: "640px",
                  color: "#ffffff",
                  fontSize: fontSizeFor(title),
                  fontWeight: 800,
                  fontFamily: "Inter",
                  lineHeight: 1.05,
                  letterSpacing: "-1.5px",
                },
                title,
              ),
              h(
                "div",
                {
                  display: "flex",
                  background: "#ffffff",
                  border: "4px solid #000000",
                  borderRadius: "20px",
                  padding: "8px 12px",
                },
                [
                  {
                    type: "img",
                    props: {
                      src: logoSrc,
                      width: 210,
                      height: 123,
                    },
                  },
                ],
              ),
            ],
          ),
          h(
            "div",
            {
              display: "flex",
              width: "380px",
              height: "494px",
              background: "#F3F3F1",
              border: "6px solid #000000",
              borderRadius: "32px",
              alignItems: "center",
              justifyContent: "center",
            },
            [illustration(kind)],
          ),
        ],
      ),
    ],
  );
}

const files = (await readdir(blogDir)).filter((name) => name.endsWith(".md")).sort();
await mkdir(outDir, { recursive: true });
const font = await readFile(fontPath);
const logoPng = await sharp(path.join(root, "src/assets/brand/logo-zappy.png"))
  .resize({ width: 420 })
  .png()
  .toBuffer();
const logoSrc = `data:image/png;base64,${logoPng.toString("base64")}`;

for (const file of files) {
  const slug = file.replace(/\.md$/, "");
  const sourcePath = path.join(blogDir, file);
  const raw = await readFile(sourcePath, "utf8");
  const title = parseFrontmatter(raw).title;
  if (!title) throw new Error(`${file} no tiene title`);
  const next = withImageFields(raw, slug, title);
  if (next !== raw) await writeFile(sourcePath, next);
  const svg = await satori(banner(title, logoSrc, variantFor(slug)), {
    width: 1200,
    height: 630,
    fonts: [{ name: "Inter", data: font, weight: 800, style: "normal" }],
  });
  const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
  const meta = await sharp(png).metadata();
  if (meta.width !== 1200 || meta.height !== 630) {
    throw new Error(`${slug} salió ${meta.width}x${meta.height}`);
  }
  await writeFile(path.join(outDir, `${slug}.png`), png);
  console.log(`${slug} ${meta.width}x${meta.height} ${png.length}`);
}
