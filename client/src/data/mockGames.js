import { GAME_STATUSES, GAME_GENRES } from '../utils/constants.js';

const mockGames = [
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
  {
    id: '2',
    title: 'The Witcher 3',
    genre: 'RPG',
    status: GAME_STATUSES.COMPLETED,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/en/thumb/0/0c/Witcher_3_cover_art.jpg/250px-Witcher_3_cover_art.jpg',
    hoursToComplete: 50,
    progress: 100,
    notes: [],
    addedAt: '2023-11-01T09:00:00Z',
    completedAt: '2023-12-30T22:00:00Z',
  },
  {
    id: '3',
    title: 'Starfield',
    genre: 'RPG',
    status: GAME_STATUSES.NOT_STARTED,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/en/thumb/6/6d/Bethesda_Starfield.jpg/250px-Bethesda_Starfield.jpg',
    hoursToComplete: 80,
    progress: 0,
    notes: [],
    addedAt: '2024-01-22T16:30:00Z',
  },
  {
    id: '4',
    title: 'Sekiro',
    genre: 'Action',
    status: GAME_STATUSES.IN_PROGRESS,
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/6/6e/Sekiro_art.jpg',
    hoursToComplete: 30,
    progress: 60,
    notes: [
      {
        id: 'note-5',
        content: 'Genichiro pokonany po 20 próbach...',
        createdAt: '2024-01-18T21:00:00Z',
      },
    ],
    addedAt: '2024-01-05T11:00:00Z',
  },
  {
    id: '5',
    title: 'Cyberpunk 2077',
    genre: 'RPG',
    status: GAME_STATUSES.NOT_STARTED,
    imageUrl:
      'https://upload.wikimedia.org/wikipedia/en/thumb/9/9f/Cyberpunk_2077_box_art.jpg/250px-Cyberpunk_2077_box_art.jpg',
    hoursToComplete: 60,
    progress: 0,
    notes: [
      {
        id: 'note-6',
        content: 'Czekam na kolejne patche przed rozpoczęciem',
        createdAt: '2024-01-12T13:15:00Z',
      },
    ],
    addedAt: '2024-01-12T13:00:00Z',
  },
  {
    id: '6',
    title: "Baldur's Gate 3",
    genre: 'RPG',
    status: GAME_STATUSES.IN_PROGRESS,
    imageUrl:
      'https://image.api.playstation.com/vulcan/ap/rnd/202302/2321/ba706e54d68d10a0eb6ab7c36cdad9178c58b7fb7bb03d28.png',
    hoursToComplete: 75,
    progress: 35,
    notes: [
      {
        id: 'note-7',
        content: 'Wybrałem Warlocka - ciekawe buildy!',
        createdAt: '2024-01-08T19:30:00Z',
      },
      {
        id: 'note-8',
        content: 'Act 1 ukończony, niesamowita fabuła',
        createdAt: '2024-01-16T22:45:00Z',
      },
    ],
    addedAt: '2024-01-03T10:00:00Z',
  },
];
