export const random = (value) => Math.floor(Math.random() * value)

export const getGridSize = (level) => {
  if (level === 'Intermediate') return { rows: 16, columns: 16 }
  if (level === 'Expert') return { rows: 16, columns: 30 }
  return { rows: 9, columns: 9 }
}

export const getBombsQuantity = (level) => {
  if (level === 'Intermediate') return 40
  if (level === 'Expert') return 99
  return 10
}

export const generateGrid = (rows, columns) => {
  let id = 0
  return [...Array(rows)]
    .map((_, row) => [...Array(columns)]
      .map((_, column) => initCell(id++, row, column)))
}

export const initCell = (id, row, column) => ({
  id, row, column,
  hasBomb: false,
  hasFlag: false,
  dangerLevel: 0,
  isHovered: false,
  isVisible: false
})

export const generateBombs = (grid, rows, columns, bombs) => {
  let bombsInserted = 0

  while (bombsInserted < bombs) {
    const row = random(rows)
    const column = random(columns)

    if (!grid[row][column].hasBomb) {
      grid[row][column] = {
        ...grid[row][column],
        hasBomb: true,
        explode: false
      }
      bombsInserted = bombsInserted + 1
    }
  }

  return grid
}

export const generateDanger = (grid) => {
  grid.forEach((row) => {
    row.forEach((cell) => {
      cell.dangerLevel = calculateDangerLevel(grid, cell)
    })
  })

  return grid
}

export const calculateDangerLevel = (grid, cell) => {
  const column = cell.column
  const row = cell.row
  let dangerLevel = 0

  if (hasUpperRow(cell) && hasLeftColumn(cell)) {
    if (grid[row - 1][column - 1].hasBomb) dangerLevel = dangerLevel + 1
  }

  if (hasUpperRow(cell)) {
    if (grid[row - 1][column].hasBomb) dangerLevel = dangerLevel + 1
  }

  if (hasUpperRow(cell) && hasRightColumn(grid, cell)) {
    if (grid[row - 1][column + 1].hasBomb) dangerLevel = dangerLevel + 1
  }

  if (hasLeftColumn(cell)) {
    if (grid[row][column - 1].hasBomb) dangerLevel = dangerLevel + 1
  }

  if (hasRightColumn(grid, cell)) {
    if (grid[row][column + 1].hasBomb) dangerLevel = dangerLevel + 1
  }

  if (hasLowerRow(grid, cell) && hasLeftColumn(cell)) {
    if (grid[row + 1][column - 1].hasBomb) dangerLevel = dangerLevel + 1
  }

  if (hasLowerRow(grid, cell)) {
    if (grid[row + 1][column].hasBomb) dangerLevel = dangerLevel + 1
  }

  if (hasLowerRow(grid, cell) && hasRightColumn(grid, cell)) {
    if (grid[row + 1][column + 1].hasBomb) dangerLevel = dangerLevel + 1
  }

  return dangerLevel
}

export const hasUpperRow = (cell) => {
  return (cell.row - 1) >= 0
}

export const hasLowerRow = (grid, cell) => {
  return (cell.row + 1) < grid.length
}

export const hasLeftColumn = (cell) => {
  return (cell.column - 1) >= 0
}

export const hasRightColumn = (grid, cell) => {
  return (cell.column + 1) < grid[0].length
}