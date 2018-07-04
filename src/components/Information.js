import React from 'react'

import { GameConsumer } from '../contexts/Game'

import * as styles from './Information.style'

class Information extends React.Component {
  render() {
    return (
      <GameConsumer>
        { ({ bombsRemaining, isVictory, time }) => (
          <div className={ styles.wrapper }>
            <div className={ styles.victory }>
              { isVictory ? 'Victory' : '' }
            </div>
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