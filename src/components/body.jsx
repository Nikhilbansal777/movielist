import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { context } from "../App";
import Table from "./table";

const Body = () => {
    const { movies, handleDeleteMovie, formatDate } = useContext(context);

    return (<>
        <Table moviesList={movies} formatDate={formatDate} handleDeleteMovie={handleDeleteMovie}></Table>
    </>);
};

export default Body;