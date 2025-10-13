import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface Genre {
    id: number;
    name: string;
}

interface GenresState {
    movieGenres: Genre[];
    tvGenres: Genre[];
    loading: boolean;
    error: string | null;
}

const initialState: GenresState = {
    movieGenres: [],
    tvGenres: [],
    loading: false,
    error: null,
};

export const fetchGenres = createAsyncThunk("genres/fetchGenres", async () => {
    const API_KEY = import.meta.env.VITE_API_KEY;

    const [movieRes, tvRes] = await Promise.all([
        axios.get(
            `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`
        ),
        axios.get(
            `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`
        ),
    ]);

    return {
        movieGenres: movieRes.data.genres,
        tvGenres: tvRes.data.genres,
    };
});

const genresSlice = createSlice({
    name: "genres",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGenres.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchGenres.fulfilled, (state, action) => {
                state.loading = false;
                state.movieGenres = action.payload.movieGenres;
                state.tvGenres = action.payload.tvGenres;
            })
            .addCase(fetchGenres.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Error fetching genres";
            });
    },
});

export default genresSlice.reducer;
