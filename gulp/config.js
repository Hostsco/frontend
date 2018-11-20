module.exports = {
    environment : 'dev',
    concat: true,
    primaryColor: 'light-blue',
    shine: '500',
    headerClass: 'ms-header-primary',
    navbarClass: 'ms-navbar-primary',
    navbarMode: false,
    allColors: false,
    compress: false,

    themes : ['red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue', 'cyan', 'teal', 'green', 'light-green', 'lime', 'yellow', 'amber', 'orange', 'deep-orange', 'brown', 'grey', 'blue-grey'],
    shines : ['300', '400', '500', '600', '700', '800'],

    headers : ['header-primary', 'header-dark', 'header-white'],
    navbars : ['navbar-primary', 'navbar-dark', 'navbar-white'],

    folders : {
        dist : 'dist',
        assets: 'assets',
        plugins: 'plugins'
    },

    plugins : {
        js : [
            'node_modules/html5shiv/dist/html5shiv.min.js',
            'node_modules/respond.js/dest/respond.min.js',
        ],
        jsConcat : [
            'node_modules/jquery/dist/jquery.min.js',
            'node_modules/jquery.cookie/jquery.cookie.js',
            'node_modules/popper.js/dist/umd/popper.min.js',
            'node_modules/bootstrap/dist/js/bootstrap.min.js',
            'node_modules/bootstrap-select/dist/js/bootstrap-select.min.js',
            "node_modules/bootstrap-datepicker/dist/js/bootstrap-datepicker.min.js",
            'node_modules/wowjs/dist/wow.min.js',
            'node_modules/prismjs/prism.js',
            'node_modules/prismjs/plugins/line-numbers/prism-line-numbers.min.js',
            'node_modules/jquery-match-height/dist/jquery.matchHeight-min.js',
            'node_modules/plyr/dist/plyr.polyfilled.min.js',
            'node_modules/imagesloaded/imagesloaded.pkgd.min.js',
            'node_modules/masonry-layout/dist/masonry.pkgd.min.js',
            'node_modules/waypoints/lib/jquery.waypoints.min.js',
            'node_modules/jquery.counterup/jquery.counterup.min.js',
            'node_modules/chart.js/dist/Chart.bundle.min.js',
            'node_modules/chartjs-plugin-deferred/dist/chartjs-plugin-deferred.min.js',
            'node_modules/circles/circles.min.js',
            'node_modules/owl.carousel/dist/owl.carousel.min.js',
            'node_modules/jquery-countdown/dist/jquery.countdown.min.js',
            'node_modules/mixitup/build/jquery.mixitup.min.js',
            'node_modules/smooth-scroll/dist/js/smooth-scroll.min.js',
            'node_modules/typed.js/lib/typed.min.js',
            "node_modules/node-snackbar/dist/snackbar.min.js",
            "node_modules/lightbox2/dist/js/lightbox.js",
            "node_modules/bootstrap-slider/dist/bootstrap-slider.min.js"
        ],
        css : [
            'node_modules/animate.css/animate.min.css',
            'node_modules/bootstrap/dist/css/bootstrap.min.css',
            'node_modules/font-awesome/css/font-awesome.min.css',
            'node_modules/material-design-iconic-font/dist/css/material-design-iconic-font.min.css',
            'node_modules/bootstrap-select/dist/css/bootstrap-select.min.css',
            "node_modules/bootstrap-datepicker/dist/css/bootstrap-datepicker3.min.css",
            "node_modules/ionicons/dist/css/ionicons.min.css",
            'node_modules/plyr/dist/plyr.css',
            'node_modules/owl.carousel/dist/assets/owl.carousel.min.css',
            'node_modules/owl.carousel/dist/assets/owl.theme.default.min.css',
            "node_modules/node-snackbar/dist/snackbar.min.css",
            //"node_modules/bootstrap-slider/dist/css/bootstrap-slider.min.css"
        ],
        fonts : [
            'node_modules/font-awesome/fonts/*',
            'node_modules/material-design-iconic-font/dist/fonts/*',
            'node_modules/ionicons/dist/fonts/*'
        ],
        img : [
            'node_modules/owl.carousel/dist/assets/owl.video.play.png',
            'node_modules/lightbox2/dist/images/*'
        ]
    },
};
