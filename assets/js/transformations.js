/**
 * Created by mim on 28.03.16.
 */


var $window = $(window);

function isElementInViewport(el) {
    var rect = el[0].getBoundingClientRect();

    return rect.bottom > 0 &&
        rect.right > 0 &&
        rect.left < (window.innerWidth || document. documentElement.clientWidth) /*or $(window).width() */ &&
        rect.top < (window.innerHeight || document. documentElement.clientHeight) /*or $(window).height() */;
}

function check_if_in_view() {
    console.log('triggered stuff');
    var $animation_elements = $('.to-animate');
    console.log($animation_elements.length);

    $.each($animation_elements, function() {
        var $element = $(this);
        console.log('checking elements');
        if (isElementInViewport($element))
         {
             $(this).hide().delay(1000).fadeIn("slow");
             //$element.find('img').delay(2000).animate({opacity:1}, slow);
             $element.addClass('in-view', 2000);
             $element.removeClass('to-animate');
             console.log('added in view class')
        }
    });
}

$window.on('load scroll resize', check_if_in_view);
$window.trigger('scroll');

function animations() {
    $(this).hide().delay(100).fadeIn("slow");
    //$('#home').find('img').delay(1400).animate({
    //    opacity: 1,
    //        left: 0
    //    }, 'slow'
    //);

}

//
//$('.blogs').find('p').delay(1400).animate({
//        opacity: 1,
//        left: 0
//    }, 'slow'
//);
//
//$('.blogs').find('img').delay(2000).animate({
//        opacity: 1,
//        right: 0
//    }, 'slow'
//);
//
//$('.blogs').find('button').delay(2500).animate({
//        opacity: 1,
//        bottom: 0
//    }, 'slow'
//);


//function onVisibilityChange(el, callback) {
//    var old_visible;
//    return function () {
//        var visible = isElementInViewport(el);
//        if (visible != old_visible) {
//            old_visible = visible;
//            if (typeof callback == 'function') {
//                console.log("callback called")
//                callback();
//            }
//        }
//    }
//}
//
//var handler = onVisibilityChange(null, function() {
//    /* your code go here */
//    $element.addClass('in-view');
//    console.log("triggered a change")
//});
//
//
////jQuery
//$(window).on('DOMContentLoaded load resize scroll', handler);
//$(window).trigger('scroll');
