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
        title={"🏆 오늘 하루 인기있었던 영화 / TV시리즈"}
        trendData={trendData as IData[]}
      />
      <UpcomingMovieSlider
        title={"🎉 Upcoming Movie! 개봉 예정 영화"}
        upcomingData={upcomingData as IGetUpcomingMovie[]}
        upcomingTermData={upcomingTermData as IGetUpcomingMovies}
      />
      <TopRatedTVSlider
        title={"⭐️ 별이 다섯개! ⭐️ 최고의 평점을 받은 TV시리즈"}
        topRatedTVData={topRatedTVData as ITopRatedTV[]}
      />
    </>
  );
}

export default Slider;