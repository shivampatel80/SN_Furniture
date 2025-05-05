function yprm_uniqid(pr, en) {
	var pr = pr || '',
		en = en || false,
		result, us;

	var seed = function (s, w) {
		s = parseInt(s, 10).toString(16);
		return w < s.length ? s.slice(s.length - w) :
			(w > s.length) ? new Array(1 + (w - s.length)).join('0') + s : s;
	};

	result = pr + seed(parseInt(new Date().getTime() / 1000, 10), 8) +
		seed(Math.floor(Math.random() * 0x75bcd15) + 1, 5);

	if (en) result += (Math.random() * 10).toFixed(8).toString();

	return result;
};

function control_video($video_block, event) {
	$video_block.each(function () {
		let $item = jQuery(this),
			video = $item.find('video'),
			type = $item.attr('data-type');

		if (type == 'youtube') {
			if (typeof $item.attr('data-uniqid') === 'undefined') {
				video = yprm_load_youtube_video($item, event, {
					quality: $item.attr('data-quality'),
					muted: $item.attr('data-muted')
				});
			} else {
				video = window.youtube_players[$item.attr('data-uniqid')];

				if (event == 'play') {
					video.play();
				} else if (event == 'pause') {
					video.pause();
				} else if (event == 'mute') {
					video.muted = true;
				} else if (event == 'unmute') {
					video.muted = false;
				}
			}

		} else {
			video.each(function (index, item) {
				if (event == 'play') {
					item.play();
				} else if (event == 'pause') {
					item.pause();
				}
			})
		}
	});
}

function yprm_load_youtube_video($this, event, atts = []) {
	if (typeof event === 'undefined') {
		let event = '';
	}
	let video_id = $this.attr('data-id'),
		uniqid = $this.attr('data-uniqid');

	let quality = atts.quality;

	if (quality == '1440p') {
		quality = 'hd1440';
	} else if (quality == '1080p') {
		quality = 'hd1080';
	} else {
		quality = 'hd720';
	}

	let player = youtube({
		el: $this.get(0),
		id: video_id,
		modestbranding: true,
		iv_load_policy: 3,
		controls: false,
		disabledkb: false,
		showInfo: false,
		loop: true,
		rel: false,
		playlist: false,
		playsinline: false,
		list: false
	});

	player.addEventListener('ready', function () {
		let uniqid = yprm_uniqid();

		jQuery(player.player.a).attr('data-uniqid', uniqid);
		window.youtube_players[uniqid] = this;

		if (atts.muted == 'true') {
			this.muted = true;
		} else {
			this.muted = false;
		}
		if (jQuery(player.player.a).hasClass('disable-on-scroll') || event == 'pause') {
			this.pause();
		} else if (event == 'play') {
			this.play();
		}
	});

	player.addEventListener('ended', function () {
		player.play();
	});

	return player;
}

function yprm_calc_video_width($this) {
	let $video = jQuery($this),
		$container = $video.parent(),
		$width = $container.width(),
		$height = $container.height(),
		ratio = 16 / 9,
		coef = $width / $height;

	if (coef < 16 / 9) {
		$video.css({
			width: $height * ratio
		});
	} else {
		$video.css({
			width: $width
		});
	}
}

jQuery.fn.extend({
	toggleAttr: function (attr, a, b) {
		return this.attr(attr, this.attr(attr) == b ? a : b);
	}
});

function item_animation_delay() {
	var item_top = item_delay = 0;
	jQuery('.blog-item .wrap, .portfolio-block .wpb_animate_when_almost_visible').each(function () {
		var top = jQuery(this).offset().top;

		if (top == item_top) {
			item_delay = item_delay + 300;
		} else {
			item_top = top;
			item_delay = 0
		}

		if (item_delay != 0) {
			jQuery(this).css('animation-delay', item_delay + 'ms');
		}
	});
}

function portfolio_slider_content($this, $portfolio_content) {
	var $el = jQuery($this.slides[$this.activeIndex]),
		title = $el.attr('data-title'),
		desc = $el.attr('data-desc'),
		link = $el.attr('data-link');

	if (title) {
		$portfolio_content.find('.title').text(title).fadeIn();
	}
	if (desc) {
		$portfolio_content.find('.desc').text(desc).fadeIn();
	}
	if (link) {
		$portfolio_content.find('a').attr('href', link).fadeIn();
	}
}

item_animation_delay();

jQuery('.price-list-block').each(function () {
	var $switcher = jQuery(this).find('.plan-switcher');

	if (jQuery(this).find('.with-switch').length == 0) {
		$switcher.hide();
	}

	$switcher.on('click', 'button:not(.current)', function () {
		jQuery(this).addClass('current').siblings().removeClass('current').parents('.price-list-block').toggleClass('price-annual');
	});

	jQuery(this).find('.price').each(function() {
		let $price = jQuery(this);
		price = jQuery(this).text();
		if(price) {
			jQuery(this).text('');
			for (let index = 0; index < price.length; index++) {
				$price.append('<span class="p">'+price[index]+'</span>');
			}
		}
	});
});

jQuery(document).ready(function ($) {
	"use strict";

	let dir = 'ltr';
	if(jQuery('html').attr('dir') === 'rtl') {
		dir = 'rtl';
	}

	window.youtube_players = [];

	jQuery(window).on("load resize", function () {
		var window_width = jQuery(window).width();

		jQuery('.side-img-block').each(function () {
			var $el = jQuery(this),
				offset_left = $el.offset().left,
				width = $el.width();

			if(dir == 'rtl') {
				if (jQuery(this).hasClass('to-left')) {
					$el.find('div').css('margin-right', (offset_left + width) - window_width)
				}
	
				if (jQuery(this).hasClass('to-right')) {
					$el.find('div').css('margin-left', -offset_left)
				}
			} else {
				if (jQuery(this).hasClass('to-left')) {
					$el.find('div').css('margin-left', -offset_left)
				}
	
				if (jQuery(this).hasClass('to-right')) {
					$el.find('div').css('margin-right', (offset_left + width) - window_width)
				}
			}
		});

		jQuery('.video-wrap iframe.video').each(function () {
			yprm_calc_video_width(this);
		});

		jQuery('.image-slider-blockk').each(function() {
			let $el = jQuery(this);
			
			$el.css('height', jQuery(window).height()).find('.swiper-slide').css('height', $el.height()-$el.find('.content-block').height());
		});

		jQuery('.side-image-with-content > .image').each(function() {
			let $el = jQuery(this),
			$block = $el.parent();

			if(($block.hasClass('left') && jQuery(document).attr('dir') != 'rtl') || ($block.hasClass('right') && jQuery(document).attr('dir') == 'rtl')) {
				$el.find('div').css('left', -$el.offset().left);
			} else if($block.hasClass('center')) {
				if($block.hasClass('two-image')) {
					$el.find('div').css('left', -$el.offset().left);
				} else {
					$el.find('div').css({
						'left': -$el.offset().left,
						'right': $block.width()+$el.offset().left-jQuery(window).width()
					});
				}
			} else if(($block.hasClass('right') && jQuery(document).attr('dir') != 'rtl') || ($block.hasClass('left') && jQuery(document).attr('dir') == 'rtl')) {
				$el.find('div').css('right', $el.width()+$el.offset().left-jQuery(window).width());
			}
		});

		jQuery('.side-image-with-content > .second-image').each(function() {
			let $el = jQuery(this),
			$block = $el.parent();

			if(($block.hasClass('left') && jQuery(document).attr('dir') != 'rtl') || ($block.hasClass('right') && jQuery(document).attr('dir') == 'rtl')) {
				$el.find('div').css('right', $el.width()+$el.offset().left-jQuery(window).width());
			} else if($block.hasClass('center')) {
				if($block.hasClass('two-image')) {
					$el.find('div').css('right', $el.width()+$el.offset().left-jQuery(window).width());
				} else {
					$el.find('div').css({
						'left': -$el.offset().left,
						'right': $block.width()+$el.offset().left-jQuery(window).width()
					});
				}
			} else if(($block.hasClass('right') && jQuery(document).attr('dir') != 'rtl') || ($block.hasClass('left') && jQuery(document).attr('dir') == 'rtl')) {
				$el.find('div').css('left', -$el.offset().left);
			}
		});

		jQuery('.booking-item').each(function() {
			if(jQuery(this).width() < 330) {
				jQuery(this).addClass('minimal');
			} else {
				jQuery(this).removeClass('minimal');
			}
		});

		jQuery('.type-slider-with-thumbs-type2').each(function() {
			let $block = jQuery(this),
			$slider = $block.find('.slider');

			if(jQuery(document).attr('dir') == 'rtl') {
				$slider.css({
					'width': jQuery(window).width(),
					'margin-right': -$block.offset().left
				});
			} else {
				$slider.css({
					'width': jQuery(window).width(),
					'margin-left': -$block.offset().left
				});
			}
			
		});

		jQuery('.rooms-horizontal-gallery').each(function() {
			let $block = jQuery(this),
			$slider = $block.find('.swiper-container');

			if(jQuery(document).attr('dir') == 'rtl') {
				$slider.css({
					'width': jQuery(window).width(),
					'margin-right': -$block.offset().left
				});
			} else {
				$slider.css({
					'width': jQuery(window).width(),
					'margin-left': -$block.offset().left
				});
			}
		});
	});

	jQuery('.image-slider-block').on('click', '.open-form', function() {
		let $block = jQuery(this).parents('.image-slider-block');
		$block.toggleClass('opened-form');

		if($block.hasClass('opened-form')) {
			let array = [
				['.mphb_sc_search-dates-label', '.mphb_sc_search-check-in-date', '.mphb_sc_search-check-out-date'],
				['.mphb_sc_search-guests-label', '.mphb_sc_search-guests'],
				['.mphb_sc_search-submit-button-wrapper'],
			],
			timeOut = 0;
	
			array.forEach(function(item, index) {
				timeOut = index*400;
				setTimeout(function() {
					item.forEach(function(el) {
						$block.find(el).addClass('show');
					});
	
				}, timeOut);
			});
		} else {
			$block.find('.right > .appartment-search-form .show').removeClass('show');
		}
	});

	jQuery('.parallax-image').each(function () {
		var $this = jQuery(this),
			position = $this.attr('data-position');

		jarallax(this, {
			speed: 0.2,
			imgPosition: position
		});
	});

	jQuery('.rooms-tabs .tabs-head').on('click', 'li:not(.current)', function() {
		jQuery(this).addClass('current').siblings().removeClass('current').parents('.rooms-tabs').find('.tab:eq('+jQuery(this).index()+')').show().siblings().hide();
	});

	jQuery('.products.isotope').each(function() {
		jQuery(this).isotope({
			itemSelector: '.product',
			masonry: {
				columnWidth: '.grid-sizer',
			}
		});
	});

	/* Document On Click */

	jQuery(document)
		/* Filter Buttons */
		.on('click', '.filter-block .filter-buttons .button:not(.current)', function () {
			var $grid = jQuery(this).parents('.filter-block').find('.isotope'),
				$button = jQuery(this).parents('.filter-block').find('.loadmore-button');

			if ($grid.length == 0 || $button.hasClass('loading')) return;

			jQuery(this).addClass('current').siblings().removeClass('current');

			var filterValue = jQuery(this).attr('data-filter');
			if ($button.length > 0) {
				jQuery(this).parents('.filter-block').find('.loadmore-button').trigger('click', [false]);
			} else {
				$grid.isotope({
					filter: filterValue
				});
			}

			jQuery(window).trigger('resize').trigger('scroll');
		})
		.on('click', '.product-block .filter-buttons .button:not(.current)', function () {
			var $grid = jQuery(this).parents('.product-block').find('.isotope'),
				$button = jQuery(this).parents('.product-block').find('.loadmore-button');

			if ($grid.length == 0 || $button.hasClass('loading')) return;

			jQuery(this).addClass('current').siblings().removeClass('current');

			var filterValue = jQuery(this).attr('data-filter');
			if ($button.length > 0) {
				jQuery(this).parents('.product-block').find('.loadmore-button').trigger('click', [false]);
			} else {
				$grid.isotope({
					filter: filterValue
				});
			}

			jQuery(window).trigger('resize').trigger('scroll');
		})
		.on('click', '.bg-overlay .close', function () {
			e.preventDefault();
			var $video = jQuery(this).parent().find('.video');

			$video.find('video').fadeOut(400, function () {
				jQuery(this).remove();
			});
			$video.parents('.banner-area').removeClass('plaing-video');
		})
		.on('mousemove', '.portfolio-type-slider .swiper-slide, .portfolio-item .img, .portfolio-item-style2 .img, .portfolio-item-style3 .img, .product-image-block .slider .swiper-slide, .portfolio-type-carousel2 .swiper-slide .img', function (e) {
			jQuery(this).find('.hover-plus').fadeIn().css({
				'top': e.offsetY - 25,
				'left': e.offsetX - 25
			})
		})
		.on('mouseout', '.portfolio-type-slider .swiper-slide, .portfolio-item .img, .portfolio-item-style2 .img, .portfolio-item-style3 .img, .product-image-block .slider .swiper-slide, .portfolio-type-carousel2 .swiper-slide .img', function (e) {
			jQuery(this).find('.hover-plus').fadeOut();
		})
		.on('click', '.open-attributes', function() {
			jQuery(this).toggleClass('active').prev('.attributes').slideToggle();
		})
		.on('mousemove', '.menu-block .item', function(e) {
			let $this = jQuery(this),
			top = e.pageY - $this.offset().top,
			left = e.pageX - $this.offset().left;
			$this.find('.bg-image').css({
				transform: 'translate('+left+'px, '+top+'px)'
			});
		})
		.on('click', function(e) {
			var el = '.header-booking-form';
			if (jQuery(e.target).closest(el).length || jQuery(e.target).closest('.datepick-popup').length) return;
			jQuery(el).removeClass('opened')
		});

	jQuery('.banner-s-buttons').on('click', 'div.button', function () {
		jQuery(this).toggleClass('active').siblings().removeClass('active');
		jQuery(this).parents('.one-screen').find('.banner-c-block[data-type="' + jQuery(this).attr('data-type') + '"]').toggleClass('active').siblings('.banner-c-block').removeClass('active');
	});

	jQuery(window).scroll(num_scr);

	jQuery(window).on('load scroll', function () {
		var scroll_top = jQuery(window).scrollTop() + jQuery('#wpadminbar').height(),
			window_height = jQuery(window).height();

		jQuery('.bg-overlay .video').each(function () {
			var top_offset = parseInt(jQuery(this).offset().top),
				height = parseInt(jQuery(this).height());

			if (!jQuery(this).parents('.banner-item').length > 0 && !jQuery(this).parents('.fn-bgs').length > 0) {
				if (scroll_top + window_height >= top_offset && scroll_top <= top_offset + height) {
					jQuery(this).addClass('is-playing');
					control_video(jQuery(this), 'play');
				} else {
					jQuery(this).removeClass('is-playing');
					control_video(jQuery(this), 'pause');
				}
			}
		});

		jQuery('.rate-line div').each(function () {
			var el_top = jQuery(this).offset().top;

			if (scroll_top + window_height >= el_top) {
				jQuery(this).addClass('animated').css('width', jQuery(this).attr('data-percent'));
			}
		});

		jQuery('.portfolio-type-scattered .portfolio-item').each(function (index) {
			var $this = jQuery(this),
				offset = scroll_top - $this.offset().top + jQuery(this).parents('.portfolio-type-scattered').offset().top,
				val = 0;

			var percent = offset * 100 / window_height;
			val = -20 * (percent / 100);

			if (val < -20) {
				val = -20
			} else if (val > 0) {
				val = 0
			}

			jQuery(this).find('.wrap').css({
				'-webkit-transform': 'translateY(' + val + '%)',
				'-moz-transform': 'translateY(' + val + '%)',
				'-o-transform': 'translateY(' + val + '%)',
				'transform': 'translateY(' + val + '%)',
			});
		});

		jQuery('.bg-overlay .text').each(function (index) {
			let offset_top = jQuery(this).parent().offset().top,
				height = jQuery(this).height(),
				t_height = jQuery(this).find('span').outerHeight(),
				coef = t_height * 10 / height / 10,
				top = (offset_top - scroll_top) * coef;

			if (scroll_top + window_height > offset_top && scroll_top < offset_top + height) {
				jQuery(this).find('span').css('transform', 'translate(0%, ' + top + 'px) rotate(90deg)');
			}
		});

		jQuery('.scroll-to-top, .social-links-on-side').each(function () {
			let $scroll_el = jQuery(this),
				scroll_el_top = $scroll_el.offset().top,
				flag = false;

			jQuery(document).find('#page .dark-scheme, .video-block.white, .banner-area.current-white, .split-screen.current-white, .site-footer.light-color').each(function () {
				let start_point = jQuery(this).offset().top,
					end_point = start_point + jQuery(this).outerHeight();

				if (flag) return;

				if (scroll_el_top > start_point && scroll_el_top < end_point) {
					flag = true;
				}
			});

			if (flag) {
				jQuery(this).addClass('white');
			} else {
				jQuery(this).removeClass('white');
			}
		});

		if (scroll_top > window_height*0.8) {
			jQuery('.social-links-on-side').addClass('show');
		} else {
			jQuery('.social-links-on-side').removeClass('show');
		}
	});

	function num_scr() {
		jQuery('.num-box-item .number').each(function () {
			var top = jQuery(document).scrollTop() + jQuery(window).height();
			var pos_top = jQuery(this).offset().top;
			if (top > pos_top) {
				var number = parseInt(jQuery(this).html());
				if (!jQuery(this).hasClass('animated')) {
					jQuery(this).addClass('animated').prop('Counter', 0).animate({
						Counter: number
					}, {
						duration: 3000,
						easing: 'swing',
						step: function (now) {
							jQuery(this).html(function (i, txt) {
								return txt.replace(/\d+/, Math.ceil(now));
							});
						}
					});
				}
			}
		});
	}

	jQuery('.portfolio-type-slider .filter-buttons, .appartments-carousel .filter-buttons').on('click', '.button', function () {
		let $block = jQuery(this).parents('.portfolio-type-slider, .appartments-carousel'),
			filter_val = jQuery(this).attr('data-filter'),
			$swiper_container = $block.find('.swiper-container'),
			swiper = $swiper_container.get(0).swiper;

		jQuery(this).addClass('current').siblings().removeClass('current');

		if (filter_val != '*') {
			$swiper_container.addClass('loading').delay(300).queue(function (next) {
				jQuery(this).find('.swiper-slide').not(filter_val).each(function () {
					jQuery(this).addClass('non-swiper-slide').removeClass('swiper-slide').hide();
				});

				next();
			});
			$swiper_container.find(filter_val).delay(300).queue(function (next) {
				jQuery(this).each(function () {
					jQuery(this).removeClass('non-swiper-slide').addClass('swiper-slide').attr('style', null).show();
				});

				next();
			});
		} else {
			$swiper_container.find('.non-swiper-slide').delay(300).queue(function (next) {
				jQuery(this).each(function () {
					jQuery(this).removeClass('non-swiper-slide').addClass('swiper-slide').attr('style', null).show();
				});

				next();
			});
		}

		setTimeout(function () {
			swiper.update();
			swiper.slideTo(0, 0);
			jQuery(window).trigger('resize');

			$swiper_container.removeClass('loading');
		}, 300)

	});

	var $portfolio_cascade = jQuery('.portfolio-type-cascade');

	var $portfolio_cascade_swiper = new Swiper($portfolio_cascade.find('.swiper-container'), {
		loop: true,
		navigation: {
			nextEl: $portfolio_cascade.find('.next'),
			prevEl: $portfolio_cascade.find('.prev'),
		},
		watchSlidesVisibility: true,
		breakpointsInverse: true,
		spaceBetween: '-20%',
		breakpoints: {
			0: {
				slidesPerView: 1
			},
			576: {
				slidesPerView: 2
			},
			768: {
				slidesPerView: 3
			},
		},
		on: {
			setTranslate: function(e) {
				let $wrapperEl = this.$wrapperEl,
				translate = this.translate,
				realIndex = this.realIndex,
				width = this.width,
				slidesGrid = this.slidesGrid,
				slidesSizesGrid = this.slidesSizesGrid,
				length = this.loopedSlides,
				margin = width*.1,
				transition = jQuery($wrapperEl).css('transition-duration'),
				longSwipesMs = this.params.longSwipesMs;
				
				jQuery($wrapperEl).find('.swiper-slide-visible:eq('+length+')').nextAll().addClass('slide-next');
				jQuery($wrapperEl).find('.swiper-slide-visible:eq('+length+')').removeClass('slide-next').prevAll().removeClass('slide-next')

				this.slides.each(function(index, elem) {
					let coef = slidesSizesGrid[index]*.15,
					margin = (translate+slidesGrid[index])*.15;

					if(jQuery('html').attr('dir') === 'rtl') {
						coef = slidesSizesGrid[index]*.15;
						margin = (translate+slidesGrid[index])*.15;
					}

					if(margin < 0) {
						margin = 0;
					} 
					if(jQuery(elem).hasClass('slide-next')) {
						margin = jQuery(elem).prev().css('margin-top');

						if(jQuery('html').attr('dir') === 'rtl') {
							margin = jQuery(elem).next().css('margin-top');
						}
					}

					jQuery(elem).css({
						'margin-top': margin,
						'transition-duration': transition
					});
				});
			}
		}
	});

	jQuery(document).on('change', '.mphb_sc_checkout-form input', function() {
		if(jQuery(this).is(':checked')) {
			jQuery(this).parent().addClass('checked')
		} else {
			jQuery(this).parent().removeClass('checked')
		}
	});

	jQuery(document).on('click', '.video-controls .pause, .play-video:not([data-type])', function () {
		var $this = jQuery(this),
			$video_block = $this.parents('.bg-overlay').find('.video');
		if ($video_block.attr('data-type') == 'youtube') {
			let event = 'pause';
			if ($this.hasClass('active')) {
				event = 'play';
			}
			$this.toggleClass('active');

			$video_block.addClass('show');

			control_video($video_block, event);
		} else {
			var mediaVideo = $this.parents('.bg-overlay').find('video').get(0);

			if ($this.hasClass('play-video')) {
				var strings = $this.attr('data-strings').split('||');
				$video_block.addClass('show');
				$this.toggleAttr('data-magic-cursor-text', strings[0], strings[1]);
				$this.parents('.bg-overlay').find('.video-controls').removeClass('hide');
			}

			if (mediaVideo.paused) {
				mediaVideo.play();
				$this.removeClass('active');
				$video_block.addClass('is-playing');
			} else {
				mediaVideo.pause();
				$this.addClass('active');
				$video_block.removeClass('is-playing');
			}
		}
	}).on('click', '.video-controls .mute', function () {
		var $this = jQuery(this),
			$video_block = $this.parents('.bg-overlay').find('.video');
		if ($video_block.attr('data-type') == 'youtube') {
			let event = 'mute';
			$this.toggleClass('active');
			if ($this.hasClass('active')) {
				event = 'unmute';
			}

			control_video($video_block, event);
		} else {
			var mediaVideo = $this.parents('.bg-overlay').find('video').get(0);

			if (mediaVideo.muted) {
				mediaVideo.muted = false;
				$this.addClass('active');
			} else {
				mediaVideo.muted = true;
				$this.removeClass('active');
			}
		}
	});

	jQuery('.heading-block .words').each(function () {
		var typed2 = new Typed(this, {
			strings: jQuery(this).attr('data-array').split(','),
			typeSpeed: 100,
			backSpeed: 0,
			fadeOut: true,
			loop: true
		});
	});

	jQuery('.number-input .minus').on("click", function () {
		var $block = jQuery(this).parents('.number-input'),
			val = +$block.find('input').val(),
			min = +$block.find('input').attr('min');

		if (val > 0 && val > min) {
			val = parseInt(val) - 1;
			$block.find('input[type="number"]').val(val);
		}
		return false;
	});

	jQuery('.number-input .plus').on("click", function () {
		var $block = jQuery(this).parents('.number-input'),
			val = +$block.find('input').val(),
			max = +$block.find('input').attr('max');

		if(max == '') return false;

		if (val < max) {
			val = parseInt(val) + 1;
			$block.find('input[type="number"]').val(val);
		}
		return false;
	});

	jQuery(document).on('click', '.price-list-item2 .option-button', function () {
		jQuery(this).toggleClass('active').parents('.price-list-item2').toggleClass('opened');
	});

	jQuery('.filter-block, .product-block').YPRMLoadMore();

	jQuery('.tabs-block').each(function () {
		let $block = jQuery(this),
			$nav = $block.find('.tab-nav > .swiper-container'),
			$nav_prev = $block.find('.tab-nav > .prev'),
			$nav_next = $block.find('.tab-nav > .next'),
			$tabs = $block.find('.tab-content'),
			$tabs_images = $block.find('.tab-images');

		var $nav_swiper = new Swiper($nav, {
			spaceBetween: 8,
			watchOverflow: true,
			freeMode: true,
			navigation: {
				nextEl: $nav_next,
				prevEl: $nav_prev,
			},
			slidesPerView: 'auto'
		});

		var $tabs_swiper = new Swiper($tabs, {
			slidesPerView: 1,
			spaceBetween: 45,
			autoHeight: true,
			thumbs: {
				swiper: $nav_swiper,
				multipleActiveThumbs: false
			}
		});

		if ($tabs_images.length > 0) {
			var $tabs_images_swiper = new Swiper($tabs_images, {
				slidesPerView: 1,
				direction: 'vertical'
			});

			$tabs_images_swiper.controller.control = $tabs_swiper;
			$tabs_swiper.controller.control = $tabs_images_swiper;

			if ($block.hasClass('image-stick-on')) {
				jQuery(window).on('resize', function () {
					let offset_left = $tabs_images.parent().offset().left,
						width = $tabs_images.parent().width();

					if(dir == 'rtl') {
						if ($block.hasClass('image-align-left')) {
							$tabs_images.css('right', (offset_left + width) - jQuery(window).width())
						}
						if ($block.hasClass('image-align-right')) {
							$tabs_images.css('left', -offset_left)
						}
					} else {
						if ($block.hasClass('image-align-left')) {
							$tabs_images.css('left', -offset_left)
						}
						if ($block.hasClass('image-align-right')) {
							$tabs_images.css('right', (offset_left + width) - jQuery(window).width())
						}
					}
				});
			}
		}
	});

	jQuery('.events-block').each(function () {
		let $block = jQuery(this),
			$nav = $block.find('.event-nav > .swiper-container'),
			$nav_prev = $block.find('.event-nav > .prev'),
			$nav_next = $block.find('.event-nav > .next'),
			$events = $block.find('.event-content');

		var $nav_swiper = new Swiper($nav, {
			spaceBetween: 45,
			watchOverflow: true,
			freeMode: true,
			navigation: {
				nextEl: $nav_next,
				prevEl: $nav_prev,
			},
			slidesPerView: 'auto'
		});

		var $events_swiper = new Swiper($events, {
			slidesPerView: 1,
			spaceBetween: 45,
			thumbs: {
				swiper: $nav_swiper,
				multipleActiveThumbs: false
			}
		});
	});

	jQuery('.handle-loadmore-block .button').on('click', function () {
		let $container = jQuery(this).parent().parent(),
			$pages = $container.find('.page');

		if ($pages.length == 0) return;
		if ($pages.length == 1) $container.find('.handle-loadmore-block').slideUp();

		$container.find('.handle-loadmore-block').before($pages.eq(0).find('.event-item'));
		$pages.eq(0).remove();
	});

	jQuery('.header-booking-form > .button').on('click', function(e) {
		e.stopPropagation();
		jQuery(this).parent().toggleClass('opened');
	});

	jQuery('.rooms-gallery-block').each(function() {
		let $area = jQuery(this),
		$slider = $area.find('.slider'),
		$thumbs = $area.find('.thumbs');

		var $thumbs_swiper = new Swiper($thumbs.find('.swiper-container'), {
			spaceBetween: 30,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			breakpointsInverse: true,
			breakpoints: {
				0: {
					slidesPerView: 2
				},
				450: {
					slidesPerView: 2,
				},
				530: {
					slidesPerView: 3,
					spaceBetween: 15,
				},
				978: {
					slidesPerView: 4
				},
			}
		});

		var $slider_swiper = new Swiper($slider, {
			loop: true,
			slidesPerView: 1,
			spaceBetween: 30,
			thumbs: {
				swiper: $thumbs_swiper
			},
			navigation: {
				nextEl: $area.find('.next'),
				prevEl: $area.find('.prev'),
			},
		});
	});

	jQuery('.rooms-horizontal-gallery').each(function() {
		var $slider = jQuery(this);
		new Swiper($slider.find('.swiper-container'), {
			loop: true,
			navigation: {
				nextEl: $slider.find('.next'),
				prevEl: $slider.find('.prev'),
			},
			breakpoints: {
				0: {
					slidesPerView: 1
				},
				576: {
					slidesPerView: 2
				},
			}
		});
	});
	

	jQuery(document).on('click', '.popup-gallery .popup-item a, .single-popup-item', function (event) {
		if (jQuery(document).find('.pswp').length == 0) {
			jQuery(document).find('#page').append('<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true"> <div class="pswp__bg"></div><div class="pswp__scroll-wrap"> <div class="pswp__container"> <div class="pswp__item"></div><div class="pswp__item"></div><div class="pswp__item"></div></div><div class="pswp__ui pswp__ui--hidden"> <div class="pswp__top-bar"> <div class="pswp__counter"></div><button class="pswp__button pswp__button--close" data-magic-cursor="link-small" title="Close (Esc)"></button> <button class="pswp__button pswp__button--share" data-magic-cursor="link-small" title="Share"></button> <button class="pswp__button pswp__button--fs" data-magic-cursor="link-small" title="Toggle fullscreen"></button> <button class="pswp__button pswp__button--zoom" data-magic-cursor="link-small" title="Zoom in/out"></button> <div class="pswp__preloader"> <div class="pswp__preloader__icn"> <div class="pswp__preloader__cut"> <div class="pswp__preloader__donut"></div></div></div></div></div><div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"> <div class="pswp__share-tooltip"></div></div><button class="pswp__button pswp__button--arrow--left" data-magic-cursor="link-small" title="Previous (arrow left)"> </button> <button class="pswp__button pswp__button--arrow--right" data-magic-cursor="link-small" title="Next (arrow right)"> </button> <div class="pswp__caption"> <div class="pswp__caption__center"></div></div></div></div></div>');
		}

		var $pswp = jQuery(document).find('.pswp')[0];
		var image = [];

		if (!jQuery(this).hasClass('permalink')) {

			event.preventDefault();

			var image = [];
			if (jQuery(this).hasClass('single-popup-item')) {
				var $pic = jQuery(this);
			} else {
				var $pic = jQuery(this).parents('.popup-gallery');
			}

			var getItems = function () {
				var items = [],
					$el = '';
				if ($pic.hasClass('owl-carousel')) {
					$el = $pic.find('.owl-item:not(.cloned) .popup-item');
				} else if ($pic.find('.swiper-container').length > 0) {
					$el = $pic.find('.popup-item:not(.swiper-slide-duplicate)');
				} else if ($pic.hasClass('single-popup-item')) {
					$el = $pic;
				} else {
					$el = $pic.find('.popup-item');
				}

				$el.each(function () {
					var $el = jQuery(this).find('a:not(.permalink)');
					if (jQuery(this).hasClass('single-popup-item')) {
						$el = jQuery(this);
					}
					var $href = $el.attr('href'),
						$size = $el.attr('data-size').split('x'),
						$width = $size[0],
						$height = $size[1];

					if ($el.attr('data-type') == 'video') {
						var item = {
							html: $el.attr('data-video')
						};
					} else {
						var item = {
							src: $href,
							w: $width,
							h: $height
						}
					}

					items.push(item);
				});
				return items;
			}

			var items = getItems();

			jQuery.each(items, function (index, value) {
				image[index] = new Image();
				if (value['src']) {
					image[index].src = value['src'];
				}
			});

			var $index = jQuery(this).parents('.popup-item').index();

			if (jQuery(this).hasClass('single-popup-item')) {
				$index = 1;
			}
			if (jQuery(this).parent().hasClass('thumbnails')) {
				$index++;
			}
			if (jQuery(this).parents('.popup-gallery').find('.grid-sizer').length > 0) {
				$index = $index - 1;
				if (jQuery(this).parents('.popup-gallery').find('.grid-sizer + .hidden').length > 0) {
					$index = $index - 1;
				}
			}
			if ($pic.hasClass('owl-carousel') || $pic.hasClass('.portfolio-items') || jQuery(this).data('id')) {
				$index = jQuery(this).data('id') - 1;
			}

			var options = {
				index: $index,
				bgOpacity: 0.7,
				showHideOpacity: true
			}

			var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
			lightBox.init();

			lightBox.listen('beforeChange', function () {
				var currItem = jQuery(lightBox.currItem.container);
				jQuery('.pswp__item .pswp__video').removeClass('active');
				var currItemIframe = currItem.find('.pswp__video').addClass('active');
				jQuery('.pswp__item .pswp__video').each(function () {
					if (!jQuery(this).hasClass('active')) {
						jQuery(this).attr('src', jQuery(this).attr('src'));
					}
				});
			});

			lightBox.listen('close', function () {
				jQuery('.pswp__item .pswp__zoom-wrap').remove();
			});
		}
	});
});

(function (jQuery) {
	"use strict";
	jQuery.fn.YPRMLoadMore = function (options) {

		function rebuild_array(src, filt) {
			var result = [];

			for (let index = 0; index < src.length; index++) {
				let id = src[index].id || src[index].uniqid,
					flag = false;
				for (let index2 = 0; index2 < filt.length; index2++) {
					let id2 = filt[index2].id || filt[index2].uniqid;
					if (id == id2) {
						flag = true;
						break;
					}
				}
				if (!flag) {
					result.push(src[index]);
				}
			}

			return JSON.stringify(result);
		}

		function getFromCategory(array, slug, count, return_type) {
			var result = [],
				i = 0;

			for (let index = 0; index < array.length; index++) {
				let flag = false;

				if (typeof array[index].cat === undefined || typeof array[index].cat === 'undefined') continue;

				for (let index2 = 0; index2 < array[index].cat.length; index2++) {

					if (array[index].cat[index2] == slug) {
						flag = true;
						break;
					}
				}
				if (flag) {
					i++;
					result.push(array[index]);
				}

				if (i == count && !return_type) {
					break;
				}
			}

			if (result == []) {
				return false;
			}

			return result;
		}

		return this.each(function () {
			var $this = jQuery(this),
				$button = $this.find('.loadmore-button'),
				$filter = $this.find('[class^="filter-butt"]'),
				$items = $this.find('.load-wrap'),
				type = $button.attr('data-type'),
				action = 'loadmore_' + $button.attr('data-action'),
				count = $button.attr('data-count'),
				re = '.istp-item',
				prefix = '.category-',
				style = $button.attr('data-style');

			if ($this.hasClass('product-block')) {
				re = 'li';
				prefix = '.product_cat-';
			}

			$this.append('<div class="load-items-area"></div>');

			$items.css('min-height', $items.find('.item').height());

			$button.on('click', function (event, loading) {
				if (jQuery(this).hasClass('loading')) return false;

				if (typeof loading === 'undefined' || loading === undefined) {
					loading = true;
				}

				var array = JSON.parse($button.attr('data-array')),
					atts = JSON.parse($button.attr('data-atts')),
					load_items = array.slice(0, count),
					filter_value = '*';

				if ($filter.length > 0) {
					var filter_value = $filter.find('.current').attr('data-filter'),
						slug = filter_value.replace(prefix, ''),
						current_count = $items.find(filter_value).length;

					if (filter_value != '*') {
						var cat_full_length = getFromCategory(array, slug, count, true).length,
							cat_length = getFromCategory(array, slug, count, false).length;

						if (current_count < count && cat_full_length != 0) {
							load_items = getFromCategory(array, slug, count - current_count, false);
							loading = true;
						} else if (loading) {
							load_items = getFromCategory(array, slug, count, false);
						}

						if ((loading && cat_full_length - load_items.length <= 0) || (!loading && cat_full_length == 0)) {
							$button.fadeOut();
						} else {
							$button.fadeIn();
						}
					} else {
						$button.fadeIn();
					}

					$items.isotope({
						filter: filter_value
					});
				}

				if (!loading) {
					return false;
				}

				$button.addClass('loading');

				jQuery.ajax({
					url: yprm_ajax.url,
					type: "POST",
					data: {
						action: action,
						array: load_items,
						atts: atts,
						type: type,
						style: style,
						start_index: $this.find(re).length
					},
					success: function (data) {
						var temp_block = $this.find('.load-items-area').append(data);
						array = rebuild_array(array, load_items);

						temp_block.imagesLoaded(function () {

							var items = temp_block.find(re);

							if ($items.hasClass('isotope')) {
								$items.append(items).isotope('appended', items).isotope({
									filter: filter_value
								}).queue(function (next) {
									$button.attr('data-array', array).removeClass('loading');

									jQuery(this).find('.wpb_animate_when_almost_visible:not(.wpb_start_animation)').each(function () {
										var $el = jQuery(this);

										$el.vcwaypoint(function () {
											$el.addClass("wpb_start_animation animated")
										}, {
											offset: "85%"
										});
									});
									jQuery(window).trigger('resize').trigger('scroll');
									next();
								});
							} else {
								$items.append(items).queue(function (next) {
									$button.attr('data-array', array).removeClass('loading');

									jQuery(this).find('.wpb_animate_when_almost_visible:not(.wpb_start_animation)').each(function () {
										var $el = jQuery(this);

										$el.vcwaypoint(function () {
											$el.addClass("wpb_start_animation animated")
										}, {
											offset: "85%"
										});
									});
									jQuery(window).trigger('resize').trigger('scroll');
									next();
								});
							}

						});

						if (array == '[]') {
							$button.parent().slideUp();
						}
					},
					error: function (errorThrown) {
						console.log(errorThrown);
					}
				});
			});
		});
	};

})(jQuery);