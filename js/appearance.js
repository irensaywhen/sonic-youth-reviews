//Animate appearance and scrolling

//Caching

$animatedElements = $('.animate');
$window = $(window);

function isPartiallyVisible(elem){

    let elemBoundary = elem.getBoundingClientRect();

    //Caching

    let height = elemBoundary.height;
    let top = elemBoundary.top;
    let bottom = elemBoundary.bottom;

    //Return true if element is partially visible
    return ((top + height >= 0) && (height + window.innerHeight) >= bottom);
}

function dealWithScrolling(event){

    $animatedElements.each(function(){

        if (isPartiallyVisible(this)){

            $(this).addClass('visible');

        } else {
            $(this).removeClass('visible');
        }
    })
}

$window.on('scroll resize', dealWithScrolling);
$window.trigger('scroll');