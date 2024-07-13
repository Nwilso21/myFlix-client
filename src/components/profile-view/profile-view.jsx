import { useState } from "react";
import {useNavigate} from "react-router-dom";
import {Row,Col} from "react-bootstrap";

export const ProfileView = ({ user, movies, setUser, removeFav, addFav}) => {
    const [username] = useState(user.Username);
    const [email] = useState(user.Email);
    const [birthday] = useState(user.Birthday);
    const navigate = useNavigate();
    const favoriteMovieList = movies.filter(m => user.FavoriteMovies);
    const token = localStorage.getItem('token');

    const Update = (event) => {
        event.preventDefault();

        const user = JSON.parse(localStorage.getItem('user'));

        const data ={
            Username: username,
            Email: email,
            Birthday: birthday
        }

        fetch(`https://movieapionrender.onrender.com/users/${user.Username}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }).then(async (response) => {
            console.log(response)
            if (response.ok) {
                const updatedUser = await response.json();
                localStorage.setItem('user', JSON.stringify(updatedUser));
                setUser(updatedUser);
                alert("Update was successful");
            } else {
                alert("Update failed")
            }
        }).catch(error => {
            console.error('Error: ', error);
        });
    };


    const Delete = () => {
        fetch(`https://movieapionrender.onrender.com/users/${user.Username}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            if (response.ok) {
                setUser(null);
                alert("User has been deleted")
                localStorage.clear();
                navigate('/');
            } else {
                alert("Something went wrong.")
            }
        })
    }


  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {user.Username}</p>
      <p>Email: {user.Email}</p>
      <p>Birthday: {user.Birthday}</p>
      <div>
      <h2 className="mt-5 text-center text-md-start">Favorite Movies</h2>
                <Row className="justify-content-center">
                    {
                    favoriteMovieList?.length !== 0 ?
                    favoriteMovieList?.map((movie) => (
                        <Col sm={7} md={5} lg={3} xl={2} className="mx-2 mt-2 mb-5 col-6 similar-movies-img" key={movie._id}>
                            <MovieCard
                                movie={movie}
                                removeFav={removeFav}
                                addFav={addFav}
                                isFavorite={user.FavoriteMovies.includes(movie._id)}
                            />
                        </Col>
                    ))
                    : <Col>
                    <p>There are no favorites Movies</p>
                    </Col>
                    }
                </Row>
      </div>
    </div>

  );
};
