import React from 'react';

const Closed = ({
  styles,
  /* dynamic styles object */
  click
  /* callback functions */
}) => {

  return <button id="close-menu" className="button-link" style={styles} onClick={click}>
    <svg xmlns="http://www.w3.org/2000/svg" className="svg-icon-close" height="24" width="24" viewBox="0 0 24 24" version="1.1">
      <g strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" stroke="#141414" fill="none">
        <line y2="6" x2="18" y1="18" x1="6"></line>
        <line y2="6" x2="6" y1="18" x1="18"></line>
      </g>
    </svg>
  </button>
}

export default Closed;
