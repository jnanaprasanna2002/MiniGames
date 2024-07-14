import {Component} from 'react'

import {CgClose} from 'react-icons/cg'
import {BiArrowBack} from 'react-icons/bi'
import Modal from 'react-modal'

import EmojiCard from '../EmojiCard'

import './index.css'

const emojisList = [
  {
    id: 0,
    emojiName: 'Face with stuck out tongue',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-stuck-out-tongue-img.png',
  },
  {
    id: 1,
    emojiName: 'Face with head bandage',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-head-bandage-img.png',
  },
  {
    id: 2,
    emojiName: 'Face with hugs',
    emojiUrl: 'https://assets.ccbp.in/frontend/react-js/face-with-hugs-img.png',
  },
  {
    id: 3,
    emojiName: 'Face with laughing',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-laughing-img.png',
  },
  {
    id: 4,
    emojiName: 'Laughing face with hand in front of mouth',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-laughing-with-hand-infront-mouth-img.png',
  },
  {
    id: 5,
    emojiName: 'Face with mask',
    emojiUrl: 'https://assets.ccbp.in/frontend/react-js/face-with-mask-img.png',
  },
  {
    id: 6,
    emojiName: 'Face with silence',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-silence-img.png',
  },
  {
    id: 7,
    emojiName: 'Face with stuck out tongue and winked eye',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/face-with-stuck-out-tongue-and-winking-eye-img.png',
  },
  {
    id: 8,
    emojiName: 'Grinning face with sweat',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/grinning-face-with-sweat-img.png',
  },
  {
    id: 9,
    emojiName: 'Smiling face with heart eyes',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/smiling-face-with-heart-eyes-img.png',
  },
  {
    id: 10,
    emojiName: 'Grinning face',
    emojiUrl: 'https://assets.ccbp.in/frontend/react-js/grinning-face-img.png',
  },
  {
    id: 11,
    emojiName: 'Smiling face with star eyes',
    emojiUrl:
      'https://assets.ccbp.in/frontend/react-js/smiling-face-with-star-eyes-img.png',
  },
]

const apiStatusConstants = {
  gameView: 'GAMEVIEW',
  gameWin: 'GAMEWIN',
  gameLoss: 'GAMELOSS',
  gameRulesView: 'GAMERULES',
}

class EmojiGame extends Component {
  state = {
    apiStatus: apiStatusConstants.gameRulesView,
    score: 0,
    cards: emojisList,
    userList: [],
    isOpen: false,
  }

  componentDidMount() {
    this.shuffleCards()
  }

  onClickBack = () => {
    const {history} = this.props
    history.replace('/')
  }

  onClickPlayGame = () => {
    this.setState({apiStatus: apiStatusConstants.gameView})
  }

  shuffleCards = () => {
    const {cards} = this.state
    const shuffledCards = [...cards]
    for (let i = shuffledCards.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[shuffledCards[i], shuffledCards[j]] = [
        shuffledCards[j],
        shuffledCards[i],
      ]
    }
    this.setState({cards: shuffledCards})
  }

  clickEmoji = id => {
    const {userList, cards} = this.state
    console.log(userList)
    console.log(cards)
    const findEmoji = userList.includes(id)
    if (!findEmoji) {
      this.setState(
        prevState => ({
          userList: [...prevState.userList, id],
          score: prevState.score + 1,
        }),
        this.shuffleCards,
      )
    } else {
      this.setState({apiStatus: apiStatusConstants.gameLoss})
    }

    if (userList.length + 1 === cards.length) {
      this.setState({apiStatus: apiStatusConstants.gameWin})
    }
  }

  onClickRePlay = () => {
    this.setState({
      apiStatus: apiStatusConstants.gameView,
      score: 0,
      userList: [],
    })
  }

  onOpen = () => {
    this.setState({isOpen: true})
  }

  onClose = () => {
    this.setState({isOpen: false})
  }

  renderGameView = () => {
    const {cards, score, isOpen} = this.state

    return (
      <>
        <div className="emoji-game-header">
          <h1 className="emoji-heading">Emoji Game</h1>
          <img src="" alt="emoji logo" />
          <p className="emoji-score">Score: {score}</p>
        </div>

        <div className="game-view-container ">
          <div className="game-view">
            <div className="emoji-buttons-container">
              <button className="arrow-container" onClick={this.onClickBack}>
                <BiArrowBack size={20} color="#334155" />
                <p className="back">Back</p>
              </button>
              <button className="rules-button" onClick={this.onOpen}>
                Rules
              </button>
              <Modal
                isOpen={isOpen}
                onRequestClose={this.onClose}
                className="popup-container"
              >
                <div>
                  <div className="pop-up-close-button">
                    <button
                      data-testid="close"
                      type="button"
                      className="close-button"
                      onClick={this.onClose}
                    >
                      <CgClose size={20} />
                    </button>
                  </div>
                  <div className="rules-content-container">
                    <h1 className="rules-heading">Rules</h1>
                    <ul>
                      <li className="rules-list-item">
                        User should be able to see the list of Emojis
                      </li>
                      <li className="rules-list-item">
                        When the user clicks any one of the Emoji for the first
                        time, then the count of the score should be incremented
                        by 1 and the List of emoji cards should be shuffled.
                      </li>
                      <li className="rules-list-item">
                        This process should be repeated every time the user
                        clicks on an emoji card
                      </li>
                      <li className="rules-list-item">
                        When the user clicks on all Emoji cards without clicking
                        any of it twice, then the user will win the game
                      </li>
                      <li className="rules-list-item">
                        When the user clicks on the same Emoji for the second
                        time, then the user will lose the game.
                      </li>
                      <li className="rules-list-item">
                        Once the game is over, the user will be redirected to
                        the results page.
                      </li>
                    </ul>
                  </div>
                </div>
              </Modal>
            </div>
            <ul className="emoji-unorder-list">
              {cards.map(emoji => (
                <EmojiCard
                  key={emoji.id}
                  emojiDetails={emoji}
                  clickEmoji={this.clickEmoji}
                />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }

  renderGameWIn = () => {
    const {score} = this.state
    return (
      <>
        <div className="emoji-game-header">
          <h1 className="emoji-heading">Emoji Game</h1>
        </div>
        <div className="game-view-container">
          <div className="game-over-container">
            <img
              src="https://res.cloudinary.com/dblfscfnp/image/upload/v1707806274/Image_1_jvgk9g.png"
              alt="won"
              className="game-loss-image"
            />
            <div>
              <h1 className="game-result">You Won</h1>
              <p className="game-best-score">Best Score</p>
              <p className="game-total-score">
                {score}/{emojisList.length}
              </p>
              <div className="emoji-button-container">
                <button
                  className="play-again-button"
                  onClick={this.onClickRePlay}
                >
                  Play Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    )
  }

  renderGameLoss = () => {
    const {score} = this.state
    return (
      <div>
        <div className="emoji-game-header">
          <h1 className="emoji-heading">Emoji Game</h1>
        </div>

        <div className="game-view-container ">
          <div className="game-over-container">
            <img
              src="https://res.cloudinary.com/dblfscfnp/image/upload/v1707804565/Image_shuo79.png"
              alt="lose"
              className="game-loss-image"
            />
            <div>
              <h1 className="game-result">You Lose</h1>
              <p className="game-best-score">Score</p>
              <p className="game-total-score">
                {score}/{emojisList.length}
              </p>
              <div className="emoji-button-container">
                <button
                  className="play-again-button"
                  onClick={this.onClickRePlay}
                >
                  Play Again
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  onClickStart = () => {
    this.setState({apiStatus: apiStatusConstants.gameView})
  }

  renderGameRules = () => (
    <div className="emoji-game-rules-container">
      <button className="arrow-container" onClick={this.onClickBack}>
        <BiArrowBack size={20} color="#334155" />
        <p className="back">Back</p>
      </button>
      <div className="rules-card-container">
        <h1>Emoji Game</h1>
        <img
          src="https://res.cloudinary.com/dblfscfnp/image/upload/v1707741586/Group_7428_afnghm.png"
          alt="emoji game"
          className="rules-card-image"
        />
        <div className="rules-content-container">
          <h1 className="rules-heading">Rules</h1>
          <ul>
            <li className="rules-list-item">
              User should be able to see the list of Emojis
            </li>
            <li className="rules-list-item">
              When the user clicks any one of the Emoji for the first time, then
              the count of the score should be incremented by 1 and the List of
              emoji cards should be shuffled.
            </li>
            <li className="rules-list-item">
              This process should be repeated every time the user clicks on an
              emoji card
            </li>
            <li className="rules-list-item">
              When the user clicks on all Emoji cards without clicking any of it
              twice, then the user will win the game
            </li>
            <li className="rules-list-item">
              When the user clicks on the same Emoji for the second time, then
              the user will lose the game.
            </li>
            <li className="rules-list-item">
              Once the game is over, the user will be redirected to the results
              page.
            </li>
          </ul>
          <div className="emoji-button-container">
            <button className="emoji-start-button" onClick={this.onClickStart}>
              Start Playing
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  renderGame = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.gameRulesView:
        return this.renderGameRules()
      case apiStatusConstants.gameView:
        return this.renderGameView()
      case apiStatusConstants.gameWin:
        return this.renderGameWIn()
      case apiStatusConstants.gameLoss:
        return this.renderGameLoss()
      default:
        return null
    }
  }

  render() {
    return <div className="emoji-game-container">{this.renderGame()}</div>
  }
}

export default EmojiGame
