import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/auth'
import useAuth from '../hooks/useAuth'
import RoundedImg from './RoundedImg'

import Logo from './Logo'
import Closed from './Closed'

const LogOut = ({
  styles,
  /* dynamic styles */
  loginClicked
  /* login callback function */
}) => {
  const [auth, profile] = useAuth()

  const [email, setEmail] = useState("")

  const history = useHistory()

  const { paddingLeftRight } = styles;

  const [photoURL, setPhotoURL] = useState("")

  const menuStyle = {
    paddingRight: paddingLeftRight
  }

  useEffect(()=>{
    if (auth && auth.uid) {

      const {email: currentEmail } = auth
      setEmail(currentEmail)

      const {photoURL: url} = profile
      setPhotoURL(url ? url : "")

    }

  },[auth, profile])

  function onClosedClick(event) {
    console.log("LogOut.onClosedClick")
    history.goBack()
  }

  function onLoginClicked(event) {
    console.log("LogOut.onLoginClick")
    firebase.logout().then((res) => {
    history.push('/signup')

    })
    .catch((err) => console.error)
  }

  function onLogoClicked(event) {
    console.log("Login.onLogoClick");
    history.push('/app')
  }


  return (<div>
    <div className="menu" style={menuStyle}>
      <Logo styles={styles} click={onLogoClicked}/>
      <Closed styles={styles} click={onClosedClick}/>
    </div>
    <div className="container">
      <h2 className="page-title">Trivia Game</h2>
    </div>
    <div className="container">
      <RoundedImg styles={styles} title={email} src={photoURL} />
    </div>
    <div className="container">
      <button className="auth-button" onClick={onLoginClicked} >Logout</button>
    </div>
  </div>)

}

export default LogOut
