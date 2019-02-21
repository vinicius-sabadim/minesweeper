import React from 'react'
import PropTypes from 'prop-types'

import * as utils from '../utils'

const GameContext = React.createContext()

const gameStatus = {
  ready: 0,
  playing: 1,
  gameover: 2,
  victory: 3
}

const gridSize = {
  Beginner: { rows: 9, columns: 9 },
  Intermediate: { rows: 16, columns: 16 },
  Expert: { rows: 16, columns: 30 }
}

const bombsQuantity = {
  Beginner: 10,
  Intermediate: 40,
  Expert: 99
}

class GameProvider extends React.Component {
  state = {
    bombs: 10,
    bombsRemaining: 10,
    cellsToDiscover: 71,
    cheat: {
      cleanBorders: false,
      hover: false
    },
    columns: 9,
    grid: [],
    rows: 9,
    status: gameStatus.ready,
    selectedLevel: 'Beginner',
    time: 0
  }

  timer = () => {}

  componentDidMount = () => this.startGrid()

  startGrid = () => {
    const { columns, rows, bombs, cheat } = this.state
    let newGrid = utils.generateGrid(rows, columns)
    newGrid = utils.generateBombs(
      newGrid,
      rows,
      columns,
      bombs,
      cheat.cleanBorders
    )
    newGrid = utils.includeNeighborInformation(newGrid, rows, columns)
    newGrid = utils.generateDanger(newGrid)
    return new Promise(resolve => {
      this.setState({ grid: newGrid }, () => resolve())
    })
  }

  restartGame = () => {
    return new Promise(resolve => {
      this.stopTimer()

      this.setState({
        bombsRemaining: bombsQuantity[this.state.selectedLevel],
        cellsToDiscover:
          this.state.rows * this.state.columns - this.state.bombs,
        cheat: {
          ...this.state.cheat,
          cleanBorders: false
        },
        status: gameStatus.ready,
        time: 0
      })
      this.startGrid().then(() => resolve())
    })
  }

  changeLevel = selectedLevel => {
    this.setState({ selectedLevel }, this.restartGame)

    const bombs = bombsQuantity[selectedLevel]
    const { rows, columns } = gridSize[selectedLevel]

    this.setState({ bombs, columns, rows }, this.startGrid)
  }

  cellClicked = clickedCells => {
    const { status } = this.state
    if (status !== gameStatus.ready && status !== gameStatus.playing) return

    let newGrid = this.state.grid
    for (const cell of clickedCells) {
      if (cell.isVisible) return
      if (cell.hasFlag) return
      newGrid = this.changeCellToVisible(this.state.grid, cell)

      if (cell.hasBomb) {
        this.setState({ status: gameStatus.gameover })
        newGrid = this.clickedOnBomb(newGrid, cell)
      } else {
        const remainingCellsToDiscover = this.updateCellsToDiscover(newGrid)
        this.verifyVictory(remainingCellsToDiscover)
      }
    }
    if (status === gameStatus.ready) {
      this.setState({ status: gameStatus.playing }, () => {
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
      this.setState({ status: gameStatus.victory })
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
    event.preventDefault()

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

  cleanBorders = () => {
    this.setState(
      {
        cheat: {
          ...this.state.cheat,
          cleanBorders: true
        }
      },
      () =>
        this.restartGame().then(() => {
          const { columns, grid, rows } = this.state
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
        })
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
          cellClicked: this.cellClicked,
          cheat: this.state.cheat,
          cleanBorders: this.cleanBorders,
          grid: this.state.grid,
          isGameOver: this.state.status === gameStatus.gameover,
          isVictory: this.state.status === gameStatus.victory,
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

GameProvider.propTypes = {
  children: PropTypes.object.isRequired
}

export default GameProvider
export const GameConsumer = GameContext.Consumer
