import axios from 'axios';

const customFetch = axios.create({
  baseURL: 'https://api.escuelajs.co/api/v1',
});

export default customFetch;
