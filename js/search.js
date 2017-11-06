(function (global, Movie, Modal) {
  'use strict';
  
  var search_list_wrap = $('.search-list-wrap');
  var html = document.querySelector('html');
  
  console.log(search_list_wrap)
  function init() {
    var search = $('.header-search-bar');

    
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
      var a = document.querySelector('.search-item');
      if( e.target.getAttribute('class') === 'search-item' ) {
        console.log(e.target);
        return;
      }
      removeRenderItem();
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
