import ImageGalleryItem from 'components/ImageGalleryItem/ImageGalleryItem';
import React, { useEffect, useState } from 'react';
import { getPixabayPictures } from 'services/pixabay-api';
import css from './ImageGallery.module.css';
import Button from 'components/Button/Button';
import { Rings } from 'react-loader-spinner';

const ImageGallery = ({ searchQuery }) => {
  const [images, setImages] = useState([]);
  const [pages, setPages] = useState(null);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(12);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (searchQuery === '') return;

    setIsLoading(true);
    setStatus('pending');
    setPage(1);

    getPixabayPictures(searchQuery, 1, perPage)
      .then(({ data }) => {
        if (data.totalHits === 0) {
          setStatus('rejected');
          return;
        }

        let pages = Math.ceil(data.totalHits / perPage);

        setImages([...data.hits]);
        setPages(pages);
        setIsLoading(false);
        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  }, [perPage, searchQuery]);

  const handleClick = () => {
    const nextPage = page + 1;

    getPixabayPictures(searchQuery, nextPage, perPage)
      .then(({ data }) => {
        setImages(prevImages => [...prevImages, ...data.hits]);
        setPage(nextPage);
        setStatus('resolved');
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      });
  };

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
                ></ImageGalleryItem>
              );
            })}
          </ul>
          {pages > page && <Button onClick={handleClick} />}
          {pages === page && (
            <h1>We're sorry, but you've reached the end of search results.</h1>
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
};

export default ImageGallery;
