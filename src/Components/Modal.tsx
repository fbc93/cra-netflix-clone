import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import { makeImagePath } from "../utils";
import styled from "styled-components";
import { IData } from "../api";

const Overlay = styled(motion.div)`
  position: fixed;
  top:0;
  width:100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: #555555;
  border-radius: 15px;
  overflow: hidden;
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



function Modal({
  trendData
}: {
  trendData: IData[]
}) {
  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const bigMovieMatch = useMatch("/trending/:trendId");
  const onOverlayClicked = () => navigate("/");
  const clickedMovie = bigMovieMatch?.params.trendId && trendData.find((movie: IData) => movie.id + "" === bigMovieMatch.params.trendId);

  return (
    <AnimatePresence>
      {bigMovieMatch &&
        <>
          <Overlay
            onClick={onOverlayClicked}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
          <BigMovie
            layoutId={bigMovieMatch.params.trendId}
            style={{ top: scrollY.get() + 100 }}>
            {clickedMovie &&
              <>
                <BigCover style={{ backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(clickedMovie.backdrop_path, "w500")})` }} />
                <BigTitle>{clickedMovie.title ? clickedMovie.title : clickedMovie.name}</BigTitle>
                {/* <TrailerMovie>
                        <ReactPlayer
                          url={'https://youtu.be/9dsN9bTyq0g'}
                          width='100%'
                          height='100%'
                          playing={true}
                          muted={true}
                          controls={false}
                          autoPlay={true}
                          loop={true}
                        />
                      </TrailerMovie> */}
                <BigOverview>{clickedMovie.overview}</BigOverview>
              </>
            }
          </BigMovie>
        </>
      }
    </AnimatePresence>

  );
}

export default Modal;