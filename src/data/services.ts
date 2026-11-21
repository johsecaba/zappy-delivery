export type ServicePoint = {
  title: string;
  body: string;
};

export type MenuGroup = "mensajeria" | "productos";

export type Service = {
  slug: string;
  name: string;
  menuLabel: string;
  menuGroup: MenuGroup;
  /** Una línea para el menú y el pie. */
  summary: string;
  h1: string;
  title: string;
  description: string;
  eyebrow: string;
  intro: string;
  points: ServicePoint[];
  extra?: string;
  whatsappMessage: string;
  /** Páginas con plantilla propia. No las genera /servicios/[slug]. */
  dedicated?: boolean;
};

export const services: Service[] = [
  {
    slug: "mensajeria-corporativa",
    name: "Mensajería corporativa",
    menuLabel: "Mensajería Corporativa",
    menuGroup: "mensajeria",
    summary: "Mensajería para empresas e instituciones.",
    h1: "Mensajería corporativa en Panamá para las diligencias de su empresa",
    title: "Mensajería Corporativa en Panamá | Zappy Delivery",
    description:
      "Mensajería corporativa en Panamá para bancos, firmas legales, notarías, inmobiliarias, aseguradoras y clínicas. Documentos y diligencias con seguimiento.",
    eyebrow: "Mensajería para empresas e instituciones",
    intro:
      "Conectamos su oficina con clientes, proveedores y sucursales mediante el retiro y la entrega de documentos, correspondencia y paquetes pequeños. Coordinamos cada solicitud según las necesidades de su industria.",
    points: [],
    whatsappMessage:
      "Hola, quiero hablar sobre mensajería corporativa para mi empresa con Zappy Delivery.",
    dedicated: true,
  },
  {
    slug: "mensajeria-bancaria",
    name: "Mensajería bancaria",
    menuLabel: "Mensajería Bancaria",
    menuGroup: "mensajeria",
    summary: "Mensajería para el sector financiero.",
    h1: "Mensajería bancaria en Panamá para mantener su operación en movimiento",
    title: "Mensajería Bancaria en Panamá | Zappy Delivery",
    description:
      "Mensajería para bancos y financieras en Panamá. Retiro y entrega de documentos, cheques y valija entre sucursales, con atención personalizada y seguimiento.",
    eyebrow: "Mensajería para el sector financiero",
    intro:
      "Coordinamos el retiro y la entrega de documentos, cheques y correspondencia entre sucursales, clientes y oficinas administrativas. Un servicio con atención personalizada y seguimiento para las diligencias diarias de su institución.",
    points: [],
    whatsappMessage:
      "Hola, quiero hablar sobre mensajería bancaria para mi institución con Zappy Delivery.",
    dedicated: true,
  },
  {
    slug: "entregas-comercios-ecommerce",
    name: "Entregas para comercios y e-commerce",
    menuLabel: "Mensajería para Comercios",
    menuGroup: "mensajeria",
    summary: "Entregas que representan a su marca.",
    h1: "Sus productos merecen cuidado. Sus clientes, una entrega profesional.",
    title: "Delivery para Comercios y E-commerce en Panamá | Zappy",
    description:
      "Entregas para comercios y e-commerce en Panamá. Cuidado para productos delicados, mensajeros con presentación profesional y seguimiento de sus pedidos.",
    eyebrow: "Entregas que representan a su marca",
    intro:
      "Servicio de entregas para comercios y e-commerce en Panamá que cuidan cada detalle. Coordinamos el traslado de productos frágiles o delicados, con mensajeros de presentación profesional y seguimiento desde el retiro hasta la entrega.",
    points: [],
    whatsappMessage:
      "Hola, quiero hablar sobre entregas para mi comercio o e-commerce con Zappy Delivery.",
    dedicated: true,
  },
  {
    slug: "zappy-express",
    name: "Zappy Express",
    menuLabel: "Zappy Express",
    menuGroup: "productos",
    summary: "De la sucursal al cliente final, cada paquete con su guía.",
    h1: "Zappy Express: un remitente, muchos destinos",
    title: "Zappy Express: de la sucursal a muchos clientes | Zappy",
    description:
      "Zappy Express es mensajería en moto: paquetes de un remitente a muchas direcciones en Panamá, con guía individual y evidencia digital.",
    eyebrow: "Un origen, muchos destinos",
    intro:
      "Zappy Express reparte paquetes individuales a múltiples destinos, de la sucursal al cliente final. En la ciudad esa ruta es mensajería en moto: sirve cuando una sola operación despacha muchas direcciones distintas.",
    points: [
      {
        title: "Guía individual",
        body: "Registro inmediato y guía por paquete, no un bulto único para toda la ruta.",
      },
      {
        title: "Operación con horario",
        body: "Personal calificado, horarios establecidos, planificación predecible y trabajo continuo.",
      },
      {
        title: "Cada paso visible",
        body: "Asignación inmediata, visibilidad en tiempo real, confirmación de cada paso y evidencia digital.",
      },
      {
        title: "De la venta a la entrega",
        body: "El recorrido que muestra el sitio pasa por venta, recolecta, registro, asignación y envío. En la ciudad, el tramo final lo hace un mensajero en moto.",
      },
    ],
    whatsappMessage:
      "Hola, quiero información sobre Zappy Express para enviar de mi sucursal a muchos clientes.",
  },
  {
    slug: "zappy-business",
    name: "Zappy Business",
    menuLabel: "Zappy Business",
    menuGroup: "productos",
    summary: "Del almacén a las sucursales, varios bultos a un destino.",
    h1: "Zappy Business: muchos paquetes, un destino",
    title: "Zappy Business: del almacén a las sucursales | Zappy",
    description:
      "Zappy Business mueve muchos paquetes hacia un mismo lugar en Panamá: del almacén a sucursales, con rebalanceo de inventario y horarios fijos.",
    eyebrow: "Muchos bultos, un lugar",
    intro:
      "Zappy Business es el caso contrario de Express: múltiples paquetes a un mismo destino, del almacén a las sucursales. Si el bulto cabe, el tramo urbano sale en moto. Si no cabe, el traslado es en panel o camión.",
    points: [
      {
        title: "Un destino, varios bultos",
        body: "Recolecta en sucursal y guía de paquete individual, aunque el destino de la ruta sea el mismo punto.",
      },
      {
        title: "Horario fijo",
        body: "Horarios preestablecidos y planificación predecible para surtidos frecuentes.",
      },
      {
        title: "Inventario en movimiento",
        body: "Rebalanceo de inventarios y traslados intra-red, de tienda a tienda.",
      },
      {
        title: "Capacidad y ahorro",
        body: "El sitio habla de maximizar la capacidad del vehículo, maximizar ventas y obtener ahorros. No publica porcentajes.",
      },
    ],
    whatsappMessage:
      "Hola, quiero información sobre Zappy Business para llevar mercancía de mi almacén a las sucursales.",
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function servicesInGroup(group: MenuGroup): Service[] {
  return services.filter((service) => service.menuGroup === group);
}
