import './index.css'
import {Link} from 'react-router-dom'
import LanguageContext from '../../Context/Context'

const Saveditems = props => {
  const {Info} = props
  const {Channel, Count, Dates, Thumbnail, id, Description} = Info

  return (
    <LanguageContext.Consumer>
      {Value => {
        const {TakeOff} = Value
        const Off = () => {
          TakeOff(id)
        }

        return (
          <div className="SavedMain">
            <Link to={`/blogs/${id}`} className="Get">
              <img src={Thumbnail} alt="Saved" className="Thumb" />
            </Link>
            <div>
              <p>{Channel}</p>
              <p>{Count}</p>
              <p>{Dates}</p>
              <p>{Description}</p>
              <button type="button" onClick={Off}>
                Remove
              </button>
            </div>
          </div>
        )
      }}
    </LanguageContext.Consumer>
  )
}

export default Saveditems
