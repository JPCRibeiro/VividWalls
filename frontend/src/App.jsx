import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/Home";
import UploadPage from "./pages/Upload";
import ImagesPage from "./pages/Images";
import Header from "./components/Header";
import ImagePage from "./pages/Image";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route element={<Header/>}>
          <Route path="recentes" element={<ImagesPage/>}/>
          <Route path="upload" element={<UploadPage/>}/>
          <Route path="wallpapers/:imageName" element={<ImagePage/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}