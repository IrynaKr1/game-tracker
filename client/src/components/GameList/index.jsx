import { connect } from 'react-redux';
import GameCard from '../GameCard';
import styles from './GameList.module.scss';

function GameList ({ games = [] }) {
  if (games.length === 0) {
    return <p>No games added</p>;
  }

  return (
    <div className={styles.games_list}>
      {games.map(game => (
        <GameCard key={game.id} game={game} />
      ))}
    </div>
  );
}

const mapStateToProps = ({ gamesData }) => ({
  games: gamesData.filter.status
    ? gamesData.games.filter(game => game.status === gamesData.filter.status)
    : gamesData.games,
});

export default connect(mapStateToProps)(GameList);
