import React from 'react'

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

export default Menu