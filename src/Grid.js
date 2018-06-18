import React from 'react'
import style from './Grid.style'

class Grid extends React.Component {
  render() {
    const { rows, columns } = getGridSize(this.props.selectedLevel)

    return (
      <div>
        {
          [...Array(rows).keys()].map((row, indexRow) => (
            <div key={ `row-${ indexRow }` } style={ style.row }>
            {
              [...Array(columns).keys()].map((cell, indexCell) => (
                <div key={ `row-${ indexCell }` } style={ style.cell }></div>
              ))
            }
            </div>
          ))
        }
      </div>
    )
  }
}

const getGridSize = (level) => {
  if (level === 'Beginner') return { rows: 9, columns: 9 }
  if (level === 'Intermediate') return { rows: 16, columns: 16 }
  if (level === 'Expert') return { rows: 16, columns: 30 }
}

export default Grid