import PropTypes from "prop-types";
import {Button, Card} from "react-bootstrap";


export const MovieCard = ({ movie, onMovieClick }) => {
  return (
    <Card>
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title>
        <Card.Text>{movie.Director}</Card.Text>
        <Button onClick={() => onMovieClick(movie)} variant="link">
          Open
        </Button>
      </Card.Body>
    </Card>
  );
  };

  MovieCard.propTypes = {
    Movie: PropTypes.shape({
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      Director : PropTypes.string.isRequired

    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
  };