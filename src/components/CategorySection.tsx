import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import noImage from "../assets/noImage.jpg";
import type { DataTypes, ItemsCategory } from "../modules/types_file.ts";
import { fetchGenres } from "../store/slices/genresSlice";
import { fetchMoviesByEndpoint } from "../store/slices/moviesSlice";
import type {AppDispatch, RootState} from "../store";

interface CategorySecProps extends ItemsCategory {
    handleMovieClick: (movieId: number) => void;
}

const CategorySection: React.FC<CategorySecProps> = ({
                                                         itemHeading,
                                                         handleMovieClick,
                                                         apiEndpoint,
                                                     }) => {
    const dispatch = useDispatch<AppDispatch>();

    const { movieGenres, tvGenres } = useSelector((state: RootState) => state.genres);
    const movies = useSelector(
        (state: RootState) => state.movies.moviesByCategory[apiEndpoint] || []
    );

    useEffect(() => {
        dispatch(fetchGenres());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchMoviesByEndpoint(apiEndpoint));
    }, [dispatch, apiEndpoint]);

    const getGenreNames = (genreIds: number[], mediaType?: string): string[] => {
        const genres = mediaType === "tv" ? tvGenres : movieGenres;
        return genreIds
            .map((id) => genres.find((genre) => genre.id === id))
            .filter(Boolean)
            .map((genre) => genre!.name);
    };

    const getYear = (dateStr?: string) => {
        if (!dateStr) return "N/A";
        return new Date(dateStr).getFullYear() || "N/A";
    };

    return (
        <div className="bg-gray-900">
            <div className="my-6 text-center sm:w-56 bg-gradient-to-l from-gray-900 to-gray-800">
                <h1 className="navbarText font-bold lg:text-2xl md:text-2xl text-neutral-50 p-4 py-1 rounded-xl animatetext">
                    {itemHeading}
                </h1>
            </div>
            <div className="flex flex-wrap justify-evenly space-x-0 mt-1 mx-4 items-start">
                {movies.map((movie: DataTypes) => {
                    const mediaType = movie.title ? "movie" : "tv";
                    const genreNames = movie.genre_ids
                        ? getGenreNames(movie.genre_ids, mediaType)
                        : [];

                    const year =
                        mediaType === "movie"
                            ? getYear(movie.release_date)
                            : getYear(movie.first_air_date);

                    const bottomText =
                        genreNames.length > 0
                            ? `${year} \u00B7 ${genreNames.join(" \u00B7 ")}`
                            : year;

                    return (
                        <div
                            key={movie.id}
                            className="relative text-neutral-300 flex flex-col justify-end rounded-lg pt-4 mt-4 w-64 m-1 cursor-pointer scale-95 hover:scale-100 duration-200"
                            onClick={() => handleMovieClick(movie.id)}
                        >
                            <img
                                src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                                alt={movie.title || movie.name}
                                className="rounded-lg border-0 h-[24rem] object-cover hover:shadow-[0_0_12px_1px_#ffffff76] animatetext"
                                onError={(event) => {
                                    event.currentTarget.src = noImage as string;
                                }}
                            />

                            <div className="absolute bottom-0 left-0 w-full px-3 py-2 rounded-b-lg bg-gradient-to-t from-black/80 to-transparent flex justify-center">
                                <p
                                    className="text-md text-white truncate max-w-full whitespace-nowrap"
                                    title={String(bottomText)}
                                >
                                    {bottomText}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default CategorySection;
