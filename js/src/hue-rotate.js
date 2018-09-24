;(function() {
    if(!document.getElementsByClassName) {return;}
    var about = document.getElementsByClassName('about')[0];
    var ps = about.getElementsByTagName('p');
    var length = ps.length;
    var di = Math.ceil(360/length);
    if(about.style.webkitFilter === undefined && about.style.filter === undefined) {return;}
    about.style.color = 'rgb(32, 174, 142)';
    for (var i = 0; i < length; i++) {
        ps[i].style.webkitFilter = 'hue-rotate('+i*di+'deg)';
        ps[i].style.filter = 'hue-rotate('+i*di+'deg)';
    }
})();