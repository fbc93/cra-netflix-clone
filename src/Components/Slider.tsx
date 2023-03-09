import { IData, IGetUpcomingMovie, IGetUpcomingMovies } from "../api";
import TrendSlider from "./Slider/TrendSlider";
import UpcomingMovieSlider from "./Slider/UpcomingMovieSlider";

function Slider({
  trendData,
  upcomingData
}: {
  trendData: IData[],
  upcomingData: IGetUpcomingMovie[]
}) {

  return (
    <>
      <TrendSlider trendData={trendData as IData[]} />
      <UpcomingMovieSlider upcomingData={upcomingData as IGetUpcomingMovie[]} />
    </>
  );
}

export default Slider;