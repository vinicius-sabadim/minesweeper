import React from 'react'
import PropTypes from 'prop-types'

import Cell from './Cell'

import * as styles from './Row.style'

const Row = ({ row }) => (
  <div className={ styles.row }>
    { row.map((cell, index) => (
      <Cell key={ `cell-${ index }` } cell={ cell } />
    ))}
  </div>
)

Row.propTypes = {
  row: PropTypes.array.isRequired
}

export default Row