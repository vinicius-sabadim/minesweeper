import React from 'react'
import Grid from './Grid'
import Menu from './Menu'

import style from './App.style.js'

const App = () => (
  <div style={ style.app }>
    <Menu />
    <Grid />
  </div>
)

export default App
