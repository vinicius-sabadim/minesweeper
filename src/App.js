import React from 'react'
import Grid from './Grid'
import Menu from './Menu'
import { GameConsumer } from './context/Game'

const App = () => (
  <GameConsumer>
    {({ changeLevel, selectedLevel }) => (
      <React.Fragment>
        <Menu action={ changeLevel } selectedLevel={ selectedLevel } />
        <Grid selectedLevel={ selectedLevel } />
      </React.Fragment>
    )}
  </GameConsumer>
)

export default App
