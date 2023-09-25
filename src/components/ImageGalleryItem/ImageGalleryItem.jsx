import React, { useState } from 'react';
import css from './ImageGalleryItem.module.css';
import Modal from 'components/Modal/Modal';

const ImageGalleryItem = ({ id, webformatURL, largeImageURL }) => {
  const [isVisibleModal, setIsVisibleModal] = useState(false);

  const handleOpenModal = () => {
    setIsVisibleModal(true);
  };

  const closeModal = () => {
    setIsVisibleModal(false);
  };

  return (
    <>
      <li className={css.ImageGalleryItem} key={id}>
        <img
          src={webformatURL}
          alt={largeImageURL}
          className={css['ImageGalleryItem-image']}
          onClick={handleOpenModal}
        />
        {isVisibleModal && (
          <Modal largeImageURL={largeImageURL} closeModal={closeModal} />
        )}
      </li>
    </>
  );
};

export default ImageGalleryItem;
