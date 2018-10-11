var directionSlider, productSlider, maxOpened = 0;

$(document).ready(function() {
  $('#fullpage').fullpage({
    //options here
    autoScrolling:true,
    scrollHorizontally: true,
    menu: '#menu',
    fixedElements: '#menu, #header, #footer, .mail, .share',
    licenseKey: 'OPEN-SOURCE-GPLV3-LICENSE',
    anchors:['main', 'about', 'news', 'product', 'directions', 'contacts'],

    onLeave: function(origin, destination, direction) {

      // Hide SAFMAR logo
      if (!destination.isFirst) {
        $('#footer').find('a').animate({opacity: 0}, 500, function() { $('#footer').find('a').css({display: 'none'}); });
      } else {
        $('#footer').find('a').css({display: 'block'}).animate({opacity: 1}, 500);
      }


      if (destination.index == 1) {
        if (maxOpened < 1) {
          maxOpened = 1;
        }
      }

      // Directions section
      if (destination.index == 4) {

        if (maxOpened < 4) {
          directionSlider.autoplay.start();
          maxOpened = 4;
        }
      }

      // Team section
      
      if (destination.index == 5) {
        if (maxOpened < 5) {
          startTeamAnimation();
          maxOpened = 5;
        }
      }


      // Disable scroll on last slide
      if (destination.isLast) {
        //$.fn.fullpage.setAllowScrolling(false);
      }
    }
  });


  productSlider = new Swiper('#section-product__slider', {
      speed: 400,
      spaceBetween: 100,
      slidesPerView: 3,
      grabCursor: false,
      allowTouchMove: false
  });

  directionSlider = new Swiper('#section-direction__slider', {
      speed: 400,
      spaceBetween: 100,
      slidesPerView: 1,
      grabCursor: false,
      autoplay: {
        delay: 5000,
        stopOnLastSlide: true
      },
      on: {
        init: function () {
          var paginationContainer = $('#section-direction__slider').find('.swiper-pagination');
          paginationContainer.append('<div class="swiper-pagination-line"></div><div class="swiper-pagination-underline"></div>');
          var pc = 100 / (this.slides.length - 1);
          for(var i = 0; i < this.slides.length; i++) {
            var percent = i * pc;
            percent = percent < 100 ? percent : 99.5;
            paginationContainer.append('<div class="pagination-point" data-slide="' + i + '" style="left:' + percent + '%"></div>')
          }
          $('.pagination-point').on('click', function() {
            disableAutoplay();
            directionSlider.slideTo($(this).data('slide'));
          });
        },
        autoplay: function () {
          var pc = 100 / (this.slides.length -1);
          var percent = (this.activeIndex + 1) * pc;
          percent = percent > 100 ? 100 : percent;
          var line = $('#section-direction__slider').find('.swiper-pagination-line');
          line.animate({width: percent + '%'}, 5000);
        },
      },
      pagination: {
        el: '.swiper-pagination',
        type: 'custom',
      }
  });

  function disableAutoplay() {
    var line1 = $('#section-direction__slider').find('.swiper-pagination-line');
    line1.finish();
    directionSlider.off('sliderMove');

    directionSlider.off('slideChange').on('slideChange', function() {
      var pc = 100 / (this.slides.length -1);
      var percent = this.activeIndex * pc;
      percent = percent > 100 ? 100 : percent;
      var line = $('#section-direction__slider').find('.swiper-pagination-line');
      line.animate({width: percent + '%'}, 200);
    });
    directionSlider.autoplay.stop();
  }

  directionSlider.autoplay.stop();

  directionSlider.on('autoplayStart', function() {
    var pc = 100 / (this.slides.length -1);
    var percent = (this.activeIndex + 1) * pc + '%';
    var line = $('#section-direction__slider').find('.swiper-pagination-line');
    line.animate({width: percent}, 5000);
  });

  directionSlider.on('sliderMove', function() {
    disableAutoplay();
  });


  $('.mail').on('click', function() {
    $('.mail-hidden').css({display:'block'}).animate({opacity: 1}, 200);
    $.fn.fullpage.setAllowScrolling(false);
    startWritetousAnimation();
  });

  $('.mail-hidden__close').on('click', function() {
    $('.mail-hidden').animate({opacity: 0}, 200, function() {
      $('.mail-hidden').css({display:'none'})
    });
    $.fn.fullpage.setAllowScrolling(true);
    restoreWritetousAnimation();
  });

  $('.menu').on('click', function() {
    $('.menu-hidden').css({display:'block'}).animate({opacity: 1}, 200);
    $.fn.fullpage.setAllowScrolling(false);
    startMenuAnimation();
  });

  $('.menu-hidden__close').on('click', function() {
    $('.menu-hidden').animate({opacity: 0}, 200, function() {
      $('.menu-hidden').css({display:'none'})
    });
    $.fn.fullpage.setAllowScrolling(true);
    restoreMenuAnimation();
  });

  $('.menu-hidden__items').on('click', function() {
    $('.menu-hidden__close').click();
  });


  function startTeamAnimation() {
    $('#section-team-red').animate({ opacity: 1}, 1500, 
        function() {
          $('#section-team-red').find('[style]').each(function(index, item) {
            $(item).animate({opacity:1}, 800 * (index + 1) + 500);
          });

          $('#section-team-black').delay(2000).animate({opacity: 1}, 1500, function() {
            $('#section-team-black').find('[style]').each(function(index1, item1) {
              $(item1).animate({opacity:1}, 800 * (index1 + 1) + 500);
            });
          });
        }
      )
  }

  function startMenuAnimation() {
    $('#header').css({opacity: 0.4, 'pointer-events': 'none'});
    $('#footer').css({opacity: 0.4, 'pointer-events': 'none'});
  }

  function restoreMenuAnimation() {
    $('#header').removeAttr('style');
    $('#footer').removeAttr('style');
  }

  function startWritetousAnimation() {
    var els = $('#write-to-us').find('.js-animate-show-input');
    var inputs = $('#write-to-us').find('.js-animate-show-input input');
    inputs.css({bottom: '-50px'});
    els.find('.input-holder-line').css({width: 0});

    els.each(function(index, item) {
      $(item).find('input').animate({bottom: 0}, 200 * (index + 1)*2);
      $(item).find('.input-holder-line').animate({width: '100%'}, 200 * (index + 1)*2);
    });

    var textarea = $('#write-to-us').find('.js-animate-show-textarea');
    var submit = $('#write-to-us').find('.js-animate-show-submit');
    textarea.removeClass('animated-top');
    setTimeout(function() {
      submit.removeClass('animated-top');
    }, 200)
  }

  function restoreWritetousAnimation() {
    var textarea = $('#write-to-us').find('.js-animate-show-textarea');
    var submit = $('#write-to-us').find('.js-animate-show-submit');

    setTimeout(function() {
      textarea.addClass('animated-top');
      submit.addClass('animated-top');
    }, 500);

  }

  //methods
  //$.fn.fullpage.setAllowScrolling(false);
});