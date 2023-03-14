import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { windowWidth } from "./atoms";
import Footer from "./Components/Footer";
import Header from "./Components/Navigation";

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

  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
