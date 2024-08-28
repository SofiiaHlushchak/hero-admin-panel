import { createAction } from "@reduxjs/toolkit";

export const fetchHeroes = (request) => (dispatch) => {
    dispatch("HEROES_FETCHING");
    request("http://localhost:3001/heroes")
        .then((data) => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()));
};

export const fetchFilters = (request) => (dispatch) => {
    dispatch("FILTERS_FETCHING");
    request("http://localhost:3001/filters")
        .then((data) => dispatch(filtersFetched(data)))
        .catch(() => dispatch(filtersFetchingError()));
};

export const heroesFetched = createAction("HEROES_FETCHED");

export const heroesFetchingError = createAction("HEROES_FETCHING_ERROR");

export const filtersFetchingError = createAction("FILTERS_FETCHING_ERROR");

export const filtersFetched = createAction("FILTERS_FETCHED");

export const activeFilterChanged = createAction("ACTIVE_FILTER_CHANGED");

export const heroDeleted = createAction("HERO_DELETED");

export const heroCreated = createAction("HERO_CREATED");
