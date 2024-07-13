import { useState,useEffect } from "react";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../Movie-Card/movie-Card";
import { MovieView } from "../Movie-View/Movie-View";
import {SignupView} from "../signup-view/signup-view";
import {ProfileView} from "../profile-view/profile-view";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { Form } from "react-bootstrap";
import {InputGroup} from 'react-bootstrap';


export const MainView = () => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user , setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [Search, setSearch] =useState('');
  console.log(Search);

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
            title: movie.Title,
            Director : movie.Director.Name,
            Description : movie.Description,
            Genre : movie.Genre
          };
        });

        

        setMovies(moviesFromApi);
      });
  }, [token]);

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
        }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/login"
            element={
              <>
                {user ? (
                  <Navigate to="/" />
                ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user,token) =>{

                     setUser(user);
                     setToken(token)}} />
                  </Col>
                )}
              </>
            }
          />
          <Route
           path="/profileView"
           element={
               <>
                   {!user ? (
                       <Navigate to="/login" replace />
                   ) : (
                       <Col>
                           <ProfileView 
                           user={user}
                           movies={movies}
                           setUser={setUser}
                           />
                       </Col>
                   )}
               </>
           }
           />
          <Route
            path="/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={8}>
                    <MovieView movies={movies} />
                  </Col>
                )}
              </>
            }
          />

          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                  <Form>
                <InputGroup className='my-3'>
                  <Form.Control
                  onChange={(e) =>setSearch(e.target.value)}
                  placeholder='Search a movie title'
                  />
                </InputGroup>
              </Form>
                    {movies.filter((movie =>{
                      return Search.toLowerCase() ==='' ? movie : movie.title.toLowerCase().includes(Search);
                    })).map((movie) => (
                      
                      <Col className="mb-4" key={movie.id} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                  </>
                )}
              </>
            }

          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};