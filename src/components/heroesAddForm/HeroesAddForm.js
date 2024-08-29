import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { useHttp } from "../../hooks/http.hook";
import { useDispatch, useSelector } from "react-redux";
import { heroCreated } from "../heroesList/heroesSlice";
import { selectAll } from "../heroesFilters/heroesFiltersSlice";

const HeroesAddForm = () => {
    const [heroName, setHeroName] = useState("");
    const [heroDescr, setHeroDescr] = useState("");
    const [heroElement, setHeroElement] = useState("");

    const { filtersLoadingStatus } = useSelector((state) => state.filters);
    const filters = useSelector(selectAll);

    const dispatch = useDispatch();
    const { request } = useHttp();

    const onSubmit = (e) => {
        e.preventDefault();

        const newHero = {
            id: uuidv4(),
            name: heroName,
            description: heroDescr,
            element: heroElement,
        };

        request(
            "http://localhost:3001/heroes/",
            "POST",
            JSON.stringify(newHero)
        )
            .then((data) => console.log(data, "Created"))
            .then(dispatch(heroCreated(newHero)))
            .catch((err) => console.log(err));

        setHeroName("");
        setHeroDescr("");
        setHeroElement("");
    };

    const renderFilters = (filters, status) => {
        if (status === "loading") {
            return <option>Loading elements</option>;
        } else if (status === "error") {
            return <option>Loading error</option>;
        }

        if (filters && filters.length > 0) {
            return filters.map(({ name, label }) => {
                // eslint-disable-next-line
                if (name === "all") return;

                return (
                    <option key={name} value={name}>
                        {label}
                    </option>
                );
            });
        }
    };
    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={onSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">
                    Hero name
                </label>
                <input
                    required
                    type="text"
                    name="name"
                    className="form-control"
                    id="name"
                    placeholder="What's my name?"
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">
                    Description
                </label>
                <textarea
                    required
                    name="text"
                    className="form-control"
                    id="text"
                    placeholder="What can I do?"
                    style={{ height: "130px" }}
                    value={heroDescr}
                    onChange={(e) => setHeroDescr(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">
                    Select hero element
                </label>
                <select
                    required
                    className="form-select"
                    id="element"
                    name="element"
                    value={heroElement}
                    onChange={(e) => setHeroElement(e.target.value)}
                >
                    <option>I own the element...</option>
                    {renderFilters(filters, filtersLoadingStatus)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">
                Submit
            </button>
        </form>
    );
};

export default HeroesAddForm;
