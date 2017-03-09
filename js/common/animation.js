/**
 * Created by xlx on 2015/9/24.
 */
// 动画效果
function animationHover(element, animation){// animation  是动画的效果
    element = $(element);
    element.hover(
        function() {
            element.addClass('animated ' + animation);
        },
        function(){
            //wait for animation to finish before removing classes
            window.setTimeout( function(){
                element.removeClass('animated ' + animation);
            }, 2000);
        });
}