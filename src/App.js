import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import {Component} from 'react'

import './App.css'

import Login from './components/LoginForm/Login'

import NotFound from './components/NotFound/NotFound'

import Home from './components/Home/Home'

import Trending from './components/Trending/Trending'

import LanguageContext from './Context/Context'

import Game from './components/Game/Game'

import VideoPlaying from './components/GameingVideoPlayer/GameingVideoPlayer'

import SavedVideos from './components/SavedVideos/SavedVideos'

const SavedDetails = []

class App extends Component {
  state = {Yuvi: true, SavedArray: SavedDetails}

  War = () => {
    this.setState(prevState => ({Yuvi: !prevState.Yuvi}))
  }

  NewTask = Adding => {
    this.setState(prevState => ({
      SavedArray: [...prevState.SavedArray, Adding],
    }))
  }

  Setup = id => {
    const {SavedArray} = this.state
    const Resulting = SavedArray.filter(each => each.id !== id)
    this.setState({SavedArray: Resulting})
  }

  render() {
    const {Yuvi, SavedArray} = this.state

    return (
      <LanguageContext.Provider
        value={{
          Active: Yuvi,
          Shifting: this.War,
          SavedList: SavedArray,
          NewAdd: this.NewTask,
          TakeOff: this.Setup,
        }}
      >
        <BrowserRouter>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/Not-Found" component={NotFound} />
            <Route exact path="/" component={Home} />
            <Route exact path="/Trending" component={Trending} />
            <Route exact path="/Game" component={Game} />
            <Route exact path="/blogs/:id" component={VideoPlaying} />
            <Route exact path="/SavedVideos" component={SavedVideos} />
            <Redirect to="/Not-Found" />
          </Switch>
        </BrowserRouter>
      </LanguageContext.Provider>
    )
  }
}

export default App
