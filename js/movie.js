(function(global, $){
  'use strict';

  if( !$ ) {
    throw 'jQuery를 찾지 못했습니다.';
  }

  if( global.Movie ) {
    throw '이미 Movie 객체가 존재합니다.';
  }

  function Movie() {
    var page = 1;
    var load_flag = false;
    var call_count = 0;
    var movie_data = [];
    var url = 'https://yts.ag/api/v2/list_movies.json?limit=12&page=';
    var URLs = {
      top_rated: '&sort_by=rating&order_by=desc',
      new_arrivals: '&sort_by=year&order_by=asc',
      genre: {
        horror: '&genre=horror',
        animation: '&genre=animation',
        drama: '&genre=drama',
      }
    }

    var getPage = function() {
      return page;
    }

    var getCallCount = function() {
      return call_count;
    }
    var getMovieData = function() {
      return movie_data;
    };

    var resetMovieData = function() {
      movie_data = [];
      page = 0;
      call_count = 0;
    }

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

    return {
      setMovieData: setMovieData,
      getMovieData: getMovieData,
      resetMovieData: resetMovieData,
      getPage: getPage,
      getCallCount: getCallCount
    };
  };

  global.Movie = Movie();

}(window, window.jQuery));