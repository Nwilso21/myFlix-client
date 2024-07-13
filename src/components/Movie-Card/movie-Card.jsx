import PropTypes from "prop-types";
import {Button, Card} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";


export const MovieCard = ({ movie, onMovieClick }) => {

  return (
    <Card>
      <Card.Img variant="top" src={movie.image} />
      <Card.Body>
        <Card.Title>{movie.title}</Card.Title> 
        <Link to = {`/movies/${movie._id}`}>
          Open
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