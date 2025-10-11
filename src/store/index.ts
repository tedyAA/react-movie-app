// store.ts
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface DataTypes {
    id: number;
    title: string;
    poster_path: string | null;
    overview: string;
    vote_average: number;
    name: string;
    backdrop_path: string;
    media_type: string;
    release_date: string;
    first_air_date: string;
    genre_ids?: number[]; // add this because your API returns genre_ids
}

interface Genre {
    id: number;
    name: string;
}

interface MovieState {
    movies: DataTypes[];
    movieGenres: Genre[];
    tvGenres: Genre[];
}

const initialState: MovieState = {
    movies: [],
    movieGenres: [],
    tvGenres: [],
};

const movieSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {
        setMovies(state, action: PayloadAction<DataTypes[]>) {
            state.movies = action.payload;
        },
        setMovieGenres(state, action: PayloadAction<Genre[]>) {
            state.movieGenres = action.payload;
        },
        setTvGenres(state, action: PayloadAction<Genre[]>) {
            state.tvGenres = action.payload;
        },
    },
});

export const { setMovies, setMovieGenres, setTvGenres } = movieSlice.actions;

export const store = configureStore({
    reducer: {
        movies: movieSlice.reducer,
    },
});

// Types for usage in components
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
