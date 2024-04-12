import React from 'react'
import './Card.css'

const Card = (props) => {
  const { image, name, price, url, pack } = props;

  // Limitar el título a 50 caracteres y agregar "..." si es más largo
  const limitedTitle = name.length > 50 ? name.substring(0, 50) + "..." : name;

  // Codificar la URL de la imagen para evitar problemas con caracteres especiales
  const imageEncoded = encodeURI(image);
  return (
    <a href={url} className="card-box">
      <div className="foto-card" style={{ backgroundImage: `url(${imageEncoded})` }} />
      <div className="inside-box">
        <h3 className="title-card">{limitedTitle}</h3>
        <div className="precio-card">{`${price} €${(pack == 1 ? '' : '/ud')}`}</div>
      </div>
      <button className="cta-card">COMPRA AHORA</button>
    </a>
  )
}

export default Card