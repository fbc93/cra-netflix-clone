import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IData } from "../../api";
import useWindowDimensions from "../../useWidowDimensions";
import { makeImagePath, makeThumnailPath } from "../../utils";
import Modal from "../Modal";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import { useRecoilValue } from "recoil";
import { slideCnt } from "../../atoms";
import { duration, Skeleton } from "@mui/material";

const Wrapper = styled.section`
  margin: 3vw 0;
  position: relative;
  z-index: 1;
`;
const TitleContentRow = styled.div`
  position: relative;
  width: 100%;
  height: 10vw;
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
  margin: 0 4% 0.5em;
  min-width: 6em;
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
  height: 10vw;
  position: relative;
  &:first-child {
    transform-origin: center left!important;
  }
  &:last-child {
    transform-origin: center right!important;
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

function TrendSlider({
  trendData,
  title
}: {
  trendData: IData[],
  title: string;
}) {
  const offset = useRecoilValue(slideCnt);
  const [index, setIndex] = useState(0);
  const [isRight, setIsRight] = useState(1); // left -1, right 1
  const [leaving, setLeaving] = useState(false);
  const bigMovieMatch = useMatch("/trending/:movType/:trendId");
  const width = useWindowDimensions();
  const navigate = useNavigate();
  const toggleLeaving = (value: boolean) => setLeaving(value);

  const sliderButton = (right: number) => {
    if (trendData) {
      if (leaving) return;
      toggleLeaving(true);
      setIsRight(right);

      const totalLength = trendData.length - 1;
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
      scale: 1.2,
      y: -30,
      zIndex: 30,
      transition: {
        delay: 0.2,
        duration: 0.2,
        type: "tween"
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
              {trendData?.slice(1)
                .slice(offset * index, offset * index + offset)
                .map((movie: IData) => (
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
                      bgimg={makeThumnailPath(String(movie.backdrop_path))}
                    />
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

export default TrendSlider;