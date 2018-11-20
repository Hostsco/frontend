window.onresize = introFull;
var handler = window.onresize;
handler.apply(window, [' On']);

$(document).ready(introFull);
$(window).resize(introFull);

$(function(){
    $('#Container').mixItUp();

    var options = {
        strings: ["be creative", "start your project", "innovate"],
        typeSpeed: 40,
        startDelay: 2000,
        loop: true,
        backDelay: 1000,
    };

    var typed = new Typed(".typed-class", options);

    setTimeout(introFull, 700);
});

function introFull() {
    var introFull = $('.intro-hero-full');
    var introFullHeight = introFull.height();

    var msHeaderHeight = $('.ms-header').height();
    var headerHeight = (msHeaderHeight > 0 ? msHeaderHeight : 0 ) + $('.ms-navbar').height();

    introFull.css('height', $(window).height() - headerHeight + 'px');
}

var myCircle1 = Circles.create({
    id:         'circles-1',
    radius:     60,
    value:      43,
    maxValue:   100,
    width:      5,
    text:       function(value){return value + '%';},
    colors:     ['rgba(255,255,255,0.3)', '#fff'],
    duration:   1000,
    wrpClass:   'circles-wrp',
    textClass:  'circles-text'
});

var myCircle2 = Circles.create({
    id:         'circles-2',
    radius:     60,
    value:      60,
    maxValue:   100,
    width:      5,
    text:       function(value){return value + '%';},
    colors:     ['rgba(255,255,255,0.3)', '#fff'],
    duration:   1000,
    wrpClass:   'circles-wrp',
    textClass:  'circles-text'
});

var myCircle3 = Circles.create({
    id:         'circles-3',
    radius:     60,
    value:      80,
    maxValue:   100,
    width:      5,
    text:       function(value){return value + '%';},
    colors:     ['rgba(255,255,255,0.3)', '#fff'],
    duration:   1000,
    wrpClass:   'circles-wrp',
    textClass:  'circles-text'
});

var myCircle4 = Circles.create({
    id:         'circles-4',
    radius:     60,
    value:      100,
    maxValue:   100,
    width:      5,
    text:       function(value){return value + '%';},
    colors:     ['rgba(255,255,255,0.3)', '#fff'],
    duration:   1000,
    wrpClass:   'circles-wrp',
    textClass:  'circles-text'
});
