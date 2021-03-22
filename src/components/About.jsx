import React from 'react';
import {useHistory} from 'react-router-dom'
import {connect} from 'react-redux'

import {updateSelectedMenuItem} from '../actions/index'

const mapStateToProps = state => ({
  ...state
});
const mapDispatchToProps = dispatch => ({
  updateStoreSelectedMenuItem: selection => dispatch(updateSelectedMenuItem(selection))
});

const About = ({
  styles,
  /* dynamic styles object */
  updateStoreSelectedMenuItem
  /* update selected menu item in redux store */
}) => {

  const history = useHistory()

  function onBeginClicked() {
    updateStoreSelectedMenuItem(0)
    history.push("quiz")
  }

  return(<div>
    <div className="container">
      <h2 className="page-title">Welcome to the<br /><br />Trivia Challenge!</h2>
    </div>

    <div className="container">
      <p>You will be presented <br />with 10 True or False <br />questions</p>
    </div>

    <div className="container">
      <p>Can you score 100%?</p>
    </div>

    <div className="container">
      <button className="auth-button" onClick={onBeginClicked}>Begin</button>
    </div>

  </div>)
}

export default connect(mapStateToProps, mapDispatchToProps)(About)
