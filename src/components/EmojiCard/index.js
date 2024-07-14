import './index.css'

const EmojiCard = props => {
  const {emojiDetails, clickEmoji} = props
  const {id, emojiName, emojiUrl} = emojiDetails

  const onClickEmoji = () => {
    clickEmoji(id)
  }
  return (
    <li className="emoji-card-item">
      <button className="emoji-card-button" onClick={onClickEmoji}>
        <img src={emojiUrl} alt={emojiName} className="emoji-card-image" />
      </button>
    </li>
  )
}

export default EmojiCard
