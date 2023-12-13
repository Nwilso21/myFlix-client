import PropTypes from "prop-types";


export const MovieCard = ({ movie, onMovieClick }) => {
    return (
      <div
        onClick={() => {
          onMovieClick(movie);
        }}
      >
        {movie.title}
      </div>
    );
  };

  MovieCard.propTypes = {
    Movie: PropTypes.shape({
      title: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      Director: PropTypes.string
    }).isRequired,
    onBookClick: PropTypes.func.isRequired
  };