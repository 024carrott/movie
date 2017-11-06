(function (global, $, Movie) {
  'use strict';
  
  var btn = document.querySelector('.modal-close-btn');
  var modal = document.querySelector('.modal');
  
  function init() {

    bind();
    closeModal();
    setRenderList();
  }

  function bind() {
    // var section_movie_list = document.querySelector('.section-movie-list'),
    // search_list = document.querySelector('.search_list_result');

    // console.log('movie-list:', section_movie_list);
        
    

  }

  function closeModal() {
    $(btn).on('click', function(e){
      console.log('click');
      $(modal).addClass('none');
    })
  }

  function setRenderList() {
    setTimeout(function() {
      // var movie_data = Movie.getMovieData();
      // console.log(movie_data);
      // var list_data = search.getMovieList();
      // console.log('list_data!!:', list_data);
     

   
      
      // render(data);
    }, 2000);  
  }
  function render(data) {

    var modal_poster = document.querySelector('.modal-poster'),
        modal_contents = document.querySelector('.modal-contents');
    // createElements
    var modal_img = document.createElement('img'),
        modal_h4 = document.createElement('h4'),
        modal_year = document.createElement('span'),
        modal_genre = document.createElement('span'),
        modal_summary = document.createElement('p');
    
    // setAttribute
    modal_img.setAttribute('src', 'data.medium_cover_image');
    modal_h4.setAttribute('class', 'modal-title');
    modal_year.setAttribute('class', 'modal-year');
    modal_genre.setAttribute('class', 'modal-genre');
    modal_summary.setAttribute('class', 'modal-summary');

    // 데이터 추가
    modal_h4.innerText = data.title;
    modal_year.innerText = data.year;
    // modal_genre.
    
    // append
    modal_poster.appendChild(modal_img);
    modal_contents.appendChild(modal_h4);
    modal_contents.appendChild(modal_year);
    modal_contents.appendChild(modal_genre);

    console.log('h4:', modal_h4);
    console.log('year:', modal_year);
    console.log('genre:', modal_genre);
    console.log('summary:', modal_summary);
 
  }

  

  init();
})(window, window.jQuery, window.Movie);