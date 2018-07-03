import React from 'react'

import { GameConsumer } from './context/Game'

class Information extends React.Component {
  render() {
    return (
      <GameConsumer>
        { ({ bombsRemaining, restartGame }) => (
          <div>
            <p>Bombs remaining: { bombsRemaining }</p>  
            <p>Time</p>

            <button onClick={ restartGame }>Restart</button>
          </div>
        )}
      </GameConsumer>
    )
  }
}

export default Information