import './index.css'

const RpsChoice = props => {
  const {choiceDetails, updateChoice} = props
  const {imageUrl, id} = choiceDetails
  const onClickChoice = () => {
    updateChoice(id)
  }
  return (
    <li>
      <button
        className="emoji-card-button"
        onClick={onClickChoice}
        data-testid={`${id}Button`}
      >
        <img src={imageUrl} alt={id} className="choice-image" />
      </button>
    </li>
  )
}

export default RpsChoice
