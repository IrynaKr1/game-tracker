import { connect } from 'react-redux';
import { deleteGameThunk } from '../../store/slices/gamesSlice';
import styles from './GameCard.module.scss';

function GameCard ({ game, deleteGame }) {
  return (
    <div className={styles.card}>
      <div className={styles.img_container}>
        {game.image && (
          <img
            className={styles.game_img}
            src={`http://localhost:5000/images/${game.image}`}
            alt={game.title}
          />
        )}
      </div>
      <div className={styles.game_info}>
        <h3>{game.title}</h3>
        <p>{game.genre}</p>
        <p>{game.playtime}</p>
        <p>{game.status}</p>
      </div>
      <div className={styles.gameCard_actions}>
        <button>Edit</button>
        <button onClick={() => deleteGame(game.id)}>Delete</button>
      </div>
    </div>
  );
}
const mapDispatchToProps = dispatch => ({
  deleteGame: id => dispatch(deleteGameThunk(id)),
});

export default connect(null, mapDispatchToProps)(GameCard);
