import React, { useState } from 'react';
import css from './SearchBar.module.css';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchBar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleChange = e => {
    setValue(e.target.value.trim());
  };

  const handleSubmit = e => {
    e.preventDefault();

    onSubmit(value);
    setValue('');
  };

  return (
    <>
      <header className={css.searchbar} onSubmit={handleSubmit}>
        <form className={css.SearchForm}>
          <button type="submit" className={css['SearchForm-button']}>
            <AiOutlineSearch className={css['SearchForm-button-label']} />
          </button>

          <input
            onChange={handleChange}
            value={value}
            className={css['SearchForm-input']}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    </>
  );
};

export default SearchBar;
