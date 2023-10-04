import './GameVideo.css'

import {Link} from 'react-router-dom'

const GameVideo = props => {
  const {Deteling} = props
  const {Logo, Title, Count, id} = Deteling

  return (
    <Link to={`/blogs/${id}`} className="Get">
      <div className="Box">
        <img className="Starting" src={Logo} alt="Siddu" />
        <div className="Dec">
          <div>
            <p>{Title}</p>

            <div className="Dec">
              <p>{Count} Views</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default GameVideo
