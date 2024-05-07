import { useState } from "react";
import { NavLink } from "react-router-dom";

const SideBar = () => {
    const [sideBar] = useState(
        ["All", "Action", "Comedy", "Drama", "Rom-com", "Thriller", "Suspense", "Science Fiction", "Fiction"]
    );
    return (<>
        <ul className="nav flex-column">
            {sideBar.map((item, index) => {
                return (
                    <li key={index} className="nav-item">
                        {item === "All"
                            ? <NavLink className="nav-link" to='/'> {item} </NavLink>
                            : <NavLink className="nav-link" to={`/category/${item}`}> {item} </NavLink>
                        }

                    </li>
                );
            })}
        </ul></>);
};

export default SideBar;