import React from "react";
import type { ItemsCategory } from "../modules/types_file.ts";
import { createDisplayItems } from "../modules/types_file.ts";
import disneyVid from "../assets/brands/disney-video.mp4";
import { airing_today, now_playing, popular, popularShows, trendingShows, upcoming } from "../modules/ApiLiks.ts";
import DisplayItems from "../components/DisplayItems.tsx";
import BrandCard from "../components/BrandCard.tsx";

interface HomeProps {
    handleMovieClick: (movieId: number) => void;
}

const Home: React.FC<HomeProps> = ({ handleMovieClick }) => {
    const chooseWhatToDisplay: ItemsCategory[] = [
        createDisplayItems(now_playing, "Now Playing"),
        createDisplayItems(popular, "Popular Movies"),
        createDisplayItems(upcoming, "Upcoming"),
        createDisplayItems(trendingShows, "Trending Shows"),
        createDisplayItems(popularShows, "Popular Shows"),
        createDisplayItems(airing_today, "On Air Today"),
    ];

    return (
        <div>
            <div className="bg-gray-900">
                <div className="flex flex-wrap justify-evenly space-x-0 mt-1 mx-4 items-start hidden sm:block">
                    <BrandCard
                        imageSrc="/src/assets/brands/disney.webp"
                        src="/src/assets/brands/disney-video.mp4"/>
                    <BrandCard
                        imageSrc="/src/assets/brands/pixar.webp"
                        src="/src/assets/brands/pixar-video.mp4"/>
                    <BrandCard
                        imageSrc="/src/assets/brands/marvel.webp"
                        src="/src/assets/brands/marvel-video.mp4"/>
                    <BrandCard
                        imageSrc="/src/assets/brands/star-wars.webp"
                        src="/src/assets/brands/star-wars-video.mp4"/>
                    <BrandCard
                        imageSrc="/src/assets/brands/nat-geo.webp"
                        src="/src/assets/brands/nat-geo-video.mp4"/>
                </div>
                <DisplayItems displayTags={chooseWhatToDisplay} handleMovieClick={handleMovieClick}/>
            </div>
        </div>
    );
};

export default Home;
