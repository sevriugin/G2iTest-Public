
import { selectedMenuItem } from './selectedMenuItem'
import { remoteQuestions } from './remoteQuestions'
import { firebaseReducer } from 'react-redux-firebase'
import { firestoreReducer } from 'redux-firestore'
import { loading } from './loading'
import { game } from './game'

export const reducer = {
  loading,
  selectedMenuItem,
  remoteQuestions,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
  game
}
