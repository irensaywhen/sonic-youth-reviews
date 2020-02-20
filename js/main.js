let header = $('header')[0];
let nav = document.getElementById('navigation');
let menuIcon = document.getElementById('menu-icon');

function getYCoords(elem) {
    return elem.getBoundingClientRect().top - header.getBoundingClientRect().height + window.pageYOffset;
}

//Handling menu toggling on small screens

menuIcon.addEventListener('click', function(event){

    //toggle class on click
    nav.classList.toggle('open');
    event.stopPropagation();
});

//Scroll with easing from the first section

let readMore = $('.read-more')[0];
let arrow = $('.arrow-wrapper img')[0];

$('#first-section').on('click', function(event){

    let target = event.target;

    //react only if the target is the button or arrow
    if((target === readMore) || (target === arrow)){

        //prevent moving to the anchor
        event.preventDefault();

        if (target === readMore){

            //move to tier-1 with animation
            $('html, body').animate({
                scrollTop: getYCoords($('#tier-1')[0])
            }, {
                duration: 900,
            });
            event.stopPropagation();
        }

        if (target === arrow){

            //move to about about section with animation
            let coords = getYCoords(header) + header.getBoundingClientRect().height;
            $('html, body').animate({scrollTop: coords});
            event.stopPropagation();
        }
    }
});

//Scrolling with the menu items

//substract id of the section

let regex = /(#[0-9a-zA-Z-]+)$/;

$('.menu-item').each(function(){

   $(this).on('click', function(event){

    //prevent moving to the anchor
    event.preventDefault();

    let id = this.href.match(regex)[0];

    let coords = getYCoords($(id)[0]);

    if (id === '#about'){
        
        coords -= header.getBoundingClientRect().height;
    }

    //close menu after clicking on menu item
    $(menuIcon).trigger('click');

    //animate scrolling
    $('html, body').animate({
        scrollTop: coords,
    }, {
        duration: 1000,
    });

    event.stopPropagation();
   })
})
