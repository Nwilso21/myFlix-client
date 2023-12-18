import { useState,useEffect } from "react";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../Movie-Card/movie-Card";
import { MovieView } from "../Movie-View/Movie-View";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [user , setuser] = useState(null);
  useEffect(() => {
    fetch("https://vast-garden-26469-856928a3215d.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            Genre : {
              Name : movie.Genre.Title,
              Description : movie.Genre.Description
            },
            Director : movie.Director.name,
            Actors : movie.Actors,
            _id: movie.key,
            title: movie.Title,
            Description : movie.Description,
            ImagePath : movie.ImagePath,
            Featured : movie.Featured
          };
        });

        

        setMovies(moviesFromApi);
      });
  }, []);

  if(!user){
    return <LoginView />;
  }

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
