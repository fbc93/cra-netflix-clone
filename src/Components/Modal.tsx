import { motion, useScroll } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import { makeImagePath } from "../utils";
import styled from "styled-components";
import { getDetail, IData, IGetTvDetail } from "../api";
import { useQuery } from "react-query";

const Overlay = styled(motion.div)`
  position: fixed;
  top:0;
  width:100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: fixed;
  width: 80vw;
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
  trendData: IData[],
  dataId: number,
  movType: string
}

function Modal({
  trendData,
  dataId,
  movType

}: IModal) {
  //Data
  const { data: DetailData } = useQuery<IGetTvDetail>(
    "Detail",
    () => getDetail(movType, dataId)
  );

  console.log(DetailData)


  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const bigMovieMatch = useMatch("/trending/:movType/:trendId");
  const onOverlayClicked = () => navigate("/");
  const clickedMovie = bigMovieMatch?.params.trendId && trendData.find((movie: IData) => movie.id + "" === bigMovieMatch.params.trendId);

  return (
    <>
      <Overlay
        onClick={onOverlayClicked}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <BigMovie
        layoutId={bigMovieMatch?.params.trendId}
        style={{ top: scrollY.get() + 100 }}>
        {clickedMovie &&
          <>
            <BigCover style={{ backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(clickedMovie.backdrop_path, "w500")})` }} />
            <BigTitle>{clickedMovie.title ? clickedMovie.title : clickedMovie.name}</BigTitle>
            <div>{clickedMovie.media_type}</div>
            <BigOverview>{clickedMovie.overview}</BigOverview>
          </>
        }
      </BigMovie>
    </>
  );
}

export default Modal;