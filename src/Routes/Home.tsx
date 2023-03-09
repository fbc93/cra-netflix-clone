import { motion } from "framer-motion";
import { useQuery } from "react-query";
import { getMovieGenre, getTrending, getTvGenre, getUpcomingMovies, IData, IGenre, IGetGenres, IGetTrend, IGetTvDetail } from "../api";
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

  const { data: upcomingMovieData } = useQuery(
    "upcomingMovie",
    getUpcomingMovies
  )


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
          <Slider trendData={trendData?.results as IData[]} />

        </>
      }
    </MainView >
  );
}

export default Home;