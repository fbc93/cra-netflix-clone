import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import NotFound from "./Components/NotFound";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />
      },
      {
        path: "tv",
        element: <Tv />
      },
      {
        path: "/search",
        element: <Search />
      },
      {
        path: "/movie/:id",
        element: <Tv />
      },
      {
        path: "/tv/:id",
        element: <Tv />
      },
    ],

    errorElement: <NotFound />
  }
]);

export default Router;