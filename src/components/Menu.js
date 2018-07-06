import React from 'react'
import PropTypes from 'prop-types'

import { GameConsumer } from '../contexts/Game'

import * as styles from './Menu.style'

const Menu = () => (
  <GameConsumer>
    { ({ changeLevel, selectedLevel }) => (
      <ul className={ styles.menu }>
        { ['Beginner', 'Intermediate', 'Expert'].map((level) => (
          <ListItem
            action={ changeLevel }
            key={ level }
            level={ level }
            selectedLevel={ selectedLevel } />
        ))
        }
      </ul>
    ) }
  </GameConsumer>
)

const ListItem = ({ action, level, selectedLevel }) => (
  <li
    className={ level === selectedLevel ? styles.listItemActive : styles.listItem }
    onClick={ action.bind(this, level) }>{ level }</li>
)

ListItem.propTypes = {
  action: PropTypes.func.isRequired,
  level: PropTypes.string.isRequired,
  selectedLevel: PropTypes.string.isRequired
}

export default Menu