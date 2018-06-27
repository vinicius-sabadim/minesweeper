import React from 'react'

import { GameConsumer } from './context/Game'

import style from './Grid.style'

const Grid = () => (
  <GameConsumer>
    { ({ grid }) => (
      grid.map((row, indexRow) => (
        <div key={ `row-${ indexRow }` } style={ style.row }>
          { row.map((_, indexCell) => (
            <div key={ `row-${ indexCell }` } style={ style.cell }></div>
          ))}
        </div>
      ))
    )}
  </GameConsumer>
)

export default Grid