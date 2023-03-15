import { motion } from "framer-motion";
import { useQuery } from "react-query";
import {
  getMovieGenre,
  getMovieVideos,
  getTopRatedShows,
  getTrending,
  getTvGenre,
  getTVVideos,
  getUpcomingMovies,
  IData,
  IGenre,
  IGetGenres,
  IGetTrend,
  IGetUpcomingMovie,
  IGetUpcomingMovies,
  IMovieVideo,
  ITopRatedTV,
  ITVVideo,
} from "../api";
import styled from "styled-components";
import VisualBanner from "../Components/VisualBanner";
import TrendSlider from "../Components/Slider/TrendSlider";
import UpcomingMovieSlider from "../Components/Slider/UpcomingMovieSlider";
import TopRatedTVSlider from "../Components/Slider/TopRatedTVSlider";

const MainView = styled(motion.main)`
  position: relative;
  z-index: 0;
`;

const FullContainer = styled.div`
  margin-top: -70px;
`;

function Home() {
  //DATA
  const { data: trendData } = useQuery(
    "trendingMovieTV",
    getTrending
  );

  const { data: TvGenreData } = useQuery<IGetGenres>(
    "tvGenre",
    getTvGenre
  );

  const { data: MovieGenreData } = useQuery<IGetGenres>(
    "movieGenre",
    getMovieGenre
  );

  const { data: upcomingMovieData } = useQuery<IGetUpcomingMovies>(
    "upcomingMovie",
    getUpcomingMovies
  );

  const { data: TopRatedTVData } = useQuery(
    "topRatedTV",
    getTopRatedShows
  );

  return (
    <MainView
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <FullContainer>
        <h1>메인페이지</h1>
        {trendData && TvGenreData && MovieGenreData && (
          <VisualBanner
            trendData={trendData.results as IData[]}
            TvGenreData={TvGenreData.genres as IGenre[]}
            MovieGenreData={MovieGenreData.genres as IGenre[]}
          />
        )}
        {trendData && (
          <TrendSlider
            title={"🏆 오늘 하루 인기있었던 영화 / TV시리즈"}
            trendData={trendData.results as IData[]}
          />
        )}
        {upcomingMovieData && (
          <UpcomingMovieSlider
            title={"🎉 Upcoming Movie! 개봉 예정 영화"}
            upcomingData={upcomingMovieData.results as IGetUpcomingMovie[]}
            upcomingTermData={upcomingMovieData as IGetUpcomingMovies}
          />

        )}
        {TopRatedTVData && (
          <TopRatedTVSlider
            title={"⭐️ 별이 다섯개! ⭐️ 최고의 평점을 받은 TV시리즈"}
            topRatedTVData={TopRatedTVData.results as ITopRatedTV[]}
          />
        )}
      </FullContainer>
    </MainView >
  );
}

export default Home;