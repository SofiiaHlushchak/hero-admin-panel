import { configureStore } from "@reduxjs/toolkit";
import filters from "../components/heroesFilters/heroesFiltersSlice";
import heroes from "../components/heroesList/heroesSlice";

const stringMiddleware = () => (dispatch) => (action) => {
    if (typeof action === "string") {
        return dispatch({
            type: action,
        });
    }

    return dispatch(action);
};

const store = configureStore({
    reducer: { filters, heroes },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(stringMiddleware),
    devTools: process.env.NODE_ENV !== "production",
});

export default store;
