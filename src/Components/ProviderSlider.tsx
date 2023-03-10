import styled from "styled-components";
import { IMovieProvider, ITVProvider } from "../api";
import MovieProviderSlider from "./Slider/MovieProviderSlider";
import TVProviderSlider from "./Slider/TVProviderSlider";

const Wrapper = styled.section``;

function ProviderSlider({
  MovieProviderData,
  TVProviderData
}: {
  MovieProviderData: IMovieProvider[],
  TVProviderData: ITVProvider[]
}) {

  return (
    <Wrapper>
      <MovieProviderSlider MovieProviderData={MovieProviderData as IMovieProvider[]} />
      <TVProviderSlider TVProviderData={TVProviderData as IMovieProvider[]} />
    </Wrapper>
  );
}

export default ProviderSlider;