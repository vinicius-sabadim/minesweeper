import React from 'react'

import { GameConsumer } from './context/Game'

import * as styles from './Grid.style'

const Grid = () => (
  <div className={ styles.grid }>
    <GameConsumer>
      { ({ cellClicked, grid }) => (
        grid.map((row, indexRow) => (
          <div key={ `row-${ indexRow }` } className={ styles.row }>
            { row.map((cell, indexCell) => (
              <div
                key={ `row-${ indexCell }` }
                className={ `${ styleIsVisible(cell.isVisible) } ${ styleDanger(cell.dangerLevel) }` }
                onClick={ cellClicked.bind(this, cell) }>
                <span className={ cell.hasBomb ? styles.bomb : styles.value }>
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

const styleIsVisible = (isVisible) => isVisible ? styles.cellVisible : styles.cell
const styleDanger = (dangerLevel) => styles[`cell${ dangerLevel }`]

const renderValue = (cell) => {
  if (!cell.isVisible) return ''
  if (cell.hasBomb) return '💣'
  if (cell.dangerLevel > 0) return cell.dangerLevel
  return ''
}

export default Grid