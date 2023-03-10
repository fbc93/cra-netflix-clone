import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getOnAirTV } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div``;
const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgphoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding:60px;
  background-image: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1)) ,url( ${props => props.bgphoto});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const Title = styled.h2`
  font-size:60px;
  margin-bottom:20px;
`;
const Overview = styled.p`
  width:50%;
  font-size:25px;
`;

const Slider = styled(motion.div)`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  gap:5px;
  grid-template-columns: repeat(6,1fr);
  position: absolute;
  width:100%;
`;

const Box = styled(motion.div) <{ bgphoto: string }>`
  cursor:pointer;
  background-color: #ffffff;
  background-image: url(${props => props.bgphoto});
  height: 200px;
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

interface IMovie {
  id: number,
  title: string,
  name: string,
  poster_path: string
}

function Tv() {
  const navigate = useNavigate();
  const bigMovieMatch = useMatch("/tv/:tvId");
  const { data, isLoading } = useQuery(
    ["tv", "ontheAir"],
    getOnAirTV
  );
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const { scrollY } = useScroll();

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
  const offset = 6;
  const onBoxClicked = (tvId: number) => {
    navigate(`/tv/${tvId}`);
  };

  const onOverlayClick = () => navigate("/tv");

  const clickedMovie =
    bigMovieMatch?.params.tvId &&
    data?.results.find((movie: IMovie) => movie.id + "" === bigMovieMatch.params.tvId);

  return (
    <Wrapper>
      {isLoading ?
        <Loader>Loading...</Loader> :
        <>
          <Banner onClick={increaseIndex} bgphoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title ? data?.results[0].title : data?.results[0].name}</Title>
            <Overview>{data?.results[0].overview}</Overview>
          </Banner>

          <Slider>
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
                        <h4>{movie.title ? movie.title : movie.name}</h4>
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
                  layoutId={bigMovieMatch.params.tvId}
                  style={{
                    top: scrollY.get() + 100
                  }}>
                  {clickedMovie &&
                    <>
                      <BigCover style={{ backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(clickedMovie.backdrop_path, "w500")})` }} />
                      <BigTitle>{clickedMovie.title}</BigTitle>
                      <BigOverview>{clickedMovie.overview}</BigOverview>
                    </>
                  }
                </BigMovie>
              </>
            }
          </AnimatePresence>
        </>
      }
    </Wrapper >
  );
}

export default Tv;