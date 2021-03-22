import React, {useState, useEffect} from 'react'
import SearchIcon from '@material-ui/icons/Search'
import HomeIcon from '@material-ui/icons/Home'
import DirectionsBikeIcon from '@material-ui/icons/DirectionsBike'
import DialpadIcon from '@material-ui/icons/Dialpad'
import BusinessIcon from '@material-ui/icons/Business'
import HomeWorkIcon from '@material-ui/icons/HomeWork'
import PersonOutlineIcon from '@material-ui/icons/PersonOutline'
import PhoneIcon from '@material-ui/icons/Phone'
import EuroIcon from '@material-ui/icons/Euro'


const search = () => <SearchIcon color="action"/>
const home = () => <HomeIcon color="action"/>
const bike = () => <DirectionsBikeIcon color="action"/>
const number = () => <DialpadIcon color="action"/>
const business = () => <BusinessIcon color="action"/>
const work = () => <HomeWorkIcon color="action"/>
const person = () => <PersonOutlineIcon color="action"/>
const phone = () => <PhoneIcon color="action"/>
const euro = () => <EuroIcon color="action"/>

const IconMap = {
  search,
  home,
  bike,
  number,
  business,
  work,
  person,
  phone,
  euro
}

const Icon = React.memo(({name}) => {
  const Component = IconMap[name]
  return (<Component/>)
})

const TextInput = React.memo(({
  styles,
  /* Dynamic styles object */
  text,
  /* String text */
  title,
  /* String title */
  type,
  /* String - type */
  updateValue,
  /* update amount callback */
  autocomplete,
  /* autocomplete */
  icon,
  focus
}) => {

  const [value, setValue] = useState("")

  useEffect(() => {

    setValue(text)
  }, [text])

  function onUpdateValue(event) {
    const txt = event.target.value
    setValue(txt)
    updateValue(txt)
  }

  return (<div className="text-input">
    <div className="text">{title}</div>
    <input autoFocus={focus} type={type} value={value} onChange={onUpdateValue} autoComplete={autocomplete}/>
    {icon && <div className="text-input-icon"><Icon name={icon}/></div>}
  </div>)

})

export default TextInput;
