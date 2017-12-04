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
    var pages = 1;
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
    var URL = 'https://api.themoviedb.org/3/movie',
        API = 'api_key=13b38a28972a041bf8f58fe46dbc7ff6',
        LANGUAGE = '&language=ko',
        PAGE = '&page=';
    // var url = 'https://api.themoviedb.org/3/movie/550?api_key=7d02aff4818ac79c96864bd3293f9fbd';
    // 사용할 url 정보들
    var URLs = {
      trending: '/popular?',
      top_rated: '/top_rated?',
      now_playing: '/now_playing?',
    };
    var genres =  {
      "28": "액션",
      "12": "모험",
      "16": "애니메이션",
      "35": "코미디",
      "80": "범죄",
      "99": "다큐멘터리",
      "18": "드라마",
      "10751": "가족",
      "14": "판타지",
      "36": "역사",
      "27": "공포",
      "10402": "음악",
      "9648": "미스터리",
      "10749": "로맨스",
      "878": "SF",
      "10770": "TV 영화",
      "53": "스릴러",
      "10752": "전쟁",
      "37": "서부"
    };
    // img url
    var large_img_url = 'https://image.tmdb.org/t/p/w500',
        small_img_url = 'https://image.tmdb.org/t/p/w342';
    // 검색 url
    var search_url = 'https://api.themoviedb.org/3/search/movie?api_key=13b38a28972a041bf8f58fe46dbc7ff6&language=ko&page=1&include_adult=false&query=';
    // search data 를 담을 배열 변수
    var search_data = [];
    // var url_result = '';
    // var search_value = document.querySelector('.header-search-bar').value;

   
    

    
    /**
     * @func getPage
     * @description page의 값을 반환하는 함수.
     */
    var getPage = function() {
      return pages;
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
     * @func getGenre
     * @description 장르를 반환하는 함수.
     */
    var getGenre = function(id) {
      id = id + '';
      return genres[id];
    }
    /**
     * @func getLargeImgUrl
     * @description 큰 이미지 url 주소를 반환.
     */
    var getLargeImgUrl = function(poster_path) {
      return large_img_url + poster_path;
    }
    /**
     * @func getSmallImgUrl
     * @description 작은 이미지 url 주소를 반환.
     */
    var getSmallImgUrl = function(poster_path) {
      return small_img_url + poster_path;
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
      pages = 1;
      call_count = 0;
    };
    /**
     * @func getGenre
     * @description 장르를 반환하는 함수.
     */
    var getGenre = function(id) {
      id = id + '';
      return genres[id];
    }
    /**
     * @func getLargeImgUrl
     * @description 큰 이미지 url 주소를 반환.
     */
    var getLargeImgUrl = function(poster_path) {
      return large_img_url + poster_path;
    }
    /**
     * @func getSmallImgUrl
     * @description 작은 이미지 url 주소를 반환.
     */
    var getSmallImgUrl = function(poster_path) {
      return small_img_url + poster_path;
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
      prev_page = pages;
      
      console.log('movie page: ', pages);
      console.log('url: ', url);
      $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        // crossOrigin: true,
        // dataType: 'application/json',
        success: function(response) {
          // console.log(response.data.movies);
          console.log(response);
          console.log('들어가지?');
          movie_data = movie_data.concat(response.results);
          console.log('movie_data: ', movie_data);
          pages++;
          call_count++;
          // load_flag = false;
          // console.log('page: ', page);
          
          
          console.log('loading...');
        }
      });
    }
    /**
     * @func setMovieData
     * @description 영화 url을 변경시키고 변경시킨 url을 가지고 laodMovies 함수를 호출시킴.
     */
    var setMovieData = function(type, genre) {
      
      genre = genre || '';

      var new_url = URL;

      switch(type) {
        case 'trending':
          // new_url += '/genre/movie/list';
          new_url += URLs[type];
        break;
        case 'top_rated':
          new_url += URLs[type];
        break;
        case 'now_playing':
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
      new_url += (API + LANGUAGE + PAGE + pages);

      console.log(new_url);
      loadMovies(new_url);
    }

    //  검색

    // data load 하는 함수 
    function loadSearchData(search_url) {
      // inputEvent();
      // url_result = search_url + search_value;
      console.log('url:', search_url);
      $.ajax({
        url: search_url,
        success: function(response) {
          search_data = response.results;
          console.log(search_data);
        }
      })
    }
   
    
    function getSearchData() {
      return search_data;
    }
    function getSearchUrl() {
      return search_url;
    }
    
    // 입력값 감지하는 이벤트    
    // function inputEvent(){
    //   window.search.addEventListener('keypress', function(e){
    //     url_result = search_url + value;
    //     console.log(url_result);
    //   })
    // }


    return {
      setMovieData: setMovieData,
      getMovieData: getMovieData,
      resetMovieData: resetMovieData,
      getPage: getPage,
      getPrevPage: getPrevPage,
      getGenre: getGenre,
      getLargeImgUrl: getLargeImgUrl,
      getSmallImgUrl: getSmallImgUrl,
      getCallCount: getCallCount,
      loadSearchData: loadSearchData,
      getSearchData: getSearchData,
      getSearchUrl: getSearchUrl,
      getGenre: getGenre,
      getLargeImgUrl: getLargeImgUrl,
      getSmallImgUrl: getSmallImgUrl

      // inputEvent: inputEvent
    };
  };
  
  global.Movie = Movie();

}(window, window.jQuery));