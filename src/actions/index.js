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

export const heroesFetched = (heroes) => {
    return {
        type: "HEROES_FETCHED",
        payload: heroes,
    };
};

export const heroesFetchingError = () => {
    return {
        type: "HEROES_FETCHING_ERROR",
    };
};

export const filtersFetchingError = () => {
    return {
        type: "FILTERS_FETCHING_ERROR",
    };
};

export const filtersFetched = (filters) => {
    return {
        type: "FILTERS_FETCHED",
        payload: filters,
    };
};

export const activeFilterChanged = (filter) => {
    return {
        type: "ACTIVE_FILTER_CHANGED",
        payload: filter,
    };
};

export const heroDeleted = (id) => {
    return {
        type: "HERO_DELETED",
        payload: id,
    };
};

export const heroCreated = (hero) => {
    return {
        type: "HERO_CREATED",
        payload: hero,
    };
};
