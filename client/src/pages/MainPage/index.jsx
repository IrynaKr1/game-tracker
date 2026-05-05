// pages/MainPage/MainPage.jsx
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getGameThunk } from '../../store/slices/gamesSlice';

const MainPage = () => {
  const dispatch = useDispatch();
  const { games, isFetching, error } = useSelector(({ gamesData }) => gamesData);

  useEffect(() => {
    dispatch(getGameThunk());
  }, [dispatch]);

  if (isFetching) return <p>Ładowanie...</p>;
  if (error) return <p>Błąd: {JSON.stringify(error)}</p>;

  return (
    <div>
      <h1>BACKLOG — test</h1>
      <p>Liczba gier: {games.length}</p>
      {games.map(game => (
        <div key={game.id}>
          <strong>{game.title}</strong> — {game.status} — {game.playtime}h
        </div>
      ))}
    </div>
  );
};

export default MainPage;