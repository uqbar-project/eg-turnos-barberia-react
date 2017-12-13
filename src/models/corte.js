import _ from 'lodash'
import moment from 'moment'

class Corte {
  constructor(json) {
    _.extend(this, json)
    this.horaInicio = 10
    this.horaFin = 19
  }

  todosLosHorariosPara(fecha) {
    return _.range(this.horaInicio * 60, this.horaFin * 60, this.intervalo)
      .map(mins => moment(fecha).startOf("day").add(mins, "minutes"))
  }
}

export default Corte