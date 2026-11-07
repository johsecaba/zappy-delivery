import { corporateDescription, corporateIntro, corporateTitle } from "./mensajeria-corporativa";

export type ServicePoint = {
  title: string;
  body: string;
};

export type Service = {
  slug: string;
  name: string;
  menuLabel: string;
  h1: string;
  title: string;
  description: string;
  eyebrow: string;
  summary: string;
  intro: string;
  points: ServicePoint[];
  extra?: string;
  whatsappMessage: string;
};

export const services: Service[] = [
  {
    slug: "entrega-de-tarjetas-bancarias",
    name: "Entrega de tarjetas bancarias",
    menuLabel: "Tarjetas bancarias",
    h1: "Entrega de tarjetas bancarias en Panamá",
    title: "Entrega de tarjetas bancarias en Panamá | Zappy Delivery",
    description:
      "Mensajería en moto de tarjetas bancarias en Panamá: conductores identificados, coordinación con el destinatario y las cifras que Zappy publica.",
    eyebrow: "Mensajería en moto",
    summary:
      "Entrega en moto para instituciones que necesitan protocolo, retorno documentado y un tiempo medido.",
    intro:
      "Con Zappy Delivery, una institución puede encargar la entrega de tarjetas bancarias en la ciudad. Es mensajería en moto, con conductores identificados y respeto de los protocolos del banco. El sitio lo describe como un servicio efectivo, seguro y eficiente.",
    points: [
      {
        title: "97,91 % en menos de 96 horas",
        body: "Zappy publica que un 97,91 % de estas entregas se realiza en menos de 96 horas. La cifra corresponde a tarjetas bancarias, no a todos los productos.",
      },
      {
        title: "9 de cada 10",
        body: "Encuestas a clientes todas las semanas. 9 de cada 10 califican el servicio de bueno o muy bueno.",
      },
      {
        title: "En moto, con protocolo",
        body: "La entrega urbana va en moto. Los conductores van identificados, el trato es formal y se respetan los protocolos bancarios, con resolución transparente de incidencias.",
      },
      {
        title: "Coordinación con el destinatario",
        body: "Comunicación con el cliente, confirmación de disponibilidad y dirección, reprogramaciones y ajustes.",
      },
      {
        title: "Casos y retornos",
        body: "Atención de casos especiales, confirmaciones, seguimiento y documentación clara de retornos.",
      },
      {
        title: "Volumen",
        body: "El sitio afirma que realizan miles de entregas de este servicio al mes. No publica el número exacto.",
      },
    ],
    whatsappMessage:
      "Hola, quiero información sobre la entrega de tarjetas bancarias con Zappy Delivery.",
  },
  {
    slug: "entregas-comercios-ecommerce",
    name: "Entregas a comercios y e-commerce",
    menuLabel: "Comercios y e-commerce",
    h1: "Mensajería en moto para tiendas y e-commerce en Panamá",
    title: "Mensajería en moto Panamá para tiendas | Zappy Delivery",
    description:
      "Mensajería en moto en Panamá para tiendas y e-commerce: recolecta, entrega en la puerta del cliente, foto, trazabilidad y avisos.",
    eyebrow: "Última milla en moto",
    summary:
      "Recolecta y entrega en moto, puerta a puerta, para que la tienda no arme su propia flota.",
    intro:
      "Zappy recolecta y lleva el paquete en moto hasta la puerta del cliente del comercio. Es la mensajería en moto de la ciudad: despacho inmediato y flexibilidad según el negocio, para generar ahorros y sostener la satisfacción de quien compra en la tienda.",
    points: [
      {
        title: "De la tienda a la puerta, en moto",
        body: "Un mensajero en moto recolecta el paquete y lo entrega en la puerta del cliente. Si el volumen no cabe en moto, el traslado pasa a panel o camión.",
      },
      {
        title: "Evidencia con foto",
        body: "Validación de recolectas y entregas con fotos.",
      },
      {
        title: "Trazabilidad",
        body: "Seguimiento de todo el proceso de entrega a través del sistema logístico, con tablero para el usuario.",
      },
      {
        title: "Notificaciones",
        body: "Aviso de casos especiales, entregas realizadas y otros eventos de la ruta.",
      },
      {
        title: "Ahorro por volumen",
        body: "El programa ZappyPoints da entregas gratis cada mes, según las reglas del programa. Por cada 100 puntos, una entrega gratis. Aplican restricciones.",
      },
    ],
    extra:
      "Zappy no publica tarifas de este servicio. El despacho y la zona se confirman por WhatsApp.",
    whatsappMessage:
      "Hola, quiero cotizar entregas para mi comercio o e-commerce con Zappy Delivery.",
  },
  {
    slug: "mensajeria-corporativa",
    name: "Mensajería corporativa",
    menuLabel: "Mensajería corporativa",
    h1: "Mensajería corporativa en Panamá",
    title: corporateTitle,
    description: corporateDescription,
    eyebrow: "Mensajería en moto",
    summary:
      "Documentos, cheques y diligencias en moto en toda la Ciudad de Panamá. Horario de 8:00 a.m. a 5:00 p.m.",
    intro: corporateIntro,
    points: [
      {
        title: "Documentos de ida y vuelta",
        body: "Retiro en un punto y retorno a la oficina. El resguardo se acuerda antes de despachar.",
      },
      {
        title: "Cheques y trámites",
        body: "Cheques, estados de cuenta, pagos en la CSS, certificación en bancos y documentos al Mitradel.",
      },
      {
        title: "Ciudad y horario",
        body: "Toda la Ciudad de Panamá, en moto, de 8:00 a.m. a 5:00 p.m. Los días no están publicados.",
      },
      {
        title: "Cotización según volumen",
        body: "No hay montos en la página. La tarifa se confirma por WhatsApp según zona y volumen.",
      },
    ],
    extra:
      "Los términos dicen que la empresa no responde por la pérdida de dinero, cheques, joyas o valores al portador. Conviene acordar ese manejo antes de despachar.",
    whatsappMessage:
      "Hola, quiero cotizar mensajería corporativa para mi empresa en Ciudad de Panamá.",
  },
  {
    slug: "traslados-panel-camion",
    name: "Traslados en panel o camión",
    menuLabel: "Panel o camión",
    h1: "Envíos en panel o camión, de Panamá al interior",
    title: "Envíos Panamá–David y al interior | Zappy Delivery",
    description:
      "Traslados en panel o camión en Panamá: de bodega a tiendas, de aduana al centro de distribución y rutas al interior, incluidas David, Chitré y Santiago.",
    eyebrow: "Envíos nacionales",
    summary:
      "Cuando no es mensajería en moto: de la bodega a la tienda, y de la capital al interior.",
    intro:
      "Esto no es la ruta en moto. Zappy traslada en panel o camión la mercancía que no cabe en una moto, para que llegue puntual, ordenada e íntegra. El recorrido puede ser urbano, entre sucursales, o nacional, de la Ciudad de Panamá hacia el interior y de regreso.",
    points: [
      {
        title: "Bodega y tiendas",
        body: "Recolecta y entrega desde la bodega a las tiendas, y distribución de inventario de tienda en tienda.",
      },
      {
        title: "Aduana y centros de distribución",
        body: "Traslado desde el centro de descarga hasta la bodega, y de recintos aduaneros a centros de distribución.",
      },
      {
        title: "Retornos",
        body: "Devoluciones de mercancía insuficiente y retornos de obsolescencia o fuera de temporada.",
      },
      {
        title: "Interior",
        body: "Distribución desde la Ciudad de Panamá hacia el interior o viceversa. Ciudades nombradas: Chitré, Las Tablas, Santiago, David, Aguadulce y Penonomé.",
      },
    ],
    extra:
      "No hay tiempos de tránsito ni tarifas publicadas para estas rutas. Se confirman por WhatsApp según origen, destino y tipo de carga.",
    whatsappMessage:
      "Hola, quiero cotizar un traslado en panel o camión, incluyendo envíos al interior.",
  },
  {
    slug: "zappy-express",
    name: "Zappy Express",
    menuLabel: "Zappy Express",
    h1: "Zappy Express: un remitente, muchos destinos",
    title: "Zappy Express: de la sucursal a muchos clientes | Zappy",
    description:
      "Zappy Express es mensajería en moto: paquetes de un remitente a muchas direcciones en Panamá, con guía individual y evidencia digital.",
    eyebrow: "Un origen, muchos destinos",
    summary:
      "De la sucursal al cliente final en moto, cada paquete con su propia guía.",
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
    h1: "Zappy Business: muchos paquetes, un destino",
    title: "Zappy Business: del almacén a las sucursales | Zappy",
    description:
      "Zappy Business mueve muchos paquetes hacia un mismo lugar en Panamá: del almacén a sucursales, con rebalanceo de inventario y horarios fijos.",
    eyebrow: "Muchos bultos, un lugar",
    summary:
      "Del almacén a las sucursales, con la capacidad del vehículo mejor aprovechada.",
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
