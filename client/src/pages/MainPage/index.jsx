import { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import { getGameThunk } from '../../store/slices/gamesSlice';
import StatRow from '../../components/StatRow';
import styles from './MainPage.module.scss';
import GameList from '../../components/GameList';
import ModalForm from '../../components/ModalForm';
import GameForm from '../../components/forms/GameForm';

function MainPage ({ games = [], isFetching, error, getGames }) {
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    getGames();
  }, []);

  if (isFetching) return <p>Loading...</p>;
  if (error) return <p>Error: {JSON.stringify(error)}</p>;

  return (
    <div>
      <h1>BACKLOG</h1>
      <p>Your games backlog</p>
      <StatRow />
      <div className={styles.button_row}>
        <button onClick={() => setModalOpen(true)}>Add game</button>
        <button>All games</button>
        <button>Not started</button>
        <button>In Progress</button>
        <button>Completed</button>
      </div>
      <GameList />
      {isModalOpen && (
        <ModalForm onClose={() => setModalOpen(false)}>
          <GameForm
            onSuccess={() => setModalOpen(false)}
            onClose={() => setModalOpen(false)}
          />
        </ModalForm>
      )}
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
