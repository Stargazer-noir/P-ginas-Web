# Emporeon — Plantilla de Shopify

Plantilla (tema) para Shopify Online Store 2.0 construida para la marca **Emporeon**,
inspirada en el logo del tridente dorado, la paleta azul marino + dorado, y la
estructura de página tipo "hero + sellos de confianza + producto destacado +
testimonios" mostrada en las referencias visuales de la marca.

## Contenido del tema

```
layout/         theme.liquid, password.liquid
sections/       header, footer, hero, trust-badges, featured-collection,
                brand-ethos, testimonials, stats, feature-grid, newsletter,
                rich-text, main-product, main-collection-product-grid,
                main-cart-items, main-page, main-404, main-search,
                main-list-collections, main-password-header/footer
snippets/       logo, product-card, price, cart-drawer, icon-*
templates/      index, product, collection, page, cart, 404, search,
                list-collections, password (todas en JSON, editables
                visualmente desde el editor de temas)
assets/         base.css, global.js
config/         settings_schema.json, settings_data.json
locales/        en.default.json (idioma por defecto), es.json
```

## 1. Instalar la plantilla en Shopify

**Opción A — Subir archivo ZIP (recomendado, sin instalar nada):**

1. Comprime el contenido de esta carpeta en un `.zip` (los archivos deben
   quedar en la raíz del zip, no dentro de una subcarpeta).
2. En el admin de Shopify: **Tienda online → Temas → Agregar tema → Subir
   archivo zip**.
3. Publica el tema cuando estés conforme con la vista previa.

**Opción B — Shopify CLI (para seguir editando con control de versiones):**

```bash
npm install -g @shopify/cli @shopify/theme
shopify theme dev --store tu-tienda.myshopify.com
# cuando esté listo:
shopify theme push --store tu-tienda.myshopify.com
```

## 2. Cargar tu logo real

Las imágenes que compartiste no llegaron como archivos descargables en esta
sesión, así que el tema usa un **campo de logo configurable**: mientras no
subas una imagen, se muestra automáticamente un ícono de tridente + el
nombre de la tienda en tipografía serif dorada (ve `snippets/logo.liquid`).

Para usar tu logo definitivo (el de fondo blanco con el tridente dorado y
"EMPOREON" debajo):

1. **Editor de temas → Configuración del tema → Logo** → sube el archivo
   (idealmente PNG o SVG con fondo transparente, ancho ≥ 600px).
2. Ajusta el ancho con el control deslizante "Ancho del logo".
3. Sube también el **favicon** (recorte cuadrado del tridente funciona
   bien) en la misma sección.

## 3. Colores y tipografía

Todo se controla desde **Editor de temas → Configuración del tema**:

- **Colores**: ya vienen precargados con la paleta de la referencia
  (`#0F1F3A` azul marino, `#C9A227` dorado, fondos crema/blanco). Puedes
  ajustarlos sin tocar código.
- **Tipografía**: por defecto usa *Playfair Display* (encabezados, con
  serifa elegante) y *Assistant* (texto de cuerpo). Se puede cambiar por
  cualquier fuente de la librería de Shopify desde el mismo panel.

## 4. Menús

El header usa el menú **`main-menu`** (el menú principal por defecto de
Shopify) y el footer usa el menú **`footer`**. Crea/edita estos menús en
**Tienda online → Navegación** con enlaces como:

- Colecciones → `/collections/all`
- El Ritual → página o colección
- Nuestra Historia → página "Nuestra Historia"

## 5. Producto de muestra: Amethyst Green Imperial

Para reproducir la página de producto de la referencia (imagen del té en
frasco, con precio por 100g y bullets de beneficios):

1. Crea un producto llamado **"Amethyst Green Imperial"**.
2. Precio: `95.00`.
3. Sube fotos del producto (se muestran en la galería con miniaturas).
4. En **Configuración del tema → Custom data → Products**, crea dos
   metacampos de tipo "Una línea de texto":
   - `custom.subtitle` → ej. "High-Altitude, Single-Origin"
   - `custom.unit_label` → ej. "100g"
   Estos aparecen automáticamente debajo del título y junto al precio.
5. En la sección "Página de producto" del editor de temas, agrega/edita
   los bloques **Destacado** para los bullets tipo:
   - Potencia Antioxidante
   - Optimización Metabólica
   - Claridad y Enfoque

## 6. Secciones incluidas (arrastrables en el editor)

| Sección | Uso |
|---|---|
| Hero | Banner principal con imagen, texto y botón "Comprar Ahora" |
| Sellos de confianza | 3 íconos: pagos seguros, envío global, origen certificado |
| Colección destacada | Grid de productos de una colección |
| Ethos de marca | Imagen + texto (historia / estilo de vida) |
| Testimonios | Tarjetas con estrellas, cita y autor |
| Estadísticas | Franja de métricas estilo "89% / 92%" |
| Cuadrícula de ingredientes | Iconos circulares + nombre (estilo "ingredientes estudiados") |
| Boletín | Formulario de suscripción |

Todas se agregan/reordenan desde **Editor de temas → Agregar sección**.

## 7. Carrito

Por defecto el carrito abre como **panel lateral (drawer)** con
agregar/quitar/actualizar vía AJAX, sin recargar la página. Puedes
cambiarlo a "página" completa en **Configuración del tema → Carrito**.

## 8. Idiomas

El tema viene en inglés (idioma por defecto, acorde al copy de marca de
las referencias: "The Art of Pure Status") y español (`locales/es.json`).
Actívalo en **Configuración → Idiomas** dentro del admin de Shopify si
quieres que las visitantes vean la tienda en español.

## Notas técnicas

- Tema construido para **Online Store 2.0** (JSON templates, section
  groups, bloques de app compatibles).
- El carrito usa la Ajax Cart API de Shopify (`/cart/add.js`,
  `/cart/change.js`, `/cart.js`); no depende de apps externas.
- El formato de moneda en el drawer usa `shop.money_format`; si tu tienda
  usa separadores de miles complejos revisa `assets/global.js` →
  `formatMoney()`.
- Los íconos (candado, escudo, globo, medalla, tridente, redes sociales)
  son SVG propios en `snippets/icon-*.liquid`, sin dependencias externas.
