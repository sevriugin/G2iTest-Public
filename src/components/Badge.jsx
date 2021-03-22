import React, {useEffect, useState} from 'react'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline'

const iconStyle = {
  position: "absolute",
  top: 2,
  left: 4
}

const add = ({onClick}) => <AddCircleOutlineIcon style={iconStyle} onClick={onClick} color="action" fontSize="small"/>
const remove = ({onClick}) => <HighlightOffIcon style={iconStyle} onClick={onClick} color="action" fontSize="small"/>

const IconMap = {
  add,
  remove
}

const Icon = React.memo(({name, onClick}) => {
  const Component = IconMap[name]
  return (<Component onClick={onClick}/>)
})

const Badge = React.memo(({
  styles,
  /* dynamic styles object */
  data,
  /* badge data: BadgeData

    BadgeData = {
      text: String;
      textColor: String;
      borderColor: String;
      signOn: Boolean;
      singColor: String;
    }

  */
  selected,
  /* card selected callback */
  show,
  /* show on start */
  icon,
  /* icon name */
  iconClick
  /* icon click callback */
}) => {

  const [showIcon, setShowIcon] = useState(false)

  const {
    text,
    textColor,
    borderColor,
    signOn,
    signColor = "red"
  } = data

  const style = {
    color: textColor,
    borderColor
  }

  const dotStyle = {
    backgroundColor: signOn
      ? signColor
      : "#E8E8E8"
  }

  function onClick(event) {
    if (selected)
      selected(data)
    if (!show)
      setShowIcon(oldValue => !oldValue)
  }

  function onIconClick(event) {
    console.log("Badge.onIconClick")
    if (iconClick)
      iconClick(data)
  }

  function Spacer() {
    return (<span>{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}{'\u00A0'}</span>)
  }

  useEffect(() => {
    if (icon && show) setShowIcon(true)
  },[icon, show])

  return (<span>
    <span style={style} onClick={onClick} className="badge">
      <span style={dotStyle} className="dot"></span>
      {text}

    </span>
    {
      showIcon && icon && icon !== "" && <span className="badge-icon-container"><Icon name={icon} onClick={onIconClick}/><Spacer/></span>
    }
  </span>)
})

export default Badge
