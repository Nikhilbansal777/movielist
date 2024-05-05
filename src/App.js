import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import AddMovieForm from "./components/addMovieForm";
import BaseComp from "./components/baseComp";
import Category, { categoryWiseData } from "./components/category";
import NavBar from "./components/navbar";
import NotFound from "./components/notfound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<NavBar/>}>
      <Route index element={<BaseComp />}/>
      <Route path="addMovie" element={<AddMovieForm></AddMovieForm>}/>
      <Route path="category/:item" loader={categoryWiseData} element={<Category />} errorElement={<NotFound />} />
      <Route path="*" element={<NotFound/>}/>
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
