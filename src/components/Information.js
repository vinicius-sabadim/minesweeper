import React, { useContext } from 'react'

import Checkbox from './common/Checkbox'
import Button from './common/Button'
import Menu from './Menu'
import GameContext from '../contexts/Game'

import './Information.css'

const Information = () => {
  const {
    bombsRemaining,
    cheat,
    cleanCorners,
    isVictory,
    restartGame,
    time,
    toggleCheatHover
  } = useContext(GameContext)

  return (
    <div className="info__container">
      <div>
        <Menu />

        <div className="info__wrapper">
          <p>
            Bombs remaining:{' '}
            <span className="info__text">{bombsRemaining}</span>
          </p>
          <p>
            Time: <span className="info__text">{time}</span>
          </p>
        </div>
        <Button onClick={restartGame}>Restart</Button>
      </div>

      <div className="info__victory">{isVictory ? 'Victory :)' : ''}</div>

      <div className="info__cheatArea">
        <h1>Cheat area</h1>
        <Checkbox
          checked={cheat.hover}
          label="Show hover"
          onChange={toggleCheatHover}
        />
        <Button onClick={cleanCorners}>Start with clean corners</Button>
      </div>

      <div className="info__hints">
        <p>
          <strong>Arrow keys</strong>: move
        </p>
        <p>
          <strong>Enter / A</strong>: click cell
        </p>
        <p>
          <strong>F</strong>: toggle flag
        </p>
        <p>
          <strong>R</strong>: restart
        </p>
        <p>
          <strong>C</strong>: start with clean corners
        </p>
      </div>
    </div>
  )
}

export default Information
