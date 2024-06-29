import React from 'react';

import MovieCard from '../movie-card';
import './movie-list.css';

const MovieList = ({ data }) => {
  if (data === undefined) return <></>;
  const cards = data.map((card) => {
    const { id, ...cardProps } = card;
    return (
      <li key={id}>
        <MovieCard {...cardProps} movieId={id} />
      </li>
    );
  });

  return <ul className="movie-list__cards">{cards}</ul>;
};

export default MovieList;
