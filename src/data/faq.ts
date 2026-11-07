export type FaqItem = {
  question: string;
  answer: string;
};

/**
 * Cifras y zonas: solo lo publicado en zappydelivery.com.
 * La flota urbana en moto es un dato confirmado por la empresa.
 */
export const faqs: FaqItem[] = [
  {
    question: "¿Zappy Delivery es delivery de comida?",
    answer:
      "No. Zappy Delivery se presenta como una empresa de gestión de transporte y carga logística de última milla para uso comercial: distribución de inventario, traslado de mercancía entre sucursales y servicio puerta a puerta para e-commerce. No es una app de pedidos de comida al consumidor.",
  },
  {
    question: "¿La mensajería en la ciudad es en moto?",
    answer:
      "Sí. En Panamá, la mensajería urbana de Zappy es en moto: tarjetas bancarias, documentos, comercios y Zappy Express. Cuando la carga no cabe en una moto, o el destino es el interior, el servicio es de panel o camión.",
  },
  {
    question: "¿Cuál es la cobertura en la Ciudad de Panamá?",
    answer:
      "El sitio indica cobertura dentro de la Ciudad de Panamá y sus afueras en cuatro zonas: Panamá Centro, Panamá Norte, Panamá Este y Panamá Oeste. No publica un listado de barrios ni de corregimientos.",
  },
  {
    question: "¿Hacen envíos nacionales al interior, por ejemplo a David?",
    answer:
      "Sí, dentro del servicio de traslados en panel o camión: distribución desde la Ciudad de Panamá hacia el interior o viceversa. Las ciudades que el sitio nombra son Chitré, Las Tablas, Santiago, David, Aguadulce y Penonomé. No publica frecuencia ni tiempo de tránsito de esas rutas.",
  },
  {
    question: "¿Entregan tarjetas bancarias?",
    answer:
      "Sí. Zappy ofrece entrega de tarjetas bancarias para instituciones y publica dos resultados de ese servicio: el 97,91 % de las entregas se realiza en menos de 96 horas, y 9 de cada 10 clientes lo califican de bueno o muy bueno en encuestas semanales. Esas cifras están en la página de tarjetas; el sitio no las extiende al resto de servicios.",
  },
  {
    question: "¿Cómo se comprueba que una entrega se hizo?",
    answer:
      "En entregas a comercios, Zappy describe validación de recolectas y entregas con fotos, seguimiento en su sistema logístico y avisos de casos especiales o entregas realizadas. Además, el usuario cuenta con un tablero de control para monitorear la operación.",
  },
  {
    question: "¿Qué diferencia hay entre Zappy Express y Zappy Business?",
    answer:
      "Zappy Express es paquetes individuales a múltiples destinos: de la sucursal al cliente final, con guía individual. Zappy Business es múltiples paquetes a un mismo destino: del almacén a las sucursales, con recolecta, horarios preestablecidos y traslados dentro de la red de tiendas.",
  },
  {
    question: "¿Qué es ZappyPoints?",
    answer:
      "Es el programa de lealtad. El sitio dice que por cada 100 puntos se gana una entrega gratis y que aplican restricciones. Los puntos se acumulan al programar entregas. El reglamento completo no está publicado en la web; hay que consultarlo con la empresa.",
  },
  {
    question: "¿Hasta qué monto responde el seguro?",
    answer:
      "Los términos publicados dicen que Soluciones Operativas, S.A. cuenta con una póliza que cubre daños hasta 100 dólares, salvo que el cliente solicite seguro de carga por un mayor valor y pague la tarifa correspondiente. Esa tarifa no está publicada. También indican que no responden por mercancía frágil mal embalada ni por dinero, joyas, metales preciosos, valores al portador o cheques.",
  },
  {
    question: "¿Pueden cobrar en efectivo al entregar?",
    answer:
      "Según los términos, los conductores solo aceptan cobros en efectivo por mercancía entregada que no excedan 50 dólares, y el monto debe notificarse antes a Soluciones Operativas, S.A.",
  },
  {
    question: "¿Cómo contacto a Zappy Delivery?",
    answer:
      "El canal principal de este sitio es WhatsApp al +507 6600-9480, el mismo número del enlace wa.me publicado en zappydelivery.com. El sitio también registra el teléfono +507 215-5583. El horario de la mensajería corporativa es de lunes a sábado, de 8:00 a.m. a 5:00 p.m. No publica correo ni dirección de calle.",
  },
];

export const homeFaqs = faqs.slice(0, 4);
