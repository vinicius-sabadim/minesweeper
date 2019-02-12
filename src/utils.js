export const random = value => Math.floor(Math.random() * value)

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

export const generateGrid = (rows, columns) => {
  const grid = []
  const cells = rows * columns

  for (const index in [...Array(cells)]) {
    const id = parseInt(index, 10)
    grid.push({
      id,
      row: Math.floor(id / columns),
      column: id % columns,
      hasBomb: false,
      hasFlag: false,
      dangerLevel: 0,
      isHovered: false,
      isVisible: false,
      neighbors: []
    })
  }

  return grid
}

export const generateBombs = (grid, rows, columns, bombs) => {
  let bombsInserted = 0

  while (bombsInserted < bombs) {
    const id = random(rows * columns)
    if (!grid[id].hasBomb) {
      grid[id] = {
        ...grid[id],
        hasBomb: true,
        explode: false
      }
      bombsInserted = bombsInserted + 1
    }
  }
  return grid
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
