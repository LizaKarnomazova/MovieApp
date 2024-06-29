import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';

import MovieRating from '../movie-rating/movie-rating';
import LoadingSpin from '../loading-spin';
import MovieGenres from '../movie-genres/movie-genres';

import iconFace from './icon-face.svg';
import './movie-card.css';

const MovieCard = (props) => {
  const [renderLoading, setRenderLoading] = useState(true);
  const [ratingStyle, setRatingStyle] = useState({ outlineColor: 'rgb(235, 235, 235)' });
  const [ratingNumber, setRatingNumber] = useState(0);

  function correctionDescription(text, maxSize) {
    let newText;
    if (text.length > maxSize) {
      newText = text.slice(0, maxSize);
      while (newText[newText.length - 1] !== ' ') {
        newText = newText.slice(0, -1);
      }
      return `${newText} ...`;
    }
    return text;
  }

  const card = {
    src: props.backdrop_path === null ? iconFace : `https://image.tmdb.org/t/p/w500${props.backdrop_path}`,
    name: correctionDescription(props.title, 29),
    date: props.release_date === '' ? null : format(props.release_date, 'LLLL dd, yyyy'),
    description: correctionDescription(props.overview, 270),
  };

  function ratingColor(rateValue) {
    setRatingNumber(rateValue);
    if (rateValue >= 0 && rateValue <= 3) {
      setRatingStyle({ outlineColor: '#E90000' });
    } else if (rateValue >= 3 && rateValue < 5) {
      setRatingStyle({ outlineColor: '#E97E00' });
    } else if (rateValue >= 5 && rateValue < 7) {
      setRatingStyle({ outlineColor: '#E9D100' });
    } else if (rateValue >= 7) {
      setRatingStyle({ outlineColor: '#66E900' });
    }
  }

  useEffect(() => {
    setRenderLoading(false);
  }, [props.backdrop_path]);

  useEffect(() => {
    if (props.rating !== undefined) {
      ratingColor(props.rating);
    }
  }, [props.rating]);

  return (
    <div className="movie-сard">
      {renderLoading ? (
        <div className="movie-сard__loading">
          <LoadingSpin className="center" />
        </div>
      ) : (
        <div className="movie-сard__loaded">
          <img src={card.src} height="125px" className="movie-сard__image" />
          <section className="movie-сard__mainInfo">
            <h2 className="mainInfo__name">{card.name}</h2>
            <span className="mainInfo__date">{card.date}</span>
            <div>
              <MovieGenres movieGenres={props.genre_ids} />
            </div>
          </section>
          <article className="movie-сard__info">
            <p className="info__paragraph">{card.description}</p>
            <MovieRating movieId={props.movieId} ratingColor={ratingColor} countStars={props.rating} />
          </article>
          <div className="movie-сard__rating" style={ratingStyle}>
            {props.rating === undefined ? ratingNumber : props.rating}
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieCard;
