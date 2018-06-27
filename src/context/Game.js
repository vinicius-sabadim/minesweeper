import React from 'react'
import PropTypes from 'prop-types'

const GameContext = React.createContext()

class GameProvider extends React.Component {
  state = {
    bombs: 10,
    grid: [],
    selectedLevel: 'Beginner'
  }

  componentDidMount = () => {
    this.startGrid(this.state.selectedLevel)
  }

  startGrid = (selectedLevel) => {
    const { rows, columns } = this.getGridSize(selectedLevel)
    const grid = [...Array(rows)]
      .map((_) => [...Array(columns)].map(this.initCell))
    this.setState({ grid })
  }

  initCell = () => ({
    bomb: false,
    flag: false
  })
  
  getGridSize = (level) => {
    if (level === 'Beginner') return { rows: 9, columns: 9 }
    if (level === 'Intermediate') return { rows: 16, columns: 16 }
    if (level === 'Expert') return { rows: 16, columns: 30 }
  }

  changeLevel = (selectedLevel) => {
    this.setState({ selectedLevel }, () => this.startGrid(selectedLevel))
  }

  render = () => {
    return (
      <GameContext.Provider value={{
        changeLevel: this.changeLevel,
        grid: this.state.grid,
        selectedLevel: this.state.selectedLevel
      }}>
        { this.props.children }
      </GameContext.Provider>
    )
  }
}

GameProvider.propTypes = {
  children: PropTypes.object.isRequired
}

export default GameProvider
export const GameConsumer = GameContext.Consumer