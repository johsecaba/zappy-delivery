import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "../..");

const STATIC_SOURCES = {
  "/": [
    "src/pages/index.astro",
    "src/config/site.ts",
    "src/data/services.ts",
    "src/data/faq.ts",
    "src/data/coverage.ts",
    "src/lib/schema.ts",
  ],
  "/servicios": ["src/pages/servicios/index.astro", "src/data/services.ts"],
  "/empresas": ["src/pages/empresas.astro", "src/config/site.ts"],
  "/contacto": ["src/pages/contacto.astro", "src/config/site.ts", "src/data/services.ts"],
  "/preguntas-frecuentes": ["src/pages/preguntas-frecuentes.astro", "src/data/faq.ts"],
  "/cobertura": ["src/pages/cobertura.astro", "src/data/coverage.ts"],
  "/zappypoints": ["src/pages/zappypoints.astro"],
  "/terminos-y-condiciones": ["src/pages/terminos-y-condiciones.astro"],
  "/aviso-de-privacidad": ["src/pages/aviso-de-privacidad.astro"],
  "/blog": ["src/pages/blog/index.astro", "src/data/blog.ts", "src/content/blog"],
  "/llms.txt": [
    "src/lib/llms.ts",
    "src/pages/llms.txt.ts",
    "src/config/site.ts",
    "src/data/services.ts",
    "src/data/faq.ts",
    "src/data/coverage.ts",
    "src/content/blog",
  ],
  "/llms-full.txt": [
    "src/lib/llms.ts",
    "src/pages/llms-full.txt.ts",
    "src/config/site.ts",
    "src/data/services.ts",
    "src/data/faq.ts",
    "src/data/coverage.ts",
    "src/content/blog",
  ],
};

function todayUtc() {
  return new Date().toISOString().slice(0, 10);
}

let gitState;
function gitMode() {
  if (gitState) return gitState;
  try {
    const shallow = execFileSync("git", ["rev-parse", "--is-shallow-repository"], {
      cwd: root,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "ignore"],
    }).trim();
    gitState = shallow === "false" ? "full" : "shallow";
  } catch {
    gitState = "missing";
  }
  return gitState;
}

function git(args) {
  return execFileSync("git", args, {
    cwd: root,
    encoding: "utf8",
    stdio: ["ignore", "pipe", "ignore"],
  }).trim();
}

/** Fecha del último commit, o hoy si el archivo tiene cambios sin commit. */
function sourceDate(path) {
  if (gitMode() !== "full") return null;
  try {
    if (git(["status", "--porcelain", "--", path])) return todayUtc();
    const committed = git(["log", "-1", "--format=%cI", "--", path]);
    return committed ? committed.slice(0, 10) : null;
  } catch {
    return null;
  }
}

function newest(paths) {
  const dates = paths.map(sourceDate).filter(Boolean).sort();
  return dates.at(-1) ?? null;
}

function maxDate(...dates) {
  const valid = dates.filter(Boolean).sort();
  return valid.at(-1) ?? null;
}

function publishedPosts() {
  const today = todayUtc();
  const dir = join(root, "src/content/blog");
  return readdirSync(dir)
    .filter((name) => name.endsWith(".md"))
    .map((name) => {
      const raw = readFileSync(join(dir, name), "utf8");
      const frontmatter = raw.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? "";
      const pub = frontmatter.match(/^pubDate:\s*(\d{4}-\d{2}-\d{2})/m)?.[1] ?? null;
      const updated = frontmatter.match(/^updatedDate:\s*(\d{4}-\d{2}-\d{2})/m)?.[1] ?? null;
      const category = frontmatter.match(/^category:\s*([A-Za-z0-9_-]+)/m)?.[1] ?? null;
      const draft = /^draft:\s*true\s*$/m.test(frontmatter);
      return {
        slug: name.slice(0, -3),
        category,
        date: updated || pub,
        published: Boolean(pub) && !draft && pub <= today,
      };
    })
    .filter((post) => post.published && post.date);
}

function pathname(url) {
  const path = new URL(url).pathname;
  if (path.length > 1 && path.endsWith("/")) return path.slice(0, -1);
  return path || "/";
}

/**
 * Fechas de contenido de esta revisión. Se usan si el build no tiene
 * historial git completo (un clon superficial haría que todo pareciera
 * modificado en el último commit).
 */
const FALLBACK = {
  "/": "2026-11-06",
  "/aviso-de-privacidad": "2026-11-04",
  "/blog": "2026-11-04",
  "/blog/categoria/guias": "2026-11-04",
  "/blog/categoria/operaciones": "2026-11-04",
  "/blog/como-elegir-empresa-de-mensajeria-en-panama": "2026-11-04",
  "/blog/mensajeria-corporativa-tramites-css-mitradel-cheques": "2026-11-03",
  "/blog/ultima-milla-ecommerce-panama": "2026-11-04",
  "/cobertura": "2026-11-04",
  "/contacto": "2026-11-06",
  "/empresas": "2026-11-06",
  "/llms-full.txt": "2026-11-06",
  "/llms.txt": "2026-11-06",
  "/preguntas-frecuentes": "2026-11-06",
  "/servicios": "2026-11-04",
  "/servicios/entrega-de-tarjetas-bancarias": "2026-11-04",
  "/servicios/entregas-comercios-ecommerce": "2026-11-04",
  "/servicios/mensajeria-empresarial": "2026-11-04",
  "/servicios/traslados-panel-camion": "2026-11-04",
  "/servicios/zappy-business": "2026-11-04",
  "/servicios/zappy-express": "2026-11-04",
  "/terminos-y-condiciones": "2026-11-04",
  "/zappypoints": "2026-11-06",
};

/** lastmod YYYY-MM-DD. Artículos: fecha del frontmatter. El resto: último commit de sus fuentes. */
export function lastmodFor(url) {
  let path;
  try {
    path = pathname(url);
  } catch {
    return null;
  }

  const live = lastmodFromGit(path);
  return live ?? FALLBACK[path] ?? null;
}

function lastmodFromGit(path) {
  const posts = publishedPosts();

  if (path.startsWith("/blog/") && !path.startsWith("/blog/categoria/")) {
    return posts.find((post) => post.slug === path.slice("/blog/".length))?.date ?? null;
  }

  if (path.startsWith("/blog/categoria/")) {
    const category = path.slice("/blog/categoria/".length);
    const latest = posts
      .filter((post) => post.category === category)
      .map((post) => post.date)
      .sort()
      .at(-1);
    return latest ?? newest(["src/pages/blog/categoria/[category].astro", "src/data/blog.ts"]);
  }

  if (path === "/blog") {
    const latest = posts
      .map((post) => post.date)
      .sort()
      .at(-1);
    return maxDate(latest, newest(STATIC_SOURCES["/blog"]));
  }

  if (path.startsWith("/servicios/") && path !== "/servicios") {
    return newest(["src/data/services.ts", "src/pages/servicios/[slug].astro"]);
  }

  const sources = STATIC_SOURCES[path];
  return sources ? newest(sources) : null;
}
