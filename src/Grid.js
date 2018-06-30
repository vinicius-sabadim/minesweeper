import React from 'react'

import { GameConsumer } from './context/Game'

import * as styles from './Grid.style'

const Grid = () => (
  <div className={ styles.grid }>
    <GameConsumer>
      { ({ cellClicked, grid, toggleFlag }) => (
        grid.map((row, indexRow) => (
          <div key={ `row-${ indexRow }` } className={ styles.row }>
            { row.map((cell, indexCell) => (
              <div
                key={ `row-${ indexCell }` }
                className={ `${ styleIsFilled(cell.hasFlag, cell.isVisible) } ${ styleDanger(cell.dangerLevel) }` }
                onClick={ cellClicked.bind(this, cell) }
                onContextMenu={ toggleFlag.bind(this, cell) }>
                <span className={ (cell.hasBomb || cell.hasFlag) ? styles.emoji : styles.value }>
                  { renderValue(cell) }
                </span>
              </div>
            ))}
          </div>
        ))
      )}
    </GameConsumer>
  </div>
)

const styleIsFilled = (hasFlag, isVisible) => {
  if (hasFlag) return styles.cellFlag
  return isVisible ? styles.cellVisible : styles.cell
}
const styleDanger = (dangerLevel) => styles[`cell${ dangerLevel }`]

const renderValue = (cell) => {
  if (cell.hasFlag) return '🚩'
  if (!cell.isVisible) return ''
  if (cell.hasBomb) return '💣'
  if (cell.dangerLevel > 0) return cell.dangerLevel
  return ''
}

export default Grid