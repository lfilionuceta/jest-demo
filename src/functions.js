const axios = require('axios');

const API_URL = 'https://swapi.dev/api';

const getFilms = (personId) => {
  return axios.get(`${API_URL}/people/${personId}/`)
    .then(res => res.data.films)
    .then (filmUrls => Promise.all(filmUrls.map(url => axios.get(url))))
    .then(films => films.map(film => { return { title: film.data.title }}))
    .catch(error => error);
}

module.exports = {
  getFilms,
}