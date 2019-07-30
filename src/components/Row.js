import React from 'react'
import PropTypes from 'prop-types'

import Cell from './Cell'

import './Row.css'

const Row = ({ row }) => (
  <tr className="row">
    {row.map((cell, index) => (
      <Cell key={`cell-${index}`} cell={cell} />
    ))}
  </tr>
)

Row.propTypes = {
  row: PropTypes.array.isRequired
}

export default Row
