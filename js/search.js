(function (global, Movie) {
  'use strict';
  
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
  }

  function setRenderList() {
    global.setTimeout(function() {
      var search_data = Movie.getSearchData();
      console.log(search_data);
      // search_data=[];
      for(var i = 0, len = search_data.length; i< len; i++) {
        var data = search_data[i];
        console.log('확인:', data); 
      
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
      li.setAttribute('data-index', index);
      li.setAttribute('class','search-list-result');
      console.log('render-data', data);
      console.log('render-title', title);
      a.innerText = title;
      ul.appendChild(li);
      li.appendChild(a);
      li.addEventListener('click', function(e) {
        console.log(index);
      })    
  }
  

  init();
})(window, window.Movie);
