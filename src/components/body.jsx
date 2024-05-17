import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { context } from "../App";
import { fetchMovies } from "../redux/reducers/moviesReducer";
import { useGetTodosQuery } from "../redux/reducers/rtkquery";
import Table from "./table";

const Body = () => {
    const dispatch = useDispatch();
    const { formatDate } = useContext(context);
    const { data } = useGetTodosQuery(); // Correct usage of the hook
    console.log(data);
    useEffect(() => {
        dispatch(fetchMovies());
    }, [dispatch]);

    const moviess = useSelector((state) => state.movies.list);
    console.log(moviess.length);

    return (<>
        <Table moviesList={moviess} formatDate={formatDate}></Table>
    </>);
};

export default Body;