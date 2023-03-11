import styled, { keyframes } from "styled-components";
import { IMovieProvider } from "../../api";
import { makeImagePath } from "../../utils";

const SliderContainer = styled.div`
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  width: 100%;
  height: 5vh;
  overflow: hidden;
  position: relative;
  margin-top:5vh;
  margin-bottom:2vh;

`;

const offset1 = keyframes`
   0% {
      transform:translateX(-100%);
    }

    100% {
      transform:translateX(0%);
    }
`;

const offset2 = keyframes`
   0% {
      transform:translateX(0%);
    }

    100% {
      transform:translateX(100%);
    }
`;

const offset3 = keyframes`
   0% {
      transform:translateX(100%);
    }

    100% {
      transform:translateX(200%);
    }
`;

const SlideOffset1 = styled.span`
    display: inline-flex;
    animation: 60s linear 0s infinite normal none running ${offset1};
    white-space: nowrap;
    overflow: hidden;
    position: absolute;
    
    section {
      white-space: nowrap;
      overflow: hidden;
      display: flex;

      span {
        display: inline-block;
        width:55px;
        margin-right:15px;

        img {
          width:100%;
          border-radius: 10px;
          display: inline-block;
        }
      }
    }
`;

const SlideOffset2 = styled.span`
    display: inline-flex;
    animation: 60s linear 0s infinite normal none running ${offset2};
    white-space: nowrap;
    overflow: hidden;
    position: absolute;
    
    section {
      white-space: nowrap;
      overflow: hidden;
      display: flex;

      span {
        display: inline-block;
        width:55px;
        margin-right:15px;

        img {
          width:100%;
          border-radius: 10px;
          display: inline-block;
        }
      }
    }
`;

const SlideOffset3 = styled.span`
    display: inline-flex;
    animation: 60s linear 0s infinite normal none running ${offset3};
    white-space: nowrap;
    overflow: hidden;
    position: absolute;
    
    section {
      white-space: nowrap;
      overflow: hidden;
      display: flex;

      span {
        display: inline-block;
        width:55px;
        margin-right:15px;

        img {
          width:100%;
          border-radius: 10px;
          display: inline-block;
        }
      }
    }
`;

function MovieProviderSlider({
  MovieProviderData,

}: {
  MovieProviderData: IMovieProvider[],

}) {

  return (
    <SliderContainer>


      <SlideOffset1>
        <section>
          {MovieProviderData?.map((item: IMovieProvider) => (
            <span key={item.provider_id}>
              <img src={makeImagePath(String(item.logo_path))} alt={item.provider_name} />
            </span>
          ))}
        </section>
      </SlideOffset1>
      <SlideOffset2>
        <section>
          {MovieProviderData?.map((item: IMovieProvider) => (
            <span key={item.provider_id}>
              <img src={makeImagePath(String(item.logo_path))} alt={item.provider_name} />
            </span>
          ))}
        </section>
      </SlideOffset2>
      <SlideOffset3>
        <section>
          {MovieProviderData?.map((item: IMovieProvider) => (
            <span key={item.provider_id}>
              <img src={makeImagePath(String(item.logo_path))} alt={item.provider_name} />
            </span>
          ))}
        </section>
      </SlideOffset3>


    </SliderContainer>
  );
}

export default MovieProviderSlider;