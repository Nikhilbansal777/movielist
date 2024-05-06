import axios from "axios";
import { useEffect, useState } from "react";
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

export const getMovie = (setMovies) => {
  axios.get("http://localhost:5000/api/movies").then((res) => {
      console.log(res.data);
      setMovies(res.data);
  }).catch((err) => {
      console.log(err);
  });
}
function App() {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    getMovie(setMovies)
  }, []);

  const handleDeleteMovie = (id) => {
      axios.delete(`http://localhost:5000/api/deleteMovie/${id}`).then((res) => {
          console.log(movies);
          setMovies(movies.filter(movie => movie.id !== id));
      }).catch((err) => {
          console.log(err);
      });
  };
  const router = createBrowserRouter(
    createRoutesFromElements(
      // in first route the component will be used that will be common to all the components
      //  first route would be index which will be initialised on base route
      <Route path="/" element={<NavBar />}>
        <Route index element={<BaseComp movies={movies} onDeleteMovie = {handleDeleteMovie} setMovies={setMovies} />} />
        <Route path="addMovie" element={<AddMovieForm setMovies={setMovies} movies={movies}></AddMovieForm>} />
        <Route
          path="category/:item"
          loader={categoryWiseData}
          element={<Category onDeleteMovie = {handleDeleteMovie} />}
          errorElement={<NotFound />}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
