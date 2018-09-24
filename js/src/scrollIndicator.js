;(function($) {

    var colors = ['#f00', '#8b008b', '#0c0', '#39c', '#0cf'];
    var color = colors[Math.round(Math.random()*4)];
    var $scrollLine = $('.scroll-line');
    var $body = $('.container');
    var time = new Date();
    var month = time.getMonth();


    if(month >= 11 || month <= 0) {
        $body.addClass('snow');
    }

    $scrollLine.css('background', color);
    $(window).scroll(function() {
        var wintop = $(window).scrollTop(),
            docheight = $(document).height(),
            winheight = $(window).height();
        var scrolled = (wintop / (docheight - winheight)) * 100;

        $scrollLine.css('width', (scrolled + '%'));
    });
})(window.jQuery);