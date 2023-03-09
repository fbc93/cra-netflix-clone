import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useMatch, useNavigate } from "react-router-dom";
import { makeImagePath } from "../utils";
import styled from "styled-components";
import { getDetail, IData, IGetTvDetail, ILastEpisode, INetworks, IProductCompanies, ISeasons, ISpokenLang } from "../api";
import { useQuery } from "react-query";

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

const BigMovie = styled(motion.div)`
  position: fixed;
  width: 50%;
  height: 75%;
  top:12rem;
  z-index:100;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: #555555;
  border-radius: 15px;
  overflow: hidden;
  box-sizing: border-box;
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

interface IModal {
  trendData: IData[],
  dataId: number,
  movType: string
}

function Modal({
  trendData,
  dataId,
  movType

}: IModal) {
  //Data
  const { data: DetailData } = useQuery<IGetTvDetail>(
    "Detail",
    () => getDetail(movType, dataId)
  );

  //console.log(DetailData?.id, trendData);


  const { scrollY } = useScroll();
  const navigate = useNavigate();
  const bigMovieMatch = useMatch("/trending/:movType/:trendId");
  const onOverlayClicked = () => navigate("/");
  const clickedMovie = Number(DetailData?.id) === Number(bigMovieMatch?.params.trendId) ? DetailData : null;

  console.log(clickedMovie)

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

            {bigMovieMatch?.params.movType === "tv" ? (
              <BigMovie
                layoutId={bigMovieMatch?.params.trendId}
                style={{ top: scrollY.get() + 100 }}>
                {clickedMovie &&
                  <>
                    <img src={makeImagePath(String(DetailData?.poster_path))} style={{ width: 200 }} alt="poster_image" />
                    <BigCover style={{ backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(clickedMovie.backdrop_path, "w500")})` }} />
                    <h1>미디어타입 : TV</h1>
                    <div>
                      <h2>방영중인 OTT</h2>
                      <ul>{DetailData?.networks.map((ott: INetworks) => (
                        <li key={ott.id}>
                          {ott.name}
                          <img src={makeImagePath(String(ott.logo_path))} style={{ width: 35 }} alt={ott.name} />
                        </li>
                      ))}</ul>
                    </div>

                    <div>언어: {DetailData?.spoken_languages.map((item: ISpokenLang) => <span key={item.name}>{item.name}</span>)}</div>
                    <BigTitle>{DetailData?.name}</BigTitle>
                    <div>{DetailData?.original_name}</div>
                    <ul>
                      {DetailData?.genres.map((genre) => <li key={genre.id}>{genre.name}</li>)}
                    </ul>
                    <div>평점: {Number(DetailData?.vote_average).toFixed(1)} /10</div>
                    {DetailData?.episode_run_time[0] && <div>Episode 러닝타임: {DetailData?.episode_run_time}분</div>}
                    <div>방영 시작일 :{DetailData?.first_air_date}</div>
                    <BigOverview>{DetailData?.overview}</BigOverview>

                    <div>
                      <h1>최근 방영 에피소드</h1>
                      <p>에피소드_{DetailData?.last_episode_to_air['episode_number']} : {DetailData?.last_episode_to_air['name']}</p>
                      <div >
                        <img
                          src={makeImagePath(String(DetailData?.last_episode_to_air['still_path']))}
                          alt={DetailData?.last_episode_to_air['name']}
                          style={{ width: 100 }}
                        />
                      </div>
                    </div>

                    {DetailData?.next_episode_to_air && (
                      <div>
                        <h1>방영 예정 에피소드</h1>
                        <div>
                          에피소드 {DetailData?.next_episode_to_air['episode_number']} :
                          {DetailData?.next_episode_to_air['name']}</div>
                        <img src={makeImagePath(String(DetailData?.next_episode_to_air['still_path']))} style={{ width: 100 }} alt={DetailData?.next_episode_to_air['name']} />
                      </div>
                    )}


                    <div>
                      <h1>시즌 리스트</h1>
                      <ul style={{ display: "flex" }}>
                        {DetailData?.seasons.map((season: ISeasons) => (
                          <li key={season.id}>
                            <div>{season.name}: {season.air_date}</div>
                            <img src={makeImagePath(String(season.poster_path))} style={{ width: 100 }} alt={season.name} />
                          </li>
                        ))}
                      </ul>
                    </div>




                    <footer>
                      <h1>제작사</h1>
                      <div style={{ display: "flex" }}>{DetailData?.production_companies.map((company: IProductCompanies) => (
                        <div key={company.id}>{company.name}
                          <div ><img src={makeImagePath(company.logo_path)} style={{ width: 20 }} alt={company.name} /></div>
                        </div>
                      ))}</div>

                    </footer>

                  </>
                }
              </BigMovie>

            ) : (
              <BigMovie
                layoutId={bigMovieMatch?.params.trendId}
                style={{ top: scrollY.get() + 100 }}>
                {clickedMovie &&
                  <>
                    <BigCover style={{ backgroundImage: `linear-gradient(to top, black, transparent), url(${makeImagePath(clickedMovie.backdrop_path, "w500")})` }} />
                    <h1>MOVIE</h1>
                    <div>{DetailData?.vote_average}</div>
                    <BigTitle>{DetailData?.name}</BigTitle>
                    <div>{DetailData?.original_name ? DetailData?.original_name : DetailData?.original_title}</div>
                    <div>러닝타임: {DetailData?.runtime}분</div>
                    <div>개봉일 :{DetailData?.first_air_date}</div>
                    <BigOverview>{DetailData?.overview}</BigOverview>
                  </>
                }
              </BigMovie>
            )}
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

export default Modal;