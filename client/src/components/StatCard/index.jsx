import React from 'react';

function StatCard ({ label, value }) {
  return (
    <div>
      <p>{label}</p>
      <h3>{value}</h3>
    </div>
  );
}

export default StatCard;
