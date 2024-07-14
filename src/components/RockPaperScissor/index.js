import {Component} from 'react'

import {CgClose} from 'react-icons/cg'
import {BiArrowBack} from 'react-icons/bi'

import Modal from 'react-modal'

import RpsChoice from '../RpsChoice'
import './index.css'

const choicesList = [
  {
    id: 'rock',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/rock-image.png',
  },
  {
    id: 'scissor',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/scissor-image.png',
  },
  {
    id: 'paper',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rock-paper-scissor/paper-image.png',
  },
]

const gameStatus = {
  play: 'PLAY',
  win: 'WIN',
  loss: 'LOSS',
  draw: 'DRAW',
  rules: 'Game Rules View',
}

class RockPaperScissor extends Component {
  state = {
    userChoice: {},
    randomChoice: {},
    status: gameStatus.rules,
    result: 0,
    isOpen: false,
  }

  onClickBack = () => {
    const {history} = this.props
    history.replace('/')
  }

  updateChoice = id => {
    const findChoice = choicesList.find(each => each.id === id)
    this.setState({userChoice: findChoice})
    this.randomChoice()
  }

  randomChoice = () => {
    const ramdomNumber = Math.floor(Math.random() * 3)
    const random = choicesList[ramdomNumber]
    this.setState({randomChoice: random}, this.getResult)
  }

  getResult = () => {
    const {userChoice, randomChoice} = this.state
    if (userChoice.id === randomChoice.id) {
      this.setState({status: gameStatus.draw})
    } else if (userChoice.id === 'rock') {
      if (randomChoice.id === 'scissor') {
        this.setState(prevState => ({
          result: prevState.result + 1,
          status: gameStatus.win,
        }))
      } else {
        this.setState(prevState => ({
          result: prevState.result - 1,
          status: gameStatus.loss,
        }))
      }
    } else if (userChoice.id === 'paper') {
      if (randomChoice.id === 'rock') {
        this.setState(prevState => ({
          result: prevState.result + 1,
          status: gameStatus.win,
        }))
      } else {
        this.setState(prevState => ({
          result: prevState.result - 1,
          status: gameStatus.loss,
        }))
      }
    } else if (userChoice.id === 'scissor') {
      if (randomChoice.id === 'paper') {
        this.setState(prevState => ({
          result: prevState.result + 1,
          status: gameStatus.win,
        }))
      } else {
        this.setState(prevState => ({
          result: prevState.result - 1,
          status: gameStatus.loss,
        }))
      }
    }
  }

  onClickPlayAgain = () => {
    this.setState({status: gameStatus.play})
  }

  onOpen = () => {
    this.setState({isOpen: true})
  }

  onClose = () => {
    this.setState({isOpen: false})
  }

  renderPlayingView = () => {
    const {isOpen} = this.state
    return (
      <div>
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
            className="rps-popup-container"
          >
            <div>
              <div className="rules-close-button">
                <button
                  className="close-button "
                  type="button"
                  onClick={this.onClose}
                  data-testid="close"
                >
                  <CgClose size={24} />
                </button>
              </div>
              <h1 className="rps-rules-head">Rules</h1>
              <ul className="rps-unorder-list">
                <li className="rps-list-item">
                  The game result should be based on user and user opponent
                  choices
                </li>
                <li className="rps-list-item">
                  When the user choice is rock and his opponent choice is rock
                  then the result will be IT IS DRAW
                </li>
                <li className="rps-list-item">
                  When the user choice is paper and his opponent choice is rock
                  then the result will be YOU WON
                </li>
                <li className="rps-list-item">
                  When the user choice is a scissor and his opponent choice is
                  rock then the result will be YOU LOSE
                </li>
                <li className="rules-list-item">
                  When the user choice is paper and his opponent choice is paper
                  then the result will be IT IS DRAW
                </li>
                <li className="rules-list-item">
                  When the user choice is scissors and his opponent choice is
                  paper then the result will be YOU WON
                </li>
                <li className="rules-list-item">
                  When the user choice is rock and his opponent choice is
                  scissors then the result will be YOU WON
                </li>
                <li className="rules-list-item">
                  When the user choice is paper and his opponent choice is
                  scissors then the result will be YOU LOSE
                </li>
                <li className="rules-list-item">
                  When the user choice is scissors and his opponent choice is
                  scissors then the result will be IT IS DRAW
                </li>
                <li className="rules-list-item">
                  When the result is YOU WON, then the count of the score should
                  be incremented by 1
                </li>
                <li className="rules-list-item">
                  When the result is IT IS DRAW, then the count of the score
                  should be the same
                </li>
                <li className="rules-list-item">
                  When the result is YOU LOSE, then the count of the score
                  should be decremented by 1.
                </li>
              </ul>
            </div>
          </Modal>
        </div>
        <h1 className="rps-rules-heading">ROCK PAPER SCISSOR</h1>
        <h1 className="rps-rules-heading">Let’s pick</h1>
        <ul className="unorder-choice-list">
          {choicesList.map(each => (
            <RpsChoice
              key={each.id}
              choiceDetails={each}
              updateChoice={this.updateChoice}
            />
          ))}
        </ul>
      </div>
    )
  }

  renderWinview = () => {
    const {userChoice, randomChoice, result} = this.state

    return (
      <div className="rps-result-container">
        <h1 className="rps-rules-heading">Rock Paper Scissor</h1>
        <div className="result-card-container">
          <h1 className="rps-heading-container">Rock Paper Scissor</h1>
          <div className="result-image-container">
            <img
              src="https://res.cloudinary.com/dblfscfnp/image/upload/v1707835387/Group_7618_opgxki.png"
              alt="won emoji"
              className="result-image"
            />
            <img src="" alt="Smiling face with star eyes" />
            <div className="score-container">
              <p className="rps-score-heading">Score</p>
              <p className="rps-score-result">{result}</p>
            </div>
          </div>
        </div>
        <div className="rps-between-space">
          <p className="rps-list-item">You</p>
          <p className="rps-list-item">Opponent</p>
        </div>
        <div className="results-show-container">
          <img
            src={userChoice.imageUrl}
            alt={userChoice.id}
            className="choice-image"
          />
          <div>
            <p className="rps-rules-head">YOU WON</p>
            <button
              className="emoji-start-button rps-start-button"
              onClick={this.onClickPlayAgain}
            >
              Play Again
            </button>
          </div>
          <img
            src={randomChoice.imageUrl}
            alt={randomChoice.id}
            className="choice-image"
          />
        </div>
      </div>
    )
  }

  renderLossView = () => {
    const {userChoice, randomChoice, result} = this.state
    return (
      <div className="rps-result-container">
        <h1 className="rps-rules-heading">Rock Paper Scissor</h1>
        <div className="result-card-container">
          <h1 className="rps-heading-container">Rock Paper Scissor</h1>
          <div className="result-image-container">
            <img
              src="https://res.cloudinary.com/dblfscfnp/image/upload/v1707910864/Group_7618_2_baavda.png"
              alt="lose emoji"
              className="result-image"
            />
            <img src="" alt="Face without mouth" />
            <div className="score-container">
              <p className="rps-score-heading">Score</p>
              <p className="rps-score-result">{result}</p>
            </div>
          </div>
        </div>
        <div className="rps-between-space">
          <p className="rps-list-item">You</p>
          <p className="rps-list-item">Opponent</p>
        </div>
        <div className="results-show-container">
          <img
            src={userChoice.imageUrl}
            alt={userChoice.id}
            className="choice-image"
          />
          <div>
            <p className="rps-rules-head">YOU LOSE</p>
            <button
              className="emoji-start-button rps-start-button"
              onClick={this.onClickPlayAgain}
            >
              Play Again
            </button>
          </div>
          <img
            src={randomChoice.imageUrl}
            alt={randomChoice.id}
            className="choice-image"
          />
        </div>
      </div>
    )
  }

  renderDrawView = () => {
    const {userChoice, randomChoice, result} = this.state
    return (
      <div className="rps-result-container">
        <h1 className="rps-rules-heading">Rock Paper Scissor</h1>
        <div className="result-card-container">
          <h1 className="rps-heading-container">Rock Paper Scissor</h1>
          <div className="result-image-container">
            <img
              src="https://res.cloudinary.com/dblfscfnp/image/upload/v1707910795/Group_7618_1_ww0nhu.png"
              alt="draw emoji"
              className="result-image"
            />
            <img src="" alt="Face without mouth" />
            <div className="score-container">
              <p className="rps-score-heading">Score</p>
              <p className="rps-score-result">{result}</p>
            </div>
          </div>
        </div>
        <div className="rps-between-space">
          <p className="rps-list-item">You</p>
          <p className="rps-list-item">Opponent</p>
        </div>
        <div className="results-show-container">
          <img
            src={userChoice.imageUrl}
            alt={userChoice.id}
            className="choice-image"
          />
          <div>
            <p className="rps-rules-head">IT IS DRAW</p>
            <button
              className="emoji-start-button rps-start-button"
              onClick={this.onClickPlayAgain}
            >
              Play Again
            </button>
          </div>
          <img
            src={randomChoice.imageUrl}
            alt={randomChoice.id}
            className="choice-image"
          />
        </div>
      </div>
    )
  }

  onClickStart = () => {
    this.setState({status: gameStatus.play})
  }

  GameRulesView = () => (
    <div>
      <button className="arrow-container" onClick={this.onClickBack}>
        <BiArrowBack size={20} color="#ffffff" />
        <p className="back rps-back">Back</p>
      </button>
      <div className="rps-image-container">
        <h1 className="rps-rules-heading">Rock Paper Scissor</h1>
        <img
          src="https://res.cloudinary.com/dblfscfnp/image/upload/v1707814968/Group_7469_igk0sk.png"
          alt="rock paper scissor"
          className="rps-image"
        />
      </div>
      <div>
        <h1 className="rps-rules-head">Rules</h1>
        <ul className="rps-unorder-list">
          <li className="rps-list-item">
            The game result should be based on user and user opponent choices
          </li>
          <li className="rps-list-item">
            When the user choice is rock and his opponent choice is rock then
            the result will be IT IS DRAW
          </li>
          <li className="rps-list-item">
            When the user choice is paper and his opponent choice is rock then
            the result will be YOU WON
          </li>
          <li className="rps-list-item">
            When the user choice is a scissor and his opponent choice is rock
            then the result will be YOU LOSE
          </li>
          <li className="rps-list-item">
            When the user choice is paper and his opponent choice is paper then
            the result will be IT IS DRAW
          </li>
          <li className="rps-list-item">
            When the user choice is scissors and his opponent choice is paper
            then the result will be YOU WON
          </li>

          <li className="rps-list-item">
            When the user choice is rock and his opponent choice is scissors
            then the result will be YOU WON
          </li>
          <li className="rps-list-item">
            When the user choice is paper and his opponent choice is scissors
            then the result will be YOU LOSE
          </li>
          <li className="rps-list-item">
            When the user choice is scissors and his opponent choice is scissors
            then the result will be IT IS DRAW
          </li>
          <li className="rps-list-item">
            When the result is YOU WON, then the count of the score should be
            incremented by 1
          </li>
          <li className="rps-list-item">
            When the result is IT IS DRAW, then the count of the score should be
            the same
          </li>
          <li className="rps-list-item">
            When the result is YOU LOSE, then the count of the score should be
            decremented by 1.
          </li>
        </ul>

        <div className="rps-button-container">
          <button
            className="emoji-start-button rps-start-button"
            onClick={this.onClickStart}
          >
            Start Playing
          </button>
        </div>
      </div>
    </div>
  )

  renderView = () => {
    const {status} = this.state
    switch (status) {
      case gameStatus.rules:
        return this.GameRulesView()
      case gameStatus.play:
        return this.renderPlayingView()
      case gameStatus.win:
        return this.renderWinview()
      case gameStatus.loss:
        return this.renderLossView()
      case gameStatus.draw:
        return this.renderDrawView()
      default:
        return null
    }
  }

  render() {
    return <div className="rsp-game-container">{this.renderView()}</div>
  }
}

export default RockPaperScissor
