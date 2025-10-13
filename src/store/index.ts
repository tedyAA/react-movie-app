import { configureStore } from '@reduxjs/toolkit';
import genresReducer from './slices/genresSlice';
import moviesReducer from './slices/moviesSlice';

export const store = configureStore({
    reducer: {
        genres: genresReducer,
        movies: moviesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
