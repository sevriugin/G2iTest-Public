import React, {useState, useEffect} from 'react'
import {connect} from 'react-redux'
import store from '../store'
import {Switch, Route, useHistory} from 'react-router-dom'

import TopMenu from './TopMenu'
import FullScreenMenu from './FullScreenMenu'
import SubMenu from './SubMenu'
import Quiz from './Quiz'
import menuItems from '../menuItems'
import Answers from './Answers'
import Games from './Games'
import About from './About'

import {updateSelectedMenuItem} from '../actions/index'

const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => ({
  updateStoreSelectedMenuItem: selection => dispatch(updateSelectedMenuItem(selection))
});

const Landing = ({
  styles,
  /* dynamic styles object */
  selectedMenuItem,
  /* store state selected top menu item */
  updateStoreSelectedMenuItem
  /* update selected menu item in redux store */
}) => {
  const [showFullScreenMenu, setShowFullScreenMenu] = useState(false)
  const [activeMenuItemIndex, setActiveMenuItemIndex] = useState(0)

  const history = useHistory()

  useEffect(() => {

    setActiveMenuItemIndex(selectedMenuItem)

  }, [selectedMenuItem]);

  function menuItemSelected(key) {
    setActiveMenuItemIndex(key)
    updateStoreSelectedMenuItem(key)
    console.log(key)
    console.log(store.getState())

    const menuItem = menuItems[key]
    console.log(menuItem)

    history.push(menuItem.path)
  }

  function logoClicked() {
    console.log("Landing.onLogoClicked")
    if (activeMenuItemIndex === 0) {
      return;
    }

    updateStoreSelectedMenuItem(0)
    history.push("quiz")
  }

  function hamburgerClicked() {
    console.log("Landing.onHamburgerClicked")
    setShowFullScreenMenu(true)
  }

  function closedClicked() {
    console.log("Landing.onClosedClicked")
    setShowFullScreenMenu(false)
  }

  function subMenuItemSelected(key) {
    console.log(key)
  }

  return (<div>
    {
      showFullScreenMenu
        ? <FullScreenMenu styles={styles} menuItemSelected={menuItemSelected} logoClicked={logoClicked} closedClicked={closedClicked}/>

        : <div>
            <TopMenu styles={styles} menuItemSelected={menuItemSelected} logoClicked={logoClicked} hamburgerClicked={hamburgerClicked}/>
            <SubMenu styles={styles} activeMenuItemIndex={activeMenuItemIndex} subMenuItemSelected={subMenuItemSelected}/>

            <Switch>

              <Route exact path="/app">
                <Quiz styles={styles}/>
              </Route>

              <Route exact path="/app/quiz">
                <Quiz styles={styles}/>
              </Route>

              <Route exact path="/app/answers">
                <Answers styles={styles}/>
              </Route>

              <Route exact path="/app/history">
                <Games styles={styles}/>
              </Route>

              <Route exact path="/app/about">
                <About styles={styles}/>
              </Route>


            </Switch>

          </div>
    }
  </div>)

}

export default connect(mapStateToProps, mapDispatchToProps)(Landing)
