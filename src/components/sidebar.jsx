const SideBar = () => {
    return (<>
        <ul className="nav flex-column">
            <li className="nav-item">
                <a className="nav-link"  >All</a>
            </li>
            <li className="nav-item">
                <a className="nav-link active" aria-current="page">Action</a>
            </li>
            <li className="nav-item">
                <a className="nav-link">Comedy</a>
            </li>
            <li className="nav-item">
                <a className="nav-link">Drama</a>
            </li>
            <li className="nav-item">
                <a className="nav-link"  >Rom-com</a>
            </li>
            <li className="nav-item">
                <a className="nav-link"  >Thriller</a>
            </li>
            <li className="nav-item">
                <a className="nav-link"  >Suspense</a>
            </li>
            <li className="nav-item">
                <a className="nav-link"  >Science Fiction</a>
            </li>
            <li className="nav-item">
                <a className="nav-link"  >Fiction</a>
            </li>
        </ul></>);
};

export default SideBar;