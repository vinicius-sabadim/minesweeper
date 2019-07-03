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
