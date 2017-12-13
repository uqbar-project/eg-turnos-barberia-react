import React from 'react'

function Cortes(props) {
    const { cortes, seleccionado, onChange } = props

    const botones = cortes.map((corte, i) =>
        (<div key={corte.nombre} className="col">
            <a
                className={"card-body btn " + (corte === seleccionado ? "btn-secondary" : "")}
                href="#"
                onClick={(e) => { onChange(corte); e.preventDefault() }}
                checked
            >
                <img className="card-img-top" src={corte.imagen} alt="Card image cap" />
                <h4 className="card-title">{corte.nombre}</h4>
                <h6 className="card-subtitle mb-2 text-muted">{corte.intervalo} mins</h6>
            </a>
        </div>)
    )

    return (
        <div className="row justify-content-md-center btn-group" data-toggle="buttons">
            {botones}
        </div>)
}

export default Cortes