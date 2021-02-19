import React from 'react';

import './Moves.scss';

const Moves = ({ value, loading }) => (
  <div id="moves">
    <span>
      {loading ? '/' : value}
    </span>
  </div>
);

export default Moves;