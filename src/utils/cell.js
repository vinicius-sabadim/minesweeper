import { gameStatus } from '../constants'

export const hasUpperRow = cell => {
  return cell.row - 1 >= 0
}

export const hasLowerRow = (cell, rows) => {
  return cell.row + 1 < rows
}

export const hasLeftColumn = cell => {
  return cell.column - 1 >= 0
}

export const hasRightColumn = (cell, columns) => {
  return cell.column + 1 < columns
}

export const shouldStartTimer = (status, cells) => {
  if (status !== gameStatus.READY) return false
  if (cells.length > 1) return true
  if (!cells[0].hasBomb) return true

  return false
}

export const calculateBombsRemaining = (bombs, flag) => {
  return flag ? bombs - 1 : bombs + 1
}
