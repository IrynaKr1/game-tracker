import React, { useMemo } from 'react';
import { connect } from 'react-redux';
import StatCard from '../StatCard';
import styles from './StatRow.module.scss';

function StatRow ({ games = [] }) {
  const stats = useMemo(
    () => ({
      total: games.length,
      inProgress: games.filter(g => g.status === 'In progress').length,
      completed: games.filter(g => g.status === 'Completed').length,
      totalHours: games.reduce((sum, g) => sum + (g.playtime || 0), 0),
    }),
    [games]
  );
  return (
    <div className={styles.stats_row}>
      <StatCard label='All games' value={stats.total} />
      <StatCard label='In progress' value={stats.inProgress} />
      <StatCard label='Completed' value={stats.completed} />
      <StatCard label='Total game hours' value={stats.totalHours} />
    </div>
  );
}

const mapStateToProps = ({ gamesData }) => ({
  games: gamesData.games,
});

export default connect(mapStateToProps)(StatRow);
