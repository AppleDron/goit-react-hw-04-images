import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import React, { Component } from 'react';
import { getPixabayPictures } from 'services/pixabay-api';
import css from './ImageGallery.module.css';
import Button from 'components/Button/Button';
import { Rings } from 'react-loader-spinner';

export default class ImageGallery extends Component {
  state = {
    images: [],
    pages: null,
    page: 1,
    perPage: 12,
    isLoading: false,
    isVisibleModal: false,
    error: false,
    status: 'idle',
  };

  componentDidUpdate = (prevProps, prevState) => {
    const { perPage } = this.state;

    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ isLoading: true, status: 'pending', page: 1 });

      getPixabayPictures(this.props.searchQuery, 1, perPage)
        .then(({ data, status }) => {
          if (data.totalHits === 0) {
            this.setState({ status: 'rejected' });
            return;
          }
          let pages = Math.ceil(data.totalHits / perPage);

          this.setState({
            images: [...data.hits],
            pages,
            isLoading: false,
            status: 'resolved',
          });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  };

  handleClick = () => {
    const { page, perPage } = this.state;
    const { searchQuery } = this.props;
    const nextPage = page + 1;

    getPixabayPictures(searchQuery, nextPage, perPage)
      .then(({ data }) => {
        this.setState(prevState => ({
          images: [...prevState.images, ...data.hits],
          page: nextPage,
          status: 'resolved',
        }));
      })
      .catch(error => this.setState({ error, status: 'rejected' }));
  };

  render() {
    const { images, page, pages, isLoading, status } = this.state;

    switch (status) {
      case 'idle':
        return;

      case 'resolved':
        return (
          <>
            <ul className={css.ImageGallery}>
              {images.map(({ id, webformatURL, largeImageURL }) => {
                return (
                  <ImageGalleryItem
                    key={id}
                    webformatURL={webformatURL}
                    largeImageURL={largeImageURL}
                    onClick={this.handleOpenModal}
                  ></ImageGalleryItem>
                );
              })}
            </ul>
            {pages > page && <Button onClick={this.handleClick} />}
            {pages === page && (
              <h1>
                We're sorry, but you've reached the end of search results.
              </h1>
            )}
          </>
        );

      case 'pending':
        return (
          <Rings
            height="200"
            width="200"
            color="#4fa94d"
            radius="6"
            wrapperStyle={{}}
            wrapperClass={css.Loader}
            visible={isLoading}
            ariaLabel="rings-loading"
          />
        );

      case 'rejected':
        return (
          <h1>
            Sorry, there are no images matching your search query. Please try
            again.
          </h1>
        );

      default:
        break;
    }
  }
}
