/** Zonas nombradas en el pie de zappydelivery.com. */
export const cityZones = [
  {
    id: "panama-centro",
    name: "Panamá Centro",
    tone: "centro",
    body: "Cobertura dentro de la Ciudad de Panamá y sus afueras, en la zona que el sitio llama Panamá Centro.",
  },
  {
    id: "panama-norte",
    name: "Panamá Norte",
    tone: "norte",
    body: "Cobertura dentro de la Ciudad de Panamá y sus afueras, en la zona que el sitio llama Panamá Norte.",
  },
  {
    id: "panama-este",
    name: "Panamá Este",
    tone: "este",
    body: "Cobertura dentro de la Ciudad de Panamá y sus afueras, en la zona que el sitio llama Panamá Este.",
  },
  {
    id: "panama-oeste",
    name: "Panamá Oeste",
    tone: "oeste",
    body: "Cobertura dentro de la Ciudad de Panamá y sus afueras, en la zona que el sitio llama Panamá Oeste.",
  },
] as const;

/**
 * Ciudades del interior nombradas en la página de traslados en panel o camión.
 * El sitio escribe «Chitre»; aquí se usa la grafía Chitré.
 */
export const interiorCities = [
  "Chitré",
  "Las Tablas",
  "Santiago",
  "David",
  "Aguadulce",
  "Penonomé",
] as const;
