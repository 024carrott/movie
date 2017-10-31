(function (global) {
  'use strict';
  
//   $('.skip a').on('focus', function(){
//     $(this).stop().animate({"top":0, "opacity":1});
// });
// $('.skip a').on('click', function(){
//     $(this).stop().animate({"top":"-30px", "opacity":0});
// });
// $('.skip a').on('focusout', function(){
//     $(this).stop().animate({"top":"-30px", "opacity":0});
// });

  $('.skip a').on('focus', function(){
    console.log("focus");
    $(this).animate({"top": 0});
  })

})(window);