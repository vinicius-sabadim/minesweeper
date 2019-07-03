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
  let bombsInserted = 0

  while (bombsInserted < bombs) {
    const id = getRandomId(grid, rows, columns, cleanCorners)
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
