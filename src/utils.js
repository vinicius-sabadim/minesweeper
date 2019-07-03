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

export const generateBombs = (grid, rows, columns, bombs, cleanBorders) => {
  let bombsInserted = 0

  while (bombsInserted < bombs) {
    const id = getId(grid, rows, columns, cleanBorders)
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

const getId = (grid, rows, columns, cleanBorders) => {
  const total = rows * columns
  if (cleanBorders) {
    const blockedIds = [
      grid[0].id,
      grid[columns - 1].id,
      grid[(rows - 1) * columns].id,
      grid[grid.length - 1].id
    ]
    let allGood = false
    let id = null
    while (!allGood) {
      id = random(total)
      if (!blockedIds.includes(id)) {
        allGood = true
      }
    }
    return id
  } else {
    return random(total)
  }
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
