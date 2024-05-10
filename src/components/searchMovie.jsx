import { useContext, useState } from "react";
import { context } from "../App";
import "../styles/table.css";

const Search = () => {
    const [searchInput] = useState({ type: "text", name: "search", placeholder: "Search Movie..." });
    const {setSearchString } = useContext(context);

    const searchText = (e) => {
        setSearchString(e.target.value);
    };
    return (
        <input type={searchInput.text} name={searchInput.name} placeholder={searchInput.placeholder} id="" onChange={searchText} />
    );
};

export default Search;