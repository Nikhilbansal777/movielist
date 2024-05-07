import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

const app = express();
app.use(cors());
app.use(bodyParser.json());

var movies = [
  {
    id: 1,
    movieName: "Avengers",
    releaseDate: "2019-04-24",
    actor: "Tony stark",
    category: "Action",
    actress: "Scarlett Johanson",
    rating: 5,
    category: "Action",
    director: "KJ",
    description: "aaaaaaaaaaaaaaaaaaaaaaaaa",
  },
  {
    id: 2,
    movieName: "Avengers: End Game",
    releaseDate: "2019-04-24",
    actor: "Tony stark",
    category: "Drama",
    actress: "Scarlett Johanson",
    rating: 4,
    category: "Action",
    director: "KJ",
    description: "aaaaaaaaaaaaaaaaaaaaaaaaa",
  },
  {
    id: 3,
    movieName: "Don John",
    releaseDate: "2019-04-24",
    actor: "Tony stark",
    category: "Comedy",
    actress: "Scarlett Johanson",
    rating: 4,
    category: "Action",
    director: "KJ",
    description: "aaaaaaaaaaaaaaaaaaaaaaaaa",
  },
  {
    id: 4,
    movieName: "Van Helsing",
    releaseDate: "2019-04-24",
    actor: "Tony stark",
    category: "Thriller",
    actress: "Scarlett Johanson",
    rating: 5,
    category: "Action",
    director: "KJ",
    description: "aaaaaaaaaaaaaaaaaaaaaaaaa",
  },
  {
    id: 5,
    movieName: "Matrix",
    releaseDate: "2019-04-24",
    actor: "Tony stark",
    category: "Action",
    actress: "Scarlett Johanson",
    rating: 5,
    category: "Action",
    director: "KJ",
    description: "aaaaaaaaaaaaaaaaaaaaaaaaa",
  },
];

app.get("/api/movies", (req, res) => {
  setTimeout(() => {
    res.send(movies);
  }, 0);
});

app.post("/api/moviesListAdd", (req, res) => {
  const newData = req.body;
  if (!newData) {
    return res.status(400).json({ message: "Data not provided" });
  }
  // Generate a unique ID for the new movie
  const id = movies.length > 0 ? movies[movies.length - 1].id + 1 : 1;
  // Assign the generated ID to the new movie
  const movieToAdd = { id, ...newData };
  // Add the new movie to the list
  movies.push(movieToAdd);
  res.status(200).json({ message: "Data added successfully", id });
});

app.delete("/api/deleteMovie/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = movies.findIndex((movie) => movie.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Movie Not found" });
  }
  movies.splice(index, 1);
  res.status(200).json({ message: "Movie Deleted Successfully" });
});

app.get("/api/getCategoryWiseData/:category", (req, res) => {
  const category = req.params.category;
  const categoryMovies = movies.filter((movie) => movie.category === category);
  if (categoryMovies.length === 0) {
    return res.status(404).json({ message: "Movie Not Found" });
  }
  res.send(categoryMovies);
});

app.get("/api/getMovieDetail/:id", (req, res) => {
  const id = req.params.id;
  const index = movies.findIndex((movie) => movie.id === parseInt(id));
  if (index === -1) {
    return res.status(404).json({ message: "Movie Not found" });
  }
  res.send(movies[index]);
});
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server Listen on Port" + port);
});
