import * as utils from './utils'

describe('utils', () => {
  describe('getGridSize method', () => {
    test('when the level is Beginner', () => {
      const result = { columns: 9, rows: 9 }
      expect(utils.getGridSize()).toEqual(result)
    })
    
    test('when the level is Intermediate', () => {
      const result = { columns: 16, rows: 16 }
      expect(utils.getGridSize('Intermediate')).toEqual(result)
    })
    
    test('when the level is Expert', () => {
      const result = { columns: 30, rows: 16 }
      expect(utils.getGridSize('Expert')).toEqual(result)
    })
  })

  describe('getBombsQuantity method', () => {
    test('when the level is Beginner', () => {
      expect(utils.getBombsQuantity()).toEqual(10)
    })
    
    test('when the level is Intermediate', () => {
      expect(utils.getBombsQuantity('Intermediate')).toEqual(40)
    })

    test('when the level is Expert', () => {
      expect(utils.getBombsQuantity('Expert')).toEqual(99)
    })
  })
  
  describe('generateGrid method', () => {
    test('it should start a grid', () => {
      const result = [[
        { column: 0,
          dangerLevel: 0,
          hasBomb: false,
          hasFlag: false,
          id: 0,
          isHovered: false,
          isVisible: false,
          row: 0
        }]]
      expect(utils.generateGrid(1, 1)).toEqual(result)
    })
  })
})