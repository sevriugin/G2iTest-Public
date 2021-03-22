import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'

const useGames = (uid) => {

  let selector = (state) => state.firestore.ordered.games

  const query = {
    collection: 'games',
  }

  if (uid) {
    query.where = [['uid', '==', uid]]
    query.storeAs = uid
    query.orderBy = ['timestamp']
    selector = ({ firestore: { data } }) => data && data[uid] && Object.values(data[uid])
  }

  useFirestoreConnect([query])
  const games = useSelector(selector)

  return [games];

}

export default useGames
