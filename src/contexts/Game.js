import React from 'react'
import PropTypes from 'prop-types'

import { getBombsQuantity, getGridSize, random } from '../utils'

const GameContext = React.createContext()

class GameProvider extends React.Component {
  state = {
    bombs: 10,
    bombsRemaining: 10,
    cellsToDiscover: 71,
    columns: 9,
    isFirstClick: true,
    isGameOver: false,
    isVictory: false,
    grid: [],
    rows: 9,
    selectedLevel: 'Beginner',
    time: 0
  }

  timer = () => {}

  componentDidMount = () => {
    this.generateGrid()
  }

  restartGame = () => {
    this.stopTimer()

    this.setState({
      bombsRemaining: getBombsQuantity(this.state.selectedLevel),
      cellsToDiscover: (this.state.rows * this.state.columns) - this.state.bombs,
      isFirstClick: true,
      isGameOver: false,
      isVictory: false,
      time: 0
    })
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
    isHovered: false,
    isVisible: false
  })

  changeLevel = (selectedLevel) => {
    this.setState({ selectedLevel }, this.restartGame)

    const bombs = getBombsQuantity(selectedLevel)
    const { rows, columns } = getGridSize(selectedLevel)
    
    this.setState({ bombs, columns, rows }, this.generateGrid)
  }

  cellClicked = (clickedCell) => {
    if (this.state.isFirstClick && !clickedCell.hasBomb) this.startTimer()

    if (this.state.isGameOver) return
    if (this.state.isVictory) return
    if (clickedCell.isVisible) return
    if (clickedCell.hasFlag) return

    let newGrid = this.state.grid
    newGrid = this.changeCellToVisible(this.state.grid, clickedCell)

    if (clickedCell.hasBomb) {
      this.setState({ isGameOver: true })
      newGrid = this.clickedOnBomb(newGrid, clickedCell)
    } else {
      const remainingCellsToDiscover = this.updateCellsToDiscover(newGrid)
      this.verifyVictory(remainingCellsToDiscover)
    }

    this.setState({ grid: newGrid })
  }

  updateCellsToDiscover = (grid) => {
    let newCellsToDiscover = this.state.cellsToDiscover
    grid.forEach((row) => {
      row.forEach((cell) => {
        if (cell.isVisible) newCellsToDiscover = newCellsToDiscover - 1
      })
    })
    return newCellsToDiscover
  }

  verifyVictory = (cells) => {
    if (cells === 0) {
      this.stopTimer()
      this.setState({ isVictory: true })
    }
  }

  changeCellToVisible = (grid, cell) => {
    grid[cell.row][cell.column] = { ...cell, isVisible: true }

    // Show all the cells without danger level related to this cell.
    if (cell.dangerLevel === 0 && !cell.hasBomb && !cell.isVisible) {
      // The positions are in the shape:
      // 1 2 3
      // 4 x 5
      // 6 7 8
      const hasUpperRow = (cell.row - 1) >= 0
      const hasLowerRow = (cell.row + 1) < this.state.rows
      const hasLeftColumn = (cell.column - 1) >= 0
      const hasRightColumn = (cell.column + 1) < this.state.columns

      // Position 1
      if (hasUpperRow && hasLeftColumn) {
        this.changeCellToVisible(grid, grid[cell.row - 1][cell.column - 1])
      }

      // Position 2
      if (hasUpperRow) {
        this.changeCellToVisible(grid, grid[cell.row - 1][cell.column])
      }

      // Position 3
      if (hasUpperRow && hasRightColumn) {
        this.changeCellToVisible(grid, grid[cell.row - 1][cell.column + 1])
      }

      // Position 4
      if (hasLeftColumn) {
        this.changeCellToVisible(grid, grid[cell.row][cell.column - 1])
      }

      // Position 5
      if (hasRightColumn) {
        this.changeCellToVisible(grid, grid[cell.row][cell.column + 1])
      }

      // Position 6
      if (hasLowerRow && hasLeftColumn) {
        this.changeCellToVisible(grid, grid[cell.row + 1][cell.column - 1])
      }

      // Position 7
      if (hasLowerRow) {
        this.changeCellToVisible(grid, grid[cell.row + 1][cell.column])
      }

      // Position 8
      if (hasLowerRow && hasRightColumn) {
        this.changeCellToVisible(grid, grid[cell.row + 1][cell.column + 1])
      }
    }

    return grid
  }

  clickedOnBomb = (grid, clickedCell) => {
    this.stopTimer()

    grid[clickedCell.row][clickedCell.column] = {
      ...clickedCell, isVisible: true, explode: true
    }

    grid = grid.map((row) => {
      return row.map((cell) => {
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
    
    const newBombsRemaining = cell.hasFlag
      ? this.state.bombsRemaining + 1
      : this.state.bombsRemaining - 1

    newGrid[clickedCell.row][clickedCell.column] = {
      ...cell,
      hasFlag: !cell.hasFlag
    }

    this.setState({ bombsRemaining: newBombsRemaining, grid: newGrid })
  }

  toggleHover = (cell) => {
    const newGrid = this.updateCellHovered(this.state.grid, cell)

    this.setState({ grid: newGrid })
  }
  
  updateCellHovered = (grid, cell) => {
    const isHovered = !cell.isHovered
    grid[cell.row][cell.column] = { ...cell, isHovered }

    // TODO: Improve this repetition
    const hasUpperRow = (cell.row - 1) >= 0
    const hasLowerRow = (cell.row + 1) < this.state.rows
    const hasLeftColumn = (cell.column - 1) >= 0
    const hasRightColumn = (cell.column + 1) < this.state.columns

    // Position 1
    if (hasUpperRow && hasLeftColumn) {
      grid[cell.row - 1][cell.column - 1].isHovered = isHovered
    }

    // Position 2
    if (hasUpperRow) {
      grid[cell.row - 1][cell.column].isHovered = isHovered
    }

    // Position 3
    if (hasUpperRow && hasRightColumn) {
      grid[cell.row - 1][cell.column + 1].isHovered = isHovered
    }

    // Position 4
    if (hasLeftColumn) {
      grid[cell.row][cell.column - 1].isHovered = isHovered
    }

    // Position 5
    if (hasRightColumn) {
      grid[cell.row][cell.column + 1].isHovered = isHovered
    }

    // Position 6
    if (hasLowerRow && hasLeftColumn) {
      grid[cell.row + 1][cell.column - 1].isHovered = isHovered
    }

    // Position 7
    if (hasLowerRow) {
      grid[cell.row + 1][cell.column].isHovered = isHovered
    }

    // Position 8
    if (hasLowerRow && hasRightColumn) {
      grid[cell.row + 1][cell.column + 1].isHovered = isHovered
    }

    return grid
  }

  startTimer = () => {
    this.timer = setInterval(() => {
      this.setState({ time: this.state.time + 1 })
    }, 1000)

    this.setState({ isFirstClick: false })
  }

  stopTimer = () => {
    clearInterval(this.timer)
  }

  render = () => {
    return (
      <GameContext.Provider value={{
        bombsRemaining: this.state.bombsRemaining,
        changeLevel: this.changeLevel,
        cellClicked: this.cellClicked,
        grid: this.state.grid,
        isGameOver: this.state.isGameOver,
        isVictory: this.state.isVictory,
        restartGame: this.restartGame,
        selectedLevel: this.state.selectedLevel,
        time: this.state.time,
        toggleFlag: this.toggleFlag,
        toggleHover: this.toggleHover
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