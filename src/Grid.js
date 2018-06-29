import React from 'react'

import { GameConsumer } from './context/Game'

import style from './Grid.style'

const Grid = () => (
  <GameConsumer>
    { ({ grid }) => (
      grid.map((row, indexRow) => (
        <div key={ `row-${ indexRow }` } style={ style.row }>
          { row.map((cell, indexCell) => (
            <div key={ `row-${ indexCell }` } style={ getCellStyle(cell) }>
              { renderValue(cell) }
            </div>
          ))}
        </div>
      ))
    )}
  </GameConsumer>
)

const getCellStyle = (cell) => {
  let styles = { ...style.cell }
  styles = { ...styles, ...style[`cell${ cell.dangerLevel }`] }
  return styles
}

const renderValue = (cell) => {
  if (cell.bomb) return '💣'
  if (cell.dangerLevel > 0) return cell.dangerLevel
  return ''
}

export default Grid