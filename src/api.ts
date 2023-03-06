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
  video: boolean,
  vote_average: number,
  vote_count: number
}
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

export function getMovie() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko-KR&region=kr`).then((res) => res.json());
}