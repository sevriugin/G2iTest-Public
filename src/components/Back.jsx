import React, {useCallback} from 'react'
import {useHistory} from 'react-router-dom'

const Back = ({
  styles
  /* dynamic styles object */
}) => {
  const history = useHistory()

  const onClick = useCallback(
    () => history.length > 0
    ? history.goBack()
    : history.push('/app'),
  [history]);

  return (<div >
    <svg className="back" onClick={onClick} xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z"/></svg>
  </div>)
}
export default Back
