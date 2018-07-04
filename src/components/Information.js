import React from 'react'

import Menu from './Menu'
import { GameConsumer } from '../contexts/Game'

import * as styles from './Information.style'

class Information extends React.Component {
  render() {
    return (
      <GameConsumer>
        { ({ bombsRemaining, isVictory, restartGame, time, undo }) => (
          <div className={ styles.container }>
            <Menu />

            <div className={ styles.wrapper }>
              <div className={ styles.container }>
                <p>Bombs remaining: <span className={ styles.info }>{ bombsRemaining }</span></p>
                <p>Time: <span className={ styles.info }>{ time }</span></p>
              </div>
            </div>

            <div className={ styles.buttonArea }>
              <button
                className={ styles.button } onClick={ restartGame }>
                Restart
              </button>
            </div>

            <div className={ styles.victory }>
              { isVictory ? 'Victory' : '' }
            </div>
            
          </div>
        )}
      </GameConsumer>
    )
  }
}

export default Information