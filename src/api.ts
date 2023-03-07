const API_KEY = "090854d22032a1d9ff378ac678517e8b";
const BASE_PATH = "https://api.themoviedb.org/3";

export interface IMovie {
  adult: boolean,
  backdrop_path: string,
  genre_ids: [],
  id: number,
  original_title: string,
  overview: string,
  popularity: number,
  poster_path: string,
  release_date: string,
  title: string,
  name: string,
  video: boolean,
  vote_average: number,
  vote_count: number,
}

// export interface ISearch {
//   results: {
//     adult: boolean,
//     backdrop_path: string,
//     id: number,
//     title: string,
//     original_title: string,
//     overview: string,
//     poster_path: string,
//     media_type: string,
//     genre_ids: [],
//     popularity: number,
//     release_date: string,
//     video: boolean,
//     vote_average: number,
//     vote_count: number
//   }
// }
export interface IGetMoviesResult {
  dates: {
    maximum: string,
    minimum: string
  },
  page: number,
  results: [],
  total_pages: number,
  total_results: number
}

export interface IOnAirTVResult {
  backdrop_path: string,
  first_air_date: string,
  genre_ids: [],
  id: number,
  name: string,
  origin_country: [],
  original_language: string,
  original_name: string,
  overview: string,
  popularity: number,
  poster_path: string,
  vote_average: number,
  vote_count: number
}

export function getMovie() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko-KR&region=kr`)
    .then((res) => res.json());
}

export function getSearch(KEYWORD: string) {
  return fetch(`${BASE_PATH}/search/multi?api_key=${API_KEY}&language=ko-KR&query=${KEYWORD}&page=1&include_adult=false&region=ko`)
    .then((res) => res.json());
}

export function getOnAirTV() {
  return fetch(`${BASE_PATH}/tv/on_the_air?api_key=${API_KEY}&language=ko-KR&page=1`)
    .then((res) => res.json());
}



//Get Movie Genre List 
export function getMovieGenre() {
  return fetch(`${BASE_PATH}/genre/movie/list?api_key=${API_KEY}&language=ko-KR`).then((res) => res.json());
}

//Get TV Genre List 
export function getTvGenre() {
  return fetch(`${BASE_PATH}/genre/tv/list?api_key=${API_KEY}&language=ko-KR`).then((res) => res.json());
}


//Get Trending [Movies/TV]
export function getTrending() {
  return fetch(`${BASE_PATH}/trending/all/day?api_key=${API_KEY}&language=ko-KR`)
    .then((res) => res.json());
}

//Get Top Rated [Movies]
export function getTopRatedMovies() {
  return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=ko-KR`)
    .then((res) => res.json());
}

//Get Upcoming [Movies]
export function getUpcomingMovies() {
  return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=ko-KR`)
    .then((res) => res.json());
}

//Get Latest [TV]
export function getLatestShows() {
  return fetch(`${BASE_PATH}/tv/latest?api_key=${API_KEY}&language=ko-KR`)
    .then((res) => res.json());
}

//Get TV Airing Today [TV]
export function getAiringTodayShow() {
  return fetch(`${BASE_PATH}/tv/airing_today?api_key=${API_KEY}&language=ko-KR`)
    .then((res) => res.json());
}

//Get Popular [TV]
export function getPopularShows() {
  return fetch(`${BASE_PATH}/tv/popular?api_key=${API_KEY}&language=ko-KR`)
    .then((res) => res.json());
}

//Get Top Rated [TV]
export function getTopRatedShows() {
  return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&language=ko-KR`)
    .then((res) => res.json());
}


//Get Videos [Movie]
export function getMovieVideos(movieId: number) {
  return fetch(`${BASE_PATH}/movie/${movieId}/videos?api_key=${API_KEY}&language=ko-KR`)
    .then((res) => res.json());
}
