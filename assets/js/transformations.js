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
    //If an element comes in view, add new class. This will animate the transition

    var $animation_elements = $('.to-animate');

    $.each($animation_elements, function() {
        var $element = $(this);
        if (isElementInViewport($element))
         {
             $element.addClass('in-view', 2000);
        }
    });
}

$window.on('load scroll resize', check_if_in_view);
$window.trigger('scroll');
