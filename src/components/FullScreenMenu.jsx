import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom'
import { connect } from 'react-redux'

import menuItems from '../menuItems'
import subMenuItems from '../subMenuItems'
import Logo from './Logo'
import Closed from './Closed'
import SubMenuItemsList from './SubMenuItemsList'
import useAuth from '../hooks/useAuth'

const mapStateToProps = ({selectedMenuItem}) => ({
  selectedMenuItem
});

const FullScreenMenu = ({
  styles,
  /* dynamic styles object */
  menuItemSelected,
  /* menu item selection call back */
  logoClicked,
  /* logo clicked call back */
  closedClicked,
  /* menu closed call back */
  selectedMenuItem
  /* store state selected top menu item */
}) => {
  const [selected, setSelected] = useState(0);

  const {paddingLeftRight, topMenuHeight, fullScreenMenuFontSize} = styles;

  const [auth, profile] = useAuth();

  const [items, setItems] = useState(subMenuItems.notAuth)

  const history = useHistory()

  console.log(auth)
  console.log(profile)

  useEffect(() => {
    if (auth && auth.uid) {
      setItems(subMenuItems.auth)
    }
    setSelected(selectedMenuItem)
    console.log(selectedMenuItem)
  }, [selectedMenuItem, auth])

  const selectedStyle = {
    color: styles.black(0.5),
    fontSize: fullScreenMenuFontSize
  }

  const normalStyle = {
    color: styles.black(1),
    fontSize: fullScreenMenuFontSize
  }


  const menuStyle = {
    paddingRight: paddingLeftRight,
    height: topMenuHeight,
  }

  const menuItemStyle = {
    marginLeft: paddingLeftRight,
    marginTop: 60
  }

  function onMenuItemSelected(event) {
    const key = parseInt(event.target.value, 10)
    setSelected(key)

    menuItemSelected(key)
    closedClicked()
  }

  function onLogoClick(event) {
    console.log("FullScreenMenu.onLogoClick")
    logoClicked()
  }

  function onClosedClick(event) {
    console.log("FullScreenMenu.onClosedClick")
    closedClicked()
  }

  function onSubMenuItemSelected(key) {
    console.log(key)
      history.push(items[key].path)
  }

  return (<div>
    <div className="menu" style={menuStyle}>
      <Logo styles={styles} click={onLogoClick}/>
      <Closed styles={styles} click={onClosedClick}/>
    </div>

    <hr className="divider"/> {
      menuItems.map((item, i) => (<div key={i} style={menuItemStyle}>
        <img className="logo-icon" alt={item.title + " logo"} src={"/img/" + item.icon}></img>
        <button value={i} className="button-link button-menu" style={i === selected
            ? selectedStyle
            : normalStyle} onClick={onMenuItemSelected}>{item.title}
        </button>

      </div>))
    }
    <footer>
        <SubMenuItemsList style={styles} items={items} subMenuItemSelected={onSubMenuItemSelected} />
    </footer>

  </div>)

}

export default connect(mapStateToProps)(FullScreenMenu)
