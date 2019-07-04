import * as fn from './cell'

describe('calculateBombsRemaining', () => {
  test('should return 1 less when a flag is put', () => {
    const includeFlag = true
    const oldBombs = 9
    expect(fn.calculateBombsRemaining(oldBombs, includeFlag)).toBe(8)
  })

  test('should return 1 more when a flag is removed', () => {
    const includeFlag = false
    const oldBombs = 9
    expect(fn.calculateBombsRemaining(oldBombs, includeFlag)).toBe(10)
  })
})
