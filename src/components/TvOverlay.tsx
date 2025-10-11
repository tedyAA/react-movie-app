import { useState, useEffect } from "react";
import { baseUrl, apiKey } from "../modules/ApiLiks";
import { getFormattedDate } from "../modules/types_file";
import noImage from "../assets/noImage.jpg";
import axios from "axios";

interface TvDetails {
  id: number;
  name: string;
  backdrop_path: string;
  poster_path: string;
  overview: string;
  first_air_date: string;
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
  name: string;
  poster_path: string;
}

const TvOverlay = ({
                     tvId,
                     isOpen,
                     onClose,
                   }: {
  tvId: number | null;
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [tvDetails, setTvDetails] = useState<TvDetails | null>(null);
  const [tvCredits, setTvCredits] = useState<CastMember[]>([]);
  const [similarShows, setSimilarShows] = useState<SimilarMovie[]>([]);

  useEffect(() => {
    if (!tvId || !isOpen) return;

    const fetchMovieDetails = async () => {
      try {
        const [detailsRes, creditsRes, similarRes] = await Promise.all([
          axios.get(`${baseUrl}/tv/${tvId}?api_key=${apiKey}`),
          axios.get(`${baseUrl}/tv/${tvId}/credits?api_key=${apiKey}`),
          axios.get(`${baseUrl}/tv/${tvId}/similar?api_key=${apiKey}`),
        ]);

        const detailsData: TvDetails = await detailsRes.data;
        const creditsData: MovieCreditResponse = await creditsRes.data;
        const similarData: { results: SimilarMovie[] } = await similarRes.data;

        setTvDetails(detailsData);
        setTvCredits(creditsData.cast);
        setSimilarShows(similarData.results);
      } catch (error) {
        console.error("Error fetching TV data:", error);
      }
    };

    fetchMovieDetails();
  }, [tvId, isOpen]);

  if (!isOpen || !tvDetails) return null;

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

          {/* TV Banner + Info */}
          <div className="flex flex-col gap-4">
            <img
                src={`https://image.tmdb.org/t/p/original${tvDetails.backdrop_path}`}
                alt={tvDetails.name}
                className="rounded-lg max-h-[30rem] w-full object-cover"
            />

            <div className="flex flex-col">
              <div className="flex justify-between flex-wrap">
                <div>
                  <h2 className="text-3xl font-bold movieTitle text-orange-600">
                    {tvDetails.name}
                  </h2>
                  {tvDetails.tagline && (
                      <p className="text-lg text-gray-400">{tvDetails.tagline}</p>
                  )}
                  <p className="text-md text-neutral-300">
                    Genres:{" "}
                    {tvDetails.genres.map((genre) => genre.name).join(", ")}
                  </p>
                </div>

                <div className="text-right mt-2 sm:mt-0">
                  <p className="text-md text-gray-400">
                    {getFormattedDate(tvDetails.first_air_date)}
                  </p>
                </div>
              </div>

              <p className="text-lg mt-4 text-gray-300">{tvDetails.overview}</p>
            </div>
          </div>

          {/* Cast Section */}
          <div className="my-10">
            <h3 className="text-2xl font-bold mb-4 text-center">Cast</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {tvCredits.slice(0, 10).map((cast) => (
                  <div key={cast.id} className="w-24 text-center">
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

          {/* Similar Shows Section */}
          <div className="mt-10">
            <h3 className="text-2xl font-bold mb-4 text-center">Similar Shows</h3>
            <div className="flex flex-wrap justify-center gap-4">
              {similarShows.slice(0, 7).map((tv) => (
                  <div key={tv.id} className="w-32 text-center">
                    <img
                        src={
                          tv.poster_path
                              ? `https://image.tmdb.org/t/p/w200${tv.poster_path}`
                              : noImage
                        }
                        alt={tv.name}
                        className="rounded-lg h-48 w-full object-cover"
                    />
                    <p className="text-sm mt-2">{tv.name}</p>
                  </div>
              ))}
            </div>
          </div>
        </div>
      </div>
  );
};

export default TvOverlay;
