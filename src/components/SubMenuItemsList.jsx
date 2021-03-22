import React  from 'react'

import subMenuItems from '../subMenuItems'

const SubMenuItemsList = ({
  style,
  /* dynamic styles */
  items,
  /* active sub menu items */
  subMenuItemSelected
  /* sub menu item selection callback */
}) => {

  const subMenuItemStyle = {
    color: "#7633ff"
  }

  function onSubMenuItemSelected(event) {
    const key = parseInt(event.target.value, 10)

    subMenuItemSelected(key)
  }

  return (<div>
    {
      items.map((item, i) => (<span key={i}>
        <button value={i} className="button-link button-menu" style={subMenuItemStyle} onClick={onSubMenuItemSelected}>{item.title}</button>
        {
          i < subMenuItems.length - 1
            ? <span className="separator" style={subMenuItemStyle}>・</span>
            : null
        }
      </span>))
    }
  </div>)

}

export default SubMenuItemsList
