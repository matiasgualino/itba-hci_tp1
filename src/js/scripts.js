jQuery(function ($) {
	
    $('.dropdown-link').click(function(){ 
        
        $(this).parent('li').toggleClass('open');
         
        
        });
	
		
		
	$('.dropdown-icon').click(function(){ 
		
		$(this).parent('li').toggleClass('open');
		 
		
		});
	
	
	$('.srchl').toggle('normal');
    /*
| ----------------------------------------------------------------------------------
| animate elements when they are in viewport
| ----------------------------------------------------------------------------------
*/
    $('.noIE .animated').waypoint(function () {
        var animation = $(this).data('animation');
        $(this).addClass('animation-done').addClass(animation);
    }, {
        triggerOnce: true,
        offset: '50%'
    });
    /*
| ----------------------------------------------------------------------------------
| Responsive multi level menu
| Credits goes to: https://github.com/codrops/ResponsiveMultiLevelMenu
| Licensed under the MIT License
| ----------------------------------------------------------------------------------
*/
    jQuery('#dl-menu ul ul').addClass('dl-submenu');
    jQuery('#dl-menu').dlmenu();
    jQuery(".sf-menu li.item").hover(
        function () {
            jQuery(this).children('a').addClass('hover');
        },
        function () {
            jQuery(this).children('a').removeClass('hover');
        }
    );
    /*
| ----------------------------------------------------------------------------------
| Qty
| ----------------------------------------------------------------------------------
*/
    jQuery(".input-qty-box a").click(function () {
        var inputEl = jQuery(this).parent().parent().children().next().children();
        var qty = inputEl.val();
        if (jQuery(this).parent().hasClass("plus"))
            qty++;
        else
            qty--;
        if (qty < 1)
            qty = 1;
        inputEl.val(qty);
    })
    /*
| ----------------------------------------------------------------------------------
| Animate the scroll to top
| ----------------------------------------------------------------------------------
*/
    $('.backtotop').click(function (event) {
        event.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 300);
    });
    /*
| ----------------------------------------------------------------------------------
| Pretty photo setting
| ----------------------------------------------------------------------------------
*/
    $(".fa-search-btn").prettyPhoto();
    $(".more-views a").prettyPhoto();
	    $("#wrap a").prettyPhoto();
    /*
| ----------------------------------------------------------------------------------
| Initialize carousel
| ----------------------------------------------------------------------------------
*/
    $('.slides').bxSlider();
    var WidthCarousel = $(window).width();
    if (WidthCarousel > 800) {
        $('.bxslider3').bxSlider({
            slideWidth: 270,
            minSlides: 3,
            maxSlides: 3,
            slideMargin: 18,
            speed: 2000
        });
    } else {
        $('.bxslider').bxSlider({});
        $('.bxslider3').bxSlider({});
    }
    /*
| ----------------------------------------------------------------------------------
| Range slider
| ----------------------------------------------------------------------------------
*/
    $('.range-slider').each(function () {
        var $this = $(this),
            configs = new Array();
        configs['min'] = ($this.data('min') === undefined) ? 0 : $this.data('min');
        configs['max'] = ($this.data('max') === undefined) ? 100 : $this.data('max');
        configs['start'] = ($this.data('start') === undefined) ? [20, 80] : $this.data('start');
        configs['step'] = ($this.data('step') === undefined) ? 1 : $this.data('step');
        var percentage = {
            to: function (range, value) {
                value = range[0] < 0 ? value + Math.abs(range[0]) : value - range[0];
                return (value * 100) / this._length(range);
            },
            _length: function (range) {
                return (range[0] > range[1] ? range[0] - range[1] : range[1] - range[0]);
            }
        }
        $this.noUiSlider({
            range: [configs['min'], configs['max']],
            start: configs['start'],
            step: configs['step'],
            slide: function () {
                var values = $(this).val(),
                    range = $this.data('setup').settings.range;
                $this.siblings('.range-slider-value').find('> .min').text('$' + values[0]).css({
                    'left': percentage.to(range, values[0]) + '%',
                    'visibility': 'visible',
                    'margin-left': (-0.6) * $this.siblings('.range-slider-value').find('> .min').outerWidth()
                });
                $this.siblings('.range-slider-value').find('> .max').text('$' + values[1]).css({
                    'left': percentage.to(range, values[1]) + '%',
                    'visibility': 'visible',
                    'margin-left': (-0.6) * $this.siblings('.range-slider-value').find('> .max').outerWidth()
                });
            }
        });
        var settings = $this.data('setup').settings;
        $this.siblings('.range-slider-value').find('> .min').text('$' + settings.start[0]).css({
            'left': percentage.to(settings.range, settings.start[0]) + '%',
            'visibility': 'visible',
            'margin-left': (-0.6) * $this.siblings('.range-slider-value').find('> .min').outerWidth()
        });
        $this.siblings('.range-slider-value').find('> .max').text('$' + settings.start[1]).css({
            'left': percentage.to(settings.range, settings.start[1]) + '%',
            'visibility': 'visible',
            'margin-left': (-0.6) * $this.siblings('.range-slider-value').find('> .max').outerWidth()
        });
    });
    /*
| ----------------------------------------------------------------------------------
| Checkout Accordion
| ----------------------------------------------------------------------------------
*/
    jQuery(".step-title").click(function () {
        jQuery(this).next().toggle('slow');
    });
});