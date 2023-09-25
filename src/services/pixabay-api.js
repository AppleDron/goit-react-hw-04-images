import axios from 'axios';

const API_KEY = '38643327-b21eba955d11258ba4dd60ade';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const getPixabayPictures = (searchQuery, page, perPage) => {
  return axios.get(
    `?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${perPage}`
  );
};
