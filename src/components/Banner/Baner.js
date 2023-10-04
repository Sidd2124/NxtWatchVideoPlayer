import {useHistory, Link} from 'react-router-dom'

import Popup from 'reactjs-popup'

import {CgProfile} from 'react-icons/cg'

import {BsBrightnessLow} from 'react-icons/bs'

import Cookies from 'js-cookie'

import LanguageContext from '../../Context/Context'

import './Baneer.css'

const Banner = () => {
  const history = useHistory()

  const logout = () => {
    Cookies.remove('jwt_token')
    history.replace('/login')
    console.log(history)
  }

  const Cancel = () => {
    history.replace('/')
  }

  return (
    <LanguageContext.Consumer>
      {Value => {
        const {Shifting} = Value

        const Shift = () => {
          Shifting()
        }
        return (
          <div className="BannerOne">
            <div>
              <Link to="/">
                {' '}
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                  alt="Dhoni"
                  className="BanerPic"
                />
              </Link>
            </div>
            <div className="Begin">
              <BsBrightnessLow className="Bright" onClick={Shift} />
              <CgProfile className="Bright" />

              <Popup
                trigger={
                  <button type="button" className="banerlogout">
                    Log Out
                  </button>
                }
              >
                <div className="Pop">
                  <div>
                    <p>Are you Sure Want to Log out ?</p>
                  </div>
                  <div className="Begin">
                    <Link to="/">
                      <button type="button" className="cancel" onClick={Cancel}>
                        Cancel
                      </button>
                    </Link>
                    <button
                      type="button"
                      onClick={logout}
                      className="banerlogoutOne"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </Popup>
            </div>
          </div>
        )
      }}
    </LanguageContext.Consumer>
  )
}

export default Banner
