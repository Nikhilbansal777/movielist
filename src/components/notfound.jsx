import { NavLink, useRouteError } from "react-router-dom";

const NotFound = () => {
    const routeError = useRouteError();
    return (
        <div>
            <h1>Error</h1>
            <p>{routeError.message}</p>
            <NavLink to="/">Go to Homepage</NavLink>

        </div>
    );
};

export default NotFound;