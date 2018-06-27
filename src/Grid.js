import React from 'react'

import { GameConsumer } from './context/Game'

import style from './Grid.style'

const Grid = () => (
  <GameConsumer>
    { ({ grid }) => (
      grid.map((row, indexRow) => (
        <div key={ `row-${ indexRow }` } style={ style.row }>
          { row.map((cell, indexCell) => (
            <div key={ `row-${ indexCell }` } style={ getCellStyle(cell) }></div>
          ))}
        </div>
      ))
    )}
  </GameConsumer>
)

const getCellStyle = (cell) => {
  return cell.bomb ? style.cellBomb : style.cell
}

export default Grid