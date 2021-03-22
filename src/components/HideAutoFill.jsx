import React from 'react'


const HideAutoFill = ({styles}) => {

  return (<div>
    <div style={{
        overflow: "hidden",
        height: "0px",
        background: "transparent"
      }} data-description="dummyPanel for Chrome auto-fill issue">
      <input type="text" style={{
          height: 0,
          background: "transparent",
          color: "transparent",
          border: "none"
        }} data-description="dummyUsername"></input>
      <input type="password" style={{
          height: 0,
          background: "transparent",
          color: "transparent",
          border: "none"
        }} data-description="dummyPassword"></input>
    </div>
  </div>)

}

export default HideAutoFill
