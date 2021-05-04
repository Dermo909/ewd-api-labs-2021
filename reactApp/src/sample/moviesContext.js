import React, { useState, createContext, useEffect, useReducer } from "react";
import { getMovies } from "../api/movie-api";

export const MoviesContext = createContext(null);

const reducer = (state, action) => {
    switch (action.type) {
        case "load":
            return { movies: action.payload.result };
        default:
            return state;
    }
};

const MoviesContextProvider = props => {
    const [state, dispatch] = useReducer(reducer, { movies: [] });
    const [authenticated, setAuthenticated] = useState(false);

    useEffect(() => {
        async function fetchMovies() {
            const result = await getMovies();
            dispatch({ type: "load", payload: { result } });
        }
        fetchMovies();
    }, []);

    return (
        <MoviesContext.Provider
            value={{
                movies: state.movies,
                setAuthenticated
            }}
        >
            {props.children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider