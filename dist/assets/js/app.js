$(document).ready(function(){
    document.addEventListener("touchstart", function(){}, true);

    $.material.init();

    var scroll = new SmoothScroll('[data-scroll]');

    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

    $('#status').fadeOut(); // will first fade out the loading animation
    $('#ms-preload').delay(350).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('body').delay(350).css({'overflow':'visible'});

    new WOW().init();

    var players = Array.from(document.querySelectorAll('.js-player')).map(function (player) {
        return new Plyr(player);
    });

    $('.counter').counterUp({
        delay: 10,
        time: 2000,
    });


    slidebar();

    var mySlider = $('.ms-slider').slider();

    var backTop = $('.btn-back-top');
    $(window).scroll(function() {
        if ($(this).scrollTop() > 400) {
            backTop.addClass('back-show');
        } else {
            backTop.removeClass('back-show');
        }
    });

    (function($) {
        $(function() {
            $(document).off('click.bs.tab.data-api', '[data-hover="tab"]');
            $(document).on('mouseenter.bs.tab.data-api', '[data-hover="tab"]', function() {
                $(this).tab('show');
            });
        });
    })(jQuery);

    $('.navbar').on('click mousedown mouseup touchstart', 'a.has_children', function () {
        if ( $(this).next('ul').hasClass('open_t') && !$(this).parents('ul').hasClass('open_t')) {
            $('.open_t').removeClass('open_t');
            return false;
        }
        $('.open_t').not($(this).parents('ul')).removeClass('open_t');
        $(this).next('ul').addClass('open_t');
        return false;
    });
    $(document).on('click', ':not(.has_children, .has_children *)', function() {
        if( $('.open_t').length > 0 ) {
            $('.open_t').removeClass('open_t');
            $('.open_t').parent().removeClass('open');
            return false;
        }
    });

    /* Change navbar with scroll */
    var navbar_selector = $('.ms-navbar');
    var navbar_nav_selector = $('.navbar-nav');
    var body_selector = $('body');

    var navbarFixed = $('.ms-site-container').hasClass('ms-nav-fixed');

    $(window).scroll(function() {
        if (!navbarFixed) {
            if ($(window).scrollTop() > 120) {
                navbar_selector.addClass('shrink');
                body_selector.addClass('bd-scroll');
                navbar_selector.addClass('fixed-top');
            }
            if ($(window).scrollTop() < 121) {
                navbar_selector.removeClass('shrink');
                body_selector.removeClass('bd-scroll');
                navbar_selector.removeClass('fixed-top');
            }
        }
    });

    $('#datePicker').datepicker({
        orientation: "bottom left",
        autoclose: true,
        todayHighlight: true
    });

    var $container = $('.masonry-container');
    $container.imagesLoaded( function () {
        $container.masonry({
            columnWidth: '.masonry-item',
            itemSelector: '.masonry-item'
        });
    });


    var confOpen = false;

    $(".ms-conf-btn").click(function () {
        if (!confOpen) {
            confOpen = true;
            openConf();
        }
        else {
            confOpen = false;
            closeConf();
        }
    });
    $(".ms-site-container").click(function () {
        if (confOpen) {
            confOpen = false;
            closeConf();
        }
    });
});

function openConf(op) {
    $("#ms-configurator").animate({
        "right": '0px'
    }, 400);
    $(".ms-configurator-btn").animate({
        "right": '-60px'
    }, 200);
}

function closeConf() {
    $("#ms-configurator").animate({
        "right": '-310px'
    }, 200);
    $(".ms-configurator-btn").animate({
        "right": '20px'
    }, 400);
}

function slidebar() {
    var slidebar = $('.ms-slidebar');
    var site = $('.ms-site-container');
    var toggles = $('.ms-toggle-left');
    var clickToggle = false;
    var open = false;
    toggles.click(function () {
        if (!open) {
            slidebar.addClass('open');
            open = true;
        }
        else {
            slidebar.removeClass('open');
            open = false;
        }
        clickToggle = true;
    });
    site.click(function () {
        if (!clickToggle && open) {
            slidebar.removeClass('open');
            open = false;
        }
        clickToggle = false;
    });
}

(function ($) {
  $('.input-number .btn-circle:first-of-type').on('click', function() {
    $('.input-number input').val( parseInt($('.input-number input').val(), 10) - 1);
  });
  $('.input-number .btn-circle:last-of-type').on('click', function() {
    $('.input-number input').val( parseInt($('.input-number input').val(), 10) + 1);
  });
})(jQuery);
