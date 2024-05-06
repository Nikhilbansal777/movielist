import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { context } from "../App";
import Table from "./table";

const Body = () => {
    const { movies, setMovies, handleDeleteMovie, formatDate } = useContext(context);
    const navigate = useNavigate();
    const navigateToEdit = () => {
        navigate("/addMovie");
    };

    return (<>
        <Table moviesList={movies} formatDate={formatDate} navigateToEdit={navigateToEdit} handleDeleteMovie={handleDeleteMovie}></Table>
    </>);
};

export default Body;