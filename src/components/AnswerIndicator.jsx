import React from 'react';
import HelpIcon from '@material-ui/icons/Help';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';


const wait = () => <HelpIcon color="action"/>
const wrong = () => <CancelIcon color="error"/>
const right = () => <CheckCircleIcon color="inherit"/>

const IconMap = {
  wait,
  wrong,
  right
}

const Icon = React.memo(({name}) => {
  const Component = IconMap[name]
  return (<Component/>)
})


const AnswerIndicator = ({
  styles,
  /* dynamic styles object */
  score,
  /* score 0 - wrong, 1 - right */
  isAnswered
  /* show score, or wait */
}) => {

  const icon = isAnswered ? ( score === 0 ? "wrong" : "right" ) : "wait";
  const hint = isAnswered ? ( score === 0 ? "Wrong" : "Correct" ) : "True or False?"

  return <button id="close-menu" className="button-indicator" style={styles}>

    <Icon name={icon}/>
    <div className="button-answer-hint">{hint}</div>
  </button>
}

export default AnswerIndicator;
