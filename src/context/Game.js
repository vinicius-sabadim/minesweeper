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
    let id = 0
    return [...Array(rows)]
      .map((_) => [...Array(columns)].map(() => this.initCell(id++)))
  }

  generateBombs = (bombs, rows, columns, grid) => {
    let bombsToInclude = bombs

    while (bombsToInclude > 0) {
      const row = random(rows)
      const column = random(columns)

      if (!grid[row][column].bomb) {
        grid[row][column] = {
          ...grid[row][column],
          bomb: true
        }
        bombsToInclude = bombsToInclude - 1
      }
    }
    this.setState({ grid }, () => this.generateDanger(rows, columns, grid))
  }

  generateDanger = (rows, columns, grid) => {
    grid.forEach((row, indexRow) => {
      row.forEach((cell, indexColumn) => {
        const hasUpperRow = (indexRow - 1) >= 0
        const hasLowerRow = (indexRow + 1) < rows
        const hasLeftColumn = (indexColumn - 1) >= 0
        const hasRightColumn = (indexColumn + 1) < columns
        
        cell.dangerLevel = this.calculateDangerLevel(grid, indexRow, indexColumn, hasUpperRow, hasLowerRow, hasLeftColumn, hasRightColumn)
      })
    })

    this.setState({ grid })
  }

  calculateDangerLevel = (grid, indexRow, indexColumn, hasUpperRow, hasLowerRow, hasLeftColumn, hasRightColumn) => {
    // The positions are in the shape:
    // 1 2 3
    // 4 x 5
    // 6 7 8
    let dangerLevel = 0

    // Position 1
    if (hasUpperRow && hasLeftColumn) {
      if (grid[indexRow - 1][indexColumn - 1].bomb) dangerLevel = dangerLevel + 1
    }

    // Position 2
    if (hasUpperRow) {
      if (grid[indexRow - 1][indexColumn].bomb) dangerLevel = dangerLevel + 1
    }

    // Position 3
    if (hasUpperRow && hasRightColumn) {
      if (grid[indexRow - 1][indexColumn + 1].bomb) dangerLevel = dangerLevel + 1
    }

    // Position 4
    if (hasLeftColumn) {
      if (grid[indexRow][indexColumn - 1].bomb) dangerLevel = dangerLevel + 1
    }

    // Position 5
    if (hasRightColumn) {
      if (grid[indexRow][indexColumn + 1].bomb) dangerLevel = dangerLevel + 1
    }

    // Position 6
    if (hasLowerRow && hasLeftColumn) {
      if (grid[indexRow + 1][indexColumn - 1].bomb) dangerLevel = dangerLevel + 1
    }

    // Position 7
    if (hasLowerRow) {
      if (grid[indexRow + 1][indexColumn].bomb) dangerLevel = dangerLevel + 1
    }

    // Position 8
    if (hasLowerRow && hasRightColumn) {
      if (grid[indexRow + 1][indexColumn + 1].bomb) dangerLevel = dangerLevel + 1
    }

    return dangerLevel
  }

  initCell = (id) => ({
    id,
    bomb: false,
    flag: false,
    dangerLevel: 0,
    isVisible: false
  })
  
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

  cellClicked = (clickedCell) => {
    if (clickedCell.isVisible) return

    const newGrid = this.state.grid.map((row) => {
      return row.map((cell) => {
        if (clickedCell.id === cell.id) return ({
          ...cell,
          isVisible: true
        })
        return cell
      })
    })

    this.setState({ grid: newGrid })
  }

  render = () => {
    return (
      <GameContext.Provider value={{
        changeLevel: this.changeLevel,
        cellClicked: this.cellClicked,
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