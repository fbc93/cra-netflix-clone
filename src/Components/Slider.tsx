import { IData, IGetUpcomingMovie, IGetUpcomingMovies, ITopRatedTV } from "../api";
import TopRatedTVSlider from "./Slider/TopRatedTVSlider";
import TrendSlider from "./Slider/TrendSlider";
import UpcomingMovieSlider from "./Slider/UpcomingMovieSlider";

function Slider({
  trendData,
  upcomingData,
  upcomingTermData,
  topRatedTVData
}: {
  trendData: IData[],
  upcomingData: IGetUpcomingMovie[]
  upcomingTermData: IGetUpcomingMovies,
  topRatedTVData: ITopRatedTV[]
}) {

  return (
    <>
      <TrendSlider trendData={trendData as IData[]} />
      <UpcomingMovieSlider
        upcomingData={upcomingData as IGetUpcomingMovie[]}
        upcomingTermData={upcomingTermData as IGetUpcomingMovies}
      />
      <TopRatedTVSlider topRatedTVData={topRatedTVData as ITopRatedTV[]} />
    </>
  );
}

export default Slider;