import React, { useContext, useEffect } from 'react'

import Row from './Row'
import GameContext from '../contexts/Game'

import styles from './Grid.style'

const keys = {
  ArrowDown: 'down',
  ArrowUp: 'up',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  Enter: 'trigger',
  a: 'trigger',
  f: 'flag',
  r: 'restart',
  c: 'clean'
}

const groupBy = (list, keyGetter) => {
  const obj = list.reduce((acc, item) => {
    const key = keyGetter(item)
    if (acc[key]) {
      acc[key].push(item)
    } else {
      acc[key] = [item]
    }
    return acc
  }, {})
  return obj
}

const Grid = () => {
  const { changeNavigation, grid } = useContext(GameContext)

  const down = ({ key }) => {
    const allowedKey = keys[key]
    if (allowedKey) {
      changeNavigation(allowedKey)
    }
  }

  useEffect(() => {
    window.addEventListener('keydown', down)
    return () => {
      window.removeEventListener('keydown', down)
    }
  }, [])

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
