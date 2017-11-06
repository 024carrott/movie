(function(global){
  'use strict';


  var banner, banner_content, banner_rating, main_content; 

  function init() {
    banner = document.querySelector('.main-banner');
    banner_content = document.querySelector('.main-banner-content');
    banner_rating = document.querySelector('.main-banner-rating');
    main_content = document.querySelector('.main-content');

    var banner_height = parseInt(getStyleObject(banner).height);
    main_content.style.top = banner_height + 'px';
    
    bind();
  }

  function bind() {
    var wheel_support = 'onwheel' in window ? 'wheel' : document.onmousewheel !== undefined ? 'mousewheel' : 'DOMMouseScroll';


    var banner_height = parseInt(getStyleObject(banner).height),
        banner_content_opacity = parseInt(getStyleObject(banner_content).opacity),
        banner_rating_opacity = parseInt(getStyleObject(banner_rating).opacity);

    var opacity_depth = (1 / (banner_height)),
        total_opacity = 1;

    var wheel_direction = false;

    window.addEventListener('scroll', function() {
      var scrollY = getScrollTop();
      if( scrollY === 0 ) {
        total_opacity = 1;
        banner_content.style.opacity = 1;
        banner_rating.style.opacity = 1;
        return;
      }
      if( scrollY < (banner_height / 4) && scrollY > 0 ) {
        if( wheel_direction ) {
          total_opacity -= (opacity_depth * 10);
        } else {
          total_opacity += (opacity_depth * 10);
        }

        if( total_opacity < 0 ) {
          total_opacity = 0;
        } else if ( total_opacity >= 1 ) {
          total_opacity = 1;
        }
        global.setTimeout(function() {
          banner_content.style.opacity = total_opacity;
          banner_rating.style.opacity = total_opacity;
        }, 10);

      } 

    });
    window.addEventListener(wheel_support, function(e) {
      if( e.wheelDelta < 0 ) {
        // down
        wheel_direction = true;
      } else {
        // up
        wheel_direction = false;
      }
    });
  }
  /**
   * @func getScrollTop
   * @description 현재 스크롤의 Y축 정보를 받아오는 함수.
   */
  function getScrollTop() {
    return  (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  }

  function getStyleObject(dom) {
    return global.getComputedStyle(dom);
  }
  init();
}(window));