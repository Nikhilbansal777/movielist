import axios from "axios";
import { NavLink, useLoaderData, useNavigate, useParams } from "react-router-dom";

const Category = () => {
    const navigate = useNavigate();
    const { item } = useParams();  // it should be same name as of route param
    const categories = useLoaderData();

    const navigateToEdit = () => {
        navigate("/addMovie");
    };

    function formatDate(dateString) {
        const dateParts = dateString.split("-");
        const year = dateParts[0];
        const month = new Date(dateString + "T00:00:00").toLocaleString('default', { month: 'long' });
        const day = dateParts[2];
        return `${day} ${month} ${year}`;
    }

    return (<div>
        <h1>Category component {item}</h1>
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
                        <NavLink to="/addMovie">Add New Movie</NavLink>
                    </th>
                </tr>
            </thead>
            <tbody>
                {categories.length === 0 ? (
                    <tr>
                        <td colSpan="16">No Movies Found, Please add a new Movie.</td>
                    </tr>
                ) : (
                    categories.map((movie) => (
                        <tr key={movie.id}>
                            <td>{movie.movieName}</td>
                            <td>{formatDate(movie.releaseDate)}</td>
                            <td>{movie.actor}</td>
                            <td>{movie.actress}</td>
                            <td>{movie.rating}</td>
                            <td>{movie.category}</td>
                            <td>
                                <button className="btn btn-sm btn-default" >
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
    </div>);
};

export default Category;

export const categoryWiseData = async ({ params }) => {
    const { item } = params;
    try {

        const res = await axios.get(`http://localhost:5000/api/getCategoryWiseData/${item}`);
        console.log(res);
        if (res.status !== 200) {
            throw new Error("Could not find that category");
        }
        return res.data;
    } catch (error) {
        console.error("Error fetching category-wise data:", error);
        return [];
    }
};