(function (global, Movie, Modal) {
  'use strict';
  
  var search_list_wrap = $('.search-list-wrap');
  var html = document.querySelector('html');
  var search_btn = document.querySelector('.header-search-btn');
  var logo = document.querySelector('.logo');
  var width = window.innerWidth;
  
  
  
  console.log(search_list_wrap)
  function init() {
    var search = $('.header-search-bar');
    inputAnimation();
  

    
    bind();
    // setLenderList();
    // render();
  }

  // enter 을 눌렀을 때
  function bind() {
    window.search.addEventListener('keypress', function(e){
      if(e.target.value !== '' && e.charCode === 13){
        Movie.loadSearchData(Movie.getSearchUrl() + e.target.value);
        // Movie.getSearch_url();
        console.log(e.target.value);

        setRenderList();
      }
    })
    html.addEventListener('click', function(e) {
      if( e.target.getAttribute('class') === 'search-item' ) {
        console.log(e.target);
        return;
      };
      if( e.target.getAttribute('class') === 'modal-close-btn' ) {
        return;
      }
      removeRenderItem();
    });

    $(window).resize(function(e) {
      inputAnimation();  
    })


  }
  
  // function inputAnimation() {
  //   width = window.innerWidth;
  //   console.log(width);

  //   if( width < 426 ) {
  //     console.log('실행');
  //     var clicked = 0;
  //     search_btn.addEventListener('click', function(e) {
  //       clicked = clicked + 1
  //       if(clicked === 0 || clicked % 2 === 0) {
  //         $(search).animate({ width: 0 + 'px'}, 300);
  //         setTimeout(function() {
  //           $(search).css({
  //             'opacity': '0'
  //           }); 
  //           $(logo).removeClass('none');
  //         }, 310);
  //       }else {
  //         $(search).animate({ width: 230 + 'px'}, 300);
  //         $(search).css({
  //           'opacity': '1'
  //         });
  //         $(logo).addClass('none');
  //       }
  //     })
  //   }else {
  //     console.log('실행x');
  //   }
  // }


  function inputAnimation() {
    width = window.innerWidth;
    var clicked = 0;

    search_btn.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      clicked = clicked + 1
      if(width < 426) {
        console.log('실행');
        if(clicked === 0 || clicked % 2 === 0) {
          // $(search).animate({ width: 0 + 'px'}, 100);
          $(search).animate({ width: 0 + 'px', opacity: 0, padding: 5 + 'px ' + 0 + 'px'  }, 200);
          $(logo).delay(300).animate({ opacity: 1 }, 200);
        }else {
          // $(search).animate({ width: 230 + 'px'}, 300);
          $(search).delay(300).animate({ width: 230 + 'px', opacity: 1, padding: 5 + 'px ' + 7 + 'px' }, 200);
          $(logo).delay(300).animate({ opacity: 0 }, 200);
        }
      }else {
        console.log('실행x');        
      }
    })
  }
  
  

  function setRenderList() {
    global.setTimeout(function() {
      var search_data = Movie.getSearchData();
      // console.log(search_data);
      removeRenderItem();
      for(var i = 0, len = search_data.length; i< len; i++) {
        var data = search_data[i];
        // console.log('확인:', data); 
      
        render(data, i);
      }
    }, 2000)
  }

  function render(data, index) {
    
    var ul = document.querySelector('.search-list-wrap');
    var a = document.createElement('a');   
    var li = document.createElement('li');
    var title = data.title;
    var list_data = [];
    var modal = document.querySelector('.modal');    
    // li.setAttribute('data-index', index);
    // li.setAttribute('class','search-list-result');
    a.setAttribute('class', 'search-item');
    // console.log('render-title', title);
    a.innerText = title;
    ul.appendChild(li);
    li.appendChild(a);
    li.addEventListener('click', function(e) {

      list_data = data;
      // console.log('클릭 리스트 데이터',list_data);
      $(modal).removeClass('none')
      Modal(list_data);

    })  
  }

  function removeRenderItem() {
    var parent = document.querySelector('.search-list-wrap');
    // console.log('parent: ', parent);
    var children = parent.childNodes;
    // console.log('children: ', children);
    if ( typeof children === 'undefined' ){
      // console.log('undefined');
      return;
    }
    var length = children.length;
    // console.log('children', children);
    if( length === 0) {
      // console.log('length');
      return;
    }


    for(var i = 0; i < length; i++) {
      var child = children[0];

      // console.log('child: ', child);
      // console.log('length: ', length);
      // console.log('index: ', i);
      console.log('remove', parent.removeChild(child));
    }
    
  }
  

  init();
})(window, window.Movie, window.Modal);
