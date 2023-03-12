import { motion } from "framer-motion";
import styled from "styled-components";
import { IData, IGenre } from "../api";
import { makeImagePath } from "../utils";

const Banner = styled.section`
  height: 80vh;
  padding-top:6.8rem;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Container = styled.div`
  width: 113rem;
  height: 100%;
  margin: 0 auto;
  display: flex;
  padding: 0 3rem;
`;

const BackgdropImage = styled.div<{ bgImage: string }>`
  background-image: linear-gradient(rgba(0,0,0,0),rgba(0,0,0,1)) ,url( ${props => props.bgImage});
  position: absolute;
  left: 0;
  top: 0;
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 80rem;
  filter: brightness(0.7);
`;

const TitleBox = styled.div`
  width: 70%;
  align-self: center;
`;

const Title = styled(motion.h2)`
  font-size:4rem;
  letter-spacing: -0.1rem;
  margin-bottom:5rem;
  font-weight: bold;
`;

const OriginalTitle = styled.span`
  color:rgba(255, 255, 255, 0.7);
  font-size:2rem;
  font-weight: 400;
  margin-left:1rem;
`;

const GenreTagList = styled(motion.ul)`
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
  align-items: center;
  margin-bottom:2.5rem;
`;

const GenreTag = styled.li`
  font-size:1.8rem;
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
  font-size: 1.8rem;
  letter-spacing: -0.1rem;
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
  margin-top:3rem;
  width:100%;
`;

const TrailerPlayBtn = styled.button`
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  width: 165px;
  height: 60px;
  padding: 1rem 0;
  text-align: center;
  justify-content: center;
  line-height: 1;
  font-size: 1.8rem;
  border: none;
  border-radius: 0.5rem;
  font-weight: 400;
  outline: none;
  margin-right:1rem;
  color:#000000;
  cursor:pointer;

  span {
    line-height: 1;
  }

  .material-symbols-rounded {
    font-size:4rem;
    margin-right:1.5rem;
  }

  &:hover{
    background-color: rgba(255, 255, 255, 0.75);
  }
`;

const InfoBtn = styled.button`
  display: flex;
    -webkit-box-align: center;
    align-items: center;
    width: 260px;
    padding: 1rem 0px;
    text-align: center;
    -webkit-box-pack: center;
    justify-content: center;
    font-size: 1.8rem;
    border: none;
    height: 60px;
    border-radius: 0.5rem;
    font-weight: 400;
    outline: none;
    background-color: rgba(109, 109, 110, 0.7);
    color: rgb(255, 255, 255);
    cursor: pointer;

    span {
      line-height: 1;
    }

  .material-symbols-rounded {
    font-size:3rem;
    margin-right:1.5rem;
  }

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

  return (
    <>
      <BackgdropImage bgImage={makeImagePath(trendData[0].backdrop_path || "")} />
      <Banner>
        <Container>
          <TitleBox>
            <Title
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.4,
                duration: 1
              }}
            >
              {trendData[0].title ? trendData[0].title : trendData[0].name}
              <OriginalTitle>
                {trendData[0].original_name ? trendData[0].original_name : trendData[0].original_title}
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
              <TrailerPlayBtn>
                <span className="material-symbols-rounded">play_arrow</span>
                <span>재생</span>
              </TrailerPlayBtn>
              <InfoBtn>
                <span className="material-symbols-rounded">info</span>
                <span>상세정보</span>
              </InfoBtn>
            </BtnList>
          </TitleBox>
        </Container>
      </Banner>
    </>

  );
}

export default VisualBanner;