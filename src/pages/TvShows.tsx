import DisplayItems from "../components/DisplayItems";
import {
    airing_today,
    popularShows,
    top_rated_shows,
    trendingShows,
} from "../modules/ApiLiks";
import { createDisplayItems } from "../modules/types_file.ts";
import type { ItemsCategory } from "../modules/types_file.ts";


const TvShows = ({ handleTvClick }: { handleTvClick: (tvId: number) => void }) => {
    const displayCategories: ItemsCategory[] = [
        createDisplayItems(trendingShows, "Trending Shows"),
        createDisplayItems(airing_today, "Watch On Tv 📺"),
        createDisplayItems(popularShows, "Popular"),
        createDisplayItems(top_rated_shows, "Top Rated Shows"),
    ];

    return (
        <div>
            <DisplayItems displayTags={displayCategories} handleMovieClick={handleTvClick}/>
        </div>
    );
};

export default TvShows;
