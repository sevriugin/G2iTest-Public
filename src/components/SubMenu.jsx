import React, {useState, useEffect} from 'react'
import menuItems from '../menuItems'
import subMenuItems from '../subMenuItems'
import SubLogo from './SubLogo'
import SubMenuItemsList from './SubMenuItemsList'

import {useHistory} from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import RoundedImg from './RoundedImg'

const SubMenu = ({
  styles,
  /* dynamic styles */
  activeMenuItemIndex,
  /* active top menu item index */
  subMenuItemSelected
  /* sub menu item selection callback */
}) => {

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [auth, profile] = useAuth();

  const [items, setItems] = useState(subMenuItems.notAuth)

  const history = useHistory()

  const { topMenuHeight, paddingLeftRight, topMenuCollapsed } = styles;

  const subMenuStyle = {
    height: topMenuHeight,
    paddingRight: paddingLeftRight
  }

  const profileImgStyle = {
    ...styles,
    roundedImageSize: 32,
    marginLeft: 18,
    marginRight: 16
  }

  const [photoURL, setPhotoURL] = useState("")

  const menuItem = menuItems[activeMenuItemIndex]

  useEffect(() => {
    if (auth && auth.uid) {
      setItems(subMenuItems.auth)
      setIsLoggedIn(true)
    }

    const {photoURL: url} = profile

    if (url) {
      setPhotoURL(url)
    } else {
      setPhotoURL("")
    }
    
  }, [auth, profile])

  function onSubMenuItemSelected(key) {

    history.push(items[key].path)

    subMenuItemSelected(key)
  }

  return (<div>
    <div className="menu" style={subMenuStyle}>
      <SubLogo styles={styles} menuItem={menuItem}/> {!topMenuCollapsed && <SubMenuItemsList style={styles} items={items} subMenuItemSelected={onSubMenuItemSelected}/>}
      { isLoggedIn && <RoundedImg link="/profile" styles={profileImgStyle} src={photoURL} /> }
    </div>
  </div>)
}

export default SubMenu
