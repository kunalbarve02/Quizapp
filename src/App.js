import React, { Component } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Home from './components/Home/Home'
import './App.css'
import NavBar from './components/Navbar/NavBar'
import Test from './components/Test/Test'
import Result from './components/Result/Result'
import TestDetails from './components/Result/TestDetails'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <NavBar/>
        <Switch>
          <Route path="/result/details" component={TestDetails}/>
          <Route path="/result" component={Result} />
          <Route path="/test/:testName" component={Test} />
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    )
  }
}

export default App