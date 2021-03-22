import React, {useState} from 'react'
import useGames from '../hooks/useGames'
import useAuth from '../hooks/useAuth'

import GameCard from './GameCard'

import Answers from './Answers'

const Games = ({
  styles,
  /* dynamic styles object */
}) => {
  const [auth] = useAuth()

  const [games] = useGames(auth.uid)

  const [game, setGame] = useState(null)

  function onCardSelected(game) {
    setGame(game)
  }

  function onAnswersClose() {
    setGame(null)
  }

  return (<div>
    <div className="container">
    { games && games.length > 0 && !game && <ul>
      {
        games.map((game, index) =>
          <GameCard key={index} game={game} selected={onCardSelected}/>
        )
      }
    </ul>
    }
    </div>
    { game && <Answers styles= {styles} game={game} close={onAnswersClose}/>}
  </div>)
}

export default Games
