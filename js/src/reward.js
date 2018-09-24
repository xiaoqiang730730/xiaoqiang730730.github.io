;(function($) {
    var $reward = $('.reward');
    var html = [
        '<div style="padding: 10px 0; margin: 20px auto; width: 90%; text-align: center">',
          '<div>觉得有点意思，打个赏鼓励博主继续写哈！がんばって</div>',
          '<button style="background:rgb(204,204,204);cursor: pointer; border: 0; outline: 0; border-radius: 100%; padding: 0; margin: 0; letter-spacing: normal; text-transform: none; text-indent: 0px; text-shadow: none;">',
            '<span style="display: inline-block; width: 70px; height: 70px; border-radius: 100%; line-height: 70px; color: #fff; font-size: 35px;background: rgb(236,96,0)">赏</span>',
          '</button>',
          '<div>',
              '<div style="display: inline-block">',
                '<a href="/images/pay_weixin.jpg"><img id="wechat_qr" src="/images/pay_weixin.jpg" alt="WeChat Pay" style="width: 200px; max-width: 100%; display: inline-block"/></a>',
                '<p>微信打赏</p>',
              '</div>',
              '<div style="display: inline-block">',
                '<a href="/images/pay_ali.jpg"><img id="alipay_qr" src="/images/pay_ali.jpg" alt="Alipay" style="width: 200px; max-width: 100%; display: inline-block"/></a>',
                '<p>支付宝打赏</p>',
              '</div>',
          '</div>',
        '<div>',
    ].join('');
    $reward.html(html);
})(window.jQuery);