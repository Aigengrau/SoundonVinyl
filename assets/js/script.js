// OS
$(document).ready(function() {
	//var wHeight = $(document).height();
	//var bHeight = wHeight - $(window).height();
	// Show or hide the sticky footer button 
	$(window).scroll(function() {

        if ($(this).scrollTop() > 200) {
            $('.go-top').fadeIn(200);
        } else {
            $('.go-top').fadeOut(200);
        }
        //if ($(this).scrollTop() == bHeight) {
            //$('.go-bottom').fadeOut(200);
        //} else {
            //$('.go-bottom').fadeIn(200);
        //}
        
        if ($(this).scrollTop() > 230) {
            $(".border-left, .border-right, .slider, .slider-svg").css({
                'visibility' : 'hidden'
            });
        } else {
            $(".border-left, .border-right, .slider, .slider-svg").css({
                'visibility' : 'visible'
            });   
        }
        
	});
    
	// Animate the scroll to top
	$('.go-top').click(function(event) {
		event.preventDefault();
		$('html, body').animate({scrollTop: 0}, 300);
	})
	// Animate the scroll to bottom
	//$('.go-bottom').click(function(event) {
		//event.preventDefault();
		//$('html, body').animate({scrollTop: wHeight}, 300);
	//})

    $('.menu-mobile i').click(function() {
		$('.menu-mobile ul').slideToggle(300);
	})
    
    
    function borderwidth() {
        var lw = $('.top-container').css('margin-left');
        var rw = $('.top-container').css('margin-right');
        $('.border-left').width(lw);
        $('.border-right').width(rw);
    };
    borderwidth();
    $(window).resize(function() {
        borderwidth();
    });
    
    $('.mod-news2 .article').hover(
        function() {
          $(this).find('.article-img-black').fadeOut(300);
          $(this).find('.article-date').animate({color: '#fff', backgroundColor:'#e5c585', borderColor:'#e5c585'}, 150);
          $(this).find('i').animate({color: '#cd972b;'}, 150);
        },
        function() {
          $(this).find('.article-img-black').fadeIn(300);
          $(this).find('.article-date').animate({color: '#3e3e3e', backgroundColor: 'transparent', borderColor: '#cdcdcd'}, 150);
          $(this).find('i').animate({color: '#717171;'}, 150);
    });
    
    // logo slogan animation
    var time = 2000
    var cTime = 800;
    setTimeout(logoSloganFrame2, time);
    function logoSloganFrame2() {
        $('.logo .slogan .frame1 span').animate({opacity: 0}, cTime);
        $('.logo .slogan .frame2 span').animate({opacity: 1}, cTime);
         setTimeout(logoSloganFrame1, time);
    }
    function logoSloganFrame1() {
        $('.logo .slogan .frame2 span').animate({opacity: 0}, cTime);
        $('.logo .slogan .frame1 span').animate({opacity: 1}, cTime);
        setTimeout(logoSloganFrame2, time);
    }
    // logo slogan animation
});

$(".content-madia a").fancybox({
    prevEffect	: 'elastic',
    nextEffect	: 'elastic',
    helpers	: {
        title	: {
            type: 'outside'
        },
        thumbs	: {
            width	: 50,
            height	: 50
        }
    }
});

function menu() {
    if ($(window).scrollTop() > 190) {
        $(".menu").css({
            'top' : '0',
            'position' : 'fixed'
        });
    } else {
        $(".menu").css({
            'top' : '190px',
            'position' : 'absolute'
        });   
    }
}

function tryFormSubmit() {
// проверяем валидность ввода данных
    var res = true,	// результат вовзрата по умолчанию
    f = this;	// контекст поиска полей в форме
    $('.req', f).removeClass('need-req');
    $('.req', f).each(function(index) {
        if(res && (
        $.trim($(this).val()) == '' || ($(this).hasClass('mail') && !$(this).val().match(/^[\+A-Za-z0-9][\+A-Za-z0-9\._-]*[\+A-Za-z0-9_]*@([A-Za-z0-9]+([A-Za-z0-9-]*[A-Za-z0-9]+)*\.)+[A-Za-z]+$/))
        )) {
            $(this).addClass('need-req').get(0).select();
            setTimeout(
                function() { 
                    $('.req', f).removeClass('need-req'); },3000);
            res = false;
            }
    });
    return res;
}