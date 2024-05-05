import "../styles/baseComponent.css";
import Body from "./body";
import SideBar from "./sidebar";

const BaseComp = ({ movies, onDeleteMovie }) => {

    return (<>
        <h1>All Movies</h1>
        <div className="container">
            <SideBar></SideBar>
            <Body movies={movies} onDeleteMovie={onDeleteMovie}></Body>
        </div>
        <main>
        </main>
    </>);
};

export default BaseComp;