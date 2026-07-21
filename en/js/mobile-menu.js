/**
 * Menú de navegación móvil accesible.
 *
 * Sustituye el antiguo patrón "checkbox hack" (input[type=checkbox] + label)
 * por un botón real controlado por JavaScript, siguiendo el patrón
 * "disclosure" de WAI-ARIA Authoring Practices:
 * https://www.w3.org/WAI/ARIA/apg/patterns/disclosure/
 *
 * Soluciona:
 * - El estado (abierto/cerrado) ahora se anuncia correctamente mediante
 *   aria-expanded, actualizado dinámicamente.
 * - El disparador es un <button> nativo: focuseable y activable con
 *   teclado (Enter/Espacio) sin necesidad de tabindex ni role adicionales.
 * - Se puede cerrar el menú con la tecla Escape, devolviendo el foco al botón.
 * - Cuando el menú está cerrado en vista móvil, los enlaces dejan de ser
 *   alcanzables con Tab (mediante "inert"), evitando saltos de foco a
 *   elementos invisibles.
 * - Se cierra automáticamente si la ventana pasa al layout de escritorio,
 *   donde el menú siempre es visible.
 */
(function () {
	'use strict';

	var toggle = document.getElementById('menu-toggle');
	var nav = document.getElementById('primary-navigation');

	if (!toggle || !nav) {
		return;
	}

	// Debe coincidir con el breakpoint de escritorio definido en style.css
	// (@media only screen and (min-width: 1280px)), donde el menú siempre
	// está visible y el botón hamburguesa se oculta.
	var desktopQuery = window.matchMedia('(min-width: 1280px)');

	var labelClosed = 'Open the navigation menu';
	var labelOpen = 'Close the navigation menu';
	var toggleLabel = toggle.querySelector('.sr-only');

	function setOpen(isOpen) {
		toggle.setAttribute('aria-expanded', String(isOpen));
		toggle.classList.toggle('is-open', isOpen);
		nav.classList.toggle('is-open', isOpen);

		if (toggleLabel) {
			toggleLabel.textContent = isOpen ? labelOpen : labelClosed;
		}

		// En vista móvil, cuando el menú está cerrado, lo marcamos como
		// "inert" para que sus enlaces no reciban foco con Tab ni sean
		// visibles para tecnologías de asistencia. En escritorio el menú
		// es siempre visible, así que nunca debe quedar inert.
		if (!desktopQuery.matches) {
			nav.toggleAttribute('inert', !isOpen);
		} else {
			nav.removeAttribute('inert');
		}
	}

	function isOpen() {
		return toggle.getAttribute('aria-expanded') === 'true';
	}

	toggle.addEventListener('click', function () {
		setOpen(!isOpen());
	});

	// Cerrar con Escape y devolver el foco al botón que abrió el menú.
	document.addEventListener('keydown', function (event) {
		if (event.key === 'Escape' && isOpen()) {
			setOpen(false);
			toggle.focus();
		}
	});

	// Cerrar al hacer clic fuera del menú (solo tiene sentido si está abierto).
	document.addEventListener('click', function (event) {
		if (!isOpen()) {
			return;
		}
		var clickedInsideNav = nav.contains(event.target);
		var clickedToggle = toggle.contains(event.target);
		if (!clickedInsideNav && !clickedToggle) {
			setOpen(false);
		}
	});

	// Si el viewport pasa a escritorio, aseguramos un estado consistente:
	// el menú queda visible y sin "inert"; si pasa a móvil, arrancamos
	// cerrado e inert para no dejar enlaces fantasma en el flujo de tabulación.
	desktopQuery.addEventListener('change', function (event) {
		if (event.matches) {
			nav.removeAttribute('inert');
		} else {
			setOpen(false);
		}
	});

	// Estado inicial coherente con la vista actual.
	setOpen(false);
}());
