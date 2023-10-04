import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    User: '',
    Password: '',
    Fail: '',
    First: true,
    FinelUser: '',
    FinelPassword: '',
  }

  Uservalue = event => {
    this.setState({User: event.target.value}, () => {
      const {User} = this.state
      if (User === 'Sidd') {
        this.setState({FinelUser: 'rahul'})
      }
    })
  }

  PasswordValue = event => {
    this.setState({Password: event.target.value}, () => {
      const {Password} = this.state
      if (Password === 'Sidd@2124') {
        this.setState({FinelPassword: 'rahul@2021'})
      }
    })
  }

  SuccessfulSubmission = Token => {
    const {history} = this.props

    Cookies.set('jwt_token', Token, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  Failure = Err => {
    this.setState({Fail: Err})
  }

  Switch = () => {
    this.setState(prevState => ({First: !prevState.First}))
  }

  Submit = async event => {
    event.preventDefault()
    const {FinelPassword, FinelUser} = this.state

    const UserDetails = {
      username: FinelUser,
      password: FinelPassword,
    }

    const URL = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(UserDetails),
    }
    const Response = await fetch(URL, options)
    const Code = await Response.json()
    if (Response.ok) {
      this.SuccessfulSubmission(Code.jwt_token)
      console.log('Sidd')
    } else {
      this.Failure(Code.error_msg)
    }
  }

  render() {
    const {Fail, First} = this.state

    const Type = First ? 'Password' : 'Text'

    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="Toping">
        <div className="Sheet">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
            alt="Sidd"
            className="Loginlogo"
          />

          <form onSubmit={this.Submit}>
            <div>
              <label htmlFor="Sidd">USERNAME</label>
            </div>
            <input type="search" placeholder="User" onChange={this.Uservalue} />
            <div>
              <label htmlFor="Sidd">PASSWORD</label>
            </div>
            <input
              id="Sidd"
              type={Type}
              placeholder="Password"
              onChange={this.PasswordValue}
            />
            <div className="Types">
              <input type="Checkbox" onChange={this.Switch} />
              <p>Show Password</p>
            </div>
            <p>{Fail}</p>
            <button type="submit" className="button">
              Login
            </button>
          </form>
          <div>
            <p> User: Sidd</p>
            <p>Password: Sidd@2124</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Login
