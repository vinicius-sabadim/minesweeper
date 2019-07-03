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
