import { useContext } from "react";
import { context } from "../App";
import Search from "./searchMovie";
import Table from "./table";

const Body = () => {
    const { movies, handleDeleteMovie, formatDate } = useContext(context);

    return (<>
        <Table moviesList={movies} formatDate={formatDate} handleDeleteMovie={handleDeleteMovie}></Table>
    </>);
};

export default Body;