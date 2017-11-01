(function (global) {
  'use strict';
  
  var btn = document.querySelector('.search-btn');

  function init() {
    btn.click(function(e){
      console.log('클릭');
    })
  }
  init();
})(window);