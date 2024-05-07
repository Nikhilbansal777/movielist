import { useState } from "react";
import { NavLink } from "react-router-dom";
import "../styles/baseComponent.css";

const Table = ({ moviesList, formatDate, handleDeleteMovie, navigateToEdit }) => {
    const [tableHeaders] = useState(["Movie", "Date", "Actor", "Actress", "Director", "Rating", "Category", "Description", "Add New Movie"]);
    return (
        <table className="table" id="makeEditable">
            <thead>
                <tr>
                    {tableHeaders.map((header, index) => (
                        <th key={index}>
                            {header !== "Add New Movie" ? (
                                header
                            ) : (
                                <NavLink to='/addMovie'>{header}</NavLink>
                            )}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
            {moviesList.length === 0 ? (
                    <tr>
                        <td colSpan="7">No Movies Found, Please add a new Movie.</td>
                    </tr>
                ) : (
                    moviesList.map((movie, index) => (
                        <tr key={index}>
                            <td><NavLink to={`movieDetail/${movie.id}`}> {movie.movieName} </NavLink></td>
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
                                <button onClick={navigateToEdit} className="btn btn-sm btn-default">
                                    <i className="fa fa-edit"></i>
                                </button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    );
};

export default Table;