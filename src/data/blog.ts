export const categories = {
  guias: {
    label: "Guías",
    title: "Guías para contratar mensajería en Panamá | Zappy",
    description:
      "Guías para elegir una empresa de mensajería en Panamá sin confundir comida a domicilio con courier para negocios.",
  },
  operaciones: {
    label: "Operaciones",
    title: "Operación de última milla en Panamá | Blog Zappy",
    description:
      "Cómo preparar despachos, evidencia y rutas de última milla para un negocio en Panamá.",
  },
} as const;

export type Category = keyof typeof categories;
