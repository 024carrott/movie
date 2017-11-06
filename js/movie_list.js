(function(global, Movie){
  'use strict';

  // DOM ul과 loading, movie_category
  var target = null, loading = null, movie_category = null;
  // 이벤트가 발생할 때마다 render하는걸 막기위해서 flag를 사용
  var render_flag = false;
  // 영화 category정보를 받는 변수.
  var category = 'trending';
  var prev_actived_category = null;

  /**
   * @func init
   * @description 초기화시켜주는 함수.
   */
  function init() {
    target = document.querySelector('.section-movie-list > ul');
    loading = document.querySelector('.movie-list-loading');
    movie_category = document.querySelector('.movie-category');
    prev_actived_category = document.querySelectorAll('.category_btn')[0];
    Movie.setMovieData(category);
    setRenderList();
    bind();
  }
  /**
   * @func setFooter
   */ 
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
      if( scrollTop + window_height > document_height ) {
        if( render_flag ) {
          console.log('로딩중입니다.');
          return;
        }

        Movie.setMovieData(category);
        setRenderList();
      }
    });

    movie_category.addEventListener('click', chooseCategory);
  }
  /**
   * 
   * @func chooseCategory
   * @description 카테고리를 선택하고 Movie데이터를 초기화 시키고 다시 새로운 url을 통해 데이터를 받아와서 처리하는 함수.
   */
  function chooseCategory(e) {
    var target = e.target;
    var sub_category = target.parentNode.querySelector('.sub-category');
    var category_class_name = target.getAttribute('data-category');

    if( category_class_name === 'genre' && sub_category ) {

      var class_name = sub_category.getAttribute('class');

      if( /active/.test(class_name) ) {
        class_name = class_name.replace('active', '').trim();
      } else {
        class_name = 'sub-category active';
      }
      sub_category.setAttribute('class', class_name);

      return;
    }

    if( target.getAttribute('class') === 'category_btn' && category !== category_class_name ) {
      if(render_flag) {
        console.log('로딩중입니다.');
        return;
      }
      if( category_class_name === 'genre' ) {
        return;
      } 
      
      var add_active_class = '';

      removeAllRenderedList();
      Movie.resetMovieData();

      category = category_class_name;
      Movie.setMovieData(category);
      
      if(prev_actived_category) {
        var _class_name = prev_actived_category.getAttribute('class');
        _class_name = _class_name.replace('active', '').trim();

        prev_actived_category.setAttribute('class', _class_name);
      }
      
      add_active_class = target.getAttribute('class');
      add_active_class += ' active';

      target.setAttribute('class', add_active_class);

      prev_actived_category = target;
      setRenderList();
    }

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
   * @func removeAllRenderedList
   * @description target의 모든 자식요소를 제거하는 함수.
   */
  function removeAllRenderedList() {
    var childs = Array.prototype.slice.call(target.childNodes);

    for(var i = 0, len = childs.length; i < len; i++) {

      target.removeChild(childs[i]);
    }
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
      var call_count = Movie.getCallCount() - 1;
      var page = Movie.getPage();
      var prev_page = Movie.getPrevPage();
      var limit = 12;

      render_flag = false;
      stopLoading();

      if( page === prev_page ) {
        alert('데이터를 불러 올 수 없습니다.');
        return;
      }
      console.log('movie_list movies: ', movies);
      for(var i = limit * call_count, len = movies.length; i < len; i++) {
        var movie = movies[i];
        console.log('movie_list movie: ', movie);
        render(movie, i);
      }

      // target의 parent의 높이를 설정
      // target.parentNode.style.height = global.getComputedStyle(target).height;
    }, 4000);
  }
  /**
   * @func render
   * @description 영화 리스트에 필요한 객체를 생성하고 movie정보들을 넣어 target에 append 시켜주는 함수.
   */
  function render(data, index) {
    /*
      li
        figure
          div.list-img-box
            img
            span.year
          figcaption
            div.movie-info-wrapper1
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
        movie_info_wrapper1 = document.createElement('div'),
        movie_info_wrapper2 = document.createElement('div'),
        h4 = document.createElement('h4'),
        p = document.createElement('p'),
        rating = document.createElement('span');

    // setAttribute & setData 
    // attr
    list_img_box.setAttribute('class', 'list-img-box');
    img.setAttribute('tabindex', 0);
    figcaption.setAttribute('class', 'movie-info');
    movie_info_wrapper1.setAttribute('class', 'movie-info-wrapper1');
    movie_info_wrapper2.setAttribute('class', 'movie-info-wrapper2');
    h4.setAttribute('class', 'title');
    p.setAttribute('class', 'genre');
    year.setAttribute('class', 'year');
    rating.setAttribute('class', 'rating');
    
    // setData
    
    year.innerText = data.year;
    h4.innerText = data.title;
    rating.innerText = (data.rating / 2).toFixed(1);
    
    var genres = '';
    if ( data.genres ) {
      for(var i = 0, len = data.genres.length; i < len; i++) {
        genres += data.genres[i] + ' ';
      }
    } else {
      genres = 'Nothing';
    }
    p.innerText = genres;

    img.setAttribute('src', data.medium_cover_image);
    img.setAttribute('alt', 
        '제목 ' + data.title + ' 개봉연도 ' + data.year + ' 장르 ' + genres + ' 평점 ' + (data.rating / 2).toFixed(1));
    // append Elements

    movie_info_wrapper1.appendChild(h4);
    movie_info_wrapper1.appendChild(p);
    movie_info_wrapper2.appendChild(rating);
    figcaption.appendChild(movie_info_wrapper1);
    figcaption.appendChild(movie_info_wrapper2);

    list_img_box.appendChild(img);
    list_img_box.appendChild(year);

    figure.appendChild(list_img_box);
    figure.appendChild(figcaption);

    li.appendChild(figure);
    target.appendChild(li);
  }
  init();

}(window, window.Movie));