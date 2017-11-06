(function(global, $){
  'use strict';

  if( !$ ) {
    throw 'jQuery를 찾지 못했습니다.';
  }

  if( global.Movie ) {
    throw '이미 Movie 객체가 존재합니다.';
  }

  function Movie() {
    // 불러올 페이지 넘버
    var page = 1;
    // 여러번 불러오지 않도록 flag를 사용
    var load_flag = false;
    // 몇번 데이터를 불러왔는지 counting하는 변수
    var call_count = 0;
    // 영화 데이터를 담는 배열 변수
    var movie_data = [];
    // 공통적인 url 부분
    var url = 'https://yts.ag/api/v2/list_movies.json?limit=12&page=';
    // 사용할 url 정보들
    var URLs = {
      top_rated: '&sort_by=rating&order_by=desc',
      new_arrivals: '&sort_by=year&order_by=asc',
      genre: {
        horror: '&genre=horror',
        animation: '&genre=animation',
        drama: '&genre=drama',
      }
    };
    // 검색 url
    var search_url = 'https://yts.ag/api/v2/list_movies.json?query_term=';
    // search data 를 담을 배열 변수
    var search_data = [];
    // var url_result = '';
    // var search_value = document.querySelector('.header-search-bar').value;

   
    

  
    /**
     * @func getPage
     * @description page의 값을 반환하는 함수.
     */
    var getPage = function() {
      return page;
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
      page = 0;
      call_count = 0;
    }
    /**
     * @func loadMovies
     * @description 영화를 불러오는 함수.
     */
    var loadMovies = function(url) {
      if( load_flag ) {
        console.log('불러오는 중입니다.');
        return;
      }

      load_flag = true;
      $.ajax({
        url: url,
        success: function(response) {
          if(response.status === 'ok') {
            movie_data = movie_data.concat(response.data.movies);
            page++;
            call_count++;
            load_flag = false;
            
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
        break;
        case 'top_rated':
          new_url += URLs[type];
        break;
        case 'new_arrivals':
          new_url += URLs[type];
        break;
        case 'genre':
          var genre_url = URLs[type]
          
          new_url += genre_url[genre]
        break;
      }

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
          if(response.status === 'ok') {
            console.log(response);
            search_data = response.data.movies;
            console.log('search_data:', search_data);
          } 
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
      getCallCount: getCallCount,
      loadSearchData: loadSearchData,
      getSearchData: getSearchData,
      getSearchUrl: getSearchUrl
      // inputEvent: inputEvent
    };
  };
  
  global.Movie = Movie();

}(window, window.jQuery));

