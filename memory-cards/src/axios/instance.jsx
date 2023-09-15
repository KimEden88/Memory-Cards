import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://rickandmortyapi.com/api/character',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' },
});

export default instance;
