import React from 'react';

const SubLogo = ({
  styles,
  /* dynamic styles */
  menuItem
  /* active top menu item */
}) => {
  const { paddingLeftRight, fullScreenMenuFontSize } = styles

  const logoStyle = {
    left: paddingLeftRight
  }

  const textStyle = {
    fontSize: fullScreenMenuFontSize
  }

  return <span className="subLogo" style={logoStyle}>

    <img className="logo-icon" alt={menuItem.title + " logo"} src={"/img/" + menuItem.icon}></img>

    <span className="sub-menu-logo" style={textStyle}>{menuItem.title}</span>

  </span>
}

export default SubLogo;
