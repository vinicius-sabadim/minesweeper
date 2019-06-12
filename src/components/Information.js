import React, { useContext } from 'react'

import Checkbox from './common/Checkbox'
import Button from './common/Button'
import Menu from './Menu'
import GameContext from '../contexts/Game'

import styles from './Information.style'

const Information = () => {
  const {
    bombsRemaining,
    cheat,
    cleanBorders,
    isVictory,
    restartGame,
    time,
    toggleCheatHover
  } = useContext(GameContext)

  return (
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

      <div className={styles.victory}>{isVictory ? 'Victory :)' : ''}</div>

      <div className={styles.cheatArea}>
        <h1>Cheat area</h1>
        <Checkbox
          checked={cheat.hover}
          label="Show hover"
          onChange={toggleCheatHover}
        />
        <Button onClick={cleanBorders}>Start with clean borders</Button>
      </div>

      <div className={styles.hints}>
        <p>
          <strong>Arrow keys</strong>: move
        </p>
        <p>
          <strong>Enter</strong>: click cell
        </p>
        <p>
          <strong>F</strong>: toggle flag
        </p>
        <p>
          <strong>R</strong>: restart
        </p>
        <p>
          <strong>C</strong>: start with clean border
        </p>
      </div>
    </div>
  )
}

export default Information
