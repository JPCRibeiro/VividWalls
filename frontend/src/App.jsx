import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ImagesPage from "./pages/Images";
import HomePage from "./pages/Home";
import UploadPage from "./pages/Upload";
import ImagePage from "./pages/Image";
import Header from "./components/Header";
import NotFoundPage from "./pages/NotFound";
import RegisterPage from "./pages/Register";
import LoginPage from "./pages/Login";
import { recentImagesLoader } from "./loaders/RecentImagesLoader";
import { homeImagesLoader } from "./loaders/HomeImagesLoader";
import { imagePageLoader } from "./loaders/ImagePageLoader";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
    loader: homeImagesLoader
  },
  {
    element: <Header />,
    children: [
      {
        path: "recentes",
        element: <ImagesPage />,
        loader: recentImagesLoader
      },
      {
        path: "upload",
        element: <UploadPage />,
      },
      {
        path: "wp/:imageName",
        element: <ImagePage />,
        loader: imagePageLoader
      },
      {
        path: "cadastro",
        element: <RegisterPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
