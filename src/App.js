import React, { Component } from 'react'
import Grid from './Grid'
import Menu from './Menu'
import { GameConsumer } from './context/Game'

class App extends Component {
  render() {
    return (
      <GameConsumer>
        {({ changeLevel, selectedLevel }) => (
          <React.Fragment>
            <Menu action={ changeLevel } selectedLevel={ selectedLevel } />
            <Grid selectedLevel={ selectedLevel } />
          </React.Fragment>
        )}
      </GameConsumer>
    )
  }
}

export default App
