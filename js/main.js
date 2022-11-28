(function($) {
    "use strict";
    var isMobile = {
        Android: function() {
            return navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
        }
    }

    function parallax() {
        $('.bg--parallax').each(function() {
            var el = $(this),
                xpos = "50%",
                windowHeight = $(window).height();
            if (isMobile.any()) {
                $(this).css('background-attachment', 'scroll');
            } else {
                $(window).scroll(function() {
                    var current = $(window).scrollTop(),
                        top = el.offset().top,
                        height = el.outerHeight();
                    if (top + height < current || top > current + windowHeight) {
                        return;
                    }
                    el.css('backgroundPosition', xpos + " " + Math.round((top - current) * 0.2) + "px");
                });
            }
        });
    }

    function backgroundImage() {
        var databackground = $('[data-background]');
        databackground.each(function() {
            if ($(this).attr('data-background')) {
                var image_path = $(this).attr('data-background');
                $(this).css({
                    'background': 'url(' + image_path + ')'
                });
            }
        });
    }

    function menuBtnToggle() {
        var button = $('.menu-toggle');
        var menu = $('.menu');
        button.on('click', function(e) {
            e.preventDefault();
            var self = $(this);
            if (!self.hasClass('active')) {
                self.addClass('active');
                menu.slideDown(350);
            } else {
                self.removeClass('active');
                menu.slideUp(350);
                menu.find('.sub-menu').slideUp(350);
            }
        });
    }

    function subMenuToggle() {
        var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
        if (iOS == false) {
            $('body').on('click', '.menu--mobile .menu-item-has-children > .sub-toggle', function(event) {
                event.preventDefault();
                var current = $(this).parent('.menu-item-has-children')
                current.children('.sub-menu').slideToggle(350);
                current.siblings().find('.sub-menu').slideUp(350);
            });
        }
        else {
            $('body').on('touchstart', '.menu--mobile .menu-item-has-children > .sub-toggle', function(event) {
                event.preventDefault();
                var current = $(this).parent('.menu-item-has-children')
                current.children('.sub-menu').slideToggle(350);
                current.siblings().find('.sub-menu').slideUp(350);
            });
        }
    }

    function resizeHeader() {
        var header = $('.header'),
            header2 = $('.header--2'),
            header3 = $('.header--3'),
            checkPoint = 1200,
            windowWidth = $(window).innerWidth();
        // mobile
        if (checkPoint > windowWidth) {
            $('.menu--mobile').hide();
            $('.menu-toggle').removeClass('active');
            if (header2.length > 0) {
                header2.find('.menu').addClass('menu--mobile');
                header.find('.ps-logo').appendTo(header2.find('.navigation'));
            }
            if (header3.length > 0) {
                header3.find('.menu').addClass('menu--mobile');
            }
        } else {
            $('.menu').show();
            if (header2.length > 0) {
                header2.find('.menu').removeClass('menu--mobile');
                header.find('.ps-logo').appendTo(header2.find('.center'));
            }
            if (header3.length > 0) {
                header3.find('.menu').removeClass('menu--mobile');
            }
        }
    }

    function stickyHeader() {
        var header = $('.header'),
            scrollPosition = 0,
            checkpoint = 300;
        if (header.data('sticky') === true) {
            $(window).scroll(function() {
                var currentPosition = $(this).scrollTop();
                if (currentPosition < scrollPosition) {
                    // On top
                    if (currentPosition === 0) {
                        header.removeClass('navigation--sticky navigation--unpin navigation--pin');
                    }
                    // on scrollUp
                    else if (currentPosition > checkpoint) {
                        header.removeClass('navigation--unpin').addClass('navigation--sticky navigation--pin');
                    }
                }
                // On scollDown
                else {
                    if (currentPosition > checkpoint) {
                        header.addClass('navigation--sticky navigation--unpin').removeClass('navigation--pin');
                    }
                }
                scrollPosition = currentPosition;
            });
        }
        else {
            return false;
        }
    }

    function owlCarousel() {
        var target = $('.owl-slider');
        if (target.length > 0) {
            target.each(function() {
                var el = $(this),
                    dataAuto = el.data('owl-auto'),
                    dataLoop = el.data('owl-loop'),
                    dataSpeed = el.data('owl-speed'),
                    dataGap = el.data('owl-gap'),
                    dataNav = el.data('owl-nav'),
                    dataDots = el.data('owl-dots'),
                    dataAnimateIn = (el.data('owl-animate-in')) ? el.data('owl-animate-in') : '',
                    dataAnimateOut = (el.data('owl-animate-out')) ? el.data('owl-animate-out') : '',
                    dataDefaultItem = el.data('owl-item'),
                    dataItemXS = el.data('owl-item-xs'),
                    dataItemSM = el.data('owl-item-sm'),
                    dataItemMD = el.data('owl-item-md'),
                    dataItemLG = el.data('owl-item-lg'),
                    dataNavLeft = (el.data('owl-nav-left')) ? el.data('owl-nav-left') : "<i class='fa fa-angle-left'></i>",
                    dataNavRight = (el.data('owl-nav-right')) ? el.data('owl-nav-right') : "<i class='fa fa-angle-right'></i>",
                    duration = el.data('owl-duration'),
                    datamouseDrag = (el.data('owl-mousedrag') == 'on') ? true : false;
                el.owlCarousel({
                    animateIn: dataAnimateIn,
                    animateOut: dataAnimateOut,
                    margin: dataGap,
                    autoplay: dataAuto,
                    autoplayTimeout: dataSpeed,
                    autoplayHoverPause: true,
                    loop: dataLoop,
                    nav: dataNav,
                    mouseDrag: datamouseDrag,
                    touchDrag: true,
                    autoplaySpeed: duration,
                    navSpeed: duration,
                    dotsSpeed: duration,
                    dragEndSpeed: duration,
                    navText: [dataNavLeft, dataNavRight],
                    dots: dataDots,
                    items: dataDefaultItem,
                    responsive: {
                        0: {
                            items: dataItemXS
                        },
                        480: {
                            items: dataItemSM
                        },
                        768: {
                            items: dataItemMD
                        },
                        992: {
                            items: dataItemLG
                        },
                        1200: {
                            items: dataDefaultItem
                        }
                    }
                });
            });
        }
    }

    function bootstrapSelect() {
        $('.ps-select').selectpicker();
    }

    function search() {
        var searchOpen = $('.ps-search-btn'),
            searchClose = $('.ps-search__close'),
            searchbox = $('.ps-search');
        searchOpen.on('click', function(e) {
            e.preventDefault();
            searchbox.addClass('open');
        });
        searchClose.on('click', function(e) {
            e.preventDefault();
            searchbox.removeClass('open');
        });
    }

    function rating() {
        $('select.ps-rating').barrating({
            theme: 'fontawesome-stars'
        });
    }

    function countUp() {
        var number = $('.number');

        number.each(function() {
            var el = $(this);
            el.text('0');

            var waypoint = new Waypoint({
                element: el,
                handler: function(direction) {
                    el.countTo({
                        speed: '1500',
                        refreshInterval: 50
                    });
                    this.destroy();
                },
                offset: function() {
                    return Waypoint.viewportHeight() - el.outerHeight() - 100;
                }
            });
        });
    }

    function mapConfig() {
        $.gmap3({
            key: 'AIzaSyDsUcTjt43mTheN9ruCsQVgBE-wgN6_AfY'
        });
        var map = $('#contact-map');
        if (map.length > 0) {
            map.gmap3({
                address: map.data('address'),
                zoom: map.data('zoom'),
                scrollwheel: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                scrollwheel: false,
                styles: [
                    {
                        "featureType": "administrative",
                        "elementType": "all",
                        "stylers": [
                            {
                                "saturation": "-100"
                            }
                        ]
                    },
                    {
                        "featureType": "administrative.province",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "off"
                            }
                        ]
                    },
                    {
                        "featureType": "landscape",
                        "elementType": "all",
                        "stylers": [
                            {
                                "saturation": -100
                            },
                            {
                                "lightness": 65
                            },
                            {
                                "visibility": "on"
                            }
                        ]
                    },
                    {
                        "featureType": "poi",
                        "elementType": "all",
                        "stylers": [
                            {
                                "saturation": -100
                            },
                            {
                                "lightness": "50"
                            },
                            {
                                "visibility": "simplified"
                            }
                        ]
                    },
                    {
                        "featureType": "road",
                        "elementType": "all",
                        "stylers": [
                            {
                                "saturation": "-100"
                            }
                        ]
                    },
                    {
                        "featureType": "road.highway",
                        "elementType": "all",
                        "stylers": [
                            {
                                "visibility": "simplified"
                            }
                        ]
                    },
                    {
                        "featureType": "road.arterial",
                        "elementType": "all",
                        "stylers": [
                            {
                                "lightness": "30"
                            }
                        ]
                    },
                    {
                        "featureType": "road.local",
                        "elementType": "all",
                        "stylers": [
                            {
                                "lightness": "40"
                            }
                        ]
                    },
                    {
                        "featureType": "transit",
                        "elementType": "all",
                        "stylers": [
                            {
                                "saturation": -100
                            },
                            {
                                "visibility": "simplified"
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "geometry",
                        "stylers": [
                            {
                                "hue": "#ffff00"
                            },
                            {
                                "lightness": -25
                            },
                            {
                                "saturation": -97
                            }
                        ]
                    },
                    {
                        "featureType": "water",
                        "elementType": "labels",
                        "stylers": [
                            {
                                "lightness": -25
                            },
                            {
                                "saturation": -100
                            }
                        ]
                    }
                ]
            }).marker(function(map) {
                return {
                    position: map.getCenter(),
                    icon: 'images/marker.png',
                    animation: google.maps.Animation.BOUNCE
                };
            }).infowindow({
                content: map.data('address')
            }).then(function(infowindow) {
                var map = this.get(0);
                var marker = this.get(1);
                marker.addListener('click', function() {
                    infowindow.open(map, marker);
                });
            });
        }
        else {
            console.log("Notice: Don't have map on this page!!!");
        }
    }

    function statusBar() {
        var statusBar = $('.ps-status-bar');
        statusBar.each(function(e) {
            var value = $(this).data('width');
            $(this).children('span').css('width', value + "%");
        })
    }

    function filterSlider() {
        var el = $('.ps-slider');
        var min = el.siblings().find('.ps-slider__min');
        var max = el.siblings().find('.ps-slider__max');
        var defaultMinValue = el.data('default-min');
        var defaultMaxValue = el.data('default-max');
        var maxValue = el.data('max');
        var step = el.data('step');
        if (el.length > 0) {
            el.slider({
                min: 0,
                max: maxValue,
                step: step,
                range: true,
                values: [defaultMinValue, defaultMaxValue],
                slide: function(event, ui) {
                    var values = ui.values;
                    min.text('$' + values[0]);
                    max.text('$' + values[1]);
                }
            });
            var values = el.slider("option", "values");
            console.log(values[1]);
            min.text('$' + values[0]);
            max.text('$' + values[1]);
        }
        else {
            // return false;
        }
    }

    function slickConfig() {
        if ($('.ps-product--detail').length > 0) {
            var primary = $('.ps-product__image'),
                second = $('.ps-product__variants'),
                vertical = false;
            primary.slick({
                slidesToShow: 1,
                slidesToScroll: 1,
                asNavFor: '.ps-product__variants',
                dots: false,
                arrows: false,
            });
            second.slick({
                slidesToShow: 4,
                slidesToScroll: 1,
                arrows: false,
                arrow: false,
                focusOnSelect: true,
                asNavFor: '.ps-product__image',
                vertical: vertical,
                responsive: [
                    {
                        breakpoint: 992,
                        settings: {
                            arrows: false,
                            slidesToShow: 4,
                            vertical: false
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 3,
                            vertical: false
                        }
                    },
                ]
            });
        }
    }

    function productLightbox() {
        $('.ps-product__image').lightGallery({
            selector: '.item a',
            thumbnail: true
        });
        $('.ps-video').lightGallery();
    }

    function inputNumberChange() {
        var number = $('.ps-number');
        number.each(function() {
            var el = $(this),
                numberValue = el.find('input').val();
            el.find('.up').on('click', function(e) {
                e.preventDefault();
                numberValue++;
                el.find('input').val(numberValue);
                el.find('input').attr('value', numberValue);
            });
            el.find('.down').on('click', function(e) {
                e.preventDefault();
                if (numberValue > 1) {
                    numberValue--;
                    el.find('input').val(numberValue);
                    el.find('input').attr('value', numberValue);
                }

            })
        });
        $('.form-group--number').each(function() {
            var el = $(this),
                numberValue = el.find('input').val();
            el.find('.plus').on('click', function(e) {
                e.preventDefault();
                numberValue++;
                el.find('input').val(numberValue);
                el.find('input').attr('value', numberValue);
            });
            el.find('.minus').on('click', function(e) {
                e.preventDefault();
                if (numberValue > 1) {
                    numberValue--;
                    el.find('input').val(numberValue);
                    el.find('input').attr('value', numberValue);
                }

            })
        });
    }

    function mainSlider() {
        var slider2 = $('#slider .ps-carousel--animate');
        slider2.slick({
            autoplay: true,
            speed: 1000,
            lazyLoad: 'progressive',
            arrows: true,
            fade: true,
            prevArrow: "<i class='slider-prev ba-back'></i>",
            nextArrow: "<i class='slider-next ba-next'></i>"
        }).slickAnimation();

    }

    function backToTop() {
        var scrollPos = 0;
        var element = $('#back2top');
        $(window).scroll(function() {
            var scrollCur = $(window).scrollTop();
            if (scrollCur > scrollPos) {
                // scroll down
                if (scrollCur > 500) {
                    element.addClass('active');
                } else {
                    element.removeClass('active');
                }
            } else {
                // scroll up
                element.removeClass('active');
            }

            scrollPos = scrollCur;
        });

        element.on('click', function() {
            $('html, body').animate({
                scrollTop: '0px'
            }, 800);
        });
    }

    function subscribePopup() {
        var subscribe = $('#subscribe'),
            time = subscribe.data('time');
        setTimeout(function() {
            if (subscribe.length > 0) {
                subscribe.addClass('active');
                $('body').css('overflow', 'hidden');
            }
        }, time);
        $('.ps-popup__close').on('click', function(e) {
            e.preventDefault();
            $(this).closest('.ps-popup').removeClass('active');
            $('body').css('overflow', 'auto');
        });
    }

    function overFlowScrollbar() {
        var cart = $('.ps-cart');
        if (cart.length > 0) {
            cart.find('.ps-cart__content').slimScroll({
                color: '#ffcc00',
            });
        }
    }

    $(function() {
        backgroundImage();
        parallax();
        owlCarousel();
        bootstrapSelect();
        menuBtnToggle();
        subMenuToggle();
        search();
        rating();
        countUp();
        mapConfig();
        statusBar();
        filterSlider();
        slickConfig();
        productLightbox();
        inputNumberChange();
        mainSlider();
        backToTop();
        overFlowScrollbar();
    });

    $(window).on('load', function() {
        $('.ps-loading').addClass('loaded');
        subscribePopup();
    });

    $(window).on('load resize', function() {
        resizeHeader();
        stickyHeader();
    });
})(jQuery);

