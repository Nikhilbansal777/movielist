import { useContext, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { context } from "../App";
import { updateFlag } from "../redux/reducers/todoReducer";
import "../styles/table.css";
import Search from "./searchMovie";

const Table = ({ moviesList, formatDate, handleDeleteMovie }) => {
    const [tableHeaders] = useState(["Movie", "Date", "Actor", "Actress", "Director", "Rating", "Category", "Description", "Add New Movie"]);
    const { movieForEdit, searchString } = useContext(context);
    const [newMovies, setNewMovies] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const navigateToEdit = (id, movie) => {
        movieForEdit(movie);
        dispatch(updateFlag(true));
        navigate(`/addMovie`);
    };

    const setFlag = () => {
        dispatch(updateFlag(false));
    };

    useEffect(() => {
        filterMovies();
    }, [searchString]);

    const filterMovies = () => {
        const movie = moviesList.filter((movie) => {
            return movie.movieName.toLowerCase().includes(searchString.toLowerCase());
        });
        console.log(movie);
        setNewMovies(movie);
    };

    console.log(newMovies);
    return (
        <div className="container">
            <div className="coloumn">
                <Search></Search>
            </div>
            <div className="coloumn">
                <table className="table" id="makeEditable">
                    <thead>
                        <tr>
                            {tableHeaders.map((header, index) => (
                                <th key={index}>
                                    {header !== "Add New Movie" ? (
                                        header
                                    ) : (
                                        <NavLink onClick={setFlag} to='/addMovie'>{header}</NavLink>
                                    )}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {(searchString ? newMovies.length === 0 : moviesList.length === 0) ? (
                            <tr>
                                <td colSpan="7">No Movies Found, Please add a new Movie.</td>
                            </tr>
                        ) : (
                            searchString ? newMovies.map((movie, index) => (
                                <tr key={index}>
                                    <td><NavLink to={`/movieDetail/${movie.id}`}> {movie.movieName} </NavLink></td>
                                    <td>{formatDate(movie.releaseDate)}</td>
                                    <td>{movie.actor}</td>
                                    <td>{movie.actress}</td>
                                    <td>{movie.director}</td>
                                    <td>{movie.rating}</td>
                                    <td>{movie.category}</td>
                                    <td>{movie.description}</td>
                                    <td>
                                        <button className="btn btn-sm btn-default" onClick={() => handleDeleteMovie(movie.id)}>
                                            <i className="fa fa-trash-o"></i>
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => navigateToEdit(movie.id, movie)} className="btn btn-sm btn-default">
                                            <i className="fa fa-edit"></i>
                                        </button>
                                    </td>
                                </tr>
                            )) : moviesList.map((movie, index) => (
                                <tr key={index}>
                                    <td><NavLink to={`/movieDetail/${movie.id}`}> {movie.movieName} </NavLink></td>
                                    <td>{formatDate(movie.releaseDate)}</td>
                                    <td>{movie.actor}</td>
                                    <td>{movie.actress}</td>
                                    <td>{movie.director}</td>
                                    <td>{movie.rating}</td>
                                    <td>{movie.category}</td>
                                    <td>{movie.description}</td>
                                    <td>
                                        <button className="btn btn-sm btn-default" onClick={() => handleDeleteMovie(movie.id)}>
                                            <i className="fa fa-trash-o"></i>
                                        </button>
                                    </td>
                                    <td>
                                        <button onClick={() => navigateToEdit(movie.id, movie)} className="btn btn-sm btn-default">
                                            <i className="fa fa-edit"></i>
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Table;