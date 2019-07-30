import React from 'react'
import Grid from './Grid'
import Information from './Information'
import { GameProvider } from '../contexts/Game'

import './App.css'

const App = () => (
  <div className="app">
    <GameProvider>
      <Information />
      <Grid />
    </GameProvider>
  </div>
)

export default App
