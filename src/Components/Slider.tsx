import { IData } from "../api";
import TrendSlider from "./Slider/TrendSlider";

function Slider({
  trendData
}: {
  trendData: IData[]
}) {

  return (
    <>
      <TrendSlider trendData={trendData as IData[]} />
    </>
  );
}

export default Slider;