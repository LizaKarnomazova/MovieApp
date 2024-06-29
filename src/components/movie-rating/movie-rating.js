import React, { useContext, useState } from 'react';
import { Rate } from 'antd';

import ContextRating from '../constex-rating/constex-rating';

const MovieRating = ({ movieId, ratingColor, countStars }) => {
  const value = useContext(ContextRating);
  const [ratingValue, setRatingValue] = useState(0);

  function post(e) {
    setRatingValue(e);
    ratingColor(e);
    fetch(`${value.base}/movie/${movieId}/rating?guest_session_id=${value.guestSessionId}&${value.key}`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: 'Bearer abe1b6d231e3ee2948c3e5c3b33166fd',
      },
      body: JSON.stringify({
        value: e,
      }),
    }).then((response) => response.json());
  }

  return (
    <Rate
      count={10}
      allowHalf={true}
      onChange={post}
      disabled={countStars !== undefined}
      value={countStars === undefined ? ratingValue : countStars}
    />
  );
};

export default MovieRating;
