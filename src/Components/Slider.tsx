import { IData, IGetUpcomingMovie, IGetUpcomingMovies } from "../api";
import TrendSlider from "./Slider/TrendSlider";
import UpcomingMovieSlider from "./Slider/UpcomingMovieSlider";

function Slider({
  trendData,
  upcomingData,
  upcomingTermData
}: {
  trendData: IData[],
  upcomingData: IGetUpcomingMovie[]
  upcomingTermData: IGetUpcomingMovies
}) {

  return (
    <>
      <TrendSlider trendData={trendData as IData[]} />
      <UpcomingMovieSlider
        upcomingData={upcomingData as IGetUpcomingMovie[]}
        upcomingTermData={upcomingTermData as IGetUpcomingMovies}
      />
    </>
  );
}

export default Slider;