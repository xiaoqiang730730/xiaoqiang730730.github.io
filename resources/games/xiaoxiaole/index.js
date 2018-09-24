var XZ = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
];

var w = 10, h = 10, f = 3;

var color = ['#f00', '#ff0', '#0f0', '#00f', '#FFA500', '#A020F0'];

function randomColorIndex() {
    return Math.round(Math.random()*(color.length - 1));
}


function domRad() {
    var index = 0;
    for (var i = 0; i < XZ.length; i++) {
        index = randomColorIndex();
        XZ[i] = index;
    }

    // render(div, result);
    // 
}

function renderTable() {
    var str = '';
    for (var i = 0; i < w; i++) {
        str += '<tr>';
        for (var j = 0; j < h; j++) {
            str += '<td></td>';
        }
        str += '</tr>';
    }
    $('.container-layer').html(str);
}

// var table = document.getElementById('table');
var $el = $('.container');


function getPoint(i) {
    return {
        x: i%w,
        y: Math.floor( i/ h)
    }
}

function toPoint(x, y) {
    return y*h + x;
}

function init() {
    domRad(); // 初始化XZ
    $el.append(new Array(11).join('<div class="lime-layer"></div>'));

    var p;
    for (var i = 0; i < XZ.length; i++) {
        p = getPoint(i);
        $el.find('.lime-layer:eq('+p.x+')').append('<div class="circle"></div>');
    }
}

function initRender() {
    var p;
    var tx, ty;
    var times;
    var $circle;
    var timeDivice = 0.1;
    for (var i = 0; i < XZ.length; i++) {
        p = getPoint(i);
        tx = p.x * 50 + 'px';
        ty = 0;
        times = (p.y + 1) * timeDivice + 's';
        $circle = $el.find('.lime-layer:eq('+p.x+')').find('.circle:eq('+p.y+')');

        $circle.text(i).css({
            transition: 'transform ease '+times+'',
            transform: 'translate3d('+tx+', 0px, 0px)'
        });

        (initRenderAnimation)($circle, p, i, timeDivice);

    }

}

function initRenderAnimation($el, p, i, timeDivice) {
    timeDivice = timeDivice*1000;
    setTimeout(function() {
        var tx, ty;
        tx = p.x * 50 + 'px';
        ty = p.y * 50 + 'px';
        $el.css({
            transform: 'translate3d('+tx+', '+ty+', 0px)',
            backgroundColor: color[XZ[i]]
        });
    }, timeDivice);
}

function initRenderAnima() {
    var p;
    var tx, ty;
    for (var i = 0; i < XZ.length; i++) {
        p = getPoint(i);
        tx = p.x * 50 + 'px';
        ty = p.y * 50 + 'px';
        $el.find('.lime-layer:eq('+p.y+')').find('.circle:eq('+p.x+')').css({
            transform: 'translate3d('+tx+', '+ty+', 0px)',
            backgroundColor: color[XZ[i]]
        });
    }
}


function clear(i) {
    var p = getPoint(i);
    var $cloum = $el.find('.lime-layer:eq('+p.x+')');

    var $remove = $cloum.find('.circle:eq('+p.y+')');

    var text = $remove.text();
    var remoceTrans = $remove[0].style.transform;

    $remove.addClass('active');

    $remove.fadeOut('200', function() {
        for (var k = p.y; k > 0; k --) {
            XZ[toPoint(p.x, k)] = XZ[toPoint(p.x, k - 1)];
        }
        $remove.remove();
        $cloum.prepend('<div class="circle"></div>');

        XZ[toPoint(p.x, 0)] = randomColorIndex();
        $cloum.find('.circle:eq(0)').css({
            backgroundColor: color[XZ[toPoint(p.x, 0)]]
        });


        for (var j = 0; j < p.y; j++) {
            // XZ[toPoint(p.x, j)] = XZ[toPoint(p.x, j + 1)];
            // XZ[toPoint(p.x, j)] = XZ[toPoint(p.x, k - 1)];
            $cloum.find('.circle:eq('+j+')').text(toPoint(p.x, j)).css({
                transform: $cloum.find('.circle:eq('+(j + 1)+')')[0].style.transform,
                transition: 'transform ease 0.1s'
            });
        }
        // XZ[toPoint(p.x, p.y)] = XZ[index];
        $cloum.find('.circle:eq('+p.y+')').text(toPoint(p.x, p.y)).css({
            transform: remoceTrans,
            transition: 'transform ease 0.1s'
        });
    });
}

function handClear() {
    
    // list = calcResult(XZ, w, h, f);
    // if(list.length) {
    //     handClear();
    // }
    var t = setInterval(function(args){

        var list = calcResult(XZ, w, h, f);
        if(list.length) {
            list.forEach(function(t) {
                clear(t);
            });
        }else{
            clearInterval(t);
        }

    }, 500);

}

// 入口函数
// 
renderTable();

init();
initRender();

handClear();

// setTimeout(initRenderAnima, 1000);
// domRad(table);



var currentPoint = '';
var $currentEl = '';
// 时间

function setCurrent($el) {
    if($currentEl) {
        $currentEl.removeClass('active');
    }

    $el.addClass('active');

    $currentEl = $el;

    var point = $currentEl.text();
    var p = getPoint(point);
    if(p.x + 1 < w) {
        currentPoint += '#' + toPoint(p.x + 1, p.y);
    }
    if(p.x - 1 > 0) {
        currentPoint += '#' + toPoint(p.x - 1, p.y);
    }
    if(p.y - 1 > 0) {
        currentPoint += '#' + toPoint(p.x, p.y - 1);
    }
    if(p.y + 1 < h) {
        currentPoint += '#' + toPoint(p.x, p.y + 1);
    }
}

function exchange($el) {
    var p0 = $currentEl.text();
    var p1 = $el.text();
    var t = XZ[p0];
    XZ[p0] = XZ[p1];
    XZ[p1] = t;

    var transform0 = $currentEl[0].style.transform;
    var transform1 = $el[0].style.transform;
    $currentEl.text(p1).css({
        transform: transform1
    });

    $el.text(p0).css({
        transform: transform0
    });

    var list = calcResult(XZ, w, h, f);
    if(list.length) {
            setTimeout(function(){
            currentPoint = '';
            $currentEl.removeClass('active');
            $currentEl.before($el.clone());
            $el.before($currentEl.clone());
            $currentEl.remove();
            $el.remove();
            $currentEl = '';
            handClear();
        }, 200);
    }else{
        setTimeout(function(){
            var p0 = $currentEl.text();
            var p1 = $el.text();
            var t = XZ[p0];
            XZ[p0] = XZ[p1];
            XZ[p1] = t;

            var transform0 = $currentEl[0].style.transform;
            var transform1 = $el[0].style.transform;
            $currentEl.text(p1).css({
                transform: transform1
            });

            $el.text(p0).css({
                transform: transform0
            });
        }, 300);
    }

}

$('.container').on('click', '.circle', function() {
    var $this = $(this);
    var point = $this.text();
    if($this.hasClass('active')) return;
    if(currentPoint) {
        if(currentPoint.indexOf('#' + point) > -1) {
            exchange($this);
        }else{
            setCurrent($this);
        }
    }else{
        setCurrent($this);
    }
});




function _clear(i) {
    if(!tds) {
        tds = document.getElementsByTagName('td');
    }
    // tds[i].style.transition = 'all ease 1s';
    tds[i].style.backgroundColor = '#fff';
    var p = getPoint(i);
    var x = p.x;
    // var targetP = toPoint(p.x, p.y - 1);
    var endP = toPoint(x, 0);
    for ( ;p.y - 1 > -1; p.y -- ) {
        (function(y1, y0){
            var targetP = toPoint(x, y1);
            var souP = toPoint(x, y0);
            transForm(targetP, souP);
        })(p.y - 1, p.y);
    }
    XZ[endP] = randomColorIndex();
    tds[endP].style.backgroundColor = color[randomColorIndex()];
}


function transForm(targetP, sourP) {
    // tds[targetP].style.transition = 'all ease 0.3s';
    // tds[targetP].style.transform = 'translateY(54px)';
    $(tds[targetP]).animate({
        bottom: '-54px'
    }, 300, function() {
        console.log(targetP, sourP);

        $(tds[targetP]).css('bottom', 0);


        $(tds[sourP]).css('backgroundColor', color[XZ[targetP]]);

        XZ[sourP] = XZ[targetP];
        
        // $(tds[targetP]).css('backgroundColor', color[XZ[sourP]]);
        // 
    });

    // tds[targetP].addEventListener('webkitTransitionEnd', function() {
    //     console.log(1);
    //     tds[targetP].style.transition = '';
    //     tds[targetP].removeEventListener('webkitTransitionEnd');
    //     tds[targetP].style.transform = 'translateY(0px)';
    //     tds[sourP].style.backgroundColor = color[XZ[targetP]];
    //     console.log(2);
    //     // tds[targetP].style.backgroundColor = XZ[sourP];
    // }, false);
}

console.log(calcResult(XZ, w, h, f));






function calcResult(xz, w, h, f) {
    var x, y, c = [];
    var i = 0, ni = xz.length, result;
    for (; i < ni; i++) {
        result = [];
        x = i % w;
        y = Math.ceil(i / h) - 1;
        if (x <= w - f) {
            result = calcSort('x', xz, xz[i], i, x, y, w, h, f);
            result && result.length && [].push.apply(c, result);
        }
        if (y <= h - f) {
            result = calcSort('y', xz, xz[i], i, x, y, w, h, f);
            result && result.length && [].push.apply(c, result);
        }
        // if (x <= w - f && y <= h - f) {
        //     result = calcSort('i', xz, xz[i], i, x, y, w, h, f);
        //     result && result.length && c.push(result);
        // }
        // if (x > f && y <= h - f) {
        //     result = calcSort('z', xz, xz[i], i, x, y, w, h, f);
        //     result && result.length && c.push(result);
        // }
    }
    return arrayUnique(c);
}


function arrayUnique (list){
    var res = [];
    var json = {};
    if (list.length === 1 || list.length === 0) {
        return list;
    }
    for (var i = 0; i < list.length; i++) {
        if (!json[list[i]]) {
            res.push(list[i]);
            json[list[i]] = 1;
        }
    }
    json = null;
    list = null;
    return res;
};

/**
 *  
 */
function calcSort(tp, xz, di, i, x, y, w, h, f) {
    var _i = i,
        _x = x,
        _y = y,
        _w = 1,
        _c = [i];
    if (tp == 'x') { //横轴
        while (_x < w && xz[_i] != undefined) {
            _i++;
            _x++;
            if (xz[_i] != di) {
                break;
            }
            _c.push(_i);
        }
    } else if (tp == 'y') {
        while (_y < h && xz[_i] != undefined) {
            _i += h;
            _y ++;
            if (xz[_i]!= di) {
                break;
            }
            _c.push(_i);
        }
    }
    // } else if (tp == 'i') {
    //     while (_y < h && _x < w && xz[_i]) {
    //         _i += h + _w;
    //         _x++;
    //         _y++;
    //         if (xz[_i] != di) {
    //             break;
    //         }
    //         _c.push(_i);
    //     }
    // } else if (tp == 'z') {
    //     while (_y < h && _x > 0 && xz[_i]) {
    //         _i += h - _w;
    //         _x--;
    //         _y++;
    //         if (xz[_i] != di) {
    //             break;
    //         }
    //         _c.push(_i);
    //     }
    // }
    if (_c.length >= f) {
        return _c;

    }
    return false;
}