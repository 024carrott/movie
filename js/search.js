(function (global, Movie, Modal, $) {
  'use strict';
  
  var search_list_wrap = null;
  var search = null;
  var search_btn = null;
  var logo = null;
  var html = null;
  
  var search_bar_isClicked_flag = false,
      search_bar_actived = false,
      logo_display = false;

  function init() {
    search_list_wrap = $('.search-list-wrap');
    search = $('.header-search-bar');
    search_btn = document.querySelector('.header-search-btn');
    logo = $('.wrapper h2');
    html = document.querySelector('html');

    isSearchBarClicked();
    bind();
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
    });

    search_btn.addEventListener('click', function(e) {
      setSearchBarStyle(e);
    });
    search_btn.addEventListener('keypress', function(e) {
      if( e.charCode === 13 ) {
        setSearchBarStyle(e);
        search.focus();
      }
    });


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
    window.addEventListener('resize', isSearchBarClicked);

  }

  function isSearchBarClicked() {
    var browser_width = window.innerWidth;
  
    if( browser_width < 512 ) {
      logo_display = true;
    } else {
      logo_display = false;
    }
    console.log('search_bar_isClicked_flag: ', search_bar_isClicked_flag);
  }

  function setSearchBarStyle(e) {

    if( !search_bar_actived ) {
      // 로고가 사라지고 search의 크기가 늘어나야하는 상태
      
      if( logo_display ) { 
        
        logo.css({
          display: 'none'
        });
      }
      search.css({
        border: '1px solid #fff'
      });

      search.animate({ 
        width: 200 + 'px',
        padding: '5px 7px' 
      }, 200);
      
      search_bar_actived = true;
    } else {
      
      search.animate({ 
        width: 0 + 'px',
        padding: '0'
      }, 200);
      
      if( logo_display ) {

        logo.css({
          display: 'block'
        });
      }
      search.css({
        border: '0 none'
      });
      search_bar_actived = false;
    }
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
})(window, window.Movie, window.Modal, window.jQuery);
