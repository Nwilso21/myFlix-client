import { useState } from "react";
import { MovieCard } from "../Movie-Card/movie-Card";
import { MovieView } from "../Movie-View/Movie-View";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Django: Unchained",
      image:
        "https://m.media-amazon.com/images/I/913bZDh0T5L._AC_UY218_.jpg",
      Director: "Quentin Tarentino"
    },
    {
      id: 2,
      title: "Avengers: Endgame",
      image:
        "https://m.media-amazon.com/images/I/91e9898R7QL._AC_UY218_.jpg",
        Director: "Anthony and Joe Russo"
    },
    {
      id: 3,
      title: "Avatar",
      image:
        "https://m.media-amazon.com/images/I/81zsYe3WUgL._AC_UY218_.jpg",
        Director: "James Cameron"
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
