import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.tsx";
import TvShows from "./pages/TvShows.tsx";
import Movies from "./pages/Movies.tsx";
import Navbar from "./components/Navbar.tsx";

function App() {
  return (
     <>
         <Navbar/>
         <Routes>
             <Route path="/home" element={<Home />} />
             <Route path="/movies" element={<Movies />} />
             <Route path="/tvshows" element={<TvShows />} />
         </Routes></>
  );
}

export default App;
