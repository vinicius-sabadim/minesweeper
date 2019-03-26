import React, { useContext } from 'react'

import Button from './common/Button'
import Menu from './Menu'
import GameContext from '../contexts/Game'

import styles from './Information.style'

const Information = () => {
  const {
    bombsRemaining,
    calculateBombChance,
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
        <label className={styles.checked}>
          <input
            type="checkbox"
            onChange={toggleCheatHover}
            checked={cheat.hover}
          />
          Show hover
        </label>
        <Button onClick={calculateBombChance}>Calculate bomb chance</Button>
        <Button onClick={cleanBorders}>Start with clean borders</Button>
      </div>
    </div>
  )
}

export default Information
