import { motion } from "framer-motion";
import { useQuery } from "react-query";
import {
  getAiringTodayShow,
  getMovieGenre,
  getMovieWatchProvider,
  getOnAirTV,
  getPopularShows,
  getTopRatedShows,
  getTrending,
  getTvGenre,
  getTVWatchProviders,
  getUpcomingMovies,
  IData,
  IGenre,
  IGetGenres,
  IGetTrend,
  IGetUpcomingMovie,
  IGetUpcomingMovies,
  IMovieProvider,
  IOnAirTodayTV,
  IOnAirTV,
  IPopularTV,
  ITopRatedTV,
  ITVProvider
} from "../api";
import styled from "styled-components";
import VisualBanner from "../Components/VisualBanner";
import ProviderSlider from "../Components/ProviderSlider";
import TrendSlider from "../Components/Slider/TrendSlider";
import UpcomingMovieSlider from "../Components/Slider/UpcomingMovieSlider";
import TopRatedTVSlider from "../Components/Slider/TopRatedTVSlider";
import PopularTVSlider from "../Components/Slider/PopularTVSlider";
import VisualBannerTV from "../Components/Slider/VisualBannerTV";
import OntheAirTVSlider from "../Components/Slider/OntheAirTVSlider";
import TodayAirTVSlider from "../Components/Slider/TodayAirTVSlider";

const MainView = styled(motion.main)`
  position: relative;
  z-index: 0;
`;

const FullContainer = styled.div`
  margin-top: -70px;
`;

function Tv() {
  //DATA
  const { data: trendData } = useQuery<IGetTrend>(
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

  const { data: PopularTVData } = useQuery(
    "popularTV",
    getPopularShows
  );

  const { data: ontheAirTVData } = useQuery(
    "ontheAirTVData",
    getOnAirTV
  );

  const { data: todayAirTVData } = useQuery(
    "todayAirTVData",
    getAiringTodayShow
  );


  return (
    <MainView
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <FullContainer>
        <h1>TV 메인페이지</h1>
        {PopularTVData && TvGenreData && MovieGenreData && (
          <VisualBannerTV
            PopularTVData={PopularTVData.results as IPopularTV[]}
            TvGenreData={TvGenreData.genres as IGenre[]}
            MovieGenreData={MovieGenreData.genres as IGenre[]}
          />
        )}


        {ontheAirTVData && (
          <OntheAirTVSlider
            title={"📺 방영 중인 시리즈를 살펴보세요!"}
            onAirTVData={ontheAirTVData.results as IOnAirTV[]}
          />
        )}

        {PopularTVData && (
          <PopularTVSlider
            title={"👀 나만빼고 다 봤어요! 유명한 띵작 TV시리즈"}
            PopularTVData={PopularTVData.results as IPopularTV[]}
          />
        )}

        {todayAirTVData && (
          <TodayAirTVSlider
            title={"🔥 오늘 방영되는 컨텐츠"}
            todayAirTVData={todayAirTVData.results as IOnAirTodayTV[]}
          />
        )}


        {/* {upcomingMovieData && (
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
        )} */}
      </FullContainer>
    </MainView >
  );
}

export default Tv;