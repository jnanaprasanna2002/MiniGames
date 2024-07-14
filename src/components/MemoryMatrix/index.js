import React, {Component} from 'react'

import {CgClose} from 'react-icons/cg'
import {BiArrowBack} from 'react-icons/bi'
import {Line} from 'rc-progress'

import Modal from 'react-modal'

import './index.css'

const apiStatusConstants = {
  gameView: 'GAMEVIEW',
  gameWin: 'GAMEWIN',
  gameLoss: 'GAMELOSS',
  gameRulesView: 'GAMERULES',
}

class MemoryMatrix extends Component {
  state = {
    highlightedCells: [],
    userGuesses: [],
    defaultCells: [],
    currentLevel: 1,
    gridSize: 3,
    apiStatus: apiStatusConstants.gameRulesView,
    isOpen: false,
  }

  initializeGrid = () => {
    const {gridSize, currentLevel} = this.state
    if (currentLevel === 16) {
      this.setState({apiStatus: apiStatusConstants.gameWin})
      return
    }
    const newHighlightedCells = []
    while (newHighlightedCells.length < gridSize) {
      const randomCellIndex = Math.floor(Math.random() * gridSize ** 2)
      if (!newHighlightedCells.includes(randomCellIndex)) {
        newHighlightedCells.push(randomCellIndex)
      }
    }
    this.setState({
      highlightedCells: newHighlightedCells,
      defaultCells: newHighlightedCells,
    })
    setTimeout(() => {
      this.clearHighlightedCells()
    }, 2000)
  }

  clearHighlightedCells = () => {
    this.setState({highlightedCells: []})
  }

  handleClick = index => {
    const {userGuesses, defaultCells, gridSize} = this.state
    if (defaultCells.includes(index)) {
      const updatedGuesses = [...userGuesses, index]
      const updatedefaultCell = defaultCells.filter(item => item !== index)
      console.log(updatedefaultCell)
      this.setState({
        userGuesses: updatedGuesses,
        defaultCells: updatedefaultCell,
      })
      if (gridSize === updatedGuesses.length) {
        this.setState(
          prevState => ({
            currentLevel: prevState.currentLevel + 1,
            gridSize: prevState.gridSize + 1,
            userGuesses: [],
          }),
          this.initializeGrid,
        )
      }
    } else {
      this.setState({apiStatus: apiStatusConstants.gameLoss})
    }
  }

  onClickStart = () => {
    this.setState({apiStatus: apiStatusConstants.gameView}, this.initializeGrid)
  }

  onClickBack = () => {
    const {history} = this.props
    history.replace('/')
  }

  renderGameRules = () => (
    <div className="memory-matrix-rules-container">
      <button className="arrow-container" onClick={this.onClickBack}>
        <BiArrowBack size={20} color="#ffffff" />
        <p className="memory-back">Back</p>
      </button>
      <div className="rps-image-container">
        <h1 className="rps-rules-heading">Memory Matrix</h1>

        <img
          src="https://res.cloudinary.com/dblfscfnp/image/upload/v1714462573/memory_bqwaol.png"
          alt="memory matrix"
          className="memory-image"
        />
      </div>
      <div>
        <h1 className="rps-rules-head">Rules</h1>
        <div className="rps-unorder-list-container">
          <ul className="rps-unorder-list">
            <li className="rps-list-item">
              In each level of the Game, Users should be able to see the Grid
              with (N X N) size starting from 3 and the grid will highlight N
              cells in Blue, the N highlighted cells will be picked randomly.
            </li>
            <li className="rps-list-item">
              The highlighted cells will remain N seconds for the user to
              memorize the cells. At this point, the user should not be able to
              perform any action.
            </li>
            <li className="rps-list-item">
              After N seconds, the grid will clear the N highlighted cells.
            </li>
            <li className="rps-list-item">
              At N seconds, the user can click on any cell. Clicking on a cell
              that was highlighted before it will turn blue. Clicking on the
              other cells that were not highlighted before then will turn to
              red.
            </li>
            <li className="rps-list-item">
              The user should be promoted to the next level if they guess all N
              cells correctly in one attempt.
            </li>
            <li className="rps-list-item">
              The user should be taken to the results page if the user clicks on
              the wrong cell.
            </li>
            <li className="rps-list-item">
              If the user completed all the levels, then the user should be
              taken to the results page.
            </li>
            <li>.</li>
            <li>.</li>
            <li>.</li>
            <li>.</li>
            <li>.</li>
            <li>.</li>
            <li>.</li>
            <li>.</li>
            <li>.</li>
          </ul>
        </div>
        <div className="rps-button-container">
          <button
            className="emoji-start-button mm-start-button"
            onClick={this.onClickStart}
          >
            Start Playing
          </button>
        </div>
      </div>
    </div>
  )

  onOpen = () => {
    this.setState({isOpen: true})
  }

  onClose = () => {
    this.setState({isOpen: false})
  }

  renderGameView = () => {
    const {
      highlightedCells,
      defaultCells,
      userGuesses,
      gridSize,
      currentLevel,
      isOpen,
    } = this.state
    const gridCells = []

    for (let i = 0; i < gridSize; i += 1) {
      const row = []
      for (let j = 0; j < gridSize; j += 1) {
        const cellIndex = i * gridSize + j

        row.push(
          <div key={cellIndex}>
            <button
              className={`cell ${
                highlightedCells.includes(cellIndex) ||
                userGuesses.includes(cellIndex)
                  ? 'highlight-blue'
                  : ''
              } ${!userGuesses.includes(cellIndex) ? 'highlight-red' : ''}`}
              data-testid={
                defaultCells.includes(cellIndex)
                  ? 'highlighted'
                  : 'notHighlighted'
              }
              onClick={() => this.handleClick(cellIndex)}
            >
              .
            </button>
          </div>,
        )
      }
      gridCells.push(
        <div key={i} className="grid-row">
          {row}
        </div>,
      )
    }
    return (
      <div className="mm-game-container">
        <div className="emoji-buttons-container">
          <button className="arrow-container" onClick={this.onClickBack}>
            <BiArrowBack size={20} color="#ffffff" />
            <p className="back rps-back">Back</p>
          </button>
          <button
            className="rules-button rps-rules-button"
            onClick={this.onOpen}
          >
            Rules
          </button>
          <Modal
            isOpen={isOpen}
            onRequestClose={this.onClose}
            className="mm-popup-container"
          >
            <div>
              <button
                type="button"
                className="close-button"
                data-testid="close"
                onClick={this.onClose}
              >
                <CgClose size={20} />
              </button>

              <h1 className="rps-rules-head">Rules</h1>
              <div>
                <ul className="rps-unorder-list">
                  <li className="rps-list-item">
                    In each level of the Game, Users should be able to see the
                    Grid with (N X N) size starting from 3 and the grid will
                    highlight N cells in Blue, the N highlighted cells will be
                    picked randomly.
                  </li>
                  <li className="rps-list-item">
                    The highlighted cells will remain N seconds for the user to
                    memorize the cells. At this point, the user should not be
                    able to perform any action.
                  </li>
                  <li className="rps-list-item">
                    After N seconds, the grid will clear the N highlighted
                    cells.
                  </li>
                  <li className="rps-list-item">
                    At N seconds, the user can click on any cell. Clicking on a
                    cell that was highlighted before it will turn blue. Clicking
                    on the other cells that were not highlighted before then
                    will turn to red.
                  </li>
                  <li className="rps-list-item">
                    The user should be promoted to the next level if they guess
                    all N cells correctly in one attempt.
                  </li>
                  <li className="rps-list-item">
                    The user should be taken to the results page if the user
                    clicks on the wrong cell.
                  </li>
                  <li className="rps-list-item">
                    If the user completed all the levels, then the user should
                    be taken to the results page.
                  </li>
                </ul>
              </div>
            </div>
          </Modal>
        </div>
        <h1 className="rps-rules-heading">Memory Matrix</h1>
        <p className="mm-level">Level - {currentLevel}</p>
        <div className="grid-container">{gridCells}</div>
      </div>
    )
  }

  calculatePErcentage = () => {
    const {currentLevel} = this.state
    console.log(((currentLevel - 1) / (15 - 1)) * 100)
    return ((currentLevel - 1) / (15 - 1)) * 100
  }

  onClickPlayAgain = () => {
    this.setState(
      {
        apiStatus: apiStatusConstants.gameView,
        currentLevel: 1,
        userGuesses: [],
        gridSize: 3,
      },
      this.initializeGrid,
    )
  }

  renderGameLoss = () => {
    const {currentLevel} = this.state
    return (
      <div className="mm-game-result-container">
        <h1>Game Over</h1>

        <img src="" alt="neutral face" />
        <img src="" alt="grimacing face" />
        <img src="" alt="slightly smiling face" />
        <img src="" alt="grinning face with big eyes" />
        <img src="" alt="grinning face with smiling eyes" />
        <img src="" alt="beaming face with smiling eyes" />
        <img src="" alt="grinning face" />
        <img src="" alt="smiling face with sunglasses" />
        <Line
          percent={this.calculatePErcentage()}
          width="60%"
          strokeWidth={3}
          trailWidth={3}
          strokeColor="#2db7f5"
        />

        <div className="level-container">
          <p className="level-text">Level 1</p>
          <p className="level-text">Level 5</p>
          <p className="level-text">Level 10</p>
          <p className="level-text">Level 15</p>
        </div>
        <h1 className="congrates-text">Congratulations</h1>
        <h1 className="result-text">
          You have reached the level {currentLevel - 1}
        </h1>
        <button
          className="emoji-start-button mm-start-button"
          onClick={this.onClickPlayAgain}
        >
          Play Again
        </button>
      </div>
    )
  }

  renderGameWin = () => {
    const {currentLevel} = this.state
    return (
      <div className="mm-game-result-container">
        <h1>Game Over</h1>

        <img src="" alt="neutral face" />
        <img src="" alt="grimacing face" />
        <img src="" alt="slightly smiling face" />
        <img src="" alt="grinning face with big eyes" />
        <img src="" alt="grinning face with smiling eyes" />
        <img src="" alt="beaming face with smiling eyes" />
        <img src="" alt="grinning face" />
        <img src="" alt="smiling face with sunglasses" />
        <Line
          percent={this.calculatePErcentage()}
          width="60%"
          strokeWidth={3}
          trailWidth={3}
          strokeColor="#2db7f5"
        />

        <div className="level-container">
          <p className="level-text">Level 1</p>
          <p className="level-text">Level 5</p>
          <p className="level-text">Level 10</p>
          <p className="level-text">Level 15</p>
        </div>
        <h1 className="congrates-text">Congratulations</h1>
        <h1 className="result-text">
          You have reached the level {currentLevel - 1}
        </h1>
        <button
          className="emoji-start-button mm-start-button"
          onClick={this.onClickPlayAgain}
        >
          Play Again
        </button>
      </div>
    )
  }

  MemoryGame = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.gameRulesView:
        return this.renderGameRules()
      case apiStatusConstants.gameView:
        return this.renderGameView()
      case apiStatusConstants.gameWin:
        return this.renderGameWin()
      case apiStatusConstants.gameLoss:
        return this.renderGameLoss()
      default:
        return null
    }
  }

  render() {
    return <div>{this.MemoryGame()}</div>
  }
}

export default MemoryMatrix
