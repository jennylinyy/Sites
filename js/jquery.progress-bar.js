

// SIGNATURE PROGRESS
function progressBar() {
    console.log("progressBar");

    var animationLength = $('.progress-wrap').data('speed');
    var i = 1;
    $('.progress-bar').each(function(){
        var getPercent = $(this).data('progress-percent');
        $(this).stop().animate({
            width: getPercent
        }, animationLength);
        i++;
    });

    $('.progress-count').each(function(){

        var i = 1;
        var count = $(this).data('progress-count');
        var step = animationLength / count;
        var that = $(this);

        var int = setInterval(function () {
            if (i <= count) {
                that.html(i + '%');
            }
            else {
                clearInterval(int);
            }
            i++;
        }, step);
    });
}
(function ($) {
    var wr = $('.progress-wrap');
    var cc = 1;

    $(window).scroll(function(){
        var targetPos = wr.offset().top;
        var targetPosBottom = wr.offset().top + wr.outerHeight();
        var winHeight = $(window).height();
        var scrollToElem = targetPosBottom - winHeight;
        var winScrollTop = $(this).scrollTop();

        if (winScrollTop > scrollToElem) {
            if(targetPos > winScrollTop){
                if (cc < 2){
                    $(document).ready(function () {
                        progressBar();
                    });
                    cc = cc + 2;
                }
            }
        }
    });
})(jQuery);