import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovie } from "../api";
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
  id: string,
  title: string,
  poster_path: string
}

function Home() {
  const { data, isLoading } = useQuery(["movies", "nowPlaying"], getMovie);
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);

  const increaseIndex = () => {

    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data?.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => prev === maxIndex ? 0 : prev + 1);
    }
  };

  const toggleLeaving = () => setLeaving(prev => !prev);

  const offset = 6;

  console.log(data);

  return (
    <Wrapper>
      {isLoading ?
        <Loader>Loading...</Loader> :
        <>
          <Banner onClick={increaseIndex} bgphoto={makeImagePath(data?.results[0].backdrop_path || "")}>
            <Title>{data?.results[0].title}</Title>
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
                {data.results
                  .slice(1)
                  .slice(offset * index, offset * index + offset)
                  .map((movie: IMovie) => (
                    <Box
                      key={movie.id}
                      bgphoto={makeImagePath(movie.poster_path, "w500")}
                      variants={BoxVariant}
                      initial="normal"
                      whileHover="hover"
                      transition={{
                        type: "tween"
                      }}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
        </>
      }
    </Wrapper >
  );
}

export default Home;