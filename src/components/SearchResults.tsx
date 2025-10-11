import React, { useEffect, useState } from "react";
import noImage from "../assets/noImage.jpg";
import noResult from "../assets/no-result.png";
import type { DataTypes } from "../modules/types_file.ts";
import { getFormattedDate } from "../modules/types_file.ts";
import axios from "axios";

interface SearchProptType {
    searchResults: DataTypes[];
}

interface Genre {
    id: number;
    name: string;
}

const SearchResults: React.FC<SearchProptType> = ({ searchResults }) => {
    const [movieGenres, setMovieGenres] = useState<Genre[]>([]);
    const [tvGenres, setTvGenres] = useState<Genre[]>([]);

    useEffect(() => {
        const fetchGenres = async () => {
            const API_KEY = import.meta.env.VITE_API_KEY;

            try {
                const [movieRes, tvRes] = await Promise.all([
                    axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`),
                    axios.get(`https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}`),
                ]);

                setMovieGenres(movieRes.data.genres);
                setTvGenres(tvRes.data.genres);
            } catch (err) {
                console.error("Error fetching genres", err);
            }
        };

        fetchGenres();
    }, []);

    const getGenres = (genreIds: number[], mediaType: string): string[] => {
        const genres = mediaType === "tv" ? tvGenres : movieGenres;
        return genreIds
            .map((id) => genres.find((g) => g.id === id))
            .filter(Boolean)
            .map((g) => g!.name)
            .slice(0, 2); // Max 2 genres
    };

    return (
        <div className="search-results">
            {searchResults.length > 0 ? (
                <div className="flex flex-wrap justify-around mt-4">
                    {searchResults.map((item) => {
                        const title = item.title || item.name || "Untitled";
                        const year =
                            item.release_date || item.first_air_date
                                ? getFormattedDate(item.release_date || item.first_air_date).split(",")[1]
                                : "Unknown";

                        const genres = item.genre_ids
                            ? getGenres(item.genre_ids, item.media_type)
                            : [];

                        return (
                            <div
                                key={item.id}
                                className="text-neutral-300 flex items-center flex-col justify-center bg-slate-0 rounded-lg pt-4 mt-4 w-64 h-[28rem] m-1 cursor-pointer scale-95 hover:scale-100 hover:shadow-[0px_1px_5px_1px_#ffea0076] duration-200 relative"
                            >
                                <div className="relative w-60">
                                    <img
                                        src={`https://image.tmdb.org/t/p/w200/${item.poster_path}`}
                                        alt={title}
                                        className="rounded-lg border-0 w-full h-[22rem] object-cover hover:shadow-[0_-10px_12px_1px_#ffea0076]"
                                        onError={(event) => {
                                            event.currentTarget.src = noImage;
                                        }}
                                    />
                                    {/* Gradient + Year & Genres */}
                                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-2 py-3 text-sm text-white">
                                        <p className="font-semibold truncate">
                                            {year}
                                            {genres.length > 0 && ` • ${genres.join(" • ")}`}
                                        </p>
                                    </div>
                                </div>

                                {/* Title */}
                                <p className="text-xl font-bold truncate-text text-center mt-2 px-2">
                                    {title}
                                </p>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div className="flex justify-center">
                    <div className="flex flex-col justify-center items-center">
                        <img width={500} src={noResult} alt="No results found" />
                        <h1 className="text-3xl text-yellow-50">No Results Found!</h1>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SearchResults;
