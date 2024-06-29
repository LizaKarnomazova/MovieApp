import React, { useState, useContext, useEffect } from 'react';

import ErrorIndicator from '../error-indicator/error-indicator';
import SearchPanel from '../search-panel';
import MovieList from '../movie-list';
import MoviesPagination from '../pagination';
import './movie-tab.css';
import ContextRating from '../constex-rating/constex-rating';

const MovieTab = ({ tabKey }) => {
  const value = useContext(ContextRating);
  const category = '&include_adult=false&language=en-US';
  const [data, setData] = useState({ results: [], total_pages: 0 });
  const [label, setLabel] = useState('');
  const [notFound, setNotFound] = useState(false);
  const [notFoundLable, setNotFoundLabel] = useState('');
  const [error, setError] = useState(false);

  function getMovieData(url) {
    setNotFound(false);
    fetch(`${url}`)
      .then((response) => response.json())
      .then((json) => {
        if (json.total_results === 0 || json.status_code === 34) {
          setNotFound(true);
        } else setData(json);
      })
      .catch(() => setError(true));
  }

  function searchMovie(searchLabel, page = 1) {
    setLabel(searchLabel);
    setNotFoundLabel('This movie not found.');
    getMovieData(`${value.base}/search/movie?&${value.key}${category}&page=${page}&query=${searchLabel}`);
  }

  function getPage(page) {
    if (tabKey === '2') {
      getMovieData(
        `${value.base}/guest_session/${value.guestSessionId}/rated/movies?${value.key}&page=${page}`
      );
    } else searchMovie(label, page);
  }

  useEffect(() => {
    if (tabKey === '2') {
      setNotFoundLabel('Rated movies not found.');
      getMovieData(`${value.base}/guest_session/${value.guestSessionId}/rated/movies?${value.key}`);
    }
  }, [tabKey]);

  function renderSearchPanel() {
    if (tabKey === '2') {
      return <></>;
    }
    return <SearchPanel getMovieName={searchMovie} />;
  }

  if (error) {
    return (
      <>
        {renderSearchPanel()}
        <ErrorIndicator description={'Whoops, something went wrong...'} />
      </>
    );
  }
  return (
    <>
      {renderSearchPanel()}
      {notFound ? (
        <div className="wrong-label">{notFoundLable}</div>
      ) : (
        <>
          <MovieList data={data.results} />
          <MoviesPagination getPage={getPage} totalPages={data.total_pages} />
        </>
      )}
    </>
  );
};

export default MovieTab;
