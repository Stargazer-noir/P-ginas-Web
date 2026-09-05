# Emporeon — Plantilla de Shopify

Plantilla (tema) para Shopify Online Store 2.0 construida para la marca **Emporeon**,
inspirada en el logo del tridente dorado, la paleta azul marino + dorado, y la
estructura de página tipo "hero + sellos de confianza + producto destacado +
testimonios" mostrada en las referencias visuales de la marca.

> ⚠️ **Importante — esto NO se actualiza solo en tu tienda.** Este repositorio
> de GitHub y tu tienda de Shopify (emporion.site) son dos cosas separadas.
> Subir cambios aquí **no** cambia nada en Shopify automáticamente. Cada vez
> que se actualice este tema tienes que:
> 1. Descargar el ZIP más reciente de esta rama (ver sección 1 abajo).
> 2. Subirlo en **Tienda online → Temas → Agregar tema → Subir archivo zip**.
> 3. **Publicar** ese tema (si no lo publicas, solo queda como "borrador" /
>    vista previa y tu tienda pública sigue mostrando lo de antes).
>
> Si tu sitio en vivo se sigue viendo igual después de un cambio, lo primero
> a revisar es: ¿subiste el ZIP nuevo? ¿le diste clic a "Publicar"?

## Contenido del tema

```
layout/         theme.liquid, password.liquid
sections/       header, footer, hero, featured-product, trust-badges,
                featured-collection, brand-ethos, testimonials, stats,
                feature-grid, newsletter, contact, rich-text, main-product,
                main-collection-product-grid, main-cart-items, main-page,
                main-404, main-search, main-list-collections,
                main-password-header/footer
snippets/       logo, product-card, price, cart-drawer, placeholder-art,
                icon-* (incluye icon-trident.liquid, el logo dorado)
templates/      index, product, collection, page, page.contact, cart, 404,
                search, list-collections, password (todas en JSON, editables
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

## 2. El logo

El tema incluye un tridente dorado propio en SVG (`snippets/icon-trident.liquid`)
que se muestra por defecto en el header, el footer y la página 404 mientras
no subas tu propio archivo. Es solo un marcador de posición: en cuanto subas
tu logo real lo reemplaza automáticamente.

1. **Editor de temas → Configuración del tema → Logo** → sube tu imagen
   (idealmente PNG o SVG con fondo transparente, ancho ≥ 600px).
2. Ajusta el ancho con el control deslizante "Ancho del logo".
3. Sube también el **favicon** en la misma sección.

## 3. Colores y tipografía

Paleta estilo **luxury**: el **azul noche es el color dominante en la mayoría
de las secciones** (no solo el header/footer) — hero, producto destacado,
colección destacada, ethos de marca, testimonios e ingredientes usan fondos
azul noche o azul noche profundo a pantalla completa, con las tarjetas de
producto/testimonios flotando en blanco para que resalten como piezas de
exhibición. El **gris grafito** viste la barra de anuncio y el **negro** se
usa como acento puntual (texto sobre dorado, profundidad de degradados). El
**dorado** —el color del logo— se reserva para el botón principal, precios,
íconos, la línea decorativa bajo los títulos y otros detalles que deben
llamar la atención y generar impulso de compra. Todo se controla sin tocar
código desde **Editor de temas → Configuración del tema → Colores**:

| Variable | Uso | Valor por defecto |
|---|---|---|
| Azul noche | Header, footer, hero, producto destacado, sellos, boletín, botón oscuro | `#0F1F3A` |
| Azul noche profundo | Colección destacada, banner de colección, degradados | `#060A12` |
| Gris grafito | Barra de anuncio | `#262B35` |
| Negro | Texto sobre dorado, acentos puntuales | `#0B0C0F` |
| Dorado | Logo, botón principal, precios, íconos, línea decorativa | `#C9A227` |
| Blanco / gris azulado claro | Tarjetas de producto/testimonios, fondos de formularios | `#FFFFFF` / `#EEF1F6` |

La sección "Ethos de marca" tiene un control **Estilo de fondo** (Azul noche
/ Claro) por si en algún punto quieres una sección más clara para dar
respiro visual entre bloques oscuros — por defecto viene en azul noche.

**Tipografía**: por defecto usa *Playfair Display* (encabezados, con
serifa elegante) y *Assistant* (texto de cuerpo), configurable desde el
mismo panel por cualquier fuente de la librería de Shopify.

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
| Producto destacado | Banner tipo "spotlight" con un producto real (imagen, precio, bullets y botón de agregar al carrito) |
| Sellos de confianza | 3 íconos: pagos seguros, envío global, origen certificado |
| Colección destacada | Grid de productos de una colección (con 4 productos de muestra mientras no hay colección real) |
| Ethos de marca | Imagen + texto (historia / estilo de vida) |
| Testimonios | Tarjetas con estrellas, cita y autor |
| Estadísticas | Franja de métricas con valor + etiqueta + descripción breve, estilo "89% / 92%" |
| Cuadrícula de ingredientes | Iconos circulares + nombre + descripción breve (estilo "ingredientes estudiados") |
| Boletín | Formulario de suscripción |
| Contacto | Datos de contacto (correo, teléfono, horario) + formulario nativo de Shopify |

Todas se agregan/reordenan desde **Editor de temas → Agregar sección**. Ya
vienen precargadas con contenido de ejemplo (textos, estadísticas,
testimonios) para que la página no se sienta vacía apenas la instalas —
edítalas o bórralas cuando tengas tu contenido real.

### Página de Contacto

Para usar la sección "Contacto" como una página real:

1. **Tienda online → Páginas → Agregar página**, nómbrala "Contacto".
2. En el panel derecho, en **Plantilla de tema**, elige `page.contact`.
3. Edita los datos de contacto y el texto desde el editor de temas.

### Imágenes y fotos de producto

Mientras no subas tus propias fotos, cada espacio de imagen (producto,
colección, banner) muestra un **panel de marca** (degradado azul oscuro→negro
con el tridente dorado centrado) en vez de un recuadro gris vacío de
Shopify — así ningún bloque se ve "roto" o en blanco antes de cargar tu
contenido.

## 7. Carrito

Por defecto el carrito abre como **panel lateral (drawer)** con
agregar/quitar/actualizar vía AJAX, sin recargar la página. Puedes
cambiarlo a "página" completa en **Configuración del tema → Carrito**.

## 8. Idiomas

El tema viene en inglés (idioma por defecto, acorde al copy de marca de
las referencias: "The Art of Pure Status") y español (`locales/es.json`).
Actívalo en **Configuración → Idiomas** dentro del admin de Shopify si
quieres que las visitantes vean la tienda en español.

## 9. Solución de problemas comunes

**"No se ven los colores, todo blanco":** casi siempre es porque la tienda
sigue mostrando una versión anterior del tema. Verifica que subiste el
último ZIP y que lo **publicaste** (ver aviso al inicio de este documento).
Si ya lo hiciste y sigue en blanco, revisa en el editor de temas que las
secciones de la portada (Hero, Producto destacado, Colección destacada,
Ethos, Testimonios, Estadísticas) sigan presentes en `index.json` — si
alguien las borró desde el editor visual, vuelve a agregarlas con "Agregar
sección".

**"Los botones de Agregar al Carrito no se pueden presionar":** las
secciones "Producto destacado" y "Colección destacada" muestran **contenido
de muestra** (marcado con la etiqueta "Muestra") mientras no elijas un
producto/colección real en su configuración — ese contenido de muestra
enlaza a la página de productos, pero no puede agregar al carrito porque no
existe un producto real detrás. En cuanto crees un producto y lo asignes a
la sección (o a una colección), el botón agrega al carrito de verdad. En la
**página de un producto real** (`/products/tu-producto`), el botón sí debe
agregar al carrito con solo tener el producto publicado — si ahí tampoco
funciona, dime en qué producto para revisarlo.

**"No aparecen los cuadros de descripción":** el acordeón de "Descripción"
y "Envíos y devoluciones" en la página de producto solo se muestra si el
producto tiene texto en su campo de descripción en Shopify. Si el producto
no tiene descripción escrita, ese cuadro no aparece (no es un error).

**"La página de Contacto no tiene información":** ya no depende de que
elijas una plantilla especial — cualquier página cuyo nombre/URL contenga
"contacto" o "contact" ahora muestra automáticamente datos de contacto de
muestra (correo, teléfono, horario) y el formulario, editables luego desde
`sections/main-page.liquid` o (si sí asignas la plantilla `page.contact`)
desde el editor de temas visualmente.

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
