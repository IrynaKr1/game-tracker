import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import StatCard from '../StatCard';

function StatRow () {
  const { games } = useSelector(({ gamesData }) => gamesData);

  const stats = useMemo(() => {
    total: games.length;
  }, [games]);
  return (
    <div>
      <StatCard label='All games' value={stats.total} />
    </div>
  );
}

export default StatRow;
