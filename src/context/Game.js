import React from 'react'
import PropTypes from 'prop-types'

const GameContext = React.createContext()

class GameProvider extends React.Component {
  state = {
    selectedLevel: 'Beginner'
  }

  changeLevel = (selectedLevel) => this.setState({ selectedLevel })

  render = () => {
    return (
      <GameContext.Provider value={{
        changeLevel: this.changeLevel,
        selectedLevel: this.state.selectedLevel
      }}>
        { this.props.children }
      </GameContext.Provider>
    )
  }
}

GameProvider.propTypes = {
  children: PropTypes.object.isRequired
}

export default GameProvider
export const GameConsumer = GameContext.Consumer