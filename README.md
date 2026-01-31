# Easy Click — Company Website Starter

Plantilla base para **sitios web corporativos multipágina** con **contenido desacoplado** (copy en `src/content`) para iterar rápido con clientes y desplegar fácilmente en Vercel.

## Qué es este repo

Starter de sitio web empresarial construido con **Next.js (App Router)** + **TypeScript** + **Tailwind CSS**. Incluye:

- Estructura multipágina: **Home**, **Servicios**, **Nosotros**, **FAQ**, **Contacto** y **Legal**.
- Layout compartido con **SiteHeader** / **SiteFooter** reutilizables.
- Capa de contenido en `src/content` para editar textos sin tocar componentes.
- Secciones modulares en `src/components/sections`.
- Helper `getSectionById` para tipado más seguro y menos duplicación (sin casts).

## Requisitos

- Node.js LTS (recomendado)
- npm

## Cómo correrlo

Instalar dependencias:

```bash
npm install
# Easy Click — Company Website Starter

Plantilla base para **sitios web corporativos multipágina** con **contenido desacoplado** (copy en `src/content`) para iterar rápido con clientes y desplegar fácilmente en Vercel.

## Qué es este repo

Starter de sitio web empresarial construido con **Next.js (App Router)** + **TypeScript** + **Tailwind CSS**. Incluye:

- Estructura multipágina: **Home**, **Servicios**, **Nosotros**, **FAQ**, **Contacto** y **Legal**.
- Layout compartido con **SiteHeader** / **SiteFooter** reutilizables.
- Capa de contenido en `src/content` para editar textos sin tocar componentes.
- Secciones modulares en `src/components/sections`.
- Helper `getSectionById` para tipado más seguro y menos duplicación (sin casts).

## Requisitos

- Node.js LTS (recomendado)
- npm

## Cómo correrlo

Instalar dependencias:

```bash
npm install
```

Modo desarrollo:

```bash
npm run dev
```

Build de producción:

```bash
npm run build
```

Servir el build:

```bash
npm run start
```

## Estructura del proyecto

- `src/app/(site)/*` — rutas del sitio (Home/Servicios/Nosotros/FAQ/Contacto/Legal)
- `src/components/site/*` — layout compartido (header/footer)
- `src/components/sections/*` — secciones reutilizables
- `src/content/site.ts` — configuración global (marca, navegación, CTAs, footer, contacto)
- `src/content/pages/*.ts` — contenido por página (títulos, descripciones y secciones)

## Cómo cambiar contenido (copy)

Todo el copy y la estructura vive en `src/content`:

- `src/content/site.ts`: nombre de marca, navegación, CTAs, links y datos de contacto.
- `src/content/pages/*.ts`: contenido por página y sus secciones.

Flujo recomendado con cliente:
1. Cambia copy solo en `src/content`.
2. Valida en local (`npm run dev`).
3. Sube cambios y comparte el **Preview Deployment** de Vercel.

## Cómo cambiar assets

Los assets públicos están en `public/`.

- Reemplaza imágenes/SVGs manteniendo los mismos nombres si quieres evitar cambios de código.
- Recomendado: `public/og.png` y `public/favicon.ico` (o equivalente) para branding.

## Variables de entorno (opcional)

- `NEXT_PUBLIC_SITE_URL`: URL pública del sitio (útil para metadata/OG/sitemap).

Crea un `.env.local` en la raíz:

```bash
NEXT_PUBLIC_SITE_URL=https://tudominio.com
```

## Cómo usarlo como base para un nuevo cliente

1. Actualiza marca y navegación en `src/content/site.ts`.
2. Ajusta contenido por página en `src/content/pages/`.
3. Reemplaza assets en `public/` (logo, og, favicon).
4. (Opcional) Define `NEXT_PUBLIC_SITE_URL`.
5. Corre `npm run build` para validar antes de entregar.

## Calidad (Definition of Done)

Antes de publicar:

- `npm run build` pasa sin errores.
- Revisión rápida de rutas: `/`, `/servicios`, `/nosotros`, `/faq`, `/contacto`, `/legal`.
- Un solo **H1** por página.
- CTAs principales consistentes en header y secciones de cierre.