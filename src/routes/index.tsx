import { Route, Routes } from "react-router-dom";
import LayoutClient from "../components/layouts/clients/LayoutClient";
import HomePages from "../components/layouts/clients/pages/HomePages";
import MangaDetail from "../components/layouts/clients/pages/MangaDetail";

const Router = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LayoutClient />}>
          <Route index element={<HomePages />} />
          <Route path="/home" element={<HomePages />} />
          <Route path="/detail/:slug" element={<MangaDetail />} />
        </Route>
      </Routes>
    </div>
  );
};

export default Router;
