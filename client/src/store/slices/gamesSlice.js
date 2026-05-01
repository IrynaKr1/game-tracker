import { createSlice } from '@reduxjs/toolkit';
import { GAME_STATUSES, GAME_GENRES } from '../../utils/constants';

const initialState = {
  games: [
    {
      id: 1,
      title: 'Elden Ring',
      genre: 'RPG',
      status: GAME_STATUSES.IN_PROGRESS,
      imageUrl:
        'https://assets-prd.ignimgs.com/2021/06/12/elden-ring-button-03-1623460560664.jpg',
      hoursToComplete: 80,
      rating: 9.5,
      notes: [
        {
          id: 'note-1',
          content: 'Pokonałem Margita, trudny boss!',
          createdAt: '2024-01-15T10:30:00Z',
        },
        {
          id: 'note-2',
          content: 'Znalazłem świetny miecz w Liurnia',
          createdAt: '2024-01-20T14:20:00Z',
        },
      ],
      addedAt: '2024-01-10T12:00:00Z',
    },
  ],
};

const gamesSlice = createSlice({
  initialState,
  name: 'games',
  reducers: {},
});

const { reducer, actions } = gamesSlice;

export default reducer;
