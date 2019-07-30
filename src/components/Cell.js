import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import GameContext from '../contexts/Game'

import './Cell.css'

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
  const {
    isGameOver,
    cellClicked,
    navigateUsingArrow,
    toggleFlag,
    setHover
  } = useContext(GameContext)
  return (
    <td
      className={`cell ${styleIsFilled(cell, isGameOver)} ${styleIsHovered(
        cell
      )} ${styleIsActiveNavigation(cell, navigateUsingArrow)}`}
      style={{ color: colors[cell.dangerLevel] }}
      onClick={cellClicked.bind(this, [cell])}
      onContextMenu={toggleFlag.bind(this, cell)}
      onMouseEnter={setHover.bind(this, cell, true)}
      onMouseLeave={setHover.bind(this, cell, false)}
    >
      <span
        className={cell.hasBomb || cell.hasFlag ? 'cell__emoji' : 'cell__value'}
      >
        {renderValue(cell)}
      </span>
    </td>
  )
}

const styleIsFilled = (cell, isGameOver) => {
  if (cell.hasFlag) return 'cell--flag'
  if (cell.isVisible && cell.explode) return 'cell--exploded'
  if (cell.isVisible) return 'cell--visible'
  if (isGameOver) return 'cell--over'
  return 'cell--common'
}

const styleIsHovered = cell => {
  if (cell.isHovered) return 'cell--hovered'
}

const styleIsActiveNavigation = (cell, id) => {
  if (cell.id === id) return 'cell--navigation'
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
