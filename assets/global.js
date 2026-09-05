/* Emporeon theme — global.js
   Mobile nav, search toggle, accordions, quantity selectors,
   AJAX add-to-cart and cart drawer rendering. */
(function () {
  'use strict';

  document.documentElement.classList.remove('no-js');

  var moneyFormat = window.themeMoneyFormat || '${{amount}}';

  function formatMoney(cents) {
    var value = (cents / 100).toFixed(2);
    return moneyFormat.replace('{{amount}}', value);
  }

  /* ---------------- Mobile nav + search ---------------- */
  document.addEventListener('click', function (e) {
    var menuToggle = e.target.closest('[data-mobile-menu-toggle]');
    if (menuToggle) {
      var nav = document.querySelector('[data-mobile-nav]');
      if (nav) nav.classList.toggle('is-open');
      return;
    }

    var searchToggle = e.target.closest('[data-search-toggle]');
    if (searchToggle) {
      var bar = document.querySelector('[data-search-bar]');
      if (bar) {
        bar.classList.toggle('is-open');
        var input = bar.querySelector('input[type="search"]');
        if (input && bar.classList.contains('is-open')) input.focus();
      }
      return;
    }
  });

  /* ---------------- Accordions ---------------- */
  document.addEventListener('click', function (e) {
    var trigger = e.target.closest('.accordion__trigger');
    if (!trigger) return;
    var item = trigger.closest('.accordion__item');
    if (!item) return;
    var wasOpen = item.classList.contains('is-open');
    item.parentElement.querySelectorAll('.accordion__item.is-open').forEach(function (openItem) {
      if (openItem !== item) openItem.classList.remove('is-open');
    });
    item.classList.toggle('is-open', !wasOpen);
  });

  /* ---------------- Quantity selectors ---------------- */
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('[data-quantity-change]');
    if (!btn) return;
    var wrapper = btn.closest('.quantity-selector');
    var input = wrapper.querySelector('input[type="number"]');
    var step = parseInt(input.step, 10) || 1;
    var min = parseInt(input.min, 10) || 1;
    var value = parseInt(input.value, 10) || min;
    value = btn.dataset.quantityChange === 'increase' ? value + step : Math.max(min, value - step);
    input.value = value;
    input.dispatchEvent(new Event('change', { bubbles: true }));
  });

  /* ---------------- Cart drawer ---------------- */
  var drawer = document.querySelector('[data-cart-drawer]');
  var overlay = document.querySelector('[data-cart-drawer-overlay]');

  function openDrawer() {
    if (!drawer) return;
    drawer.classList.add('is-open');
    if (overlay) overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove('is-open');
    if (overlay) overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  document.addEventListener('click', function (e) {
    if (e.target.closest('[data-cart-drawer-open]')) {
      e.preventDefault();
      openDrawer();
      refreshCartDrawer();
    }
    if (e.target.closest('[data-cart-drawer-close]') || e.target === overlay) {
      closeDrawer();
    }
  });

  function renderCartLine(item) {
    var variantText = item.variant_title ? '<div class="cart-line__variant">' + item.variant_title + '</div>' : '';
    return (
      '<div class="cart-line" data-cart-line data-key="' + item.key + '">' +
      '<div class="cart-line__media"><img src="' + (item.image || '') + '" alt="' + item.product_title + '" loading="lazy"></div>' +
      '<div>' +
      '<div class="cart-line__title">' + item.product_title + '</div>' +
      variantText +
      '<div class="quantity-selector quantity-selector--sm">' +
      '<button type="button" data-cart-qty-change="decrease" data-key="' + item.key + '" aria-label="-">&minus;</button>' +
      '<input type="number" min="0" value="' + item.quantity + '" data-cart-qty-input data-key="' + item.key + '">' +
      '<button type="button" data-cart-qty-change="increase" data-key="' + item.key + '" aria-label="+">+</button>' +
      '</div>' +
      '<button type="button" class="cart-line__remove" data-cart-remove data-key="' + item.key + '">' + (window.themeStrings && window.themeStrings.remove || 'Remove') + '</button>' +
      '</div>' +
      '<div class="cart-line__price">' + formatMoney(item.final_line_price) + '</div>' +
      '</div>'
    );
  }

  function refreshCartDrawer() {
    if (!drawer) return;
    fetch('/cart.js')
      .then(function (r) { return r.json(); })
      .then(function (cart) { renderCart(cart); })
      .catch(function () {});
  }

  function renderCart(cart) {
    var itemsEl = drawer.querySelector('[data-cart-items]');
    var subtotalEl = drawer.querySelector('[data-cart-subtotal]');
    var countEls = document.querySelectorAll('[data-cart-count]');
    var emptyEl = drawer.querySelector('[data-cart-empty]');
    var footerEl = drawer.querySelector('[data-cart-footer]');

    countEls.forEach(function (el) {
      el.textContent = cart.item_count;
      el.hidden = cart.item_count === 0;
    });

    if (!itemsEl) return;

    if (cart.item_count === 0) {
      itemsEl.innerHTML = '';
      if (emptyEl) emptyEl.hidden = false;
      if (footerEl) footerEl.hidden = true;
      return;
    }

    if (emptyEl) emptyEl.hidden = true;
    if (footerEl) footerEl.hidden = false;

    itemsEl.innerHTML = cart.items.map(renderCartLine).join('');
    if (subtotalEl) subtotalEl.textContent = formatMoney(cart.total_price);
  }

  function changeLine(key, quantity) {
    fetch('/cart/change.js', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: key, quantity: quantity })
    })
      .then(function (r) { return r.json(); })
      .then(renderCart)
      .catch(function () {});
  }

  document.addEventListener('click', function (e) {
    var qtyBtn = e.target.closest('[data-cart-qty-change]');
    if (qtyBtn) {
      var input = drawer.querySelector('input[data-cart-qty-input][data-key="' + qtyBtn.dataset.key + '"]');
      var value = parseInt(input.value, 10) || 0;
      value = qtyBtn.dataset.cartQtyChange === 'increase' ? value + 1 : Math.max(0, value - 1);
      changeLine(qtyBtn.dataset.key, value);
      return;
    }
    var removeBtn = e.target.closest('[data-cart-remove]');
    if (removeBtn) {
      changeLine(removeBtn.dataset.key, 0);
      return;
    }
  });

  document.addEventListener('change', function (e) {
    var input = e.target.closest('input[data-cart-qty-input]');
    if (!input) return;
    changeLine(input.dataset.key, parseInt(input.value, 10) || 0);
  });

  /* ---------------- Add to cart (AJAX) ---------------- */
  document.addEventListener('submit', function (e) {
    var form = e.target.closest('form[data-product-form]');
    if (!form) return;
    e.preventDefault();

    var submitBtn = form.querySelector('[type="submit"]');
    var originalText = submitBtn ? submitBtn.textContent : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = submitBtn.dataset.loadingText || originalText;
    }

    var formData = new FormData(form);

    fetch('/cart/add.js', {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: formData
    })
      .then(function (r) { return r.json(); })
      .then(function (response) {
        if (response.status) {
          var errorEl = form.querySelector('[data-form-error]');
          if (errorEl) {
            errorEl.textContent = response.description || response.message;
            errorEl.hidden = false;
          }
          return;
        }
        refreshCartDrawer();
        var cartType = document.body.dataset.cartType;
        if (cartType === 'drawer') {
          openDrawer();
        } else {
          window.location.href = '/cart';
        }
      })
      .catch(function () {})
      .finally(function () {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
      });
  });

  /* Init cart count on load */
  document.addEventListener('DOMContentLoaded', refreshCartDrawer);

  /* ---------------- Variant swatches (simple, no combined listings) --- */
  document.addEventListener('change', function (e) {
    var swatchInput = e.target.closest('[data-variant-input]');
    if (!swatchInput) return;
    var form = swatchInput.closest('form[data-product-form]');
    if (!form) return;

    var selectedOptions = Array.from(form.querySelectorAll('[data-variant-input]:checked')).map(function (i) {
      return i.value;
    });

    var variants = JSON.parse(form.querySelector('[data-product-variants]').textContent);
    var match = variants.find(function (v) {
      return v.options.every(function (opt, idx) { return opt === selectedOptions[idx]; });
    });

    var priceEl = form.querySelector('[data-product-price]');
    var idInput = form.querySelector('input[name="id"]');
    var submitBtn = form.querySelector('[type="submit"]');

    if (match) {
      idInput.value = match.id;
      if (priceEl) priceEl.textContent = formatMoney(match.price);
      if (submitBtn) {
        submitBtn.disabled = !match.available;
        submitBtn.textContent = match.available
          ? (window.themeStrings && window.themeStrings.addToCart || 'Add to Cart')
          : (window.themeStrings && window.themeStrings.soldOut || 'Sold Out');
      }
    }
  });
})();
