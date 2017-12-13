import React from 'react'

function Horarios(props) {
  const { horarios, estaOcupado, seleccionado, onChange } = props
  return horarios
    .map(horario => {
      const texto = horario.format("hh:mm a")
      if (estaOcupado(horario))
        return (
          <div
            key={texto}
            className={"list-group-item"}>
            <p>{texto} <span className="badge badge-pill badge-secondary">Ocupado</span></p>
          </div>)
      else
        return (
          <a
            key={texto}
            href="#"
            className={"list-group-item" + (horario.isSame(seleccionado, "minutes") ? " active" : "")}
            onClick={(e) => { onChange(horario); e.preventDefault() }} >
            <div className="d-sm-flex justify-content-center align-center">
              {texto}
            </div>
          </a>)
    })
}

export default Horarios