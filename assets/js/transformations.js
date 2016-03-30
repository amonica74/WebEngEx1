/**
 * Created by mim on 28.03.16.
 */

var $window = $(window);
var $start = Date.now();
var $centeredElement;
var $midpoint = window.innerHeight/2;
var $counts = {'home':0, 'about':0, 'portfolio':0, 'blog':0, 'contact':0};
var $maxCount = 0;
var $maxSize = 60;
var $minSize = 30;

function updateImgSize(){
   $("#menu img").each(function(){
       var id = $(this).attr('id').slice(0,-3); //remove "Img" suffix from id
       var height = ($maxSize - $minSize)*$counts[id]/$maxCount + $minSize;

        console.error("updated counts for "+id, height);
        $(this).css("height",String(height+"px"));
        $(this).css("width", "auto");
        });
}


function isElementInViewport(el) {
    var rect = el[0].getBoundingClientRect();
    console.log(rect.top, rect.bottom)
    console.log("Height, ", document. documentElement.clientHeight)
    console.log("Inner h, ", window.innerHeight)

    if( rect.bottom > 0 &&
        rect.right > 0 &&
        rect.left < (window.innerWidth || document. documentElement.clientWidth) /*or $(window).width() */ &&
        rect.top < (window.innerHeight || document. documentElement.clientHeight) /*or $(window).height() */
    ) {
        if (rect.bottom > $midpoint && rect.top < $midpoint) $centeredElement = el[0]; //check if this particular element is in the middle of the screen
        return true;
    }

}

function check_if_in_view() {
    //If an element comes in view, add new class. This will animate the transition
    console.log("cursor moves");
    var $current = Date.now();
    var $diff = $current - $start;
    $start = $current;

    if ($diff > 2000) {
        //we have stayed in the PREVIOUS position for more than 2s so we need to do something with the previous
        // element in the center before recalculating the new movement
        console.error("Centered element was,", $centeredElement.className)
        console.error("cursor stayed for, ", $diff);

        //Find which section the element belongs to and update the counts
        for (var sectionName in $counts) {
            if ( document.getElementById(sectionName).contains($centeredElement) ){

                $counts[sectionName] = $counts[sectionName]+1;

                if($counts[sectionName]>$maxCount) $maxCount=$counts[sectionName];
                console.error("Max count: ", $maxCount);
                console.error($counts);
                break;
            }
        }
        console.log("Updated counts");
        updateImgSize();

    }

    var $animation_elements = $('.to-animate');

    $.each($animation_elements, function() {
        var $element = $(this);
        if (isElementInViewport($element))
         {
             $element.addClass('in-view', 2000);
        }
    } //we have now iterated over all elements in viewport and found the centered one


    );
}

$window.on('load scroll resize', check_if_in_view);
$window.trigger('scroll');
