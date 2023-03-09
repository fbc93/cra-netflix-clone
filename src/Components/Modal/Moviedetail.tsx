import { motion, useScroll } from "framer-motion";
import styled from "styled-components";
import { IbigMovieMatch, IGetTvDetail } from "../../api";
import { makeImagePath } from "../../utils";

const BigMovie = styled(motion.div)`
  position: fixed;
  width: 50%;
  height: 75%;
  top:12rem;
  z-index:100;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: #555555;
  border-radius: 15px;
  overflow: hidden;
  box-sizing: border-box;
`;

const BigCover = styled.div`
  background-size: cover;
  background-position: center center;
  width:100%;
  height: 400px;
`;

const BigTitle = styled.h2`
  color: ${props => props.theme.black.lighter};
  padding:10px;
  font-size:28px;
`;

const BigOverview = styled.p`
  color: ${props => props.theme.black.lighter};
  padding:10px;
  line-height: 1.5;
`;

interface IModal {
  DetailData: IGetTvDetail,
  clickedMovie: IGetTvDetail,
  bigMovieMatch: IbigMovieMatch
}



function Moviedetail({
  DetailData,
  clickedMovie,
  bigMovieMatch

}: IModal) {
  const { scrollY } = useScroll();

  return (
    <BigMovie
      layoutId={bigMovieMatch?.params.trendId}
      style={{ top: scrollY.get() + 100 }}>
      {clickedMovie &&
        <>
          <BigCover style={{ backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(clickedMovie.backdrop_path, "w500")})` }} />
          <h1>MOVIE</h1>
          <div>{DetailData?.vote_average}</div>
          <BigTitle>{DetailData?.name}</BigTitle>
          <div>{DetailData?.original_name ? DetailData?.original_name : DetailData?.original_title}</div>
          <div>러닝타임: {DetailData?.runtime}분</div>
          <div>개봉일 :{DetailData?.first_air_date}</div>
          <BigOverview>{DetailData?.overview}</BigOverview>
        </>
      }
    </BigMovie>
  );
}

export default Moviedetail;