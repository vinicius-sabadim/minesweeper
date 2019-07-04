import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { css } from 'glamor'

import GameContext from '../contexts/Game'

import styles from './Menu.style'

const Menu = () => {
  const { changeLevel, selectedLevel } = useContext(GameContext)

  return (
    <ul className={styles.menu}>
      {['BEGINNER', 'INTERMEDIATE', 'EXPERT'].map(level => (
        <ListItem
          action={changeLevel}
          key={level}
          level={level}
          selectedLevel={selectedLevel}
        />
      ))}
    </ul>
  )
}

const levelText = {
  BEGINNER: 'Beginner',
  INTERMEDIATE: 'Intermediate',
  EXPERT: 'Expert'
}

const ListItem = ({ action, level, selectedLevel }) => (
  <li
    {...css(
      styles.listItem,
      level === selectedLevel ? styles.listItemActive : ''
    )}
    onClick={action.bind(this, level)}
  >
    {levelText[level]}
  </li>
)

ListItem.propTypes = {
  action: PropTypes.func.isRequired,
  level: PropTypes.string.isRequired,
  selectedLevel: PropTypes.string.isRequired
}

export default Menu
