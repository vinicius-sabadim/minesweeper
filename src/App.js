import React, { Component } from 'react'
import Grid from './Grid'
import Menu from './Menu'

class App extends Component {
  state = { selectedLevel: 'Beginner' }

  changeLevel = (selectedLevel) => this.setState({ selectedLevel })

  render() {
    const { selectedLevel } = this.state

    return (
      <div>
        <Menu action={ this.changeLevel } selectedLevel={ selectedLevel } />
        <Grid selectedLevel={ selectedLevel } />
      </div>
    )
  }
}

export default App;
