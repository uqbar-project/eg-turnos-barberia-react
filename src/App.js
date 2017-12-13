import { bindAll } from 'class-bind'
import React, { Component } from 'react'
import { Router, Redirect, Route, Link } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import PedirTurno from './components/PedirTurno'
import Turnos from './components/Turnos'

import logo from './logo.svg'
import cosito from './img/cosito.png'

const history = createHistory()

class App extends Component {

  render() {
    return (
      <Router history={history}>
        <div className="App">
          <header className="App-header">
            <div className="container">
              <div className="row align-items-center">
                <img className="App-logo " src={cosito} />
                <h1 className="App-title align-middle">&nbsp; BARBERÍA <small> Saque turno ¡YA!</small></h1>
              </div>
            </div>
            <Link to="/home">Sacar turno</Link>
            <Link to="/turnos">Ver turnos</Link>
          </header>
          <Route exact path="/" render={() => (<Redirect to="/home" />)} />
          <Route path="/home" component={PedirTurno} />
          <Route path="/turnos" component={Turnos} />


          <Link target="_blank" to="https://reactjs.org/docs/hello-world.html" className="form-text text-muted text-right">
            Construído con React
          <img src={logo} className="App-logo" alt="logo" />
          </Link>
        </div>
      </Router>
    )
  }
}


bindAll(App.prototype)

export default App

