import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import { makeImagePath } from "../utils";
import styled from "styled-components";
import { getDetail, IbigMovieMatch, IGetTvDetail } from "../api";
import { useQuery } from "react-query";
import TVdetail from "./Modal/TVdetail";

const Overlay = styled(motion.div)`
  position: fixed;
  top:0;
  left:0;
  width:100%;
  height:100vh;
  background-color: rgba(0,0,0,0.5);
  opacity: 0;
  z-index:99;
`;

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
  dataId: number,
  movType: string,
}

function Modal({
  dataId,
  movType

}: IModal) {

  //Data
  const { data: DetailData } = useQuery<IGetTvDetail>(
    "Detail",
    () => getDetail(movType, dataId)
  );

  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const bigMovieMatch = useMatch("/trending/:movType/:trendId");
  const onOverlayClicked = () => navigate("/");
  const clickedMovie = Number(DetailData?.id) === Number(bigMovieMatch?.params.trendId) ? DetailData : null;


  return (
    <>
      <AnimatePresence>
        {bigMovieMatch ? (
          <>
            <Overlay
              onClick={onOverlayClicked}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />

            {bigMovieMatch?.params.movType === "tv" ? (
              <TVdetail
                DetailData={DetailData as IGetTvDetail}
                clickedMovie={clickedMovie as IGetTvDetail}
                bigMovieMatch={bigMovieMatch as IbigMovieMatch}
              />

            ) : (
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
            )}
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default Modal;