import React, { useContext } from 'react';

import ContextGenres from '../context-genres/context-genres';
import './movie-genres.css';

const MovieGenres = ({ movieGenres }) => {
  const genres = useContext(ContextGenres);
  const genreSpans = [];

  for (let i = 0; i < genres.genresArr.length; i += 1) {
    for (let j = 0; j < movieGenres.length; j += 1) {
      if (genres.genresArr[i].id === movieGenres[j] && genreSpans.length < 2) {
        genreSpans.push(
          <span className="genre" key={genres.genresArr[i].id}>
            {genres.genresArr[i].name}
          </span>
        );
      }
    }
  }

  return <div>{genreSpans}</div>;
};

export default MovieGenres;
