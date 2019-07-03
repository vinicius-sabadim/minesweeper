export const groupBy = (list, keyGetter) => {
  const obj = list.reduce((acc, item) => {
    const key = keyGetter(item)
    if (acc[key]) {
      acc[key].push(item)
    } else {
      acc[key] = [item]
    }
    return acc
  }, {})
  return obj
}

export const includeNeighborInformation = (grid, rows, columns) => {
  const newGrid = grid.map(cell => {
    const neighbors = cell.neighbors
    if (hasUpperRow(cell) && hasLeftColumn(cell))
      neighbors.push(cell.id - columns - 1)

    if (hasUpperRow(cell)) {
      neighbors.push(cell.id - columns)
    }

    if (hasUpperRow(cell) && hasRightColumn(cell, columns)) {
      neighbors.push(cell.id - columns + 1)
    }

    if (hasLeftColumn(cell)) {
      neighbors.push(cell.id - 1)
    }

    if (hasRightColumn(cell, columns)) {
      neighbors.push(cell.id + 1)
    }

    if (hasLowerRow(cell, rows) && hasLeftColumn(cell)) {
      neighbors.push(cell.id + columns - 1)
    }

    if (hasLowerRow(cell, rows)) {
      neighbors.push(cell.id + columns)
    }

    if (hasLowerRow(cell, rows) && hasRightColumn(cell, columns)) {
      neighbors.push(cell.id + columns + 1)
    }

    return {
      ...cell,
      neighbors
    }
  })
  return newGrid
}

export const generateDanger = grid => {
  grid.forEach(cell => {
    cell.dangerLevel = calculateDangerLevel(grid, cell)
  })

  return grid
}

export const calculateDangerLevel = (grid, cell) => {
  let dangerLevel = 0

  cell.neighbors.forEach(neighbor => {
    dangerLevel = grid[neighbor].hasBomb ? dangerLevel + 1 : dangerLevel
  })

  return dangerLevel
}

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
