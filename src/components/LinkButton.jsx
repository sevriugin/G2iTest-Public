import React, {useCallback} from 'react'
import {useHistory} from 'react-router-dom'

const LinkButton = ({
  title,
  /* Button title */
  subtitle,
  /* Button SubTitle */
  link,
  /* Link to component */
  styles
  /* dynamic styles object */
}) => {
  const history = useHistory()

  const onClick = useCallback(
    () => {
      console.log("LinkButton.onClick")
      history.push(link)
    },
  [history, link]);

  const linkButtonStyle = {
    ...styles,
    paddingTop: 20,
    textAlign: "center"
  }

  return (<div style={linkButtonStyle} onClick={onClick} >
    <span className="link-button-title">{title}</span>&nbsp;<span className="link-button-subtitle">{subtitle}</span>
  </div>)
}
export default LinkButton
