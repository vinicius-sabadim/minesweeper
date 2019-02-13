import React from 'react'

import Button from './common/Button'
import Menu from './Menu'
import { GameConsumer } from '../contexts/Game'

import * as styles from './Information.style'

class Information extends React.Component {
  render() {
    return (
      <GameConsumer>
        {({
          bombsRemaining,
          cheat,
          cleanBorders,
          isVictory,
          restartGame,
          time,
          toggleCheatHover
        }) => (
          <div className={styles.container}>
            <Menu />

            <div className={styles.wrapper}>
              <div className={styles.container}>
                <p>
                  Bombs remaining:{' '}
                  <span className={styles.info}>{bombsRemaining}</span>
                </p>
                <p>
                  Time: <span className={styles.info}>{time}</span>
                </p>
              </div>
            </div>

            <Button onClick={restartGame}>Restart</Button>

            <div className={styles.victory}>
              {isVictory ? 'Victory :)' : ''}
            </div>

            <div className={styles.cheatArea}>
              <h1>Cheat area</h1>
              <label className={styles.checked}>
                <input
                  type="checkbox"
                  onChange={toggleCheatHover}
                  checked={cheat.hover}
                />
                Show hover
              </label>
              <Button onClick={cleanBorders}>Start with clean borders</Button>
            </div>
          </div>
        )}
      </GameConsumer>
    )
  }
}

export default Information
