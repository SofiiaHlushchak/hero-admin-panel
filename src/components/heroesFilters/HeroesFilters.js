import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from "classnames";

import {
    fetchFilters,
    activeFilterChanged,
    selectAll,
} from "./heroesFiltersSlice";
import Spinner from "../spinner/Spinner";

const HeroesFilters = () => {
    const { filtersLoadingStatus, activeFilter } = useSelector((state) => {
        return state.filters;
    });

    const filters = useSelector(selectAll);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilters());
        // eslint-disable-next-line
    }, []);

    if (filtersLoadingStatus === "loading") {
        return <Spinner />;
    } else if (filtersLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Loading error</h5>;
    }

    const renderFilters = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">No filters found</h5>;
        }

        return arr.map(({ name, className, label }) => {
            const btnClass = classNames("btn", className, {
                active: name === activeFilter,
            });

            return (
                <button
                    key={name}
                    id={name}
                    className={btnClass}
                    onClick={() => dispatch(activeFilterChanged(name))}
                >
                    {label}
                </button>
            );
        });
    };

    const elements = renderFilters(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Filter heroes by element</p>
                <div className="btn-group">{elements}</div>
            </div>
        </div>
    );
};

export default HeroesFilters;
