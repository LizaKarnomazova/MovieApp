import React from 'react';
import { Input } from 'antd';

const SearchPanel = ({ getMovieName }) => {
  const debounce = (fn, debounceTime) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(args), debounceTime);
    };
  };

  const makeRequest = debounce(([query]) => {
    if (query.search(/[а-яА-Яa-zA-Z0-9]/) === 0) {
      getMovieName(query.trimStart().replace(/\s+/g, '%20'));
    }
  }, 1000);

  function onChange(e) {
    const { value } = e.target;
    makeRequest(value);
  }

  function onSubmit(e) {
    e.preventDefault();
  }

  return (
    <form onSubmit={onSubmit}>
      <Input placeholder="Type to search..." onChange={onChange} />
    </form>
  );
};

export default SearchPanel;
