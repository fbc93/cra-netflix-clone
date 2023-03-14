import { Link } from "react-router-dom";
import styled from "styled-components";
import { IMovieProvider, ITVProvider } from "../api";
import MovieProviderSlider from "./Slider/MovieProviderSlider";
import TVProviderSlider from "./Slider/TVProviderSlider";

const Wrapper = styled.footer`
  width:100%;
  
`;
const TitleContainer = styled.div`
  text-align: center;
  margin: 15vw auto 0px;
  max-width: 980px;
  padding: 0px 4%;
`;
const Url = styled(Link)`
  font-size: 1vw;
  color:rgba(255,255,255,0.5);
  &:hover{
    color:rgba(255,255,255,0.8);
  }
`;
const Copyright = styled.p`
  font-size:1.2vw;
  font-weight: 400;
  margin-bottom:1vw;
  color:rgba(255,255,255,1);
`;

function ProviderSlider({
  MovieProviderData,
  TVProviderData
}: {
  MovieProviderData: IMovieProvider[],
  TVProviderData: ITVProvider[]
}) {
  return (
    <Wrapper>
      <TitleContainer>
        <Copyright>Copyright 2023 yhwa, All Rights Reserved.</Copyright>
        <Url to="https://developers.themoviedb.org" target="_blank">THE MOVIE DB의 API 데이터를 사용하였습니다.</Url>
      </TitleContainer>
      <MovieProviderSlider MovieProviderData={MovieProviderData as IMovieProvider[]} />
      <TVProviderSlider TVProviderData={TVProviderData as IMovieProvider[]} />
    </Wrapper>
  );
}

export default ProviderSlider;