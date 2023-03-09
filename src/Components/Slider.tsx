import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IData } from "../api";
import useWindowDimensions from "../useWidowDimensions";
import { makeImagePath } from "../utils";
import Modal from "./Modal";


const Wrapper = styled(motion.section)`
  margin: 0px 4vw 3vw;
  position: relative;
  aspect-ratio: 7/2;

  &:hover{
    span{
      opacity:1;
      right:-1vw;
    }
  }
`;

const SliderTitle = styled(motion(Link))`
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

const Box = styled(motion.div) <{ background: string }>`
  cursor:pointer;
  background-color: #ffffff;
  background-image: url(${props => props.background});
  aspect-ratio: 2/3;
  font-size:60px;
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 0.5vw;
  overflow: hidden;

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

const BoxVariant = {
  normal: {
    scale: 1,
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

function Slider({
  trendData
}: {
  trendData: IData[]
}) {
  const offset = 6;
  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const toggleLeaving = () => setLeaving(prev => !prev);
  const [isRight, setIsRight] = useState(1);
  const navigate = useNavigate();
  const width = useWindowDimensions();
  const bigMovieMatch = useMatch("/trending/:movType/:trendId");

  const changeIndex = (right: number) => {
    if (leaving) return;
    if (trendData) {
      toggleLeaving();
      setIsRight(right);
      const totalLength = Object.keys(trendData).length;

      const maxIndex =
        totalLength % offset === 0
          ? Math.floor(totalLength / offset)
          : Math.floor(totalLength / offset) - 1

      right === 1
        ? setIndex((prev) => prev >= maxIndex ? 0 : prev + 1)
        : setIndex((prev) => prev === 0 ? maxIndex : prev - 1)
    }
  };

  const onClickToArrowBtn = (right: number) => {
    if (!leaving) {
      changeIndex(right);
    }
  };

  const onBoxClicked = (movieId: number, media_type: string) => {
    navigate(`/trending/${media_type}/${movieId}`);
  };

  const rowVariants = {
    hidden: (right: number) => {
      return {
        x: right === 1 ? width + 5 : -width - 5,
      };
    },
    visible: {
      x: 0
    },
    exit: (right: number) => {
      return {
        x: right === 1 ? -width - 5 : width + 5,
      };
    },
  };

  const rowProps = {
    custom: isRight,
    variants: rowVariants,
    initial: "hidden",
    animate: "visible",
    exit: "exit",
    transition: {
      type: "tween",
      duration: 1
    },
    key: index,
  }

  return (
    <Wrapper>
      <SliderTitle to={"/"}>
        🏆 오늘 하루 인기있었던 영화 / TV프로그램
        <ViewAll>
          <span>모두보기</span>
          <span className="material-symbols-rounded">arrow_forward_ios</span>
        </ViewAll>
      </SliderTitle>

      <span className="material-symbols-rounded" onClick={() => onClickToArrowBtn(-1)} style={{ position: "absolute", zIndex: 2, top: 50 + "%", left: 0, cursor: "pointer", fontSize: 3.5 + "vw" }}>arrow_back_ios</span>
      <span className="material-symbols-rounded" onClick={() => onClickToArrowBtn(1)} style={{ position: "absolute", zIndex: 2, top: 50 + "%", right: 0, cursor: "pointer", fontSize: 3.5 + "vw" }}>arrow_forward_ios</span>

      <AnimatePresence
        initial={false}
        custom={isRight}
        onExitComplete={toggleLeaving}>
        <SlideRow
          {...rowProps}
        >
          {trendData
            .slice(1)
            .slice(offset * index, offset * index + offset)
            .map((movie: IData) => (
              <Box
                layoutId={movie.id + ""}
                key={movie.id}
                onClick={() => onBoxClicked(movie.id, movie.media_type)}
                background={makeImagePath(movie.poster_path, "w500")}
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

      {bigMovieMatch ? (
        <Modal
          dataId={Number(bigMovieMatch?.params.trendId)}
          movType={String(bigMovieMatch?.params.movType)}
        />
      ) : null}

    </Wrapper>
  );
}

export default Slider;