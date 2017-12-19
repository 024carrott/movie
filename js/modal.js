(function (global, $, Movie) {
  'use strict';
  
 
  var modal_container = document.querySelector('.modal-container');
  // modal_contents = document.querySelector('.modal-contents');

  // var large_img_url = 'https://image.tmdb.org/t/p/w500',
  // small_img_url = 'https://image.tmdb.org/t/p/w342';
  
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
      movie_genre = Movie.getGenre(genre[i])
      console.log('movie_genre:', movie_genre);
    }
   
    // poster-img url
    var small_img_url = Movie.getSmallImgUrl(data.poster_path);
    console.log('poster_url:', small_img_url);


    // setAttribute
    modal_contents.setAttribute('class', 'modal-contents');
    modal_img.setAttribute('src', small_img_url);
    modal_img.setAttribute('class', 'modal-poster');
    modal_h4.setAttribute('class', 'modal-title');
    // modal_year.setAttribute('class', 'modal-year');
    modal_genre.setAttribute('class', 'modal-genre');
    modal_summary.setAttribute('class', 'modal-summary');

    // 데이터 추가
    modal_h4.innerText = data.title;
    // modal_year.innerText = data.year;
    modal_genre.innerText = movie_genre;

    if(data.overview === '') {
      modal_summary.innerText = '줄거리 없음.';
    }else {
      modal_summary.innerText = data.overview;
    }
    // modal_genre.
    

    console.log('h4:', modal_h4);
    // console.log('year:', modal_year);
    console.log('genre:', modal_genre);
    console.log('summary:', modal_summary);

    
    closeModal();

    
  }
  function closeModal () {
    var modal_wrap = document.querySelector('.modal-wrap');
    var btn = document.querySelector('.modal-close-btn');
    var main_inner = document.querySelector('.main-inner');

    btn.addEventListener('click', function(e) {
      console.log('click');
      $(modal_wrap).addClass('none');
      $(main_inner).removeClass('dim');
    })
  }




  global.Modal = render;

  
})(window, window.jQuery, window.Movie);