import React, { useContext } from 'react'
import PropTypes from 'prop-types'

import GameContext from '../contexts/Game'

import './Menu.css'

const Menu = () => {
  const { changeLevel, selectedLevel } = useContext(GameContext)

  return (
    <ul className="menu__container">
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
    className={`
      menu__listItem
      ${level === selectedLevel ? 'menu__listItem--active' : ''}`}
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
