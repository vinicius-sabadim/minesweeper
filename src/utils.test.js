import * as utils from './utils'

const grid = [
  {
    column: 0,
    dangerLevel: 0,
    hasBomb: false,
    hasFlag: false,
    id: 0,
    isHovered: false,
    isVisible: false,
    row: 0,
    neighbors: []
  },
  {
    column: 1,
    dangerLevel: 0,
    hasBomb: false,
    hasFlag: false,
    id: 1,
    isHovered: false,
    isVisible: false,
    row: 0,
    neighbors: []
  },
  {
    column: 0,
    dangerLevel: 0,
    hasBomb: false,
    hasFlag: false,
    id: 2,
    isHovered: false,
    isVisible: false,
    row: 1,
    neighbors: []
  },
  {
    column: 1,
    dangerLevel: 0,
    hasBomb: false,
    hasFlag: false,
    id: 3,
    isHovered: false,
    isVisible: false,
    row: 1,
    neighbors: []
  }
]

describe('utils', () => {
  describe('generateGrid method', () => {
    test('it should start a grid', () => {
      expect(utils.generateGrid(2, 2)).toEqual(grid)
    })
  })
})
