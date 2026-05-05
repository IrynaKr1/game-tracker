import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
});

//Games
export const createGame = data => axiosInstance.post('/games', data);
export const getAllGames = () => axiosInstance.get('/games');
export const deletGameById = id => axiosInstance.delete(`/games/${id}`);

//TODO add api for notes, for game -> getGameById, updateGameById
