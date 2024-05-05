import PropTypes from "prop-types";
import {Button, Card} from "react-bootstrap";
import { Link } from "react-router-dom";


export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card>
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.Director}</Card.Text>
        <Link to={`/movie/${encodeURIComponent(movie.id)}`}>
          <Button variant="link">Open</Button>
        </Link>
      </Card.Body>
    </Card>
  );
  };

  MovieCard.propTypes = {
    movie: PropTypes.shape({
      title: PropTypes.string.isRequired,
      Director: PropTypes.string.isRequired,
      Description :  PropTypes.string.isRequired

    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
  };