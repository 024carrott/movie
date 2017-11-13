(function(global){
  'use strict';


  var banner, banner_content, banner_rating, main_content; 

  var total_opacity = 0, banner_height = 0, opacity_depth = 0;
  

  function init() {
    banner = document.querySelector('.main-banner');
    banner_content = document.querySelector('.main-banner-content');
    banner_rating = document.querySelector('.main-banner-rating');
    main_content = document.querySelector('.main-content');

    total_opacity = 1;
    banner_height = parseInt(getStyleObject(banner).height);
    opacity_depth = (1 / (banner_height));

    setContentOffsetTop();

    bind();
  }

  function bind() {
    var wheel_support = 'onwheel' in window ? 'wheel' : document.onmousewheel !== undefined ? 'mousewheel' : 'DOMMouseScroll';
    var prev_scrollY = 0;

    window.addEventListener('scroll', function() {
      var scrollY = getScrollTop();
      
      setBannerContentStyle(scrollY, prev_scrollY);
      prev_scrollY = scrollY;
    });
    
    window.addEventListener('touchmove', function(e) {
      var touch_scrollY = getScrollTop();

      setBannerContentStyle(touch_scrollY, prev_scrollY);
      prev_scrollY = touch_scrollY;
    });

    window.addEventListener('resize', setContentOffsetTop);

  }

  /**
   * @func setBannerContentStyle
   * @description 배너의 opacity 부분을 처리해주는 함수.
   */ 
  function setBannerContentStyle(scrollY, prev_scrollY) {
    if( scrollY === 0 ) {
      total_opacity = 1;
      banner_content.style.opacity = 1;
      banner_rating.style.opacity = 1;
      return;
    }
    if( scrollY < banner_height && scrollY > 0 ) {
      if( prev_scrollY < scrollY ) {
        total_opacity -= (opacity_depth * 10);
      } else if( prev_scrollY > scrollY ) {
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
  }
  
  /**
   * @func setContentOffsetTop
   * @description 배너의 높이를 가져와 content의 style의 marginTop속성에 추가시키는 함수. 
   */ 
  function setContentOffsetTop() {
    var banner_height = parseInt(getStyleObject(banner).height);
    main_content.style.marginTop = banner_height + 'px';
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