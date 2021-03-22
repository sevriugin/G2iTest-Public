import React from 'react';

const Hamburger = ({
  styles,
  /* dynamic styles object */
  click
  /* click callback */
}) => {
  return <button id="show-menu" className="button-link" onClick={click}>
    <svg xmlns="http://www.w3.org/2000/svg" className="svg-icon-hamburger" height="24" width="24" viewBox="0 0 24 24" version="1.1">
      <g strokeLinecap="round" stroke="#141414" strokeWidth="2" fill="none">
        <line y2="19" x2="20" y1="19" x1="4"></line>
        <line y2="12" x2="20" y1="12" x1="4"></line>
        <line y2="5" x2="20" y1="5" x1="4"></line>
      </g>
    </svg>
  </button>
};

export default Hamburger;
