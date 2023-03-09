import { motion } from "framer-motion";
import styled from "styled-components";
import { IData, IGenre } from "../api";
import { makeImagePath } from "../utils";

const Banner = styled.section<{ bgImage: string }>`
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
    <Banner bgImage={makeImagePath(trendData[0].backdrop_path || "")}>
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
    </Banner>

  );
}

export default VisualBanner;