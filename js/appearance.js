//Animate appearance and scrolling

//Caching

$animatedElements = $('.animate');
$window = $(window);

let isScrolling = false;

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

function throttleScroll(event){

    if(!(isScrolling)){

        window.requestAnimationFrame(function(){

            dealWithScrolling(event);
            isScrolling = false;
        });
    }
    isScrolling = true;
}

$window.on('scroll resize', throttleScroll);
$window.trigger('scroll');