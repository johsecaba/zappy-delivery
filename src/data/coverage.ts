/** Zonas nombradas en el pie de zappydelivery.com. */
export const cityZones = [
  {
    name: "Panamá Centro",
    body: "Cobertura dentro de la Ciudad de Panamá y sus afueras, en la zona que el sitio llama Panamá Centro.",
  },
  {
    name: "Panamá Norte",
    body: "Cobertura dentro de la Ciudad de Panamá y sus afueras, en la zona que el sitio llama Panamá Norte.",
  },
  {
    name: "Panamá Este",
    body: "Cobertura dentro de la Ciudad de Panamá y sus afueras, en la zona que el sitio llama Panamá Este.",
  },
  {
    name: "Panamá Oeste",
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
