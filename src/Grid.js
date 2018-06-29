import React from 'react'

import { GameConsumer } from './context/Game'

import style from './Grid.style'

const Grid = () => (
  <div style={ style.grid }>
    <GameConsumer>
      { ({ cellClicked, grid }) => (
        grid.map((row, indexRow) => (
          <div key={ `row-${ indexRow }` } style={ style.row }>
            { row.map((cell, indexCell) => (
              <div
                key={ `row-${ indexCell }` }
                style={ getCellStyle(cell) }
                onClick={ cellClicked.bind(this, cell) } >
                { renderValue(cell) }
              </div>
            ))}
          </div>
        ))
      )}
    </GameConsumer>
  </div>
)

const getCellStyle = (cell) => {
  let styles = {}
  styles = cell.isVisible ? { ...style.cellClicked } : { ...style.cell }
  styles = { ...styles, ...style[`cell${ cell.dangerLevel }`] }
  return styles
}

const renderValue = (cell) => {
  if (!cell.isVisible) return ''
  if (cell.bomb) return '💣'
  if (cell.dangerLevel > 0) return cell.dangerLevel
  return ''
}

export default Grid