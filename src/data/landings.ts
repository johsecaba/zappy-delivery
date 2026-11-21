import type { FaqItem } from "./faq";
import type { Cta } from "../lib/quote";
import { getService, type Service } from "./services";

export type LandingImage = {
  name:
    | "credit-cards"
    | "fragile"
    | "wine"
    | "art"
    | "medicine"
    | "legal"
    | "real-estate"
    | "insurance"
    | "home-hero"
    | "corporativa-hero";
  alt: string;
  loading?: "eager" | "lazy";
};

export type TextBlock = {
  title: string;
  body: string;
};

export type IndustryBlock = {
  title: string;
  body: string;
  examplesLabel: string;
  examples: string[];
  note?: string;
  cta: Cta;
  image?: LandingImage;
};

export type StepBlock = {
  title: string;
  body: string;
};

export type LandingSection =
  | { type: "intro"; heading: string; paragraphs: string[] }
  | {
      type: "cards";
      heading: string;
      description?: string;
      cards: TextBlock[];
      note?: string;
      cta?: Cta;
    }
  | { type: "industries"; heading: string; description: string; items: IndustryBlock[] }
  | {
      type: "points";
      heading: string;
      paragraphs?: string[];
      items: TextBlock[];
      cta?: Cta;
      images?: LandingImage[];
    }
  | { type: "steps"; heading: string; steps: StepBlock[]; cta?: Cta }
  | { type: "types"; heading: string; items: TextBlock[]; note?: string }
  | { type: "callout"; heading: string; paragraphs: string[]; cta: Cta; image?: LandingImage }
  | { type: "faq"; heading: string; items: FaqItem[] }
  | { type: "close"; heading: string; paragraphs: string[]; primary: Cta; secondary: Cta };

export type Landing = {
  service: Service;
  hero: string;
  heroImage?: LandingImage;
  primary: Cta;
  secondary: Cta;
  sections: LandingSection[];
};

const corporate = getService("mensajeria-corporativa");
const banking = getService("mensajeria-bancaria");
const commerce = getService("entregas-comercios-ecommerce");

if (!corporate || !banking || !commerce) {
  throw new Error("Faltan servicios de las landings.");
}

const corporateWa = corporate.whatsappMessage;
const bankingWa = banking.whatsappMessage;
const commerceWa = commerce.whatsappMessage;

function quote(label: string, service: string, message: string): Cta {
  return { kind: "quote", label, service, message };
}

function whatsapp(label: string, message: string): Cta {
  return { kind: "whatsapp", label, message };
}

export const landings: Landing[] = [
  {
    service: corporate,
    hero: corporate.intro,
    heroImage: {
      name: "corporativa-hero",
      alt: "Mensajero entrega un sobre a un ejecutivo frente a la puerta de un banco, junto a una moto con caja de reparto.",
      loading: "eager",
    },
    primary: quote(
      "Solicitar propuesta corporativa",
      corporate.name,
      "Solicito una propuesta de mensajería corporativa.",
    ),
    secondary: quote(
      "Cotizar una diligencia",
      corporate.name,
      "Quiero cotizar una diligencia de mensajería corporativa.",
    ),
    sections: [
      {
        type: "intro",
        heading: "Su equipo se enfoca en el negocio. Zappy se encarga del recorrido.",
        paragraphs: [
          "Un contrato por firmar, un expediente por entregar o correspondencia que debe llegar a otra sucursal. Son tareas que mantienen su empresa funcionando y que necesitan atención.",
          "Con Zappy, puede delegar esos recorridos y contar con un equipo que coordine las instrucciones y dé seguimiento a sus solicitudes.",
        ],
      },
      {
        type: "cards",
        heading: "¿Qué incluye nuestra mensajería corporativa?",
        description:
          "Apoyo para las entregas y gestiones que forman parte del trabajo diario de su organización.",
        cards: [
          {
            title: "Documentos y correspondencia",
            body: "Retiro y entrega de contratos, facturas, cartas, formularios y documentación entre su empresa y los destinatarios indicados.",
          },
          {
            title: "Firmas y retorno de documentos",
            body: "Traslado de documentos que necesitan firma, sello o constancia de recibido, con devolución al punto acordado.",
          },
          {
            title: "Valija entre oficinas y sucursales",
            body: "Movimiento de correspondencia y documentación interna entre sedes, sucursales y oficinas administrativas.",
          },
          {
            title: "Diligencias administrativas",
            body: "Presentación y retiro de documentos ante empresas y entidades públicas, según los requisitos y autorizaciones de cada gestión.",
          },
          {
            title: "Paquetes pequeños y materiales de oficina",
            body: "Traslado de artículos y materiales compatibles con el servicio, previa confirmación de dimensiones y condiciones de transporte.",
          },
          {
            title: "Coordinación y seguimiento",
            body: "Atención para organizar retiros, comunicar instrucciones y dar seguimiento a las novedades de cada solicitud.",
          },
        ],
        cta: whatsapp(
          "Consultar mi diligencia",
          "Hola, quiero consultar una diligencia de mensajería corporativa para mi empresa con Zappy Delivery.",
        ),
      },
      {
        type: "industries",
        heading: "Mensajería que entiende las necesidades de su industria",
        description:
          "Cada sector mueve documentos distintos y trabaja con sus propios procesos. Coordinamos el servicio según los destinatarios, horarios e instrucciones de su organización.",
        items: [
          {
            title: "Bancos y entidades financieras",
            body: "Documentos, cheques y correspondencia entre sucursales, oficinas administrativas y clientes. Apoyo para los recorridos que mantienen conectada su operación.",
            examplesLabel: "Ejemplos de solicitudes:",
            examples: [
              "Traslado de documentación entre sucursales.",
              "Retiro y entrega de cheques.",
              "Entrega de contratos y formularios.",
              "Retorno de documentos firmados.",
            ],
            image: {
              name: "credit-cards",
              alt: "Mensajero entrega un sobre a un ejecutivo en un escritorio, con una tarjeta bancaria y un escudo de verificación al fondo.",
            },
            cta: { kind: "link", label: "Conocer Más", href: "/servicios/mensajeria-bancaria" },
          },
          {
            title: "Firmas legales y notarías",
            body: "Traslado de contratos, expedientes y documentación entre su firma, clientes, notarías y entidades. Coordinación de entregas que requieren firma, sello o retorno.",
            examplesLabel: "Ejemplos de solicitudes:",
            examples: [
              "Entrega y retiro de expedientes.",
              "Traslado de contratos para firma.",
              "Presentación y retiro de documentación autorizada.",
              "Devolución de documentos con constancia de recibido.",
            ],
            image: {
              name: "legal",
              alt: "Mensajero entrega un sobre a un abogado en su escritorio, frente a un estante de expedientes, un documento firmado y un sello.",
            },
            cta: quote(
              "Cotizar mensajería legal",
              corporate.name,
              "Quiero cotizar mensajería legal para firmas legales y notarías.",
            ),
          },
          {
            title: "Inmobiliarias y administradores de propiedades",
            body: "Mensajería para conectar su oficina con propietarios, compradores, arrendatarios y administraciones de edificios.",
            examplesLabel: "Ejemplos de solicitudes:",
            examples: [
              "Entrega de contratos de arrendamiento y compraventa.",
              "Retiro de formularios y documentos de clientes.",
              "Traslado de comunicaciones a administraciones.",
              "Retorno de contratos firmados.",
            ],
            image: {
              name: "real-estate",
              alt: "Mensajero entrega un folder y unas llaves a un agente inmobiliario, con un edificio y un ícono de casa al fondo.",
            },
            cta: quote(
              "Cotizar mensajería inmobiliaria",
              corporate.name,
              "Quiero cotizar mensajería inmobiliaria para inmobiliarias y administradores de propiedades.",
            ),
          },
          {
            title: "Aseguradoras y corredores de seguros",
            body: "Apoyo para mover la documentación que conecta a su equipo con asegurados, corredores y oficinas de atención.",
            examplesLabel: "Ejemplos de solicitudes:",
            examples: [
              "Entrega de pólizas y comunicaciones.",
              "Retiro de formularios y solicitudes firmadas.",
              "Traslado de documentación de reclamos.",
              "Correspondencia entre oficinas y sucursales.",
            ],
            image: {
              name: "insurance",
              alt: "Mensajero entrega un sobre con un documento a un asesor, con un escudo y un paraguas que representan un seguro.",
            },
            cta: quote(
              "Cotizar mensajería para seguros",
              corporate.name,
              "Quiero cotizar mensajería para aseguradoras y corredores de seguros.",
            ),
          },
          {
            title: "Clínicas y laboratorios",
            body: "Traslado de documentación administrativa entre centros de atención, oficinas, proveedores y destinatarios autorizados.",
            examplesLabel: "Ejemplos de solicitudes:",
            examples: [
              "Entrega de facturas y documentación a aseguradoras.",
              "Correspondencia entre sedes.",
              "Retiro de formularios y documentos administrativos.",
              "Traslado de materiales de oficina compatibles con el servicio.",
            ],
            note: "El traslado de muestras biológicas, medicamentos o materiales que requieran cadena de frío debe consultarse como una operación especializada.",
            image: {
              name: "medicine",
              alt: "Mensajero de Zappy entrega una bolsa con una cruz médica a un paciente en la puerta de su casa, junto a un ícono de cápsula y un escudo de verificación.",
            },
            cta: quote(
              "Cotizar mensajería para el sector salud",
              corporate.name,
              "Quiero cotizar mensajería para clínicas y laboratorios.",
            ),
          },
          {
            title: "Comercios y e-commerce",
            body: "Entregas desde su tienda o punto de despacho hasta sus clientes, con atención al cuidado de productos frágiles o delicados y una presentación profesional de los mensajeros que represente a su marca.",
            examplesLabel: "Ejemplos de solicitudes:",
            examples: [
              "Entrega de pedidos de tiendas físicas y online.",
              "Traslado de regalos, arreglos florales y productos delicados.",
              "Entrega de vinos, botellas y estuches con empaque protector.",
              "Distribución de pedidos recurrentes a sus clientes.",
            ],
            image: {
              name: "fragile",
              alt: "Mensajero carga una caja marcada como frágil, con burbujas visibles, junto a una moto.",
            },
            cta: {
              kind: "link",
              label: "Conocer Más",
              href: "/servicios/entregas-comercios-ecommerce",
            },
          },
        ],
      },
      {
        type: "points",
        heading: "Una forma más práctica de resolver las diligencias de su empresa",
        items: [
          {
            title: "Menos interrupciones para su personal",
            body: "Su equipo puede continuar con sus funciones mientras nosotros realizamos los recorridos.",
          },
          {
            title: "Atención personalizada",
            body: "Coordine las necesidades de su empresa y las instrucciones particulares de cada solicitud.",
          },
          {
            title: "Mensajeros identificados",
            body: "Facilite la coordinación de retiros y entregas en sus oficinas y puntos de destino.",
          },
          {
            title: "Seguimiento de las diligencias",
            body: "Mantenga comunicación sobre el avance del servicio y las novedades que necesitan una decisión.",
          },
        ],
      },
      {
        type: "steps",
        heading: "Cuéntenos qué necesita mover. Coordinamos el resto.",
        steps: [
          {
            title: "Paso 1 — Envíe su solicitud",
            body: "Indique qué debemos retirar, las direcciones, los contactos y el horario de atención de cada punto.",
          },
          {
            title: "Paso 2 — Confirme las instrucciones",
            body: "Definimos la tarifa y el alcance, incluidos los retornos, las paradas y los requisitos de la diligencia.",
          },
          {
            title: "Paso 3 — Delegue el recorrido",
            body: "Nuestro equipo realiza el servicio y da seguimiento a su solicitud.",
          },
        ],
        cta: quote("Solicitar mensajería", corporate.name, "Quiero solicitar mensajería corporativa."),
      },
      {
        type: "callout",
        heading: "¿Su empresa necesita mensajería todas las semanas?",
        paragraphs: [
          "Si tiene recorridos habituales entre oficinas, clientes o proveedores, compártanos su frecuencia y volumen de solicitudes.",
          "Evaluamos sus necesidades para proponer una coordinación recurrente que facilite la planificación de sus diligencias.",
        ],
        cta: whatsapp(
          "Consultar servicio recurrente",
          "Hola, quiero consultar el servicio recurrente de mensajería corporativa para mi empresa con Zappy Delivery.",
        ),
      },
      {
        type: "callout",
        heading: "Conectamos su empresa con sus destinos habituales",
        paragraphs: [
          "Consulte disponibilidad de mensajería corporativa en Ciudad de Panamá, Panamá Norte, Panamá Este y Panamá Oeste.",
          "Envíenos sus puntos de retiro y entrega para confirmar cobertura y condiciones.",
        ],
        cta: whatsapp(
          "Consultar mi ruta",
          "Hola, quiero consultar la ruta de mensajería corporativa para mi empresa con Zappy Delivery.",
        ),
      },
      {
        type: "faq",
        heading: "Preguntas frecuentes",
        items: [
          {
            question: "¿Qué tipo de empresas pueden contratar el servicio?",
            answer:
              "Atendemos organizaciones que necesitan trasladar documentos, correspondencia y paquetes pequeños, o realizar diligencias administrativas. Coordinamos cada solicitud según su industria y operación.",
          },
          {
            question: "¿Puedo solicitar una sola diligencia?",
            answer:
              "Sí. Compártanos el recorrido y el tipo de gestión para consultar disponibilidad y recibir una cotización.",
          },
          {
            question: "¿Pueden devolver documentos firmados?",
            answer:
              "Sí. Indique desde el inicio qué documentos deben regresar y quién debe firmarlos o recibirlos en cada punto.",
          },
          {
            question: "¿Realizan trámites ante entidades públicas?",
            answer:
              "Evaluamos gestiones de presentación y retiro de documentación. Su ejecución depende de los requisitos de la entidad y de las autorizaciones que deba aportar su empresa.",
          },
          {
            question: "¿Atienden solicitudes urgentes?",
            answer:
              "Consulte disponibilidad e indique la hora límite antes de contratar. Confirmaremos si podemos atender el recorrido dentro del plazo solicitado.",
          },
          {
            question: "¿Cómo se calcula la tarifa?",
            answer:
              "Según las ubicaciones, las paradas, el tipo de diligencia y las necesidades de espera o retorno. Para solicitudes recurrentes, también evaluamos la frecuencia y el volumen.",
          },
        ],
      },
      {
        type: "close",
        heading: "Las diligencias de su empresa, en manos de Zappy",
        paragraphs: [
          "Desde una entrega puntual hasta recorridos habituales entre oficinas, le ayudamos a mantener su operación en movimiento.",
          "Cuéntenos qué necesita resolver y solicite una propuesta para su empresa.",
        ],
        primary: quote(
          "Solicitar propuesta corporativa",
          corporate.name,
          "Solicito una propuesta de mensajería corporativa.",
        ),
        secondary: whatsapp("Hablar por WhatsApp", corporateWa),
      },
    ],
  },
  {
    service: banking,
    hero: banking.intro,
    heroImage: {
      name: "credit-cards",
      alt: "Mensajero entrega un sobre a un ejecutivo en un escritorio, con una tarjeta bancaria y un escudo de verificación al fondo.",
      loading: "eager",
    },
    primary: quote(
      "Solicitar propuesta bancaria",
      banking.name,
      "Solicito una propuesta de mensajería bancaria.",
    ),
    secondary: whatsapp("Hablar con un asesor", bankingWa),
    sections: [
      {
        type: "intro",
        heading: "Cada documento tiene un destino. Cada diligencia necesita seguimiento.",
        paragraphs: [
          "Una operación bancaria requiere coordinar entregas, cumplir instrucciones y mantener comunicación cuando surge una novedad.",
          "En Zappy apoyamos a su institución con los recorridos que conectan sus sucursales, áreas administrativas y clientes, para que su equipo pueda concentrarse en atender y gestionar su negocio.",
        ],
      },
      {
        type: "cards",
        heading: "¿Qué incluye nuestra mensajería bancaria?",
        description:
          "Organizamos cada recorrido según el tipo de documento, los puntos de atención y las instrucciones de su institución.",
        cards: [
          {
            title: "Documentos y expedientes",
            body: "Retiro y entrega de formularios, contratos, solicitudes y expedientes entre oficinas, sucursales y destinatarios autorizados.",
          },
          {
            title: "Retiro y entrega de cheques",
            body: "Traslado de cheques entre los puntos y destinatarios indicados por su institución, bajo las condiciones de manejo acordadas para el servicio.",
          },
          {
            title: "Valija entre sucursales",
            body: "Traslado de correspondencia y documentación interna entre sucursales, casa matriz y oficinas de apoyo.",
          },
          {
            title: "Documentos para firma y retorno",
            body: "Entrega de documentos que requieren firma o constancia de recibido, con retorno al área solicitante según las instrucciones proporcionadas.",
          },
          {
            title: "Diligencias bancarias y administrativas",
            body: "Presentación y retiro de documentación, certificación de cheques y otras gestiones previamente coordinadas, sujetas a los requisitos de cada entidad.",
          },
          {
            title: "Entrega de estados de cuenta y comunicaciones",
            body: "Distribución de estados de cuenta, cartas y comunicaciones físicas a clientes o contactos designados por su institución.",
          },
        ],
        note: "Antes de iniciar, coordinamos los responsables de recepción, los horarios de atención y los documentos o comprobantes que deben regresar.",
        cta: quote("Cotizar mi operación", banking.name, "Quiero cotizar la operación de mensajería bancaria."),
      },
      {
        type: "points",
        heading: "Más control sobre las diligencias de su institución",
        items: [
          {
            title: "Mensajeros identificados",
            body: "Personal identificado para realizar los retiros y las entregas en los puntos acordados.",
          },
          {
            title: "Seguimiento durante el servicio",
            body: "Comunicación para conocer el avance de las diligencias y atender novedades en el recorrido.",
          },
          {
            title: "Coordinación de instrucciones",
            body: "Definición de destinatarios, horarios y requisitos de retorno antes de realizar cada solicitud.",
          },
          {
            title: "Apoyo a su equipo interno",
            body: "Delegue los traslados y reduzca las interrupciones que generan las diligencias fuera de la oficina.",
          },
        ],
      },
      {
        type: "callout",
        heading: "¿Necesita distribuir tarjetas bancarias?",
        paragraphs: [
          "La entrega de tarjetas requiere una operación específica. Conozca nuestro servicio especializado y consulte los procedimientos disponibles para su institución.",
        ],
        cta: whatsapp(
          "Consultar entrega de tarjetas bancarias",
          "Hola, quiero consultar la entrega de tarjetas bancarias para mi institución con Zappy Delivery.",
        ),
      },
      {
        type: "steps",
        heading: "Una operación coordinada desde el primer retiro",
        steps: [
          {
            title: "Paso 1 — Definimos sus necesidades",
            body: "Cuéntenos qué documentación necesita trasladar, entre qué puntos y con qué frecuencia.",
          },
          {
            title: "Paso 2 — Acordamos las condiciones",
            body: "Coordinamos el alcance, los horarios, los destinatarios y las instrucciones de entrega y retorno.",
          },
          {
            title: "Paso 3 — Ejecutamos los recorridos",
            body: "Realizamos las diligencias y mantenemos comunicación sobre su avance y las novedades que requieran atención.",
          },
        ],
      },
      {
        type: "callout",
        heading: "Conectamos sus puntos de operación en Panamá",
        paragraphs: [
          "Consulte disponibilidad para recorridos en Ciudad de Panamá, Panamá Norte, Panamá Este y Panamá Oeste.",
          "Compártanos las ubicaciones de sus sucursales y oficinas para evaluar cobertura, tiempos y condiciones del servicio.",
        ],
        cta: whatsapp(
          "Consultar cobertura bancaria",
          "Hola, quiero consultar la cobertura de mensajería bancaria para mi institución con Zappy Delivery.",
        ),
      },
      {
        type: "faq",
        heading: "Preguntas frecuentes",
        items: [
          {
            question: "¿Qué instituciones pueden solicitar el servicio?",
            answer:
              "Bancos, financieras, cooperativas y otras organizaciones que necesitan trasladar documentación y coordinar diligencias relacionadas con su operación financiera.",
          },
          {
            question: "¿Pueden trasladar documentos entre sucursales?",
            answer:
              "Sí. Coordinamos el retiro y la entrega de correspondencia y documentación entre los puntos indicados por su institución.",
          },
          {
            question: "¿Pueden entregar documentos y devolverlos firmados?",
            answer:
              "Sí. La solicitud debe indicar quién recibe, qué documentos requieren firma y a qué oficina deben regresar. La persona firmante debe conocer previamente la gestión.",
          },
          {
            question: "¿El servicio incluye transporte de efectivo?",
            answer:
              "Esta propuesta contempla documentos, cheques y correspondencia. Cualquier solicitud de traslado de valores requiere una evaluación específica y aceptación expresa antes de contratarse.",
          },
          {
            question: "¿Pueden atender recorridos recurrentes?",
            answer:
              "Compártanos la frecuencia, los puntos de atención y el volumen de documentación para evaluar una propuesta acorde con su operación.",
          },
          {
            question: "¿Cómo se cotiza el servicio?",
            answer:
              "Consideramos los recorridos, la frecuencia, las paradas y las gestiones necesarias, incluidos los retornos y tiempos de espera previstos.",
          },
        ],
      },
      {
        type: "close",
        heading: "Su operación bancaria necesita un aliado que responda",
        paragraphs: [
          "Cuéntenos cómo se mueven los documentos de su institución. Le ayudamos a coordinar una solución de mensajería para sus sucursales, oficinas y clientes.",
        ],
        primary: quote(
          "Solicitar propuesta bancaria",
          banking.name,
          "Solicito una propuesta de mensajería bancaria.",
        ),
        secondary: whatsapp("Consultar por WhatsApp", bankingWa),
      },
    ],
  },
  {
    service: commerce,
    hero: commerce.intro,
    heroImage: {
      name: "fragile",
      alt: "Mensajero carga una caja marcada como frágil, con burbujas visibles, junto a una moto.",
      loading: "eager",
    },
    primary: quote(
      "Cotizar entregas para mi comercio",
      commerce.name,
      "Quiero cotizar entregas para mi comercio o e-commerce.",
    ),
    secondary: whatsapp("Hablar por WhatsApp", commerceWa),
    sections: [
      {
        type: "intro",
        heading: "La experiencia de compra termina cuando el pedido llega a sus manos.",
        paragraphs: [
          "Usted cuida el producto, el empaque y la atención en su tienda. La entrega debe estar a la misma altura.",
          "Una caja golpeada, un empaque maltratado o una atención descuidada pueden afectar la impresión que su cliente se lleva del negocio.",
          "En Zappy ayudamos a que ese último contacto refleje el cuidado con el que usted preparó cada pedido.",
        ],
      },
      {
        type: "cards",
        heading: "¿Qué incluye nuestro servicio de entregas?",
        description:
          "Cuidado del producto, atención al destinatario y visibilidad para su comercio durante el recorrido.",
        cards: [
          {
            title: "Retiro en su tienda o punto de despacho",
            body: "Recogemos los pedidos en la ubicación acordada y coordinamos con su equipo las instrucciones necesarias para cada entrega.",
          },
          {
            title: "Atención a productos frágiles o delicados",
            body: "Antes del retiro, revisamos con su comercio las características del producto, su empaque y las condiciones de traslado que necesita.",
          },
          {
            title: "Mensajeros con presentación profesional",
            body: "Personal identificado, presentación cuidada y trato respetuoso al recoger sus pedidos y atender a sus clientes.",
          },
          {
            title: "Instrucciones especiales de entrega",
            body: "Coordinamos indicaciones como mantener el paquete en posición vertical, entregarlo a una persona específica o contactar al destinatario al llegar, según la viabilidad del servicio.",
          },
          {
            title: "Evidencia de retiro y entrega",
            body: "Registro fotográfico de la recolección y la entrega para respaldar el seguimiento de sus pedidos.",
          },
          {
            title: "Seguimiento y notificaciones",
            body: "Consulte el avance de sus entregas mediante el sistema logístico y reciba avisos sobre entregas realizadas o novedades que requieran atención.",
          },
        ],
        cta: whatsapp(
          "Consultar si podemos entregar mi producto",
          "Hola, quiero consultar si pueden entregar el producto de mi comercio o e-commerce con Zappy Delivery.",
        ),
      },
      {
        type: "points",
        heading: "Hay productos que necesitan más atención en cada traslado.",
        paragraphs: [
          "Arreglos florales, regalos, cosméticos, piezas artesanales o artículos de vidrio: el tipo de producto y su presentación influyen en cómo debe transportarse.",
          "Compártanos qué vende, cómo lo empaca y qué cuidados requiere. Evaluamos las condiciones del envío para coordinar una opción de transporte adecuada.",
        ],
        items: [
          {
            title: "Empaque preparado para el recorrido",
            body: "El producto debe contar con protección apropiada para su fragilidad, peso y dimensiones.",
          },
          {
            title: "Cuidados definidos antes del retiro",
            body: "Indíquenos si requiere una orientación específica, protección frente a presión u otras precauciones de manipulación.",
          },
          {
            title: "Vehículo según las características del pedido",
            body: "Evaluamos el traslado en moto, panel o camión según el tamaño, la estabilidad y las necesidades del producto.",
          },
        ],
        cta: quote(
          "Evaluar mis productos y empaques",
          commerce.name,
          "Quiero evaluar mis productos y empaques para las entregas de mi comercio.",
        ),
      },
      {
        type: "points",
        heading: "El mensajero también forma parte de la experiencia con su marca.",
        paragraphs: [
          "Para su cliente, quien entrega el pedido es el último contacto de la compra. Su presentación, su comunicación y la forma en que entrega el paquete importan.",
          "Nuestro servicio está pensado para comercios que esperan una atención profesional en ese momento.",
        ],
        items: [
          {
            title: "Presentación cuidada",
            body: "Mensajeros identificados y con una apariencia acorde con la atención a clientes.",
          },
          {
            title: "Trato respetuoso",
            body: "Comunicación cordial con el personal de su comercio, el destinatario y los equipos de recepción.",
          },
          {
            title: "Cuidado al entregar",
            body: "Atención al manipular el paquete y seguir las instrucciones previamente coordinadas.",
          },
          {
            title: "Comunicación ante novedades",
            body: "Si el destinatario no responde o surge una dificultad de acceso, coordinamos el siguiente paso con su comercio.",
          },
        ],
      },
      {
        type: "types",
        heading: "Para negocios donde el producto y su presentación importan",
        items: [
          {
            title: "Florerías y tiendas de regalos",
            body: "Arreglos, cajas de regalo y detalles que requieren atención a su forma, posición y presentación.",
          },
          {
            title: "Cosmética, perfumería y cuidado personal",
            body: "Productos con envases delicados, sets y estuches cuya presentación forma parte de la compra.",
          },
          {
            title: "Decoración, artesanías y artículos para el hogar",
            body: "Piezas que necesitan protección y condiciones de transporte acordes con sus materiales y dimensiones.",
          },
          {
            title: "Boutiques, accesorios y marcas de autor",
            body: "Pedidos preparados con empaques cuidados y una experiencia de entrega que debe acompañar la identidad del negocio.",
          },
          {
            title: "Tiendas gourmet y repostería",
            body: "Productos cuya estabilidad y presentación requieren una evaluación previa del empaque y del vehículo.",
          },
          {
            title: "Licorerías y tiendas de vinos y destilados",
            body: "Entregas de botellas, estuches y sets de regalo que requieren cuidado por su fragilidad, peso y presentación.",
          },
        ],
        note: "Los productos perecederos, sensibles a la temperatura o que requieren cadena de frío necesitan una evaluación específica antes de aceptar el servicio.",
      },
      {
        type: "steps",
        heading: "Coordinamos el cuidado antes de salir a entregar.",
        steps: [
          {
            title: "Paso 1 — Muéstrenos qué vende",
            body: "Comparta el tipo de producto, sus dimensiones, el empaque y las precauciones necesarias. Puede enviarnos fotografías para facilitar la evaluación.",
          },
          {
            title: "Paso 2 — Definimos las condiciones",
            body: "Confirmamos cobertura, vehículo, tarifa e instrucciones de retiro y entrega.",
          },
          {
            title: "Paso 3 — Preparamos la coordinación",
            body: "Su comercio deja el pedido embalado e identificado, con los datos del destinatario y las indicaciones acordadas.",
          },
          {
            title: "Paso 4 — Retiramos y damos seguimiento",
            body: "Realizamos el recorrido y registramos la entrega o las novedades que necesiten atención.",
          },
        ],
        cta: quote(
          "Coordinar mi primera entrega",
          commerce.name,
          "Quiero coordinar mi primera entrega para mi comercio.",
        ),
      },
      {
        type: "points",
        heading: "Cuide la experiencia de su cliente hasta el último paso.",
        items: [
          {
            title: "Una entrega alineada con su negocio",
            body: "Acompañe la calidad de su producto con una atención profesional al destinatario.",
          },
          {
            title: "Más visibilidad para su equipo",
            body: "Consulte el avance de los pedidos y atienda las novedades con información del recorrido.",
          },
          {
            title: "Menos tiempo coordinando mensajeros",
            body: "Centralice las instrucciones y el seguimiento con un equipo que conozca las necesidades de sus entregas.",
          },
          {
            title: "Transporte según el producto",
            body: "Coordine el vehículo y las condiciones del servicio considerando lo que necesita trasladar.",
          },
        ],
      },
      {
        type: "callout",
        heading: "¿Su tienda despacha pedidos todos los días?",
        paragraphs: [
          "Cuéntenos desde dónde entrega, qué productos vende y cuántos pedidos necesita mover.",
          "Evaluamos su frecuencia, destinos y requisitos de manipulación para preparar una propuesta acorde con su operación.",
        ],
        cta: quote(
          "Solicitar propuesta para mi tienda",
          commerce.name,
          "Solicito una propuesta de entregas para mi tienda.",
        ),
      },
      {
        type: "callout",
        heading: "Entregas para comercios en Ciudad de Panamá y áreas cercanas",
        paragraphs: [
          "Consulte disponibilidad para sus pedidos en Panamá Centro, Panamá Norte, Panamá Este y Panamá Oeste.",
          "Comparta el punto de retiro y las zonas donde se encuentran sus clientes para confirmar cobertura, tarifas y tiempos estimados.",
        ],
        cta: whatsapp(
          "Consultar mis zonas de entrega",
          "Hola, quiero consultar las zonas de entrega para mi comercio o e-commerce con Zappy Delivery.",
        ),
      },
      {
        type: "faq",
        heading: "Preguntas frecuentes",
        items: [
          {
            question: "¿Pueden entregar productos frágiles?",
            answer:
              "Evaluamos cada tipo de producto antes de aceptar el servicio. Necesitamos conocer sus dimensiones, fragilidad, empaque y cuidados especiales para determinar las condiciones de transporte.",
          },
          {
            question: "¿Todos los pedidos se transportan en moto?",
            answer:
              "El vehículo se define según las características del pedido. Un producto puede necesitar panel o camión por su tamaño, estabilidad o condiciones de manipulación, aunque su peso sea reducido.",
          },
          {
            question: "¿Cómo debo preparar mis pedidos?",
            answer:
              "Cada pedido debe estar cerrado, identificado y protegido para el transporte. Los artículos frágiles necesitan protección interna que evite movimientos y contacto entre piezas. Comparta cualquier cuidado especial antes del retiro.",
          },
          {
            question: "¿Puedo indicar cómo debe entregarse el producto?",
            answer:
              "Sí. Puede solicitar instrucciones como mantener una posición determinada, contactar al destinatario al llegar o entregar a una persona autorizada. Confirmamos cuáles podemos atender antes de iniciar el servicio.",
          },
          {
            question: "¿Cómo es la presentación de los mensajeros?",
            answer:
              "El servicio contempla mensajeros identificados, presentación cuidada y trato respetuoso con su equipo y sus clientes.",
          },
          {
            question: "¿Cómo sé si el pedido fue entregado?",
            answer:
              "El servicio cuenta con seguimiento mediante el sistema logístico y validación fotográfica de las entregas.",
          },
          {
            question: "¿Qué ocurre si el cliente no está disponible?",
            answer:
              "Comunicamos la novedad para coordinar el siguiente paso. Las condiciones de espera, reintento o devolución se acuerdan al contratar el servicio.",
          },
          {
            question: "¿Pueden transportar productos refrigerados o muy sensibles a la temperatura?",
            answer:
              "Estas solicitudes requieren una evaluación específica. Indíquenos la temperatura y las condiciones que necesita el producto para confirmar si podemos atenderlo.",
          },
          {
            question: "¿Puedo contratar entregas recurrentes?",
            answer:
              "Sí. Compártanos su volumen habitual, las zonas de destino y las características de sus productos para evaluar una propuesta.",
          },
        ],
      },
      {
        type: "close",
        heading: "Que su entrega refleje el cuidado de su marca.",
        paragraphs: [
          "Usted prepara cada pedido para causar una buena impresión. En Zappy le ayudamos a cuidar el recorrido y la atención que recibe su cliente.",
          "Cuéntenos qué vende y coordinemos sus próximas entregas.",
        ],
        primary: quote(
          "Cotizar entregas para mi comercio",
          commerce.name,
          "Quiero cotizar entregas para mi comercio o e-commerce.",
        ),
        secondary: whatsapp("Hablar con un asesor", commerceWa),
      },
    ],
  },
];

export function getLanding(slug: string): Landing {
  const landing = landings.find((item) => item.service.slug === slug);
  if (!landing) throw new Error(`Falta la landing ${slug}.`);
  return landing;
}

export function otherLandings(slug: string): Landing[] {
  return landings.filter((item) => item.service.slug !== slug);
}

export function landingFaqs(landing: Landing): FaqItem[] {
  const faq = landing.sections.find((section) => section.type === "faq");
  return faq?.type === "faq" ? faq.items : [];
}
