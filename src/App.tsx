import { useEffect } from "react";
import { useQuery } from "react-query";
import { Outlet } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { getMovieWatchProvider, getTVWatchProviders, IMovieProvider, ITVProvider } from "./api";
import { windowWidth } from "./atoms";
import Header from "./Components/Navigation";
import ProviderSlider from "./Components/ProviderSlider";

function App() {
  //반응형 atom
  const setWidth = useSetRecoilState(windowWidth);

  useEffect(() => {
    const debounceResizeHandler = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener("resize", debounceResizeHandler);
    return () => window.removeEventListener("resize", debounceResizeHandler);
  }, [setWidth]);

  const { data: MovieProviderData } = useQuery(
    "MovieWatchProvider",
    getMovieWatchProvider
  );

  const { data: TVProviderData } = useQuery(
    "TVWatchProvider",
    getTVWatchProviders
  );

  return (
    <>
      <Header />
      <Outlet />
      <ProviderSlider
        MovieProviderData={MovieProviderData?.results.slice(0, 20) as IMovieProvider[]}
        TVProviderData={TVProviderData?.results.slice(20, 40) as ITVProvider[]}
      />
    </>
  );
}

export default App;
