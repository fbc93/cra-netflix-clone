import styled from "styled-components";
import { ITVProvider } from "../../api";
import { makeImagePath } from "../../utils";

const Slider = styled.div`
  display: inline-flex;

  div{
    width:8vw;
    margin-right:1vw;
    margin-bottom:1vh;
    border-radius: 2vw;
    overflow: hidden;

    img{
      display: inline-block;
      width:100%;
    }
  }
`;

function TVProviderSlider({
  TVProviderData
}: {
  TVProviderData: ITVProvider[]
}) {

  return (
    <Slider>
      {TVProviderData?.map((item: ITVProvider) => (
        <div key={item.provider_id}>
          <img src={makeImagePath(String(item.logo_path))} alt={item.provider_name} />
        </div>
      ))}
    </Slider>
  );
}

export default TVProviderSlider;