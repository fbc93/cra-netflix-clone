import styled from "styled-components";
import { IMovieProvider } from "../../api";
import { makeImagePath } from "../../utils";

const Slider = styled.div`
  display: inline-flex;

  div{
    width:8vw;
    margin-right:1vw;
    border-radius: 2vw;
    margin-bottom:1vh;
    overflow: hidden;

    img{
      display: inline-block;
      width:100%;
    }
  }
`;

function MovieProviderSlider({
  MovieProviderData
}: {
  MovieProviderData: IMovieProvider[]
}) {

  return (
    <Slider>
      {MovieProviderData?.map((item: IMovieProvider) => (
        <div key={item.provider_id}>
          <img src={makeImagePath(String(item.logo_path))} alt={item.provider_name} />
        </div>
      ))}
    </Slider>
  );
}

export default MovieProviderSlider;