import { NavLink } from "react-router-dom";

const Body = ({ movies, onDeleteMovie }) => {
    console.log(movies);
    const moviesList = movies;
    return (<>
        <table className="table" id="makeEditable">
            <thead>
                <tr>
                    <th>Movie</th>
                    <th>Release Date</th>
                    <th>Actor</th>
                    <th>Actress</th>
                    <th>Rating</th>
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
                            <td>{movie.name}</td>
                            <td>{movie.releaseDate}</td>
                            <td>{movie.actor}</td>
                            <td>{movie.actress}</td>
                            <td>{movie.rating}</td>
                            <td>
                                <button className="btn btn-sm btn-default" onClick={() => onDeleteMovie(movie.id)}>
                                    <i className="fa fa-trash-o"></i>
                                </button>
                                <button className="btn btn-sm btn-default">
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