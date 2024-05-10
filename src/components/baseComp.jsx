import { useContext, useEffect } from "react";
import { context, getMovie } from "../App";
import "../styles/baseComponent.css";
import Body from "./body";
import SideBar from "./sidebar";

const BaseComp = () => {
    const { setMovies } = useContext(context);
    useEffect(() => {
        getMovie(setMovies);
    }, []);
    return (<>
        <h1>All Movies</h1>
        <div className="category-container">
            <SideBar></SideBar>
            <Body></Body>
        </div>
        <main>
        </main>
    </>);
};

export default BaseComp;