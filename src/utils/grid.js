import { hasLeftColumn, hasRightColumn, hasUpperRow, hasLowerRow } from './cell'

export const generateGrid = (rows, columns) => {
  const cells = rows * columns

  return [...Array(cells)].reduce((acc, _, index) => {
    const id = parseInt(index, 10)

    return [
      ...acc,
      {
        id,
        row: Math.floor(id / columns),
        column: id % columns,
        hasBomb: false,
        hasFlag: false,
        dangerLevel: 0,
        isHovered: false,
        isVisible: false,
        neighbors: []
      }
    ]
  }, [])
}

export const generateBombs = (grid, rows, columns, bombs, cleanCorners) => {
  const ids = new Set()

  while (ids.size < bombs) {
    const id = getRandomId(grid, rows, columns, cleanCorners)
    ids.add(id)
  }

  return grid.map(cell => {
    if (ids.has(cell.id))
      return {
        ...cell,
        hasBomb: true,
        explode: false
      }

    return cell
  })
}

const random = value => Math.floor(Math.random() * value)

const getRandomId = (grid, rows, columns, cleanCorners) => {
  const total = rows * columns

  if (!cleanCorners) return random(total)

  const blockedIds = [
    grid[0].id,
    grid[columns - 1].id,
    grid[(rows - 1) * columns].id,
    grid[grid.length - 1].id
  ]

  let validId = null
  while (!validId) {
    const randomId = random(total)
    if (!blockedIds.includes(randomId)) {
      validId = randomId
    }
  }
  return validId
}

export const includeNeighborInformation = (grid, rows, columns) => {
  return grid.map(cell => {
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
}

export const generateDanger = grid => {
  return grid.map(cell => ({
    ...cell,
    dangerLevel: calculateDangerLevel(grid, cell)
  }))
}

export const calculateDangerLevel = (grid, cell) => {
  const neighbors = cell.neighbors

  return neighbors.reduce((dangerLevel, neighbor) => {
    return grid[neighbor].hasBomb ? dangerLevel + 1 : dangerLevel
  }, 0)
}

export const isVictory = (grid, bombsQuantity) => {
  const visibleCells = grid.filter(cell => cell.isVisible).length
  return visibleCells + bombsQuantity === grid.length
}
