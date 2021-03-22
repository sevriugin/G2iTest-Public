import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import QuestionCard from './QuestionCard'
import useAuth from '../hooks/useAuth'

import { useFirestore } from 'react-redux-firebase'

import { getDummyData } from '../actions/index'
import LinkButton from './LinkButton'
import { updateGame } from '../actions/index'

import { cloneDeep } from 'lodash'

import Switch from '@material-ui/core/Switch';

const mapStateToProps = state => ({
  questions: state.remoteQuestions.slice(0, 10),
  storeGame: state.game
})

const mapDispatchToProps = {
  getDummyData,
  updateGame
}

const Quiz = ({
  styles,
  /* dynamic styles object */
  questions,
  /* remote questions */
  storeGame,
  /* store game object */
  getDummyData: getData,
  /* get remote questions */
  updateGame: updateStoreGame
  /* update store game object */
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const [isNewGame, setIsNewGame] = useState(true)

  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0)

  const [isOpen, setIsOpen] = useState(true)

  const [game, setGame] = useState({})

  const {paddingLeftRight} = styles

  const [auth, profile] = useAuth()

  const [saveGame, setSaveGame] = useState(true)

  const firestore = useFirestore()

  const handleSwitch = (event) => {
    setSaveGame( event.target.checked );
  };

  const containerStyle = {
    paddingLeft: paddingLeftRight,
    paddingRight: paddingLeftRight,
    textAlign: "center"
  }

  let timer;

  function nextQuestion(next) {
    console.log("Quiz.nextQuestion")
    console.log(next)

    timer = setTimeout(() => {
        setCurrentQuestionNumber(next)
    }, 1500)
  }


  useEffect(() => {

    if (auth && auth.uid) {
      setIsLoggedIn(true)
    }

    if (storeGame && storeGame.questions) {
      console.log("Quiz.useEffect. storeGame object has been found");

      const currentNumber = storeGame.questions.findIndex((item) => !item.isAnswered)

      if (currentNumber > 0) {
        console.log(`Quiz.useEffect. currentNumber: ${currentNumber}`);
        setIsNewGame(false)
        setIsOpen(true)
        setGame(cloneDeep(storeGame))
        setCurrentQuestionNumber(currentNumber)
      } else {
        setIsNewGame(false)
        setIsOpen(false)
        setGame(cloneDeep(storeGame))
        setCurrentQuestionNumber(9)
      }

    } else {
      setIsOpen(true)
      setIsNewGame(true)
      getData("https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean")
      setCurrentQuestionNumber(0)
    }

    return function cleanup() {
        clearTimeout(timer);
    }

  }, [])

  useEffect(() => {
    console.log("Quiz.useEffect[] update game")
    console.log(game)
    updateStoreGame(cloneDeep(game))
  },[game])


  function dataFromQuestion(item, current) {
    const { category: title, question, correct_answer: correctAnswer, isAnswered,  incorrect_answers} = item
    return { title, question, number: current + 1, correctAnswer, isAnswered, incorrect_answers  }
  }

  function getCardData(current) {

    if (isNewGame && questions && questions[0]) {
      return dataFromQuestion( questions[current], current )

    } else if (game.questions) {
      return dataFromQuestion( game.questions[current], current )

    } else {
      return {}

    }
  }

  function createNewGame(score) {
    setGame(() => {
      const newGame = {
        uid: auth.uid,
        timestamp: new Date(),
        currentQuestionNumber:1,
        questions: questions.map(item => ({...item, isAnswered: false, score: 0})),
      }
      newGame.questions[0].isAnswered = true;
      newGame.questions[0].score = score;
      console.log(newGame)
      return newGame;
    })
  }

  function updateGame(score) {
    setGame((oldGame) => {
      const updatedGame = cloneDeep(oldGame);
      updatedGame.currentQuestionNumber = currentQuestionNumber + 1;
      updatedGame.questions[currentQuestionNumber].isAnswered = true;
      updatedGame.questions[currentQuestionNumber].score = score;
      console.log(updatedGame)
      return updatedGame
    })
  }

  function getScore() {
    if (game && game.questions) {
      const reducer = (accumulator, currentValue) => accumulator + currentValue.score;
      return game.questions.reduce(reducer,0)
    }
    return 0
  }

  function onAnswer(score) {

    console.log("Quiz.onAnswer")

    if (!isOpen) {
      console.log(getScore())
      return;
    }

    if (isNewGame) {
      createNewGame(score)
      nextQuestion(1)
      setIsNewGame(false)
    } else {
      updateGame(score)
      setIsOpen(currentQuestionNumber < 9)
      const next = currentQuestionNumber < 9 ? currentQuestionNumber + 1 : 9;
      nextQuestion(next)
    }

  }

  function saveGameResult() {
    if (game && game.uid) {
      return firestore.collection('games').add(game)
    }
  }

  function onPlayAgainClicked() {

    if (saveGame) {
      saveGameResult()
    }

    getData("https://opentdb.com/api.php?amount=10&difficulty=hard&type=boolean")
    setCurrentQuestionNumber(0)
    setGame({})
    setIsNewGame(true)
    setIsOpen(true)

  }

  return (<div style={containerStyle}>
      <h2 className="page-title">Trivia Challenge</h2>
      {
        isOpen ?
          <div className="container">
            <QuestionCard data={getCardData(currentQuestionNumber)} selected={onAnswer}/>
          </div>
        : <div>
            <div className="game-result-score">Your score {getScore()} from 10</div>

            <div className="container">
              <button className="auth-button" onClick={onPlayAgainClicked}>Play Again</button>
            </div>
            <LinkButton title="Would you like to see answers?" subtitle="Click here" link="/app/answers" styles={styles}/>
            <div style={{marginTop:60}} className="container">
              <Switch
                checked={saveGame}
                onChange={handleSwitch}
                color="primary"
                name="saveGameSwitch"
                inputProps={{ 'aria-label': 'save game switch' }}
              />
            <span>save game result</span>
            </div>
          </div>
      }
  </div>)
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Quiz);
