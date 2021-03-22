import React, {useState, useEffect} from 'react'
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom"
import {connect} from "react-redux"
import useAuth from './hooks/useAuth'

import styles from './styles.js'

import Landing from './components/Landing'
import Login from './components/Login'
import Logout from './components/Logout'
import Signup from './components/Signup'
import Profile from './components/Profile'

const mapStateToProps = state => ({
  ...state
});

function ConnectedApp() {

  const [dimension, setDimention] = useState({windowWidth: 0, windowHeight: 0})

  const currentStyles = {
    ...styles,
    showFooterMenuText: styles.showFooterMenuText(dimension),
    showSidebar: styles.showSidebar(dimension),
    topMenuCollapsed: styles.topMenuCollapsed(dimension),
    topMenuHeight: styles.topMenuHeight(dimension),
    paddingLeftRight: styles.paddingLeftRight(dimension),
    fullScreenMenuFontSize: styles.fullScreenMenuFontSize(dimension),
    showSubLogoText: styles.showSubLogoText(dimension),
    roundedImageSize: styles.roundedImageSize(dimension)
  };

  const [auth, profile] = useAuth()

  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {

    if (auth && auth.uid) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }

    updateDimensions();
    window.addEventListener("resize", updateDimensions);

    return function cleanup() {
      window.removeEventListener("resize", updateDimensions);
    }
  }, [auth, profile]);

  function updateDimensions() {
    let windowWidth = typeof window !== "undefined"
      ? window.innerWidth
      : 0;
    let windowHeight = typeof window !== "undefined"
      ? window.innerHeight
      : 0;

    setDimention({windowWidth, windowHeight});
  }

  return (<Router>
    <Redirect to="/signup"/>
    <div className="App">
      <Switch>
        <Route path="/login"><Login styles={currentStyles}/></Route>
        <Route path="/logout"><Logout styles={currentStyles}/></Route>
        <Route path="/app"><Landing styles={currentStyles}/></Route>
        <Route path="/signup" render={isLoggedIn
            ? () => <Redirect to="/app/quiz"/>
            : () => <Signup styles={currentStyles}/>}/>
        <Route path="/profile" render={isLoggedIn
            ? () => <Profile styles={currentStyles}/>
            : () => <Redirect to="/login"/>}/>
      </Switch>
    </div>
  </Router>);
}

const App = connect(mapStateToProps)(ConnectedApp)

export default App;
