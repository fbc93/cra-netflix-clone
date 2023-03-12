export interface IPopularPerson {
  name: string;
  id: number;
  known_for_department: string;
  popularity: number;
  profile_path: string;
  known_for: [];
}
export interface IPopularPeople {
  results: IPopularPerson[];
}
export interface IMovieProvider {
  provider_name: string;
  provider_id: number;
  logo_path: string;
}

export interface IMovieProviders {
  results: [];
}

export interface ITVProvider {
  provider_name: string;
  provider_id: number;
  logo_path: string;
}

export interface ITVProviders {
  results: [];
}

export interface ITopRatedTV {
  backdrop_path: string;
  first_air_date: string;
  id: number;
  name: string;
  original_language: string;
  original_name: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  origin_country: string[];
  genre_ids: number[];
}

export interface ITopRatedTVs {
  results: ITopRatedTV[];
}

export interface IDates {
  maximum: string;
  minimum: string;
}
export interface IGetUpcomingMovie {
  poster_path: string;
  overview: string;
  release_date: string;
  genre_ids: [];
  id: number;
  original_title: string;
  original_language: string;
  title: string;
  backdrop_path: string;
  vote_average: number;
  media_type: string;
}

export interface IGetUpcomingMovies {
  dates: IDates;
  results: IGetUpcomingMovie[];
}


export interface IrowProps {
  custom: boolean;
  variants: {};
  initial: string;
  animate: string;
  exit: string;
  transition: {};
  key: number;
}

export interface Iparam {
  movType: string;
  trendId: string;
}

export interface IPattern {
  path: string;
}

export interface IbigMovieMatch {
  params: Iparam;
  pathname: string;
  pathnameBase: string;
  pattern: IPattern
}

export interface ISeasons {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  poster_path: string;
  season_number: number;
}

export interface INextEpisode {
  air_date: string;
  episode_number: number;
  id: number;
  name: string;
  still_path: string;
  season_number: number;
}

export interface IProductCompanies {
  id: number;
  logo_path: string;
  name: string;
}

export interface INetworks {
  id: number;
  logo_path: string;
  name: string;
}

export interface ISpokenLang {
  name: string;
}

export interface ILastEpisode {
  air_date: string;
  episode_number: number;
  name: string;
  runtime: number;
  still_path: string;
}

export interface IGetTvDetail {
  id: number;
  name: string;
  original_name: string;
  genres: IGenre[];
  adult: boolean;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  created_by: [];
  episode_run_time: number[];
  number_of_episodes: number;
  number_of_seasons: number;
  first_air_date: string;
  networks: INetworks[];
  production_companies: [];
  production_countries: IProductCompanies[];
  seasons: [];
  original_title: string;
  vote_average: number;
  runtime: number;
  original_language: string;
  spoken_languages: ISpokenLang[];
  last_episode_to_air: ILastEpisode;
  next_episode_to_air: INextEpisode;
}

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
  media_type: "";
  homepage: string;
}

export interface IGetTrend {
  page: number;
  results: IData[];
  total_pages: number;
  total_results: number;
}

export interface IOnAirTVResult {
  backdrop_path: string;
  first_air_date: string;
  genre_ids: [];
  id: number;
  name: string;
  origin_country: [];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  vote_average: number;
  vote_count: number;
}

export interface ITrailer {
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  key: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
  id: string;
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
  return fetch(`${BASE_PATH}/genre/movie/list?api_key=${API_KEY}&language=${LANGUAGE_CODE}`)
    .then((res) => res.json());
}

//Get TV [Genre List] 
export function getTvGenre() {
  return fetch(`${BASE_PATH}/genre/tv/list?api_key=${API_KEY}&language=${LANGUAGE_CODE}`)
    .then((res) => res.json());
}

//Get Details [Movie/TV]
export function getDetail(DATA_TYPE: string, DATA_ID: number) {
  return fetch(`${BASE_PATH}/${DATA_TYPE}/${DATA_ID}?api_key=${API_KEY}&language=${LANGUAGE_CODE}`)
    .then((res) => res.json());
}

//Get Now_Playing [Movies]
export function getMovie() {
  return fetch(`${BASE_PATH}/movie/now_playing${LAST_STRING}`)
    .then((res) => res.json());
}

//Get Top Rated [Movies]
export function getTopRatedMovies() {
  return fetch(`${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&language=${LANGUAGE_CODE}`)
    .then((res) => res.json());
}

//Get Upcoming [Movies]
export function getUpcomingMovies() {
  return fetch(`${BASE_PATH}/movie/upcoming?api_key=${API_KEY}&language=${LANGUAGE_CODE}`)
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
  return fetch(`${BASE_PATH}/tv/top_rated?api_key=${API_KEY}&language=${LANGUAGE_CODE}`)
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

//Get Watch Providers [MOVIE]
export function getTVWatchProviders() {
  return fetch(`${BASE_PATH}/watch/providers/movie?api_key=${API_KEY}&language=${LANGUAGE_CODE}`)
    .then((res) => res.json());
}
//Get Watch Providers [TV]
export function getMovieWatchProvider() {
  return fetch(`${BASE_PATH}/watch/providers/tv?api_key=${API_KEY}&language=${LANGUAGE_CODE}`)
    .then((res) => res.json());
}

//Get Popular Person
export function getPopularPerson() {
  return fetch(`${BASE_PATH}/person/popular?api_key=${API_KEY}&language=${LANGUAGE_CODE}`)
    .then((res) => res.json());
}