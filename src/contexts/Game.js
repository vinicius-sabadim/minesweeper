import React from 'react'

import * as cellUtils from '../utils/cell'
import * as gridUtils from '../utils/grid'
import {
  bombsQuantity,
  columnsQuantity,
  gameStatus,
  rowsQuantity
} from '../constants'

const GameContext = React.createContext()

export class GameProvider extends React.Component {
  state = {
    bombsRemaining: 10,
    cheat: {
      cleanCorners: false,
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

  startGrid = () => {
    const { selectedLevel } = this.state

    const bombs = bombsQuantity[selectedLevel]
    const rows = rowsQuantity[selectedLevel]
    const columns = columnsQuantity[selectedLevel]
    const notPutBombsOnCorners = this.state.cheat.cleanCorners

    const initialGrid = gridUtils.generateGrid(rows, columns)
    const gridWithBombs = gridUtils.generateBombs(
      initialGrid,
      rows,
      columns,
      bombs,
      notPutBombsOnCorners
    )
    const gridWithNeighborInformation = gridUtils.includeNeighborInformation(
      gridWithBombs,
      rows,
      columns
    )
    const gridWithDangerLevel = gridUtils.generateDanger(
      gridWithNeighborInformation
    )
    this.setState({ grid: gridWithDangerLevel })
  }

  restartGame = event => {
    // Prevents the trigger using the "enter" key
    if (event && event.detail === 0) return

    this.stopTimer()

    this.setState({
      bombsRemaining: bombsQuantity[this.state.selectedLevel],
      cheat: {
        ...this.state.cheat,
        cleanCorners: false
      },
      navigateUsingArrow: 0,
      status: gameStatus.READY,
      time: 0
    })
    this.startGrid()
  }

  changeLevel = selectedLevel => {
    this.setState({ selectedLevel }, this.restartGame)
  }

  cellClicked = clickedCells => {
    const { selectedLevel, status } = this.state
    if (status !== gameStatus.READY && status !== gameStatus.PLAYING) return

    let newGrid
    const bombs = bombsQuantity[selectedLevel]

    for (const cell of clickedCells) {
      if (cell.isVisible) return
      if (cell.hasFlag) return
      newGrid = this.changeCellToVisible(this.state.grid, cell)

      if (cell.hasBomb) {
        this.setState({ status: gameStatus.GAME_OVER })
        newGrid = this.clickedOnBomb(newGrid, cell)
      } else if (gridUtils.isVictory(newGrid, bombs)) {
        this.stopTimer()
        this.setState({ status: gameStatus.VICTORY })
      }
    }

    if (cellUtils.shouldStartTimer(status, clickedCells)) {
      this.setState({ status: gameStatus.PLAYING }, this.startTimer)
    }

    this.setState({ grid: newGrid })
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

    const newGrid = this.updateGrid(grid, clickedCell.id, {
      isVisible: true,
      explode: true
    })

    return newGrid.map(cell => {
      if (cell.hasBomb && !cell.explode) {
        return { ...cell, isVisible: true }
      }
      return cell
    })
  }

  toggleFlag = (clickedCell, event) => {
    if (event) {
      event.preventDefault()
    }

    if (clickedCell.isVisible) return

    const cell = this.state.grid[clickedCell.id]
    const newFlagStatus = !cell.hasFlag
    const newGrid = this.updateGrid(this.state.grid, cell.id, {
      hasFlag: newFlagStatus
    })

    this.setState({
      bombsRemaining: cellUtils.calculateBombsRemaining(
        this.state.bombsRemaining,
        newFlagStatus
      ),
      grid: newGrid
    })
  }

  updateGrid = (grid, idToUpdate, newValues) => {
    return grid.map(cell => {
      if (cell.id !== idToUpdate) return cell

      return {
        ...cell,
        ...newValues
      }
    })
  }

  setHover = (cell, isHovered) => {
    if (!this.state.cheat.hover) return

    const newGrid = this.updateGrid(this.state.grid, cell.id, {
      isHovered
    })

    cell.neighbors.forEach(neighbor => {
      newGrid[neighbor].isHovered = isHovered
    })

    this.setState({ grid: newGrid })
  }

  cleanCorners = event => {
    // Prevents the trigger using the "enter" key
    if (event && event.detail === 0) return

    this.setState(
      {
        cheat: {
          ...this.state.cheat,
          cleanCorners: true
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

    if (action === 'down' && cellUtils.hasLowerRow(activeCell, rows)) {
      newNavigateUsingArrow = id + columns
    } else if (action === 'up' && cellUtils.hasUpperRow(activeCell)) {
      newNavigateUsingArrow = id - columns
    } else if (action === 'left' && cellUtils.hasLeftColumn(activeCell)) {
      newNavigateUsingArrow = id - 1
    } else if (
      action === 'right' &&
      cellUtils.hasRightColumn(activeCell, columns)
    ) {
      newNavigateUsingArrow = id + 1
    } else if (action === 'trigger') {
      this.cellClicked([activeCell])
    } else if (action === 'flag') {
      this.toggleFlag(activeCell)
    } else if (action === 'restart') {
      this.restartGame()
    } else if (action === 'clean') {
      this.cleanCorners()
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
          cleanCorners: this.cleanCorners,
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
