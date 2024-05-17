import { useContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { context } from "../App";
import { fetchCategoryMovies } from "../redux/reducers/moviesReducer";
import "../styles/baseComponent.css";
import SideBar from "./sidebar";
import Table from "./table";

const Category = () => {
    const { item } = useParams();  // it should be same name as of route param
    // const categories = useLoaderData();
    const { formatDate } = useContext(context);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCategoryMovies(item));
    }, [dispatch, item]);

    const categoryMovies = useSelector(state => state.movies.categories);
    console.log(categoryMovies);
    return (
        <>
            <h1>{item} Movies</h1>
            <div className="category-container">
                <SideBar></SideBar>
                <Table moviesList={categoryMovies} formatDate={formatDate}></Table>
            </div>
        </>
    );
};

export default Category;

// export const categoryWiseData = async ({ params }) => {
//     const { item } = params;
//     try {
//         const res = await axios.get(`http://localhost:5000/api/getCategoryWiseData/${item}`);
//         if (res.status !== 200) {
//             throw new Error("Could not find that category");
//         }
//         return res.data;
//     } catch (error) {
//         console.error("Error fetching category-wise data:", error);
//         return [];
//     }
// };