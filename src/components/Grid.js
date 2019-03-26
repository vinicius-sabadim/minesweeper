import React, { useContext } from 'react'

import Row from './Row'
import GameContext from '../contexts/Game'

import { groupBy } from '../utils'

import styles from './Grid.style'

const Grid = () => {
  const { grid } = useContext(GameContext)

  return (
    <table className={styles.grid}>
      <tbody>{renderGrid(grid)}</tbody>
    </table>
  )
}

const renderGrid = grid => {
  const grouped = groupBy(grid, item => item.row)
  let html = []
  for (const [key, row] of Object.entries(grouped)) {
    html.push(<Row key={`row-${key}`} row={row} />)
  }
  return html
}

export default Grid
