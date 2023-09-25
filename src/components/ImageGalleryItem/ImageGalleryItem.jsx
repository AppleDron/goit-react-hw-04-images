import React, { Component } from 'react';
import css from './ImageGalleryItem.module.css';
import Modal from 'components/Modal/Modal';

export default class ImageGalleryItem extends Component {
  state = {
    isVisibleModal: false,
  };

  handleOpenModal = () => {
    this.setState({ isVisibleModal: true });
  };

  closeModal = () => {
    this.setState({ isVisibleModal: false });
  };

  render() {
    const { id, webformatURL, largeImageURL } = this.props;
    const { isVisibleModal } = this.state;

    return (
      <>
        <li className={css.ImageGalleryItem} key={id}>
          <img
            src={webformatURL}
            alt={largeImageURL}
            className={css['ImageGalleryItem-image']}
            onClick={this.handleOpenModal}
          />
          {isVisibleModal && (
            <Modal largeImageURL={largeImageURL} closeModal={this.closeModal} />
          )}
        </li>
      </>
    );
  }
}
