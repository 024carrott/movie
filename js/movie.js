(function(global, $){
  'use strict';

  if( !$ ) {
    throw 'jQuery를 찾지 못했습니다.';
  }

  // IE9+ 호환성
  $.support.cors = true;

  if( global.Movie ) {
    throw '이미 Movie 객체가 존재합니다.';
  }
  
  function Movie() {
    // 불러올 페이지 넘버
    var page = 1;
    // 이전 페이지 넘버
    var prev_page = 0;
    // 여러번 불러오지 않도록 flag를 사용
    var load_flag = false;
    // 몇번 데이터를 불러왔는지 counting하는 변수
    var call_count = 0;
    // 영화 데이터를 담는 배열 변수
    var movie_data = [];
    // 공통적인 url 부분
    // https://cors-anywhere.herokuapp.com/
    var url = 'https://yts.ag/api/v2/list_movies.json?limit=12&page=';
    // var url = 'https://api.themoviedb.org/3/movie/550?api_key=7d02aff4818ac79c96864bd3293f9fbd';
    // 사용할 url 정보들
    var URLs = {
      top_rated: '&sort_by=rating&order_by=desc',
      new_arrivals: '&sort_by=year&order_by=asc',
      horror: '&genre=horror',
      animation: '&genre=animation',
      drama: '&genre=drama',
      thriller: '&genre=thriller',
      comedy: '&genre=comedy',
      mistery: '&genre=mistery',
      adventure: '&genre=adventure',
      fantasy: '&genre=fantasy',
      action: '&genre=action'
    }

    /**
     * @func getPage
     * @description page의 값을 반환하는 함수.
     */
    var getPage = function() {
      return page;
    }
    /**
     * @func getPrevPage
     * @description prev_page의 값을 반환하는 함수.
     */
    var getPrevPage = function() {
      return prev_page;
    }
    /**
     * @func getCallCount
     * @description call_count의 값을 반환하는 함수.
     */
    var getCallCount = function() {
      return call_count;
    }
    /**
     * @func getMovieData
     * @description movie_data를 반환하는 함수.
     */
    var getMovieData = function() {
      return movie_data;
    };
    /**
     * @func resetMovieData
     * @description 변화된 변수들을 모두 초기화시키는 함수.
     */
    var resetMovieData = function() {
      movie_data = [];
      page = 1;
      call_count = 0;
    }
    /**
     * @func loadMovies
     * @description 영화를 불러오는 함수.
     */
    var loadMovies = function(url) {
      // if( load_flag ) {
      //   console.log('불러오는 중입니다.');
      //   return;
      // }

      load_flag = true;
      prev_page = page;

      console.log('movie page: ', page);
      console.log('url: ', url);
      $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        // crossOrigin: true,
        // dataType: 'application/json',
        success: function(response) {
          // console.log(response.data.movies);
          if(response.status === 'ok') {
            movie_data = movie_data.concat(response.data.movies);
            page++;
            call_count++;
            // load_flag = false;
            // console.log('page: ', page);
            
          } else {
            
            console.log('loading...');
          }
        }
      });
    }
    /**
     * @func setMovieData
     * @description 영화 url을 변경시키고 변경시킨 url을 가지고 laodMovies 함수를 호출시킴.
     */
    var setMovieData = function(type, genre) {
      
      genre = genre || '';

      var new_url = url + page;

      switch(type) {
        case 'trending':
          // new_url += '/genre/movie/list';
        break;
        case 'top_rated':
          new_url += URLs[type];
        break;
        case 'new_arrivals':
          new_url += URLs[type];
        break;
        case 'horror':
          new_url += URLs[type];
          break;
        case 'animation':
          new_url += URLs[type];
          break;
        case 'drama':
          new_url += URLs[type];
        break;
        case 'comedy':
          new_url += URLs[type];
        break;
        case 'mistery':
          new_url += URLs[type];
        break;
        case 'adventure':
          new_url += URLs[type];
        break;
        case 'fantasy':
          new_url += URLs[type];
        break;
        case 'action':
          new_url += URLs[type];
        break;
      }

      loadMovies(new_url);
    }

    return {
      setMovieData: setMovieData,
      getMovieData: getMovieData,
      resetMovieData: resetMovieData,
      getPage: getPage,
      getPrevPage: getPrevPage,
      getCallCount: getCallCount
    };
  };

  global.Movie = Movie();

}(window, window.jQuery));