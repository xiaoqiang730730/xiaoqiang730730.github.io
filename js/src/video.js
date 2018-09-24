;(function($) {
    var bloop = false;
    var $position = $('.brand');
    $position.after('<audio id="bgmusic" style="opacity:0;" preload="auto"></audio>');

    var bgMusic = $('#bgmusic')[0];
    // var btnMusic = document.getElementsByClassName('musicIcon')[0];
    var index = 0;
    var list = [
        'http://link.hhtjim.com/163/30814948.mp3', // 斑马
        'http://link.hhtjim.com/163/35314191.mp3',// 爱江山更爱美人
        // 'http://link.hhtjim.com/163/27552544.mp3', // 猴年-听西游
        // 'http://link.hhtjim.com/163/110411.mp3', // 传奇-李建
        // 'http://link.hhtjim.com/163/33856279.mp3', // 众望-李建
        'http://link.hhtjim.com/163/25638272.mp3', // 月光-李建
        'http://yingtao-pano.b0.upaiyun.com/20/ed/20ed16b6783ae9412a251cdf60b92bd7.mp3', // like
        'http://link.hhtjim.com/163/27785673.mp3' // 一起摇摆 -王峰
    ];
    bgMusic.src = list[index];
    bgMusic.play();
    bgMusic.addEventListener('ended', function(){
        index ++;
        if(index >= list.length){
            index = 0;
        }
        bgMusic.src = list[index];
        bgMusic.play();
    }, false);
    // if(/Mobile/.test(navigator.userAgent)){
    //     btnMusic.className = 'musicIcon';
    // }
    // // 移动端默认音乐
    // // document.addEventListener('touchstart', function(){
    // //     if(!bloop){
    // //         bgMusic.play();
    // //         bloop = false;
    // //     }
    // // }, false);
    // btnMusic.addEventListener('click', function(){
    //     if(btnMusic.className.indexOf('active') > -1){
    //         btnMusic.className = 'musicIcon';
    //         bgMusic.pause();
    //     }else{
    //         btnMusic.className = 'musicIcon active';
    //         bgMusic.play();
    //     }
    // }, false);
    // var html = [
    //     '<div style="position:absolute;top:0;">',
    //         '<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=450 src="http://music.163.com/outchain/player?type=0&id=389133740&auto=0&height=430"></iframe>',
    //     '</div>',
    // ].join('');
    // $('body').append(html);
})(window.jQuery);