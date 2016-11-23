/* ==================================================
    Smooth Scrolling Javascript
================================================== */

$(document).ready(function(){   
    /** 
     * This part does the "fixed navigation after scroll" functionality
     * We use the jQuery function scroll() to recalculate our variables as the 
     * page is scrolled.
     */
    function NavStick() {
        var windowWidth = $(window).width(); // get the width of the window
        var window_top = $(window).scrollTop() + 12; // the "12" should equal the margin-top value for nav.stick
        var div_top = $('#nav-anchor').offset().top;
            if (window_top > div_top) {
                $('nav').addClass('stick');
                if (windowWidth < 768) {
                    $('#content').css('margin-top','240px');
                }
            } else {
                $('nav').removeClass('stick');
                if (windowWidth < 768) {
                    $('#content').css('margin-top','0');
                }
            }
    };
     
    /**
     * This part causes smooth scrolling using jQuery and Native Smooth Scroll.
     */
    $('a[href^="#"]').on('click', function(event) {
        var target = $(this.getAttribute('href'));
        if( target.length ) {
            event.preventDefault();
            $('html, body').stop().animate({
                scrollTop: target.offset().top
            }, 1000);
        }
    });
       
    /**
     * This part handles the highlighting functionality.
     * We use the scroll functionality again for adding 
     * and removing classes, and conditional testing.
     */ 
    var aChildren = $("nav li").children(); // find the a children of the list items
    var aArray = []; // create the empty aArray
    for (var i = 0; i < aChildren.length; i++) {    
        var aChild = aChildren[i];
        var ahref = $(aChild).attr('href');
        aArray.push(ahref);
    } // this for loop fills the aArray with attribute href values

    function NavPosition() {
        var windowPos = $(window).scrollTop(); // get the offset of the window from the top of page
        var windowHeight = $(window).height(); // get the height of the window
        var docHeight = $(document).height();
        
        for (var i = 0; i < aArray.length; i++) {
            var theID = aArray[i];
            var divPos = $(theID).offset().top; // get the offset of the div from the top of page
            var divHeight = $(theID).height(); // get the height of the div in question
            if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
                $("a[href='" + theID + "']").parent().addClass("nav-active");
            } else {
                $("a[href='" + theID + "']").parent().removeClass("nav-active");
            }
        }
        
        if(windowPos + windowHeight == docHeight) {
            if (!$("nav li:last-child a").parent().hasClass("nav-active")) {
                var navActiveCurrent = $(".nav-active").attr("href");
                $("a").parent().removeClass("nav-active");
                $("nav li:last-child a").parent().addClass("nav-active");
            }
        }
    };

    $(window).on('load scroll resize', function() {
      NavStick();
      NavPosition();
    });      
});