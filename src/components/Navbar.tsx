import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../assets/logo.png";
import user from "../assets/user.png";
import { popular, popularShows } from "../modules/ApiLiks.ts";
import { NavLink, useLocation } from "react-router-dom";

interface NavbarProps {
  onSearch?: (query: string) => void;
  isSearching?: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch, isSearching }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [movieData, setMovieData] = useState({
    backdropPath: "",
    title: "",
    overview: "",
  });

  const location = useLocation();

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/movies", label: "Movies" },
    { to: "/tvshows", label: "TV Shows" },
  ];

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 150);
  };

  const fetchMediaData = async (type: "movie" | "tv") => {
    const url = type === "tv" ? popularShows : popular;

    try {
      const { data } = await axios.get(url);
      const randomItem = data.results[Math.floor(Math.random() * data.results.length)];

      if (!randomItem?.backdrop_path) return;

      setMovieData({
        backdropPath: `https://image.tmdb.org/t/p/original${randomItem.backdrop_path}`,
        title: randomItem.title || randomItem.name || "Untitled",
        overview: randomItem.overview || "No overview available.",
      });
    } catch (err) {
      console.error("Failed to fetch media data:", err);
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearch?.(query);
  };

  // Fetch background media on route change
  useEffect(() => {
    const path = location.pathname;
    if (path.includes("tvshows")) fetchMediaData("tv");
    else fetchMediaData("movie");

    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Scroll listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
      <div
          className={`relative bg-cover bg-center ${
              isSearching ? "h-40" : "h-screen"
          } text-white transition-all duration-500`}
          style={{ backgroundImage: `url(${movieData.backdropPath})` }}
      >
        {/* Navbar */}
        <header
            className={`fixed left-0 top-0 w-full z-50 px-1 py-1 transition-colors duration-500 bg-gradient-to-b from-black to-transparent h-64 w-full`}
        >
          <div className="flex justify-between items-center h-[65px]">
            {/* Logo */}
            <img
                src={logo}
                alt="user"
                className="w-10 h-10 ml-5 rounded-full cursor-pointer hover:scale-110 hover:rotate-90 transition-transform duration-300"
            />

            {/* Nav Links */}
            <nav className="hidden md:flex space-x-10 font-bold text-gray-300 navbarText text-xl ">
              {navLinks.map(({to, label}) => (
                  <NavLink
                      key={to}
                      to={to}
                      className={({isActive}) =>
                          `hover:text-white transition-transform duration-200 ${
                              isActive ? "border-b-2 border-current  pb-0.3 " : ""
                          }`
                      }
                  >
                    {label}
                  </NavLink>
              ))}
            </nav>

            {/* Search + User */}
            <div className="hidden md:flex items-center space-x-2">
              <input
                  value={searchQuery}
                  onChange={handleSearchChange}
                  type="text"
                  placeholder="Search"
                  className="p-2 px-4 rounded-full bg-[#f8f8f837] text-white placeholder-neutral-300 outline-none border-none xl:w-96 lg:w-56 md:w-44"
              />
              <span className="material-icons p-1">search</span>
              <img
                  src={user}
                  alt="user"
                  className="w-10 h-10 rounded-full cursor-pointer hover:scale-110 hover:rotate-90 transition-transform duration-300"
              />
            </div>

            {/* Hamburger */}
            <button
                className="block md:hidden text-white text-3xl"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              ☰
            </button>
          </div>
        </header>

        {/* Mobile Drawer */}
        <div
            className={`fixed top-0 right-0 w-64 h-full z-50 bg-black bg-opacity-90 text-white transform ${
                isMenuOpen ? "translate-x-0" : "translate-x-full"
            } transition-transform duration-300`}
        >
          <button
              className="absolute top-4 right-4 text-3xl"
              onClick={() => setIsMenuOpen(false)}
          >
            ✕
          </button>
          <div className="flex flex-col space-y-6 mt-16 px-6 text-xl">
            {navLinks.map(({ to, label }) => (
                <NavLink
                    key={to}
                    to={to}
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:text-gray-400"
                >
                  {label}
                </NavLink>
            ))}
          </div>
          <div className="mt-6 px-6">
            <input
                value={searchQuery}
                onChange={handleSearchChange}
                type="text"
                placeholder="Search"
                className="w-full p-2 rounded-full text-black bg-gray-300 placeholder-gray-500"
            />
          </div>
        </div>

        {/* Backdrop Content */}
        {!isSearching && (
            <div
                className="absolute inset-0 h-full bg-gradient-to-t from-black to-transparent flex flex-col justify-center px-8">
              <h1 className="text-5xl font-bold mb-4 movieTitle tracking-wider">
                {movieData.title}
              </h1>
              <p className="overviewText text-xl max-w-prose">{movieData.overview}</p>

              <button
                  className="mt-4 w-fit px-4 py-2 bg-[#9d9a96ac] font-bold rounded-lg hover:bg-white hover:text-black transition-all duration-300 flex items-center gap-2">
                More Info
                <span className="material-icons">info</span>
              </button>
            </div>

        )}
      </div>
  );
};

export default Navbar;
