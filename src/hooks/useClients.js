import { useSelector } from 'react-redux'
import { useFirestoreConnect } from 'react-redux-firebase'

const useClients = (uid) => {

  let selector = (state) => state.firestore.ordered.users

  const query = {
    collection: 'users',
  }

  if (uid) {
    query.where = [['uid', '==', uid]]
    query.storeAs = uid
    selector = ({ firestore: { data } }) => data && data[uid] && Object.values(data[uid])[0]
  }

  useFirestoreConnect([query])
  const users = useSelector(selector)

  return [users];
  
}

export default useClients
