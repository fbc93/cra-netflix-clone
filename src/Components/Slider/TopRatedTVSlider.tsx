import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ITopRatedTV } from "../../api";
import useWindowDimensions from "../../useWidowDimensions";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { Skeleton } from "@mui/material";
import ExpandCircleDownOutlinedIcon from '@mui/icons-material/ExpandCircleDownOutlined';
import StopCircleOutlinedIcon from '@mui/icons-material/StopCircleOutlined';
import ControlPointOutlinedIcon from '@mui/icons-material/ControlPointOutlined';
import { makeThumnailPath } from "../../utils";

const Wrapper = styled.section`
  margin: 4vw 0;
  position: relative;
  z-index: 0;
`;
const TitleContentRow = styled.div`
  position: relative;
  width: 100%;
  height: 30vw;
  padding:0 4%;
  &:hover{
  span {
    opacity: 1;
  }
 }
`;
const RowHeader = styled(motion.h2)`
  line-height: 1.3;
`;
const RowTitle = styled.title`
  color: #e5e5e5;
  display: inline-block;
  font-size: 1.4vw;
  font-weight: 500;
  margin: 0 4% 2rem;
  min-width: 6em;
  position: relative;
  z-index: 1;
  text-shadow: rgba(0, 0, 0, 0.45) 2px 2px 4px;
`;
const Slider = styled.div`
  position: relative;
`;
const SliderContainer = styled(motion.div) <{ gridcount: number }>`
  width:100%;
  position: absolute;
  display: grid;
  gap:10px;
  grid-template-columns: repeat(${(props) => props.gridcount},1fr);
`;
const SliderItem = styled(motion.div) <{ offset: number }>`
  cursor:pointer;
  height: 30vw;
  aspect-ratio: 3/0;
  position: relative;
  z-index:10;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  
  &:first-child {
    transform-origin: center left!important;
  }
  &:last-child {
    transform-origin: center right!important;
  }
  &:hover{
    .info-box {
      opacity:1;
    }
  }
`;
const BackDropImage = styled(motion.div) <{ bgimg: string }>`
  width:100%;
  height: 100%;
  position: absolute;
  top:0;
  background: url(${(props) => props.bgimg}) no-repeat top center;
  background-size: cover;
  z-index:2;
`;
const TypeTag = styled(motion.div) <{ tagcolor: string }>`
  position: absolute;
  top: 0.5vw;
  right: 0.5vw;
  z-index: 2;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.tagcolor};
  width: 4vw;
  height: 4vw;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  box-shadow: 0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22);
  span {
    font-size:0.8vw;
    letter-spacing: -0.1vw;
    text-align: center;
    font-weight: 700;
    text-shadow: rgba(0, 0, 0, 0.45) 2px 2px 4px;
    &:first-child{
      margin-bottom:0.5vw;
    }
  }
`;
const InfoBottomBox = styled.div`
  width: 100%;
  text-align: left;
  height: 6vw;
  background-color: rgb(51, 51, 51);
  padding: 0.3vw 1vw 1vw 1vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  opacity: 0;
  transition-delay: 0.2s;
  box-sizing: border-box;
  position: relative;
  z-index: 10;
  p{
    font-size:1vw;
    letter-spacing: -0.1vw;
    font-weight: 700;
  }
`;
const IconWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  ul {
    display: flex;
    justify-content: space-between;
    margin-bottom:0.8vw;

    li {
      margin-right:0.3vw;
    }
  }
`;
const Handle = styled.span`
  bottom: 0;
  color: #fff;
  display: flex;
  justify-content: center;
  position: absolute;
  text-align: center;
  top: 0;
  width: 4%;
  z-index: 20;
  background: hsla(0,0%,8%,.5);
  cursor:pointer;
`;
const HandlePrev = styled(Handle)`
  left:0;
  opacity:0;
`;
const HandleNext = styled(Handle)`
  right:0;
  opacity: 0;
`;

function TopRatedTVData({
  topRatedTVData,
  title
}: {
  topRatedTVData: ITopRatedTV[],
  title: string;
}) {
  const offset = 4;
  const [index, setIndex] = useState(0);
  const [isRight, setIsRight] = useState(1); // left -1, right 1
  const [leaving, setLeaving] = useState(false);
  const bigMovieMatch = useMatch("/trending/:movType/:trendId");
  const width = useWindowDimensions();
  const navigate = useNavigate();
  const toggleLeaving = (value: boolean) => setLeaving(value);

  const sliderButton = (right: number) => {
    if (topRatedTVData) {
      if (leaving) return;
      toggleLeaving(true);
      setIsRight(right);

      const totalLength = topRatedTVData.length - 1;
      const maxIdx = Math.floor(totalLength / offset) - 1;

      switch (right) {
        case 1:
          setIndex((prev) => (prev >= maxIdx ? 0 : prev + 1))
          break

        case -1:
          setIndex((prev) => (prev === 0 ? maxIdx : prev - 1));
          break
      }
    }
  }


  const onBoxClicked = (movieId: number, media_type: string) => {
    navigate(`/trending/${media_type}/${movieId}`);
  };

  const SliderItemVar = {
    normal: {
      scale: 1,
    },
    hover: {
      scale: 1.1,
      y: -50,
      zIndex: 30,
      transition: {
        delay: 0.2,
        duration: 0.2,
        type: "linear"
      }
    }
  }

  const SliderContainerVar = {
    hidden: (right: number) => {
      return {
        x: right === 1 ? width : -width,
      };
    },
    visible: {
      x: 0
    },
    exit: (right: number) => {
      return {
        x: right === 1 ? -width : width,
      };
    },
  };

  const BackBgVar = {
    hidden: {
      opacity: 0
    },
    visible: {
      opacity: 1
    }
  }

  return (
    <Wrapper>
      <RowHeader>
        <RowTitle>{title}</RowTitle>
      </RowHeader>
      <TitleContentRow>
        <HandlePrev onClick={() => sliderButton(-1)}>
          <ArrowBackIosRoundedIcon sx={{ fontSize: 30 }} style={{ alignSelf: "center" }} />
        </HandlePrev>
        <Slider>
          <AnimatePresence
            initial={false}
            custom={isRight}
            onExitComplete={() => toggleLeaving(false)}
          >
            <SliderContainer
              key={index}
              gridcount={offset}
              custom={isRight}
              variants={SliderContainerVar}
              initial="hidden"
              animate="visible"
              exit="exit"
              transition={{
                type: "tween",
                duration: 1
              }}
            >
              {topRatedTVData.slice(1)
                .slice(offset * index, offset * index + offset)
                .map((movie: ITopRatedTV) => (

                  <SliderItem
                    key={movie.id}
                    layoutId={movie.id + "trend"}
                    variants={SliderItemVar}
                    initial="normal"
                    whileHover="hover"
                    offset={offset}
                    onClick={() => onBoxClicked(movie.id, movie.media_type)}
                  >
                    <Skeleton
                      sx={{ bgcolor: 'grey.900' }}
                      variant="rectangular"
                      width={100 + "%"}
                      height={100 + "%"}
                    />
                    <BackDropImage
                      key={`${movie.id}_back_bg`}
                      variants={BackBgVar}
                      initial="hidden"
                      animate="visible"
                      transition={{ delay: 1.6 }}
                      bgimg={makeThumnailPath(String(movie.poster_path))}
                    />
                    <InfoBottomBox className="info-box">
                      <IconWrapper>
                        <ul>
                          <li><StopCircleOutlinedIcon fontSize="large" /></li>
                          <li><ExpandCircleDownOutlinedIcon fontSize="large" /></li>
                          <li><ControlPointOutlinedIcon fontSize="large" /></li>
                        </ul>
                        <ExpandCircleDownOutlinedIcon fontSize="large" />
                      </IconWrapper>

                      <p>{movie.name ? movie.name : movie.title}</p>
                    </InfoBottomBox>
                  </SliderItem>

                ))}
            </SliderContainer>
          </AnimatePresence>

        </Slider>
        <HandleNext onClick={() => sliderButton(1)}>
          <ArrowForwardIosRoundedIcon sx={{ fontSize: 30 }} style={{ alignSelf: "center" }} />
        </HandleNext>
      </TitleContentRow>
    </Wrapper >
  );
}

export default TopRatedTVData;