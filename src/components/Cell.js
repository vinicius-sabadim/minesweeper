import React from 'react'
import PropTypes from 'prop-types'

import * as styles from './Cell.style'
import { GameConsumer } from '../contexts/Game'

const Cell = ({ cell }) => (
  <GameConsumer>
    {({ isGameOver, cellClicked, toggleFlag, setHover }) => (
      <td
        className={`${styleIsFilled(cell, isGameOver)}
        ${styleIsHovered(cell)}
        ${styleDanger(cell.dangerLevel)}`}
        onClick={cellClicked.bind(this, [cell])}
        onContextMenu={toggleFlag.bind(this, cell)}
        onMouseEnter={setHover.bind(this, cell, true)}
        onMouseLeave={setHover.bind(this, cell, false)}
      >
        <span
          className={cell.hasBomb || cell.hasFlag ? styles.emoji : styles.value}
        >
          {renderValue(cell)}
        </span>
      </td>
    )}
  </GameConsumer>
)

const styleIsFilled = (cell, isGameOver) => {
  if (cell.hasFlag) return styles.cellFlag
  if (cell.isVisible && cell.explode) return styles.cellExploded
  if (cell.isVisible) return styles.cellVisible
  return isGameOver ? styles.cellOver : styles.cell
}
const styleIsHovered = cell => {
  if (cell.isHovered) return styles.cellHovered
}
const styleDanger = dangerLevel => styles[`cell${dangerLevel}`]

const renderValue = cell => {
  if (cell.hasFlag) return '🚩'
  if (!cell.isVisible) return ''
  if (cell.hasBomb) return '💣'
  if (cell.dangerLevel > 0) return cell.dangerLevel
  return ''
}

Cell.propTypes = {
  cell: PropTypes.object.isRequired
}

export default Cell
