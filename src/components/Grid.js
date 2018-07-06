import React from 'react'

import { GameConsumer } from '../contexts/Game'

import * as styles from './Grid.style'

const Grid = () => (
  <div className={ styles.grid }>
    <GameConsumer>
      { ({ cellClicked, grid, isGameOver, toggleFlag, toggleHover }) => (
        grid.map((row, indexRow) => (
          <div key={ `row-${ indexRow }` } className={ styles.row }>
            { row.map((cell, indexCell) => (
              <div
                key={ `row-${ indexCell }` }
                className={
                  `${ styleIsFilled(cell, isGameOver) }
                  ${ styleIsHovered(cell) }
                  ${ styleDanger(cell.dangerLevel) }`
                }
                onClick={ cellClicked.bind(this, cell) }
                onContextMenu={ toggleFlag.bind(this, cell) }
                onMouseEnter={ toggleHover.bind(this, cell) }
                onMouseLeave={ toggleHover.bind(this, cell) }>
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

const styleIsFilled = (cell, isGameOver) => {
  if (cell.hasFlag) return styles.cellFlag
  if (cell.isVisible && cell.explode) return styles.cellExploded
  if (cell.isVisible) return styles.cellVisible
  return isGameOver ? styles.cellOver : styles.cell
}
const styleIsHovered = (cell) => {
  if (cell.isHovered) return styles.cellHovered
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