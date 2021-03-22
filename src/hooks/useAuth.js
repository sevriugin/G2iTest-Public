import { useSelector } from 'react-redux'

const useAuth = () => {

  const selector = ({ firebase: { auth, profile } }) => ({ auth,
      profile })

  const { auth, profile } = useSelector(selector)

  return [auth, profile]

}

export default useAuth
