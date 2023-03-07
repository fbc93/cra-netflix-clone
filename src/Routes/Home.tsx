import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getTrending, IMovie } from "../api";
import { makeImagePath } from "../utils";
import ReactPlayer from 'react-player/lazy';

const MainView = styled(motion.main)`
  width:100%;
  min-height: 1000px;
  margin-top:-68px;
  position: relative;
  z-index: 0;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const VisualBanner = styled.div<{ bgphoto: string }>`
  height: 56.25vw;
  padding-top:68px;
  background-image: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1)) ,url( ${props => props.bgphoto});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;

  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const InfoWrap = styled.div`
  width: 35%;
  margin: 0 0 0 4%;
`;

const Title = styled.h2`
  font-size:4vw;
  letter-spacing: -1px;
  margin-bottom:30px;
  font-weight: bold;
`;

const OriginalTitle = styled.span`
  color:rgba(255, 255, 255, 0.7);
  font-size:1.6vw;
  font-weight: 400;
  margin-left:1.2vw;
`;

const Overview = styled.p`
  font-size: 1.2vw;
  letter-spacing: -1px;
  line-height: 1.7;
  text-overflow: ellipsis;
  overflow: hidden;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const InfoBtnWrap = styled.div`
  display: flex;
  align-items: center;
  margin-top:30px;
  width:100%;
`;

const PlayBtn = styled.button`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  width: 100vw;
  padding: 10px 0px;
  text-align: center;
  justify-content: center;
  font-size: 1.5vw;
  line-height: 2;
  border: none;
  border-radius: 5px;
  font-weight: 400;
  outline: none;
  margin-right:10px;
  color:#000000;
  cursor:pointer;

  .material-symbols-rounded {
    font-size:2vw;
    margin-right:1vw;
  }

  &:hover{
    background-color: rgba(255, 255, 255, 0.75);
  }
`;

const InfoBtn = styled.button`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  width: 135vw;
  padding: 10px 0px;
  text-align: center;
  justify-content: center;
  font-size: 1.5vw;
  line-height: 2;
  border: none;
  border-radius: 5px;
  font-weight: 400;
  outline: none;
  background-color: rgba(109, 109, 110, 0.7);
  color:#ffffff;
  cursor:pointer;

  .material-symbols-rounded {
    font-size:2vw;
    margin-right:1vw;
  }

  &:hover{
    background-color: rgba(109, 109, 110, 0.4);
  }
`;




const Slider = styled(motion.div)``;

const Row = styled(motion.div)`
  display: grid;
  gap:5px;
  grid-template-columns: repeat(6,1fr);
  width:100%;
`;

const Box = styled(motion.div) <{ bgphoto: string }>`
  cursor:pointer;
  background-color: #ffffff;
  background-image: url(${props => props.bgphoto});
  height: 100px;
  font-size:60px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
`;

const Info = styled(motion.div)`
  padding:10px;
  opacity:0;
  position: relative;
  width:100%;
  bottom:0;
  background-color: ${props => props.theme.red};

  h4 {
    text-align: center;
    font-size:18px;
  }
`;

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

const TrailerMovie = styled.div`
  width:100px;
`;

const rowVariants = {
  hidden: {
    x: window.outerWidth + 5,
  },
  visible: {
    x: 0
  },
  exit: {
    x: -window.outerWidth - 5
  }
}

const BoxVariant = {
  normal: {
    scale: 1
  },
  hover: {
    scale: 1.2,
    y: -50,
    transition: {
      delay: 0.2,
      duration: 0.3,
      type: "tween"
    }
  }
}

const infoVariants = {
  hover: {
    opacity: 1
  },
  transition: {
    delay: 0.2,
    duration: 0.3,
    type: "tween"
  }
}

function Home() {
  const { data, isLoading } = useQuery(
    "Trend",
    getTrending
  );

  console.log(data?.results)

  const bigMovieMatch = useMatch("/trending/:trendId");
  const navigate = useNavigate();
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const { scrollY } = useScroll();
  const offset = 6;

  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => prev === maxIndex ? 0 : prev + 1);
    }
  };

  const toggleLeaving = () => setLeaving(prev => !prev);

  const onBoxClicked = (movieId: number) => {
    navigate(`/trending/${movieId}`);
  };

  const onOverlayClick = () => navigate("/");

  const clickedMovie =
    bigMovieMatch?.params.trendId &&
    data?.results.find((movie: IMovie) => movie.id + "" === bigMovieMatch.params.trendId);



  return (
    <MainView
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.5
      }}
    >
      {isLoading ?
        <Loader>Loading...</Loader> :
        <>
          <VisualBanner onClick={increaseIndex} bgphoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <InfoWrap>
              <Title>
                {data?.results[0].title ? data?.results[0].title : data?.results[0].name}

                <OriginalTitle>
                  {data?.results[0].original_name}
                </OriginalTitle>

              </Title>
              <Overview>{data?.results[0].overview}</Overview>

              <InfoBtnWrap>
                <PlayBtn>
                  <span className="material-symbols-rounded">
                    play_arrow
                  </span>
                  <span>재생</span>
                </PlayBtn>
                <InfoBtn>
                  <span className="material-symbols-rounded">
                    info
                  </span>
                  <span>상세정보</span>
                </InfoBtn>
              </InfoBtnWrap>

            </InfoWrap>
          </VisualBanner>

          <Slider>
            <h1>오늘하루 인기있었던 영화/TV프로그램</h1>
            <AnimatePresence
              initial={false}
              onExitComplete={toggleLeaving}>
              <Row
                key={index}
                variants={rowVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
              >
                {data?.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie: IMovie) => (
                    <Box
                      layoutId={movie.id + ""}
                      key={movie.id}
                      onClick={() => onBoxClicked(movie.id)}
                      bgphoto={makeImagePath(movie.poster_path, "w500")}
                      variants={BoxVariant}
                      initial="normal"
                      whileHover="hover"
                      transition={{
                        type: "tween"
                      }}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.name ? movie.name : movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>

          <AnimatePresence>
            {
              bigMovieMatch &&
              <>
                <Overlay
                  onClick={onOverlayClick}
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
                      <TrailerMovie>
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
                      </TrailerMovie>
                      <BigOverview>{clickedMovie.overview}</BigOverview>
                    </>
                  }
                </BigMovie>
              </>
            }
          </AnimatePresence>
        </>
      }
    </MainView >
  );
}

export default Home;