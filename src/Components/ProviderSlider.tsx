import styled from "styled-components";
import { IMovieProvider, ITVProvider } from "../api";
import MovieProviderSlider from "./Slider/MovieProviderSlider";
import TVProviderSlider from "./Slider/TVProviderSlider";

const Wrapper = styled.section``;

const TitleContainer = styled.div`
  

`

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
        <h1>THE MOVIE DB의 API 데이터를 사용하였습니다.</h1>
        <p>https://developers.themoviedb.org</p>
      </TitleContainer>
      <MovieProviderSlider MovieProviderData={MovieProviderData as IMovieProvider[]} />
      <TVProviderSlider TVProviderData={TVProviderData as IMovieProvider[]} />
    </Wrapper>
  );
}

export default ProviderSlider;