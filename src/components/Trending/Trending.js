import Cookies from 'js-cookie'

import {BiSearch, BiHome, BiSave} from 'react-icons/bi'

import {AiOutlineFire} from 'react-icons/ai'

import {CgGames} from 'react-icons/cg'

import {Redirect, Link} from 'react-router-dom'

import Loader from 'react-loader-spinner'

import {Component} from 'react'

import Baner from '../Banner/Baner'

import Videos from '../Videos/Videos'

import LanguageContext from '../../Context/Context'

class Trending extends Component {
  state = {
    FirstDetails: [],
    SearchValue: '',
    FinelResult: '',
    isActive: true,
  }

  componentDidMount() {
    this.GetDetails()
  }

  searchResult = event => {
    this.setState({SearchValue: event.target.value})
  }

  FinelSearch = () => {
    const {SearchValue} = this.state
    this.setState({FinelResult: SearchValue}, this.GetDetails)
  }

  GetDetails = async () => {
    const {FinelResult} = this.state
    const Token = Cookies.get('jwt_token')

    const Url = `https://apis.ccbp.in/videos/trending?search=${FinelResult}`
    const options = {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
      method: 'GET',
    }

    const response = await fetch(Url, options)
    const code = await response.json()
    if (response.ok) {
      const Updated = code.videos.map(each => ({
        Channel: each.channel,
        id: each.id,
        PublishedDate: each.published_at,
        Logo: each.thumbnail_url,
        Title: each.title,
        Count: each.view_count,
      }))

      this.setState({FirstDetails: Updated, isActive: false})
    }
  }

  render() {
    const {FirstDetails, isActive} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <LanguageContext.Consumer>
        {value => {
          const {Active} = value

          const Get = Active ? 'Bright' : 'Dark'
          return (
            <div className={Get}>
              {isActive ? (
                <Loader className="Load" />
              ) : (
                <div>
                  {FirstDetails.length === 0 ? (
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
                                No Videos Found For Your Match...Try Again😉😉
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
                            {FirstDetails.map(each => (
                              <Videos Detel={each} key={each.id} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        }}
      </LanguageContext.Consumer>
    )
  }
}

export default Trending
