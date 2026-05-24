import { useEffect, useState, useMemo } from 'react';
import { connect } from 'react-redux';
import {
  getGameThunk,
  changeGameStatusFilter,
} from '../../store/slices/gamesSlice';
import StatRow from '../../components/StatRow';
import styles from './MainPage.module.scss';
import GameList from '../../components/GameList';
import ModalForm from '../../components/ModalForm';
import GameForm from '../../components/forms/GameForm';
import { GAME_STATUS } from '../../utils/constants';

function MainPage ({ games = [], isFetching, error, getGames, setFilter }) {
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
        <button onClick={() => setFilter(null)}>All games</button>
        <button onClick={() => setFilter(GAME_STATUS.NOT_STARTED)}>
          Not started
        </button>
        <button onClick={() => setFilter(GAME_STATUS.IN_PROGRESS)}>
          In Progress
        </button>
        <button onClick={() => setFilter(GAME_STATUS.COMPLETED)}>
          Completed
        </button>
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
  filter: gamesData.filter,
  isFetching: gamesData.isFetching,
  error: gamesData.error,
});

const mapDispatchToProps = dispatch => ({
  getGames: () => dispatch(getGameThunk()),
  setFilter: status => dispatch(changeGameStatusFilter(status)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
