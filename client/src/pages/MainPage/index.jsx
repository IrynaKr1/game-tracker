import { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { getGameThunk } from '../../store/slices/gamesSlice';
import StatRow from '../../components/StatRow';

function MainPage ({ games = [], isFetching, error, getGames }) {
  const [filter, setFilter] = useState('Wszystkie');

  useEffect(() => {
    getGames();
  }, []);

  if (isFetching) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;

  return (
    <div>
      <h1>BACKLOG</h1>
      <p>Add game to the list</p>
      <StatRow />

      {games.map(game => (
        <div key={game.id}>
          <strong>{game.title}</strong> — {game.status} — {game.playtime}h
          <button>Usuń</button>
        </div>
      ))}
    </div>
  );
}

const mapStateToProps = ({ gamesData }) => ({
  games: gamesData.games,
  isFetching: gamesData.isFetching,
  error: gamesData.error,
});

const mapDispatchToProps = dispatch => ({
  getGames: () => dispatch(getGameThunk()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
