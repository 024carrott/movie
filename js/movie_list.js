(function(global, Movie){
  'use strict';

  var target = null, loading = null;
  var render_flag = false;
  var category = 'trending';

  function init() {
    target = document.querySelector('.section-movie-list > ul');
    loading = document.querySelector('.movie-list-loading');
    Movie.setMovieData(category);
    setRenderList();    
    bind();
  }


  function bind() {
    window.addEventListener('scroll', function() {
      var scrollTop = getScrollTop(),
          window_height = window.innerHeight,
          document_height = document.body.clientHeight;

          // console.log(document_height)
      if( scrollTop + window_height > document_height - 300 ) {
        if(render_flag) {
          console.log('로딩중입니다.');
          return;
        }

        Movie.setMovieData(category);
        setRenderList();
      }
    });
  }

  function getScrollTop() {
    return  (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  }
  function startLoading() {
    loading.style.display = 'block';
  }
  function stopLoading() {
    loading.style.display = 'none';
  }

  function setRenderList() {

    // if(render_flag) {
    //   console.log('로딩중입니다.');
    //   return;
    // }

    render_flag = true;
    startLoading();

    global.setTimeout(function() {
      var movies = Movie.getMovieData();
      var page = Movie.getCallCount() - 1;
      var limit = 12;

      console.log(page);
      render_flag = false;
      stopLoading();

      for(var i = limit * page, len = movies.length; i < len; i++) {
        var movie = movies[i];
    
        render(movie);
      }
    }, 2000);
  }

  function render(data) {
    /*
      li
        figure
          div.list-img-box
            img
            span.year
          figcaption
            h4.title
            p.genre
            span.rating

    */

    // createElement
    var li = document.createElement('li'),
        figure = document.createElement('figure'),
        list_img_box = document.createElement('div'),
        year = document.createElement('span'),
        img = document.createElement('img'),
        figcaption = document.createElement('figcaption'),
        h4 = document.createElement('h4'),
        p = document.createElement('genre'),
        rating = document.createElement('span');

    // setAttribute & setData 
    // attr
    list_img_box.setAttribute('class', 'list-img-box');
    h4.setAttribute('class', 'title');
    p.setAttribute('class', 'genre');
    year.setAttribute('class', 'year');
    rating.setAttribute('class', 'rating');
    
    // setData
    img.setAttribute('src', data.medium_cover_image);
    year.innerText = data.year;
    h4.innerText = data.title;
    rating.innerText = (data.rating / 2).toFixed(1);
    
    var genres = '';
    for(var i = 0, len = data.genres; i < len; i++) {
      genres += data.genres[i];
    }
    p.innerText = genres;

    // append Elements

    figcaption.appendChild(h4);
    figcaption.appendChild(p);
    figcaption.appendChild(rating);

    list_img_box.appendChild(img);
    list_img_box.appendChild(year);

    figure.appendChild(list_img_box);
    figure.appendChild(figcaption);

    li.appendChild(figure);
    target.appendChild(li);
  }
  init();

}(window, window.Movie));