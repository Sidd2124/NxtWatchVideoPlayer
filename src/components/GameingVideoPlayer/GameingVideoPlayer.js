import {Component} from 'react'

import Cookies from 'js-cookie'

import {Link} from 'react-router-dom'

import {AiOutlineFire, AiOutlineLike} from 'react-icons/ai'

import {CgGames} from 'react-icons/cg'

import ReactPlayer from 'react-player'

import {BiHome, BiDislike, BiSave} from 'react-icons/bi'

import LanguageContext from '../../Context/Context'

import Baner from '../Banner/Baner'

import './index.css'

class VideoPlaying extends Component {
  state = {TotalInformation: [], DisLikeButton: true, LikeButton: true}

  componentDidMount() {
    this.GetfullInfo()
  }

  DislikeColoreChange = () => {
    this.setState(prevState => ({DisLikeButton: !prevState.DisLikeButton}))
  }

  LikeColoreChange = () => {
    this.setState(prevState => ({
      LikeButton: !prevState.LikeButton,
    }))
  }

  GetfullInfo = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const Token = Cookies.get('jwt_token')

    const options = {
      headers: {
        Authorization: `Bearer ${Token}`,
      },
      method: 'GET',
    }

    const URL = `https://apis.ccbp.in/videos/${id}`

    const Responce = await fetch(URL, options)

    const Codes = await Responce.json()

    const NewOne = {
      id: Codes.video_details.id,
      Description: Codes.video_details.description,
      Dates: Codes.video_details.published_at,
      Title: Codes.video_details.title,
      Count: Codes.video_details.view_count,
      Video: Codes.video_details.video_url,
      Thumbnail: Codes.video_details.thumbnail_url,
      Channel: Codes.video_details.channel.name,

      ChannelLogo: Codes.video_details.channel.profile_image_url,
    }
    console.log(Codes)
    this.setState({TotalInformation: NewOne})
  }

  render() {
    const {TotalInformation, DisLikeButton, LikeButton} = this.state

    const StyleChange = DisLikeButton ? 'ColoreOne' : 'ColorTwo'

    const StyleChangeOne = LikeButton ? 'ColoreOne' : 'ColorTwo'

    const {
      id,
      Dates,
      Title,
      Description,
      Count,
      Video,
      Channel,
      ChannelLogo,
      Thumbnail,
    } = TotalInformation

    return (
      <LanguageContext.Consumer>
        {value => {
          const {Active, NewAdd} = value

          const Get = Active ? 'Bright' : 'Dark'

          const AddVideo = () => {
            NewAdd({...Channel, Count, Dates, Thumbnail, Description, id})
          }

          return (
            <div className={Get}>
              <Baner />
              <div className="LayerOne">
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
                <div className="MainPlayer">
                  <ReactPlayer
                    url={Video}
                    playing
                    height={380}
                    width={1200}
                    controls
                  />

                  <div className="Ride">
                    <div>
                      <h6>{Title}</h6>
                      <div className="Rides">
                        <p className="Publish">Published On:{Dates}.</p>
                        <p className="Published">{Count}Views</p>
                      </div>
                    </div>
                    <div className="Rides">
                      <div className={`Like ${StyleChangeOne}`}>
                        <AiOutlineLike
                          className="Sd"
                          onClick={this.LikeColoreChange}
                        />
                        <p>Like</p>
                      </div>
                      <div className={`Like ${StyleChange}`}>
                        <BiDislike
                          className="Sd"
                          onClick={this.DislikeColoreChange}
                        />
                        <p>Dislike</p>
                      </div>

                      <div className="Likeing">
                        <BiSave className="Sd" onClick={AddVideo} />
                        <p className="Sd">Save</p>
                      </div>
                    </div>
                  </div>
                  <hr />
                  <div className="Likes">
                    <img
                      src={ChannelLogo}
                      alt="Sidd"
                      loading="lazy"
                      className="ChannelLogo Sds"
                    />
                    <div className="Gets">
                      <h4>{Channel}</h4>
                      <p>1 Million Subscribers</p>
                    </div>
                  </div>
                  <p>{Description}</p>
                </div>
              </div>
            </div>
          )
        }}
      </LanguageContext.Consumer>
    )
  }
}

export default VideoPlaying
