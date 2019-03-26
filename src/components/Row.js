import React from 'react'
import PropTypes from 'prop-types'

import Cell from './Cell'

import styles from './Row.style'

const Row = ({ row }) => (
  <tr className={styles.row}>
    {row.map((cell, index) => (
      <Cell key={`cell-${index}`} cell={cell} />
    ))}
  </tr>
)

Row.propTypes = {
  row: PropTypes.array.isRequired
}

export default Row
