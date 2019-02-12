import React from 'react'

import Row from './Row'
import { GameConsumer } from '../contexts/Game'

import { groupBy } from '../utils'

import * as styles from './Grid.style'

const Grid = () => (
  <table className={styles.grid}>
    <tbody>
      <GameConsumer>{({ grid }) => renderGrid(grid)}</GameConsumer>
    </tbody>
  </table>
)

const renderGrid = grid => {
  const grouped = groupBy(grid, item => item.row)
  let html = []
  for (const [key, row] of Object.entries(grouped)) {
    html.push(<Row key={`row-${key}`} row={row} />)
  }
  return html
}

export default Grid
