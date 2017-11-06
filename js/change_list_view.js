(function(global) {

  var module_btn = null, list_btn = null;
  var section_movie_list = null;

  function init() {
    module_btn = document.querySelector('.btn-list-change.module');
    list_btn = document.querySelector('.btn-list-change.list');
    section_movie_list = document.querySelector('.section-movie-list');

    changeListView('module');
    bind();
  }

  function bind() {
    module_btn.addEventListener('click', changeListView.bind(null, 'module'));
    list_btn.addEventListener('click', changeListView.bind(null, 'list'));
  }

  function changeListView(view) {
    
    if( view === 'module' ) {
      section_movie_list.setAttribute('class', 'section-movie-list module');
      module_btn.setAttribute('class', 'btn-list-change module active');
      list_btn.setAttribute('class', 'btn-list-change list');
    } else if ( view === 'list' ) {
      section_movie_list.setAttribute('class', 'section-movie-list list');
      module_btn.setAttribute('class', 'btn-list-change module');
      list_btn.setAttribute('class', 'btn-list-change list active');
    }
  }
  init();
}(window));