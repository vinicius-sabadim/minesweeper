import React from 'react'
import Grid from './Grid'
import Information from './Information'
import { GameProvider } from '../contexts/Game'

import styles from './App.style.js'

const App = () => (
  <div className={styles.app}>
    <GameProvider>
      <Information />
      <Grid />
    </GameProvider>
  </div>
)

export default App
