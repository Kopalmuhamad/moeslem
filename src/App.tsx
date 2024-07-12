import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Quran from "./pages/quran";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/quran/:surah",
      element: <Quran />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
