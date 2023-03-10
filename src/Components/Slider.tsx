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
      <TrendSlider
        title={"π μ€λ νλ£¨ μΈκΈ°μμλ μν / TVμλ¦¬μ¦"}
        trendData={trendData as IData[]}
      />
      <UpcomingMovieSlider
        title={"π Upcoming Movie! κ°λ΄ μμ  μν"}
        upcomingData={upcomingData as IGetUpcomingMovie[]}
        upcomingTermData={upcomingTermData as IGetUpcomingMovies}
      />
      <TopRatedTVSlider
        title={"β­οΈ λ³μ΄ λ€μ―κ°! β­οΈ μ΅κ³ μ νμ μ λ°μ TVμλ¦¬μ¦"}
        topRatedTVData={topRatedTVData as ITopRatedTV[]}
      />
    </>
  );
}

export default Slider;