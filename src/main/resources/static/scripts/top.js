$(function(){
    //时间轴收缩动画
    $(".number").click(function(){
        console.log("fsdfdsfsdfsdfsdfsdfsdfsdfsfs");
        var $divcount = $(this).parent().find(".divCount");
        var $divimg = $(this).find(".hand_img");
        if ($divcount.is(":hidden")) {
            $divcount.slideDown(800);
            $divimg.removeClass("Rotation");
        }
        else
        {
            $divcount.slideUp(1000);
            $divimg.addClass("Rotation");
        };
    });

    //迷你时间选择轴动画
    $(".scrubber_list li a").click(function(){
        var $liParent = $(this).parent().find(".scrubber_list_month");
        if ($liParent.is(":hidden")) {
            $(".scrubber_list_month").slideUp(800);
            $liParent.slideDown(800);
        }
        else
        {
            //收缩
            $liParent.slideUp(800);
        }
    })
})

//滚动效果 (jQuery的 animate() 方法实现)
function click_scroll(e) {
    var scroll_offset = $("#"+e).offset();
    $("body,html").animate({
        scrollTop:scroll_offset.top
    },1000);
}
var IMYUAN;
IMYUAN || (IMYUAN = {});
(function(a) {
    a.fn.extend({
        returntop: function() {
            if (this[0]) {
                var b = this.click(function() {
                    a("html, body").animate({
                        scrollTop: 0
                    },
                    1000)
                }),
                c = null;
                a(window).bind("scroll",
                function() {
                    var d = a(document).scrollTop(),
                    e = a(window).height();
                    0 < d ? b.css("bottom", "100px") : b.css("bottom", "-100px");
                    a.isIE6() && (b.hide(), clearTimeout(c), c = setTimeout(function() {
                        b.show();
                        clearTimeout(c)
                    },
                    1E3), b.css("top", d + e - 125))
                })
            }
        }
    })
})
(jQuery); (function(a) {
    a("body")('<a class="close" href="javascript:;"></a>');
})
(function() {
    $("#returnTop").returntop()
});


  