import React from 'react'

import * as gridUtils from '../utils/grid'
import * as utils from '../utils'
import {
  bombsQuantity,
  columnsQuantity,
  gameStatus,
  rowsQuantity
} from '../constants'

const GameContext = React.createContext()

export class GameProvider extends React.Component {
  state = {
    bombs: 10,
    bombsRemaining: 10,
    cellsToDiscover: 71,
    cheat: {
      cleanBorders: false,
      hover: false
    },
    grid: [],
    navigateUsingArrow: 0,
    status: gameStatus.READY,
    selectedLevel: 'BEGINNER',
    time: 0
  }

  timer = () => {}

  componentDidMount = () => this.startGrid()

  startGrid = async () => {
    const { bombs, cheat, selectedLevel } = this.state
    const rows = rowsQuantity[selectedLevel]
    const columns = columnsQuantity[selectedLevel]

    let newGrid = gridUtils.generateGrid(rows, columns)
    newGrid = utils.generateBombs(
      newGrid,
      rows,
      columns,
      bombs,
      cheat.cleanBorders
    )
    newGrid = utils.includeNeighborInformation(newGrid, rows, columns)
    newGrid = utils.generateDanger(newGrid)
    return await this.setState({ grid: newGrid })
  }

  restartGame = async event => {
    // Prevents the trigger using the "enter" key
    if (event && event.detail === 0) return

    this.stopTimer()

    this.setState({
      bombsRemaining: bombsQuantity[this.state.selectedLevel],
      cellsToDiscover: this.state.rows * this.state.columns - this.state.bombs,
      cheat: {
        ...this.state.cheat,
        cleanBorders: false
      },
      navigateUsingArrow: 0,
      status: gameStatus.READY,
      time: 0
    })
    return await this.startGrid()
  }

  changeLevel = selectedLevel => {
    this.setState({ selectedLevel }, this.restartGame)

    const bombs = bombsQuantity[selectedLevel]
    const rows = rowsQuantity[selectedLevel]
    const columns = columnsQuantity[selectedLevel]

    this.setState({ bombs, columns, rows }, this.startGrid)
  }

  cellClicked = clickedCells => {
    const { status } = this.state
    if (status !== gameStatus.READY && status !== gameStatus.PLAYING) return

    let newGrid = this.state.grid
    for (const cell of clickedCells) {
      if (cell.isVisible) return
      if (cell.hasFlag) return
      newGrid = this.changeCellToVisible(this.state.grid, cell)

      if (cell.hasBomb) {
        this.setState({ status: gameStatus.GAME_OVER })
        newGrid = this.clickedOnBomb(newGrid, cell)
      } else {
        const remainingCellsToDiscover = this.updateCellsToDiscover(newGrid)
        this.verifyVictory(remainingCellsToDiscover)
      }
    }
    if (status === gameStatus.READY) {
      this.setState({ status: gameStatus.PLAYING }, () => {
        if (clickedCells.length > 1) {
          this.startTimer()
        } else if (!clickedCells[0].hasBomb) {
          this.startTimer()
        }
      })
    }

    this.setState({ grid: newGrid })
  }

  updateCellsToDiscover = grid => {
    let newCellsToDiscover = this.state.cellsToDiscover
    for (const cell of grid) {
      if (cell.isVisible) newCellsToDiscover = newCellsToDiscover - 1
    }
    return newCellsToDiscover
  }

  verifyVictory = cells => {
    if (cells === 0) {
      this.stopTimer()
      this.setState({ status: gameStatus.VICTORY })
    }
  }

  changeCellToVisible = (grid, cell) => {
    grid[cell.id] = { ...cell, isVisible: true }

    // Show all the cells without danger level related to this cell.
    if (cell.dangerLevel === 0 && !cell.hasBomb && !cell.isVisible) {
      cell.neighbors.forEach(neighbor => {
        this.changeCellToVisible(grid, grid[neighbor])
      })
    }

    return grid
  }

  clickedOnBomb = (grid, clickedCell) => {
    this.stopTimer()

    grid[clickedCell.id] = {
      ...clickedCell,
      isVisible: true,
      explode: true
    }

    grid = grid.map(cell => {
      if (cell.hasBomb && !cell.explode) {
        return { ...cell, isVisible: true }
      }
      return cell
    })

    return grid
  }

  toggleFlag = (clickedCell, event) => {
    if (event) {
      event.preventDefault()
    }

    if (clickedCell.isVisible) return

    const newGrid = this.state.grid
    const cell = newGrid[clickedCell.id]

    const newBombsRemaining = cell.hasFlag
      ? this.state.bombsRemaining + 1
      : this.state.bombsRemaining - 1

    newGrid[clickedCell.id] = {
      ...cell,
      hasFlag: !cell.hasFlag
    }

    this.setState({ bombsRemaining: newBombsRemaining, grid: newGrid })
  }

  setHover = (cell, isHovered) => {
    if (!this.state.cheat.hover) return

    const newGrid = this.state.grid
    newGrid[cell.id] = { ...cell, isHovered }

    cell.neighbors.forEach(neighbor => {
      newGrid[neighbor].isHovered = isHovered
    })

    this.setState({ grid: newGrid })
  }

  cleanBorders = event => {
    // Prevents the trigger using the "enter" key
    if (event && event.detail === 0) return

    this.setState(
      {
        cheat: {
          ...this.state.cheat,
          cleanBorders: true
        }
      },
      async () => {
        await this.restartGame()

        const { grid, selectedLevel } = this.state
        const rows = rowsQuantity[selectedLevel]
        const columns = columnsQuantity[selectedLevel]

        const cellTopLeft = grid[0]
        const cellTopRight = grid[columns - 1]
        const cellBottomLeft = grid[(rows - 1) * columns]
        const cellBottomRight = grid[grid.length - 1]

        this.cellClicked([
          cellTopLeft,
          cellTopRight,
          cellBottomLeft,
          cellBottomRight
        ])
      }
    )
  }

  toggleCheatHover = () => {
    const { cheat } = this.state
    this.setState({
      cheat: {
        ...cheat,
        hover: !cheat.hover
      }
    })
  }

  changeNavigation = action => {
    const id = this.state.navigateUsingArrow
    const newGrid = this.state.grid
    const activeCell = newGrid[id]
    const { selectedLevel } = this.state
    const rows = rowsQuantity[selectedLevel]
    const columns = columnsQuantity[selectedLevel]

    let newNavigateUsingArrow = id

    if (action === 'down' && utils.hasLowerRow(activeCell, rows)) {
      newNavigateUsingArrow = id + columns
    } else if (action === 'up' && utils.hasUpperRow(activeCell)) {
      newNavigateUsingArrow = id - columns
    } else if (action === 'left' && utils.hasLeftColumn(activeCell)) {
      newNavigateUsingArrow = id - 1
    } else if (
      action === 'right' &&
      utils.hasRightColumn(activeCell, columns)
    ) {
      newNavigateUsingArrow = id + 1
    } else if (action === 'trigger') {
      this.cellClicked([activeCell])
    } else if (action === 'flag') {
      this.toggleFlag(activeCell)
    } else if (action === 'restart') {
      this.restartGame()
    } else if (action === 'clean') {
      this.cleanBorders()
    }
    this.setState({ navigateUsingArrow: newNavigateUsingArrow })
  }

  startTimer = () => {
    this.timer = setInterval(() => {
      this.setState({ time: this.state.time + 1 })
    }, 1000)
  }

  stopTimer = () => {
    clearInterval(this.timer)
  }

  render = () => {
    return (
      <GameContext.Provider
        value={{
          bombsRemaining: this.state.bombsRemaining,
          changeLevel: this.changeLevel,
          changeNavigation: this.changeNavigation,
          cellClicked: this.cellClicked,
          cheat: this.state.cheat,
          cleanBorders: this.cleanBorders,
          grid: this.state.grid,
          isGameOver: this.state.status === gameStatus.GAME_OVER,
          isVictory: this.state.status === gameStatus.VICTORY,
          navigateUsingArrow: this.state.navigateUsingArrow,
          restartGame: this.restartGame,
          selectedLevel: this.state.selectedLevel,
          time: this.state.time,
          toggleCheatHover: this.toggleCheatHover,
          toggleFlag: this.toggleFlag,
          setHover: this.setHover
        }}
      >
        {this.props.children}
      </GameContext.Provider>
    )
  }
}

export default GameContext
