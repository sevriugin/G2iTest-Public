import React from 'react';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

const up = () => <ThumbUpIcon color="inherit"/>
const down = () => <ThumbDownIcon color="error"/>
const upUnselected = () => <ThumbUpIcon color="action"/>
const downUnselected = () => <ThumbDownIcon color="action"/>

const IconMap = {
  up,
  down,
  upUnselected,
  downUnselected
}

const Icon = React.memo(({name}) => {
  const Component = IconMap[name]
  return (<Component/>)
})


const AnswerButton = ({
  styles,
  /* dynamic styles object */
  click,
  /* callback functions */
  answer,
  /* answer string */
  icon,
  /* icon name string */
  isAnswered,
  /* show score, or wait */
  isSelected
  /* correct answer string */
}) => {

  function onAnswerClick() {
    if (isAnswered) return;
    click(answer);
  }

  const hintStyle = {
    ...styles,
    textDecoration: isSelected ? "underline" :"none"
  }

  const activeIcon = isAnswered && !isSelected ? icon + "Unselected" : icon;

  return <button id="close-menu" className="button-answer" style={styles} onClick={onAnswerClick}>

    <Icon name={activeIcon}/>
    <div style={hintStyle} className="button-answer-hint">{answer}</div>
  </button>
}

export default AnswerButton;
