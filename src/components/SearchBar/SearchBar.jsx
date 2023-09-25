import React, { Component } from 'react';
import css from './SearchBar.module.css';
import { AiOutlineSearch } from 'react-icons/ai';

export default class SearchBar extends Component {
  state = {
    value: '',
  };

  handleChange = e => {
    this.setState({ value: e.target.value.trim() });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.onSubmit(this.state.value);
    this.setState({ value: '' });
  };

  render() {
    const { value } = this.state;
    return (
      <>
        <header className={css.searchbar} onSubmit={this.handleSubmit}>
          <form className={css.SearchForm}>
            <button type="submit" className={css['SearchForm-button']}>
              <AiOutlineSearch className={css['SearchForm-button-label']} />
            </button>

            <input
              onChange={this.handleChange}
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
  }
}
