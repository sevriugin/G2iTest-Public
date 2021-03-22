import React, {useState, useEffect, useRef, useCallback} from 'react'
import {useHistory} from 'react-router-dom'
import firebase from 'firebase/app'
import 'firebase/auth'
import useAuth from '../hooks/useAuth'

import Logo from './Logo'
import Closed from './Closed'
import RoundedImg from './RoundedImg'
import TextInput from './TextInput'

import _ from 'lodash'

const Profile = ({styles}) => {

  const { paddingLeftRight } = styles;

  const menuStyle = {
    paddingRight: paddingLeftRight
  }

  const [auth, profile] = useAuth();

  const history = useHistory()

  const [photoURL, setPhotoURL] = useState("")

  const [email, setEmail] = useState("")

  const [displayName, setDisplayName] = useState("")

  const { debounce } = _

  const debounced = useRef(debounce((value) => updateUserProfile(value), 500))


  useEffect(() => {

    if (auth && auth.uid) {
      setPhotoURL(profile.photoURL)

      const {email: currentEmail } = auth
      setEmail(currentEmail)

      const {displayName: name} = profile
      setDisplayName(name ? name : "")
    }

  }, []) // eslint-disable-line


  function updateUserProfile(update) {
    console.log("Profile.updateUserProfile")
    console.log(update)
    firebase.updateProfile(update).catch(console.error)
  }


  function onLogoClicked(event) {
    console.log("Profile.onLogoClick");
    history.push('/app')
  }

  function onClosedClick(event) {
    console.log("Profile.onClosedClick")
    history.goBack()
  }

  function onUpdate(url) {
    console.log("Profile.onUpdate")
    console.log(url)
    setPhotoURL(url)
    firebase.updateProfile({photoURL: url}).then(console.log).catch(console.error)
  }

  const updateFullName = useCallback(text => {
    setDisplayName(text)
    debounced.current({displayName: text})
  },[])

  return (<div>

    <div className="menu" style={menuStyle}>
      <Logo styles={styles} click={onLogoClicked}/>
      <Closed styles={styles} click={onClosedClick}/>
    </div>

    <hr className="divider"/>

    <div className="container">
      <RoundedImg styles={styles} src={photoURL} title={email} updated={onUpdate} editable={true} />
    </div>

    <div className="container">
      <TextInput styles={styles} text={displayName} title="Name" type="text" updateValue={updateFullName} icon="person"/>
    </div>

  </div>)

}

export default Profile
