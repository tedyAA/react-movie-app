import DisplayItems from "../components/DisplayItems";
import { now_playing, popular, top_rated_movies, upcoming,  } from "../modules/ApiLiks";
import { createDisplayItems } from "../modules/types_file.ts";
import type { ItemsCategory } from "../modules/types_file.ts";


const Movies = ({ handleMovieClick }: { handleMovieClick: (movieId: number) => void }) => {
    const displayCategories: ItemsCategory[] = [
        createDisplayItems(now_playing, "Now Playing"),
        createDisplayItems(upcoming, "Upcoming"),
        createDisplayItems(popular, "Popular"),
        createDisplayItems(top_rated_movies, "Top Rated Movies"),
    ];
    return (
        <div className={"bg-gray-900"}>
            <DisplayItems displayTags={displayCategories} handleMovieClick={handleMovieClick}/>
        </div>
    );
};

export default Movies;
