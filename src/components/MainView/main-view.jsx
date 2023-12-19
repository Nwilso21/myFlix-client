import { useState,useEffect } from "react";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../Movie-Card/movie-Card";
import { MovieView } from "../Movie-View/Movie-View";
import {SignupView} from "../signup-view/signup-view";

export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user , setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  useEffect(() => {
    if(!token){
      return;
    }
    fetch("https://vast-garden-26469-856928a3215d.herokuapp.com/movies",{
      headers : {Authorization : 'Bearer ${token'}
    })
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
  }, [token]);

  if (!user) {
    return (
      <>
        <LoginView onLoggedIn={(user, token) => {
          setUser(user);
          setToken(token);
        }} />
        or
        <SignupView />
      </>
    );
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
      <button onClick={() => { setUser(null); setToken(null); localStorage.clear();}}>Logout</button>
    </div>
  );
};
