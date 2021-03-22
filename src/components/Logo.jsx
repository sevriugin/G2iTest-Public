import React from 'react';

const Logo = ({
  styles,
  /* dynamic styles */
  link,
  /* logo link */
  click
  /* logo click callback */
}) => {
  const { paddingLeftRight } = styles

  const logoStyle = {
    left: paddingLeftRight
  }

  return <button className="logo button-link" style={logoStyle} onClick={click}>
    <img className="logo-icon" alt="Federazione Ciclistica Italiana Logo" src="/img/uniformlogo2.png"></img>
  </button>

};

export default Logo;
