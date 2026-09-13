/*
	Editorial by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$head = $('head'),
		$body = $('body');
	var pagePrefix = window.location.pathname.indexOf('/pages/') !== -1 ? '../' : '';
	var contentPrefix = pagePrefix ? '' : 'pages/';

	var $menu = $('#menu');
	if ($menu.length) {
		$menu.html('<header class="major"><h2>Menu</h2></header>' +
			'<ul>' +
			'<li><a href="' + pagePrefix + 'index.html">Home</a></li>' +
			'<li><a href="' + contentPrefix + 'over-ons.html">Over ons</a></li>' +
			'<li><span class="opener">Onze diensten</span><ul>' +
			'<li><a href="' + contentPrefix + 'afbraakwerken.html">Afbraakwerken</a></li>' +
			'<li><a href="' + contentPrefix + 'schilderen.html">Schilderen</a></li>' +
			'<li><a href="' + contentPrefix + 'plamuren.html">Plamuren</a></li>' +
			'<li><a href="' + contentPrefix + 'tegels-plaatsen.html">Tegels plaatsen</a></li>' +
			'<li><a href="' + contentPrefix + 'vloeren-leggen.html">Vloeren leggen</a></li>' +
			'<li><a href="' + contentPrefix + 'ramen-deuren.html">Ramen en deuren vervangen</a></li>' +
			'<li><a href="' + contentPrefix + 'andere-werken.html">Andere werken</a></li>' +
			'</ul></li>' +
			'<li><a href="' + contentPrefix + 'informatie.html">Informatie</a></li>' +
			'<li><a href="' + contentPrefix + 'nieuws.html">Nieuws</a></li>' +
		
			'<li><a href="' + contentPrefix + 'contact.html">Contact</a></li>' +
			'<li><a href="' + contentPrefix + 'jobs.html">Jobs</a></li>' +
			'</ul>');
		if (window.matchMedia('(min-width: 737px)').matches) {
			$menu.children('ul').find('.opener').addClass('active');
		}
	}

	var sidebarInner = document.querySelector('#sidebar > .inner');
	if (sidebarInner) {
		Array.from(sidebarInner.children).forEach(function (child) {
			if ((child.tagName === 'SECTION' && child.id !== 'search') || child.tagName === 'FOOTER') {
				child.remove();
			}
		});

		var siteContact = document.createElement('section');
		siteContact.className = 'site-contact';
		siteContact.innerHTML = '<header class="major"><h2>Contacteer ons</h2></header>' +
			'<p>Vertel ons kort wat u wilt laten uitvoeren. We nemen zo snel mogelijk contact met u op.</p>' +
			'<ul class="contact">' +
			'<li class="icon solid fa-envelope"><a href="mailto:infoevngroup@gmail.com">infoevngroup@gmail.com</a></li>' +
			'<li class="icon solid fa-phone"><a href="tel:+32499727277">(+32) 0499 72 72 77</a></li>' +
			'</ul>' +
			'<footer id="footer"><p class="copyright">&copy; 2026 EVN Group. All rights reserved.</p></footer>';
		sidebarInner.appendChild(siteContact);
	}

	var serviceImages = {
		'afbraakwerken.html': 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1200&q=80',
		'schilderen.html': 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80',
		'plamuren.html': 'https://images.unsplash.com/photo-1531835551805-16d864c8d311?auto=format&fit=crop&w=1200&q=80',
		'tegels-plaatsen.html': 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=1200&q=80',
		'vloeren-leggen.html': 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
		'ramen-deuren.html': 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80',
		'andere-werken.html': 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1200&q=80'
	};
	var currentPage = window.location.pathname.split('/').pop() || 'index.html';
	if (serviceImages[currentPage]) {
		$('#main .image.main img').attr('src', serviceImages[currentPage]);
	}

	var likeTarget = document.querySelector('.hero-like-target');
	if (likeTarget) {
		var addLike = function (event) {
			var bounds = likeTarget.getBoundingClientRect();
			var clickX = event && typeof event.clientX === 'number' ? event.clientX - bounds.left : bounds.width / 2;
			var clickY = event && typeof event.clientY === 'number' ? event.clientY - bounds.top : bounds.height / 2;
			var heart = document.createElement('span');
			heart.className = 'floating-heart';
			heart.textContent = '♥';
			heart.style.left = clickX + 'px';
			heart.style.top = clickY + 'px';
			likeTarget.appendChild(heart);
			heart.addEventListener('animationend', function () {
				this.remove();
			});
		};
		likeTarget.addEventListener('click', addLike);
	}

	document.querySelectorAll('.job-application').forEach(function (application) {
		var input = application.querySelector('.job-cv-input');
		var label = application.querySelector('.job-file-label');
		var sendButton = application.querySelector('.job-send');
		var showSuccess = function () {
			application.innerHTML = '<div class="job-success"><span class="icon solid fa-check-circle" aria-hidden="true"></span><strong>Je hebt gesolliciteerd!</strong></div>';
		};

		input.addEventListener('change', function () {
			var file = input.files[0];
			if (!file) {
				return;
			}
			var extension = file.name.split('.').pop().toLowerCase();
			if (['pdf', 'doc', 'docx'].indexOf(extension) === -1) {
				input.value = '';
				label.textContent = 'Dien je cv in';
				label.classList.remove('selected');
				sendButton.classList.remove('ready');
				sendButton.disabled = true;
				return;
			}
			label.textContent = file.name;
			label.classList.add('selected');
			sendButton.classList.add('ready');
			sendButton.disabled = false;
		});

		sendButton.addEventListener('click', function () {
			var file = input.files[0];
			if (!file) {
				return;
			}

			showSuccess();
		});
	});

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ '361px',   '480px'  ],
			xxsmall:  [ null,      '360px'  ],
			'xlarge-to-max':    '(min-width: 1681px)',
			'small-to-xlarge':  '(min-width: 481px) and (max-width: 1680px)'
		});

	// Stops animations/transitions until the page has ...

		// ... loaded.
			$window.on('load', function() {
				window.setTimeout(function() {
					$body.removeClass('is-preload');
				}, 100);
			});

		// ... stopped resizing.
			var resizeTimeout;

			$window.on('resize', function() {

				// Mark as resizing.
					$body.addClass('is-resizing');

				// Unmark after delay.
					clearTimeout(resizeTimeout);

					resizeTimeout = setTimeout(function() {
						$body.removeClass('is-resizing');
					}, 100);

			});

	// Fixes.

		// Object fit images.
			if (!browser.canUse('object-fit')
			||	browser.name == 'safari')
				$('.image.object').each(function() {

					var $this = $(this),
						$img = $this.children('img');

					// Hide original image.
						$img.css('opacity', '0');

					// Set background.
						$this
							.css('background-image', 'url("' + $img.attr('src') + '")')
							.css('background-size', $img.css('object-fit') ? $img.css('object-fit') : 'cover')
							.css('background-position', $img.css('object-position') ? $img.css('object-position') : 'center');

				});

	// Sidebar.
		var $sidebar = $('#sidebar'),
			$sidebar_inner = $sidebar.children('.inner');

		// Inactive by default on <= large.
			breakpoints.on('<=large', function() {
				$sidebar.addClass('inactive');
			});

			breakpoints.on('>large', function() {
				$sidebar.removeClass('inactive');
			});

		// Hack: Workaround for Chrome/Android scrollbar position bug.
			if (browser.os == 'android'
			&&	browser.name == 'chrome')
				$('<style>#sidebar .inner::-webkit-scrollbar { display: none; }</style>')
					.appendTo($head);

		// Toggle.
			$('<a href="#sidebar" class="toggle">Toggle</a>')
				.appendTo($sidebar)
				.on('click', function(event) {

					// Prevent default.
						event.preventDefault();
						event.stopPropagation();

					// Toggle.
						$sidebar.toggleClass('inactive');

				});

		// Events.

			// Link clicks.
				$sidebar.on('click', 'a', function(event) {

					// >large? Bail.
						if (breakpoints.active('>large'))
							return;

					// Vars.
						var $a = $(this),
							href = $a.attr('href'),
							target = $a.attr('target');

					// Prevent default.
						event.preventDefault();
						event.stopPropagation();

					// Check URL.
						if (!href || href == '#' || href == '')
							return;

					// Hide sidebar.
						$sidebar.addClass('inactive');

					// Redirect to href.
						setTimeout(function() {

							if (target == '_blank')
								window.open(href);
							else
								window.location.href = href;

						}, 500);

				});

			// Prevent certain events inside the panel from bubbling.
				$sidebar.on('click touchend touchstart touchmove', function(event) {

					// >large? Bail.
						if (breakpoints.active('>large'))
							return;

					// Prevent propagation.
						event.stopPropagation();

				});

			// Hide panel on body click/tap.
				$body.on('click touchend', function(event) {

					// >large? Bail.
						if (breakpoints.active('>large'))
							return;

					// Deactivate.
						$sidebar.addClass('inactive');

				});

		// Scroll lock.
		// Note: If you do anything to change the height of the sidebar's content, be sure to
		// trigger 'resize.sidebar-lock' on $window so stuff doesn't get out of sync.

			$window.on('load.sidebar-lock', function() {

				var sh, wh, st;

				// Reset scroll position to 0 if it's 1.
					if ($window.scrollTop() == 1)
						$window.scrollTop(0);

				$window
					.on('scroll.sidebar-lock', function() {

						var x, y;

						// <=large? Bail.
							if (breakpoints.active('<=large')) {

								$sidebar_inner
									.data('locked', 0)
									.css('position', '')
									.css('top', '');

								return;

							}

						// Calculate positions.
							x = Math.max(sh - wh, 0);
							y = Math.max(0, $window.scrollTop() - x);

						// Lock/unlock.
							if ($sidebar_inner.data('locked') == 1) {

								if (y <= 0)
									$sidebar_inner
										.data('locked', 0)
										.css('position', '')
										.css('top', '');
								else
									$sidebar_inner
										.css('top', -1 * x);

							}
							else {

								if (y > 0)
									$sidebar_inner
										.data('locked', 1)
										.css('position', 'fixed')
										.css('top', -1 * x);

							}

					})
					.on('resize.sidebar-lock', function() {

						// Calculate heights.
							wh = $window.height();
							sh = $sidebar_inner.outerHeight() + 30;

						// Trigger scroll.
							$window.trigger('scroll.sidebar-lock');

					})
					.trigger('resize.sidebar-lock');

				});

	// Menu.
		var $menu = $('#menu'),
			$menu_openers = $menu.children('ul').find('.opener');

		// Openers.
			$menu_openers.each(function() {

				var $this = $(this);

				$this.on('click', function(event) {

					// Prevent default.
						event.preventDefault();

					// Toggle.
						$menu_openers.not($this).removeClass('active');
						$this.toggleClass('active');

					// Trigger resize (sidebar lock).
						$window.triggerHandler('resize.sidebar-lock');

				});

			});

})(jQuery);