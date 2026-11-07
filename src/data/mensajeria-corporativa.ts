import type { FaqItem } from "./faq";
import { site } from "../config/site";

/**
 * Página pilar /servicios/mensajeria-corporativa.
 * Un solo texto para el HTML, el FAQPage y llms-full.txt.
 * Los montos no van aquí: cada modelo lleva un TODO(pricing) para el dueño.
 */

export const corporatePath = "/servicios/mensajeria-corporativa";

export const corporateTitle = "Mensajería corporativa en Panamá | Zappy";

export const corporateDescription =
  "Servicio de mensajería corporativa en Ciudad de Panamá. Lunes a sábado, de 8:00 a.m. a 5:00 p.m. Cotización según volumen.";

if (corporateTitle.length > 60) {
  throw new Error(`Título de mensajería corporativa: ${corporateTitle.length} caracteres.`);
}
if (corporateDescription.length > 155 || !corporateDescription.includes("mensajería corporativa")) {
  throw new Error(`Description de mensajería corporativa: ${corporateDescription.length} caracteres.`);
}

/** Texto del dueño. El único ajuste es el espacio doble después de «y más.» */
export const corporateIntroBody =
  "Zappy Delivery ofrece el servicio de mensajería corporativa para mover documentos y diligencias de una empresa dentro de la Ciudad de Panamá. Trabajamos con bancos, firmas legales, notarías, inmobiliarias, aseguradoras, clínicas y más.";

export const corporateIntroCta = "Pida cotización Gratis";

export const corporateIntro = `${corporateIntroBody} ${corporateIntroCta}.`;

export type CorporateGroup = {
  heading: string;
  paragraphs: string[];
};

export type CorporateSection = {
  id: string;
  heading: string;
  paragraphs?: string[];
  bullets?: string[];
  steps?: string[];
  groups?: CorporateGroup[];
};

export const corporateSections: CorporateSection[] = [
  {
    id: "incluye",
    heading: "Qué incluye el servicio",
    paragraphs: [
      "Sirve para papelería y trámites que salen de una oficina y, muchas veces, tienen que volver. No es el reparto de una tienda ni el camión que surte sucursales. Los conductores van identificados.",
      "Los [términos y condiciones](/terminos-y-condiciones) dicen que la empresa no responde por la pérdida de dinero, cheques, joyas, metales preciosos o valores al portador. Si mueve un cheque, deje el manejo escrito en la cotización. En efectivo, los conductores solo aceptan cobros por mercancía entregada hasta 50 dólares, avisados antes.",
    ],
    bullets: [
      "Documentos de ida y vuelta: retiro en un punto y retorno a su oficina. El resguardo se acuerda antes de despachar.",
      "Cheques y estados de cuenta: cobro en clientes, entrega a proveedores y envío del estado de cuenta.",
      "Trámites: pagos en la Caja de Seguro Social, certificación de cheques en bancos y documentos al Ministerio de Trabajo (Mitradel).",
      "Seguimiento y prueba de entrega. Puede pedir en qué punto va la diligencia. Al entregar hay foto y la firma de quien recibe.",
      "Si no cabe en la moto, el traslado pasa a [panel o camión](/servicios/traslados-panel-camion).",
    ],
  },
  {
    id: "industrias",
    heading: "Industrias",
    paragraphs: [
      "Esto es lo que suele salir de cada oficina. No publicamos nombres de clientes ni un conteo de entregas.",
    ],
    groups: [
      {
        heading: "Banca",
        paragraphs: [
          "Los bancos envían tarjetas, documentos y chequeras. Una chequera sale de la sucursal o del centro de operaciones y llega a la empresa o al titular. Contratos y estados de cuenta van de la oficina del banco a un cliente comercial. La [entrega de tarjetas bancarias](/servicios/entrega-de-tarjetas-bancarias) publica sus propias cifras: 97,91 % en menos de 96 horas, y 9 de cada 10 lo califican de bueno o muy bueno. Esas cifras no aplican a chequeras ni a esta mensajería.",
        ],
      },
      {
        heading: "Firmas legales y notarías",
        paragraphs: [
          "Un bufete mueve escrituras, contratos y documentos para firma. Van a la notaría, al cliente o a la otra parte, y regresan al abogado si el retorno quedó pedido. También hay copias para un registro o un juzgado. No hay un tiempo de espera publicado para la notaría. Recoger lo firmado después es otra parada.",
        ],
      },
      {
        heading: "Inmobiliario",
        paragraphs: [
          "Una promotora o una corredora envía contratos, documentos de cierre y, si se acuerda, llaves. El sobre sale de la sala de ventas hacia la notaría, el comprador o el banco. En un cierre viajan la promesa y el papel que debe volver firmado. Las llaves se anotan: de dónde salen y quién las recibe. No hay un protocolo publicado solo para llaves.",
        ],
      },
      {
        heading: "Aseguradoras",
        paragraphs: [
          "Una aseguradora mueve pólizas, endosos y documentos de reclamos entre sucursal, corredor y asegurado. El formulario sale y vuelve firmado. El endoso va al corredor si esa zona está en la ruta del día. El efectivo del reclamo no va incluido: el tope publicado es 50 dólares, con aviso previo.",
        ],
      },
      {
        heading: "Clínicas y laboratorios",
        paragraphs: [
          "Una clínica o un laboratorio envía resultados, órdenes y documentos médicos entre sedes, al médico o al paciente, con el sobre cerrado. La orden va de la consulta al laboratorio. El informe vuelve al consultorio. El mensajero no abre el sobre. Si la clínica embala muestras o papeles, se pueden llevar. No hay certificación de cadena de frío ni de material biopeligroso. Si necesita frío o empaque de riesgo biológico, consúltenos. Si no corresponde, no lo recibimos.",
        ],
      },
    ],
  },
  {
    id: "cobertura",
    heading: "Cobertura y horario",
    paragraphs: [
      "La mensajería en moto cubre toda la Ciudad de Panamá. En el sitio, esa cobertura se describe en cuatro zonas: Panamá Centro, Panamá Norte, Panamá Este y Panamá Oeste, incluidas las afueras. El detalle de las zonas está en [cobertura](/cobertura). No publicamos barrios ni corregimientos. Con la dirección, la cotización dice si entra en la ruta.",
      `El horario es de ${site.serviceHours} Lo que llega fuera de ese horario, o un domingo, se coordina para la siguiente ventana.`,
      "El interior no va en esta moto. Va en [panel o camión](/servicios/traslados-panel-camion), de la Ciudad de Panamá hacia el interior o de regreso. Las ciudades nombradas son Chitré, Las Tablas, Santiago, David, Aguadulce y Penonomé. No hay salidas ni tiempos de tránsito publicados. Se cotiza aparte.",
    ],
  },
  {
    id: "como-funciona",
    heading: "Cómo funciona",
    paragraphs: [
      "Lo que entra en el horario se coordina para salir el mismo día si la zona y el mensajero alcanzan. No hay un plazo en minutos ni un porcentaje publicado para este servicio. El 97,91 % en menos de 96 horas es de tarjetas, no de documentos. Si la entrega falla por dirección, ausencia, sin respuesta, zona insegura, mal acceso o clima muy desfavorable, los [términos](/terminos-y-condiciones) permiten otra fecha y un cobro adicional.",
    ],
    steps: [
      `Escriba por WhatsApp al ${site.whatsappDisplay} o llame al ${site.phoneDisplay}. Diga qué sale, desde dónde, hacia dónde y si vuelve.`,
      "Diga cuántas entregas hace en la semana y en qué zonas. Ahí se arma la cotización. No hay precio en la web.",
      `En el horario de ${site.serviceHours}, un mensajero en moto retira en su oficina o donde usted indique.`,
      "Entrega en la dirección. Si es ida y vuelta, regresa el documento a su oficina.",
      "Puede pedir el estado. La prueba de entrega incluye una foto y la firma de quien recibe.",
    ],
  },
  {
    id: "tarifas",
    heading: "Modelos de tarifa",
    paragraphs: [
      `No publicamos montos. La cotización es según volumen, zona y tipo de diligencia. El número se confirma por WhatsApp al ${site.whatsappDisplay} o en [contacto](/contacto).`,
    ],
    groups: [
      // TODO(pricing): tarifa por entrega según zona. El dueño sustituye este texto cuando confirme el modelo. No escribir montos en dólares.
      {
        heading: "Tarifa por entrega según zona",
        paragraphs: [
          "Cada entrega se cotiza según la zona de la Ciudad de Panamá. Una parada en el centro no recorre lo mismo que un cruce al este o al oeste. Cotización según volumen. Si la semana mezcla zonas, se separan.",
        ],
      },
      // TODO(pricing): planes mensuales por volumen. El dueño sustituye este texto cuando confirme el modelo. No escribir montos en dólares.
      {
        heading: "Planes mensuales por volumen",
        paragraphs: [
          "Si despacha todas las semanas, se arma un plan del mes y el precio por entrega se conversa en bloque. Cotización según volumen. El plan se factura cada mes. También hay crédito corporativo. El plazo de pago y el cupo se acuerdan con cada empresa.",
        ],
      },
      // TODO(pricing): ruta dedicada o mensajero fijo por día. El dueño sustituye este texto cuando confirme el modelo. No escribir montos en dólares.
      {
        heading: "Ruta dedicada o mensajero fijo por día",
        paragraphs: [
          `Un mensajero en moto queda con su empresa durante el horario, para banco, notaría, sucursal y registro en la misma jornada. Cotización según volumen y las horas, dentro del horario de ${site.serviceHours}`,
        ],
      },
      // TODO(pricing): entregas urgentes. El dueño sustituye este texto cuando confirme el modelo. No escribir montos en dólares.
      {
        heading: "Entregas urgentes",
        paragraphs: [
          "Es lo que no puede esperar a la siguiente agrupación. El mensajero sale a esa dirección y deja otras paradas, así que se cotiza aparte. Cotización según volumen y la ventana. No hay minutos garantizados.",
        ],
      },
    ],
  },
  {
    id: "por-que",
    heading: "Por qué Zappy",
    paragraphs: [
      `En la ciudad la flota es de mensajeros en moto. Los conductores van identificados. Opera ${site.legalName}, en ${site.city}. WhatsApp ${site.whatsappDisplay} y teléfono ${site.phoneDisplay}.`,
      "No reemplaza a los otros servicios. Tienda: [entregas a comercios y e-commerce](/servicios/entregas-comercios-ecommerce). Un punto y muchas direcciones: [Zappy Express](/servicios/zappy-express). Muchos bultos a un lugar: [Zappy Business](/servicios/zappy-business). Lo que no cabe en la moto, o sale al interior, va en panel o camión.",
      "Dos guías del blog: [mensajería corporativa para trámites en la CSS, el Mitradel y cheques](/blog/mensajeria-corporativa-tramites-css-mitradel-cheques) y [cómo elegir una empresa de mensajería en Panamá](/blog/como-elegir-empresa-de-mensajeria-en-panama).",
    ],
  },
];

export const corporateFaqs: FaqItem[] = [
  {
    question: "¿La mensajería corporativa cubre toda la Ciudad de Panamá?",
    answer:
      "Sí. La moto cubre toda la Ciudad de Panamá: Centro, Norte, Este y Oeste, con las afueras. No publicamos barrios. Con la dirección decimos si entra en la ruta.",
  },
  {
    question: "¿Cuál es el horario del servicio?",
    answer: `El horario es de ${site.serviceHours} WhatsApp ${site.whatsappDisplay} y teléfono ${site.phoneDisplay}.`,
  },
  {
    question: "¿Hacen entregas el mismo día?",
    answer:
      "Sale el mismo día si entra en el horario y hay mensajero para esa zona. No hay plazo máximo ni porcentaje publicado. Se confirma al cotizar. Las cifras de tarjetas no aplican.",
  },
  {
    question: "¿Dan prueba de entrega o piden firma?",
    answer:
      "Sí. En la mensajería corporativa la prueba de entrega incluye las dos cosas: una foto y la firma de quien recibe.",
  },
  {
    question: "¿Cómo tratan la confidencialidad de los documentos?",
    answer:
      "Los términos dicen que la empresa no abre los bultos e ignora su contenido. El mensajero va identificado. Envíe el sobre cerrado. No hay una política de confidencialidad ni una certificación publicadas. Si necesita un acuerdo firmado, consúltenos.",
  },
  {
    question: "¿Facturan a la empresa y manejan crédito corporativo?",
    answer: `Sí. ${site.legalName} ofrece crédito corporativo y facturación mensual a las empresas. El plazo de pago y el cupo se acuerdan con cada empresa. No hay un plazo ni un límite únicos publicados.`,
  },
  {
    question: "¿Cómo solicito la mensajería corporativa?",
    answer: `Por WhatsApp al ${site.whatsappDisplay} o al teléfono ${site.phoneDisplay}. Diga qué se envía, las direcciones, si vuelve y cuántas entregas hace a la semana. La página de contacto abre el mismo chat.`,
  },
  {
    question: "¿Hacen entregas al interior del país?",
    answer:
      "En moto, no: eso es Ciudad de Panamá. El interior va en panel o camión, de ida o de regreso. Ciudades nombradas: Chitré, Las Tablas, Santiago, David, Aguadulce y Penonomé. Sin frecuencia ni tránsito publicados. Se cotiza aparte.",
  },
  {
    question: "¿Pueden llevar cheques, pagos a la CSS o documentos al Mitradel?",
    answer:
      "Sí: cobro y entrega de cheques, estados de cuenta, pagos en la CSS, certificación en bancos y papeles al Mitradel. Según los términos, la empresa no responde por la pérdida de cheques o valores. Acuerde el manejo antes.",
  },
  {
    question: "¿Transportan muestras de laboratorio o material que necesite frío?",
    answer:
      "Llevamos documentos médicos y sobres cerrados por la clínica. No hay certificación publicada de cadena de frío ni de material biopeligroso. Si necesita frío o empaque de riesgo biológico, consúltenos antes. Si no corresponde, no lo recibimos.",
  },
  {
    question: "¿Puedo contratar un mensajero fijo?",
    answer: `Sí. Es una ruta dedicada: un mensajero en moto con su empresa durante el horario de ${site.serviceHours} Sin precio publicado. Cotización según volumen y las horas. WhatsApp ${site.whatsappDisplay}.`,
  },
  {
    question: "¿Esto reemplaza al reparto de una tienda o a la entrega de tarjetas?",
    answer:
      "No. Aquí van documentos y diligencias. La tienda usa entregas a comercios. La tarjeta tiene cifras aparte. Express reparte a muchos destinos. Business lleva muchos bultos a un lugar. Si mezcla oficina y tienda, lo separamos al cotizar.",
  },
];

export const corporateCta = `Díganos qué sale esta semana, las zonas y si el documento vuelve. WhatsApp ${site.whatsappDisplay}. Teléfono ${site.phoneDisplay}. ${site.legalName}, ${site.city}.`;
