import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import AddMovieForm from "./components/addMovieForm";
import BaseComp from "./components/baseComp";
import NavBar from "./components/navbar";
import AddMovie from "./components/addNewMovie";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<NavBar></NavBar>}>
      <Route index element={<BaseComp />}></Route>
      <Route path="addMovie" element={<AddMovie />}></Route>
      {/* <Route path="addMovie" element={<AddMovieForm></AddMovieForm>}></Route> */}
    </Route>
  )
);
function App() {
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
