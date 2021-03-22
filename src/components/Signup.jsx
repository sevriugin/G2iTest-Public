import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/auth'
import useAuth from '../hooks/useAuth'

import Logo from './Logo'
import Closed from './Closed'
import TextInput from './TextInput'
import HideAutoFill from './HideAutoFill'
import LinkButton from './LinkButton'

const Signup = ({
  styles,
  /* dynamic styles */
  signupClicked
  /* signup callback */
}) => {
  const {paddingLeftRight} = styles;

  const menuStyle = {
    paddingRight: paddingLeftRight
  }

  const [userName, setUserName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [auth, profile] = useAuth();

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const history = useHistory()

  useEffect(() => {
    console.log(firebase)
    if (auth && auth.uid) {
      const {email: currentEmail} = auth
      setEmail(currentEmail)
      setIsLoggedIn(true)
    }
  }, [auth, profile])

  function onLogoClicked(event) {
    console.log("SignUp.onLogoClick");
    history.push('/login')
  }

  function onClosedClick(event) {
    console.log("SignUp.onClosedClick")
    history.push('/login')
  }

  function onSignUpClicked(event) {
    console.log("SignUp.onSignUpClicked")

    event.preventDefault()

    if (!checkConfirmPassword())
      return

    if (isError)
      return

    if (checkIsEmpty())
      return

    firebase.createUser({ email, password}, {userName, email})
    .then(res => {
      console.log(res)
      history.push('/profile')
    })
    .catch(error => {
        console.log(error)
        setIsError(true)
        setErrorMessage(error.message)
    })

  }

  function updateEmail(text) {
    setIsError(false)
    setEmail(text)
  }

  function updatePassword(text) {
    setIsError(false)
    setPassword(text)
  }

  function updateConfirmPassword(text) {
    setIsError(false)
    setConfirmPassword(text)
  }

  function updateUserName(text) {
    setIsError(false)
    setUserName(text)
  }

  function checkConfirmPassword() {
    if (password === confirmPassword) {

      setIsError(false)

      return true
    } else {

      setIsError(true)
      setErrorMessage("The password is not confirmed")

      return false
    }
  }

  function checkIsEmpty() {
    if (email === "" || password === "" || userName === "" ) {
      setIsError(true)
      setErrorMessage("Need to fillout all fields")
      return true
    }

    return false
  }

  return (<div>

    <div className="menu" style={menuStyle}>
      <Logo styles={styles} click={onLogoClicked}/>
      <Closed styles={styles} click={onClosedClick}/>
    </div>

    <div className="container">
      <h2 className="page-title">Create Account</h2>
    </div>

    {
      isLoggedIn
        ? <div>
            <div className="container">
              <p>You need to logout first</p>
            </div>

            <div className="container">
              <h3>{email}</h3>
            </div>
          </div>

        : <form>
            <HideAutoFill styles={styles}/>
            <div className="container">
              <TextInput styles={styles} text={userName} title="User name" type="text" updateValue={updateUserName} autocomplete="off"/>
            </div>
            <div className="container">
              <TextInput styles={styles} text={email} title="Email" type="email" updateValue={updateEmail} autocomplete="off"/>
            </div>
            <div className="container">
              <TextInput styles={styles} text={password} title="Password" type="password" updateValue={updatePassword} autocomplete="off"/>
            </div>
            <div className="container">
              <TextInput styles={styles} text={confirmPassword} title="Confirm the password" type="password" updateValue={updateConfirmPassword} autocomplete="off"/>
            </div>
            {
              isError
                ? <div className="container">
                    <p className="error">
                      {errorMessage}</p>
                  </div>

                : <div className="container">
                    <button className="auth-button" onClick={onSignUpClicked}>Sign Up</button>

                  </div>
            }
          </form>
    }
    <LinkButton title="Have an account?" subtitle="Goto Login page" link="/login" styles={styles}/>
  </div>)
}

export default Signup
