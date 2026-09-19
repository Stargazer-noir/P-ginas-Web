# Emporeon — Plantilla de Shopify

Este repositorio refleja exactamente el tema que exportaste de tu tienda en
vivo (`theme_export__emporion-site-theme`), con dos únicos cambios:

1. **`config/settings_schema.json` y `config/settings_data.json` restaurados.**
   En tu tienda, `settings_schema.json` estaba vacío (2 bytes), lo que hacía
   que todos los colores (azul noche, dorado, negro) quedaran en blanco. Sin
   este archivo no hay forma de que el azul noche se muestre, así que se
   restauró con los mismos valores de color que ya conocías.
2. **Nueva sección "Productos (con carrito)"** (`sections/product-showcase.liquid`
   + `snippets/product-card-quick-add.liquid`) — no está agregada a ninguna
   página todavía. Ve a **Editor de temas → Agregar sección → Productos (con
   carrito)** y colócala donde quieras que aparezca (por ejemplo, donde tu
   botón "Nuestros Productos" debe llevar). Elige una colección real en su
   configuración; mientras no lo hagas, muestra productos de muestra
   marcados como "Muestra". Cada tarjeta tiene un botón real de "Agregar al
   Carrito" (AJAX), y cambia automáticamente a "Elegir opciones" o "Agotado"
   según el producto.

Nada más fue modificado: ni otras secciones, ni sus textos, ni el resto de
los colores o el diseño.
