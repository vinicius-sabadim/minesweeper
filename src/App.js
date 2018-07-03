import React from 'react'
import Grid from './Grid'
import Information from './Information'
import Menu from './Menu'

import style from './App.style.js'

const App = () => (
  <div style={ style.app }>
    <Information />
    <Grid />
    <Menu />
  </div>
)

export default App
