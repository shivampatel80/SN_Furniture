"use strict";

/* Functions */
function leadZero(n) {
	return (n < 10 ? '0' : '') + n;
}

function toggleFullScreen() {
	if (!document.fullscreenElement) {
		document.documentElement.requestFullscreen();
	} else {
		if (document.exitFullscreen) {
			document.exitFullscreen();
		}
	}
}

function randomInteger(min, max) {
	var rand = min + Math.random() * (max + 1 - min);
	rand = Math.floor(rand);
	return rand;
}

function equalHeight(group) {
	if (jQuery(window).width() > '768') {
		var tallest = 0;
		jQuery(group).each(function () {
			var thisHeight = jQuery(this).css('height', '').outerHeight();
			if (thisHeight > tallest) {
				tallest = thisHeight;
			}
		});
		jQuery(group).css('height', tallest);
	} else {
		jQuery(group).css('height', '');
	}
}

function equalHeight_m(group) {
	var tallest = 0;
	jQuery(group).each(function () {
		var thisHeight = jQuery(this).css('height', '').outerHeight();
		if (thisHeight > tallest) {
			tallest = thisHeight;
		}
	});
	jQuery(group).css('height', tallest);
}

function yprm_getCookie(name) {
	let matches = document.cookie.match(new RegExp(
		"(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
	));
	return matches ? decodeURIComponent(matches[1]) : undefined;
}

function yprm_setCookie(name, value, options = {}) {

	options = {
		path: '/',
		...options
	};

	if (options.expires instanceof Date) {
		options.expires = options.expires.toUTCString();
	}

	let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

	for (let optionKey in options) {
		updatedCookie += "; " + optionKey;
		let optionValue = options[optionKey];
		if (optionValue !== true) {
			updatedCookie += "=" + optionValue;
		}
	}

	document.cookie = updatedCookie;
}

if (yprm_getCookie('yprm_gdpr') == 'true') {
	jQuery('.gdpr-modal-block').remove();
}

jQuery('.navigation.on-left > .menu').each(function() {
	let $items = jQuery(this).children(),
	total_count = $items.length,
	left_count = Math.round(total_count/2),
	right_count = total_count - left_count;

	$items.each(function(index, el) {
		if(index >= left_count) {
			el.remove();
		}
	});

	$items.parents('.site-header').find('.navigation.on-right > .menu > li').each(function(index, el) {
		if(index < right_count) {
			el.remove();
		}
	});

	
});

jQuery(window).on('load', function () {
	if (jQuery('.preloader-words-area').length > 0) {
		setTimeout(function () {
			jQuery('body').addClass('loaded');
		}, 600);
	} else {
		jQuery('body').addClass('loaded');
	}

	jQuery('.subscribe-form-popup').each(function() {
		let $el = jQuery(this),
		delay = jQuery(this).attr('data-delay');

		setTimeout(function() {
			$el.css("display", "flex").hide().fadeIn();
		}, delay);
	});

	jQuery(window).trigger('resize').trigger('scroll');
	jQuery('.isotope').isotope();
	jQuery('.owl-carousel').trigger('refresh.owl.carousel');

	setTimeout(function () {
		jQuery(window).trigger('resize').trigger('scroll');
		jQuery('.isotope').isotope();
		jQuery('.swiper-container').each(function() {
			jQuery(this).get(0).swiper.update();
		});
	}, 300);

	setTimeout(function () {
		jQuery('body').removeClass('pace-loading').addClass('pace-done');
		jQuery('.pace').remove();
	}, 5300);
});

jQuery(document).ready(function () {

	jQuery(document).on('click', '[href="#"]', function (e) {
		e.preventDefault();
	}).on('mouseenter', '.blog-item.style3', function () {
		jQuery(this).find('.img').css('height', jQuery(this).height());
	}).on('mouseleave', '.blog-item.style3', function () {
		jQuery(this).find('.img').css('height', '');
	});

	jQuery('#wpadminbar').addClass('wpadminbar');

	/* Navigation Events */

	jQuery('body').on('click', '.nav-butter.hidden_menu, .nav-butter.visible_menu', function () {
		if (jQuery(window).width() >= 992) {
			if (jQuery(this).hasClass('active')) {
				jQuery(this).removeClass('active').parents('header').find('.navigation').removeClass('active');
			} else {
				jQuery(this).addClass('active').parents('header').find('.navigation').addClass('active');
			}
		} else {
			jQuery('.mobile-navigation-block').addClass('active');
		}
	}).on('click', '.nav-butter.side_menu', function () {
		if (jQuery(this).hasClass('active')) {
			jQuery(this).removeClass('active');
			jQuery('.side-navigation').removeClass('active');
		} else {
			jQuery(this).addClass('active');
			jQuery('.side-navigation').addClass('active');
		}
	}).on('click', '.nav-butter.fullscreen', function () {
		jQuery(this).toggleClass('active');
		jQuery('.fullscreen-navigation-area').toggleClass('active');
	}).on('click', '.side-navigation a', function (e) {
		var $el = jQuery(this),
			$parent = $el.parent();

		if ($parent.hasClass('menu-item-has-children') && !$parent.hasClass('active')) {
			e.preventDefault();

			$parent.addClass('hide active').siblings().addClass('hide');
			$el.parents('.sub-menu').addClass('opened');
		}
	}).on('click', '.side-navigation .sub-menu > .back', function () {
		var $el = jQuery(this);

		$el.parent().parent().removeClass('hide active').siblings().removeClass('hide');
		$el.parent().parent().removeClass('opened').parent().removeClass('opened');
	}).find('.side-navigation .sub-menu').prepend('<li class="back free-basic-ui-elements-left-arrow"></li>');

	/* Close Mobile Navigation */

	jQuery('.mobile-navigation-block').on('click', '.close', function () {
		jQuery(this).parent().removeClass('active');
	});

	/* Toggle Fullscreen */

	jQuery('.header-fullscreen-button').on('click', function () {
		toggleFullScreen();
	});

	/* Scroll Event */

	jQuery(window).on('load scroll', function () {
		var scroll_top = jQuery(document).scrollTop(),
			scroll_top_w = scroll_top + jQuery(window).height(),
			scroll_top_w2 = scroll_top + (jQuery(window).height() / 2);

		if(!jQuery('body').hasClass('header-fixed-false')) {
			if (scroll_top > 50) {
				jQuery('body').addClass('fixed-header');
				jQuery('header.site-header').addClass('fixed');
			} else {
				jQuery('body').removeClass('fixed-header');
				jQuery('header.site-header').removeClass('fixed');
			}
		}

		if (scroll_top > jQuery(window).height() * 1.2) {
			jQuery('.scroll-to-top-button').addClass('show');
		} else {
			jQuery('.scroll-to-top-button').removeClass('show');
		}

		jQuery('.screen-section').each(function () {
			var this_scroll_top = parseInt(jQuery(this).offset().top - jQuery('#wpadminbar').height()),
				this_h = parseInt(jQuery(this).height());

			if (scroll_top >= this_scroll_top && scroll_top < (this_scroll_top + this_h)) {
				jQuery('header.site-header').addClass('hide-header');
			} else {
				jQuery('header.site-header').removeClass('hide-header');
			}
		});

		jQuery('.scroll-to-top').each(function () {
			let document_height = jQuery(document).height() - jQuery(window).height(),
				percent = scroll_top * 100 / document_height;

			if (jQuery(window).height() <= jQuery('body').height()) {
				jQuery(this).addClass('show');
			} else {
				jQuery(this).removeClass('show');
			}

			if (scroll_top > (jQuery(window).height() * .5)) {
				jQuery(this).addClass('show');
			} else {
				jQuery(this).removeClass('show');
			}

			jQuery(this).find('.progress div').css({
				width: percent + '%'
			});
		});

		jQuery('.banner-single-area').each(function () {
			var this_scroll_top = parseInt(jQuery(this).offset().top - jQuery('#wpadminbar').height());

			if (scroll_top >= this_scroll_top) {
				jQuery(this).find('.banner-item').addClass('animated');
			}
		});
	});

	jQuery('.input-row .style1, .input-row .input, .toggle-focus').on('focusin', function () {
		jQuery(this).parent().addClass('focus');
	}).on('focusout', function () {
		if (!jQuery(this).val()) {
			jQuery(this).parent().removeClass('focus').addClass('focusout').delay(450).queue(function (next) {
				jQuery(this).removeClass('focusout');
				next();
			});
		}
	}).each(function () {
		if (jQuery(this).val()) {
			jQuery(this).parent().addClass('focus');
		}
	});

	jQuery('.search-popup .searchform > div .input').on('focusin', function () {
		jQuery(this).parents('.searchform').addClass('focus');
	}).on('focusout', function () {
		if (!jQuery(this).val()) {
			jQuery(this).parents('.searchform').removeClass('focus').addClass('focusout').delay(450).queue(function (next) {
				jQuery(this).removeClass('focusout');
				next();
			});
		}
	});

	jQuery('.social-links .subscribe-label').on('click', function () {
		jQuery('.subscribe-popup').addClass('active');
		jQuery('.search-popup').removeClass('active');
	});

	jQuery('.subscribe-popup .close').on('click', function () {
		jQuery(this).parent().removeClass('active');
	});

	/* Resize Events */

	var nav_el = '';
	if (jQuery('.navigation').hasClass('visible_menu')) {
		nav_el = 'yes';
	}

	jQuery('.navigation > .menu > li, .navigation .sub-menu li').on('mouseenter', function() {
		let $li = jQuery(this),
		$menu = $li.children('.sub-menu');

		if($menu.length && $menu.offset().left+$menu.outerWidth() >= jQuery(window).width() && !$li.hasClass('sub-on-left')) {
			$li.addClass('sub-on-left');
		}
	});

	jQuery(window).on('load resize', function () {
		var window_height = jQuery(window).height() - jQuery('.header-space:visible').height() - jQuery('#wpadminbar').height(),
			window_width = jQuery(window).width();

		jQuery('.full-height:not(.extends-height)').css('height', window_height);
		jQuery('.full-height.extends-height').css('height', window_height + 170);

		jQuery('.main-container, .protected-post-form').css('min-height', window_height - jQuery('.page-top-block').outerHeight() - jQuery('.site-footer').outerHeight());

		if (nav_el == "yes") {
			if (jQuery(window).width() >= 992) {
				jQuery('.navigation, .site-header .nav-butter').addClass('visible_menu').removeClass('hidden_menu');
			} else {
				jQuery('.navigation, .site-header .nav-butter').removeClass('visible_menu').addClass('hidden_menu');
			}
		}

		jQuery('.header-space').each(function() {
			jQuery(this).css({
				height: jQuery('.site-header').length ? jQuery('.site-header').height() : ''
			});
		});

		jQuery('.video-block').each(function () {
			if (jQuery(this).next('.video-block-o').length == 0) return false;

			var $this = jQuery(this),
				o_left = $this.next('.video-block-o').offset().left,
				width = $this.next('.video-block-o').width();
			if ($this.hasClass('stick-to-left')) {
				$this.css('margin-left', -o_left);
			} else if ($this.hasClass('stick-to-right')) {
				$this.css('margin-right', -(window_width - o_left - width));
			}
		});

		jQuery('.header-logo-center').each(function() {
			jQuery(this).find('.center').css({
				'margin-top': -jQuery(this).find('.center').height()/2,
				'margin-left': -jQuery(this).find('.center').width()/2
			});

			jQuery(this).find('.navigation.on-left').css({
				'margin-top': -jQuery(this).find('.navigation.on-left').height()/2,
			});

			jQuery(this).find('.navigation.on-right').css({
				'margin-top': -jQuery(this).find('.navigation.on-right').height()/2,
			});
		});

		jQuery('.project-page-image-right-side').each(function() {
			let height = jQuery(this).find('.project-content-block').outerHeight(true),
			offset_left = jQuery(this).find('.project-content-block').offset().left;
			jQuery(this).find('.right-side > .wrap').css({
				'height': height > window_height ? height : window_height,
				'margin-right': -offset_left
			});
		});

		jQuery('.project-split-screen').each(function() {
			let offset_left = jQuery(this).find('.project-content-block').offset().left;
			jQuery(this).find('.right-side > .wrap').css({
				'margin-right': -offset_left
			});
		});

		jQuery('.project-horizontal').each(function() {
			let offset = jQuery(this).parent().offset().left;

			jQuery(this).css({
				'margin-left': -offset-15,
				'margin-right': -offset-15
			}).find('img').css({
				'max-height': window_height
			});
		});
	});

	/* Mobile Menu */

	jQuery('body').on("click", '.mobile-navigation .menu-item-has-children > a, .mobile-navigation .mega-menu-item-has-children > a', function () {
		if(jQuery(this).parent().hasClass('mega-menu-grid')) {
			if (!jQuery(this).hasClass('current')) {
				jQuery(this).addClass('current').next().find('.mega-menu-column > .mega-sub-menu').slideDown();
				return false;
			} else if (jQuery(this).attr('href') == '' || jQuery(this).attr('href') == '#') {
				jQuery(this).removeClass('current').next().find('.mega-menu-column > .mega-sub-menu').slideUp();
				return false;
			}
		} else if (jQuery(this).parent().hasClass('mega-menu-item-has-children')) {
			if (!jQuery(this).hasClass('current')) {
				jQuery(this).addClass('current').next().slideDown().siblings();
				return false;
			} else if (jQuery(this).attr('href') == '' || jQuery(this).attr('href') == '#') {
				jQuery(this).removeClass('current').next().slideUp();
				return false;
			}
		} else {
			if (!jQuery(this).hasClass('current')) {
				jQuery(this).addClass('current').parent().children('.sub-menu').slideDown().siblings().children('.sub-menu').slideUp().find('a.current').removeClass('current');
				return false;
			} else if (jQuery(this).attr('href') == '' || jQuery(this).attr('href') == '#') {
				jQuery(this).removeClass('current').parent().children('.sub-menu').slideUp();
				return false;
			}
		}
	});

	/* Fullscreen menu */

	jQuery('.fullscreen-navigation').each(function () {
		var $this = jQuery(this);

		$this.find('.sub-menu, .children').each(function () {
			jQuery(this).prepend('<li class="back pointers-left-arrow"></li>');
		});

		$this.on('click', '.menu-item-has-children > a', function (e) {
			if (!jQuery(this).hasClass('current')) {
				e.preventDefault();
				jQuery(this).addClass('current hidden').parent().siblings().addClass('hidden').find('a.current').removeClass('current');
			} else if (jQuery(this).attr('href') == '' || jQuery(this).attr('href') == '#') {
				e.preventDefault();
				jQuery(this).removeClass('current hidden').parent().siblings().removeClass('hidden');
			}
		}).on('click', 'li.back', function () {
			jQuery(this).parent().prev().removeClass('current hidden').parent().siblings().removeClass('hidden');
		});
	});


	/* Scroll Down Arrow */

	jQuery('.scroll-down-button, .scroll-down-arrow').on('click', function () {
		var $area = jQuery(this).parents('.banner-area, .gallery-banner, rs-module'),
			top = $area.offset().top + $area.height() - jQuery('.site-header').height();

		jQuery('body, html').animate({
			scrollTop: top
		}, 1100);
		return false;
	});

	jQuery('.scroll-to-top').on('click', function () {
		var $area = jQuery(this).parent(),
			top = $area.offset().top + $area.height();

		jQuery('body, html').animate({
			scrollTop: 0
		}, 1100);
		return false;
	});

	jQuery('.about-me-block .scroll-down').on('click', function () {
		var $area = jQuery(this).parents('.about-me-block'),
			top = $area.offset().top + $area.height() - jQuery('.header-space:visible').height() - jQuery('#wpadminbar').height();

		jQuery('body, html').animate({
			scrollTop: top
		}, 1100);
		return false;
	});

	/* Scroll Up Arrow */

	jQuery('.scroll-up-arrow').on('click', function () {
		jQuery('body, html').animate({
			scrollTop: 0
		}, 1100);
		return false;
	});

	/* Sidebar Butter */

	jQuery('.sidebar-butter, .sidebar-content-block .close, .sidebar-content-overlay').on('click', function () {
		jQuery('.sidebar-butter, .sidebar-content-block, .sidebar-content-overlay').toggleClass('active');
	});

	/* Project Gallery */

	jQuery('.project-gallery.isotope').each(function () {
		jQuery(this).isotope({
			itemSelector: '.item',
			masonry: {
				columnWidth: '.grid-sizer',
			}
		});
	});

	/* Project Slider */

	if (jQuery('.project-slider .swiper-slide').length > 1) {
		let $project_slider = jQuery('.project-slider'),
		$project_thumbs = $project_slider.find('.thumbs'),
		$project_thumbs_swiper = new Swiper($project_thumbs, {
			loop: false,
			spaceBetween: 20,
			slidesPerView: 1,
			slideToClickedSlide: true,
			breakpoints: {
				320: {
					slidesPerView: 2,
				},
				480: {
					slidesPerView: 3,
				},
				640: {
					slidesPerView: 4,
				},
				780: {
					slidesPerView: 5,
				},
			},
			breakpointsInverse: true,
		});

		let $project_slider_swiper = new Swiper($project_slider.find('.slider'), {
			loop: true,
			spaceBetween: 30,
			thumbs: {
				swiper: $project_thumbs.length > 0 ? $project_thumbs_swiper : false
			},
			navigation: {
				nextEl: $project_slider.find('.next'),
				prevEl: $project_slider.find('.prev'),
			},
		});
	}

	jQuery('.product-thumb-slider').each(function () {
		let $product_thumb_slider = jQuery(this),
		$product_thumb_slider_container = new Swiper($product_thumb_slider, {
			loop: true,
			navigation: {
				nextEl: $product_thumb_slider.find('.next'),
				prevEl: $product_thumb_slider.find('.prev'),
			},
		});
	});

	jQuery('.project-split-screen .swiper-container').each(function () {
		let $product_thumb_slider = jQuery(this),
		$product_thumb_slider_container = new Swiper($product_thumb_slider, {
			loop: false,
			direction: 'horizontal',
			mousewheel: {},
			pagination: {
				el: $product_thumb_slider.find('.swiper-dots'),
				clickable: true
			},
			breakpoints: {
				768: {
					direction: 'vertical',
				}
			}
		});
	});

	jQuery('.project-carousel .swiper-container').each(function () {
		let $product_thumb_slider = jQuery(this),
		offset = $product_thumb_slider.parent().offset().left;

		$product_thumb_slider.css({
			'margin-left': -offset,
			'margin-right': -offset
		});

		let $product_thumb_slider_container = new Swiper($product_thumb_slider, {
			loop: false,
			slidesPerView: 'auto',
			spaceBetween: 30,
		});
	});

	jQuery('.project-horizontal .swiper-container').each(function () {
		let $product_thumb_slider = jQuery(this),
		$product_thumb_slider_container = new Swiper($product_thumb_slider, {
			loop: false,
			slidesPerView: 'auto',
			spaceBetween: 30,
			navigation: {
				nextEl: $product_thumb_slider.prev('.next'),
			},
		});
	});

	/* Product Image Block */

	jQuery('.product-image-block').each(function () {
		var $block = jQuery(this),
			$thumbs_carousel = $block.find('.thumbs .swiper-container'),
			$image_slider = $block.find('.slider');

		var $thumbs_carousel_swiper = new Swiper($thumbs_carousel, {
			direction: 'vertical',
			slidesPerView: 'auto',
			spaceBetween: 15,
		});

		var $image_slider_swiper = new Swiper($image_slider, {
			navigation: {
				nextEl: $image_slider.find('.next'),
				prevEl: $image_slider.find('.prev'),
			},
			thumbs: {
				swiper: $thumbs_carousel_swiper
			}
		});

		$thumbs_carousel.find('.swiper-slide:eq(0)').addClass('thumb-active');

		$block.on('click', '.thumbs .swiper-slide', function () {
			var index = jQuery(this).index();

			$image_slider_swiper.slideTo(index);
			jQuery(this).addClass('thumb-active').siblings().removeClass('thumb-active');
		});
	});

	/* Account Form Events */

	jQuery('.woocommerce-account-block').on('click', '.login-link a', function () {
		jQuery(this).parents('.woocommerce-account-block').children().removeClass('show');
		jQuery(this).parents('.woocommerce-account-block').find('.login').addClass('show');
	}).on('click', '.register-link a', function () {
		jQuery(this).parents('.woocommerce-account-block').children().removeClass('show');
		jQuery(this).parents('.woocommerce-account-block').find('.register').addClass('show');
	}).on('click', '.lost-password-link', function () {
		jQuery(this).parents('.woocommerce-account-block').children().removeClass('show');
		jQuery(this).parents('.woocommerce-account-block').find('.lost_reset_password').addClass('show');
	})

	/* Reply Comment */

	jQuery('.replytocom').on('click', function () {
		var id_parent = jQuery(this).attr('data-id');
		jQuery('#comment_parent').val(id_parent);
		jQuery('#respond').appendTo(jQuery(this).parents('.comment-item'));
		jQuery('#cancel-comment-reply-link').show();
		return false;
	});

	jQuery('#cancel-comment-reply-link').on('click', function () {
		jQuery('#comment_parent').val('0');
		jQuery('#respond').appendTo(jQuery('#commentform-area'));
		jQuery('#cancel-comment-reply-link').hide();
		return false;
	});

	/* Quantity Buttons */

	jQuery('.quantity .down').on("click", function () {
		var val = jQuery(this).parent().find('.input-text').val();
		if (val > 1) {
			val = parseInt(val) - 1;
			jQuery(this).parent().find('.input-text').val(val);
		}
		return false;
	});

	jQuery('.quantity .up').on("click", function () {
		var val = jQuery(this).parent().find('.input-text').val(),
			max = jQuery(this).parent().find('.input-text').attr('max');
		if (max == '' || val < max) {
			val = parseInt(val) + 1;
			jQuery(this).parent().find('.input-text').val(val);
		}
		return false;
	});

	/* Scrollbar */

	jQuery('.scrollbar-inner').each(function () {
		jQuery(this).scrollbar({
			'scrollx': false,
		})
	});

	/* Search Popup */

	jQuery(document).on('click', '.site-header .header-search-button, .search-popup .close', function () {
		jQuery(this).toggleClass('active');
		jQuery('.search-popup').toggleClass('active');
		jQuery('.subscribe-popup').removeClass('active');

		/* if (!jQuery(this).hasClass('active') && jQuery(window).scrollTop() <= 50) {
			jQuery('.site-header').removeClass('fixed');
		} else {
			jQuery('.site-header').addClass('fixed');
		} */
	});

	/* Right Click Disable */

	jQuery('.right-click-disable-true').on('contextmenu', function () {
		jQuery('.right-click-disable-message').addClass('active');
		return false;
	});

	jQuery('.right-click-disable-message:not(.lic)').on('click', function () {
		jQuery(this).removeClass('active');
		return false;
	});

	/* GDPR Close Cookie */

	jQuery('.gdpr-modal-block').on('click', '.close', function () {
		yprm_setCookie('yprm_gdpr', true);
		jQuery(this).parent().fadeOut();
	});

	/* Mega Menu Overlay */

	jQuery('.side-navigation li.mega-menu-item').on('open_panel', function () {
		jQuery('body').addClass('megamenu-open');

		jQuery('.site-header').addClass('fixed-bg');
	}).on('close_panel', function () {
		jQuery('body').removeClass('megamenu-open');

		if (jQuery(document).scrollTop() <= 50) {
			jQuery('.site-header').removeClass('fixed-bg');
		}
	});

	/* Close Subscribe */

	jQuery('.subscribe-form-popup').on('click', '.close', function() {
		let $block = jQuery(this).parents('.subscribe-form-popup');

		$block.fadeOut();
		
		yprm_setCookie('yprm_subscribe_form_cookie', true);
	});
});