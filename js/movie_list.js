(function(global, Movie){
  'use strict';

  // DOM ul과 loading 부분
  var target = null, loading = null;
  // 이벤트가 발생할 때마다 render하는걸 막기위해서 flag를 사용
  var render_flag = false;
  // 영화 category정보를 받는 변수.
  var category = 'trending';

  /**
   * @func init
   * @description 초기화시켜주는 함수.
   */
  function init() {
    target = document.querySelector('.section-movie-list > ul');
    loading = document.querySelector('.movie-list-loading');
    Movie.setMovieData(category);
    setRenderList();    
    bind();
  }

  /**
   * @func bind
   * @description 이벤트들의 모음.
   */
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

  /**
   * @func getScrollTop
   * @description 현재 스크롤의 Y축 정보를 받아오는 함수.
   */
  function getScrollTop() {
    return  (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
  }
  /**
   * @func startLoading
   * @description Loading DOM 객체의 display 스타일을 block으로 설정해주는 함수.
   */
  function startLoading() {
    loading.style.display = 'block';
  }
  /**
   * @func stopLoading
   * @description Loading DOM 객체의 display 스타일을 none으로 설정해주는 함수.
   */
  function stopLoading() {
    loading.style.display = 'none';
  }
  /**
   * @func setRenderList
   * @description Movie에서 영화정보를 받은 다음 DOM객체를 생성시켜 rendering 시켜주는 함수.
   */
  function setRenderList() {

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
  /**
   * @func render
   * @description 영화 리스트에 필요한 객체를 생성하고 movie정보들을 넣어 target에 append 시켜주는 함수.
   */
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