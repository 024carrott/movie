(function (global, $, Movie) {
  'use strict';
  
 
  var modal_container = document.querySelector('.modal-container');
  // modal_contents = document.querySelector('.modal-contents');

  // var img_url = Movie.getSmallImgUrl(poster_path);
  var large_img_url = 'https://image.tmdb.org/t/p/w500',
  small_img_url = 'https://image.tmdb.org/t/p/w342';

 

  
  // createElements
  var modal_contents = document.createElement('figcaption'),
  modal_img = document.createElement('img'),
  modal_h4 = document.createElement('h4'),
  // modal_year = document.createElement('span'),
  modal_genre = document.createElement('span'),
  modal_summary = document.createElement('p');
  
  // append
  modal_container.appendChild(modal_img);
  modal_container.appendChild(modal_contents);
  modal_contents.appendChild(modal_h4);
  // modal_contents.appendChild(modal_year);
  modal_contents.appendChild(modal_genre);
  modal_contents.appendChild(modal_summary);
  function render(data) {
    console.log('모달 데이터 전송');
    var genre = data.genre_ids;
    var movie_genre = [];
    console.log(movie_genre);
    
    console.log('genre:', genre)
    for(var i = 0; i < genre.length; i++) {
      // genre = genre[i];
      
      movie_genre = Movie.getGenre(genre[i])
      console.log('movie_genre:', movie_genre);
    }
    // var movie_genre = Movie.getGenre();
    
    // setAttribute
    modal_contents.setAttribute('class', 'modal-contents');
    modal_img.setAttribute('src', small_img_url + data.poster_path);
    modal_img.setAttribute('class', 'modal-poster');
    modal_h4.setAttribute('class', 'modal-title');
    // modal_year.setAttribute('class', 'modal-year');
    modal_genre.setAttribute('class', 'modal-genre');
    modal_summary.setAttribute('class', 'modal-summary');

    // 데이터 추가
    modal_h4.innerText = data.title;
    // modal_year.innerText = data.year;
    modal_genre.innerText = movie_genre;
    modal_summary.innerText = data.overview;
    // modal_genre.
    

    console.log('h4:', modal_h4);
    // console.log('year:', modal_year);
    console.log('genre:', modal_genre);
    console.log('summary:', modal_summary);

    
    closeModal();
  }
  function closeModal () {
    var btn = document.querySelector('.modal-close-btn');
    var modal = document.querySelector('.modal');

    btn.addEventListener('click', function(e) {
      console.log('click');
      $(modal).addClass('none');
    })
  }
  function removeRenderItem() {

  };



  global.Modal = render;

  
})(window, window.jQuery, window.Movie);