import { useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { context } from "../App";

const Body = () => {
    const {movies, setMovies, handleDeleteMovie} = useContext(context);
    const navigate = useNavigate();

    const moviesList = movies;
    function formatDate(dateString) {
        const dateParts = dateString.split("-");
        const year = dateParts[0];
        const month = new Date(dateString + "T00:00:00").toLocaleString('default', { month: 'long' });
        const day = dateParts[2];
        return `${day} ${month} ${year}`;
    }

    const navigateToEdit = () => {
        navigate("/addMovie");
    };

    return (<>
        <table className="table" id="makeEditable">
            <thead>
                <tr>
                    <th>Movie</th>
                    <th>Release Date</th>
                    <th>Actor</th>
                    <th>Actress</th>
                    <th>Rating</th>
                    <th>Category</th>
                    <th>
                        <NavLink to="addMovie">Add New Movie</NavLink>
                    </th>
                </tr>
            </thead>
            <tbody>
                {moviesList.length === 0 ? (
                    <tr>
                        <td colSpan="16">No Movies Found, Please add a new Movie.</td>
                    </tr>
                ) : (
                    moviesList.map((movie) => (
                        <tr key={movie.id}>
                            <td>{movie.movieName}</td>
                            <td>{formatDate(movie.releaseDate)}</td>
                            <td>{movie.actor}</td>
                            <td>{movie.actress}</td>
                            <td>{movie.rating}</td>
                            <td>{movie.category}</td>
                            <td>
                                <button className="btn btn-sm btn-default" onClick={() => handleDeleteMovie(movie.id)}>
                                    <i className="fa fa-trash-o"></i>
                                </button>
                                <button onClick={navigateToEdit} className="btn btn-sm btn-default">
                                    <i className="fa fa-edit"></i>
                                </button>
                            </td>
                        </tr>
                    ))
                )}
            </tbody>
        </table> 
    </>);
};

export default Body;