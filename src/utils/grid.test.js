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
