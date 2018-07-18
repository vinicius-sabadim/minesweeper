import React from 'react'

import Row from './Row'
import { GameConsumer } from '../contexts/Game'

import * as styles from './Grid.style'

const Grid = () => (
  <div className={ styles.grid }>
    <GameConsumer>
      { ({ grid }) => (
        grid.map((row, index) => (
          <Row key={ `row-${ index }` } row={ row } />
        ))
      )}
    </GameConsumer>
  </div>
)

export default Grid