import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { getTrending, getTvGenre, IMovie } from "../api";
import { makeImagePath } from "../utils";
import styled from "styled-components";
import ReactPlayer from 'react-player/lazy';
import useWindowDimensions from "../useWidowDimensions";

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

const VisualBanner = styled.section<{ bgImage: string }>`
  height: 45vw;
  padding-top:68px;
  background-image: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1)) ,url( ${props => props.bgImage});
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const TitleBox = styled.div`
  width: 35%;
  margin: 0 0 0 4%;
`;

const Title = styled(motion.h2)`
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

const GenreTagList = styled(motion.ul)`
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom:25px;
`;

const GenreTag = styled.li`
  font-size:1.2vw;
  color: ${props => props.theme.white.darker};
  position: relative;
  letter-spacing: -1px;
  
  &:after{
    width:1.4vw;
    content:'/';
    display: inline-block;
    height: 100%;
    text-align: center;
  }

  &:last-child{
    &:after{
      display: none;
    }
  }
`;

const Overview = styled(motion.p)`
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

const BtnList = styled(motion.ul)`
  display: flex;
  align-items: center;
  margin-top:30px;
  width:100%;
`;

const TrailerPlayBtn = styled.button`
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
    font-size:2.5vw;
    margin-right:1vw;
  }

  &:hover{
    background-color: rgba(255, 255, 255, 0.75);
  }
`;

const DescInfoBtn = styled.button`
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

const Slider = styled(motion.section)`
  margin: 0px 0px 3vw;
  position: relative;
  aspect-ratio: 7.7/2;

  &:hover{
    span{
      opacity:1;
      right:-1vw;
    }
  }
`;

const SliderTitle = styled(motion(Link))`
  padding:0 0 0 4vw;
  margin-bottom:2.5vh;
  font-size:1.6vw;
  letter-spacing: -1px;
  font-weight: 500;
  display: inline-block;
  display: flex;
  align-items: center;

  span {
    display: inline-block;
    margin-left:0.6vw;
    color: rgb(84, 185, 197);
    opacity:0;
    transition: all ease-in-out 0.5s;
    position: relative;
    right:1vw;
    font-size:1.4vw;
  }
`;

const ViewAll = styled.div`
  display:flex;
  align-items: center;
`;

const SlideRow = styled(motion.div)`
  display: grid;
  gap:10px;
  grid-template-columns: repeat(6,1fr);
  //padding:0 0 0 4vw;
  justify-content: space-between;
  position: absolute;
  width:100%;
`;

const Box = styled(motion.div) <{ bgphoto: string }>`
  cursor:pointer;
  background-color: #ffffff;
  background-image: url(${props => props.bgphoto});
  aspect-ratio: 2/3;
  font-size:60px;
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 5px;

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

// const rowVariants = {
//   hidden: {
//     x: window.outerWidth + 5,
//   },
//   visible: {
//     x: 0,
//   },
//   exit: {
//     x: -window.outerWidth - 5,
//   },
// }

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

const offset = 6;

function Home() {
  const bigMovieMatch = useMatch("/trending/:trendId");
  const navigate = useNavigate();
  const { scrollY } = useScroll();

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [prev, setPrev] = useState(false);

  const { data: trendData, isLoading: trendLoading } = useQuery(
    "trend",
    getTrending
  );

  const { data: TvGenreData } = useQuery(
    "tvGenre",
    getTvGenre
  )

  const changeGenreIdtoName = (genreArray: any) => {
    const genre = [];
    const result = [];

    if (genreArray !== undefined) {
      for (let i = 0; i < genreArray.length; i++) {
        genre.push(genreArray[i]);

        for (let j = 0; j < genre.length; j++) {
          for (let k = 0; k < TvGenreData?.genres.length; k++) {

            if (genre[j] === TvGenreData?.genres[k].id) {
              genre[j] = TvGenreData?.genres[k].name;
              result.push(genre[j]);
            }
          }
        }
      }
    }
    return result;
  }

  const increaseIndex = () => {
    if (trendData) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = trendData.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => prev === maxIndex ? 0 : prev + 1);
    }
  };

  const toggleLeaving = () => setLeaving(prev => !prev);
  const goPrev = () => setPrev(prev => !prev);

  const onBoxClicked = (movieId: number) => {
    navigate(`/trending/${movieId}`);
  };

  const onOverlayClick = () => navigate("/");

  const clickedMovie =
    bigMovieMatch?.params.trendId &&
    trendData?.results.find((movie: IMovie) => movie.id + "" === bigMovieMatch.params.trendId);

  const width = useWindowDimensions();

  return (

    <MainView
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {trendLoading ?
        <Loader>Loading...</Loader> :
        <>
          <VisualBanner bgImage={makeImagePath(trendData?.results[0].backdrop_path || "")}>
            <TitleBox>

              <Title
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.4,
                  duration: 1
                }}
              >
                {trendData?.results[0].title ? trendData?.results[0].title : trendData?.results[0].name}
                <OriginalTitle>
                  {trendData?.results[0].original_name}
                </OriginalTitle>
              </Title>

              <GenreTagList
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.8,
                  duration: 1
                }}
              >
                {
                  changeGenreIdtoName(trendData?.results[0].genre_ids).map((item: any) =>
                    <GenreTag key={item}>{item}</GenreTag>
                  )
                }
              </GenreTagList>

              <Overview
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 1.2,
                  duration: 1
                }}
              >{trendData?.results[0].overview}</Overview>

              <BtnList
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 1.6,
                  duration: 1
                }}
              >
                <TrailerPlayBtn>
                  <span className="material-symbols-rounded">
                    play_arrow
                  </span>
                  <span>재생</span>
                </TrailerPlayBtn>
                <DescInfoBtn>
                  <span className="material-symbols-rounded">
                    info
                  </span>
                  <span>상세정보</span>
                </DescInfoBtn>
              </BtnList>

            </TitleBox>
          </VisualBanner>

          <Slider>
            <SliderTitle to={"/"}>
              🏆 오늘 하루 인기있었던 영화 / TV프로그램
              <ViewAll>
                <span>모두보기</span>
                <span className="material-symbols-rounded">arrow_forward_ios</span>
              </ViewAll>
            </SliderTitle>

            <span className="material-symbols-rounded" onClick={goPrev} style={{ position: "absolute", zIndex: 2, top: 55 + "%", left: 1.4 + "vw", cursor: "pointer", fontSize: 3.5 + "vw" }}>arrow_back_ios</span>
            <span className="material-symbols-rounded" onClick={increaseIndex} style={{ position: "absolute", zIndex: 2, top: 55 + "%", right: 0.4 + "vw", cursor: "pointer", fontSize: 3.5 + "vw" }}>arrow_forward_ios</span>

            <AnimatePresence
              initial={false}
              onExitComplete={toggleLeaving}>
              <SlideRow
                key={index}
                initial={{ x: width + 5 }}
                animate={{ x: 0 }}
                exit={{ x: -width - 5 }}
                transition={{ type: "tween", duration: 1 }}
              >
                {trendData?.results
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
              </SlideRow>

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
        </>
      }
    </MainView >
  );
}

export default Home;