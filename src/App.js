import axios from "axios";
import { createContext, useEffect, useState } from "react";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import AddMovieForm from "./components/addMovieForm";
import BaseComp from "./components/baseComp";
import Category, { categoryWiseData } from "./components/category";
import MovieDetails from "./components/movieDetails";
import NavBar from "./components/navbar";
import NotFound from "./components/notfound";

export const context = createContext();

export const getMovie = (setMovies) => {
  axios
    .get("http://localhost:5000/api/movies")
    .then((res) => {
      setMovies(res.data);
    })
    .catch((err) => {
      console.log(err);
    });
};
function App() {
  const [selectedMovie, setSelectedMovie] = useState({});
  const [flag, setFlag] = useState(false);
  const [movies, setMovies] = useState([]);
  const [searchString, setSearchString] = useState("");

  const movieForEdit = (selectedMovie) => {
    console.log("hiiiii", selectedMovie);
    setSelectedMovie(selectedMovie);
  };

  useEffect(() => {
    getMovie(setMovies);
  }, []);

  const handleDeleteMovie = (id) => {
    axios
      .delete(`http://localhost:5000/api/deleteMovie/${id}`)
      .then((res) => {
        setMovies(movies.filter((movie) => movie.id !== id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getMovieDetail = async (id) => {
    const ids = id.params.id;
    console.log(ids);
    const res = await axios.get(
      `http://localhost:5000/api/getMovieDetail/${ids}`
    );
    return res.data;
  };

  function formatDate(dateString) {
    const dateParts = dateString.split("-");
    const year = dateParts[0];
    const month = new Date(dateString + "T00:00:00").toLocaleString("default", {
      month: "long",
    });
    const day = dateParts[2];
    return `${day} ${month} ${year}`;
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      // in first route the component will be used that will be common to all the components
      //  first route would be index which will be initialised on base route
      <Route path="/" element={<NavBar />}>
        <Route index element={<BaseComp />} />
        <Route
          path="addMovie"
          element={
            <AddMovieForm setMovies={setMovies} movies={movies}></AddMovieForm>
          }
        />
        <Route
          path="category/:item"
          loader={categoryWiseData}
          element={<Category onDeleteMovie={handleDeleteMovie} />}
          errorElement={<NotFound />}
        />
        <Route
          path="movieDetail/:id"
          loader={getMovieDetail}
          element={<MovieDetails></MovieDetails>}
        />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  );
  return (
    <div className="App">
      <context.Provider
        value={{
          movies,
          setMovies,
          handleDeleteMovie,
          formatDate,
          getMovieDetail,
          selectedMovie,
          movieForEdit,
          flag,
          setFlag,
          searchString,
          setSearchString,
        }}
      >
        <RouterProvider router={router}></RouterProvider>
      </context.Provider>
    </div>
  );
}

export default App;
