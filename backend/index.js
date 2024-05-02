import bodyParser from "body-parser";
import cors from "cors";
import express from "express";

const app = express();
app.use(cors());
app.use(bodyParser.json());

var movies = [
  {
    id: 1,
    name: "Avengers",
    releaseDate: "24 April 2019",
    actor: "Tony stark",
    category: "Action",
    actress: "Scarlett Johanson",
    rating: 5,
  },
  {
    id: 2,
    name: "Avengers: End Game",
    releaseDate: "24 April 2020",
    actor: "Tony stark",
    category: "Drama",
    actress: "Scarlett Johanson",
    rating: 4,
  },
  {
    id: 3,
    name: "Don John",
    releaseDate: "24 April 2021",
    actor: "Tony stark",
    category: "Comedy",
    actress: "Scarlett Johanson",
    rating: 4,
  },
  {
    id: 4,
    name: "Van Helsing",
    releaseDate: "24 April 2021",
    actor: "Tony stark",
    category: "Thriller",
    actress: "Scarlett Johanson",
    rating: 5,
  },
  {
    id: 5,
    name: "Matrix",
    releaseDate: "24 April 2022",
    actor: "Tony stark",
    category: "Action",
    actress: "Scarlett Johanson",
    rating: 5,
  },
];

app.get("/api/movies", (req, res) => {
  setTimeout(() => {
    res.send(movies);
  }, 0);
});

app.post("/api/moviesListAdd", (req, res) => {
  const newData = req.body;
  console.log(req.body);
  if (!newData) {
    return res.status(400).json({ message: "Data not provided" });
  }
  movies.push(newData);
  res.status(200).json({ message: "Data addded successfully" });
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

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("Server Listen on Port" + port);
});
