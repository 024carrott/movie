# the-movie-box
> 영화 소개 사이트

## [The-movie-box](https://024carrott.github.io/movie/index.html)

## 목표
> 접근성과 반응형을 고려한 영화 소개하는 원 페이지 웹사이트 만들기

## 제작 기간
> 2017-10-30 ~ 2017-11-10

## 유지보수
> 2017-11-10 ~

## [영화 API 주소](https://developers.themoviedb.org/3)

## 사용 기술
1. HTML
2. SCSS
3. JavaScript
4. jQuery
5. Ajax

## 기능 
1. 검색
2. 모달(영화 상세)
3. 무한 스크롤링
4. Parallax
5. list view change

## 폴더 구성
```
┏━ index.html 
┣━ css ━┳━ stylesheets.css
┃       ┗━ stylesheets.css.map
┣━ js  ━┳━ jquery.min.js [v2.2.1]
┃       ┣━ change_list_view.js
┃       ┣━ movie.js
┃       ┣━ movie_list.js
┃       ┣━ search.js
┃       ┣━ modal.js
┃       ┣━ pallerax.js
┃       ┗━ skip-link.js
┣━ scss ━┳━ stylesheets.scss
┃        ┗━ modules[folder]
┃           ┃
┃           ┣━ _reset.scss
┃           ┣━ _classes.scss
┃           ┣━ _variable.scss
┃           ┗━ content[folder]
┃               ┃
┃               ┣━ _main.scss
┃               ┣━ main_banner[folder]
┃               ┃   ┗━ _main-banner.scss
┃               ┗━ main_content[folder]
┃                   ┃
┃                   ┣━ _main-content.scss
┃                   ┣━ _main-content-common.scss
┃                   ┣━ _main-content-category.scss
┃                   ┣━ _main-content-list-change.scss
┃                   ┣━ _main-content-modal.scss
┃                   ┗━ _main-content-movie-list.scss
┃              
┣━ assets ━ wrath-of-the-titans.jpg
┣━ package.json
┗━ README.md  
```

## Movie 데이터 사용 구조.
> 공통으로 사용되는 부분들을 최소화하기 위한 목적으로 사용했습니다.
1. movie_list.js와 search.js 파일에서 둘다 사용할 수 있게끔 movie.js를 모듈패턴으로 만들어 전역객체에 네임스페이스(Movie)를 만들어 할당시켜주었습니다.
```
global.Movie = {...}
  ┃
  ┣━> search.js
  ┗━> movie-list.js
```
