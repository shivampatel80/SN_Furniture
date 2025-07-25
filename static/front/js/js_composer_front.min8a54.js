if (jQuery('html').attr('dir') == 'rtl') {
  var $rtl = true;
} else {
  var $rtl = false;
}

function vc_js() {
  vc_toggleBehaviour(), vc_tabsBehaviour(), vc_accordionBehaviour(), vc_teaserGrid(), vc_carouselBehaviour(), vc_slidersBehaviour(), vc_prettyPhoto(), vc_googleplus(), vc_pinterest(), vc_prokerio_bar(), vc_plugin_flexslider(), vc_google_fonts(), vc_gridBehaviour(), vc_rowBehaviour(), vc_prepareHoverBox(), vc_googleMapsPointer(), vc_ttaActivation(), jQuery(document).trigger("vc_js"), window.setTimeout(vc_waypoints, 500)
}

function getSizeName() {
  var screen_w = jQuery(window).width();
  return 1170 < screen_w ? "desktop_wide" : 960 < screen_w && 1169 > screen_w ? "desktop" : 768 < screen_w && 959 > screen_w ? "tablet" : 300 < screen_w && 767 > screen_w ? "mobile" : 300 > screen_w ? "mobile_portrait" : ""
}

function loadScript(url, $obj, callback) {
  var script = document.createElement("script");
  script.type = "text/javascript", script.readyState && (script.onreadystatechange = function () {
    "loaded" !== script.readyState && "complete" !== script.readyState || (script.onreadystatechange = null, callback())
  }), script.src = url, $obj.get(0).appendChild(script)
}

function vc_ttaActivation() {
  jQuery("[data-vc-accordion]").on("show.vc.accordion", function (e) {
    var $ = window.jQuery,
      ui = {};
    ui.newPanel = $(this).data("vc.accordion").getTarget(), window.wpb_prepare_tab_content(e, ui)
  })
}

function vc_accordionActivate(event, ui) {
  if (ui.newPanel.length && ui.newHeader.length) {
    var $pie_charts = ui.newPanel.find(".vc_pie_chart:not(.vc_ready)"),
      $round_charts = ui.newPanel.find(".vc_round-chart"),
      $line_charts = ui.newPanel.find(".vc_line-chart"),
      $carousel = ui.newPanel.find('[data-ride="vc_carousel"]');
    void 0 !== jQuery.fn.isotope && ui.newPanel.find(".isotope, .wpb_image_grid_ul").isotope("layout"), ui.newPanel.find(".vc_masonry_media_grid, .vc_masonry_grid").length && ui.newPanel.find(".vc_masonry_media_grid, .vc_masonry_grid").each(function () {
      var grid = jQuery(this).data("vcGrid");
      grid && grid.gridBuilder && grid.gridBuilder.setMasonry && grid.gridBuilder.setMasonry()
    }), vc_carouselBehaviour(ui.newPanel), vc_plugin_flexslider(ui.newPanel), $pie_charts.length && jQuery.fn.vcChat && $pie_charts.vcChat(), $round_charts.length && jQuery.fn.vcRoundChart && $round_charts.vcRoundChart({
      reload: !1
    }), $line_charts.length && jQuery.fn.vcLineChart && $line_charts.vcLineChart({
      reload: !1
    }), $carousel.length && jQuery.fn.carousel && $carousel.carousel("resizeAction"), ui.newPanel.parents(".isotope").length && ui.newPanel.parents(".isotope").each(function () {
      jQuery(this).isotope("layout")
    })
  }
}

function initVideoBackgrounds() {
  return window.console && window.console.warn && window.console.warn("this function is deprecated use vc_initVideoBackgrounds"), vc_initVideoBackgrounds()
}

function vc_initVideoBackgrounds() {
  jQuery("[data-vc-video-bg]").each(function () {
    var youtubeUrl, youtubeId, $element = jQuery(this);
    $element.data("vcVideoBg") ? (youtubeUrl = $element.data("vcVideoBg"), youtubeId = vcExtractYoutubeId(youtubeUrl), youtubeId && ($element.find(".vc_video-bg").remove(), insertYoutubeVideoAsBackground($element, youtubeId)), jQuery(window).on("grid:items:added", function (event, $grid) {
      $element.has($grid).length && vcResizeVideoBackground($element)
    })) : $element.find(".vc_video-bg").remove()
  })
}

function insertYoutubeVideoAsBackground($element, youtubeId, counter) {
  if ("undefined" == typeof YT || void 0 === YT.Player) return 100 < (counter = void 0 === counter ? 0 : counter) ? void console.warn("Too many attempts to load YouTube api") : void setTimeout(function () {
    insertYoutubeVideoAsBackground($element, youtubeId, counter++)
  }, 100);
  var $container = $element.prepend('<div class="vc_video-bg vc_hidden-xs"><div class="inner"></div></div>').find(".inner");
  new YT.Player($container[0], {
    width: "100%",
    height: "100%",
    videoId: youtubeId,
    playerVars: {
      playlist: youtubeId,
      iv_load_policy: 3,
      enablejsapi: 1,
      disablekb: 1,
      autoplay: 1,
      controls: 0,
      showinfo: 0,
      rel: 0,
      loop: 1,
      wmode: "transparent"
    },
    events: {
      onReady: function (event) {
        event.target.mute().setLoop(!0)
      }
    }
  }), vcResizeVideoBackground($element), jQuery(window).on("resize", function () {
    vcResizeVideoBackground($element)
  })
}

function vcResizeVideoBackground($element) {
  var iframeW, iframeH, marginLeft, marginTop, containerW = $element.innerWidth(),
    containerH = $element.innerHeight();
  containerW / containerH < 16 / 9 ? (iframeW = containerH * (16 / 9), iframeH = containerH, marginLeft = -Math.round((iframeW - containerW) / 2) + "px", marginTop = -Math.round((iframeH - containerH) / 2) + "px", iframeW += "px", iframeH += "px") : (iframeW = containerW, iframeH = containerW * (9 / 16), marginTop = -Math.round((iframeH - containerH) / 2) + "px", marginLeft = -Math.round((iframeW - containerW) / 2) + "px", iframeW += "px", iframeH += "px"), $element.find(".vc_video-bg iframe").css({
    maxWidth: "1000%",
    marginLeft: marginLeft,
    marginTop: marginTop,
    width: iframeW,
    height: iframeH
  })
}

function vcExtractYoutubeId(url) {
  if (void 0 === url) return !1;
  var id = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
  return null !== id && id[1]
}

function vc_googleMapsPointer() {
  var $ = window.jQuery,
    $wpbGmapsWidget = $(".wpb_gmaps_widget");
  $wpbGmapsWidget.on("click", function () {
    $("iframe", this).css("pointer-events", "auto")
  }), $wpbGmapsWidget.mouseleave(function () {
    $("iframe", this).css("pointer-events", "none")
  }), $(".wpb_gmaps_widget iframe").css("pointer-events", "none")
}

function vc_setHoverBoxPerspective(hoverBox) {
  hoverBox.each(function () {
    var $this = jQuery(this),
      width = $this.width(),
      perspective = 4 * width + "px";
    $this.css("perspective", perspective)
  })
}

function vc_setHoverBoxHeight(hoverBox) {
  hoverBox.each(function () {
    var $this = jQuery(this),
      hoverBoxInner = $this.find(".vc-hoverbox-inner");
    hoverBoxInner.css("min-height", 0);
    var frontHeight = $this.find(".vc-hoverbox-front-inner").outerHeight(),
      backHeight = $this.find(".vc-hoverbox-back-inner").outerHeight(),
      hoverBoxHeight = frontHeight > backHeight ? frontHeight : backHeight;
    hoverBoxHeight < 250 && (hoverBoxHeight = 250), hoverBoxInner.css("min-height", hoverBoxHeight + "px")
  })
}

function vc_prepareHoverBox() {
  var hoverBox = jQuery(".vc-hoverbox");
  vc_setHoverBoxHeight(hoverBox), vc_setHoverBoxPerspective(hoverBox)
}
document.documentElement.className += " js_active ", document.documentElement.className += "ontouchstart" in document.documentElement ? " vc_mobile " : " vc_desktop ",
  function () {
    for (var prefix = ["-webkit-", "-moz-", "-ms-", "-o-", ""], i = 0; i < prefix.length; i++) prefix[i] + "transform" in document.documentElement.style && (document.documentElement.className += " vc_transform ")
  }(), "function" != typeof window.vc_plugin_flexslider && (window.vc_plugin_flexslider = function ($parent) {
    ($parent ? $parent.find(".wpb_flexslider") : jQuery(".wpb_flexslider")).each(function () {
      var this_element = jQuery(this),
        sliderTimeout = 1e3 * parseInt(this_element.attr("data-interval")),
        sliderFx = this_element.attr("data-flex_fx"),
        slideshow = !0;
      0 === sliderTimeout && (slideshow = !1), this_element.is(":visible") && this_element.flexslider({
        animation: sliderFx,
        slideshow: slideshow,
        slideshowSpeed: sliderTimeout,
        sliderSpeed: 800,
        smoothHeight: !0
      })
    })
  }), "function" != typeof window.vc_googleplus && (window.vc_googleplus = function () {
    0 < jQuery(".wpb_googleplus").length && function () {
      var po = document.createElement("script");
      po.type = "text/javascript", po.async = !0, po.src = "//apis.google.com/js/plusone.js";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(po, s)
    }()
  }), "function" != typeof window.vc_pinterest && (window.vc_pinterest = function () {
    0 < jQuery(".wpb_pinterest").length && function () {
      var po = document.createElement("script");
      po.type = "text/javascript", po.async = !0, po.src = "//assets.pinterest.com/js/pinit.js";
      var s = document.getElementsByTagName("script")[0];
      s.parentNode.insertBefore(po, s)
    }()
  }), "function" != typeof window.vc_prokerio_bar && (window.vc_prokerio_bar = function () {
    void 0 !== jQuery.fn.waypoint && jQuery(".vc_prokerio_bar").waypoint(function () {
      jQuery(this).find(".vc_single_bar").each(function (index) {
        var $this = jQuery(this),
          bar = $this.find(".vc_bar"),
          val = bar.data("percentage-value");
        setTimeout(function () {
          bar.css({
            width: val + "%"
          })
        }, 200 * index)
      })
    }, {
      offset: "85%"
    })
  }), "function" != typeof window.vc_waypoints && (window.vc_waypoints = function () {
    void 0 !== jQuery.fn.vcwaypoint && jQuery(".wpb_animate_when_almost_visible:not(.wpb_start_animation)").each(function () {
      var $el = jQuery(this);
      $el.vcwaypoint(function () {
        $el.addClass("wpb_start_animation animated")
      }, {
        offset: "85%"
      })
    })
  }), "function" != typeof window.vc_toggleBehaviour && (window.vc_toggleBehaviour = function ($el) {
    function event(e) {
      e && e.preventDefault && e.preventDefault();
      var title = jQuery(this),
        element = title.closest(".vc_toggle"),
        content = element.find(".vc_toggle_content");
      element.hasClass("vc_toggle_active") ? content.slideUp({
        duration: 300,
        complete: function () {
          element.removeClass("vc_toggle_active")
        }
      }) : content.slideDown({
        duration: 300,
        complete: function () {
          element.addClass("vc_toggle_active")
        }
      })
    }
    $el ? $el.hasClass("vc_toggle_title") ? $el.unbind("click").on("click", event) : $el.find(".vc_toggle_title").unbind("click").on("click", event) : jQuery(".vc_toggle_title").unbind("click").on("click", event)
  }), "function" != typeof window.vc_tabsBehaviour && (window.vc_tabsBehaviour = function ($tab) {
    if (jQuery.ui) {
      var $call = $tab || jQuery(".wpb_tabs, .wpb_tour"),
        ver = jQuery.ui && jQuery.ui.version ? jQuery.ui.version.split(".") : "1.10",
        old_version = 1 === parseInt(ver[0]) && 9 > parseInt(ver[1]);
      $call.each(function (index) {
        var $tabs, interval = jQuery(this).attr("data-interval"),
          tabs_array = [];
        if ($tabs = jQuery(this).find(".wpb_tour_tabs_wrapper").tabs({
            show: function (event, ui) {
              wpb_prepare_tab_content(event, ui)
            },
            beforeActivate: function (event, ui) {
              1 !== ui.newPanel.index() && ui.newPanel.find(".vc_pie_chart:not(.vc_ready)")
            },
            activate: function (event, ui) {
              wpb_prepare_tab_content(event, ui)
            }
          }), interval && 0 < interval) try {
          $tabs.tabs("rotate", 1e3 * interval)
        } catch (e) {
          window.console && window.console.log && console.log(e)
        }
        jQuery(this).find(".wpb_tab").each(function () {
          tabs_array.push(this.id)
        }), jQuery(this).find(".wpb_tabs_nav li").on("click", function (e) {
          return e.preventDefault(), old_version ? $tabs.tabs("select", jQuery("a", this).attr("href")) : $tabs.tabs("option", "active", jQuery(this).index()), !1
        }), jQuery(this).find(".wpb_prev_slide a, .wpb_next_slide a").on("click", function (e) {
          if (e.preventDefault(), old_version) {
            var index = $tabs.tabs("option", "selected");
            jQuery(this).parent().hasClass("wpb_next_slide") ? index++ : index--, 0 > index ? index = $tabs.tabs("length") - 1 : index >= $tabs.tabs("length") && (index = 0), $tabs.tabs("select", index)
          } else {
            var index = $tabs.tabs("option", "active"),
              length = $tabs.find(".wpb_tab").length;
            index = jQuery(this).parent().hasClass("wpb_next_slide") ? index + 1 >= length ? 0 : index + 1 : 0 > index - 1 ? length - 1 : index - 1, $tabs.tabs("option", "active", index)
          }
        })
      })
    }
  }), "function" != typeof window.vc_accordionBehaviour && (window.vc_accordionBehaviour = function () {
    jQuery(".wpb_accordion").each(function (index) {
      var $tabs, $this = jQuery(this),
        active_tab = ($this.attr("data-interval"), !isNaN(jQuery(this).data("active-tab")) && 0 < parseInt($this.data("active-tab")) && parseInt($this.data("active-tab")) - 1),
        collapsible = !1 === active_tab || "yes" === $this.data("collapsible");
      $tabs = $this.find(".wpb_accordion_wrapper").accordion({
        header: "> div > h3",
        autoHeight: !1,
        heightStyle: "content",
        active: active_tab,
        collapsible: collapsible,
        navigation: !0,
        activate: vc_accordionActivate,
        change: function (event, ui) {
          void 0 !== jQuery.fn.isotope && ui.newContent.find(".isotope").isotope("layout"), vc_carouselBehaviour(ui.newPanel)
        }
      }), !0 === $this.data("vcDisableKeydown") && ($tabs.data("uiAccordion")._keydown = function () {})
    })
  }), "function" != typeof window.vc_teaserGrid && (window.vc_teaserGrid = function () {
    var layout_modes = {
      fitrows: "fitRows",
      masonry: "masonry"
    };
    jQuery(".wpb_grid .teaser_grid_container:not(.wpb_carousel), .wpb_filtered_grid .teaser_grid_container:not(.wpb_carousel)").each(function () {
      var $container = jQuery(this),
        $thumbs = $container.find(".wpb_thumbnails"),
        layout_mode = $thumbs.attr("data-layout-mode");
      $thumbs.isotope({
        itemSelector: ".isotope-item",
        layoutMode: void 0 === layout_modes[layout_mode] ? "fitRows" : layout_modes[layout_mode]
      }), $container.find(".categories_filter a").data("isotope", $thumbs).on("click", function (e) {
        e.preventDefault();
        var $thumbs = jQuery(this).data("isotope");
        jQuery(this).parent().parent().find(".active").removeClass("active"), jQuery(this).parent().addClass("active"), $thumbs.isotope({
          filter: jQuery(this).attr("data-filter")
        })
      }), jQuery(window).on("load resize", function () {
        $thumbs.isotope("layout")
      })
    })
  }), "function" != typeof window.vc_carouselBehaviour && (window.vc_carouselBehaviour = function ($parent) {
    ($parent ? $parent.find(".wpb_carousel") : jQuery(".wpb_carousel")).each(function () {
      var $this = jQuery(this);
      if (!0 !== $this.data("carousel_enabled") && $this.is(":visible")) {
        $this.data("carousel_enabled", !0), getColumnsCount(jQuery(this)), jQuery(this).hasClass("columns_count_1");
        var carousele_li = jQuery(this).find(".wpb_thumbnails-fluid li");
        carousele_li.css({
          "margin-right": carousele_li.css("margin-left"),
          "margin-left": 0
        });
        var fluid_ul = jQuery(this).find("ul.wpb_thumbnails-fluid");
        fluid_ul.width(fluid_ul.width() + 300), jQuery(window).resize(function () {
          var before_resize = screen_size;
          screen_size = getSizeName(), before_resize != screen_size && window.setTimeout("location.reload()", 20)
        })
      }
    })
  }), "function" != typeof window.vc_slidersBehaviour && (window.vc_slidersBehaviour = function () {
    jQuery(".wpb_gallery_slides").each(function (index) {
      var $imagesGrid, this_element = jQuery(this);
      if (this_element.hasClass("wpb_slider_nivo")) {
        var sliderTimeout = 1e3 * this_element.attr("data-interval");
        0 === sliderTimeout && (sliderTimeout = 9999999999), this_element.find(".nivoSlider").nivoSlider({
          effect: "boxRainGrow,boxRain,boxRainReverse,boxRainGrowReverse",
          slices: 15,
          boxCols: 8,
          boxRows: 4,
          animSpeed: 800,
          pauseTime: sliderTimeout,
          startSlide: 0,
          directionNav: !0,
          directionNavHide: !0,
          controlNav: !0,
          keyboardNav: !1,
          pauseOnHover: !0,
          manualAdvance: !1,
          prevText: "Prev",
          nextText: "Next"
        })
      } else this_element.hasClass("wpb_image_grid") && (jQuery.fn.imagesLoaded ? $imagesGrid = this_element.find(".wpb_image_grid_ul").imagesLoaded(function () {
        $imagesGrid.isotope({
          itemSelector: ".isotope-item",
          layoutMode: "fitRows"
        })
      }) : this_element.find(".wpb_image_grid_ul").isotope({
        itemSelector: ".isotope-item",
        layoutMode: "fitRows"
      }))
    })
  }), "function" != typeof window.vc_prettyPhoto && (window.vc_prettyPhoto = function () {
    try {
      jQuery && jQuery.fn && jQuery.fn.prettyPhoto && jQuery('a.prettyphoto, .gallery-icon a[href*=".jpg"]').prettyPhoto({
        animationSpeed: "normal",
        hook: "data-rel",
        padding: 15,
        opacity: .7,
        showTitle: !0,
        allowresize: !0,
        counter_separator_label: "/",
        hideflash: !1,
        deeplinking: !1,
        modal: !1,
        callback: function () {
          location.href.indexOf("#!prettyPhoto") > -1 && (location.hash = "")
        },
        social_tools: ""
      })
    } catch (err) {
      window.console && window.console.log && console.log(err)
    }
  }), "function" != typeof window.vc_google_fonts && (window.vc_google_fonts = function () {
    return !1
  }), window.vcParallaxSkroll = !1, "function" != typeof window.vc_rowBehaviour && (window.vc_rowBehaviour = function () {
    function fullWidthRow() {
      var $elements = $('[data-vc-full-width="true"]');
      $.each($elements, function (key, item) {
        var $el = $(this);
        $el.addClass("vc_hidden");
        var $el_full = $el.next(".vc_row-full-width");
        if ($el_full.length || ($el_full = $el.parent().next(".vc_row-full-width")), $el_full.length) {
          var el_margin_left = parseInt($el.css("margin-left"), 10),
            el_margin_right = parseInt($el.css("margin-right"), 10),
            lw = parseInt($('#page').css('padding-left'), 10),
            lw2 = parseInt($('#page main.main-container').css('padding-left'), 10),
            offset = 0 - $el_full.offset().left - el_margin_left + lw + lw2,
            width = $('#page main.main-container').width();
          if ($rtl) {
            if ($el.css({
                position: "relative",
                right: offset,
                "box-sizing": "border-box",
                width: $('#page main.main-container').width()
              }), !$el.data("vcStretchContent")) {
              var padding = -1 * offset;
              0 > padding && (padding = 0);
              var paddingRight = width - padding - $el_full.width() + el_margin_left + el_margin_right;
              0 > paddingRight && (paddingRight = 0), $el.css({
                "padding-left": padding + "px",
                "padding-right": paddingRight + "px"
              })
            }
          } else {
            if ($el.css({
                position: "relative",
                left: offset,
                "box-sizing": "border-box",
                width: $('#page main.main-container').width()
              }), !$el.data("vcStretchContent")) {
              var padding = -1 * offset;
              0 > padding && (padding = 0);
              var paddingRight = width - padding - $el_full.width() + el_margin_left + el_margin_right;
              0 > paddingRight && (paddingRight = 0), $el.css({
                "padding-left": padding + "px",
                "padding-right": paddingRight + "px"
              })
            }
          }

          $el.attr("data-vc-full-width-init", "true"), $el.removeClass("vc_hidden"), $(document).trigger("vc-full-width-row-single", {
            el: $el,
            offset: offset,
            marginLeft: el_margin_left,
            marginRight: el_margin_right,
            elFull: $el_full,
            width: width
          })
        }
      }), $(document).trigger("vc-full-width-row", $elements)
    }

    function fullHeightRow() {
      var $element = $(".vc_row-o-full-height:first");
      if ($element.length) {
        var $window, windowHeight, offsetTop, fullHeight;
        $window = $(window), windowHeight = $window.height(), offsetTop = $element.offset().top, offsetTop < windowHeight && (fullHeight = 100 - offsetTop / (windowHeight / 100), $element.css("min-height", fullHeight + "vh"))
      }
      $(document).trigger("vc-full-height-row", $element)
    }
    var $ = window.jQuery;
    $(window).off("resize.vcRowBehaviour").on("resize.vcRowBehaviour", fullWidthRow).on("resize.vcRowBehaviour", fullHeightRow), fullWidthRow(), fullHeightRow(),
      function () {
        (window.navigator.userAgent.indexOf("MSIE ") > 0 || navigator.userAgent.match(/Trident.*rv\:11\./)) && $(".vc_row-o-full-height").each(function () {
          "flex" === $(this).css("display") && $(this).wrap('<div class="vc_ie-flexbox-fixer"></div>')
        })
      }(), vc_initVideoBackgrounds(),
      function () {
        var vcSkrollrOptions, callSkrollInit = !1;
        window.vcParallaxSkroll && window.vcParallaxSkroll.destroy(), $(".vc_parallax-inner").remove(), $("[data-5p-top-bottom]").removeAttr("data-5p-top-bottom data-30p-top-bottom"), $("[data-vc-parallax]").each(function () {
          var skrollrSpeed, skrollrSize, skrollrStart, skrollrEnd, $parallaxElement, parallaxImage, youtubeId;
          callSkrollInit = !0, "on" === $(this).data("vcParallaxOFade") && $(this).children().attr("data-5p-top-bottom", "opacity:0;").attr("data-30p-top-bottom", "opacity:1;"), skrollrSize = 100 * $(this).data("vcParallax"), $parallaxElement = $("<div />").addClass("vc_parallax-inner").appendTo($(this)), $parallaxElement.height(skrollrSize + "%"), parallaxImage = $(this).data("vcParallaxImage"), youtubeId = vcExtractYoutubeId(parallaxImage), youtubeId ? insertYoutubeVideoAsBackground($parallaxElement, youtubeId) : void 0 !== parallaxImage && $parallaxElement.css("background-image", "url(" + parallaxImage + ")"), skrollrSpeed = skrollrSize - 100, skrollrStart = -skrollrSpeed, skrollrEnd = 0, $parallaxElement.attr("data-bottom-top", "top: " + skrollrStart + "%;").attr("data-top-bottom", "top: " + skrollrEnd + "%;")
        }), !(!callSkrollInit || !window.skrollr) && (vcSkrollrOptions = {
          forceHeight: !1,
          smoothScrolling: !1,
          mobileCheck: function () {
            return !1
          }
        }, window.vcParallaxSkroll = skrollr.init(vcSkrollrOptions), window.vcParallaxSkroll)
      }()
  }), "function" != typeof window.vc_gridBehaviour && (window.vc_gridBehaviour = function () {
    jQuery.fn.vcGrid && jQuery("[data-vc-grid]").vcGrid()
  }), "function" != typeof window.getColumnsCount && (window.getColumnsCount = function (el) {
    for (var find = !1, i = 1; !1 === find;) {
      if (el.hasClass("columns_count_" + i)) return find = !0, i;
      i++
    }
  });
var screen_size = getSizeName();
"function" != typeof window.wpb_prepare_tab_content && (window.wpb_prepare_tab_content = function (event, ui) {
  var $ui_panel, $google_maps, panel = ui.panel || ui.newPanel,
    $pie_charts = panel.find(".vc_pie_chart:not(.vc_ready)"),
    $round_charts = panel.find(".vc_round-chart"),
    $line_charts = panel.find(".vc_line-chart"),
    $carousel = panel.find('[data-ride="vc_carousel"]');
  if (vc_carouselBehaviour(), vc_plugin_flexslider(panel), ui.newPanel.find(".vc_masonry_media_grid, .vc_masonry_grid").length && ui.newPanel.find(".vc_masonry_media_grid, .vc_masonry_grid").each(function () {
      var grid = jQuery(this).data("vcGrid");
      grid && grid.gridBuilder && grid.gridBuilder.setMasonry && grid.gridBuilder.setMasonry()
    }), panel.find(".vc_masonry_media_grid, .vc_masonry_grid").length && panel.find(".vc_masonry_media_grid, .vc_masonry_grid").each(function () {
      var grid = jQuery(this).data("vcGrid");
      grid && grid.gridBuilder && grid.gridBuilder.setMasonry && grid.gridBuilder.setMasonry()
    }), $pie_charts.length && jQuery.fn.vcChat && $pie_charts.vcChat(), $round_charts.length && jQuery.fn.vcRoundChart && $round_charts.vcRoundChart({
      reload: !1
    }), $line_charts.length && jQuery.fn.vcLineChart && $line_charts.vcLineChart({
      reload: !1
    }), $carousel.length && jQuery.fn.carousel && $carousel.carousel("resizeAction"), $ui_panel = panel.find(".isotope, .wpb_image_grid_ul"), $google_maps = panel.find(".wpb_gmaps_widget"), 0 < $ui_panel.length && $ui_panel.isotope("layout"), $google_maps.length && !$google_maps.is(".map_ready")) {
    var $frame = $google_maps.find("iframe");
    $frame.attr("src", $frame.attr("src")), $google_maps.addClass("map_ready")
  }
  panel.parents(".isotope").length && panel.parents(".isotope").each(function () {
    jQuery(this).isotope("layout")
  })
}), window.vc_googleMapsPointer, jQuery(document).ready(vc_prepareHoverBox), jQuery(window).resize(vc_prepareHoverBox), jQuery(document).ready(function ($) {
  window.vc_js()
});