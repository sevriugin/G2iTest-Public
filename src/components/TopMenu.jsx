import React, {useState, useEffect} from 'react';
import menuItems from '../menuItems';
import Logo from './Logo';
import Hamburger from './Hamburger';

import { connect } from 'react-redux'

const mapStateToProps = ({selectedMenuItem}) => ({
  selectedMenuItem
});

const TopMenu = ({
  styles,
  /* Dynamic styles object */
  menuItemSelected,
  /* menu item selection callback */
  logoClicked,
  /* logo clicked callback */
  hamburgerClicked,
  /* hamburger clicked callback */
  selectedMenuItem
  /* selected menu item */
}) => {
  const [selected, setSelected] = useState(0);

  useEffect(()=>{
    setSelected(selectedMenuItem)
  },[selectedMenuItem])

  const selectedStyle = {
    color: styles.black(0.5)
  }

  const { topMenuHeight, paddingLeftRight } = styles;

  const topMenuStyle = {
    height: topMenuHeight,
    paddingRight: paddingLeftRight
  }

  function onMenuItemSelected(event) {
    const key = parseInt(event.target.value, 10)
    setSelected(key)

    menuItemSelected(key)
  }

  function onLogoClick(event) {
    console.log("TopMenu.onLogoClick")
    logoClicked()
  }

  function onHamburgerClick(event) {
    console.log("TopMenu.onHamburgerClick")
    hamburgerClicked()
  }

  return (<div>
    <div className="menu" style={topMenuStyle}>
      <Logo styles={styles} click={onLogoClick}/> { !styles.topMenuCollapsed &&
        menuItems.map((item, i) => (<span key={i}>
          <button  value={i} className="button-link button-menu" style={i === selected
              ? selectedStyle
              : null} onClick={onMenuItemSelected}>{item.title}
          </button>
          {
            i < menuItems.length - 1
              ? <span className="separator">・</span>
              : null
          }
        </span>))
      }
      {styles.topMenuCollapsed && <Hamburger styles={styles} click={onHamburgerClick}/>}
    </div>
    <hr className="divider"/>
  </div>)

}

export default connect(mapStateToProps)(TopMenu);
