import {Link} from 'react-router-dom'

import './index.css'

const Home = () => (
  <div className="home-bg-container">
    <h1 className="home-heading">Games</h1>
    <ul className="home-cards-container">
      <Link to="/emoji-game" className="home-link">
        <li className="home-card-container">
          <img
            src="https://res.cloudinary.com/dblfscfnp/image/upload/v1707727318/Group_7471_beisox.png"
            alt="emoji game"
            className="emoji-logo"
          />
        </li>
      </Link>

      <Link to="/memory-matrix" className="home-link">
        <li className="home-card-container">
          <h1 className="home-card-heading">Memory Matrix</h1>
          <img
            src="https://res.cloudinary.com/dblfscfnp/image/upload/v1707733053/memory_jjs7cg.png"
            alt="memory matrix"
            className="emoji-logo"
          />
        </li>
      </Link>

      <Link to="/rock-paper-scissor" className="home-link">
        <li className="home-card-container">
          <h1 className="home-card-heading">ROCK PAPER SCISSOR</h1>
          <img
            src="https://res.cloudinary.com/dblfscfnp/image/upload/v1707733749/Group_7469_rbvzyu.png"
            alt="rock paper scissor"
            className="emoji-logo"
          />
        </li>
      </Link>

      <Link to="/card-flip-memory-game" className="home-link">
        <li className="home-card-container">
          <img
            src="https://res.cloudinary.com/dblfscfnp/image/upload/v1707734233/animals_1_ewscne.png"
            alt="card flip memory game"
            className="emoji-logo"
          />
        </li>
      </Link>
    </ul>
  </div>
)

export default Home
