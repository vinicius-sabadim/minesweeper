import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import registerServiceWorker from './registerServiceWorker'
import GameContext from './contexts/Game'

import './index.css'

ReactDOM.render(
  <GameContext>
    <App />
  </GameContext>, document.getElementById('root'))
registerServiceWorker()
