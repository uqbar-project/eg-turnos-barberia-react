import { bindAll } from 'class-bind'
import React, { Component } from 'react'

import DatePicker from 'react-datepicker'
import moment from 'moment'
import _ from 'lodash'

import Cortes from './Cortes'
import Horarios from './Horarios'

import Corte from '../models/corte'
import Turnos from '../models/turnos'

import rasta from '../img/rasta.png'
import barba from '../img/barba.png'
import tijeras from '../img/tijeras.png'

import silla from '../img/silla.png'



class PedirTurno extends Component {

  constructor(props) {
    super(props)
    this.cortes = [
      { nombre: "Barba", intervalo: 15, imagen: barba },
      { nombre: "Corte", intervalo: 30, imagen: tijeras },
      { nombre: "Rasta", intervalo: 45, imagen: rasta }
    ].map((it) => new Corte(it))

    const corte = this.cortes[0]

    this.state = {
      corte,
      fecha: corte.todosLosHorariosPara(moment())[0],
      turnos: new Turnos([])
    }
  }

  cambiaDia(fecha) {
    this.cambiaFecha(this.state.corte.todosLosHorariosPara(fecha)[0])
  }

  cambiaFecha(fecha) {
    this.setState({ fecha: fecha })
  }

  cambiaCorte(corte) {
    this.setState({ corte: corte })
    this.cambiaDia(this.state.fecha)
  }

  cambiaHorario(horario) {
    const { fecha } = this.state
    this.cambiaFecha(fecha.startOf("day").add(horario.hours(), "hour").add(horario.minutes(), "minutes"))
  }

  crearTurno() {
    const { fecha, corte, turnos } = this.state
    this.setState({
      turnos: new Turnos(turnos.turnos.concat({ fecha: moment(fecha), corte }))
    })
  }


  render() {
    return (
      <div className="App">
        <div className="container mt-3">
          <Cortes
            cortes={this.cortes}
            seleccionado={this.state.corte}
            onChange={this.cambiaCorte}
          />
        </div>
        <hr />
        <div className="container">
          <div className="row">
            <div className="col text-right">
              <DatePicker
                selected={this.state.fecha}
                onChange={this.cambiaDia}
                minDate={moment()}
                maxDate={moment().add(1, "month")}
                inline
              />
            </div>
            <div className="col">
              <ul className="list-group w-50" style={{ height: "240px", "overflowY": "scroll" }}>
                <Horarios
                  horarios={this.state.corte.todosLosHorariosPara(this.state.fecha)}
                  estaOcupado={(horario) => this.state.turnos.estaOcupado(horario, this.state.corte)}
                  seleccionado={this.state.fecha}
                  onChange={this.cambiaHorario}
                />
              </ul>
            </div>
          </div>
        </div>
        <hr />
        <div className="container">
        </div>
        <div className="row">
          <p className="col text-right">
            Pedir turno para {this.state.fecha.format("DD/MM hh:mm a")}
          </p>
          <div className="col text-left">
            <a
              className={"btn btn-primary" + (this.state.turnos.estaOcupado(this.state.fecha, this.state.corte) ? " disabled" : "")}
              href="#" role="button"
              onClick={(e) => { this.crearTurno(); e.preventDefault() }}
            >
              Aceptar
            </a>
            <img style={{ height: "30px" }} src={silla} />
          </div>
        </div>
      </div>
    );
  }
}

bindAll(PedirTurno.prototype)

export default PedirTurno
