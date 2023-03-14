import { AnimatePresence, motion } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getDetail, IbigMovieMatch, IGetTvDetail } from "../api";
import { useQuery } from "react-query";
import TVdetail from "./Modal/TVdetail";
import Moviedetail from "./Modal/Moviedetail";

const Overlay = styled(motion.div)`
  position: fixed;
  top:0;
  left:0;
  width:100%;
  height:100vh;
  background-color: rgba(0,0,0,0.5);
  opacity: 0;
  z-index:99;
`;
interface IModal {
  dataId: number,
  movType: string,
}

function Modal({
  dataId,
  movType

}: IModal) {

  //Data
  const { data: DetailData } = useQuery<IGetTvDetail>(
    "Detail",
    () => getDetail(movType, dataId)
  );



  const navigate = useNavigate();
  const bigMovieMatch = useMatch("/trending/:movType/:trendId");
  const onOverlayClicked = () => navigate("/");
  const clickedMovie = Number(DetailData?.id) === Number(bigMovieMatch?.params.trendId) ? DetailData : null;



  return (
    <>
      <AnimatePresence>
        {bigMovieMatch ? (
          <>
            <Overlay
              onClick={onOverlayClicked}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />


          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default Modal;