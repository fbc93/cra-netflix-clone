// export interface IMovie {
//   adult: boolean,
//   backdrop_path: string,
//   genre_ids: [],
//   id: number,
//   original_title: string,
//   overview: string,
//   popularity: number,
//   poster_path: string,
//   release_date: string,
//   title: string,
//   name: string,
//   video: boolean,
//   vote_average: number,
//   vote_count: number,
// }
// export interface IGetMoviesResult {
//   dates: {
//     maximum: string,
//     minimum: string
//   },
//   page: number,
//   results: [],
//   total_pages: number,
//   total_results: number
// }
export interface IGenre {
  id: number;
  name: string;
}
export interface IGetGenres {
  genres: IGenre[];
}

export interface IData {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  name: string;
  overview: string;
  original_name: string;
  original_title: string;
  genre_ids: [];
}

export interface IGetTrend {
  page: number,
  results: IData[],
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

export interface ITrailer {
  iso_639_1: string,
  iso_3166_1: string,
  name: string,
  key: string,
  site: string,
  size: number,
  type: string,
  official: boolean,
  published_at: string,
  id: string
}

//MovieDB API 정보
const API_KEY = "090854d22032a1d9ff378ac678517e8b";
const LANGUAGE_CODE = "ko-KR";
const REGION_CODE = "ko";
const BASE_PATH = "https://api.themoviedb.org/3";
const LAST_STRING = `?api_key=${API_KEY}&language=${LANGUAGE_CODE}&region=${REGION_CODE}`;

//Get Search [Movies/TV] 
export function getSearch(KEYWORD: string) {
  return fetch(`${BASE_PATH}/search/multi?api_key=${API_KEY}&language=${LANGUAGE_CODE}&query=${KEYWORD}&page=1&include_adult=false&region=${REGION_CODE}`)
    .then((res) => res.json());
}

//Get Trending [Movies/TV]
export function getTrending() {
  return fetch(`${BASE_PATH}/trending/all/day${LAST_STRING}`)
    .then((res) => res.json());
}

//Get Movie [Genre List] 
export function getMovieGenre() {
  return fetch(`${BASE_PATH}/genre/movie/list${LAST_STRING}`)
    .then((res) => res.json());
}

//Get TV [Genre List] 
export function getTvGenre() {
  return fetch(`${BASE_PATH}/genre/tv/list?api_key=${API_KEY}&language=${LANGUAGE_CODE}`)
    .then((res) => res.json());
}

//Get Now_Playing [Movies]
export function getMovie() {
  return fetch(`${BASE_PATH}/movie/now_playing${LAST_STRING}`)
    .then((res) => res.json());
}

//Get Top Rated [Movies]
export function getTopRatedMovies() {
  return fetch(`${BASE_PATH}/movie/top_rated${LAST_STRING}`)
    .then((res) => res.json());
}

//Get Upcoming [Movies]
export function getUpcomingMovies() {
  return fetch(`${BASE_PATH}/movie/upcoming${LAST_STRING}`)
    .then((res) => res.json());
}

//Get On_the_Air [TV]
export function getOnAirTV() {
  return fetch(`${BASE_PATH}/tv/on_the_air${LAST_STRING}`)
    .then((res) => res.json());
}

//Get Latest [TV]
export function getLatestShows() {
  return fetch(`${BASE_PATH}/tv/latest${LAST_STRING}`)
    .then((res) => res.json());
}

//Get TV Airing Today [TV]
export function getAiringTodayShow() {
  return fetch(`${BASE_PATH}/tv/airing_today${LAST_STRING}`)
    .then((res) => res.json());
}

//Get Popular [TV]
export function getPopularShows() {
  return fetch(`${BASE_PATH}/tv/popular${LAST_STRING}`)
    .then((res) => res.json());
}

//Get Top Rated [TV]
export function getTopRatedShows() {
  return fetch(`${BASE_PATH}/tv/top_rated${LAST_STRING}`)
    .then((res) => res.json());
}

//Get Videos [Movie]
export function getMovieVideos(movieId: number) {
  return fetch(`${BASE_PATH}/movie/${movieId}/videos${LAST_STRING}`)
    .then((res) => res.json());
}

//Get Videos [TV]
export function getTVVideos(movieId: number) {
  return fetch(`${BASE_PATH}/tv/${movieId}/videos${LAST_STRING}`)
    .then((res) => res.json());
}
