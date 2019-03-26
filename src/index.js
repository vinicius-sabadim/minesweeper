import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import { GameProvider } from './contexts/Game'

import './index.css'

ReactDOM.render(
  <GameProvider>
    <App />
  </GameProvider>,
  document.getElementById('root')
)
