import React from 'react'
import PropTypes from 'prop-types'

import * as utils from '../utils'

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

  componentDidMount = () => this.startGrid()

  startGrid = () => {
    const { columns, rows, bombs } = this.state
    let newGrid = utils.generateGrid(rows, columns)
    newGrid = utils.generateBombs(newGrid, rows, columns, bombs)
    newGrid = utils.includeNeighborInformation(newGrid)
    newGrid = utils.generateDanger(newGrid)
    return new Promise(resolve => {
      this.setState({ grid: newGrid }, () => resolve())
    })
  }

  restartGame = () => {
    this.stopTimer()

    this.setState({
      bombsRemaining: utils.getBombsQuantity(this.state.selectedLevel),
      cellsToDiscover: this.state.rows * this.state.columns - this.state.bombs,
      isFirstClick: true,
      isGameOver: false,
      isVictory: false,
      time: 0
    })

    return new Promise(resolve => {
      this.startGrid().then(() => resolve())
    })
  }

  changeLevel = selectedLevel => {
    this.setState({ selectedLevel }, this.restartGame)

    const bombs = utils.getBombsQuantity(selectedLevel)
    const { rows, columns } = utils.getGridSize(selectedLevel)

    this.setState({ bombs, columns, rows }, this.startGrid)
  }

  cellClicked = clickedCell => {
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

  updateCellsToDiscover = grid => {
    let newCellsToDiscover = this.state.cellsToDiscover
    grid.forEach(row => {
      row.forEach(cell => {
        if (cell.isVisible) newCellsToDiscover = newCellsToDiscover - 1
      })
    })
    return newCellsToDiscover
  }

  verifyVictory = cells => {
    if (cells === 0) {
      this.stopTimer()
      this.setState({ isVictory: true })
    }
  }

  changeCellToVisible = (grid, cell) => {
    grid[cell.row][cell.column] = { ...cell, isVisible: true }

    // Show all the cells without danger level related to this cell.
    if (cell.dangerLevel === 0 && !cell.hasBomb && !cell.isVisible) {
      cell.neighbors.forEach(item => {
        const neighbor = utils.findCellById(grid, item)
        this.changeCellToVisible(grid, neighbor)
      })
    }

    return grid
  }

  clickedOnBomb = (grid, clickedCell) => {
    this.stopTimer()

    grid[clickedCell.row][clickedCell.column] = {
      ...clickedCell,
      isVisible: true,
      explode: true
    }

    grid = grid.map(row => {
      return row.map(cell => {
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

  toggleHover = cell => {
    const newGrid = this.updateCellHovered(this.state.grid, cell)

    this.setState({ grid: newGrid })
  }

  updateCellHovered = (grid, cell) => {
    const isHovered = !cell.isHovered
    grid[cell.row][cell.column] = { ...cell, isHovered }

    cell.neighbors.forEach(item => {
      const neighbor = utils.findCellById(grid, item)
      neighbor.isHovered = isHovered
    })

    return grid
  }

  cleanBorders = () => {
    this.restartGame().then(() => {
      const { columns, grid, rows } = this.state
      const cellTopLeft = grid[0][0]
      const cellTopRight = grid[0][columns - 1]
      const cellBottomLeft = grid[rows - 1][0]
      const cellBottomRight = grid[rows - 1][columns - 1]

      if (
        cellTopLeft.hasBomb ||
        cellTopRight.hasBomb ||
        cellBottomLeft.hasBomb ||
        cellBottomRight.hasBomb
      ) {
        return this.cleanBorders()
      }

      this.cellClicked(cellTopLeft)
      this.cellClicked(cellTopRight)
      this.cellClicked(cellBottomLeft)
      this.cellClicked(cellBottomRight)
    })
  }

  startTimer = () => {
    this.timer = setInterval(() => {
      this.setState({ time: this.state.time + 1 })
    }, 1000)

    this.setState({ isFirstClick: false })
  }

  stopTimer = () => clearInterval(this.timer)

  render = () => {
    return (
      <GameContext.Provider
        value={{
          bombsRemaining: this.state.bombsRemaining,
          changeLevel: this.changeLevel,
          cellClicked: this.cellClicked,
          cleanBorders: this.cleanBorders,
          grid: this.state.grid,
          isGameOver: this.state.isGameOver,
          isVictory: this.state.isVictory,
          restartGame: this.restartGame,
          selectedLevel: this.state.selectedLevel,
          time: this.state.time,
          toggleFlag: this.toggleFlag,
          toggleHover: this.toggleHover
        }}
      >
        {this.props.children}
      </GameContext.Provider>
    )
  }
}

GameProvider.propTypes = {
  children: PropTypes.object.isRequired
}

export default GameProvider
export const GameConsumer = GameContext.Consumer
