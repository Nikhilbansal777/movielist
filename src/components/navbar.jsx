import { Outlet } from "react-router-dom";

const NavBar = () => {
    return (<>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-md">
                <a className="navbar-brand">Movie List App</a>
            </div>
        </nav>
        <Outlet></Outlet>
    </>);
};

export default NavBar;