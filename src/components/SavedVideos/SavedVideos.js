import Cookies from 'js-cookie'

import {Redirect, Link} from 'react-router-dom'

import {BiSearch, BiHome, BiSave} from 'react-icons/bi'

import {AiOutlineFire} from 'react-icons/ai'

import {CgGames} from 'react-icons/cg'

import {Component} from 'react'

import Saveditems from '../SavedItems/SvedItems'

import Baner from '../Banner/Baner'

import LanguageContext from '../../Context/Context'

import './index.css'

class SavedVideos extends Component {
  state = {
    SearchValue: '',
    FinelResult: '',
  }

  searchResult = event => {
    this.setState({SearchValue: event.target.value})
  }

  FinelSearch = () => {
    const {SearchValue} = this.state
    this.setState({FinelResult: SearchValue})
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <LanguageContext.Consumer>
        {value => {
          const {FinelResult} = this.state
          const {Active, SavedList} = value
          const Almost = SavedList.filter(each =>
            each.Description.includes(FinelResult),
          )
          const Get = Active ? 'Bright' : 'Dark'
          return (
            <div className={Get}>
              {Almost.length === 0 || SavedList.length === 0 ? (
                <div>
                  <Baner />
                  <div className="First">
                    <div className="Side">
                      <Link to="/" className="Re">
                        <BiHome className="Icons" />
                        <h1>Home</h1>
                      </Link>
                      <Link to="/Trending" className="Re">
                        <AiOutlineFire className="Icons" />
                        <h1>trending</h1>
                      </Link>
                      <Link to="/Game" className="Re">
                        <CgGames className="Icons" />
                        <h1> Game</h1>
                      </Link>
                      <Link to="/SavedVideos" className="Re">
                        <BiSave className="Icons" />
                        <h1>Saved Videos</h1>
                      </Link>
                    </div>

                    <div>
                      <div className="Day">
                        <div>
                          <input
                            type="search"
                            onChange={this.searchResult}
                            placeholder="Search"
                          />
                          <button type="button" onClick={this.FinelSearch}>
                            <BiSearch />
                          </button>
                        </div>
                        <div className="VideoslistOne">
                          <p className="Warning">
                            No Videos Found ...Try Again😉😉
                          </p>
                          <img
                            className="NoVideos"
                            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png "
                            alt="NoVideos"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <Baner />
                  <div className="First">
                    <div className="Side">
                      <Link to="/" className="Re">
                        <BiHome className="Icons" />
                        <h1>Home</h1>
                      </Link>
                      <Link to="/Trending" className="Re">
                        <AiOutlineFire className="Icons" />
                        <h1>trending</h1>
                      </Link>
                      <Link to="/Game" className="Re">
                        <CgGames className="Icons" />
                        <h1> Game</h1>
                      </Link>
                      <Link to="/SavedVideos" className="Re">
                        <BiSave className="Icons" />
                        <h1>Saved Videos</h1>
                      </Link>
                    </div>

                    <div>
                      <div className="Day">
                        <div>
                          <input
                            type="search"
                            onChange={this.searchResult}
                            placeholder="Search"
                          />
                          <button type="button" onClick={this.FinelSearch}>
                            <BiSearch />
                          </button>
                        </div>
                        <div className="Videoslist">
                          {Almost.map(each => (
                            <Saveditems Info={each} key={each.id} />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        }}
      </LanguageContext.Consumer>
    )
  }
}

export default SavedVideos
