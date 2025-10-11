import { useState, useEffect } from "react";
import { baseUrl, apiKey } from "../modules/ApiLiks";
import { getFormattedDate } from "../modules/types_file";
import noImage from "../assets/noImage.jpg";
import axios from "axios";

interface MovieDetails {
  id: number;
  title: string;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  release_date: string;
  genres: { id: number; name: string }[];
  runtime: number;
  vote_average: number;
  tagline: string;
}

interface CastMember {
  id: number;
  name: string;
  profile_path: string | null;
  character: string;
}

interface MovieCreditResponse {
  cast: CastMember[];
  crew: { id: number; name: string; job: string }[];
}

interface SimilarMovie {
  id: number;
  title: string;
  poster_path: string;
}

interface Trailer {
  id: string;
  key: string;
  name: string;
  type: string;
}

const MovieOverlay = ({
                        movieId,
                        isOpen,
                        onClose,
                      }: {
  movieId: number | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [movieDetails, setMovieDetails] = useState<MovieDetails | null>(null);
  const [movieCredits, setMovieCredits] = useState<CastMember[]>([]);
  const [similarMovies, setSimilarMovies] = useState<SimilarMovie[]>([]);
  const [trailers, setTrailers] = useState<Trailer[]>([]);

  useEffect(() => {
    if (!movieId || !isOpen) return;

    const fetchMovieDetails = async () => {
      try {
        const [detailsRes, creditsRes, similarRes, trailersRes] =
            await Promise.all([
              axios.get(`${baseUrl}/movie/${movieId}?api_key=${apiKey}`),
              axios.get(`${baseUrl}/movie/${movieId}/credits?api_key=${apiKey}`),
              axios.get(`${baseUrl}/movie/${movieId}/similar?api_key=${apiKey}`),
              axios.get(`${baseUrl}/movie/${movieId}/videos?api_key=${apiKey}`),
            ]);

        const detailsData: MovieDetails = await detailsRes.data;
        const creditsData: MovieCreditResponse = await creditsRes.data;
        const similarData: { results: SimilarMovie[] } = await similarRes.data;
        const trailersData: { results: Trailer[] } = await trailersRes.data;

        setMovieDetails(detailsData);
        setMovieCredits(creditsData.cast);
        setSimilarMovies(similarData.results);
        setTrailers(
            trailersData.results.filter((video) => video.type === "Trailer")
        );
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchMovieDetails();
  }, [movieId, isOpen]);

  if (!isOpen || !movieDetails) return null;

  return (
      <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50">
        <div className="relative bg-gray-900 text-white rounded-lg max-w-6xl w-full max-h-screen overflow-y-auto p-6">
          {/* Close Button */}
          <button
              className="absolute top-4 right-6 text-3xl font-bold hover:scale-125 duration-300 z-50"
              onClick={onClose}
          >
            ✕
          </button>

          {/* Movie Header */}
          <div className="flex flex-col gap-4">
            <img
                src={`https://image.tmdb.org/t/p/original${movieDetails.backdrop_path}`}
                alt={movieDetails.title}
                className="rounded-lg max-h-[30rem] w-full object-cover"
            />

            <div className="flex flex-col">
              <div className="flex justify-between flex-wrap">
                <div>
                  <h2 className="text-3xl font-bold movieTitle text-orange-600">
                    {movieDetails.title}
                  </h2>
                  <p className="text-lg text-gray-400">{movieDetails.tagline}</p>
                  <p className="text-md text-neutral-300">
                    Genres:{" "}
                    {movieDetails.genres.map((genre) => genre.name).join(", ")}
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-md text-gray-400">
                    Runtime: {movieDetails.runtime} min
                  </p>
                  <p className="text-md text-gray-400">
                    {getFormattedDate(movieDetails.release_date)}
                  </p>
                </div>
              </div>

              <p className="text-lg mt-4 text-gray-300">
                {movieDetails.overview}
              </p>
            </div>
          </div>

          {/* Trailer Section */}
          <div className="mt-8 w-full">
            <h3 className="text-2xl font-bold mb-4">Trailer</h3>
            {trailers.length > 0 && (
                <iframe
                    key={trailers[0].id}
                    src={`https://www.youtube.com/embed/${trailers[0].key}`}
                    title={trailers[0].name}
                    allowFullScreen
                    className="rounded-lg w-full h-80"
                ></iframe>
            )}
          </div>

          {/* Cast Section */}
          <div className="mt-10">
            <h3 className="text-2xl font-bold mb-4 text-center">Cast</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {movieCredits.slice(0, 10).map((cast) => (
                  <div key={cast.id} className="text-center w-24">
                    <img
                        src={
                          cast.profile_path
                              ? `https://image.tmdb.org/t/p/w200${cast.profile_path}`
                              : noImage
                        }
                        alt={cast.name}
                        className="w-20 h-20 rounded-full object-cover mx-auto hover:scale-110 duration-300"
                    />
                    <p className="text-sm mt-2 truncate">{cast.name}</p>
                  </div>
              ))}
            </div>
          </div>

          {/* Similar Movies Section */}
          <div className="mt-10">
            <h3 className="text-2xl font-bold mb-4 text-center">
              Similar Movies
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {similarMovies.slice(0, 7).map((movie) => (
                  <div key={movie.id} className="w-32 text-center">
                    <img
                        src={
                          movie.poster_path
                              ? `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                              : noImage
                        }
                        alt={movie.title}
                        className="rounded-lg h-48 w-full object-cover"
                    />
                    <p className="text-sm mt-2">{movie.title}</p>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
};

export default MovieOverlay;

