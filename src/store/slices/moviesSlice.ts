import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { DataTypes } from "../../modules/types_file.ts";

interface MoviesState {
    moviesByCategory: {
        [endpoint: string]: DataTypes[];
    };
    loading: boolean;
    error: string | null;
}

const initialState: MoviesState = {
    moviesByCategory: {},
    loading: false,
    error: null,
};

export const fetchMoviesByEndpoint = createAsyncThunk(
    "movies/fetchMoviesByEndpoint",
    async (endpoint: string) => {
        const response = await axios.get(endpoint);
        return {
            endpoint,
            movies: response.data.results.slice(0, 5),
        };
    }
);

const moviesSlice = createSlice({
    name: "movies",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchMoviesByEndpoint.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchMoviesByEndpoint.fulfilled, (state, action) => {
                const { endpoint, movies } = action.payload;
                state.moviesByCategory[endpoint] = movies;
                state.loading = false;
            })
            .addCase(fetchMoviesByEndpoint.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch movies";
            });
    },
});

export default moviesSlice.reducer;
