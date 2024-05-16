import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateSearchString } from "../redux/reducers/searchReducer";
import "../styles/table.css";

const Search = () => {
    const [searchInput] = useState({ type: "text", name: "search", placeholder: "Search Movie..." });
    const dispatch = useDispatch();
    const searchText = (e) => {
        dispatch(updateSearchString(e.target.value));
    };
    return (
        <input type={searchInput.text} name={searchInput.name} placeholder={searchInput.placeholder} id="" onChange={searchText} />
    );
};

export default Search;