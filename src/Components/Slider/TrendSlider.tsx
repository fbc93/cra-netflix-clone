import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Link, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { IData } from "../../api";
import useWindowDimensions from "../../useWidowDimensions";
import { makeImagePath } from "../../utils";
import Modal from "../Modal";

const Wrapper = styled(motion.section)`
  position: relative;
  aspect-ratio: 100/25;

  &:after{
    content: "";
    display: inline-block;
    width: 100%;
    aspect-ratio: 100/25;
  }
  
  &:hover{
    .viewlink > span {
      opacity:1;
      right:-1vw;
    }
    .prev, .next {
      opacity: 1;
    }
  }
`;

const SliderTitle = styled(motion(Link))`
  margin: auto auto 4vh auto;
  font-size: 2rem;
  line-height: 1;
  letter-spacing: -0.1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  width:113rem;

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

const SlideRow = styled(motion.div) <{ gridnum: number }>`
  position: absolute;
  left:0;
  width:100%;
  clear:both;
  display: flex;
  justify-content: center;
  display: grid;
  gap:15px;
  grid-template-columns: repeat(${(props) => props.gridnum},1fr);
  aspect-ratio: 100/25;
  padding-bottom:3rem;
 
`;

const Box = styled(motion.div) <{ background: string; offset: number }>`
  background-image: url(${(props) => props.background});
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
  font-size: 4rem;
  border-radius: 2rem;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  z-index: 1;
  border:0.2rem solid rgba(84,185,197);
 
  &:first-child {
    transform-origin: center left;
    border-radius: 0 2rem 2rem 0;
  }
  &:last-child {
    transform-origin: center right;
    border-radius: 2rem 0 0 2rem;
  }
`;

const Info = styled(motion.div)`
  width: 100%;
  height: 10vw;
  background-color: rgba(0,0,0,0.9);
  opacity: 0;
  position: absolute;
  bottom:0;
  right: 0;
  border-radius: 10rem 0 0 0;
  padding:1.4rem;
  border-top:0.2rem solid rgba(84,185,197);

  h2 {
   font-size:1.5vw;
   text-align: center;
   font-weight: bold;
   letter-spacing: -0.1rem;
   line-height: 1.5;
   margin-bottom:1.4rem;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: right;
    color:rgb(84, 185, 197);

    p {
      font-size:1.3vw;
      letter-spacing: -0.1rem;
    }

    span {
      font-size:1.4vw;
    }
  }
`;

const SlideArrow = styled.span`
  position: absolute;
  z-index: 11;
  top: 50%;
  cursor: pointer;
  font-size: 4rem;
  opacity: 0;
  transform:translateY(-50%);
`;

const PrevBtn = styled(SlideArrow)`
  left:1rem;
`;
const NextBtn = styled(SlideArrow)`
  right:1rem;
`;

const BoxVariant = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.2,
    y: -50,
    zIndex: 10,
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

function TrendSlider({
  trendData,
  title

}: {
  trendData: IData[],
  title: string;

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
    gridnum: offset
  }

  console.log(trendData)

  return (
    <Wrapper>
      <SliderTitle to={"/"}>
        {title}
        <ViewAll className="viewlink">
          <span>모두보기</span>
          <span className="material-symbols-rounded">arrow_forward_ios</span>
        </ViewAll>
      </SliderTitle>

      <PrevBtn className="prev material-symbols-rounded" onClick={() => onClickToArrowBtn(-1)}>arrow_back_ios</PrevBtn>
      <NextBtn className="next material-symbols-rounded" onClick={() => onClickToArrowBtn(1)}>arrow_forward_ios</NextBtn>

      <AnimatePresence
        initial={false}
        custom={isRight}
        onExitComplete={toggleLeaving}>

        <SlideRow
          {...rowProps}
        >
          {trendData?.slice(1)
            .slice(offset * index, offset * index + offset)
            .map((movie: IData) => (
              <Box
                offset={offset}
                layoutId={movie.id + "trend"}
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
                  <h2>{movie.name ? movie.name : movie.title}</h2>
                  <div>
                    <p>상세정보</p>
                    <span className="material-symbols-rounded">
                      double_arrow
                    </span>
                  </div>
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

export default TrendSlider;