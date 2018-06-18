import React from 'react'
import PropTypes from 'prop-types'

import style from './Grid.style'

class Grid extends React.Component {
  render() {
    const { rows, columns } = getGridSize(this.props.selectedLevel)
    const grid = [...Array(rows)]
      .map((_) => [...Array(columns)].map(initCell))

    return (
      <div>
        { grid.map((row, indexRow) => (
          <div key={ `row-${ indexRow }` } style={ style.row }>
            { row.map((_, indexCell) => (
              <div key={ `row-${ indexCell }` } style={ style.cell }></div>
            ))}
          </div>
        ))}
      </div>
    )
  }
}

Grid.propTypes = {
  selectedLevel: PropTypes.string.isRequired
}

const initCell = () => ({
  bomb: false,
  flag: false
})

export const getGridSize = (level) => {
  if (level === 'Beginner') return { rows: 9, columns: 9 }
  if (level === 'Intermediate') return { rows: 16, columns: 16 }
  if (level === 'Expert') return { rows: 16, columns: 30 }
}

export default Grid