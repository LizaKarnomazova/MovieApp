import React, { useState, useEffect } from 'react';
import { Tabs } from 'antd';

import './app.css';

import GuestSession from '../guest-session/guest-session';
import MovieTab from '../movie-tab';
import ContextRating from '../constex-rating/constex-rating';
import ContextGenres from '../context-genres/context-genres';

const App = () => {
  const [guestSessionId, setGuestSessionId] = useState('');
  const [tabKey, setTabKey] = useState('1');
  const [genresArr, setGenresArr] = useState([]);
  const value = {
    guestSessionId,
    key: 'api_key=abe1b6d231e3ee2948c3e5c3b33166fd',
    base: 'https://api.themoviedb.org/3',
  };
  const genres = {
    genresArr,
  };

  const items = [
    {
      key: '1',
      label: 'Search',
      children: (
        <>
          <MovieTab />
        </>
      ),
    },
    {
      key: '2',
      label: 'Rated',
      children: (
        <>
          <MovieTab tabKey={tabKey} />
        </>
      ),
    },
  ];

  function getGenres() {
    return fetch(`${value.base}/genre/movie/list?${value.key}`).then((response) => response.json());
  }

  useEffect(() => {
    GuestSession().then((response) => setGuestSessionId(response.guest_session_id));
    getGenres().then((response) => setGenresArr(response.genres));
  }, []);

  return (
    <ContextRating.Provider value={value}>
      <ContextGenres.Provider value={genres}>
        <section className="movie-app">
          <Tabs
            defaultActiveKey="1"
            items={items}
            centered
            onTabClick={(key) => setTabKey(key)}
            className="movie-list"
          />
        </section>
      </ContextGenres.Provider>
    </ContextRating.Provider>
  );
};

export default App;
