import {Component} from 'react'

import {CgClose} from 'react-icons/cg'
import {BiArrowBack} from 'react-icons/bi'

import Modal from 'react-modal'

import './index.css'

const cardsData = [
  {
    name: 'tiger',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-tiger-img.png',
  },
  {
    name: 'lion',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-lion-img.png',
  },
  {
    name: 'rat',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-rat-img.png',
  },
  {
    name: 'hen',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-hen-img.png',
  },
  {
    name: 'elephant',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-elephant-img.png',
  },
  {
    name: 'buffalo',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-buffalo-img.png',
  },
  {
    name: 'goat',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-goat-img.png',
  },
  {
    name: 'zebra',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-zebra-img.png',
  },
  {
    name: 'duck',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-duck-img.png',
  },
  {
    name: 'pigeon',
    image:
      'https://new-assets.ccbp.in/frontend/content/react-js/card-flip-memory/card-flip-memory-game-pigeon-img.png',
  },
]

const resultStatus = {
  gameOver: 'GAMEOVER',
  timeOver: 'TIMEOVER',
  playing: 'PLAYING',
  rules: 'RULES',
}

class CardFlipMemoryGame extends Component {
  state = {
    cards: [],
    selectedCards: [],
    matchedCards: [],
    timer: 120,
    status: resultStatus.rules,
    flipCount: 0,
    isOpen: false,
  }

  componentDidMount() {
    const shuffledCards = this.shuffleCards(cardsData.concat(cardsData))
    this.setState({cards: shuffledCards})

    this.countdown = setInterval(() => {
      this.setState(
        prevState => ({timer: prevState.timer - 1}),
        this.getTimeOver,
      )
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.countdown)
  }

  handleCardClick(index) {
    const {selectedCards, cards, matchedCards} = this.state
    console.log(matchedCards)
    if (matchedCards.includes(cards[index]) || selectedCards.includes(index)) {
      return
    }

    const newSelectedCards = [...selectedCards, index]
    this.setState(prevState => ({
      selectedCards: newSelectedCards,
    }))

    if (newSelectedCards.length === 2) {
      this.setState(prevState => ({flipCount: prevState.flipCount + 1}))
      const [firstCardIndex, secondCardIndex] = newSelectedCards
      if (cards[firstCardIndex].name === cards[secondCardIndex].name) {
        this.setState(
          prevState => ({
            matchedCards: [
              ...prevState.matchedCards,
              cards[firstCardIndex],
              cards[secondCardIndex],
            ],
            selectedCards: [],
          }),
          this.gameComplete,
        )
      } else {
        setTimeout(() => {
          this.setState({selectedCards: []})
        }, 2000)
      }
    }
  }

  gameComplete = () => {
    const {matchedCards, cards} = this.state
    console.log(matchedCards)
    if (matchedCards.length === cards.length) {
      clearInterval(this.countdown)
      this.setState({status: resultStatus.gameOver})
    }
  }

  shuffleCards = array => {
    const shuffledCards = [...array]

    return shuffledCards.sort(() => Math.random() - 0.5)
  }

  getTimeOver = () => {
    const {timer} = this.state

    if (timer === 0) {
      clearInterval(this.countdown)
      this.setState({status: resultStatus.timeOver})
    }
  }

  onClickPlayAgain = () => {
    this.setState(
      {
        matchedCards: [],
        flipCount: 0,
        timer: 120,
        status: resultStatus.playing,
        selectedCards: [],
      },
      this.componentDidMount,
    )
  }

  onClickBack = () => {
    const {history} = this.props
    history.replace('/')
  }

  onClose = () => {
    this.setState({isOpen: false})
  }

  onOpen = () => {
    this.setState({isOpen: true})
  }

  renderPlayingView = () => {
    const {
      cards,
      selectedCards,
      matchedCards,
      timer,
      flipCount,
      gameOver,
      isOpen,
    } = this.state
    return (
      <div className="cardflip-game-bg-container">
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
            className="cardflip-popup-container"
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
              <div className="rps-unorder-list-container">
                <ul className="rps-unorder-list">
                  <li className="rps-list-item">
                    When the game is started, the users should be able to see
                    the list of Cards that are shuffled and turned face down.
                  </li>
                  <li className="rps-list-item">
                    When a user starts the game, the user should be able to see
                    the Timer running.
                  </li>
                  <li className="rps-list-item">
                    The Timer starts from 2 Minutes.
                  </li>
                  <li className="rps-list-item">
                    If the two cards have the same image, they remain face up.
                    If not, they should be flipped face down again after a short
                    2 seconds.
                  </li>
                  <li className="rps-list-item">
                    Users should be able to compare only two cards at a time.
                  </li>
                  <li className="rps-list-item">
                    When the user is not able to find all the cards before the
                    timer ends then the game should end and redirect to the Time
                    Up Page.
                  </li>
                  <li className="rps-list-item">
                    If the user finds all the matching cards before the timer
                    ends, then the user should be redirected to the results
                    page.
                  </li>
                </ul>
              </div>
            </div>
          </Modal>
        </div>
        <h1 className="cardflip-main-heading">Card-Flip Memory Game</h1>
        <div className="cardflip-score-container">
          <p className="cardflip-score">Card flip count - {flipCount}</p>
          <p className="cardflip-timer">
            {`0${Math.floor(timer / 60)}`}:
            {timer % 60 < 10 ? `0${timer % 60}` : timer % 60}
          </p>
          <p className="cardflip-score">Score - {matchedCards.length / 2}</p>
        </div>
        <div className="cardflip-card-container">
          <ul className="card-grid">
            {cards.map((card, index) => (
              <li key={card.name}>
                <button
                  className="cardflip-button"
                  data-testid={card.name}
                  onClick={() => this.handleCardClick(index)}
                >
                  <div
                    className={
                      selectedCards.includes(index) ||
                      matchedCards.includes(card)
                        ? 'background-white'
                        : 'background-green'
                    }
                  >
                    <img
                      src={
                        selectedCards.includes(index) ||
                        matchedCards.includes(card)
                          ? card.image
                          : 'https://res.cloudinary.com/dblfscfnp/image/upload/v1708234339/foot-print_5_bv5i7y.png'
                      }
                      alt={card.name}
                      className="cardflip-image"
                    />
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  }

  renderGameOverView = () => {
    const {flipCount} = this.state
    return (
      <div className="cardflip-result-bg-container">
        <div className="cardflip-game-over">
          <img
            src="https://res.cloudinary.com/dblfscfnp/image/upload/v1707835387/Group_7618_opgxki.png"
            alt="grinning face with big eyes"
            className=""
          />
          <h1 className="cardflip-result-heading">Congratulations</h1>
          <p>No.of Flips - {flipCount}</p>
          <h1>You matched all of the cards in record time</h1>
          <button
            className="emoji-start-button rps-start-button"
            onClick={this.onClickPlayAgain}
          >
            Play Again
          </button>
        </div>
      </div>
    )
  }

  rencerTimeOver = () => {
    const {flipCount} = this.state
    return (
      <div className="cardflip-result-bg-container">
        <div className="cardflip-game-over">
          <img
            src="https://res.cloudinary.com/dblfscfnp/image/upload/v1707910795/Group_7618_1_ww0nhu.png"
            alt="neutral face"
            className=""
          />
          <h1 className="cardflip-result-heading">Better luck next time!</h1>
          <p>No.of flips - {flipCount}</p>
          <h1>You did not match all of the cards in record time</h1>
          <button
            className="emoji-start-button rps-start-button"
            onClick={this.onClickPlayAgain}
          >
            Playing Again
          </button>
        </div>
      </div>
    )
  }

  onClickStart = () => {
    this.setState({status: resultStatus.playing})
  }

  renderRulesView = () => (
    <div className="cardflip-rules-container">
      <button className="arrow-container" onClick={this.onClickBack}>
        <BiArrowBack size={20} color="#ffffff" />
        <p className="back rps-back">Back</p>
      </button>
      <div className="cardflip-rules-flex">
        <img
          src="https://res.cloudinary.com/dblfscfnp/image/upload/v1708089657/animals_g6maes.png"
          alt="card flip memory game"
          className="cardflip-logo"
        />

        <div>
          <h1 className="rps-rules-head">Rules</h1>
          <ul className="rps-unorder-list">
            <li className="rps-list-item">
              When the game is started, the users should be able to see the list
              of Cards that are shuffled and turned face down.
            </li>
            <li className="rps-list-item">
              When a user starts the game, the user should be able to see the
              Timer running.
            </li>
            <li className="rps-list-item">The Timer starts from 2 Minutes.</li>
            <li className="rps-list-item">
              If the two cards have the same image, they remain face up. If not,
              they should be flipped face down again after a short 2 seconds.
            </li>
          </ul>
          <ul className="rps-unorder-list">
            <li className="rps-list-item">
              Users should be able to compare only two cards at a time.
            </li>
            <li className="rps-list-item">
              When the user is not able to find all the cards before the timer
              ends then the game should end and redirect to the Time Up Page.
            </li>
            <li className="rps-list-item">
              If the user finds all the matching cards before the timer ends,
              then the user should be redirected to the results page.
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
    </div>
  )

  renderview = () => {
    const {status} = this.state
    switch (status) {
      case resultStatus.rules:
        return this.renderRulesView()
      case resultStatus.playing:
        return this.renderPlayingView()
      case resultStatus.gameOver:
        return this.renderGameOverView()
      case resultStatus.timeOver:
        return this.rencerTimeOver()
      default:
        return null
    }
  }

  render() {
    return <>{this.renderview()}</>
  }
}

export default CardFlipMemoryGame
