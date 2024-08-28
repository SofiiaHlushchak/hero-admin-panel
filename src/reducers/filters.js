import { createReducer } from "@reduxjs/toolkit";
import {
    filtersFetched,
    filtersFetchingError,
    activeFilterChanged,
} from "../actions";

const initialState = {
    filters: [],
    filtersLoadingStatus: "idle",
    activeFilter: "all",
    filteredHeroes: [],
};

const filters = createReducer(initialState, (builder) => {
    builder
        .addCase("FILTERS_FETCHING", (state) => {
            state.filtersLoadingStatus = "loading";
        })
        .addCase(filtersFetched, (state, action) => {
            state.filtersLoadingStatus = "idle";
            state.filters = action.payload;
        })
        .addCase(filtersFetchingError, (state) => {
            state.filtersLoadingStatus = "error";
        })
        .addCase(activeFilterChanged, (state, action) => {
            state.activeFilter = action.payload;
        })
        .addDefaultCase(() => {});
});

export default filters;
