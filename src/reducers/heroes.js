import { createReducer } from "@reduxjs/toolkit";
import {
    heroCreated,
    heroDeleted,
    heroesFetched,
    heroesFetchingError,
} from "../actions";

const initialState = {
    heroes: [],
    heroesLoadingStatus: "idle",
};

const heroes = createReducer(initialState, (builder) => {
    builder
        .addCase("HEROES_FETCHING", (state) => {
            state.heroesLoadingStatus = "loading";
        })
        .addCase(heroesFetched, (state, action) => {
            state.heroesLoadingStatus = "idle";
            state.heroes = action.payload;
        })
        .addCase(heroesFetchingError, (state) => {
            state.heroesLoadingStatus = "error";
        })
        .addCase(heroCreated, (state, action) => {
            state.heroes.push(action.payload);
        })
        .addCase(heroDeleted, (state, action) => {
            state.heroes = state.heroes.filter(
                (item) => item.id !== action.payload
            );
        })
        .addDefaultCase(() => {});
});

export default heroes;
