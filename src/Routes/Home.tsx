import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { getMovieGenre, getTopRatedShows, getTrending, getTvGenre, getUpcomingMovies, IData, IGenre, IGetGenres, IGetTrend, IGetUpcomingMovie, IGetUpcomingMovies, ITopRatedTV } from "../api";
import styled from "styled-components";
import VisualBanner from "../Components/VisualBanner";
import Slider from "../Components/Slider";

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
          <Slider
            trendData={trendData?.results as IData[]}
            upcomingData={upcomingMovieData?.results as IGetUpcomingMovie[]}
            upcomingTermData={upcomingMovieData as IGetUpcomingMovies}
            topRatedTVData={TopRatedTVData?.results as ITopRatedTV[]}
          />

        </>
      }
    </MainView >
  );
}

export default Home;