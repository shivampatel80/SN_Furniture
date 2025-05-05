let banner_area = document.getElementById('banner-area');
new Parallax(banner_area, {
	selector: '.side-image div'
});

jQuery('.icon-box-block').each(function() {
	let $slider = jQuery(this);
	
	let $slider_swiper = new Swiper($slider.find('.swiper-container'), {
		loop: true,
		spaceBetween: 30,
		navigation: {
			nextEl: $slider.find('.next'),
			prevEl: $slider.find('.prev'),
		},
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		watchOverflow: true,
		breakpointsInverse: true,
		breakpoints: {
			0: {
				slidesPerView: 1
			},
			576: {
				slidesPerView: 2
			},
			998: {
				slidesPerView: 3
			},
		}
	});
});

jQuery('.testimonials-slider').each(function() {
	let $slider = jQuery(this);
	
	let $slider_swiper = new Swiper($slider.find('.swiper-container'), {
		loop: true,
		spaceBetween: 30,
		navigation: {
			nextEl: $slider.find('.next'),
			prevEl: $slider.find('.prev'),
		},
		pagination: {
			el: $slider.find('.swiper-dots'),
			clickable: true
		},
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		watchOverflow: true,
		breakpointsInverse: true,
		breakpoints: {
			0: {
				slidesPerView: 1
			},
			998: {
				slidesPerView: 2
			},
		}
	});
});


jQuery(document).on('ready', function() {
	
});