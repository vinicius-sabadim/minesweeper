import React from 'react'
import PropTypes from 'prop-types'

import style from './Menu.style'

const Menu = (props) => (
  <ul style={ style.menu }>
    { ['Beginner', 'Intermediate', 'Expert'].map((level) => (
      <ListItem key={ level } level={ level } { ...props } />
    ))
    }
  </ul>
)

const ListItem = ({ action, level, selectedLevel }) => (
  <li
    style={ level === selectedLevel ? style.listItemActive : style.listItem }
    onClick={ action.bind(this, level) }>{ level }</li>
)

ListItem.propTypes = {
  action: PropTypes.func.isRequired,
  level: PropTypes.string.isRequired,
  selectedLevel: PropTypes.string.isRequired
}

export default Menu