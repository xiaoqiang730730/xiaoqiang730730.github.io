(function() {
    window.addEventListener('load', function() {

        $('#comments').html('<div id="lv-container" data-id="city" data-uid="MTAyMC8zNDc1MC8xMTI4Nw=="></div>');
        (function(d, s) {
            var j, e = d.getElementsByTagName(s)[0];
     
            if (typeof LivereTower === 'function') { return; }
     
            j = d.createElement(s);
            j.src = 'https://cdn-city.livere.com/js/embed.dist.js';
            j.async = true;
     
            e.parentNode.insertBefore(j, e);
        })(document, 'script');
    })
})();