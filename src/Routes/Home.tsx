import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { getMovieGenre, getMovieWatchProvider, getPopularPerson, getTopRatedShows, getTrending, getTvGenre, getTVWatchProviders, getUpcomingMovies, IData, IGenre, IGetGenres, IGetTrend, IGetUpcomingMovie, IGetUpcomingMovies, IMovieProvider, IMovieProviders, IPopularPeople, IPopularPerson, ITopRatedTV, ITVProvider } from "../api";
import styled from "styled-components";
import VisualBanner from "../Components/VisualBanner";
import Slider from "../Components/Slider";
import ProviderSlider from "../Components/ProviderSlider";
import PopularPeopleSlider from "../Components/Slider/PopularPeopleSlider";

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const MainView = styled(motion.main)`
  width:100%;
  height: auto;
  position: relative;
  z-index: 0;
`;

function Home() {
  //DATA
  const { data: trendData, isLoading: trendLoading } = useQuery<IGetTrend>(
    "trend",
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
      {trendLoading ?
        <Loader>Loading...</Loader> :
        <>
          <VisualBanner
            trendData={trendData?.results as IData[]}
            TvGenreData={TvGenreData?.genres as IGenre[]}
            MovieGenreData={MovieGenreData?.genres as IGenre[]}
          />
          <PopularPeopleSlider
            popularPeopleData={PopularPersonData?.results as IPopularPerson[]}
          />
          <Slider
            trendData={trendData?.results as IData[]}
            upcomingData={upcomingMovieData?.results as IGetUpcomingMovie[]}
            upcomingTermData={upcomingMovieData as IGetUpcomingMovies}
            topRatedTVData={TopRatedTVData?.results as ITopRatedTV[]}
          />
          <ProviderSlider
            MovieProviderData={MovieProviderData?.results.slice(0, 20) as IMovieProvider[]}
            TVProviderData={TVProviderData?.results.slice(20, 40) as ITVProvider[]}
          />
        </>
      }
    </MainView >
  );
}

export default Home;