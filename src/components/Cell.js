import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import GameContext from '../contexts/Game'

import styles from './Cell.style'

const colors = [
  '',
  '#4286F4',
  '#0BA51B',
  '#6E25DB',
  '#DB7325',
  '#E22FB6',
  '#D11F1F',
  '#398452',
  '#683B39'
]

const Cell = ({ cell }) => {
  const { isGameOver, cellClicked, toggleFlag, setHover } = useContext(
    GameContext
  )
  return (
    <td
      className={`${styleIsFilled(cell, isGameOver)} ${styleIsHovered(cell)}`}
      style={{ color: colors[cell.dangerLevel] }}
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
  )
}

const styleIsFilled = (cell, isGameOver) => {
  if (cell.hasFlag) return styles.cellFlag
  if (cell.isVisible && cell.explode) return styles.cellExploded
  if (cell.isVisible) return styles.cellVisible
  return isGameOver ? styles.cellOver : styles.cell
}

const styleIsHovered = cell => {
  if (cell.isHovered) return styles.cellHovered
}

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
