import * as fn from './grid'

describe('generateGrid', () => {
  test('should generate grid with the correct number of elements', () => {
    const grid = fn.generateGrid(2, 2)

    expect(grid.length).toBe(4)
  })

  test('should include default information for an element', () => {
    const grid = fn.generateGrid(1, 1)
    const element = {
      id: 0,
      row: 0,
      column: 0,
      hasBomb: false,
      hasFlag: false,
      dangerLevel: 0,
      isHovered: false,
      isVisible: false,
      neighbors: []
    }

    expect(grid[0]).toEqual(element)
  })
})

describe('generateBombs', () => {
  test('should put bombs considering every place', () => {
    const grid = fn.generateGrid(3, 3)
    const gridWithBombs = fn.generateBombs(grid, 3, 3, 2, false)
    const cellsWithBombs = gridWithBombs.filter(cell => cell.hasBomb)

    expect(cellsWithBombs.length).toBe(2)
  })

  test('should put bombs not considering the corners', () => {
    const grid = fn.generateGrid(3, 3)
    const gridWithBombs = fn.generateBombs(grid, 3, 3, 2, true)
    const cellsWithBombs = gridWithBombs.filter(cell => cell.hasBomb)

    expect(cellsWithBombs.length).toBe(2)
    expect(gridWithBombs[0].hasBomb).toBe(false)
    expect(gridWithBombs[2].hasBomb).toBe(false)
    expect(gridWithBombs[6].hasBomb).toBe(false)
    expect(gridWithBombs[6].hasBomb).toBe(false)
  })
})

describe('includeNeighborInformation', () => {
  describe('should include all the neighbors of a cell', () => {
    test('cell on top left corner', () => {
      const grid = fn.generateGrid(3, 3)
      const gridWithNeighborInformation = fn.includeNeighborInformation(
        grid,
        3,
        3
      )
      const cell = gridWithNeighborInformation[0]
      expect(cell.neighbors).toEqual([1, 3, 4])
    })
    test('cell on top right corner', () => {
      const grid = fn.generateGrid(3, 3)
      const gridWithNeighborInformation = fn.includeNeighborInformation(
        grid,
        3,
        3
      )
      const cell = gridWithNeighborInformation[2]
      expect(cell.neighbors).toEqual([1, 4, 5])
    })
    test('cell on bottom left corner', () => {
      const grid = fn.generateGrid(3, 3)
      const gridWithNeighborInformation = fn.includeNeighborInformation(
        grid,
        3,
        3
      )
      const cell = gridWithNeighborInformation[6]
      expect(cell.neighbors).toEqual([3, 4, 7])
    })
    test('cell on bottom right corner', () => {
      const grid = fn.generateGrid(3, 3)
      const gridWithNeighborInformation = fn.includeNeighborInformation(
        grid,
        3,
        3
      )
      const cell = gridWithNeighborInformation[8]
      expect(cell.neighbors).toEqual([4, 5, 7])
    })
    test('cell on center', () => {
      const grid = fn.generateGrid(3, 3)
      const gridWithNeighborInformation = fn.includeNeighborInformation(
        grid,
        3,
        3
      )
      const cell = gridWithNeighborInformation[4]
      expect(cell.neighbors).toEqual([0, 1, 2, 3, 5, 6, 7, 8])
    })
  })
})

describe('generateDanger', () => {
  test('should put all the danger levels on the grid', () => {
    const grid = fn.generateGrid(3, 3)
    const gridWithBombs = fn.generateBombs(grid, 3, 3, 5, true)
    const gridWithNeighborInformation = fn.includeNeighborInformation(
      gridWithBombs,
      3,
      3
    )
    const gridWithDangerLevel = fn.generateDanger(gridWithNeighborInformation)
    const cell = gridWithDangerLevel[0]
    expect(cell.dangerLevel).toBe(3)
  })
})
