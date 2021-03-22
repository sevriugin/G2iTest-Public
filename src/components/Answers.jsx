import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Moment from 'moment';

import Closed from './Closed'
import QuestionCard from './QuestionCard'

const mapStateToProps = state => ({
  storeGame: state.game
})

const Answers = ({
  styles,
  /* dynamic styles */
  storeGame,
  /* store game object */
  game: propsGame,
  /* props game object */
  close,
  /* close callback */
}) => {

  const [game, setGame] = useState(null)

  useEffect(() => {
    console.log("Answers.useEffect")

    if (propsGame) {
      setGame(propsGame)
    } else {
      console.log(storeGame)
      setGame(storeGame)
    }

  },[storeGame, propsGame])

  const history = useHistory()

  const {paddingLeftRight} = styles;

  const menuStyle = {
    paddingRight: paddingLeftRight
  }

  function onClosedClick(event) {
    console.log("Login.onClosedClick")

    if (close) {
      close()
      return;
    }

    history.goBack()
  }


  function onAnswer(answer) {
    console.log("Answers.onAnswer: " + answer)
  }

  function dataFromQuestion(item, current) {
    const { category: title, question, correct_answer: correctAnswer, isAnswered, score, incorrect_answers } = item
    return { title, question, number: current + 1, correctAnswer, isAnswered, score, incorrect_answers }
  }

  function getScore() {
    if (game && game.questions) {
      const reducer = (accumulator, currentValue) => accumulator + currentValue.score;
      return game.questions.reduce(reducer,0)
    }
    return 0

  }

  return (<div>
    <div className="menu" style={menuStyle}>
      <h2 className="page-title">Your Answers</h2>
      <Closed styles={styles} click={onClosedClick}/>
    </div>
    <div className="container">
      { game && game.timestamp.toDate && <div className="game-info">{getScore()} / 10 ○ {Moment(game.timestamp.toDate()).format('HH:mm')} ○ {Moment(game.timestamp.toDate()).format('DD MMM YYYY')}</div>}
    </div>


    <div className="container-horizontal-scroll">
      {
        game && game.questions && game.questions.map((item, index) =>
        <div key={index} className="container">
          <QuestionCard  data={dataFromQuestion(item, index)} selected={onAnswer}/>
        </div>)
      }

    </div>

  </div>)
}

export default connect(
  mapStateToProps
)(Answers)
