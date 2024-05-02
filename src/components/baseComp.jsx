import axios from "axios";
import { useEffect, useState } from "react";
import "../styles/baseComponent.css";
import Body from "./body";
import SideBar from "./sidebar";

import { Outlet } from 'react-router-dom';

const BaseComp = () => {
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/movies").then((res) => {
            console.log(res.data);
            setMovies(res.data);
        }).catch((err) => {
            console.log(err);
        });
    }, []);

    const handleDeleteMovie = (id) => {
        axios.delete(`http://localhost:5000/api/deleteMovie/${id}`).then((res) => {
            console.log(movies);
            setMovies(movies.filter(movie => movie.id !== id));
        }).catch((err) => {
            console.log(err);
        });
    };
    return (<>
        <div className="container">
            <SideBar></SideBar>
            <Body movies={movies} onDeleteMovie={handleDeleteMovie}></Body>
        </div>
        <main>
        </main>
    </>);
};

export default BaseComp;