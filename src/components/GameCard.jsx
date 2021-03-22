import React from 'react'
import Moment from 'moment';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

const GameCard = ({
  styles,
  /* dynamic styles object */
  game,
  /* game to show */
  selected
  /* selected callback */
}) => {
  Moment.locale('en')

  function getScore() {
    if (game && game.questions) {
      const reducer = (accumulator, currentValue) => accumulator + currentValue.score;
      return game.questions.reduce(reducer,0)
    }
    return 0

  }

  function onCardSelected() {
    console.log("GameCard.onCardSelected")

    if (selected) {
      selected(game)
    }
  }

  return(<div className="game-card" onClick={onCardSelected}>
    <div className="game-card-time">{Moment(game.timestamp.toDate()).format('HH:mm')}</div>
    <div className="game-card-vl-date"></div>
    <div className="game-card-date">{Moment(game.timestamp.toDate()).format('DD MMM YYYY')}</div>
    <div className="game-card-vl-score"></div>
    <div className="game-card-score">Score {getScore(game)} / 10</div>
    <ChevronRightIcon className="game-card-action" color="action"/>
  </div>)
}

export default GameCard
