import React from 'react'
import PropTypes from 'prop-types'

import { random } from '../utils'

const GameContext = React.createContext()

class GameProvider extends React.Component {
  state = {
    bombs: 10,
    columns: 9,
    grid: [],
    rows: 9,
    selectedLevel: 'Beginner'
  }

  componentDidMount = () => {
    this.generateGrid()
  }

  generateGrid = () => {
    const { bombs, columns, rows } = this.state
    const grid = this.startGrid(this.state.rows, this.state.columns)
    this.setState({ grid }, () => this.generateBombs(bombs, rows, columns, grid))
  }

  startGrid = (rows, columns) => {
    return [...Array(rows)]
      .map((_) => [...Array(columns)].map(this.initCell))
  }

  generateBombs = (bombs, rows, columns, grid) => {
    let bombsToInclude = bombs

    while (bombsToInclude > 0) {
      const row = random(rows)
      const column = random(columns)

      if (!grid[row][column].bomb) {
        grid[row][column] = { bomb: true, flag: false }
        bombsToInclude = bombsToInclude - 1
      }
    }
    this.setState({ grid })
  }

  initCell = () => ({ bomb: false, flag: false })
  
  getGridSize = (level) => {
    if (level === 'Beginner') return { rows: 9, columns: 9 }
    if (level === 'Intermediate') return { rows: 16, columns: 16 }
    if (level === 'Expert') return { rows: 16, columns: 30 }
  }

  changeLevel = (selectedLevel) => {
    const bombs = this.updateBombsQuantity(selectedLevel)
    const { rows, columns } = this.getGridSize(selectedLevel)
    
    this.setState({ bombs, columns, rows, selectedLevel }, this.generateGrid)
  }

  updateBombsQuantity = (selectedLevel) => {
    if (selectedLevel === 'Beginner') return 10
    if (selectedLevel === 'Intermediate') return 40
    return 99
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