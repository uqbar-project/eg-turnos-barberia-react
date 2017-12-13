import _ from 'lodash'
import moment from 'moment'

class Turno {
  constructor(json) {
    _.extend(this, json)
  }

  seSuperpone(horario, corte) {
    const intervaloActual = corte.intervalo - 1
    const intervaloTurno = this.corte.intervalo - 1
    return this.fecha.isSame(horario, "day")
      && (this.estaEntre(horario, intervaloActual, this.fecha)
        || this.estaEntre(horario, intervaloActual, moment(this.fecha).add(intervaloTurno, "minutes"))
        || this.estaEntre(this.fecha, intervaloTurno, horario)
        || this.estaEntre(this.fecha, intervaloTurno, moment(horario).add(intervaloActual, "minutes")))
  }

  estaEntre(comienzo, intervalo, momento) {
    const final = moment(comienzo).add(intervalo, "minutes")
    return (comienzo.isSame(momento, "minutes") || comienzo.isBefore(momento, "minutes"))
      && (final.isSame(momento, "minutes") || final.isAfter(momento, "minutes"))
  }
}

class Turnos {
  constructor(turnos) {
    this.turnos = turnos.map((it) => new Turno(it))
  }

  estaOcupado(horario, corte) {
    return _(this.turnos).some(turno => turno.seSuperpone(horario, corte))
  }

}

export default Turnos