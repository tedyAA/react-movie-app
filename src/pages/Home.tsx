import React from "react";
import type { ItemsCategory } from "../modules/types_file.ts";
import { createDisplayItems } from "../modules/types_file.ts";
import { airing_today, now_playing, popular, popularShows, trendingShows, upcoming } from "../modules/ApiLiks.ts";
import DisplayItems from "../components/DisplayItems.tsx";

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
                <DisplayItems displayTags={chooseWhatToDisplay} handleMovieClick={handleMovieClick} />
            </div>
        </div>
    );
};

export default Home;
