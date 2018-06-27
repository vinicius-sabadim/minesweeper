import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import GameContext from './context/Game'

import './index.css'

ReactDOM.render(
  <GameContext>
    <App />
  </GameContext>, document.getElementById('root'))
registerServiceWorker()
