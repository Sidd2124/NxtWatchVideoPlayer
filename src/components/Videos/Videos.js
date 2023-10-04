import './Video.css'

import {Link} from 'react-router-dom'

const Videos = props => {
  const {Detel} = props
  const {Channel, PublishedDate, Logo, Title, Count, id} = Detel
  const New = {Name: Channel.name, ProfileLogo: Channel.profile_image_url}
  const Time = new Date().getFullYear()
  const FinelDate = PublishedDate.slice(8)

  return (
    <Link to={`/blogs/${id}`} className="Get">
      <div className="Box">
        <img className="Start" src={Logo} alt="Siddu" />
        <div className="Dec">
          <img className="Clogo" src={New.ProfileLogo} alt=" Thala " />
          <div>
            <p>{Title}</p>
            <p>{New.Name}</p>
            <div className="Dec">
              <p>{Count} Views</p>

              <p>{Time - FinelDate} Years Ago</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default Videos
