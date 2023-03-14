import { motion } from "framer-motion";
import styled from "styled-components";
import { getMovieVideos, getTVVideos, IData, IGenre } from "../api";
import { makeImagePath } from "../utils";
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import PauseCircleOutlineIcon from '@mui/icons-material/PauseCircleOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ReactPlayer from "react-player";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { Skeleton } from "@mui/material";

const Wrapper = styled.span`
  display: block;
  position: relative;
  z-index: 1;
`;
const MainViewRow = styled.div`
  left: 0;
  position: relative;
  right: 0;
  top: 0;

  background-color: #000;
  margin-bottom: 20px;
  padding-bottom: 40%;
  user-select: none;
`;
const Banner = styled.section`
  
  display: flex;
  flex-direction: column;
  justify-content: center;


  background-color: #000;
  height: 56.25vw;
  position: absolute;
  width: 100%;
  z-index: 0;
`;
const DismissMask = styled.div`
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;
const MotionLayer = styled.div`
  z-index: 2;
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
`;
const ImageWrapper = styled.div`
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;

  img {
    background-position: 50%;
    background-size: cover;
    bottom: 0;
    left: 0;
    opacity: 1;
    position: absolute;
    right: 0;
    top: 0;
    transition: opacity .4s cubic-bezier(.665,.235,.265,.8) 0s;
    width: 100%;
    z-index: 5;
  }
`;
const VideoWrapper = styled.div``;
const VideoVignette = styled.div`
  background: linear-gradient(77deg,rgba(0,0,0,.6),transparent 85%);
  bottom: 0;
  left: 0;
  opacity: 1;
  position: absolute;
  right: 26.09%;
  top: 0;
  transition: opacity .5s;
  z-index: 8;
`;
const HeroVignette = styled.div`
  background-color: transparent;
  background-image: linear-gradient(180deg,hsla(0,0%,8%,0) 0,hsla(0,0%,8%,.15) 15%,hsla(0,0%,8%,.35) 29%,hsla(0,0%,8%,.58) 44%,#141414 68%,#141414);
  background-position: 0 top;
  background-repeat: repeat-x;
  background-size: 100% 100%;
  bottom: -1px;
  height: 14.7vw;
  opacity: 1;
  top: auto;
  width: 100%;

  left: 0;
  position: absolute;
  right: 0;
  z-index: 100;
`;
const FillContainer = styled.div`
  bottom: 0;
  left: 0;
  position: absolute;
  right: 0;
  top: 0;
  height: 100%;
  width: 100%;
`;
const InfoLayer = styled.div`
  bottom: 35%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  left: 4%;
  position: absolute;
  top: 0;
  width: 36%;
  z-index: 10;
`;
const TitleBox = styled.div`
  transition: transform 1.5s cubic-bezier(.165,.84,.44,1);
  width: 100%;
`;
const Title = styled(motion.h2)`
  font-size:3vw;
  letter-spacing: -0.1vw;
  margin-bottom:2vw;
  font-weight: bold;
  text-shadow: rgba(0, 0, 0, 0.45) 2px 2px 4px;
`;
const OriginalTitle = styled(motion.span)`
  color:rgba(255, 255, 255, 0.7);
  font-size: 1vw;
  margin-bottom: 1vw;
  text-indent: 0.4vw;
  letter-spacing: -0.1vw;
  display: inline-block;
`;
const GenreTagList = styled(motion.ul)`
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom:2vw;
  text-shadow: rgba(0, 0, 0, 0.45) 2px 2px 4px;
`;
const GenreTag = styled.li`
  font-size:1.2vw;
  color: ${props => props.theme.white.darker};
  position: relative;
  letter-spacing: -0.1rem;
  
  &:after{
    width:2rem;
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
  color: #fff;
  font-size: 1vw;
  font-weight: 400;
  line-height: normal;
  margin-top: 0.1vw;
  text-shadow: 2px 2px 4px rgba(0,0,0,.45);
  width: 100%;
`;
const BtnList = styled(motion.ul)`
  display: flex;
  line-height: 88%;
  margin-top: 1.5vw;
  white-space: nowrap;
  position: relative;
  z-index: 10;
`;
const DefaultBtn = styled.button`
  width:7vw;
  height: 3vw;
  align-items: center;
  justify-content: center;
  -webkit-font-smoothing: antialiased;
  display: flex;
  font-size: 1.2vw;
  font-weight: 500;
  line-height: 2.4rem;
  padding-left: 2rem;
  padding-right: 2.4rem;
  border-radius: 4px;
  margin-bottom: 1rem;
  margin-right: 1rem;
  border:none;
  cursor:pointer; 
`;
const TrailerPlayBtn = styled(DefaultBtn)`
  &:hover{
    background-color: rgba(255, 255, 255, 0.75);
  }
`;
const InfoBtn = styled(DefaultBtn)`
  width:10vw;
  height: 3vw;
  background-color: rgba(109, 109, 110, 0.7);
  color: white;
  &:hover{
    background-color: rgba(109, 109, 110, 0.4);
  }
`;

function VisualBanner({
  trendData,
  TvGenreData,
  MovieGenreData
}: {
  trendData: IData[],
  TvGenreData: IGenre[],
  MovieGenreData: IGenre[]

}) {
  const [isPlay, setIsPlay] = useState(true);
  const togglePlay = () => setIsPlay(prev => !prev);

  const convertGenreIdToNm = (genreArray: number[]) => {
    const genre = [];
    const result = [];

    if (genreArray !== undefined) {
      for (let i = 0; i < genreArray.length; i++) {
        genre.push(genreArray[i]);

        for (let j = 0; j < genre.length; j++) {

          if (trendData[0].media_type as any === "tv") {
            for (let k = 0; k < TvGenreData?.length; k++) {
              if (genre[j] === TvGenreData[k].id) {
                genre[j] = TvGenreData[k].name;
                result.push(genre[j]);
              }
            }

          } else if (trendData[0].media_type as any === "movie") {
            for (let k = 0; k < MovieGenreData?.length; k++) {
              if (genre[j] === MovieGenreData[k].id) {
                genre[j] = MovieGenreData[k].name;
                result.push(genre[j]);
              }
            }
          }
        }
      }
    }
    return result;
  }

  const { data: movieVideoData } = useQuery(
    "movieVideoData",
    () => getMovieVideos(trendData[0].id)
  );

  const { data: TVVideoData } = useQuery(
    "TVVideoData",
    () => getTVVideos(trendData[0].id)
  );

  const clickToPlay = () => {
    togglePlay();
  }






  return (
    <Wrapper>
      <MainViewRow>
        <Skeleton
          sx={{ bgcolor: 'grey.900' }}
          variant="rectangular"
          width={100 + "%"}
          height={56.25 + "vw"}
          style={{ position: "absolute", top: 0, left: 0 }}
        />
        <Banner>
          <DismissMask>
            <MotionLayer>
              {isPlay && movieVideoData && TVVideoData && (
                <VideoWrapper>
                  <ReactPlayer
                    url={`https://youtu.be/${trendData[0].media_type === String("movie") ? movieVideoData?.results[0].key : TVVideoData?.results[0].key}`}
                    width="100vw"
                    height="56.25vw"
                    style={{ position: "relative", zIndex: 100, pointerEvents: "none" }}
                    loop={true}
                    playing={isPlay}
                    muted={true}
                    controls={false}
                  />
                  <HeroVignette />
                </VideoWrapper>
              )}
              <ImageWrapper>
                <img src={makeImagePath(String(trendData[0].backdrop_path))} alt={trendData[0].name ? trendData[0].name : trendData[0].title} />
                <VideoVignette />
                <HeroVignette />
              </ImageWrapper>
            </MotionLayer >
          </DismissMask >
          <FillContainer>
            <InfoLayer>
              <TitleBox>
                <OriginalTitle
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.4,
                    duration: 1
                  }}>
                  {trendData[0].original_name ? trendData[0].original_name : trendData[0].original_title}
                </OriginalTitle>
                <Title
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.4,
                    duration: 1
                  }}>
                  {trendData[0].title ? trendData[0].title : trendData[0].name}
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
                    convertGenreIdToNm(trendData[0].genre_ids).map((item: any) =>
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
                >{trendData[0].overview}</Overview>


                <BtnList
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 1.6,
                    duration: 1
                  }}
                >
                  <TrailerPlayBtn onClick={clickToPlay}>
                    {isPlay ? (
                      <>
                        <PauseCircleOutlineIcon fontSize="large" style={{ marginRight: 7 }} />
                        <span>정지</span>
                      </>
                    ) : (
                      <>
                        <PlayArrowRoundedIcon fontSize="large" style={{ marginRight: 7 }} />
                        <span>재생</span>
                      </>
                    )}

                  </TrailerPlayBtn>
                  <InfoBtn>
                    <InfoOutlinedIcon fontSize="large" style={{ marginRight: 7 }} />
                    <span>상세정보</span>
                  </InfoBtn>
                </BtnList>
              </TitleBox>
            </InfoLayer>
          </FillContainer>
        </Banner >
      </MainViewRow >
    </Wrapper >
  );
}

export default VisualBanner;