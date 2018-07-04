import React from 'react'
import Grid from './Grid'
import Information from './Information'
import Menu from './Menu'

import { GameConsumer } from '../contexts/Game'

import * as styles from './App.style.js'

const App = () => (
  <GameConsumer>
    { ({ restartGame }) => (
      <div className={ styles.app }>
        <div className={ styles.container }>
          <button
            className={ styles.button } onClick={ restartGame }>
            Restart
          </button>
          <Menu />
        </div>
        <React.Fragment>
          <Information />
          <Grid />
        </React.Fragment>
      </div>
    )}
  </GameConsumer>
)

export default App
