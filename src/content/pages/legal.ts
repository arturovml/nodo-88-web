import type { PageContent } from "../types";

export const legalPageContent = {
  title: "Legal",
  description:
    "Información sobre términos, privacidad y cumplimiento para operar con transparencia.",
  sections: [
    {
      id: "hero",
      heading: "Legal",
      body:
        "Información sobre términos, privacidad y cumplimiento para operar con transparencia.",
    },
    {
      id: "privacidad",
      heading: "Aviso de privacidad",
      body:
        "Este aviso describe, de manera general, cómo tratamos la información cuando interactúas con nuestro sitio. Recopilamos únicamente los datos necesarios para responder solicitudes, coordinar reuniones y entregar propuestas. Implementamos medidas razonables de seguridad y control de acceso para proteger la información que compartes.",
      bullets: [
        "Usamos los datos para responder consultas, coordinar contacto y mejorar la experiencia del sitio.",
        "No vendemos ni comercializamos datos personales.",
        "Podemos compartir información con proveedores que apoyan la operación bajo obligaciones de confidencialidad.",
        "Puedes solicitar acceso, actualización o eliminación de tus datos escribiendo a nuestro contacto.",
      ],
    },
    {
      id: "terminos",
      heading: "Términos de uso",
      body:
        "El contenido de este sitio es informativo y puede cambiar sin previo aviso. Al utilizarlo, aceptas estas condiciones generales y te comprometes a un uso responsable de la información publicada.",
      bullets: [
        "La información no constituye asesoría legal, financiera ni comercial.",
        "Nodo 88 no es institución financiera ni otorga crédito.",
        "Proveemos tecnología para control y gestión de riesgo en esquemas de financiamiento.",
        "El uso de este sitio no genera relación contractual sin un acuerdo firmado.",
        "Reservamos el derecho de actualizar estos términos en cualquier momento.",
      ],
    },
  ],
} as const satisfies PageContent;
