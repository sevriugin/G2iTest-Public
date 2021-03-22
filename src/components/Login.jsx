import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/auth'
import {connect} from 'react-redux'

import Logo from './Logo'
import Closed from './Closed'
import TextInput from './TextInput'
import LinkButton from './LinkButton'

const mapStateToProps = ({
  firebase: {
    auth,
    profile
  }
}) => ({auth, profile})

const Login = ({
  styles,
  /* dynamic styles */
  loginClicked,
  /* login callback function */
  auth,
  profile
}) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const history = useHistory()

  const {paddingLeftRight} = styles;

  const menuStyle = {
    paddingRight: paddingLeftRight
  }

  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    console.log(auth)
    console.log(profile)
  }, [auth, profile])

  function onClosedClick(event) {
    console.log("Login.onClosedClick")
    history.goBack()
  }

  function onLoginClicked(event) {
    console.log("Login.onLoginClick")

    if (isError) return

    firebase.login({email, password}).then((res) => {
      console.log(res)
      history.goBack()

    }).catch((err) => {
      setIsError(true)
      setErrorMessage(err.message)
      console.error(err)
    })
  }

  function onLogoClicked(event) {
    console.log("Login.onLogoClick");
    history.goBack()
  }

  function updateEmail(text) {
    console.log("Login.updateEmail")
    setIsError(false)
    setEmail(text)
  }

  function updatePassword(text) {
    console.log("Login.updatePassword")
    setIsError(false)
    setPassword(text)
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
      <TextInput styles={styles} text={email} title="Email" type="email" updateValue={updateEmail}/>
    </div>
    <div className="container">
      <TextInput styles={styles} text={password} title="Password" type="password" updateValue={updatePassword}/>
    </div>
    {
      isError && <div className="container">
          <p className="error">
            {errorMessage}</p>
        </div>
    }
    <div className="container">
      <button className="auth-button" onClick={onLoginClicked}>Login</button>
    </div>
    <LinkButton title="Don't have an account?" subtitle="Create one" link="/signup" styles={styles}/>
  </div>)

}

export default connect(mapStateToProps)(Login)
