import React from 'react'
import Grid from './Grid'
import Information from './Information'

import * as styles from './App.style.js'

const App = () => (
  <div className={styles.app}>
    <Information />
    <Grid />
  </div>
)

export default App
