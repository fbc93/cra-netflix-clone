import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovie } from "../api";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  
`;

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
  background-color: #ffffff;
  background-image: url(${props => props.bgphoto});
  height: 200px;
  font-size:60px;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
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
                    >{movie.title}</Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
        </>
      }
    </Wrapper>
  );
}

export default Home;