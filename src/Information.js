import React from 'react'

import { GameConsumer } from './context/Game'

import * as styles from './Information.styles'

class Information extends React.Component {
  render() {
    return (
      <GameConsumer>
        { ({ bombsRemaining, restartGame, time }) => (
          <div className={ styles.wrapper }>
            <button
              className={ styles.button } onClick={ restartGame }>
              Restart
            </button>
            <div className={ styles.container }>
              <p>Bombs remaining: <span className={ styles.info }>{ bombsRemaining }</span></p>
              <p>Time: <span className={ styles.info }>{ time }</span></p>
            </div>
          </div>
        )}
      </GameConsumer>
    )
  }
}

export default Information