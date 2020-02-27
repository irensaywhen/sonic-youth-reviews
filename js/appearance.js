//Animate appearance and scrolling

//Caching

$animatedElements = $('.animate');
$window = $(window);

//Object with functions to deal with scrolling

const scrolling = {

    isScrolling: false,

    isPartiallyVisible: function(elem){

        //Save element's window-relative coordinates
        let elemBoundary = elem.getBoundingClientRect();

        //Caching

        let height = elemBoundary.height;
        let top = elemBoundary.top;
        let bottom = elemBoundary.bottom;

        //Return true if element is partially visible
        return ((top + height >= 0) && (height + window.innerHeight) >= bottom);
    },

    dealWithScrolling: function(event){

        $animatedElements.each(function(){

            //Check if any elements to be animated are visible
            if (scrolling.isPartiallyVisible(this)){
    
                //Show partially visible elements
                $(this).addClass('visible');
    
            } else {
    
                //Hide invisible elements
                $(this).removeClass('visible');
            }
        })
    },

    throttleScroll: function(event){
        if(!(scrolling.isScrolling)){ 

            window.requestAnimationFrame(function(){
    
                scrolling.dealWithScrolling(event);
                scrolling.isScrolling = false;
            });
        }
        scrolling.isScrolling = true;
    },


}


$window.on({
    'load': function(event){
        $('.preloader')
        .fadeOut(700, function(){
            $window.trigger('scroll');
        });
    },
    'scroll resize': scrolling.throttleScroll,
})
