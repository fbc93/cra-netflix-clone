import { motion } from "framer-motion";
import { useQuery } from "react-query";
import {
  getMovieGenre,
  getMovieWatchProvider,
  getPopularPerson,
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
  IPopularPerson,
  ITopRatedTV,
  ITVProvider
} from "../api";
import styled from "styled-components";
import VisualBanner from "../Components/VisualBanner";
import ProviderSlider from "../Components/ProviderSlider";
import PopularPeopleSlider from "../Components/Slider/PopularPeopleSlider";
import TrendSlider from "../Components/Slider/TrendSlider";
import UpcomingMovieSlider from "../Components/Slider/UpcomingMovieSlider";
import TopRatedTVSlider from "../Components/Slider/TopRatedTVSlider";

const Loader = styled.div`
  height: 80rem;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 8rem;
  color: white;
  position: absolute;
  width: 100%;
`;

const MainView = styled(motion.main)`
  width:100%;
  height: auto;
  position: relative;
  z-index: 0;
`;

function Home() {
  //DATA
  const { data: trendData, isLoading: trendingLoading } = useQuery<IGetTrend>(
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

  const { data: MovieProviderData } = useQuery(
    "MovieWatchProvider",
    getMovieWatchProvider
  );

  const { data: TVProviderData } = useQuery(
    "TVWatchProvider",
    getTVWatchProviders
  );

  const { data: PopularPersonData } = useQuery(
    "PopularPerson",
    getPopularPerson
  );


  return (
    <MainView
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Loader>Loading</Loader>
      {trendingLoading ? <Loader /> :
        <VisualBanner
          trendData={trendData?.results as IData[]}
          TvGenreData={TvGenreData?.genres as IGenre[]}
          MovieGenreData={MovieGenreData?.genres as IGenre[]}
        />
      }

      <TrendSlider
        title={"🏆 오늘 하루 인기있었던 영화 / TV시리즈"}
        trendData={trendData?.results as IData[]}
      />
      <PopularPeopleSlider
        popularPeopleData={PopularPersonData?.results as IPopularPerson[]}
      />
      <UpcomingMovieSlider
        title={"🎉 Upcoming Movie! 개봉 예정 영화"}
        upcomingData={upcomingMovieData?.results as IGetUpcomingMovie[]}
        upcomingTermData={upcomingMovieData as IGetUpcomingMovies}
      />
      <TopRatedTVSlider
        title={"⭐️ 별이 다섯개! ⭐️ 최고의 평점을 받은 TV시리즈"}
        topRatedTVData={TopRatedTVData?.results as ITopRatedTV[]}
      />
      <ProviderSlider
        MovieProviderData={MovieProviderData?.results.slice(0, 20) as IMovieProvider[]}
        TVProviderData={TVProviderData?.results.slice(20, 40) as ITVProvider[]}
      />
    </MainView >
  );
}

export default Home;