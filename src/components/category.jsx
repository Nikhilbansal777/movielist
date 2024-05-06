import axios from "axios";
import { useContext } from "react";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { context } from "../App";
import "../styles/baseComponent.css";
import SideBar from "./sidebar";
import Table from "./table";

const Category = ({ onDeleteMovie }) => {
    const navigate = useNavigate();
    const { item } = useParams();  // it should be same name as of route param
    const categories = useLoaderData();
    const { formatDate } = useContext(context);
    
    const navigateToEdit = () => {
        navigate("/addMovie");
    };

    return (
        <>
            <h1>{item} Movies</h1>
            <div className="container">
                <SideBar></SideBar>
                <Table moviesList={categories} formatDate={formatDate} navigateToEdit={navigateToEdit} handleDeleteMovie={onDeleteMovie}></Table>
            </div>
        </>
    );
};

export default Category;

export const categoryWiseData = async ({ params }) => {
    const { item } = params;
    try {
        const res = await axios.get(`http://localhost:5000/api/getCategoryWiseData/${item}`);
        if (res.status !== 200) {
            throw new Error("Could not find that category");
        }
        return res.data;
    } catch (error) {
        console.error("Error fetching category-wise data:", error);
        return [];
    }
};