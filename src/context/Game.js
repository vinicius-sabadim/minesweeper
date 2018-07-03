import React from 'react'
import PropTypes from 'prop-types'

import { random } from '../utils'

const GameContext = React.createContext()

class GameProvider extends React.Component {
  state = {
    bombs: 10,
    columns: 9,
    isGameOver: false,
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
      .map((_, row) => [...Array(columns)].map((_, column) => this.initCell(id++, row, column)))
  }

  generateBombs = (bombs, rows, columns, grid) => {
    let bombsInserted = 0

    while (bombsInserted < bombs) {
      const row = random(rows)
      const column = random(columns)

      if (!grid[row][column].hasBomb) {
        grid[row][column] = {
          ...grid[row][column],
          hasBomb: true,
          explode: false
        }
        bombsInserted = bombsInserted + 1
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
      if (grid[indexRow - 1][indexColumn - 1].hasBomb) dangerLevel = dangerLevel + 1
    }

    // Position 2
    if (hasUpperRow) {
      if (grid[indexRow - 1][indexColumn].hasBomb) dangerLevel = dangerLevel + 1
    }

    // Position 3
    if (hasUpperRow && hasRightColumn) {
      if (grid[indexRow - 1][indexColumn + 1].hasBomb) dangerLevel = dangerLevel + 1
    }

    // Position 4
    if (hasLeftColumn) {
      if (grid[indexRow][indexColumn - 1].hasBomb) dangerLevel = dangerLevel + 1
    }

    // Position 5
    if (hasRightColumn) {
      if (grid[indexRow][indexColumn + 1].hasBomb) dangerLevel = dangerLevel + 1
    }

    // Position 6
    if (hasLowerRow && hasLeftColumn) {
      if (grid[indexRow + 1][indexColumn - 1].hasBomb) dangerLevel = dangerLevel + 1
    }

    // Position 7
    if (hasLowerRow) {
      if (grid[indexRow + 1][indexColumn].hasBomb) dangerLevel = dangerLevel + 1
    }

    // Position 8
    if (hasLowerRow && hasRightColumn) {
      if (grid[indexRow + 1][indexColumn + 1].hasBomb) dangerLevel = dangerLevel + 1
    }

    return dangerLevel
  }

  initCell = (id, row, column) => ({
    id, row, column,
    hasBomb: false,
    hasFlag: false,
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
    if (this.state.isGameOver) return
    if (clickedCell.isVisible) return
    if (clickedCell.hasFlag) return

    let newGrid = this.state.grid
    newGrid = this.changeCellToVisible(this.state.grid, clickedCell)

    if (clickedCell.hasBomb) {
      this.setState({ isGameOver: true })
      newGrid = this.clickedOnBomb(newGrid, clickedCell)
    }

    this.setState({ grid: newGrid })
  }

  changeCellToVisible(grid, cell) {
    grid[cell.row][cell.column] = {
      ...grid[cell.row][cell.column],
      isVisible: true
    }

    // Show all the cells without danger level related to this cell.
    if (cell.dangerLevel === 0 && !cell.hasBomb && !cell.isVisible) {
      // The positions are in the shape:
      //   1
      // 2 x 3
      //   4
      const hasUpperRow = (cell.row - 1) >= 0
      const hasLowerRow = (cell.row + 1) < this.state.rows
      const hasLeftColumn = (cell.column - 1) >= 0
      const hasRightColumn = (cell.column + 1) < this.state.columns

      // Position 1
      if (hasUpperRow) {
        this.changeCellToVisible(grid, grid[cell.row - 1][cell.column])
      }

      // Position 2
      if (hasLeftColumn) {
        this.changeCellToVisible(grid, grid[cell.row][cell.column - 1])
      }

      // Position 3
      if (hasRightColumn) {
        this.changeCellToVisible(grid, grid[cell.row][cell.column + 1])
      }

      // Position 4
      if (hasLowerRow) {
        this.changeCellToVisible(grid, grid[cell.row + 1][cell.column])
      }
    }

    return grid
  }

  clickedOnBomb(grid, clickedCell) {
    grid[clickedCell.row][clickedCell.column] = {
      ...clickedCell, isVisible: true, explode: true
    }

    grid = grid.map((row, indexRow) => {
      return row.map((cell, indexColumn) => {
        if (cell.hasBomb && !cell.explode) {
          return { ...cell, isVisible: true }
        }
        return cell
      })
    })

    return grid
  }

  toggleFlag = (clickedCell, event) => {
    event.preventDefault()

    if (clickedCell.isVisible) return

    const newGrid = this.state.grid
    const cell = newGrid[clickedCell.row][clickedCell.column]

    newGrid[clickedCell.row][clickedCell.column] = {
      ...cell,
      hasFlag: !cell.hasFlag
    }

    this.setState({ grid: newGrid })
  }

  render = () => {
    return (
      <GameContext.Provider value={{
        changeLevel: this.changeLevel,
        cellClicked: this.cellClicked,
        grid: this.state.grid,
        isGameOver: this.state.isGameOver,
        selectedLevel: this.state.selectedLevel,
        toggleFlag: this.toggleFlag
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